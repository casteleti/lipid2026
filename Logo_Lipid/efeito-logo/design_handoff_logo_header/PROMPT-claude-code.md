Descompactei a pasta `design_handoff_logo_header/` na raiz deste projeto. Ela contém:

- `README.md` — especificação completa (geometria do lockup, tempos, delays em cascata)
- `Header.jsx` — implementação de referência em React, sem dependências
- `header-lipid.html` — a mesma coisa em HTML/CSS/JS puro
- `assets/*.svg` — o logo recortado em peças (símbolo, L, I, P, I, D e a hairline "ingredients"),
  extraídas do vetor oficial

Tarefa: aplicar esse comportamento ao **logotipo do header** do site (o que hoje aparece
expandido no topo e vira só o símbolo ao rolar).

Comportamento esperado: ao rolar além de 70px, a hairline "ingredients" evapora primeiro e
as letras L-I-P-I-D somem uma a uma da esquerda para a direita — subindo, girando um pouco
e desfocando. O **símbolo continua exatamente igual**: mesmo tamanho, mesma posição, sem
rotação. Ao voltar ao topo, o lockup se remonta na ordem inversa.

Instruções:
1. Leia o `README.md` antes de codar e use os valores exatos de lá (posições em %, delays, easings).
2. Copie os SVGs de `assets/` para a pasta de estáticos do projeto e me diga qual caminho usou.
3. Me mostre qual arquivo do header você vai alterar antes de mudar.
4. Recrie seguindo os padrões já usados no projeto (Tailwind, CSS Modules ou o que estiver em uso) —
   o JSX/HTML de referência é só o comportamento, não precisa ser colado cru.
5. Não substitua os SVGs por versões redesenhadas nem por fontes: são recortes do vetor oficial.
6. Respeite `prefers-reduced-motion: reduce` (sem transições).
7. Mantenha o link do logo para a home e o `alt` como está no README.
