#!/usr/bin/env python3
"""
Importador do catálogo de ingredientes (planilha + PDFs de conteúdo) -> SQL idempotente.

Fontes:
  1. "Orientação para Cadastrar no Site.xlsx" — a lista canônica.
     Colunas: Fabricante | Nome do Produto | Categoria | TAGs (separadas por ';')
  2. PDFs "<FABRICANTE>_Produtos_*.pdf" — texto editorial por produto
     (subtítulo, códigos comerciais e descrição).

A planilha manda: define quais produtos existem, sua categoria e suas tags.
O PDF enriquece: só entra descrição/subtítulo/códigos de produto que exista na planilha.

Uso:
    python3 importar_catalogo.py \
        --xlsx "Orientação para Cadastrar no Site.xlsx" \
        --pdf  READLINE_Produtos_01-10_de_19.pdf \
        --fabricante "READLINE Biotech" \
        --parceiro-slug readline-biotech \
        --out readline.sql

O SQL gerado é idempotente (ON CONFLICT DO UPDATE), então reexecutar não duplica nada e
serve para corrigir conteúdo. Ele NÃO apaga produtos removidos da planilha — isso é
proposital: desativar produto é decisão editorial, feita pelo CMS.
"""

import argparse
import json
import re
import sys
import unicodedata
from pathlib import Path

try:
    import openpyxl
except ImportError:
    sys.exit("Falta openpyxl: pip3 install openpyxl")

try:
    from pypdf import PdfReader
except ImportError:
    try:
        from PyPDF2 import PdfReader  # type: ignore
    except ImportError:
        sys.exit("Falta pypdf: pip3 install pypdf")


# --------------------------------------------------------------------------- utils

TRANSLITERACAO = {
    "α": "alpha", "β": "beta", "γ": "gamma", "δ": "delta", "ε": "epsilon",
    "κ": "kappa", "λ": "lambda", "μ": "mu", "ω": "omega", "&": " e ",
}


def slugify(value: str) -> str:
    """
    ESPELHO EXATO de apps/api/src/common/slugify.ts. Mudou lá, mude aqui.

    Se divergirem, editar um produto no CMS regenera um slug diferente do importado
    e a URL pública muda sozinha. A equivalência é verificada por verificar_slug.py.
    """
    value = value.lower()
    value = "".join(TRANSLITERACAO.get(c, c) for c in value)
    value = unicodedata.normalize("NFD", value)
    value = "".join(c for c in value if unicodedata.category(c) != "Mn")
    value = re.sub(r"[^a-z0-9\s-]", "", value)  # ASCII apenas, igual ao TS
    value = re.sub(r"[\s_]+", "-", value)
    value = re.sub(r"-{2,}", "-", value)
    return value.strip("-")


def juntar_paragrafos(linhas: list[str]) -> str:
    """
    Reconstrói os parágrafos do PDF, separando-os com '\\n\\n'.

    O texto é justificado: dentro de um parágrafo as linhas quebram no meio da frase e não
    terminam em ponto — só a ÚLTIMA linha do parágrafo termina. Juntar tudo com espaço
    perderia essa estrutura e obrigaria o front a readivinhar onde quebrar, o que erra em
    abreviação e em frase curta.
    """
    paragrafos: list[list[str]] = [[]]
    for linha in linhas:
        paragrafos[-1].append(linha)
        if linha.rstrip().endswith("."):
            paragrafos.append([])

    return "\n\n".join(
        re.sub(r"\s+", " ", " ".join(p)).strip() for p in paragrafos if p
    ).strip()


def _normalizar_match(s: str) -> str:
    """Neutraliza ® / ™ / © e caixa pra casar nome do PDF com o da planilha mesmo
    quando um tem o símbolo de marca registrada e o outro não (comum: planilha
    digitada à mão derruba o ®), ou a capitalização diverge."""
    return re.sub(r"\s+", " ", s.replace("®", "").replace("™", "").replace("©", "")).strip().lower()


def _casar_ancora(texto: str, ancoras_norm: list[tuple[str, str]]) -> str | None:
    """ancoras_norm = [(nome_normalizado, nome_original), ...], mais longo primeiro."""
    norm = _normalizar_match(texto)
    return next((original for norm_a, original in ancoras_norm if norm.startswith(norm_a)), None)


