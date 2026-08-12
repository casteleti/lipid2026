#!/usr/bin/env python3
"""
Gera o SQL de seed da página institucional nova (/institucional) a partir do JSON de
conteúdo (lipid_institucional_novo.json) -> tabelas institutional_sections /
institutional_section_items.

Não é um transformador genérico: o JSON tem uma forma bem específica por `section.type`,
então o mapeamento de campo é escrito à mão aqui, seção por seção. Se o JSON de conteúdo
mudar de formato, este script precisa ser revisado junto.

Os `image_hint` (o que escrever na área reservada pra imagem) são uma leitura editorial
das instruções de design do próprio JSON (visual_instruction, component_map, palette) —
não vieram prontos na fonte, foram compostos aqui.

Uso:
    python3 seed_institucional.py --json lipid_institucional_novo.json --out seed.sql
"""

import argparse
import json
import sys
from pathlib import Path


def sql_str(value):
    if value is None or value == "":
        return "NULL"
    return "'" + str(value).replace("'", "''") + "'"


def sql_json(value):
    if value is None:
        return "NULL"
    return "'" + json.dumps(value, ensure_ascii=False).replace("'", "''") + "'::jsonb"


def item(*, icon=None, title=None, subtitle=None, text=None, value=None,
         link_label=None, link_href=None, image_hint=None, extra=None):
    return {
        "icon": icon, "title": title, "subtitle": subtitle, "text": text, "value": value,
        "link_label": link_label, "link_href": link_href, "image_hint": image_hint, "extra": extra,
    }


# Seções que saíram da página depois de já terem sido semeadas. Só remover o mapeamento em
# `montar_secoes` não basta: o seed não apaga o que deixou de listar, então a seção
# continuaria viva em qualquer banco que já a tivesse — inclusive produção, que recebe o
# institucional por este mesmo arquivo. O DELETE abaixo fecha esse caminho.
SECOES_REMOVIDAS = [
    "service-proof",  # "ATUAÇÃO PRÁTICA" — retirada em 11/08/2026 a pedido do cliente.
    "important-topics",  # "TÓPICOS IMPORTANTES" — retirada em 12/08/2026 a pedido do cliente.
]


