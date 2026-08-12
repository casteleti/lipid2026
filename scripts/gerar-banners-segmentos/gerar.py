#!/usr/bin/env python3
"""
Gera as versões panorâmicas das composições de produto de /segmentos/<slug>.

Motivo: o asset original é 1400x901 (~1.55:1) e nasceu para ocupar uma coluna ao lado do
texto. Como banner de largura inteira ele fica pequeno — e não dá para simplesmente recortar
para 2.3:1, porque isso decapitaria os frascos (a composição ocupa ~68% da altura).

O que este script faz: mantém a foto intacta, encosta ela à direita de uma tela panorâmica e
preenche o resto **com o próprio fundo da foto**. Nada é inventado — a margem vazia de cada
original é horizontalmente constante (medido: diferença máxima de 11/255 entre a coluna 0 e a
coluna 110), então repetir a cor de cada linha continua exatamente o mesmo degradê vertical.

As bordas da colagem recebem uma rampa de alfa para que a emenda não apareça nem em tela 4K.
O original continua existindo e é o que o site usa no celular — ver ARTES_SEGMENTO em
apps/website/src/app/segmentos/[slug]/page.tsx.

Saída: apps/website/public/segmentos/banner-<slug>.webp
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image

RAIZ = Path(__file__).resolve().parents[2]
PASTA = RAIZ / "apps" / "website" / "public" / "segmentos"

# Arquivo de origem e folgas por segmento. A cosmética é o caso fora do padrão: a foto nova
# tem moléculas douradas encostando nas duas bordas laterais, então não há margem vazia para
# a rampa curta trabalhar. Ela vai encostada na direita (margem 0, sem rampa daquele lado —
# a borda da foto coincide com a da tela, e emenda que não existe não aparece) e recebe uma
# rampa esquerda longa, que dissolve as moléculas daquele lado no fundo.
SEGMENTOS: dict[str, dict] = {
    "farmaceutica": {"origem": "farmaceutica.webp"},
    "cosmetica": {"origem": "cosmetica-pack.webp", "margem_direita": 0, "rampa_esq": 150,
                  "rampa_dir": 0},
    "nutricional": {"origem": "nutricional.webp"},
    "veterinaria": {"origem": "veterinaria.webp"},
}

# 2800x1120 = 2.5:1. Largura de sobra para telas 4K sem esticar o bitmap.
LARGURA, ALTURA = 2800, 1120

# A folga VERTICAL é o que define o tamanho do produto na tela — não a largura. Com
# `object-cover` o navegador iguala a altura da imagem à da dobra, então a composição ocupa
# sempre a mesma fração da altura, por mais fundo vazio que se acrescente à esquerda:
# alargar a tela só faz o navegador cortar mais da esquerda, e o produto volta ao mesmo
# lugar. Encolher a foto dentro de uma tela mais alta é o único jeito de empurrá-lo para a
# direita. A 62% da altura, o produto fica em ~42% da dobra e começa depois da metade,
# deixando a coluna de texto livre.
ALTURA_FOTO = round(ALTURA * 0.62)

# Folga à direita, além da margem que a própria foto já traz.
MARGEM_DIREITA = 60

# A foto é CENTRADA na vertical, não encostada embaixo. Ancorada embaixo, a sobra ia toda
# para cima e os produtos ficavam no rodapé do banner, desalinhados do bloco de texto, que é
# centrado na dobra. Centrada, a sobra se divide: acima continua o fundo do estúdio (a
# primeira linha da foto), abaixo continua a bancada (a última) — as duas lisas, então a
# extensão não aparece nem de um lado nem do outro.
#
# E o que se centra é o PRODUTO, não o quadro da foto: as quatro têm mais ar acima dos
# frascos do que abaixo, então centrar o retângulo deixava a composição 4% baixa. O recorte
# do conteúdo é medido em cada arquivo, o que também dispensa acertar isso na mão quando a
# foto de um segmento for trocada.

# Rampa padrão de alfa nas bordas da colagem. Cabe na margem vazia dos originais antigos
# (a menor é 67px à direita, ~53px depois da escala).
RAMPA = 45

# Quantas colunas da esquerda entram na mediana que estima o fundo de cada linha, e por
# quantas linhas essa estimativa é suavizada depois.
#
# A mediana horizontal sozinha não basta: nas linhas em que a molécula dourada da cosmética
# ocupa mais da metade da faixa amostrada, ela vira a mediana — e o fundo saía com uma listra
# creme atravessando o banner inteiro. A segunda mediana, agora ao longo das linhas, descarta
# essas poucas linhas destoantes e preserva o que varia devagar (o degradê e a linha do chão
# do estúdio, que é o que faz a extensão parecer o mesmo set).
COLUNAS_FUNDO, LINHAS_SUAVIZA = 120, 60


def mascara_com_rampa(largura: int, altura: int, esq: int, dir_: int) -> Image.Image:
    """Alfa cheio no miolo, caindo nas bordas para dissolver a emenda."""
    m = Image.new("L", (largura, altura), 255)
    px = m.load()
    for lado, n in ((0, esq), (1, dir_)):
        for i in range(min(n, largura // 2)):
            v = round(255 * i / n)
            x = i if lado == 0 else largura - 1 - i
            for y in range(altura):
                px[x, y] = min(px[x, y], v)
    for i in range(min(RAMPA, altura // 2)):
        v = round(255 * i / RAMPA)
        for x in range(largura):
            px[x, i] = min(px[x, i], v)
            px[x, altura - 1 - i] = min(px[x, altura - 1 - i], v)
    return m


def gerar(slug: str, cfg: dict) -> None:
    foto = Image.open(PASTA / cfg["origem"]).convert("RGB")

    escala = ALTURA_FOTO / foto.height
    largura_foto = round(foto.width * escala)
    foto = foto.resize((largura_foto, ALTURA_FOTO), Image.LANCZOS)

    tela = Image.new("RGB", (LARGURA, ALTURA))
    amostra = foto.load()
    pintar = tela.load()

    x_colagem = LARGURA - largura_foto - cfg.get("margem_direita", MARGEM_DIREITA)

    # Fundo de cada linha da foto: mediana das primeiras colunas, depois mediana ao longo
    # das linhas vizinhas (ver COLUNAS_FUNDO / LINHAS_SUAVIZA).
    bruto = []
    n_col = min(COLUNAS_FUNDO, largura_foto)
    for ys in range(ALTURA_FOTO):
        canais = []
        for c in range(3):
            vals = sorted(amostra[x, ys][c] for x in range(n_col))
            canais.append(vals[len(vals) // 2])
        bruto.append(canais)

    fundo = []
    for ys in range(ALTURA_FOTO):
        a = max(0, ys - LINHAS_SUAVIZA)
        b = min(ALTURA_FOTO, ys + LINHAS_SUAVIZA + 1)
        canais = []
        for c in range(3):
            vals = sorted(bruto[i][c] for i in range(a, b))
            canais.append(vals[len(vals) // 2])
        fundo.append(tuple(canais))

    # Linhas que têm produto: as que destoam do fundo estimado acima. `y_colagem` sai daí,
    # posicionando o CENTRO desse recorte na metade da tela.
    linhas = [
        ys
        for ys in range(ALTURA_FOTO)
        if sum(
            1
            for x in range(0, largura_foto, 6)
            if max(abs(amostra[x, ys][c] - fundo[ys][c]) for c in range(3)) > 16
        )
        > 3
    ]
    centro_conteudo = (linhas[0] + linhas[-1]) / 2 if linhas else ALTURA_FOTO / 2
    y_colagem = round(ALTURA / 2 - centro_conteudo)

    # Preenche a tela com esse fundo, linha a linha. Acima e abaixo da colagem a linha é
    # grampeada na primeira/última da foto — continua o mesmo degradê, sem inventar cor nova.
    for y in range(ALTURA):
        cor = fundo[min(max(y - y_colagem, 0), ALTURA_FOTO - 1)]
        for x in range(LARGURA):
            pintar[x, y] = cor

    mascara = mascara_com_rampa(
        largura_foto, ALTURA_FOTO,
        cfg.get("rampa_esq", RAMPA), cfg.get("rampa_dir", RAMPA),
    )
    tela.paste(foto, (x_colagem, y_colagem), mascara)

    destino = PASTA / f"banner-{slug}.webp"
    tela.save(destino, "WEBP", quality=88, method=6)
    kb = destino.stat().st_size / 1024
    print(f"gerado: {destino.relative_to(RAIZ)}  ({LARGURA}x{ALTURA}, {kb:.1f} KB)")


if __name__ == "__main__":
    for slug, cfg in SEGMENTOS.items():
        gerar(slug, cfg)
