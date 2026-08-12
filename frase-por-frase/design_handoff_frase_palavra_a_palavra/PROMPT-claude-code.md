Descompactei a pasta `design_handoff_frase_palavra_a_palavra/` na raiz deste projeto. Ela contém:

- `README.md` — especificação completa (tipografia, medidas, timings, gatilho de scroll)
- `FraseRevelada.jsx` — implementação de referência em React, sem dependências
- `frase-revelada.html` — a mesma coisa em HTML/CSS/JS puro

Tarefa: aplicar esse efeito nas **frases centralizadas que aparecem perto do rodapé** —
cada página do site tem uma (ex.: "Quando a tecnologia fica invisível na fórmula, ela
aparece no desempenho, no sensorial e no valor percebido.").

Comportamento esperado: quando a frase entra na dobra, as palavras se revelam uma a uma,
subindo e saindo do desfoque, em cascata da esquerda para a direita.

Instruções:
1. Leia o `README.md` antes de codar e use os valores exatos de lá.
2. Localize todas as ocorrências dessas frases no site e me liste os arquivos antes de alterar.
3. Crie UM componente reutilizável seguindo os padrões já usados no projeto e troque as
   frases por ele, mantendo o texto de cada página.
4. Não altere tamanho, cor ou espaçamento atuais da frase além do que está no README.
5. Respeite `prefers-reduced-motion: reduce` (frase visível, sem animação).
6. O texto precisa continuar no HTML desde o carregamento (SEO e leitores de tela).