def _corta_apos_match(cabecalho: str, nome_norm_len: int) -> int:
    """Acha, no `cabecalho` ORIGINAL (com ® e caixa mista), o índice logo após onde o
    prefixo normalizado (tamanho nome_norm_len) termina — pra cortar o excerto no
    lugar certo mesmo com símbolo/caixa divergentes entre PDF e planilha."""
    acumulado = 0
    for idx, ch in enumerate(cabecalho):
        if ch in "®™©":
            continue
        acumulado += 1
        if acumulado >= nome_norm_len:
            return idx + 1
    return len(cabecalho)


def sql_str(value) -> str:
    """Literal SQL com escape de aspas simples. None vira NULL."""
    if value is None or value == "":
        return "NULL"
    return "'" + str(value).replace("'", "''") + "'"


# ----------------------------------------------------------------------- extração

def ler_planilha(caminho: Path, fabricante: str):
    """Lê a planilha e devolve as linhas do fabricante pedido, na ordem original."""
    ws = openpyxl.load_workbook(caminho, data_only=True).active
    linhas = []
    for fab, nome, categoria, tags in ws.iter_rows(min_row=2, values_only=True):
        if not nome or fab != fabricante:
            continue
        linhas.append(
            {
                "nome": str(nome).strip(),
                "categoria": str(categoria).strip() if categoria else None,
                "tags": [t.strip() for t in str(tags or "").split(";") if t.strip()],
            }
        )
    return linhas


CTA_FIXO_BOTANICOS = "Solicite ficha técnica, material de marketing ou amostra pelo Formulário de Atendimento."


def ler_pdf(caminho: Path, nomes: list[str]):
    """
    Extrai {nome: {excerpt, codigos, descricao, cta, inci}} do PDF.

    Dois formatos de página já apareceram nos catálogos da Lipoid — ambos com uma
    página por produto, mas com corpo/CTA delimitados de jeito diferente:

    1. "Lista de Produtos LIPID e Lipoid Product Finder" — título e subtítulo
       concatenados pelo extrator numa linha só ("D-PanthenolPro-vitamina B5
       para..."), corpo terminado por "Código(s) comercial(is) registrado na
       planilha: ...", CTA muda por produto ("Conte à equipe Lipid...").
    2. "Lipoid Kosmetik Actives & Botanicals Product Finder" — título pode
       quebrar em mais de uma linha (nomes longos, ex. "Peppermint Herbasol®
       Extract PG," + "unpreserved, system 3"), sem a frase "Código(s)
       comercial(is) registrado", CTA fixo (CTA_FIXO_BOTANICOS acima), e o
       corpo já cita "INCI da matéria-prima vegetal: X." quando confirmado —
       extraído à parte pro campo inci, sem precisar de --inci.

       Produtos que a própria fonte não conseguiu confirmar vêm marcados
       "Código comercial: Não localizado no catálogo público" — a fonte já se
       absteve de inferir código/INCI/composição para esses; seguimos a mesma
       cautela e OMITIMOS (caem em "sem_conteudo" no relatório, não é bug).

    Usamos os nomes da planilha como âncora, do MAIS LONGO para o mais curto —
    senão "Repigard-II" captura a página do "Repigard-IIIB", que é o mesmo
    prefixo. Quando o título quebra em mais de uma linha, vai grudando linha a
    linha (com espaço) até achar uma âncora que bata.
    """
    ancoras = sorted(nomes, key=len, reverse=True)
    ancoras_norm = [(_normalizar_match(n), n) for n in ancoras]
    achados = {}

    for pagina in PdfReader(caminho).pages:
        linhas = [l.strip() for l in (pagina.extract_text() or "").split("\n") if l.strip()]
        if len(linhas) < 3:
            continue

        cabecalho = linhas[1]
        nome = _casar_ancora(cabecalho, ancoras_norm)
        i = 2
        while not nome and i < len(linhas) and not linhas[i].startswith("Código comercial:"):
            cabecalho += " " + linhas[i]
            nome = _casar_ancora(cabecalho, ancoras_norm)
            i += 1

        if not nome or nome in achados:
            continue  # página de controle, produto fora da planilha, ou repetição

        excerpt = cabecalho[_corta_apos_match(cabecalho, len(_normalizar_match(nome))):].strip()
        while i < len(linhas) and not linhas[i].startswith("Código comercial:"):
            excerpt += " " + linhas[i]  # subtítulo que quebrou em mais linhas
            i += 1
        if i >= len(linhas):
            continue

        valor_codigo = linhas[i].replace("Código comercial:", "").strip()
        i += 1

        if "não localizado" in valor_codigo.lower():
            continue  # fonte não confirmou este produto — não inventamos código nem conteúdo

        codigos = [c.strip() for c in valor_codigo.split(",") if c.strip()]

        formato_antigo = any(l.startswith("Código(s) comercial(is) registrado") for l in linhas[i:])

        if formato_antigo:
            corpo = []
            while i < len(linhas) and not linhas[i].startswith("Código(s) comercial(is) registrado"):
                corpo.append(linhas[i])
                i += 1

            # Pula o parágrafo de ressalva ("INCI, teor... devem ser confirmados na ficha
            # técnica"), idêntico em todos os produtos deste formato.
            while i < len(linhas) and not linhas[i].startswith("Base técnica:"):
                if linhas[i].endswith("vigentes."):
                    i += 1
                    break
                i += 1

            cta = []
            while i < len(linhas) and not linhas[i].startswith("Base técnica:"):
                cta.append(linhas[i])
                i += 1
            cta_texto = re.sub(r"\s+", " ", " ".join(cta)).strip()
            inci = None
        else:
            corpo = []
            while (
                i < len(linhas)
                and not linhas[i].startswith("Base técnica:")
                and linhas[i] != CTA_FIXO_BOTANICOS
            ):
                corpo.append(linhas[i])
                i += 1
            cta_texto = CTA_FIXO_BOTANICOS
            match_inci = re.search(r"INCI da matéria-prima vegetal:\s*(.+?)\.", " ".join(corpo))
            inci = match_inci.group(1).strip() if match_inci else None

        achados[nome] = {
            "excerpt": re.sub(r"\s+", " ", excerpt).strip(),
            "codigos": codigos,
            "descricao": juntar_paragrafos(corpo),
            "cta": cta_texto,
            "inci": inci,
        }

    return achados


