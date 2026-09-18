# Prompt — migração do LIPID/Daksa para nova VPS (Hetzner + Coolify)

> Cole este arquivo inteiro como prompt inicial para o projeto/agente especialista em VPS.
> Ele foi escrito pra ser autossuficiente — não assuma que quem vai executar leu a
> conversa que gerou este documento.

## Objetivo

Migrar a aplicação **LIPID** (site institucional de ingredientes lipídicos B2B) da VPS
atual para uma **nova VPS Hetzner**, também com **Coolify** instalado, buscando melhor
performance. A VPS nova será **compartilhada com outros projetos da Daksa** (mesmo modelo
da atual — não é uma VPS dedicada só a este projeto).

Este NÃO é um pedido para alterar conteúdo, textos, layout ou estrutura de páginas do
site — ele já está aprovado pelo cliente. O escopo é 100% infraestrutura/Docker/deploy.

## Repositório

- GitHub: `https://github.com/casteleti/lipid2026`
- Branch de produção: `main`
- Monorepo pnpm, 3 apps + banco:
  - `apps/api` — NestJS + Prisma + PostgreSQL, prefixo global `/api/v1` (exceto `/` e
    `/health`, usados pelo healthcheck).
  - `apps/website` — Next.js 14, site público institucional.
  - `apps/admin` — Next.js 14, CMS/painel administrativo (client-side only, sem Server
    Components fazendo fetch — só o website faz fetch no servidor).
  - `packages/{config,types,ui}` — pacotes internos do workspace, sem build step próprio
    (TS puro, consumido direto via symlink do pnpm).
- Sem CI configurado hoje (`.github/workflows` não existe) — deploy é 100% manual via
  chamada direta à API do Coolify.

## Domínios de destino (já configurados no Cloudflare)

O domínio está mudando de `daksa.app.br` para **`daksa.online`**:

- `lipid.daksa.online` → website
- `api.daksa.online` → API
- `cms.daksa.online` → admin

**Atenção — Cloudflare + Coolify (ponto que já causou incidente nesta semana em outro
domínio, não repetir):** se os registros DNS desses três subdomínios estiverem com o
proxy da Cloudflare ativado (nuvem laranja), o Let's Encrypt do Coolify (desafio HTTP-01)
só emite certificado corretamente com o modo SSL/TLS da Cloudflare em **Full** ou **Full
(strict)**. No modo *Flexible* dá loop de redirecionamento HTTPS. **Confirme esse modo
antes de apontar os domínios pra VPS nova e antes de tentar emitir certificado.**

## O que a aplicação já faz certo (não precisa redesenhar)

- Build Docker multi-stage nos 3 apps (deps → build → runtime).
- Volume nomeado para upload de arquivos da API (`api_uploads`), já persistente.
- Prisma schema pequeno e bem indexado (19 modelos, 5 migrations) — volume de dados é
  baixo, a motivação da migração é infraestrutura, não escala de dados.
- `RD_STATION_API_KEY` com fallback seguro (loga warning e segue, não derruba a API se
  ausente).

## Problemas conhecidos na infra atual — não repetir na nova

1. **O fix de hairpin NAT não está versionado.** Hoje existe uma env var
   `API_URL=http://api:3002` setada manualmente só na UI do Coolify (não está no
   `docker-compose.yaml` do repo). Ela existe porque Server Components do `website`
   fazem fetch em `https://api.daksa.app.br` (domínio público) — e um container chamando
   seu próprio domínio público através do Traefik/proxy falha (hairpin NAT). Sem essa env
   var, rotas como `/tecnologias/[slug]` e `/segmentos/[slug]` voltam a quebrar (500/404).
   **Na nova stack, declare `API_URL=http://api:3002` direto no `docker-compose.yaml`**,
   não deixe como configuração manual "invisível" fora do repo.
2. **DNS gerenciado sem API já causou 2 incidentes nesta semana** (registro que nunca
   existiu, depois um registro que desapareceu da zona em edição manual). Isso já está
   resolvido pela migração pra Cloudflare — só reforçando pra não regredir pra edição
   manual sem histórico/auditoria.
