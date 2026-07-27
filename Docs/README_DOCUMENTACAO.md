# 📚 Documentação Completa - Projeto Daksa (LIPID)

Bem-vindo à documentação de desenvolvimento do projeto **Daksa**, a plataforma institucional da LIPID.

---

## 🚀 Início Rápido (5 minutos)

Se você quer começar **já**, nessa ordem:

1. **Leia:** [SETUP_DAKSA_DEV.md](./SETUP_DAKSA_DEV.md) - Seção "Setup VPS e Coolify" até "Estrutura de Código"
2. **Execute:** Scripts em [SETUP_SCRIPTS.md](./SETUP_SCRIPTS.md) - `setup-env.sh` e `dev-start.sh`
3. **Clone:** Repo do GitHub
4. **Configure:** Variáveis de ambiente
5. **Deploy:** Aplicações no Coolify

**Tempo total:** ~30 minutos

---

## 📖 Documentos Disponíveis

### 1. **SETUP_DAKSA_DEV.md** 
**📄 Documentação principal - 600+ linhas**

Cobertura completa do projeto, passo-a-passo detalhado.

| Seção | Descrição |
|-------|-----------|
| [Pré-requisitos](#pré-requisitos) | O que você precisa ter |
| [Arquitetura e Domínios](#arquitetura-e-domínios) | Estrutura de subdomínios |
| [Setup VPS e Coolify](#setup-vps-e-coolify) | Configurar infraestrutura |
| [Banco de Dados](#banco-de-dados) | PostgreSQL no Coolify |
| [Estrutura de Código](#estrutura-de-código) | Organização monorepo |
| [Configurações de Ambiente](#configurações-de-ambiente) | .env por ambiente |
| [Dockerfiles](#dockerfiles) | Imagens otimizadas |
| [Deploy no Coolify](#deploy-no-coolify) | Criar apps + deploy |
| [Workflow de Dev](#workflow-de-desenvolvimento) | Dia-a-dia do dev |
| [Troubleshooting](#troubleshooting) | Problemas comuns |
| [Checklist Pré-Launch](#checklist-pré-launch) | Validação final |

### 2. **SETUP_SCRIPTS.md**
**🛠️ Scripts prontos para usar - 400+ linhas**

Shell scripts, Makefiles, e snippets para automatizar tarefas.

| Script | Propósito |
|--------|-----------|
| `init-project.sh` | Criar estrutura de pastas |
| `setup-env.sh` | Gerar arquivos .env |
| `dev-start.sh` | Setup completo (DB + deps) |
| `troubleshoot.sh` | Verificar saúde do setup |
| `deploy.sh` | Commit + push + deploy automático |
| `health-check.sh` | Testar endpoints |
| `release.sh` | Versionar releases |
| `test-db.sh` | Testar conexão banco |
| `Makefile` | Comandos com `make` |
| Git Hooks | pre-commit automation |

### 3. **CODE_TEMPLATES.md**
**💻 Templates de código prontos - 700+ linhas**

Código pronto para copiar/colar em cada seção do projeto.

| Seção | Includes |
|-------|----------|
| **Backend (NestJS)** | AppModule, Controllers, Services, Database Service, Auth, Prisma Schema |
| **Frontend (Next.js)** | Layout, Pages, API Client, Next Config |
| **CMS Admin (Next.js)** | Admin Layout, Dashboard, Stats |
| **Ejemplos Completos** | CRUD completo (Controller → Service → DTO) |
| **TypeScript Types** | Tipos compartilhados entre apps |

---

## 🎯 Fluxo de Implementação (por função)

### 👤 Desenvolvedor Frontend

**Ordem de leitura:**
1. [SETUP_DAKSA_DEV.md](./SETUP_DAKSA_DEV.md) - Seções: Arquitetura, Setup Local, Docker Compose
2. [CODE_TEMPLATES.md](./CODE_TEMPLATES.md) - Seção: Frontend (Next.js Website)
3. [SETUP_SCRIPTS.md](./SETUP_SCRIPTS.md) - Shortcuts e Make commands

**Comandos principais:**
```bash
pnpm run dev           # Start dev
npm run dev -w @app/website  # Só website
make lint              # Linter
make deploy            # Deploy
```

### 👨‍💻 Desenvolvedor Backend

**Ordem de leitura:**
1. [SETUP_DAKSA_DEV.md](./SETUP_DAKSA_DEV.md) - Seções: Database, Dockerfiles, Deploy
2. [CODE_TEMPLATES.md](./CODE_TEMPLATES.md) - Seção: Backend (NestJS)
3. [SETUP_SCRIPTS.md](./SETUP_SCRIPTS.md) - test-db.sh, troubleshoot.sh

**Comandos principais:**
```bash
cd apps/api
pnpm run start:dev     # Start API com hot reload
pnpm prisma studio    # UI para gerenciar DB
pnpm prisma migrate dev --name [nome]  # Nova migration
make test              # Rodar testes
```

### 🎨 Dev Full-stack / Líder de projeto

**Ordem de leitura:**
1. [SETUP_DAKSA_DEV.md](./SETUP_DAKSA_DEV.md) - Leitura completa
2. [SETUP_SCRIPTS.md](./SETUP_SCRIPTS.md) - Todos scripts
3. [CODE_TEMPLATES.md](./CODE_TEMPLATES.md) - Referência

**Responsabilidades:**
- Setup inicial VPS + Coolify
- Criar estrutura repo GitHub
- Fazer primeiro deploy
- Mentorear frontend/backend devs
- CI/CD pipeline

---

## 🗺️ Arquitetura Geral

```
┌─────────────────────────────────────────────────────────┐
│                    INTERNET (Usuários)                   │
└────────────┬──────────────────────────┬────────────────┘
             │                          │
      ┌──────▼──────┐           ┌───────▼────────┐
      │ daksa.app.br│           │ api.daksa.     │
      │ (Website)   │           │ app.br (API)   │
      │ Next.js 3000│           │ NestJS 3002    │
      └──────┬──────┘           └───────┬────────┘
             │                          │
             │  ┌──────────────────────┘
             │  │
             └──┼─────────┐
                │         │
         ┌──────▼──┐  ┌──▼──────────┐
         │ Nginx   │  │ PostgreSQL  │
         │ (proxy) │  │ (Database)  │
         └─────────┘  └─────────────┘
                │
         ┌──────▼──────┐
         │ cms.daksa.  │
         │ app.br (CMS)│
         │ Next.js 3001│
         └─────────────┘

Tudo roda em: VPS Linux + Coolify + Docker
```

---

## 📋 Checklist Completo de Setup

### Pré-requisitos
- [ ] VPS com Ubuntu 20.04+ (4 vCPU, 8GB RAM)
- [ ] Coolify instalado e rodando
- [ ] Acesso SSH à VPS
- [ ] Conta GitHub (repo privado)
- [ ] Domínio `daksa.app.br` com DNS editável

### Semana 1: Infraestrutura
- [ ] Acessar Coolify em `https://[IP]:3000`
- [ ] Configurar DNS (3 A records: daksa.app.br, api.*, cms.*)
- [ ] Criar serviço PostgreSQL no Coolify
- [ ] Criar banco `lipid_production`

### Semana 2: Código e Deploy
- [ ] Criar repo GitHub
- [ ] Estrutura monorepo pronta
- [ ] Dockerfiles criados
- [ ] 3 apps criadas no Coolify (api, website, admin)
- [ ] Primeiro deploy bem-sucedido
- [ ] HTTPS ativo (Let's Encrypt)

### Semana 3: Dev Ready
- [ ] Variáveis de ambiente setadas
- [ ] Local dev funcionando (docker-compose up)
- [ ] Health checks respondendo
- [ ] CORS configurado
- [ ] Git workflow pronto (feature branches, commits)
- [ ] Primeira feature deployada com sucesso

---

## 🔑 Comandos Mais Usados

```bash
# ===== SETUP =====
pnpm install                    # Install all deps
docker-compose up -d postgres   # Start DB

# ===== DEVELOPMENT =====
pnpm run dev                    # All apps dev mode
cd apps/api && pnpm start:dev   # Just API
cd apps/website && pnpm dev     # Just website
docker-compose logs -f postgres # DB logs

# ===== DATABASE =====
cd apps/api && pnpm prisma studio          # Visual DB editor
cd apps/api && pnpm prisma migrate dev     # New migration
cd apps/api && pnpm prisma db seed         # Seed data

# ===== DEPLOYMENT =====
git add . && git commit -m "..." && git push  # Auto-deploy
curl https://api.daksa.app.br/health         # Check API

# ===== DEBUGGING =====
docker-compose ps              # See all containers
docker-compose exec api sh      # SSH to API container
docker-compose logs -f api      # Stream API logs
docker system prune             # Clean up Docker

# ===== CLEANUP =====
docker-compose down             # Stop all
docker volume rm [volume-name]  # Delete volume
```

---

## 📞 Problemas Comuns

### "Coolify não consegue fazer build"
→ Veja [SETUP_DAKSA_DEV.md - Troubleshooting](./SETUP_DAKSA_DEV.md#problema-coolify-não-consegue-fazer-build)

### "API não conecta no banco"
→ Veja [SETUP_DAKSA_DEV.md - Troubleshooting](./SETUP_DAKSA_DEV.md#problema-api-não-conecta-no-banco)

### "Website não consegue chamar API (CORS error)"
→ Veja [SETUP_DAKSA_DEV.md - Troubleshooting](./SETUP_DAKSA_DEV.md#problema-website-não-consegue-chamar-api)

### "Porta já está em uso"
→ Veja [SETUP_DAKSA_DEV.md - Troubleshooting](./SETUP_DAKSA_DEV.md#problema-porta-já-está-em-uso-local)

**Para outros problemas:** Consulte seção [Troubleshooting](./SETUP_DAKSA_DEV.md#-troubleshooting) completa.

---

## 🎓 Próximas Fases (Pós-Launch)

Após ter tudo rodando em dev:

1. **Phase 0-1 Semanas: Core Development**
   - Prisma schema completo
   - APIs básicas (CRUD)
   - Frontend principal
   - CMS funcional

2. **Phase 1-2 Semanas: Features**
   - Integração RD Station
   - Email (SendGrid)
   - Autenticação JWT
   - Validações complexas

3. **Phase 2-3 Semanas: Polish**
   - Testes (Jest)
   - Performance (Lighthouse)
   - SEO (next-seo)
   - Acessibilidade (WCAG)

4. **Phase 3-4 Semanas: Production-ready**
   - Sentry (error tracking)
   - CI/CD (GitHub Actions)
   - Backups (n8n)
   - Monitoring

---

## 📚 Referências Externas

- **NestJS:** https://docs.nestjs.com
- **Next.js:** https://nextjs.org/docs
- **Prisma:** https://www.prisma.io/docs
- **Coolify:** https://coolify.io/docs
- **PostgreSQL:** https://www.postgresql.org/docs
- **Docker:** https://docs.docker.com
- **TypeScript:** https://www.typescriptlang.org/docs

---

## 📊 Estrutura de Pastas

```
lipid-platform/
├── apps/
│   ├── website/           # Site público (Next.js)
│   │   ├── src/
│   │   │   ├── app/      # App router
│   │   │   ├── components/
│   │   │   └── lib/
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   ├── api/               # Backend (NestJS)
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── app.module.ts
│   │   │   └── modules/
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   └── admin/             # CMS (Next.js)
│       ├── src/
│       ├── Dockerfile
│       └── package.json
│
├── packages/
│   ├── types/             # TypeScript types
│   ├── ui/                # Shared components
│   └── config/            # Shared config
│
├── docker-compose.yml     # Local dev
├── .env.example           # Env template (committed)
├── .gitignore
├── package.json           # Monorepo root
├── pnpm-workspace.yaml    # (ou npm workspaces)
│
├── SETUP_DAKSA_DEV.md     # Main docs
├── SETUP_SCRIPTS.md       # Scripts
├── CODE_TEMPLATES.md      # Templates
└── README.md              # Project README
```

---

## 🤝 Como Contribuir

1. **Crie uma branch:** `git checkout -b feature/minha-feature`
2. **Faça suas mudanças** e commit
3. **Abra PR** contra `main`
4. **Deploy automático** ativa ao mergear

**Padrão de commits:**
```
feat: adicionar novo endpoint
fix: corrigir validação
refactor: reorganizar pastas
docs: atualizar documentação
chore: atualizar dependências
```

---

## 📝 Versioning

Semver: `MAJOR.MINOR.PATCH`

- **MAJOR:** Breaking changes (requer migration DB, etc)
- **MINOR:** Nova feature (backwards compatible)
- **PATCH:** Bug fix

**Exemplo:**
```bash
# v1.0.0 → v1.1.0 (nova feature)
# v1.1.0 → v1.1.1 (bug fix)
# v1.1.1 → v2.0.0 (breaking change)
```

---

## 📞 Suporte e Contato

- **Docs completas:** Esta documentação (3 arquivos .md)
- **GitHub Issues:** [seu-repo]/issues
- **Discord/Slack:** [canal-dev da equipe]
- **Meetings:** Daily standup + Weekly sync

---

## ✅ Última Verificação

Antes de começar desenvolvimento real:

- [ ] Todos 3 arquivos .md lidos?
- [ ] VPS + Coolify funcionando?
- [ ] DNS configurado?
- [ ] PostgreSQL criado?
- [ ] Repo GitHub clonado?
- [ ] docker-compose.yml funcionando?
- [ ] Primeiro commit feito?
- [ ] Apps deployadas no Coolify?

**Se sim em todas:** 🎉 **Você está pronto para começar!**

---

**Documentação versão:** 1.0  
**Última atualização:** Julho 2026  
**Status:** ✅ Pronto para uso  

---

## 📄 Índice de Arquivos

| Arquivo | Propósito | Tamanho |
|---------|-----------|--------|
| **SETUP_DAKSA_DEV.md** | Documentação principal completa | ~600 linhas |
| **SETUP_SCRIPTS.md** | Scripts e automação | ~400 linhas |
| **CODE_TEMPLATES.md** | Templates de código prontos | ~700 linhas |
| **README_DOCUMENTACAO.md** | Este arquivo (índice) | ~500 linhas |
| **TOTAL** | Documentação completa | ~2200 linhas |

**Tempo de leitura estimado:**
- Setup completo: 1-2 horas
- Referência rápida: 15-30 min
- Deep dive em uma seção: 30-45 min

---

🚀 **Pronto para começar? Abra [SETUP_DAKSA_DEV.md](./SETUP_DAKSA_DEV.md) e siga os passos!**
