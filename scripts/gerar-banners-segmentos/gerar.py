#!/usr/bin/env python3
"""
Gera os banners panorâmicos de /segmentos/<slug> a partir das artes de img/banners/.

MUDANÇA DE PREMISSA (2026-08-12). A versão anterior deste script partia das fotos de
produto de uma coluna (1400x901) e inventava a parte panorâmica repetindo o fundo. As
artes novas em img/banners/ já nascem banner (1920x1013), com os produtos compostos à
direita e o fundo de estúdio limpo à esquerda — o trabalho aqui deixou de ser "criar
espaço" e passou a ser "encaixar na dobra sem que o produto encoste no texto".

O que este script faz, por arte:

  1. MEDE onde a composição começa. Não é chute nem número na mão: varre a imagem e acha
     a primeira coluna com conteúdo real. O discriminador é croma (produto é azulado, as
     moléculas douradas; o fundo e as sombras são neutros) mais um teste de escuridão com
     folga — sem essa folga, a vinheta do canto superior esquerdo da farmacêutica (185 de
     luminância contra 245 do resto) era lida como produto e a medida saía em 0%.

  2. ESCALA a arte para que a composição comece em ALVO_INICIO da largura da tela.

     Por que 61%: a coluna de texto é `max-w-2xl` (672px) dentro de `container-main`
     (max-w-7xl + px-8), e isso a faz terminar entre 53% e 55% da largura da janela em
     todo o intervalo de 1280 a 1920 — o pior caso é 1280, onde o texto acaba em 55%.
     Com o produto começando em 61% sobra uma calha de 77px ali e de 147px em 1920.

  3. CENTRA o produto — a massa medida, não o retângulo do arquivo — na vertical da tela,
     porque o bloco de texto também é centrado na dobra. Centrar o quadro deixaria a
     composição baixa, já que as quatro artes têm mais ar acima dos frascos do que abaixo.

  4. PREENCHE o que sobrar com o fundo da própria arte, estimado por linha. Nada é
     inventado: a faixa à esquerda das artes é lisa (medido: 4 a 13 de diferença em 255
     entre a coluna 0 e a 140), então continuar a cor de cada linha mantém exatamente o
     mesmo degradê vertical do estúdio.

Duas artes (farmacêutica e cosmética) acabam mais altas que a tela depois da escala e são
cortadas; as outras duas sobram ~140px, divididos entre topo e base, onde o fundo segue a
primeira e a última linha da arte. As emendas levam rampa de alfa, e na página ainda há um
véu branco de 160px em cima e embaixo — ver o HERO em segmentos/[slug]/page.tsx.

Saída: apps/website/public/segmentos/banner-<slug>.webp
"""

from __future__ import annotations

from pathlib import Path
from statistics import median

from PIL import Image

RAIZ = Path(__file__).resolve().parents[2]
ORIGEM = RAIZ / "img" / "banners"
DESTINO = RAIZ / "apps" / "website" / "public" / "segmentos"

# Arte de origem por slug de segmento: a panorâmica (desktop) e a retrato (celular).
#
# `alvo` e `descer` são exceções ao cálculo automático, e a veterinária é a única que
# precisa das duas. Motivo: naquela arte o reflexo no chão encosta na borda inferior, então
# a massa medida vai até 1012 de 1013 — o dobro de altura que o produto realmente ocupa.
# Centrar essa massa esticada empurra os frascos visíveis para cima, e como as embalagens
# são brancas sobre fundo branco elas ainda ficam menores que as dos outros três segmentos.
# Puxar o alvo para a esquerda aumenta a fatia disponível e, com ela, a escala.
SEGMENTOS: dict[str, dict] = {
    "farmaceutica": {"wide": "fullbanner-farmaceutico.png", "mobile": "mobile-farmaceutico.png"},
    "cosmetica": {"wide": "fullbanner-cosmetico.png", "mobile": "mobile-cosmetico.png"},
    "nutricional": {"wide": "fullbanner-suplementos.png", "mobile": "mobile-nutricional.png"},
    "veterinaria": {
        "wide": "fullbanner-veterinario.png",
        "mobile": "mobile-veterinario.png",
        "alvo": 0.58,
        "descer": 50,
    },
}