3. **VPS compartilhada com outros projetos Daksa** (`alinepoliti-site-2026`,
   `fivepass-lp-system`, `precya-api`/`precya-web`, `site-csa-v1`, e possivelmente outros
   na nova) — nomes de container genéricos (`postgres`, `api`) já causaram confusão ao
   depurar via terminal. **Use `container_name` explícito e prefixado** para todos os
   serviços deste projeto: `lipid_api`, `lipid_website`, `lipid_admin`, `lipid_postgres`.
4. **Sem `.dockerignore`.** `node_modules` (~700MB local) e `.next` (500MB+) sobem no
   contexto de build sem necessidade, deixando o deploy mais lento.
5. **`node:18-alpine` em todos os Dockerfiles** — Node 18 está fora do LTS (EOL abril de
   2025), sem patch de segurança. Trocar para `node:22-alpine`.
6. **Next.js sem `output: 'standalone'`** — a imagem final hoje copia `node_modules`
   inteiro + `.next` completo. Ativar standalone reduz bastante o tamanho da imagem e o
   tempo de start.
7. **`pnpm install --no-frozen-lockfile`** no build de produção, sem necessidade —
   deveria ser `--frozen-lockfile` (se falhar, é sinal de lockfile desatualizado, deve ser
   corrigido antes do deploy, não silenciado).
8. **Sem healthcheck, sem `depends_on`, sem `mem_limit`/`cpus`** em nenhum serviço do
   `docker-compose.yaml` de produção atual (existem só no compose de dev).
9. **Migration do Prisma não roda automaticamente** — `CMD` do container da API é
   `node dist/main` puro, sem `prisma migrate deploy` antes. Migrations com `DROP COLUMN`
   exigem hoje um procedimento manual de expand/contract (rodar só a parte aditiva antes
   do deploy, o `DROP` só depois, com `prisma migrate resolve --applied` pra registrar).
   Decidir se a nova stack automatiza isso com um entrypoint script, ou mantém manual com
   esse procedimento documentado.
10. **Postgres de produção não aparece no `docker-compose.yaml` do repo** — hoje é gerido
    só dentro do Coolify, sem estratégia de backup versionada/visível.

## Especificação da arquitetura alvo

Serviços (todos numa rede Docker **própria deste projeto**, não numa rede genérica
compartilhada entre múltiplos clientes — o Coolify já isola isso por aplicação, só
confirmar que não está tudo pendurado numa única rede externa manual):

- **`lipid_postgres`**: `postgres:15-alpine` (ou versão mais recente compatível com o
  Prisma do projeto), volume nomeado próprio, `healthcheck` (`pg_isready`), backup
  agendado (`pg_dump` via cron, destino externo — S3/objeto do próprio Hetzner ou outro
  destino que a Daksa já use pra backup).
- **`lipid_api`**: build a partir de `apps/api/Dockerfile`, `depends_on: lipid_postgres`
  com `condition: service_healthy`, healthcheck em `GET /health`, volume nomeado
  `lipid_api_uploads` montado em `/app/apps/api/uploads` (mesma convenção já usada).
  Env vars: `DATABASE_URL`, `JWT_SECRET` (nunca usar o fallback inseguro que existe no
  código — `apps/api/src/modules/auth/auth.module.ts:15` — sempre setar explicitamente),
  `JWT_EXPIRY`, `RD_STATION_API_KEY`, `API_PORT=3002`.
- **`lipid_website`**: build a partir de `apps/website/Dockerfile`, `depends_on:
  lipid_api`, healthcheck em `GET /`. Env vars: `NEXT_PUBLIC_API_URL=https://api.daksa.online`
  (build arg **e** runtime — o Next expõe isso no bundle do navegador em build-time) e
  **`API_URL=http://lipid_api:3002`** (server-side only, sem prefixo `NEXT_PUBLIC_`, pra
  evitar o hairpin NAT — ver problema conhecido #1 acima; ajustar o nome do host se o
  `container_name`/nome do serviço interno não for exatamente `lipid_api`).
- **`lipid_admin`**: build a partir de `apps/admin/Dockerfile`, `depends_on: lipid_api`,
  healthcheck em `GET /login`. Env var: `NEXT_PUBLIC_API_URL=https://api.daksa.online`
  (build arg e runtime). Admin é 100% client-side, não precisa de `API_URL` interna.

