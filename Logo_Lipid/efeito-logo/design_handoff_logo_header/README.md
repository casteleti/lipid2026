# Handoff: Header — logo que colapsa ao rolar

## Overview
No topo da página o logotipo aparece completo (símbolo + LIPID + hairline "ingredients").
Ao rolar além de 70px, o **"ingredients" evapora primeiro** e em seguida as letras
**L-I-P-I-D somem uma a uma, da esquerda para a direita**, subindo, girando levemente e
desfocando. Depois que a última letra some, o bloco do wordmark colapsa a largura e
**apenas o símbolo permanece** — no tamanho original, sem reduzir nem se deslocar.
Ao voltar ao topo, tudo se reconstrói na ordem inversa (letras da direita para a
esquerda e o "ingredients" por último).

## About the Design Files
Os arquivos deste pacote são **referências de design em HTML/JS** — protótipos do
visual e do comportamento pretendidos. A tarefa é **recriar o header no ambiente já
existente do projeto** (React/Next, Vue, etc.), com seus padrões de estilo e navegação.
`Header.jsx` é um ponto de partida em React; `header-lipid.html` é a versão sem framework.
**Os SVGs em `assets/` são pra usar como estão** — foram recortados do vetor oficial.

## Fidelity
**Hi-fi.** Medidas, tempos e posições abaixo são finais.

## Assets (já inclusos em `assets/`)
Recortados do arquivo oficial `logo-lipid-ingredients.svg` — mesmo vetor, apenas
com `viewBox` diferente, sem redesenho:
| arquivo | conteúdo | viewBox |
| --- | --- | --- |
| `lipid-symbol.svg` | símbolo (arcos + bicamada) | `0 0 70.5 70` |
| `lipid-letter-l.svg` | L | `83.18 1.68 32.30 33.90` |
| `lipid-letter-i1.svg` | I (1º) | `125.32 1.68 4.58 33.90` |
| `lipid-letter-p.svg` | P | `139.38 1.68 34.43 33.90` |
| `lipid-letter-i2.svg` | I (2º) | `182.91 1.68 4.58 33.90` |
| `lipid-letter-d.svg` | D | `196.63 1.68 34.01 33.90` |
| `lipid-ingredients.svg` | hairline "ingredients" (do P ao D) | `139.3 42.0 89.7 21.0` |
| `lipid-full.svg` | lockup completo (fallback / og-image) | `0 0 232.95 70` |

Cores aplicadas nos paths: arcos e letras LIPID **`#414141`**; caudas lipídicas e
"ingredients" **`#2b3a96`**. Se a marca tiver hex oficiais diferentes, troque os
atributos `fill` dentro dos SVGs.

## Layout do lockup
As posições NÃO são espaçamentos arbitrários — são a geometria do vetor convertida em %.
Container do wordmark: **148 × 61.6 px** (proporção 147.46 : 61.32 do original).

| peça | left | top | width | height |
| --- | --- | --- | --- | --- |
| L | 0% | 0 | 21.9% | 55.3% |
| I | 28.58% | 0 | 3.11% | 55.3% |
| P | 38.11% | 0 | 23.35% | 55.3% |
| I | 67.63% | 0 | 3.11% | 55.3% |
| D | 76.93% | 0 | 23.06% | 55.3% |
| ingredients | 38.05% | 65.75% | 60.83% | 34.25% |

- Símbolo: **62 × 62 px**, `gap: 10px` até o wordmark, alinhamento `flex-end`.
- Para escalar o logo inteiro, multiplique 62 / 148 / 61.6 pelo mesmo fator — as % não mudam.

## Header
- Padding: `24px 40px` → **`13px 40px`** quando colapsado
- Fundo: `rgba(241,237,231,.84)` → `rgba(241,237,231,.95)`; `backdrop-filter: blur(8px)`
- Sombra ao colapsar: `0 10px 30px rgba(20,30,60,.09)`
- Transição do header: `420ms ease` / `cubic-bezier(.19,1,.22,1)`
- `position: sticky; top: 0`

## Animação (valores exatos)
- Gatilho: `window.scrollY > 70` (histerese simples — só troca de estado quando muda)
- **ingredients** — sai: delay `0ms`; volta: delay `5 * 55 + 60 = 335ms`
  estado colapsado: `opacity 0; filter: blur(5px); transform: translateY(-10px) rotate(-5deg)`
  transição: `transform 460ms cubic-bezier(.19,1,.22,1), opacity 320ms ease, filter 460ms ease`
- **letras** — sai: delay `i * 55 + 60ms` (esquerda → direita);
  volta: delay `(n-1-i) * 55ms` (direita → esquerda)
  estado colapsado: `opacity 0; filter: blur(6px); transform: translateY(-18px) rotate(-8deg) scale(.92)`
  transição: `transform 520ms cubic-bezier(.19,1,.22,1), opacity 380ms ease, filter 520ms ease`
- **bloco do wordmark** — `max-width: 148px → 0`, `620ms cubic-bezier(.19,1,.22,1)`,
  delay `5 * 55 + 120 = 395ms` ao colapsar e `0ms` ao voltar (assim a largura só
  encolhe DEPOIS que as letras sumiram, e reabre ANTES de elas voltarem)
- **símbolo** — não anima: tamanho, posição e rotação constantes

## Acessibilidade
- `prefers-reduced-motion: reduce`: desligar as transições (o logo simplesmente troca de estado).
- O `<a>` do logo mantém `alt="Lipid"` no símbolo e `alt=""` nas letras (decorativas),
  para o leitor de tela não soletrar L-I-P-I-D.

## Files
- `Header.jsx` — header React pronto (ajuste os caminhos dos assets e o `<nav>`)
- `header-lipid.html` — versão HTML/CSS/JS sem framework
- `assets/*.svg` — as peças do logo