# As artes de celular (1196x2052, 0.583:1) já vêm compostas para servir de hero: produto
# ancorado embaixo e topo livre para o texto. Não há nada a recompor — só reduzir e
# converter. 1100px de largura dá ~2.6x num telefone de 430pt, que é onde essa arte aparece.
LARGURA_MOBILE = 1100

# 2800x1120 = 2.5:1. Mesma proporção dos banners que este script substitui, de propósito:
# a dobra foi calibrada para ela (`xl:min-h-[620px]`), e mudar a proporção mudaria a altura
# do banner na tela em todas as quatro páginas.
LARGURA, ALTURA = 2800, 1120

# Onde a composição deve começar, em fração da largura. Ver item 2 do cabeçalho.
ALVO_INICIO = 0.61

# Folga entre o fim da arte e a borda direita da tela. As quatro artes têm produto quase
# encostado na borda (99.9%), e um fio de respiro evita que ele seja cortado pela tela.
MARGEM_DIREITA = 40

# Rampa de alfa nas emendas da colagem.
RAMPA = 45

# Colunas que entram na mediana do fundo de cada linha, e por quantas linhas essa
# estimativa é suavizada. A segunda mediana, ao longo das linhas, descarta as poucas linhas
# em que algo colorido invade a faixa amostrada e preserva o que varia devagar — o degradê
# e a linha do chão do estúdio, que é o que faz a extensão parecer o mesmo set.
COLUNAS_FUNDO, LINHAS_SUAVIZA = 120, 60


def eh_objeto(p: tuple[int, int, int]) -> bool:
    """
    Distingue composição de fundo.

    Croma separa produto (azulado) e molécula (dourada) do estúdio, que é neutro. O teste
    de escuridão pega o que é neutro mas nitidamente escuro — uma tampa cinza, por exemplo.
    O limiar de 75 é folgado porque a vinheta do canto da farmacêutica chega a 59.
    """
    return (max(p) - min(p)) > 14 or (255 - max(p)) > 75


def medir(foto: Image.Image) -> tuple[int, int, int]:
    """Primeira coluna da composição e o intervalo vertical que ela ocupa."""
    largura, altura = foto.size
    px = foto.load()

    ocup_col = [0.0] * largura
    for x in range(0, largura, 2):
        ocup_col[x] = sum(1 for y in range(0, altura, 2) if eh_objeto(px[x, y])) / (altura / 2)

    # Exige que a ocupação se sustente por 40px, para um respingo de ruído não virar borda.
    x0 = 0
    for x in range(0, largura - 40, 2):
        if all(ocup_col[i] > 0.015 for i in range(x, x + 40, 2)):
            x0 = x
            break

    ocup_lin = [0.0] * altura
    for y in range(0, altura, 2):
        ocup_lin[y] = sum(1 for x in range(0, largura, 2) if eh_objeto(px[x, y])) / (largura / 2)
    linhas = [y for y in range(0, altura, 2) if ocup_lin[y] > 0.02]
    y0, y1 = (linhas[0], linhas[-1]) if linhas else (0, altura - 1)

    return x0, y0, y1


def fundo_por_linha(foto: Image.Image) -> list[tuple[int, int, int]]:
    """Cor do fundo de cada linha da arte — ver COLUNAS_FUNDO / LINHAS_SUAVIZA."""
    largura, altura = foto.size
    px = foto.load()
    n = min(COLUNAS_FUNDO, largura)

    bruto = []
    for y in range(altura):
        amostra = [px[x, y] for x in range(n)]
        bruto.append(tuple(median(c[canal] for c in amostra) for canal in range(3)))

    suave = []
    for y in range(altura):
        ini, fim = max(0, y - LINHAS_SUAVIZA), min(altura, y + LINHAS_SUAVIZA + 1)
        janela = bruto[ini:fim]
        suave.append(tuple(round(median(c[canal] for c in janela)) for canal in range(3)))
    return suave


