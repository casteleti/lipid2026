# Handoff: Botão "Fale com um especialista" (efeito molecular no hover)

## Overview
Botão de CTA do canto superior direito do menu de https://lipid.daksa.app.br/.
Em repouso: pill azul-marinho sólido. No hover: azul levemente mais claro + rede de
partículas conectadas (referência científica/molecular) animada **dentro** do botão,
com fade-in/fade-out suave.

## About the Design Files
Os arquivos deste pacote são **referências de design em HTML/JS** — protótipos do
visual e do comportamento pretendidos. A tarefa é **recriar o componente no ambiente
do projeto existente** (React/Next, Vue, etc.) usando seus padrões (Tailwind, CSS
Modules, styled-components...). `BotaoEspecialista.jsx` é um ponto de partida
pronto para React; `botao-especialista.html` é a versão sem framework.

## Fidelity
**Hi-fi.** Cores, tipografia, medidas e timings abaixo são finais.

## Componente
- **Formato**: pill, `border-radius: 999px`
- **Padding**: `15px 30px` (altura resultante ≈ 46px)
- **Fundo (repouso)**: `#0f1e46`
- **Fundo (hover)**: `#16306f`
- **Texto**: "Fale com um especialista" — branco `#ffffff`, 15px, weight 700,
  letter-spacing 0.01em, fonte Inter Tight (fallback Helvetica/Arial)
- **Sombra (hover)**: `0 8px 26px rgba(20,45,110,.32)`
- **Elevação (hover)**: `transform: translateY(-1px)`
- **Transição**: `background / box-shadow / transform 300ms ease`
- **overflow: hidden** é obrigatório — recorta as partículas no formato do pill

## Animação de partículas
- `<canvas>` em `position:absolute; inset:0`, `pointer-events:none`, atrás do
  `<span>` do texto (`position:relative`).
- 26 partículas, raio 0.7–2.2px, velocidade ±0.28px/frame, movimento com wrap nas bordas.
- Linhas entre pares com distância < 46px; opacidade proporcional à proximidade (máx .3).
- Cada partícula tem cintilação (seno, +0.05 rad/frame) e um halo de raio ×3.4 com alpha .12.
- Cor das partículas: `#8fb6ff` (rgba 143,182,255).
- Intensidade global `hover` interpolada (`hover += (target - hover) * .09`) — dá o fade
  ao entrar e sair. O canvas é limpo quando `hover ≈ 0` (custo zero em repouso).
- Canvas escalado por `devicePixelRatio` (máx 2) e reajustado via `ResizeObserver`.

## Props (versão React)
| prop | default | uso |
| --- | --- | --- |
| `children` | "Fale com um especialista" | rótulo |
| `particleColor` | `#8fb6ff` | cor das partículas/linhas |
| `particleCount` | `26` | densidade (10–60) |

## Acessibilidade / performance
- O efeito também dispara em `focus`/`blur` (teclado) na versão React.
- Recomendado: respeitar `prefers-reduced-motion: reduce` — nesse caso manter só a
  mudança de cor no hover e não iniciar o `requestAnimationFrame`.
- Um `requestAnimationFrame` por botão; cancelar no unmount (já implementado).

## Design Tokens
- Azul base `#0f1e46` · Azul hover `#16306f` · Partículas `#8fb6ff`
- Texto `#ffffff` · Raio `999px` · Padding `15px 30px` · Duração `300ms ease`

## Assets
Nenhum. Apenas a fonte Inter Tight (Google Fonts) — use a fonte já adotada no projeto.

## Files
- `BotaoEspecialista.jsx` — componente React pronto para colar no projeto
- `botao-especialista.html` — versão HTML/CSS/JS sem framework
- `Botao Especialista.dc.html` — protótipo original (referência visual)
