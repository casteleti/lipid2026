# Audit UI/UX & Responsividade — `apps/website` (LIPID / Daksa)

**Data:** 2026-07-28
**Escopo:** Website público (`apps/website`). Admin/CMS **não** foi auditado nesta rodada (escopo definido com o usuário).
**Método:** Inspeção de código (todas as rotas, componentes, tokens) + testes ao vivo no navegador em `http://localhost:3000` (dados reais da API de produção) nos viewports **375 / 1024 / 1440 / 1920 / 2560px**, mais inspeção de breakpoints via classes Tailwind para as larguras intermediárias (768/1280) — essas não foram renderizadas ao vivo.

> **Nota sobre a ferramenta de browser desta sessão:** confirmado o problema já documentado em `CONTEXTO_PROJETO.md` — `screenshot` falha ("Browser pane is not displayed"). Toda a evidência abaixo foi coletada via `read_page` (árvore de acessibilidade), `getBoundingClientRect`/`getComputedStyle` via JS, e inspeção direta do DOM — não via captura visual. Isso é mais preciso para medir overflow/contraste/foco do que uma screenshot, mas significa que nenhum problema puramente estético-visual (ex.: um ícone levemente desalinhado) foi capturado.

**Não testado / requer validação adicional:** admin/CMS, zoom de navegador 200%/400%, leitor de tela real (NVDA/VoiceOver), orientação landscape em mobile físico, viewports 320/390/480/600/768/834/1280/1366/1536 ao vivo, tradução/expansão artificial de texto, volume grande de dados (a API de produção tem poucos registros em Ingredientes/Parceiros conforme `CONTEXTO_PROJETO.md`).

---

## 1. Resumo Executivo

**Pontuação total: 637 / 1000 — faixa "High-risk experience" (500–649)**

- Críticos: **1**
- Altos: **5**
- Médios: **9**
- Baixos: **3**

**Pontos fortes:**
- Header/Megamenu/drawer mobile: implementação de navegação genuinamente enterprise-grade — hover-intent, suporte completo a teclado (Escape, foco, `aria-expanded/haspopup/controls`), restauração de foco confirmada via teste ao vivo.
- Sistema de tokens informal mas consistente (escala `primary-*`, variantes de `Button` via `cva`, `Section`/`Grid`/`Card`/`Container` reutilizados em todas as páginas).
- `prefers-reduced-motion` respeitado nas transições do header/menu.
- Contraste de texto principal (`gray-600`/`gray-700`/`primary-600` sobre branco) passa AA com folga.
- Estratégia de grid responsivo intrínseca (não são media queries ad-hoc por página).

**Pontos fracos:**
- **Bug crítico confirmado**: overflow horizontal em toda página mobile, causado pelo drawer off-canvas fechado.
- Acessibilidade de formulário (o único formulário do site, o de conversão/contato) tem lacunas sistêmicas: sem `aria-invalid`/`aria-describedby`, sem anúncio de erro/sucesso para leitor de tela.
- Checkbox de consentimento sem link para a política que o usuário está aceiting.
- Estado de erro de rede é indistinguível do estado "nenhum resultado" em todas as páginas de listagem.

**Recomendação de release:** **Release com risco conhecido** — o site já está em produção e o caminho principal (navegar, ler conteúdo, navegar por listagens) funciona. Mas os itens da Fase 0 abaixo (bug de overflow + acessibilidade do formulário de contato) devem ser corrigidos com prioridade alta, pois afetam mobile (maioria do tráfego institucional) e o único ponto de conversão do site.

---

## 2. Mapa da Aplicação

**Stack:** Next.js 14 (App Router), Tailwind CSS (sem plugins), `clsx` + `class-variance-authority` para variantes, `react-icons` (Hi2/Fa6), fonte `Inter` via `next/font/google`. Sem biblioteca de formulário/validação (validação manual em `useState`), sem biblioteca de gráficos/tabelas, sem tema escuro, sem testes de frontend.

**Rotas (12):**
| Rota | Tipo | Fonte de dados |
|---|---|---|
| `/` | Home (6 seções) | API (client components) |
| `/aplicacoes`, `/tecnologias`, `/ingredientes`, `/blog`, `/parceiros` | Listagem c/ busca+paginação | API (client, `fetch` direto) |
| `/aplicacoes/[slug]`, `/tecnologias/[slug]`, `/blog/[slug]` | Detalhe | API (server component, `cache:'no-store'`) |
| `/contato` | Formulário | API (`POST /leads`) |
| `/sobre` | Conteúdo estático | — |

Não existe `/login`, dashboard, tabelas de dados densas, gráficos, comando palette ou navegação por sidebar neste app — é um site institucional público, não um SaaS/dashboard. Por isso as categorias do rubric voltadas a produtos enterprise (bulk actions, atalhos de teclado, comand palette, densidade de dados) foram avaliadas pelo equivalente mais próximo (busca/paginação/filtros de listagem), não penalizadas por ausência de recursos irrelevantes ao produto.

**Componentes-chave:** `Header`/`Megamenu`/`nav-data.ts` (fonte única de menu), `Footer`, `Button` (cva: primary/secondary/outline/ghost × sm/md/lg), `Card`, `Badge`, `Input`/`Textarea`/`Select`/`Checkbox`, `SearchBar`, `Pagination`, `FilterButton`, `ListingHero`/`DetailHero`, `Grid`/`Section`/`Container`, `LinkArrow`, `RelatedItems`.