Dockerfiles (os 3 apps) — mesma mudança nos três:
- `FROM node:22-alpine` em todos os estágios.
- Adicionar `.dockerignore` na raiz do repo (mínimo: `node_modules`, `**/.next`,
  `**/dist`, `.git`, `logs/`, `Docs/`, `*.md`, `backups/`).
- Ativar `output: 'standalone'` em `apps/website/next.config.js` e
  `apps/admin/next.config.js`, e ajustar o estágio runtime dos respectivos Dockerfiles
  pra copiar só `.next/standalone` + `.next/static` + `public` (bem mais leve que copiar
  `node_modules` inteiro).
- Trocar `pnpm install --no-frozen-lockfile` por `pnpm install --frozen-lockfile`.
- Trocar `RUN npm install -g pnpm` por `RUN corepack enable && corepack prepare
  pnpm@<versão fixa> --activate` (Node 22 já traz corepack).

CI (mínimo viável, pode ser incremental):
- GitHub Actions: em push/PR pra `main`, rodar `pnpm install --frozen-lockfile`,
  `pnpm -r build` (typecheck incluso nos builds Next/Nest), `pnpm --filter lipid-api run
  test`. Não precisa buildar imagem Docker no CI ainda — o Coolify continua responsável
  pelo build de imagem no deploy; o CI é só gate de qualidade antes do merge.

## Fora de escopo (não fazer)

- Não alterar textos, imagens, componentes visuais, layout ou estrutura de páginas do
  site — está aprovado pelo cliente.
- Não commitar nem versionar nenhuma credencial real (tokens do Coolify, senha do banco,
  `JWT_SECRET`, `RD_STATION_API_KEY`). Este arquivo não contém nenhuma — pedir ao usuário
  ou pegar do painel do Coolify/gestor de segredos da Daksa.
- Não apagar nem sobrescrever a VPS/deploy atual até a nova estar validada — este é um
  projeto de migração, a origem continua servindo produção até o corte de DNS.

## Checklist de corte de domínio (quando a nova VPS estiver pronta pra receber tráfego)

Trocar as referências hardcoded de `daksa.app.br` pra `daksa.online` (não fazer antes da
VPS nova estar pronta — a origem atual ainda serve produção no domínio antigo):

- `apps/api/src/main.ts:26-27` — whitelist de CORS (`https://lipid.…`, `https://cms.…`).
- `docker-compose.yaml` — `NEXT_PUBLIC_API_URL` (4 ocorrências: build arg + runtime, nos
  serviços `website` e `admin`).
- `apps/website/src/app/layout.tsx:10`, `apps/website/src/app/sitemap.ts:4`,
  `apps/website/src/app/robots.ts:9` — constante `SITE_URL`/sitemap apontando pro domínio
  antigo.
- Achado à parte (bug pré-existente, não é specífico da migração):
  `apps/admin/src/components/ContentForm.tsx:68` e
  `apps/website/src/app/blog/[slug]/page.tsx:13` usam fallback `https://daksa.app.br`
  (sem o `lipid.`), inconsistente com os 3 arquivos acima — vale corrigir na mesma leva,
  mas é opcional pro corte de domínio funcionar.
- `apps/api/prisma/seed.ts:18` — e-mail do usuário admin seed (`admin@daksa.app.br`) é
  convenção de conta corporativa, não afeta hospedagem — só mudar se pedirem.

## Validação pós-deploy (obrigatório, não assumir que funcionou)

Depois do deploy na VPS nova, confirmar via `curl` direto contra os três domínios
(nunca aceitar só o retorno da API de deploy do Coolify como confirmação):

```
curl -s https://api.daksa.online/health
curl -s -o /dev/null -w "%{http_code}\n" https://lipid.daksa.online/
curl -s -o /dev/null -w "%{http_code}\n" https://lipid.daksa.online/tecnologias/<slug-real>
curl -s -o /dev/null -w "%{http_code}\n" https://lipid.daksa.online/segmentos/<slug-real>
curl -s -o /dev/null -w "%{http_code}\n" https://cms.daksa.online/login
```

As rotas `/tecnologias/[slug]` e `/segmentos/[slug]` são as que quebram primeiro se o
`API_URL` interno (problema conhecido #1) não estiver configurado — testar essas duas
especificamente, não só a home.