# ------------------------------------------------------------------------- saída

CABECALHO = """-- Catálogo de ingredientes — {fabricante}
-- GERADO por scripts/import-catalogo/importar_catalogo.py — não editar à mão.
-- Fontes: {xlsx} + {pdf}
-- {n_produtos} produtos · {n_categorias} categorias · {n_tags} tags · {n_codigos} códigos comerciais
--
-- Idempotente: reexecutar atualiza conteúdo, não duplica. Rode dentro de transação.

BEGIN;

DO $$
DECLARE
  v_partner_id text;
BEGIN
  SELECT id INTO v_partner_id FROM partners WHERE slug = {parceiro_slug};
  IF v_partner_id IS NULL THEN
    RAISE EXCEPTION 'Parceiro % nao encontrado — cadastre-o antes de importar o catalogo', {parceiro_slug};
  END IF;
"""

RODAPE = """
END $$;

COMMIT;
"""


def gerar_sql(produtos, fabricante, parceiro_slug, xlsx, pdf) -> str:
    categorias = {}
    tags = {}
    for p in produtos:
        if p["categoria"]:
            categorias.setdefault(slugify(p["categoria"]), p["categoria"])
        for t in p["tags"]:
            tags.setdefault(slugify(t), t)  # 'Rice'/'RICE' colapsam no mesmo slug

    n_codigos = sum(len(p["codigos"]) for p in produtos)
    partes = [
        CABECALHO.format(
            fabricante=fabricante,
            xlsx=Path(xlsx).name,
            pdf=Path(pdf).name,
            n_produtos=len(produtos),
            n_categorias=len(categorias),
            n_tags=len(tags),
            n_codigos=n_codigos,
            parceiro_slug=sql_str(parceiro_slug),
        )
    ]

    partes.append("\n  -- ---------- categorias (taxonomia global, compartilhada entre fabricantes)")
    for ordem, (slug, nome) in enumerate(sorted(categorias.items(), key=lambda kv: kv[1])):
        partes.append(
            f"""  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, {sql_str(nome)}, {sql_str(slug)}, {ordem}, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();"""
        )

    partes.append("\n  -- ---------- tags")
    for slug, nome in sorted(tags.items(), key=lambda kv: kv[1]):
        partes.append(
            f"""  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, {sql_str(nome)}, {sql_str(slug)}, now())
  ON CONFLICT (slug) DO NOTHING;"""
        )

    partes.append("\n  -- ---------- produtos")
    for ordem, p in enumerate(produtos):
        slug = slugify(p["nome"])
        cat = sql_str(slugify(p["categoria"])) if p["categoria"] else "NULL"
        partes.append(
            f"""
  -- {ordem + 1:>3}. {p['nome']}
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    {sql_str(p['nome'])},
    {sql_str(slug)},
    {sql_str(p['descricao'])},
    {sql_str(p['excerpt'])},
    {sql_str(p['cta'])},
    {sql_str(p['inci'])},
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = {cat}),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();"""
        )

        for i, codigo in enumerate(p["codigos"]):
            partes.append(
                f"""  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, {sql_str(codigo)},
          (SELECT id FROM ingredients WHERE slug = {sql_str(slug)}), {i})
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";"""
            )

        for tag in p["tags"]:
            partes.append(
                f"""  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = {sql_str(slug)}),
          (SELECT id FROM tags WHERE slug = {sql_str(slugify(tag))}))
  ON CONFLICT DO NOTHING;"""
            )

    partes.append(RODAPE)
    return "\n".join(partes)


