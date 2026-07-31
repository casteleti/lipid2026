# LIPID / Daksa — instruções do projeto

Plataforma institucional para uma empresa de ingredientes/tecnologias lipídicas (lipossomas,
fosfolipídios, encapsulação) para farmacêutica, cosméticos, nutracêuticos e veterinária.

Monorepo pnpm com 3 apps: `apps/api` (NestJS + Prisma + PostgreSQL), `apps/website` (Next.js
14, site público), `apps/admin` (Next.js 14, CMS/painel administrativo).

## Antes de fazer qualquer coisa

**Leia `CONTEXTO_PROJETO.md` na raiz do repo.** Esse arquivo não é versionado (está no
`.gitignore` por conter credenciais) mas deve existir localmente — ele tem: URL e token da
API do Coolify, UUID da aplicação, URL do GitHub, domínios de produção, estado do ambiente
local, o que já foi implementado, pendências conhecidas e armadilhas já resolvidas (bugs que
não devem se repetir). Se o arquivo não existir, peça ao usuário as credenciais de acesso ao
Coolify antes de tentar fazer deploy — ou reconstrua a partir do histórico de conversas
anteriores, se disponível.

## Convenções do projeto

- Todos os módulos de listagem da API seguem o padrão `findAll(skip, take, q?)` retornando
  `{data, total, page, pageSize, totalPages}`, com soft-delete via `active: false` (exceto
  `content`, que usa enum `status`).
- Slug é gerado automaticamente a partir do nome/título; sempre excluir o próprio `id` na
  checagem de unicidade ao editar (`id: { not: excludeId }`), senão o slug muda a cada save.
- Componentes de UI do website ficam em `apps/website/src/components/ui/`; layout/navegação em
  `components/common/`. Os itens de menu (desktop + mobile) vêm de uma fonte única:
  `components/common/nav-data.ts` — não duplicar a lista em outro lugar.
- `Button.tsx` (website) repassa `onClick` e `tabIndex` mesmo quando renderiza como `<Link>` —
  se precisar estender esse componente, mantenha esse comportamento. O variant `primary` tem
  overlay de gradiente no hover (span absoluto por trás do texto) — ao adicionar padding via
  `className`, use `!px-N`/`!py-N` (important), senão a ordem de geração do CSS do Tailwind
  pode fazer o valor não vencer o da variante.
- Itens de menu/nav ficam centralizados via `position: absolute` no Header (não via grid
  `1fr`) — centralizar pelo espaço "sobrando" entre logo e CTA fica torto quando os dois lados
  têm larguras diferentes (ex. logo grande no topo vs. compacto ao rolar).
- Nunca inventar dados institucionais reais (endereço, telefone, time, certificações,
  histórico da empresa, métricas, código comercial de produto). Se não foi fornecido pelo
  usuário ou confirmado em fonte pública citável, omitir em vez de fabricar. Vale também para
  imports de catálogo via PDF/planilha — se a fonte não confirma um dado, não inferir.
- Sempre testar localmente (type-check + build de produção + testes do backend) antes de
  commitar, e verificar o deploy em produção via `curl` direto (não assumir que funcionou).
- **Nunca usar `return res.json()` sem `await` dentro de um `try/catch`** — se o body vier
  vazio (204, ou erro de API silencioso), a rejeição da Promise escapa do catch porque o
  `return` já devolveu a Promise antes dela rejeitar. Sempre `return await res.json()`.
- `html` e `body` **nunca** devem ter `overflow-x-hidden` nos dois ao mesmo tempo — definir
  overflow explícito num eixo força o outro a virar `auto` implicitamente, e isso quebra
  `position: sticky` de qualquer filho (o elemento gruda relativo ao scroll do ancestral
  errado). Overflow-x-hidden fica só no `html`.

## Deploy

Deploy é via Coolify, disparado manualmente pela API (auto-deploy por webhook nem sempre
dispara de forma confiável). Comando e token estão em `CONTEXTO_PROJETO.md`.
