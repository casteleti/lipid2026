#!/usr/bin/env python3
"""
Gera as imagens do institucional (/sobre) a partir das fotos da planta.

A origem (img/imagens-originais/supera-002.png) é uma foto 2200×1780 de prédio com céu azul
e gramado — forte demais para ficar atrás de um título. O que este script faz é transformá-la
em marca d'água panorâmica: recorta em 2:1 mantendo o prédio à direita, lava a imagem em
direção ao branco e aplica uma rampa de alfa horizontal, de modo que a metade esquerda fica
LIMPA para o texto e a construção só aparece do meio para a direita.

A saída tem canal alfa de propósito: assim ela se assenta sobre o degradê que a seção já tem,
em vez de trazer um fundo próprio que brigaria com ele.

Nada é inventado — escala, recorte e cor saem todos do arquivo original.

Saídas:
  apps/website/public/institucional/hero-planta.webp   (fundo do hero)
  apps/website/public/sobre/sobre-qualidade-equipe-planta.webp   (dobra "qualidade")
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image

RAIZ = Path(__file__).resolve().parents[2]
ORIGEM = RAIZ / "img" / "imagens-originais" / "supera-002.png"
DESTINO = RAIZ / "apps" / "website" / "public" / "institucional" / "hero-planta.webp"

LARGURA, ALTURA = 2800, 1400

# Quanto da foto sobrevive à lavagem. 0 = branco puro, 1 = foto original. A referência do
# handoff é bem alta-chave: o prédio precisa se ler como textura, não como fotografia.
FORCA_FOTO = 0.42

# Rampa de alfa: totalmente transparente até `INICIO`, opacidade cheia a partir de `FIM`.
# Entre os dois a curva é suavizada (smoothstep) — uma rampa linear deixa um vinco visível
# nas duas pontas, que é justamente o que faz um degradê parecer "colado".
#
# `INICIO` cai um pouco antes da borda esquerda da foto (que começa em 1 - 1780/2200 * ... —
# ver `main`), de modo que ela entra já quase transparente e não deixa aresta vertical.
INICIO, FIM = 0.36, 0.82


def suavizar(t: float) -> float:
    t = min(max(t, 0.0), 1.0)
    return t * t * (3 - 2 * t)


# ------------------------------------------------------------------ dobra "qualidade"
# Recorte retrato da foto do mezanino, no lugar do still de pasta e frasco que havia antes.
# A proporção é a do arquivo que ele substitui (938×1174), para o slot não mudar de forma.
ORIGEM_EQUIPE = RAIZ / "img" / "imagens-originais" / "supera-003.png"
DESTINO_EQUIPE = RAIZ / "apps" / "website" / "public" / "sobre" / "sobre-qualidade-equipe-planta.webp"
EQUIPE_LARGURA, EQUIPE_ALTURA = 938, 1174


def gerar_equipe() -> None:
    foto = Image.open(ORIGEM_EQUIPE).convert("RGB")

    # Recorta pela esquerda: é o lado que reúne os três níveis com gente — a passarela
    # superior, o corredor amarelo e o grupo sentado embaixo. Recortar centralizado perderia
    # o grupo do rodapé, que é o que dá escala humana à foto.
    proporcao = EQUIPE_LARGURA / EQUIPE_ALTURA
    largura = round(foto.height * proporcao)
    foto = foto.crop((0, 0, largura, foto.height))
    foto = foto.resize((EQUIPE_LARGURA, EQUIPE_ALTURA), Image.LANCZOS)

    DESTINO_EQUIPE.parent.mkdir(parents=True, exist_ok=True)
    foto.save(DESTINO_EQUIPE, "WEBP", quality=88, method=6)
    kb = DESTINO_EQUIPE.stat().st_size / 1024
    print(f"gerado: {DESTINO_EQUIPE.relative_to(RAIZ)}  ({EQUIPE_LARGURA}x{EQUIPE_ALTURA}, {kb:.1f} KB)")


def gerar_hero() -> None:
    foto = Image.open(ORIGEM).convert("RGB")

    # Encaixa pela ALTURA e ancora à direita, em vez de cobrir pela largura. Cobrindo, a foto
    # era ampliada 1.27× e o prédio estourava a moldura; assim ele cabe inteiro, com ar em
    # volta, e a metade esquerda do banner simplesmente não tem foto.
    escala = ALTURA / foto.height
    largura_foto = round(foto.width * escala)
    foto = foto.resize((largura_foto, ALTURA), Image.LANCZOS)

    # Lava em direção ao branco, preservando a proporção de cada canal.
    branco = Image.new("RGB", foto.size, (255, 255, 255))
    foto = Image.blend(branco, foto, FORCA_FOTO)

    tela = Image.new("RGB", (LARGURA, ALTURA), (255, 255, 255))
    tela.paste(foto, (LARGURA - largura_foto, 0))
    foto = tela

    # Rampa de alfa da esquerda para a direita.
    mascara = Image.new("L", (LARGURA, 1))
    linha = mascara.load()
    for x in range(LARGURA):
        f = x / (LARGURA - 1)
        linha[x, 0] = round(255 * suavizar((f - INICIO) / (FIM - INICIO)))
    mascara = mascara.resize((LARGURA, ALTURA))

    saida = foto.convert("RGBA")
    saida.putalpha(mascara)

    DESTINO.parent.mkdir(parents=True, exist_ok=True)
    saida.save(DESTINO, "WEBP", quality=86, method=6)
    kb = DESTINO.stat().st_size / 1024
    print(f"gerado: {DESTINO.relative_to(RAIZ)}  ({LARGURA}x{ALTURA}, {kb:.1f} KB)")


if __name__ == "__main__":
    gerar_hero()
    gerar_equipe()
