#!/usr/bin/env python3
"""
Gera as 6 ilustrações (2 por tecnologia) das landings de /tecnologias/<slug>.

São diagramas esquemáticos — não fotos e não representações em escala. A geometria é
calculada aqui (em vez de desenhada à mão no SVG) para que ajustar raio, número de
lipídios ou espaçamento continue sendo uma mudança de uma linha.

Saída: apps/website/public/tecnologias/*.svg
"""

from __future__ import annotations

import math
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[2]
SAIDA = RAIZ / "apps" / "website" / "public" / "tecnologias"

# Paleta da marca (mesma do tailwind.config do site).
AZUL = "#1e3f99"
AZUL_ESCURO = "#16205c"
AZUL_CLARO = "#93aee0"
AZUL_LAVADO = "#e8eefb"
CINZA = "#64748b"
CINZA_CLARO = "#cbd5e1"
BRANCO = "#ffffff"

FONTE = "system-ui, -apple-system, 'Segoe UI', sans-serif"


def documento(largura: int, altura: int, corpo: str, titulo: str) -> str:
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {largura} {altura}" role="img" aria-labelledby="t">
  <title id="t">{titulo}</title>
  <defs>
    <linearGradient id="fundo" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="{BRANCO}"/>
      <stop offset="100%" stop-color="{AZUL_LAVADO}"/>
    </linearGradient>
  </defs>
  <rect width="{largura}" height="{altura}" fill="url(#fundo)"/>
{corpo}
</svg>
"""


def rotulo(x: float, y: float, texto: str, tamanho: int = 15, cor: str = AZUL_ESCURO,
           peso: int = 600, ancora: str = "start") -> str:
    return (f'  <text x="{x:.1f}" y="{y:.1f}" font-family="{FONTE}" font-size="{tamanho}" '
            f'font-weight="{peso}" fill="{cor}" text-anchor="{ancora}">{texto}</text>')


def caixa_alta(x: float, y: float, texto: str, ancora: str = "start") -> str:
    return (f'  <text x="{x:.1f}" y="{y:.1f}" font-family="{FONTE}" font-size="11" '
            f'font-weight="700" letter-spacing="1.6" fill="{AZUL}" '
            f'text-anchor="{ancora}">{texto.upper()}</text>')


def linha_guia(x1: float, y1: float, x2: float, y2: float) -> str:
    return (f'  <path d="M {x1:.1f} {y1:.1f} L {x2:.1f} {y2:.1f}" stroke="{CINZA_CLARO}" '
            f'stroke-width="1.2" stroke-dasharray="3 3" fill="none"/>')


def chips(itens: list[str], x_inicio: float, y: float, largura_max: float) -> str:
    """Pílulas de texto que quebram para a linha seguinte antes de estourar a largura útil.
    Sem isso o último item vaza para fora do cartão quando alguém edita a lista."""
    partes = []
    x, linha_y = x_inicio, y
    for item in itens:
        largura = 14 + len(item) * 7.5
        if x + largura > x_inicio + largura_max:
            x, linha_y = x_inicio, linha_y + 44
        partes.append(f'  <rect x="{x:.1f}" y="{linha_y:.1f}" width="{largura:.1f}" height="34" rx="17" '
                      f'fill="{BRANCO}" stroke="{AZUL_CLARO}" stroke-width="1.4"/>')
        partes.append(rotulo(x + largura / 2, linha_y + 22, item, 13, AZUL, 600, ancora="middle"))
        x += largura + 10
    return "\n".join(partes)


def lipidio(cx: float, cy: float, angulo: float, comprimento: float, raio_cabeca: float,
            cor_cabeca: str, cor_cauda: str, largura_cauda: float = 1.6) -> str:
    """Uma molécula: cabeça polar (círculo) + duas caudas apolares, apontando `angulo`."""
    dx, dy = math.cos(angulo), math.sin(angulo)
    px, py = -dy, dx  # perpendicular, para separar as duas caudas
    partes = [f'    <circle cx="{cx:.1f}" cy="{cy:.1f}" r="{raio_cabeca:.1f}" fill="{cor_cabeca}"/>']
    for lado in (-1, 1):
        ox, oy = px * raio_cabeca * 0.42 * lado, py * raio_cabeca * 0.42 * lado
        x1, y1 = cx + dx * raio_cabeca * 0.8 + ox, cy + dy * raio_cabeca * 0.8 + oy
        meio_x = x1 + dx * comprimento * 0.55 + ox * 0.9
        meio_y = y1 + dy * comprimento * 0.55 + oy * 0.9
        x2, y2 = cx + dx * comprimento, cy + dy * comprimento
        partes.append(
            f'    <path d="M {x1:.1f} {y1:.1f} Q {meio_x:.1f} {meio_y:.1f} {x2:.1f} {y2:.1f}" '
            f'stroke="{cor_cauda}" stroke-width="{largura_cauda}" stroke-linecap="round" fill="none"/>'
        )
    return "\n".join(partes)


def bicamada_circular(cx: float, cy: float, raio_interno: float, espessura: float,
                      quantidade: int, raio_cabeca: float = 5.2,
                      cor_cabeca: str = AZUL, cor_cauda: str = AZUL_CLARO) -> str:
    """Bicamada fechada: uma coroa de lipídios apontando para dentro e outra para fora."""
    cauda = espessura / 2
    partes = []
    for i in range(quantidade):
        a = 2 * math.pi * i / quantidade
        # folheto externo: cabeça fora, caudas para o centro
        x = cx + math.cos(a) * (raio_interno + espessura)
        y = cy + math.sin(a) * (raio_interno + espessura)
        partes.append(lipidio(x, y, a + math.pi, cauda, raio_cabeca, cor_cabeca, cor_cauda))
        # folheto interno: cabeça dentro, caudas para fora
        x = cx + math.cos(a) * raio_interno
        y = cy + math.sin(a) * raio_interno
        partes.append(lipidio(x, y, a, cauda, raio_cabeca, cor_cabeca, cor_cauda))
    return "\n".join(partes)


# --------------------------------------------------------------------------- LIPOSSOMAS 1
def lipossomas_arquitetura() -> str:
    L, A = 900, 560
    cx, cy = 330, 285
    p = [
        caixa_alta(60, 62, "Lipossoma — corte esquemático"),
        rotulo(60, 96, "Uma arquitetura, três lugares para o ativo", 22, AZUL_ESCURO, 700),
        f'  <circle cx="{cx}" cy="{cy}" r="150" fill="{BRANCO}" opacity="0.75"/>',
        f'  <circle cx="{cx}" cy="{cy}" r="118" fill="{AZUL_LAVADO}"/>',
        bicamada_circular(cx, cy, 122, 30, 54),
    ]

    # ativo hidrossolúvel no núcleo aquoso
    for ang, raio in ((0.6, 62), (2.1, 40), (3.4, 70), (4.6, 34), (5.6, 58), (1.4, 84)):
        x, y = cx + math.cos(ang) * raio, cy + math.sin(ang) * raio
        p.append(f'  <circle cx="{x:.1f}" cy="{y:.1f}" r="7" fill="{AZUL}" opacity="0.85"/>')

    # ativo lipossolúvel alojado na bicamada
    for ang in (0.35, 1.75, 3.05, 4.45, 5.5):
        x, y = cx + math.cos(ang) * 137, cy + math.sin(ang) * 137
        p.append(f'  <rect x="{x - 5:.1f}" y="{y - 5:.1f}" width="10" height="10" rx="2.5" '
                 f'fill="{AZUL_ESCURO}" transform="rotate({math.degrees(ang):.0f} {x:.1f} {y:.1f})"/>')

    legendas = [
        (cy - 78, "Núcleo aquoso", "Onde fica o ativo hidrossolúvel.", "circulo"),
        (cy + 10, "Bicamada fosfolipídica", "Aloja o ativo lipossolúvel.", "quadrado"),
        (cy + 98, "Interface", "Região das moléculas anfifílicas.", "anel"),
    ]
    x_texto = 560
    for y, titulo, desc, marca in legendas:
        if marca == "circulo":
            p.append(f'  <circle cx="{x_texto - 22}" cy="{y - 5}" r="7" fill="{AZUL}"/>')
        elif marca == "quadrado":
            p.append(f'  <rect x="{x_texto - 29}" y="{y - 12}" width="14" height="14" rx="3.5" fill="{AZUL_ESCURO}"/>')
        else:
            p.append(f'  <circle cx="{x_texto - 22}" cy="{y - 5}" r="7" fill="none" '
                     f'stroke="{AZUL_CLARO}" stroke-width="3"/>')
        p.append(rotulo(x_texto, y, titulo, 17, AZUL_ESCURO, 700))
        p.append(rotulo(x_texto, y + 24, desc, 14, CINZA, 400))

    p.append(linha_guia(cx + 60, cy - 60, x_texto - 45, cy - 82))
    p.append(linha_guia(cx + 140, cy + 6, x_texto - 45, cy + 6))
    p.append(linha_guia(cx + 118, cy + 96, x_texto - 45, cy + 94))

    p.append(rotulo(60, A - 40, "Diagrama esquemático. Proporções não representam escala real.",
                    12, CINZA, 400))
    return documento(L, A, "\n".join(p), "Corte esquemático de um lipossoma")


# --------------------------------------------------------------------------- LIPOSSOMAS 2
def lipossomas_populacao() -> str:
    L, A = 900, 560
    p = [
        caixa_alta(60, 62, "O que a especificação precisa dizer"),
        rotulo(60, 96, "Tamanho médio não descreve uma população", 22, AZUL_ESCURO, 700),
    ]

    # Três arquiteturas
    arquiteturas = [
        (170, 235, "Unilamelar", "Uma bicamada."),
        (400, 235, "Multilamelar", "Camadas concêntricas."),
        (630, 235, "Heterogênea", "Populações coexistindo."),
    ]
    p.append(f'  <rect x="60" y="140" width="780" height="200" rx="20" fill="{BRANCO}" opacity="0.7"/>')

    cx, cy, _, _ = 170, 235, None, None
    p.append(f'  <circle cx="{cx}" cy="{cy}" r="52" fill="{AZUL_LAVADO}"/>')
    p.append(bicamada_circular(cx, cy, 44, 18, 26, raio_cabeca=3.6))

    cx = 400
    p.append(f'  <circle cx="{cx}" cy="{cy}" r="62" fill="{AZUL_LAVADO}"/>')
    p.append(bicamada_circular(cx, cy, 52, 16, 30, raio_cabeca=3.2))
    p.append(bicamada_circular(cx, cy, 22, 14, 16, raio_cabeca=3.0))

    cx = 630
    for dx, dy, r in ((-34, -6, 20), (8, -20, 30), (26, 22, 15), (-16, 26, 11)):
        p.append(f'  <circle cx="{cx + dx}" cy="{cy + dy}" r="{r}" fill="{AZUL_LAVADO}"/>')
        p.append(bicamada_circular(cx + dx, cy + dy, r - 6, 9, max(8, int(r * 0.9)), raio_cabeca=2.4))

    for x, _, titulo, desc in arquiteturas:
        p.append(rotulo(x, 318, titulo, 16, AZUL_ESCURO, 700, ancora="middle"))
        p.append(rotulo(x, 338, desc, 13, CINZA, 400, ancora="middle"))

    # Atributos que compõem a especificação
    p.append(rotulo(60, 400, "Atributos que sustentam o dossiê", 15, AZUL_ESCURO, 700))
    p.append(chips(["Distribuição de tamanho", "Índice de polidispersidade", "Carga superficial",
                    "Morfologia", "Ativo livre × encapsulado"], 60, 418, 780))

    p.append(rotulo(60, A - 40, "Diagrama esquemático. Proporções não representam escala real.",
                    12, CINZA, 400))
    return documento(L, A, "\n".join(p), "Arquiteturas e atributos de uma população liposomal")


# ------------------------------------------------------------------------ FOSFOLIPÍDIOS 1
def fosfolipidios_molecula() -> str:
    L, A = 900, 560
    p = [
        caixa_alta(60, 62, "Fosfolipídio — estrutura"),
        rotulo(60, 96, "Uma molécula, duas afinidades", 22, AZUL_ESCURO, 700),
        f'  <rect x="60" y="140" width="780" height="250" rx="20" fill="{BRANCO}" opacity="0.7"/>',
    ]

    cx, cy = 250, 265
    # cabeça polar
    p.append(f'  <circle cx="{cx}" cy="{cy}" r="46" fill="{AZUL}"/>')
    p.append(rotulo(cx, cy + 6, "P", 26, BRANCO, 700, ancora="middle"))
    # glicerol
    p.append(f'  <rect x="{cx + 46}" y="{cy - 26}" width="54" height="52" rx="12" fill="{AZUL_CLARO}"/>')
    # duas cadeias
    for lado in (-1, 1):
        y0 = cy + lado * 15
        d = f"M {cx + 100} {y0} C {cx + 170} {y0 + lado * 34}, {cx + 230} {y0 - lado * 34}, {cx + 300} {y0 + lado * 12}"
        p.append(f'  <path d="{d}" stroke="{AZUL_ESCURO}" stroke-width="7" stroke-linecap="round" fill="none"/>')

    p.append(caixa_alta(cx - 46, cy - 72, "Região polar"))
    p.append(rotulo(cx - 46, cy - 50, "Afinidade por água", 14, CINZA, 400))
    p.append(caixa_alta(cx + 150, cy - 72, "Cadeias apolares"))
    p.append(rotulo(cx + 150, cy - 50, "Afinidade por óleo", 14, CINZA, 400))

    p.append(rotulo(cx - 46, cy + 96, "É essa dupla natureza que organiza interfaces,", 15, AZUL_ESCURO, 500))
    p.append(rotulo(cx - 46, cy + 118, "emulsões, bicamadas e vesículas.", 15, AZUL_ESCURO, 500))

    # Classes
    p.append(rotulo(60, 440, "Classes com comportamentos distintos", 15, AZUL_ESCURO, 700))
    p.append(chips(["Fosfatidilcolina", "Fosfatidiletanolamina", "Fosfatidilglicerol",
                    "Fosfatidilserina"], 60, 458, 780))

    p.append(rotulo(60, A - 22, "Representação esquemática da molécula, sem escala.", 12, CINZA, 400))
    return documento(L, A, "\n".join(p), "Estrutura anfifílica de um fosfolipídio")


# ------------------------------------------------------------------------ FOSFOLIPÍDIOS 2
def fosfolipidios_organizacao() -> str:
    L, A = 900, 560
    p = [
        caixa_alta(60, 62, "Auto-organização"),
        rotulo(60, 96, "A mesma família, quatro estruturas de trabalho", 22, AZUL_ESCURO, 700),
        f'  <rect x="60" y="140" width="780" height="250" rx="20" fill="{BRANCO}" opacity="0.7"/>',
    ]

    cy = 218

    # 1. monocamada na interface
    cx = 168
    p.append(f'  <rect x="{cx - 68}" y="{cy - 4}" width="136" height="74" rx="8" fill="{AZUL_LAVADO}"/>')
    for i in range(9):
        x = cx - 60 + i * 15
        p.append(lipidio(x, cy - 6, math.pi / 2, 30, 4.6, AZUL, AZUL_CLARO))

    # 2. micela
    cx = 384
    p.append(f'  <circle cx="{cx}" cy="{cy + 30}" r="46" fill="{AZUL_LAVADO}"/>')
    for i in range(18):
        a = 2 * math.pi * i / 18
        x, y = cx + math.cos(a) * 42, cy + 30 + math.sin(a) * 42
        p.append(lipidio(x, y, a + math.pi, 30, 4.4, AZUL, AZUL_CLARO))

    # 3. bicamada plana
    cx = 600
    for i in range(9):
        x = cx - 60 + i * 15
        p.append(lipidio(x, cy + 4, math.pi / 2, 26, 4.4, AZUL, AZUL_CLARO))
        p.append(lipidio(x, cy + 56, -math.pi / 2, 26, 4.4, AZUL, AZUL_CLARO))

    # 4. vesícula
    cx = 782
    p.append(f'  <circle cx="{cx}" cy="{cy + 30}" r="48" fill="{AZUL_LAVADO}"/>')
    p.append(bicamada_circular(cx, cy + 30, 34, 15, 22, raio_cabeca=3.4))

    for x, titulo in ((168, "Monocamada"), (384, "Micela"), (600, "Bicamada"), (782, "Vesícula")):
        p.append(rotulo(x, 362, titulo, 15, AZUL_ESCURO, 700, ancora="middle"))

    p.append(rotulo(60, 432, "O que decide a estrutura formada", 15, AZUL_ESCURO, 700))
    p.append(chips(["Concentração", "Hidratação", "Co-tensoativos", "Temperatura", "Processo"],
                   60, 450, 780))

    p.append(rotulo(60, A - 22, "Diagrama esquemático. Proporções não representam escala real.",
                    12, CINZA, 400))
    return documento(L, A, "\n".join(p), "Estruturas formadas por fosfolipídios")


# ------------------------------------------------------------------------- ENCAPSULAÇÃO 1
def encapsulacao_protecao() -> str:
    L, A = 900, 560
    p = [
        caixa_alta(60, 62, "Encapsulação — função de barreira"),
        rotulo(60, 96, "O mesmo ativo, dois microambientes", 22, AZUL_ESCURO, 700),
    ]

    # Painel esquerdo — ativo exposto
    p.append(f'  <rect x="60" y="140" width="360" height="290" rx="20" fill="{BRANCO}" opacity="0.7"/>')
    cx, cy = 240, 290
    p.append(f'  <circle cx="{cx}" cy="{cy}" r="26" fill="{AZUL_ESCURO}"/>')
    agressores = ["Oxigênio", "Luz", "Umidade", "pH", "Enzimas"]
    for i, agressor in enumerate(agressores):
        a = -math.pi / 2 + (i - 2) * 0.62
        x1, y1 = cx + math.cos(a) * 118, cy + math.sin(a) * 118
        x2, y2 = cx + math.cos(a) * 42, cy + math.sin(a) * 42
        p.append(f'  <path d="M {x1:.1f} {y1:.1f} L {x2:.1f} {y2:.1f}" stroke="{CINZA}" '
                 f'stroke-width="1.8" marker-end="none" fill="none"/>')
        p.append(f'  <circle cx="{x2:.1f}" cy="{y2:.1f}" r="3.4" fill="{CINZA}"/>')
        p.append(rotulo(x1, y1 - 8, agressor, 12, CINZA, 600, ancora="middle"))
    p.append(rotulo(240, 400, "Ativo exposto", 16, AZUL_ESCURO, 700, ancora="middle"))
    p.append(rotulo(240, 421, "Degrada no ritmo do ambiente.", 13, CINZA, 400, ancora="middle"))

    # Painel direito — ativo encapsulado
    p.append(f'  <rect x="480" y="140" width="360" height="290" rx="20" fill="{BRANCO}" opacity="0.9"/>')
    cx = 660
    p.append(f'  <circle cx="{cx}" cy="{cy}" r="74" fill="{AZUL_LAVADO}"/>')
    p.append(bicamada_circular(cx, cy, 58, 16, 34, raio_cabeca=3.6))
    p.append(f'  <circle cx="{cx}" cy="{cy}" r="22" fill="{AZUL_ESCURO}"/>')
    for i in range(5):
        a = -math.pi / 2 + (i - 2) * 0.62
        x1, y1 = cx + math.cos(a) * 118, cy + math.sin(a) * 118
        x2, y2 = cx + math.cos(a) * 82, cy + math.sin(a) * 82
        p.append(f'  <path d="M {x1:.1f} {y1:.1f} L {x2:.1f} {y2:.1f}" stroke="{CINZA_CLARO}" '
                 f'stroke-width="1.8" fill="none"/>')
        p.append(f'  <circle cx="{x2:.1f}" cy="{y2:.1f}" r="3.4" fill="{CINZA_CLARO}"/>')
    p.append(rotulo(660, 400, "Ativo encapsulado", 16, AZUL_ESCURO, 700, ancora="middle"))
    p.append(rotulo(660, 421, "Exposição mediada pelo carreador.", 13, CINZA, 400, ancora="middle"))

    p.append(rotulo(60, 480, "Nenhum carreador é barreira absoluta — o grau de proteção varia com o "
                             "sistema,", 14, AZUL_ESCURO, 500))
    p.append(rotulo(60, 502, "a permeabilidade e as condições de armazenamento, e precisa ser demonstrado.",
                    14, AZUL_ESCURO, 500))
    return documento(L, A, "\n".join(p), "Ativo exposto e ativo encapsulado")


# ------------------------------------------------------------------------- ENCAPSULAÇÃO 2
def encapsulacao_liberacao() -> str:
    L, A = 900, 560
    x0, y0, largura, altura = 110, 150, 640, 250
    base = y0 + altura
    p = [
        caixa_alta(60, 62, "Encapsulação — perfil de liberação"),
        rotulo(60, 96, "A estrutura escolhida define o tempo", 22, AZUL_ESCURO, 700),
        f'  <rect x="{x0 - 50}" y="{y0 - 14}" width="{largura + 90}" height="{altura + 78}" rx="20" '
        f'fill="{BRANCO}" opacity="0.7"/>',
    ]

    # eixos
    p.append(f'  <path d="M {x0} {y0} L {x0} {base} L {x0 + largura} {base}" stroke="{CINZA_CLARO}" '
             f'stroke-width="1.6" fill="none"/>')
    for i in range(1, 4):
        y = base - altura * i / 4
        p.append(f'  <path d="M {x0} {y:.1f} L {x0 + largura} {y:.1f}" stroke="{CINZA_CLARO}" '
                 f'stroke-width="1" stroke-dasharray="4 5" opacity="0.7" fill="none"/>')

    p.append(rotulo(x0 + 10, y0 + 4, "Ativo liberado", 12, CINZA, 600))
    p.append(rotulo(x0 + largura, base + 26, "Tempo", 12, CINZA, 600, ancora="end"))

    curvas = [
        ("Liberação imediata", AZUL_ESCURO,
         f"M {x0} {base} C {x0 + 60} {base - altura * 0.86}, {x0 + 120} {y0 + 6}, {x0 + largura} {y0 + 3}"),
        ("Liberação prolongada", AZUL,
         f"M {x0} {base} C {x0 + 190} {base - altura * 0.34}, {x0 + 330} {y0 + altura * 0.30}, "
         f"{x0 + largura} {y0 + altura * 0.14}"),
        ("Liberação retardada", AZUL_CLARO,
         f"M {x0} {base} L {x0 + 200} {base} C {x0 + 320} {base - altura * 0.10}, "
         f"{x0 + 430} {y0 + altura * 0.42}, {x0 + largura} {y0 + altura * 0.30}"),
    ]
    for _, cor, d in curvas:
        p.append(f'  <path d="{d}" stroke="{cor}" stroke-width="3.4" stroke-linecap="round" fill="none"/>')

    y = 452
    x = 110
    for nome, cor, _ in curvas:
        p.append(f'  <rect x="{x}" y="{y - 12}" width="26" height="5" rx="2.5" fill="{cor}"/>')
        p.append(rotulo(x + 36, y - 5, nome, 13, AZUL_ESCURO, 600))
        x += 46 + len(nome) * 7.6

    p.append(rotulo(60, A - 30, "Curvas ilustrativas de comportamento — não representam dados de "
                                "um produto específico.", 12, CINZA, 400))
    return documento(L, A, "\n".join(p), "Perfis de liberação de sistemas encapsulados")


ARQUIVOS = {
    "lipossomas-arquitetura.svg": lipossomas_arquitetura,
    "lipossomas-populacao.svg": lipossomas_populacao,
    "fosfolipidios-molecula.svg": fosfolipidios_molecula,
    "fosfolipidios-organizacao.svg": fosfolipidios_organizacao,
    "encapsulacao-protecao.svg": encapsulacao_protecao,
    "encapsulacao-liberacao.svg": encapsulacao_liberacao,
}


def main() -> None:
    SAIDA.mkdir(parents=True, exist_ok=True)
    for nome, gerar in ARQUIVOS.items():
        destino = SAIDA / nome
        destino.write_text(gerar(), encoding="utf-8")
        print(f"gerado: {destino.relative_to(RAIZ)}  ({destino.stat().st_size / 1024:.1f} KB)")


if __name__ == "__main__":
    main()
