# Handoff: Frase de rodapé — revelação palavra a palavra

## Overview
Frase centralizada que aparece perto do rodapé de cada página do site.
Ao entrar na dobra (30% visível), as palavras surgem **uma a uma em cascata**:
cada palavra sobe 20px, sai de um desfoque de 9px e ganha opacidade.
Ao rolar de volta para cima a animação rearma, então repete na próxima descida.

## About the Design Files
Os arquivos deste pacote são **referências de design em HTML/JS** — protótipos do
visual e do comportamento pretendidos. A tarefa é **recriar o componente no ambiente
já existente do projeto** (React/Next, Vue, etc.), com seus padrões de estilo.
`FraseRevelada.jsx` é um ponto de partida pronto para React;
`frase-revelada.html` é a versão sem framework (funciona em qualquer stack).

## Fidelity
**Hi-fi.** Valores abaixo são finais.

## Tipografia e layout
- Container: `max-width: 860px`, centralizado, `text-align: center`
- Fonte: a mesma do site (Inter Tight / Helvetica), **weight 700**
- Tamanho: **34px** desktop, `line-height: 1.34`, `text-wrap: pretty`
- Cor do texto: `#0f1e46` (azul-marinho da marca)
- Fundo: o fundo da própria seção (creme `#f1ede7` no site atual) — o efeito não
  desenha fundo nenhum
- Espaçamento vertical sugerido: `padding: 22vh 24px` (respiro amplo antes do rodapé)
- Mobile: reduzir para ~24–26px e `max-width: 100%` com `padding: 0 24px`

## Animação
- Estado inicial de cada palavra: `opacity: 0; filter: blur(9px); transform: translateY(20px)`
- Estado final: `opacity: 1; filter: blur(0); transform: translateY(0)`
- Transição: **800ms** `cubic-bezier(.22,.61,.36,1)` nas três propriedades
- **Stagger: 45ms** por palavra (`transition-delay = índice * 45ms`) — ajustável entre 15 e 110ms
- Gatilho: `IntersectionObserver` com `threshold: 0.3`
- Rearme: quando o elemento sai da tela **para baixo** (`boundingClientRect.top > 0`),
  volta ao estado inicial. Se sair por cima, permanece revelado.

## Implementação
- O texto é escrito normalmente no HTML/JSX; o componente o divide por espaços em
  `<span data-word>` com `display: inline-block` (preserva a quebra de linha natural).
- Use `&nbsp;` ao fim de cada palavra para manter o espaço entre elas.
- Não use `white-space: nowrap` — a frase deve quebrar em 2–3 linhas naturalmente.

## Acessibilidade
- Respeitar `prefers-reduced-motion: reduce`: mostrar a frase já revelada, sem animação.
- O texto está no DOM desde o início (indexável e legível por leitores de tela);
  apenas o estilo muda.

## Props (versão React)
| prop | default | uso |
| --- | --- | --- |
| `text` | frase padrão | conteúdo (cada página usa a sua) |
| `stagger` | `45` | ms entre palavras |
| `className` | `""` | para aplicar classes do projeto |

## Design Tokens
- Texto `#0f1e46` · Fundo da seção `#f1ede7`
- 34px / 700 / line-height 1.34 · max-width 860px
- Duração 800ms · easing `cubic-bezier(.22,.61,.36,1)` · stagger 45ms
- Deslocamento 20px · desfoque inicial 9px

## Files
- `FraseRevelada.jsx` — componente React pronto
- `frase-revelada.html` — versão HTML/CSS/JS sem framework