def montar_secoes(doc):
    by_id = {s["id"]: s for s in doc["sections"]}
    secoes = []

    # 1. HERO ----------------------------------------------------------------
    s = by_id["hero"]
    secoes.append({
        "slug": "hero", "type": "institutional_hero", "order": 0,
        "eyebrow": s["eyebrow"], "title": s["title"], "subtitle": s["lead"],
        "body": s["supporting_text"], "highlight": s["highlight"],
        "cta_label": s["primary_cta"]["label"], "cta_href": s["primary_cta"]["href"],
        "secondary_cta_label": s["secondary_cta"]["label"], "secondary_cta_href": s["secondary_cta"]["href"],
        "image_hint": "Composição abstrata de fundo: bicamada lipídica, membranas e partículas em "
                      "suspensão, tom azul-profundo/verde-técnico. Não usar foto de bancada de "
                      "laboratório genérica como peça principal — é pra ler como ciência, não estoque.",
        "items": [],
    })

    # 2. QUEM SOMOS ------------------------------------------------------------
    s = by_id["quem-somos"]
    secoes.append({
        "slug": "quem-somos", "type": "editorial_intro", "order": 1,
        "eyebrow": s["eyebrow"], "title": s["title"],
        "body": "\n\n".join(s["paragraphs"]),
        "quote": s["featured_quote"]["text"],
        "image_hint": "Foto real da equipe, do escritório ou do laboratório — horizontal, tom "
                      "documental (retrato do dia a dia, não still de banco de imagens).",
        "items": [
            item(value=f["value"], title=f["label"]) for f in s["facts"]
        ],
    })

    # 3. COMO ATUAMOS ------------------------------------------------------------
    s = by_id["como-atuamos"]
    secoes.append({
        "slug": "como-atuamos", "type": "process_story", "order": 2,
        "eyebrow": s["eyebrow"], "title": s["title"], "subtitle": s["intro"],
        "highlight": s["closing_highlight"],
        "image_hint": "Diagrama abstrato de etapas conectadas por linhas finas — reforça a ideia de "
                      "processo sem precisar de foto (a timeline de números já carrega a estrutura).",
        "items": [
            item(value=st["number"], title=st["title"], text=st["text"]) for st in s["steps"]
        ],
    })

    # 4. PONTOS DE ATENÇÃO ------------------------------------------------------------
    s = by_id["attention"]
    secoes.append({
        "slug": "attention", "type": "attention_panel", "order": 3,
        "eyebrow": s["eyebrow"], "title": s["title"], "subtitle": s["intro"],
        "highlight": s["highlight"],
        "image_hint": "Textura de fundo abstrata e discreta (bicamada lipídica em baixo contraste "
                      "sobre azul profundo) — decorativa, não precisa de foto real aqui.",
        "items": [
            item(icon=it["icon"], title=it["title"], text=it["text"]) for it in s["items"]
        ],
    })

    # 5. ÁREAS ATENDIDAS ------------------------------------------------------------
    s = by_id["areas"]
    dicas_area = {
        "farmaceutica": "Still técnico de formulação farmacêutica (cápsulas, ampola, sistema de "
                        "entrega) — tom clínico, não estoque genérico.",
        "cosmetica": "Foto de textura ou aplicação cosmética (creme, sérum, emulsão) com "
                     "iluminação clean, still de produto ou mão aplicando.",
        "nutricional": "Still de suplemento/cápsulas nutricionais ou da matéria-prima de origem "
                       "(ex. grão, lecitina) — tom técnico-alimentício.",
        "veterinaria": "Imagem relacionada a nutrição/saúde animal em tom técnico — evitar clichê "
                       "'fofo', manter o mesmo registro editorial das outras três.",
    }
    secoes.append({
        "slug": "areas", "type": "sector_bento_grid", "order": 4,
        "eyebrow": s["eyebrow"], "title": s["title"],
        "items": [
            item(title=it["title"], subtitle=it["headline"], text=it["text"],
                 link_label=it["link"]["label"], link_href=it["link"]["href"],
                 image_hint=dicas_area.get(it["id"]),
                 extra={"anchorId": it["id"]})
            for it in s["items"]
        ],
    })

    # 6. PONTE PRA GRUPO LIPOID ------------------------------------------------------------
    s = by_id["group-bridge"]
    secoes.append({
        "slug": "group-bridge", "type": "statement_break", "order": 5,
        "body": s["content"], "subtitle": s["supporting_text"],
        "image_hint": "Grafismo abstrato de conexão Brasil–Europa — linhas finas ligando dois "
                      "nós/pontos, sem mapa literal (conforme instrução de design da fonte).",
        "items": [],
    })

    # 7. GRUPO LIPOID ------------------------------------------------------------
    s = by_id["grupo-lipoid"]
    dicas_empresa = {
        "Lipoid": "Imagem institucional da Lipoid — planta produtiva (Ludwigshafen) ou still de "
                  "produto/embalagem, se houver material cedido pelo fabricante.",
        "Lipoid Kosmetik": "Imagem institucional da Lipoid Kosmetik — ativo botânico, extrato ou "
                           "aplicação cosmética, se houver material cedido pelo fabricante.",
    }
    secoes.append({
        "slug": "grupo-lipoid", "type": "dual_company_feature", "order": 6,
        "eyebrow": s["eyebrow"], "title": s["title"], "subtitle": s["intro"],
        "extra": {"disclaimer": s["disclaimer"]},
        "items": [
            item(title=c["name"], subtitle=c["tag"], text=c["text"],
                 link_label=c["external_link"]["label"], link_href=c["external_link"]["href"],
                 image_hint=dicas_empresa.get(c["name"]),
                 extra={"keyPoints": c["key_points"], "externalLink": True})
            for c in s["companies"]
        ],
    })

    # 8. QUALIDADE ------------------------------------------------------------
    s = by_id["qualidade"]
    secoes.append({
        "slug": "qualidade", "type": "quality_framework", "order": 7,
        "eyebrow": s["eyebrow"], "title": s["title"], "subtitle": s["lead"],
        "quote": s["featured_quote"],
        "image_hint": "Still de documentação técnica (ficha técnica, CoA, laudo) sobre mesa, ou "
                      "textura de laboratório de controle de qualidade — reforça 'documentação real', "
                      "não decoração.",
        "items": [
            item(title=p["title"], text=p["text"]) for p in s["pillars"]
        ],
    })

    # 9. TÓPICOS IMPORTANTES — RETIRADA DA PÁGINA (ver SECOES_REMOVIDAS).
    # 10. ATUAÇÃO PRÁTICA — RETIRADA DA PÁGINA (ver SECOES_REMOVIDAS).
    # O JSON de conteúdo ainda traz "important-topics" e "service-proof"; as duas deixaram
    # de ser mapeadas aqui de propósito. As ordens 8 e 9 ficam vagas — `order` é relativo,
    # não precisa ser contíguo.

    # 11. MANIFESTO FINAL ------------------------------------------------------------
    s = by_id["closing-manifesto"]
    secoes.append({
        "slug": "closing-manifesto", "type": "closing_manifesto", "order": 10,
        "title": s["title"], "body": s["paragraph"], "highlight": s["highlight"],
        "cta_label": s["cta"]["label"], "cta_href": s["cta"]["href"],
        "image_hint": "Fundo escuro com grafismo de partícula/membrana lipídica em destaque, sutil "
                      "— dá profundidade ao bloco de fechamento sem competir com o CTA.",
        "items": [],
    })

    # 12. CONTATO ------------------------------------------------------------
    s = by_id["contact"]
    secoes.append({
        "slug": "contact", "type": "contact_strip", "order": 11,
        "title": s["title"], "subtitle": s["text"],
        "image_hint": "Foto real da sede da Lipid Ingredients em Ribeirão Preto (fachada ou "
                      "recepção), ou mapa estilizado de localização.",
        "items": [
            item(title=c["label"], text=c["value"], link_href=c.get("href"),
                 extra={"type": c["type"]})
            for c in s["contact_items"]
        ],
    })

    return secoes