# -------------------------------------------------------------------------- main

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--xlsx", required=True)
    ap.add_argument("--pdf", required=True, help="PDF consolidado (1 página por produto)")
    ap.add_argument("--fabricante", required=True, help="valor exato da coluna Fabricante")
    ap.add_argument("--parceiro-slug", required=True, help="slug em partners")
    ap.add_argument("--inci", help="JSON {nome_produto: INCI} para INCI confirmado na ficha técnica")
    ap.add_argument("--out", required=True)
    args = ap.parse_args()

    planilha = ler_planilha(Path(args.xlsx), args.fabricante)
    if not planilha:
        sys.exit(f"Nenhuma linha do fabricante {args.fabricante!r} na planilha.")

    conteudo = ler_pdf(Path(args.pdf), [p["nome"] for p in planilha])
    inci_map = json.loads(Path(args.inci).read_text()) if args.inci else {}

    produtos, sem_conteudo = [], []
    for p in planilha:
        pdf_data = conteudo.get(p["nome"])
        if not pdf_data:
            sem_conteudo.append(p["nome"])
            continue
        # INCI confirmado direto no corpo do PDF (formato Botânicos) tem prioridade;
        # --inci é só um complemento pra formato antigo, que nunca traz INCI no texto.
        inci = pdf_data.get("inci") or inci_map.get(p["nome"])
        produtos.append({**p, **pdf_data, "inci": inci})

    # ----- relatório de conferência antes de gerar qualquer SQL
    print(f"Planilha .......... {len(planilha)} produtos de {args.fabricante!r}")
    print(f"PDF ............... {len(conteudo)} produtos com conteúdo")
    print(f"Casados ........... {len(produtos)}")
    print(f"Códigos comerciais  {sum(len(p['codigos']) for p in produtos)}")
    print(f"INCI preenchido ... {sum(1 for p in produtos if p['inci'])}/{len(produtos)}")

    if sem_conteudo:
        print(f"\n!! {len(sem_conteudo)} sem conteúdo no PDF (não serão importados):")
        for n in sem_conteudo:
            print(f"     - {n}")

    slugs = [slugify(p["nome"]) for p in produtos]
    if len(slugs) != len(set(slugs)):
        vistos, colisao = set(), set()
        for s in slugs:
            (colisao if s in vistos else vistos).add(s)
        sys.exit(f"\nERRO: slugs colidindo: {sorted(colisao)}")

    codigos = [c for p in produtos for c in p["codigos"]]
    if len(codigos) != len(set(codigos)):
        sys.exit("\nERRO: código comercial repetido — 'code' é UNIQUE global.")

    Path(args.out).write_text(gerar_sql(produtos, args.fabricante, args.parceiro_slug, args.xlsx, args.pdf))
    print(f"\nSQL gerado: {args.out}")


if __name__ == "__main__":
    main()