**Design tokens:** cor `primary` (escala 50–950, extraída da logo real), tipografia com escala custom (`5xl`–`7xl`), `container-main` = `max-w-7xl` (1280px) — exceto o header, que usa `max-w-[1600px]` (ver [M-01](#m-01)).

---

## 3. Scorecard

| Categoria | Score | Máx | % | Status |
|---|---:|---:|---:|---|
| Arquitetura Responsiva | 62 | 100 | 62% | Precisa melhorar |
| Mobile UX | 50 | 80 | 63% | Precisa melhorar |
| Desktop UX | 54 | 70 | 77% | Bom |
| Navegação | 68 | 80 | 85% | Excelente |
| Arquitetura de Informação | 45 | 60 | 75% | Bom |
| Hierarquia Visual | 48 | 60 | 80% | Bom |
| Qualidade de Componentes | 40 | 70 | 57% | Precisa melhorar |
| Formulários e Validação | 32 | 70 | 46% | Ruim |
| Design de Interação | 42 | 60 | 70% | Bom |
| Acessibilidade | 58 | 120 | 48% | Ruim |
| Listagem/Busca/Dados (equiv. Dashboard) | 36 | 60 | 60% | Precisa melhorar |
| Performance | 36 | 60 | 60% | Precisa melhorar |
| Consistência de Design System | 44 | 60 | 73% | Bom |
| Estados, Feedback e Recuperação de Erro | 22 | 50 | 44% | Ruim |
| **Total** | **637** | **1000** | **64%** | **High-risk** |

Nenhum teto de pontuação adicional (score cap) foi necessário além do já refletido nos números acima — o total (637) já está abaixo dos tetos de 699/749 definidos para bugs de scroll horizontal / formulários inacessíveis.

---

## 4. Findings Críticos

### [C-01] Overflow horizontal global em mobile, causado pelo drawer off-canvas fechado

- **Severidade:** Critical
- **Confiança:** High (reproduzido e isolado via JavaScript ao vivo)
- **Categoria:** Arquitetura Responsiva / Mobile UX
- **Rota:** Todas (o `Header` é global, em `layout.tsx`)
- **Componente:** [Header.tsx](apps/website/src/components/common/Header.tsx:202-217) — drawer `#mobile-nav-drawer`
- **Viewport:** 375×812 (confirmado); afeta qualquer viewport `< xl` (1280px) onde o drawer existe no DOM
- **Estado:** Drawer fechado (estado padrão de qualquer carregamento de página)
- **Arquivo:** `apps/website/src/components/common/Header.tsx:214-217`, `apps/website/src/app/globals.css`
- **Reprodução:**
  1. Abrir qualquer página em 375px de largura.
  2. Executar `document.documentElement.scrollWidth` vs `document.documentElement.clientWidth`.
- **Comportamento observado:** `clientWidth = 375`, mas `scrollWidth = 751` (exatamente 2×). Isolado via JS: ao setar `display:none` no elemento `#mobile-nav-drawer`, `scrollWidth` cai para `375` imediatamente. O elemento é `position:fixed; right:0; translate-x-full` (className confirmada: `fixed inset-y-0 right-0 ... translate-x-full`) — ou seja, o drawer fechado fica posicionado **fora da viewport à direita**, mas como é `position:fixed` sem nenhum contêiner com `overflow-x:hidden` acima dele (`html`/`body` têm `overflow-x: visible`, confirmado via `getComputedStyle`), ele **conta para a largura de rolagem do documento**.
- **Comportamento esperado:** Nenhuma página deveria produzir `scrollWidth > clientWidth`. O drawer fechado não deveria ser alcançável por scroll/rubber-band horizontal.
- **Impacto no usuário:** Em navegadores/dispositivos que permitem overscroll horizontal (iOS Safari com rubber-band é o caso clássico), o usuário pode arrastar a página horizontalmente e revelar uma área em branco/o próprio drawer fora de contexto, ou a página "balança" horizontalmente ao rolar verticalmente perto das bordas. Em qualquer caso, viola diretamente o critério "nenhuma rolagem horizontal acidental em páginas mobile primárias".
- **Impacto de acessibilidade:** Contribui para falha de WCAG 1.4.10 (Reflow) em alguns user agents.
- **Impacto de negócio:** Site institucional, tráfego mobile é maioria provável — uma falha de polish visível logo na primeira interação (scroll) prejudica percepção de qualidade/profissionalismo de uma marca B2B técnica.
- **Causa raiz:** Falta de `overflow-x: hidden` em `html`/`body` como rede de segurança para elementos `fixed` transladados para fora da tela — padrão comum em drawers off-canvas que precisa desse safeguard.
- **Correção recomendada:** Adicionar em `apps/website/src/app/globals.css`, dentro de `@layer base`:
  ```css
  html, body { @apply overflow-x-hidden; }
  ```
  Validar que isso não quebra o `header` `sticky` (não quebra — `overflow-x-hidden` no ancestral não interfere com `position: sticky` no eixo vertical).
- **Critério de aceite:** `document.documentElement.scrollWidth === document.documentElement.clientWidth` em todas as rotas, em 320/375/390/412/480px, com o drawer fechado e aberto.
- **Complexidade estimada:** Trivial (1 regra CSS global).
- **Relacionados:** [H-04](#h-04) (mesma família de componentes de listagem/cards, mobile).

---

## 5. Findings Altos

### [H-01] Cabeçalhos de seção do rodapé com contraste insuficiente (falha WCAG AA)

- **Severidade:** High
- **Confiança:** High (medido: razão de contraste calculada via fórmula WCAG sobre os valores RGB reais do token Tailwind)
- **Categoria:** Acessibilidade
- **Rota:** Todas (Footer é global)
- **Componente:** [Footer.tsx:43,56](apps/website/src/components/common/Footer.tsx:43)
- **Viewport:** Todos
- **Arquivo:** `apps/website/src/components/common/Footer.tsx:43,56` — classe `text-gray-400` (Tailwind `#9ca3af`) sobre fundo branco
- **Comportamento observado:** Razão de contraste calculada = **2.54:1** para os títulos "NAVEGAÇÃO" e "ENTRE EM CONTATO" (texto `text-xs font-bold uppercase`, 12px).
- **Comportamento esperado:** Mínimo de 4.5:1 para texto normal (WCAG 1.4.3 AA); texto de 12px não se qualifica como "texto grande" (que exigiria apenas 3:1).
- **Impacto no usuário:** Usuários com baixa visão ou em ambientes de luz forte (comum em uso mobile outdoor) têm dificuldade real de ler esses rótulos — presentes no rodapé de toda página do site.
- **Impacto de acessibilidade:** Falha confirmada WCAG 2.2 AA 1.4.3.
- **Causa raiz:** Uso do token `gray-400` (pensado para elementos decorativos/desabilitados) em texto informativo.
- **Correção recomendada:** Trocar `text-gray-400` por `text-gray-500` (4.83:1, passa) ou `text-gray-600` (7.56:1, mais seguro) nessas duas linhas.
- **Critério de aceite:** Razão de contraste ≥ 4.5:1 medida sobre o valor computado real.
- **Complexidade:** Trivial.

### [H-02] Campos de formulário nunca comunicam erro de forma programática

- **Severidade:** High
- **Confiança:** High (confirmado em DOM ao vivo em `/contato`, `aria-invalid` e `aria-describedby` são `null` em todos os campos mesmo com erro visível)
- **Categoria:** Formulários e Validação / Acessibilidade
- **Rota:** `/contato`
- **Componente:** [Input.tsx](apps/website/src/components/ui/Input.tsx), [Select.tsx](apps/website/src/components/ui/Select.tsx), [Textarea.tsx](apps/website/src/components/ui/Textarea.tsx), [Checkbox.tsx](apps/website/src/components/ui/Checkbox.tsx)
- **Viewport:** Todos
- **Reprodução:** Submeter `/contato` vazio → inspecionar `input#name`, `select#subject`, `textarea#message`.
- **Comportamento observado:** A mensagem de erro (`<p className="text-red-500">`) é renderizada visualmente abaixo do campo, mas o `<input>`/`<select>`/`<textarea>` não recebe `aria-invalid="true"` nem `aria-describedby` apontando para o `id` do parágrafo de erro. Confirmado nos 4 campos que falharam a validação (nome, e-mail, assunto, mensagem).
- **Comportamento esperado:** Todo campo inválido deve ter `aria-invalid="true"` e `aria-describedby` referenciando o elemento de erro (WCAG 3.3.1 / 4.1.2).
- **Impacto no usuário:** Usuários de leitor de tela não são informados de quais campos falharam nem por quê — só usuários que enxergam a cor vermelha percebem o erro.
- **Business impact:** É o único formulário de geração de lead do site; barreiras de acessibilidade aqui custam conversões diretamente.
- **Causa raiz:** Os 4 componentes de campo compartilham o mesmo padrão (`error &&` renderiza `<p>` mas não propaga `aria-*`) — é sistêmico, não um caso isolado.
- **Correção recomendada:** Em cada componente, gerar um `id` determinístico para o erro (`${id}-error`) e aplicar `aria-invalid={!!error}` + `aria-describedby={error ? `${id}-error` : undefined}` no elemento de input/select/textarea; no `<p>` de erro, `id={`${id}-error`}`.
- **Critério de aceite:** Com um campo inválido, `aria-invalid="true"` e `aria-describedby` presentes e resolvendo para o texto de erro correto, para os 4 componentes.
- **Complexidade:** Baixa (mudança contida, replicável nos 4 arquivos).
- **Relacionados:** [H-03](#h-03).

### [H-03] Checkbox de consentimento sem acesso à política que o usuário está aceitando

- **Severidade:** High
- **Confiança:** High
- **Categoria:** Formulários e Validação / Confiança
- **Rota:** `/contato`
- **Componente:** [ContactForm.tsx:163-169](apps/website/src/components/sections/ContactForm.tsx:163), [Footer.tsx:78](apps/website/src/components/common/Footer.tsx:78)
- **Reprodução:** Ler o texto do checkbox obrigatório em `/contato`: "Li e concordo com a Política de Privacidade". Procurar um link para essa política em qualquer lugar do site.
- **Comportamento observado:** O texto do checkbox não é um link (é `label` simples). No rodapé, "Política de Privacidade" existe como `<span>` sem `href`, confirmado via árvore de acessibilidade (`generic "Política de Privacidade"`, não `link`). Não existe rota alguma como `/privacidade` no inventário de páginas.
- **Comportamento esperado:** Um checkbox de consentimento obrigatório deve linkar para o documento que o usuário está aceitando.
- **Impacto no usuário:** Usuário é forçado a marcar "li e concordo" com um documento que não pode acessar — problema de confiança e potencialmente de conformidade (LGPD, já que o formulário coleta nome/e-mail/telefone).
- **Causa raiz:** Página de política de privacidade nunca foi criada; nota já existente em `CONTEXTO_PROJETO.md` conforme a diretriz do projeto de não inventar conteúdo institucional não fornecido — mas isso deixou o link "solto".
- **Correção recomendada:** Curto prazo: transformar "Li e concordo com a **Política de Privacidade**" em um link real assim que uma página `/privacidade` existir (mesmo que mínima, redigida com o usuário). Enquanto a página não existir, considerar remover a ênfase visual de link do texto no rodapé para não sugerir uma âncora inexistente, ou substituir por um texto neutro sem prometer uma política que não existe.
- **Critério de aceite:** O texto "Política de Privacidade" (tanto no checkbox quanto no rodapé) resolve para uma página real e acessível.
- **Complexidade:** Média (depende de conteúdo jurídico real, não apenas código).

### [H-04] Alvo de toque do CTA principal dos cards é muito pequeno, e o card inteiro não é clicável

- **Severidade:** High
- **Confiança:** High (medido via `getBoundingClientRect` ao vivo: ~294×20px)
- **Categoria:** Mobile UX / Acessibilidade
- **Rota:** `/aplicacoes`, `/tecnologias`, `/blog`, e qualquer bloco "Relacionados" (`RelatedItems`)
- **Componente:** [LinkArrow.tsx](apps/website/src/components/ui/LinkArrow.tsx), usado dentro de [Card](apps/website/src/components/ui/Card.tsx) em `aplicacoes/page.tsx:108`, `blog/page.tsx:162`, `RelatedItems.tsx:54`
- **Viewport:** 375×812 (medido); mesmo problema em qualquer viewport, pois o componente não tem padding próprio
- **Reprodução:** Em `/aplicacoes`, medir o link "Explorar" dentro de um card.
- **Comportamento observado:** `LinkArrow` é `inline-flex items-center gap-2 text-sm` sem padding — altura real do alvo de toque medida: **~20px**. O restante do `Card` (imagem, título, descrição) não é clicável — só esse texto/ícone.
- **Comportamento esperado:** Mínimo absoluto de 24×24px (WCAG 2.5.8); preferencial 44×44px. Padrão comum e recomendado para grids de card é tornar o card inteiro clicável.
- **Impacto no usuário:** Em mobile, o usuário precisa acertar um alvo de ~20px de altura em vez de tocar em qualquer lugar do card — aumenta erro de toque, especialmente para usuários com baixa destreza motora.
- **Causa raiz:** `LinkArrow` foi desenhado como link inline de texto (correto para links de "saiba mais" dentro de parágrafos), mas está sendo reaproveitado como CTA primário de um componente de card inteiro.
- **Correção recomendada:** Duas opções, ambas sistêmicas (aplicar em `aplicacoes`, `tecnologias`, `blog`, `ingredientes`, `parceiros`, `RelatedItems`):
  1. Tornar o `Card` inteiro um `<Link>` (envolvendo o conteúdo), mantendo o `LinkArrow` como indicador visual não-interativo (ex.: `<span>` com a seta) — padrão mais comum e recomendado para grids de listagem.
  2. Ou, minimamente, adicionar padding vertical ao próprio `LinkArrow` quando usado como CTA de card, elevando a altura do alvo a pelo menos 44px.
- **Critério de aceite:** Alvo de toque do CTA principal de cada card ≥ 44×44px OU o card inteiro é uma área clicável única (sem links aninhados conflitantes).
- **Complexidade:** Média (toca 6 arquivos, precisa cuidado para não criar links aninhados quando o card também tem links internos, ex.: badges).
- **Relacionados:** [C-01](#c-01).

### [H-05] Estado de erro de rede é indistinguível do estado "nenhum resultado" em todas as listagens

- **Severidade:** High
- **Confiança:** High (confirmado em código idêntico nas 3 páginas lidas: Aplicações, Ingredientes, Blog)
- **Categoria:** Estados, Feedback e Recuperação de Erro
- **Rota:** `/aplicacoes`, `/tecnologias`, `/ingredientes`, `/blog`, `/parceiros`
- **Componente:** `fetchApps`/`fetchItems`/`fetchPosts` em cada `page.tsx` de listagem
- **Arquivo:** `apps/website/src/app/aplicacoes/page.tsx:39-58` (padrão idêntico replicado nas outras 4 páginas)
- **Comportamento observado:**
  ```ts
  } catch {
    setApps([]); setTotal(0); setTotalPages(1);
  }
  ```
  Uma falha de rede/API (timeout, 500, CORS) cai no mesmo `catch` que produz exatamente o mesmo estado visual (`apps.length === 0` → "Nenhuma aplicação encontrada.") de uma busca legítima sem resultados.
- **Comportamento esperado:** Um erro de carregamento deve ser comunicado como erro (com opção de "tentar novamente"), distinto de "não há resultados para essa busca".
- **Impacto no usuário:** Se a API estiver fora do ar ou lenta, o visitante vê uma mensagem que sugere "não temos esse produto/conteúdo" em vez de "algo falhou, tente de novo" — pior ainda em páginas sem busca ativa (ex.: acabou de abrir `/parceiros` e a API caiu), onde a mensagem sugere que a empresa não tem parceiros.
- **Causa raiz:** `catch` genérico sem estado de erro dedicado.
- **Correção recomendada:** Adicionar um estado `error: boolean` separado de `loading`/`empty`; ao cair no `catch`, setar `error = true` e renderizar um bloco distinto ("Não foi possível carregar. Tentar novamente") com um botão que rechama `fetchApps(page, query)`.
- **Critério de aceite:** Simular uma falha de rede (ex.: `NEXT_PUBLIC_API_URL` inválido) e confirmar que a UI mostra uma mensagem de erro com ação de retry, diferente visualmente do estado de zero resultados.
- **Complexidade:** Baixa-média, replicada em 5 páginas.

---

## 6. Findings Médios

### [M-01] Largura máxima do header (1600px) diferente da largura máxima do conteúdo (1280px)

- **Severidade:** Medium
- **Confiança:** High (medido via `getBoundingClientRect` em 1920px: header começa em `x=152`, conteúdo em `x=312` — diferença de 160px)
- **Categoria:** Hierarquia Visual / Consistência de Design System
- **Rota:** Todas
- **Viewport:** ≥1600px (o efeito só aparece quando a viewport ultrapassa a largura interna do header); medido em 1920px e projetado (calculado, não renderizado) em 2560px
- **Arquivo:** `Header.tsx:80` (`max-w-[1600px]`) vs. `globals.css:29` (`.container-main { max-w-7xl }` = 1280px)
- **Comportamento observado:** Em 1920px, a logo e os itens de navegação do header começam ~160px mais à esquerda do que o título/conteúdo da página logo abaixo. A régua vertical entre "onde a marca está" e "onde o conteúdo está" não se alinha.
- **Comportamento esperado:** Cabeçalho e conteúdo devem compartilhar a mesma grade/alinhamento em telas grandes, ou a diferença deve ser uma decisão de design deliberada (não parece ser o caso aqui — os dois foram implementados independentemente com valores de `max-w` diferentes).
- **Impacto no usuário:** Em monitores grandes (1920px+, comuns em ambientes corporativos B2B, público-alvo deste site), a página parece "desalinhada" de forma sutil mas perceptível a qualquer olho treinado em design.
- **Correção recomendada:** Unificar em um único valor de `max-w` (ex.: extrair para uma constante/token compartilhado, ou simplesmente trocar `max-w-[1600px]` do header por `max-w-7xl` para bater com `.container-main`).
- **Critério de aceite:** `header .mx-auto` e `main .container-main` têm o mesmo `left` computado em qualquer viewport ≥1280px.
- **Complexidade:** Trivial.

### [M-02] Filtros de categoria (blog) não expõem estado "selecionado" para tecnologia assistiva

- **Severidade:** Medium
- **Confiança:** High
- **Categoria:** Acessibilidade / Design de Interação
- **Rota:** `/blog`
- **Componente:** [FilterButton.tsx](apps/website/src/components/ui/FilterButton.tsx)
- **Comportamento observado:** O estado ativo é comunicado só por cor de fundo (`bg-primary-900` vs `bg-gray-100`); não há `aria-pressed`.
- **Correção recomendada:** Adicionar `aria-pressed={active}` no `<button>`.
- **Critério de aceite:** `aria-pressed` reflete corretamente o filtro selecionado.
- **Complexidade:** Trivial.

### [M-03] Paginação não marca a página atual com `aria-current`

- **Severidade:** Medium
- **Confiança:** High
- **Categoria:** Acessibilidade
- **Rota:** Todas as listagens
- **Componente:** [Pagination.tsx:33-43](apps/website/src/components/ui/Pagination.tsx:33)
- **Correção recomendada:** Adicionar `aria-current={page === currentPage ? 'page' : undefined}`.
- **Critério de aceite:** Leitor de tela anuncia a página atual como tal.
- **Complexidade:** Trivial.

### [M-04] Campo de busca depende só do `placeholder`, sem `<label>`

- **Severidade:** Medium
- **Confiança:** High
- **Categoria:** Acessibilidade / Formulários
- **Rota:** Todas as listagens (`/aplicacoes`, `/tecnologias`, `/ingredientes`, `/blog`, `/parceiros`)
- **Componente:** [SearchBar.tsx](apps/website/src/components/ui/SearchBar.tsx)
- **Comportamento observado:** `<input>` sem `<label>` associado nem `aria-label`; o nome acessível vem do `placeholder`, que desaparece ao digitar e não é um substituto confiável de rótulo.
- **Correção recomendada:** Adicionar `aria-label={placeholder}` (rápido) ou um `<label className="sr-only">` (mais robusto).
- **Critério de aceite:** Campo tem nome acessível persistente, verificável via árvore de acessibilidade mesmo com texto digitado.
- **Complexidade:** Trivial.

### [M-05] Sem link "pular para o conteúdo"

- **Severidade:** Medium
- **Confiança:** High
- **Categoria:** Acessibilidade
- **Rota:** Todas
- **Arquivo:** `apps/website/src/app/layout.tsx`
- **Comportamento observado:** Usuário de teclado precisa tabular por 7 itens de menu + 2 triggers de dropdown + CTA antes de alcançar o conteúdo principal, em toda página.
- **Correção recomendada:** Adicionar um skip link visualmente oculto (visível no foco) no topo do `<body>`, apontando para um `id="main-content"` em `<main>`.
- **Critério de aceite:** Primeiro `Tab` da página revela um link "Pular para o conteúdo" que move o foco para `<main>`.
- **Complexidade:** Baixa.

### [M-06] Uso semântico incorreto de `<em>` no H1 da home

- **Severidade:** Medium
- **Confiança:** Medium
- **Categoria:** Hierarquia Visual / Acessibilidade
- **Rota:** `/`
- **Componente:** [HeroSection.tsx:15](apps/website/src/components/sections/HeroSection.tsx:15) — `<em className="not-italic font-light text-gray-500">performance.</em>`
- **Comportamento observado:** `<em>` é usado para *aplicar* um estilo visualmente mais leve/discreto, mas semanticamente `<em>` significa ênfase (leitores de tela podem alterar entonação). O efeito visual é o oposto do semântico.
- **Correção recomendada:** Trocar `<em>` por `<span>`.
- **Critério de aceite:** Elemento não usa mais uma tag semântica de ênfase para estilo puramente visual.
- **Complexidade:** Trivial.

### [M-07] Sem página 404 customizada

- **Severidade:** Medium
- **Confiança:** High (confirmado: não existe `apps/website/src/app/not-found.tsx`, apesar de `notFound()` ser chamado nas páginas de detalhe)
- **Categoria:** Estados, Feedback e Recuperação de Erro
- **Rota:** Qualquer slug inválido em `/aplicacoes/[slug]`, `/tecnologias/[slug]`, `/blog/[slug]`, ou qualquer URL inexistente
- **Comportamento observado:** Cai no 404 genérico do Next.js — sem header, sem footer, sem marca, sem caminho de volta ao site.
- **Correção recomendada:** Criar `apps/website/src/app/not-found.tsx` reaproveitando `ListingHero`/`Button` para manter consistência de marca e oferecer um caminho (ex.: "Voltar para a home", busca).
- **Critério de aceite:** Uma URL inexistente renderiza uma página com header, footer e uma ação clara de recuperação.
- **Complexidade:** Baixa.

### [M-08] Imagens dinâmicas não usam `next/image`

- **Severidade:** Medium
- **Confiança:** High
- **Categoria:** Performance
- **Rota:** `/aplicacoes`, `/blog`, blocos "Relacionados"
- **Arquivo:** `aplicacoes/page.tsx:96-100`, `blog/page.tsx:142-146`, `RelatedItems.tsx:39-43` — `<img>` cru; `apps/website/next.config.js` não tem `images.remotePatterns`/`domains` configurado
- **Comportamento observado:** Banners de aplicação e imagens de posts do blog usam `<img>` puro, perdendo `srcset` responsivo automático, `loading="lazy"` e conversão automática para AVIF/WebP (que `next.config.js` já habilita para imagens processadas pelo Next, mas só a logo estática usa `next/image` hoje).
- **Nota:** o dimensionamento fixo do contêiner (`h-44`/`h-40` + `object-cover`) já evita layout shift — o problema é apenas peso/otimização de imagem, não CLS.
- **Correção recomendada:** Configurar `images.remotePatterns` em `next.config.js` apontando para o host da API (`api.daksa.app.br`) e trocar os `<img>` por `next/image` nesses 3 pontos.
- **Critério de aceite:** Imagens de card/detalhe servidas em WebP/AVIF com `srcset`, confirmável via aba de rede.
- **Complexidade:** Baixa-média.

### [M-09] Fetch de página de detalhe sem cache (`cache: 'no-store'` em toda navegação)

- **Severidade:** Medium
- **Confiança:** High
- **Categoria:** Performance
- **Rota:** `/aplicacoes/[slug]` (mesmo padrão provável em `/tecnologias/[slug]` e `/blog/[slug]`, não lidos individualmente mas mesma função `getApplication`-like esperada)
- **Arquivo:** `apps/website/src/app/aplicacoes/[slug]/page.tsx:23,29`
- **Comportamento observado:** Tanto a entidade principal quanto a query de "relacionados" usam `cache: 'no-store'` — toda visita renderiza 100% dinâmico, sem aproveitar ISR/`revalidate` do Next para conteúdo que muda com pouca frequência (aplicações/tecnologias não são atualizadas a cada minuto).
- **Correção recomendada:** Trocar para `{ next: { revalidate: 300 } }` (ou valor adequado ao ritmo de atualização do CMS) em vez de `no-store`, mantendo a página ainda razoavelmente fresca mas cacheável.
- **Critério de aceite:** Requisição para a mesma página de detalhe dentro da janela de revalidação não dispara novo round-trip completo à API.
- **Complexidade:** Baixa.

---

## 7. Findings Baixos

### [L-01] Botão hamburguer abaixo do alvo de toque preferencial

- **Severidade:** Low — **Confiança:** High
- **Rota:** Todas, viewport `<xl`
- **Componente:** [Header.tsx:184](apps/website/src/components/common/Header.tsx:184) — `h-10 w-10` = 40×40px (preferencial é 44×44; mínimo absoluto de 24 já é superado com folga).
- **Correção:** `h-11 w-11` (44px) se possível sem quebrar o ritmo vertical do header de 64/80px.

### [L-02] "Política de Privacidade" no rodapé parece um link mas não é

- **Severidade:** Low — **Confiança:** High
- **Rota:** Todas — [Footer.tsx:78](apps/website/src/components/common/Footer.tsx:78)
- **Correção:** Ver [H-03](#h-03) — mesma causa raiz (página ainda não existe).

### [L-03] Rótulo de menu, slug de URL e H1 divergem para o mesmo destino

- **Severidade:** Low — **Confiança:** Medium
- **Rota:** `/blog`
- **Observação:** Menu diz "CONTEÚDO TÉCNICO", a URL é `/blog`, o H1 da página é "Biblioteca Técnica". Três rótulos para o mesmo destino podem gerar uma pequena dissonância de "cheiro de informação" (o usuário clicou em "Conteúdo Técnico" e chega em algo chamado "Biblioteca Técnica"). Não bloqueia tarefa nenhuma.
- **Correção sugerida:** Alinhar os três (ex.: manter "Conteúdo Técnico" também como H1).

---

## 8. Matriz Responsiva

Apenas as páginas/viewports efetivamente testados ao vivo estão marcados Pass/Fail; os demais estão marcados "Inferido" (checado via classes Tailwind, não renderizado).

| Página | 375 (live) | 768 | 1024 (live) | 1280 | 1440 (live) | 1920 (live) | 2560 (live, parcial) |
|---|---|---|---|---|---|---|---|
| Home `/` | Fail — [C-01] | Inferido | Pass | Inferido | Pass | Fail — [M-01] | Fail — [M-01] (projetado) |
| `/aplicacoes` (listagem) | Fail — [C-01], [H-04] | Inferido | Pass | Inferido | Não testado | Não testado | Não testado |
| `/contato` (form) | Não testado a 375 | Inferido | Fail — [H-02], [H-03] | Inferido | Não testado | Não testado | Não testado |
| Drawer mobile (`Header`) | Fail — [C-01] (overflow global); nav interna Pass (teclado/foco/ARIA confirmados) | Inferido | Pass | — (não existe acima de xl) | — | — | — |

"Pass" acima significa apenas "sem quebra estrutural observada" — não implica ausência de todos os findings médios/baixos, que em geral são globais (ex.: [M-01] só é visível ≥1600px, então "Pass" em 1440 é esperado).

---

## 9. Matriz de Componentes

| Componente | Responsivo | Teclado | Touch | Estados | Acessibilidade | Consistência | Status |
|---|---|---|---|---|---|---|---|
| `Header`/`Megamenu`/Drawer | OK | **OK** (confirmado ao vivo) | OK | OK | OK (aria-haspopup/expanded/controls corretos) | OK | Excelente |
| `Button` | OK | OK (focus ring visível) | OK | OK (disabled) | OK | OK | Bom |
| `Input`/`Select`/`Textarea` | OK | OK | OK | Falta `aria-invalid`/`describedby` — [H-02] | Ruim | OK | Precisa melhorar |
| `Checkbox` | OK | OK | OK (alvo 20px + label clicável compensa parcialmente) | Falta `aria-invalid`/`describedby` — [H-02] | Ruim | OK | Precisa melhorar |
| `SearchBar` | OK | OK | OK | Sem indicador de "buscando" durante debounce | Falta label — [M-04] | OK | Médio |
| `Pagination` | OK | Parcial (sem `aria-current`) — [M-03] | OK (40px) | OK (disabled) | Médio | OK | Médio |
| `FilterButton` | OK | Parcial (sem `aria-pressed`) — [M-02] | OK | OK | Médio | OK | Médio |
| `LinkArrow` (como CTA de card) | OK | OK | **Ruim** (~20px) — [H-04] | OK | Médio | Usado fora do contexto original | Precisa melhorar |
| `Card` | OK | N/A (não é interativo por si) | N/A | Sem loading/skeleton próprio | OK | OK | Bom |
| `Badge` | OK | N/A | N/A | OK | OK | OK | Bom |
| `ListingHero`/`DetailHero` | OK | OK | OK | OK | OK | OK | Bom |
| `Footer` | OK | Parcial (link falso) — [H-03]/[L-02] | OK | OK | Contraste falho — [H-01] | OK | Precisa melhorar |

---

## 10. Resumo de Acessibilidade

**Falhas confirmadas (observadas em código e/ou DOM ao vivo):**
- Contraste 2.54:1 nos títulos de seção do rodapé — [H-01].
- `aria-invalid`/`aria-describedby` ausentes em 100% dos campos de formulário com erro — [H-02].
- Alvo de toque de ~20px no CTA principal de todo card — [H-04].
- Sem `aria-pressed` em filtros — [M-02]; sem `aria-current` em paginação — [M-03].
- Campo de busca sem nome acessível persistente — [M-04].
- Sem skip link — [M-05].
- Uso semântico incorreto de `<em>` — [M-06].

**Prováveis falhas que exigem teste especializado (não confirmadas nesta rodada):**
- Anúncio de sucesso/erro do formulário de contato para leitor de tela — o código não usa `role="status"`/`aria-live` em nenhum dos dois blocos (`submitted`/`submitError`), então é muito provável que um leitor de tela não anuncie a mudança, mas isso exige confirmação com NVDA/VoiceOver reais.
- Comportamento de zoom a 200%/400% — não testado nesta rodada.
- Navegação completa por teclado em `/contato` (ordem de tab, indicador de foco em `Select` nativo) — o código sugere que deve funcionar (usa `<select>` nativo, `focus:ring-2` em todos os campos), mas não foi percorrido campo a campo com teclado real.

**Áreas que passaram na inspeção:**
- Header/Megamenu/Drawer: teclado, foco, ARIA — todos confirmados corretos ao vivo.
- Contraste de texto de corpo (`gray-600`/`gray-700`) e links primários (`primary-600`) — folgado, acima de 7:1.
- `prefers-reduced-motion` respeitado nas transições do menu.

---

## 11. Quick Wins

| # | Ação | Arquivos | Impacto | Complexidade | Findings relacionados |
|---|---|---|---|---|---|
| 1 | Adicionar `overflow-x: hidden` em `html, body` | `globals.css` | Elimina o bug crítico de overflow em toda página mobile | Trivial | C-01 |
| 2 | Trocar `text-gray-400` por `text-gray-500`/`600` nos títulos do rodapé | `Footer.tsx` | Corrige falha de contraste AA em toda página | Trivial | H-01 |
| 3 | Adicionar `aria-invalid`/`aria-describedby` nos 4 componentes de campo | `Input/Select/Textarea/Checkbox.tsx` | Corrige a maior lacuna de acessibilidade de formulário do site | Baixa | H-02 |
| 4 | Adicionar `aria-pressed`/`aria-current` em `FilterButton`/`Pagination` | `FilterButton.tsx`, `Pagination.tsx` | Estado de seleção anunciável | Trivial | M-02, M-03 |
| 5 | Adicionar `aria-label` na `SearchBar` | `SearchBar.tsx` | Nome acessível persistente em 5 páginas | Trivial | M-04 |
| 6 | Trocar `<em>` por `<span>` no H1 da home | `HeroSection.tsx` | Corrige uso semântico incorreto | Trivial | M-06 |
| 7 | Unificar `max-w` do header com `.container-main` | `Header.tsx` | Corrige desalinhamento visual em telas grandes | Trivial | M-01 |

Itens 1–7 são todos de complexidade trivial-a-baixa e resolvem 1 crítico + 3 altos + 3 médios — recomenda-se agrupar em um único PR de "acessibilidade e polish" antes de qualquer trabalho estrutural.

---

## 12. Melhorias Estruturais

- **Estado de erro dedicado nas listagens** ([H-05]): não é um patch de CSS — exige adicionar um terceiro estado (`error`) ao par `loading`/`empty` já existente em 5 páginas, com componente de retry reutilizável. Vale extrair um hook compartilhado (`useListingFetch`) já que a lógica de `fetch`/`skip`/`take`/`q` está duplicada quase identicamente em `aplicacoes`, `tecnologias`, `ingredientes`, `blog`, `parceiros` — consolidar reduz o risco de o próximo bug de acessibilidade/estado ser corrigido em 1 arquivo e esquecido nos outros 4.
- **Padrão de card clicável** ([H-04]): decidir uma vez (card inteiro clicável vs. CTA com alvo maior) e aplicar consistentemente — hoje `Card` é um componente "burro" (só estilo), a decisão de onde fica o link é de cada página individualmente, o que é como o problema se espalhou para 6 lugares.
- **Página de Política de Privacidade** ([H-03]): depende de conteúdo real do usuário/jurídico, não é só código — mas o time deveria priorizar isso dado que o formulário de contato já coleta dados pessoais hoje, ao vivo, em produção.

Patches táticos de CSS não seriam suficientes para H-05 e H-04 porque o problema está na duplicação de lógica entre páginas, não em uma única regra de estilo.

---

## 13. Roadmap de Remediação

### Fase 0 — Bloqueador de release
- [C-01] overflow horizontal mobile.
- **Dependências:** nenhuma. **Validação:** medir `scrollWidth === clientWidth` em 320–480px em todas as rotas.

### Fase 1 — Correções de alto impacto
- [H-01] a [H-05].
- **Dependências:** [H-03] depende de conteúdo jurídico (fora do controle de engenharia — pode desbloquear o code fix com um placeholder mínimo enquanto o texto legal não chega, mas sem fingir que a política existe).
- **Validação:** reteste do formulário de contato com leitor de tela real; nova medição de contraste; nova medição de alvo de toque.

### Fase 2 — Consistência de sistema
- [M-01] a [M-09].
- **Dependências:** nenhuma bloqueante entre si.
- **Validação:** revisão visual em 1920/2560px; smoke test de cada listagem após adicionar `aria-current`/`aria-pressed`.

### Fase 3 — Otimização de experiência
- Extrair `useListingFetch` (ver Seção 12); considerar indicador de "buscando" no `SearchBar` durante o debounce de 400ms.
- **Validação:** sem regressão de comportamento nas 5 páginas de listagem.

### Fase 4 — Polimento visual
- [L-01] a [L-03].
- **Validação:** revisão visual pontual.

---

## 14. Checklist de Aceite

- [ ] Nenhuma rota produz `scrollWidth > clientWidth` em 320–480px, com o drawer mobile aberto e fechado.
- [ ] Todo campo de formulário inválido expõe `aria-invalid="true"` e `aria-describedby` apontando para a mensagem de erro correspondente.
- [ ] O texto "Política de Privacidade" (checkbox e rodapé) resolve para uma página real.
- [ ] O CTA principal de cada card em listagens/relacionados tem alvo de toque ≥ 44×44px (ou o card inteiro é a área clicável).
- [ ] Uma falha de rede/API em qualquer listagem exibe uma mensagem de erro com ação de retry, visualmente distinta de "nenhum resultado".
- [ ] Os títulos de seção do rodapé têm contraste ≥ 4.5:1 sobre o fundo.
- [ ] `FilterButton` expõe `aria-pressed`; `Pagination` expõe `aria-current="page"` no item ativo.
- [ ] `SearchBar` tem nome acessível persistente (não depende só de `placeholder`).
- [ ] Existe skip link funcional no topo de cada página.
- [ ] Nenhum elemento usa `<em>`/`<strong>` puramente por efeito visual sem ênfase semântica real.
- [ ] Existe uma página 404 customizada com header, footer e ação de recuperação.
- [ ] O header e o conteúdo da página compartilham o mesmo alinhamento/`max-width` em telas ≥1600px.
- [ ] Imagens dinâmicas de card/detalhe são servidas via `next/image` com `srcset` responsivo.

---

## Regras anti-alucinação aplicadas

- Nenhuma página foi classificada como testada sem ter sido de fato renderizada (viewports não testados ao vivo estão marcados "Inferido"/"Não testado").
- Nenhuma conformidade WCAG completa é reivindicada — apenas falhas pontuais confirmadas por critério específico.
- Nenhum score de Lighthouse/Core Web Vitals foi inventado — a seção de Performance é baseada em leitura de código (`next/image`, `cache: 'no-store'`, fontes) e ausência de medição de campo real.
- Admin/CMS, zoom 200-400%, leitores de tela reais e viewports intermediários (320/390/768/1280/1366/1536) estão explicitamente marcados como não testados nesta rodada.