def gerar_sql(secoes) -> str:
    partes = [
        "-- Seed da página institucional nova (/institucional) — layout blocos alternados.",
        "-- GERADO por scripts/seed-institucional/seed_institucional.py — não editar à mão.",
        "-- Idempotente: reexecutar atualiza conteúdo (seções por slug), não duplica.",
        "",
        "BEGIN;",
        "",
    ]

    if SECOES_REMOVIDAS:
        alvos = ", ".join(sql_str(slug) for slug in SECOES_REMOVIDAS)
        partes.append("-- ===== seções retiradas da página =====")
        partes.append(
            f"-- Os itens de cada uma caem junto por ON DELETE CASCADE.\n"
            f"DELETE FROM institutional_sections WHERE slug IN ({alvos});"
        )
        partes.append("")

    for s in secoes:
        partes.append(f"-- ===== {s['slug']} ({s['type']}) =====")
        partes.append(f"""INSERT INTO institutional_sections
  (id, slug, type, "order", eyebrow, title, subtitle, body, highlight, quote,
   "ctaLabel", "ctaHref", "secondaryCtaLabel", "secondaryCtaHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text, {sql_str(s['slug'])}, {sql_str(s['type'])}, {s['order']},
  {sql_str(s.get('eyebrow'))}, {sql_str(s.get('title'))}, {sql_str(s.get('subtitle'))},
  {sql_str(s.get('body'))}, {sql_str(s.get('highlight'))}, {sql_str(s.get('quote'))},
  {sql_str(s.get('cta_label'))}, {sql_str(s.get('cta_href'))},
  {sql_str(s.get('secondary_cta_label'))}, {sql_str(s.get('secondary_cta_href'))},
  {sql_str(s.get('image_hint'))}, {sql_json(s.get('extra'))}, now()
)
ON CONFLICT (slug) DO UPDATE SET
  type = EXCLUDED.type, "order" = EXCLUDED."order", eyebrow = EXCLUDED.eyebrow,
  title = EXCLUDED.title, subtitle = EXCLUDED.subtitle, body = EXCLUDED.body,
  highlight = EXCLUDED.highlight, quote = EXCLUDED.quote,
  "ctaLabel" = EXCLUDED."ctaLabel", "ctaHref" = EXCLUDED."ctaHref",
  "secondaryCtaLabel" = EXCLUDED."secondaryCtaLabel", "secondaryCtaHref" = EXCLUDED."secondaryCtaHref",
  "imageHint" = EXCLUDED."imageHint", extra = EXCLUDED.extra, "updatedAt" = now();""")

        partes.append(
            f'DELETE FROM institutional_section_items '
            f'WHERE "sectionId" = (SELECT id FROM institutional_sections WHERE slug = {sql_str(s["slug"])});'
        )

        for i, it in enumerate(s["items"]):
            partes.append(f"""INSERT INTO institutional_section_items
  (id, "sectionId", "order", icon, title, subtitle, text, value, "linkLabel", "linkHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM institutional_sections WHERE slug = {sql_str(s['slug'])}),
  {i}, {sql_str(it.get('icon'))}, {sql_str(it.get('title'))}, {sql_str(it.get('subtitle'))},
  {sql_str(it.get('text'))}, {sql_str(it.get('value'))}, {sql_str(it.get('link_label'))},
  {sql_str(it.get('link_href'))}, {sql_str(it.get('image_hint'))}, {sql_json(it.get('extra'))}, now()
);""")

        partes.append("")

    partes.append("COMMIT;")
    return "\n".join(partes)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--json", required=True)
    ap.add_argument("--out", required=True)
    args = ap.parse_args()

    doc = json.loads(Path(args.json).read_text())
    secoes = montar_secoes(doc)
    Path(args.out).write_text(gerar_sql(secoes))
    print(f"{len(secoes)} seções, {sum(len(s['items']) for s in secoes)} itens -> {args.out}")


if __name__ == "__main__":
    main()
