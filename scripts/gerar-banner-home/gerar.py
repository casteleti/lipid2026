#!/usr/bin/env python3
"""
Gera o fullbanner da Home a partir da vesícula lipossomal original.

A origem (img/imagens-originais/vesicula-com-principio-ativo.png) é um quadrado 1254×1254 com
a vesícula centralizada — não serve como banner panorâmico: esticada ficaria deformada, e
recortada para 2.29:1 perderia metade da esfera.

O que este script faz: recompõe. A vesícula é escalada e reposicionada à direita, transbordando
a borda direita e a inferior, e o resto da tela recebe o fundo do próprio original — um degradê
vertical entre a cor média do topo e a da base, amostradas em cantos livres de conteúdo. A
colagem usa máscara RADIAL, não retangular: o que entra é a esfera e o halo em volta dela, que
se dissolve no degradê. Por isso não há emenda em lugar nenhum.

Nada é inventado: escala, posição e cor de fundo vêm todas do arquivo original.

Saída: apps/website/public/hero/fullbanner-vesicula.jpg
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image

RAIZ = Path(__file__).resolve().parents[2]
ORIGEM = RAIZ / "img" / "imagens-originais" / "vesicula-com-principio-ativo.png"
DESTINO = RAIZ / "apps" / "website" / "public" / "hero" / "fullbanner-vesicula.jpg"

# 2800×1225 = 2.286:1, a mesma proporção do fullbanner que já estava na Home (1920×841), para
# que o HeroSection não precise de nenhum ajuste de altura.
LARGURA, ALTURA = 2800, 1225

# Círculo da vesícula no original, medido (não estimado): a linha central do arquivo tem
# conteúdo de x=130 a x=1114, logo centro em 622 e raio 492.
CENTRO_ORIG, RAIO_ORIG = (622, 625), 492

# Onde a esfera fica na tela. Raio a 50% da altura e centro a 80% da largura: transborda a
# direita e a base, encosta o topo por dentro e deixa a metade esquerda livre para o texto.
RAIO_ALVO = round(ALTURA * 0.50)
CENTRO_ALVO = (round(LARGURA * 0.80), round(ALTURA * 0.55))

# A máscara é opaca até 1.04 do raio e zera em 1.14 — a faixa de dissolução cai sobre o fundo
# do original, nunca sobre a esfera.
MASCARA_CHEIA, MASCARA_ZERO = 1.04, 1.14


def cor_media(im: Image.Image, caixa: tuple[int, int, int, int]) -> tuple[int, int, int]:
    recorte = im.crop(caixa)
    n = recorte.width * recorte.height
    soma = [0, 0, 0]
    for r, g, b in recorte.getdata():
        soma[0] += r
        soma[1] += g
        soma[2] += b
    return tuple(v // n for v in soma)  # type: ignore[return-value]


def main() -> None:
    origem = Image.open(ORIGEM).convert("RGB")

    # Fundo: degradê vertical entre o topo e a base do próprio original, amostrados em cantos
    # sem conteúdo (a esfera começa em x=130, então a faixa de 0 a 110 é fundo puro).
    topo = cor_media(origem, (0, 0, 110, 70))
    base = cor_media(origem, (0, origem.height - 70, 110, origem.height))

    escala = RAIO_ALVO / RAIO_ORIG
    esfera = origem.resize(
        (round(origem.width * escala), round(origem.height * escala)), Image.LANCZOS
    )
    cx, cy = round(CENTRO_ORIG[0] * escala), round(CENTRO_ORIG[1] * escala)
    amostra = esfera.load()

    tela = Image.new("RGB", (LARGURA, ALTURA))
    pintar = tela.load()
    ox, oy = CENTRO_ALVO[0] - cx, CENTRO_ALVO[1] - cy
    r0 = RAIO_ALVO * MASCARA_ZERO
    dissipar = r0 * 0.45

    # O fundo CONTINUA a partir da borda da máscara, em vez de ser um degradê independente.
    # Para cada ângulo, lê-se o original na distância exata em que a máscara zera — assim a
    # cor bate na emenda e não se forma o halo claro em volta da esfera.
    #
    # Duas correções sobre a versão ingênua disso: a leitura é MÉDIA de 9 pontos num arco de
    # ±4°, porque senão cada respingo de luz na borda vira um raio radial varrendo a tela; e a
    # influência da borda se dissipa em meio raio, migrando para o degradê vertical do próprio
    # arquivo, que é o que preenche o campo aberto à esquerda.
    passo = 360
    arco = [
        (
            (i - 4) * 0.0698 / 4,  # ±4° em radianos
        )[0]
        for i in range(9)
    ]
    import math

    borda_por_angulo: list[tuple[float, float, float]] = []
    for k in range(passo):
        ang = 2 * math.pi * k / passo
        soma = [0.0, 0.0, 0.0]
        n = 0
        for da in arco:
            bx = round(CENTRO_ALVO[0] + math.cos(ang + da) * r0) - ox
            by = round(CENTRO_ALVO[1] + math.sin(ang + da) * r0) - oy
            if 0 <= bx < esfera.width and 0 <= by < esfera.height:
                c = amostra[bx, by]
                soma[0] += c[0]
                soma[1] += c[1]
                soma[2] += c[2]
                n += 1
        borda_por_angulo.append(tuple(v / n for v in soma) if n else None)  # type: ignore

    for y in range(ALTURA):
        t = y / (ALTURA - 1)
        fundo_y = tuple(topo[i] + (base[i] - topo[i]) * t for i in range(3))
        dy = y - CENTRO_ALVO[1]
        for x in range(LARGURA):
            dx = x - CENTRO_ALVO[0]
            d = (dx * dx + dy * dy) ** 0.5 or 1.0
            idx = round(math.atan2(dy, dx) / (2 * math.pi) * passo) % passo
            borda = borda_por_angulo[idx] or fundo_y
            k = min(max((d - r0) / dissipar, 0.0), 1.0)
            pintar[x, y] = tuple(
                round(borda[i] + (fundo_y[i] - borda[i]) * k) for i in range(3)
            )

    mascara = Image.new("L", esfera.size, 0)
    mp = mascara.load()
    cheio, zero = RAIO_ALVO * MASCARA_CHEIA, RAIO_ALVO * MASCARA_ZERO
    for y in range(esfera.height):
        dy2 = (y - cy) ** 2
        for x in range(esfera.width):
            d = (dy2 + (x - cx) ** 2) ** 0.5
            if d <= cheio:
                mp[x, y] = 255
            elif d < zero:
                mp[x, y] = round(255 * (zero - d) / (zero - cheio))

    tela.paste(esfera, (CENTRO_ALVO[0] - cx, CENTRO_ALVO[1] - cy), mascara)

    DESTINO.parent.mkdir(parents=True, exist_ok=True)
    tela.save(DESTINO, "JPEG", quality=88, optimize=True, progressive=True)
    kb = DESTINO.stat().st_size / 1024
    print(f"fundo: topo {topo}  base {base}")
    print(f"gerado: {DESTINO.relative_to(RAIZ)}  ({LARGURA}x{ALTURA}, {kb:.1f} KB)")


if __name__ == "__main__":
    main()