def mascara(largura: int, altura: int, rampa_esq: int, rampa_topo: int, rampa_base: int) -> Image.Image:
    """Alfa cheio no miolo, caindo onde a arte encosta no fundo estendido."""
    m = Image.new("L", (largura, altura), 255)
    px = m.load()
    for i in range(min(rampa_esq, largura // 2)):
        v = round(255 * i / rampa_esq)
        for y in range(altura):
            px[i, y] = min(px[i, y], v)
    for lado, n in ((0, rampa_topo), (1, rampa_base)):
        if not n:
            continue
        for i in range(min(n, altura // 2)):
            v = round(255 * i / n)
            y = i if lado == 0 else altura - 1 - i
            for x in range(largura):
                px[x, y] = min(px[x, y], v)
    return m


def gerar(slug: str, cfg: dict) -> None:
    arte = Image.open(ORIGEM / cfg["wide"]).convert("RGB")
    x0, y0, y1 = medir(arte)

    # Escala que põe o início da composição em `alvo` da tela. A distância entre o início do
    # produto e a borda direita da arte é o que precisa caber na fatia à direita.
    alvo = cfg.get("alvo", ALVO_INICIO)
    fatia = LARGURA * (1 - alvo) - MARGEM_DIREITA
    escala = fatia / (arte.width - x0)

    larg, alt = round(arte.width * escala), round(arte.height * escala)
    arte = arte.resize((larg, alt), Image.LANCZOS)
    fundo = fundo_por_linha(arte)

    x_arte = LARGURA - MARGEM_DIREITA - larg
    # Centra a MASSA do produto na vertical, não o quadro da arte. `descer` corrige à mão
    # quando a massa medida não representa o produto — ver o comentário em SEGMENTOS.
    centro_produto = (y0 + y1) / 2 * escala
    y_arte = round(ALTURA / 2 - centro_produto) + cfg.get("descer", 0)
    y_arte = min(0, max(y_arte, ALTURA - alt)) if alt >= ALTURA else y_arte

    tela = Image.new("RGB", (LARGURA, ALTURA))
    pintar = tela.load()
    for y in range(ALTURA):
        # Fora da arte, o fundo continua o da primeira/última linha dela.
        cor = fundo[min(max(y - y_arte, 0), alt - 1)]
        for x in range(LARGURA):
            pintar[x, y] = cor

    topo = RAMPA if y_arte > 0 else 0
    base = RAMPA if y_arte + alt < ALTURA else 0
    tela.paste(arte, (x_arte, y_arte), mascara(larg, alt, RAMPA, topo, base))

    destino = DESTINO / f"banner-{slug}.webp"
    tela.save(destino, "WEBP", quality=88, method=6)
    kb = destino.stat().st_size / 1024
    print(
        f"{slug:14s} inicio -> {(x_arte + x0*escala)/LARGURA*100:4.1f}% da tela | "
        f"escala={escala:.3f} | produto y {y_arte + y0*escala:4.0f}..{y_arte + y1*escala:4.0f} "
        f"de {ALTURA} | {kb:.0f} KB"
    )


def gerar_mobile(slug: str, arquivo: str) -> None:
    """
    Versão de celular. A arte já está composta — aqui só se reduz e converte.

    O que este passo MEDE e imprime é onde a faixa de produto começa: é esse número que a
    página precisa respeitar ao reservar espaço embaixo do texto, para o título nunca cair
    em cima dos frascos. Ver o HERO em segmentos/[slug]/page.tsx.
    """
    arte = Image.open(ORIGEM / arquivo).convert("RGB")
    px = arte.load()
    largura, altura = arte.size

    ocup = [0.0] * altura
    for y in range(0, altura, 2):
        ocup[y] = sum(1 for x in range(0, largura, 2) if eh_objeto(px[x, y])) / (largura / 2)
    inicio = 0
    for y in range(0, altura - 60, 2):
        if all(ocup[i] > 0.02 for i in range(y, y + 60, 2)):
            inicio = y
            break

    saida = arte.resize((LARGURA_MOBILE, round(altura * LARGURA_MOBILE / largura)), Image.LANCZOS)
    destino = DESTINO / f"banner-{slug}-mobile.webp"
    saida.save(destino, "WEBP", quality=86, method=6)

    # Altura do produto em frações da LARGURA da tela: é assim que a página reserva o espaço
    # (padding em %), porque a imagem entra com a largura toda e a proporção natural.
    proporcao = altura / largura
    reserva = (1 - inicio / altura) * proporcao
    print(
        f"{slug:14s} mobile: produto a partir de {inicio/altura*100:4.1f}% da arte "
        f"-> reservar {reserva*100:4.1f}% da largura | {destino.stat().st_size/1024:.0f} KB"
    )


if __name__ == "__main__":
    for slug, fontes in SEGMENTOS.items():
        gerar(slug, fontes)
    print()
    for slug, fontes in SEGMENTOS.items():
        gerar_mobile(slug, fontes["mobile"])
