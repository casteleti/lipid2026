# 🛠️ Scripts e Templates Úteis - Daksa Dev Setup

Arquivo com scripts prontos para copiar/colar e acelerar setup.

---

## 📂 Script: Criar estrutura de pastas

Salve como `init-project.sh`:

```bash
#!/bin/bash

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Criando estrutura do projeto Daksa...${NC}"

# Apps
mkdir -p apps/website/src/app
mkdir -p apps/website/src/components
mkdir -p apps/website/public

mkdir -p apps/api/src
mkdir -p apps/api/prisma

mkdir -p apps/admin/src/app
mkdir -p apps/admin/src/components

# Packages
mkdir -p packages/types/src
mkdir -p packages/ui/src/components
mkdir -p packages/config/src

echo -e "${GREEN}✓ Pasta apps/ criada${NC}"
echo -e "${GREEN}✓ Pasta packages/ criada${NC}"

# Criar files vazios pra manter pastas no git
touch apps/website/.gitkeep
touch apps/api/src/.gitkeep
touch packages/types/src/.gitkeep

echo -e "${GREEN}✓ Estrutura pronta!${NC}"
echo -e "${BLUE}Próximo passo: npm install${NC}"
```

**Usar:**
```bash
chmod +x init-project.sh
./init-project.sh
```

---

## 📝 Script: Gerar .env arquivos

Salve como `setup-env.sh`:

```bash
#!/bin/bash

echo "Criando arquivos .env..."

cat > .env.example << 'EOF'
# ============================================
# DATABASE
# ============================================
DATABASE_URL=postgresql://postgres:password@postgres:5432/lipid_production

# ============================================
# BACKEND (NestJS API)
# ============================================
API_PORT=3002
NODE_ENV=development
LOG_LEVEL=debug
JWT_SECRET=dev-secret-change-in-production-please
JWT_EXPIRY=24h

# ============================================
# FRONTEND (Next.js Website)
# ============================================
NEXT_PUBLIC_API_URL=http://localhost:3002

# ============================================
# CMS ADMIN (Next.js)
# ============================================
NEXT_PUBLIC_API_URL=http://localhost:3002
EOF

cat > .env.local << 'EOF'
# LOCAL DEVELOPMENT ONLY
# Copy from .env.example and adjust

DATABASE_URL=postgresql://postgres:dev@localhost:5432/lipid_development
NEXT_PUBLIC_API_URL=http://localhost:3002
NODE_ENV=development
JWT_SECRET=dev-secret-local-only
EOF

echo "✓ .env.example criado"
echo "✓ .env.local criado (adicione ao .gitignore)"
```

**Usar:**
```bash
chmod +x setup-env.sh
./setup-env.sh
```

---

## 🐳 Script: Setup completo com Docker

Salve como `dev-start.sh`:

```bash
#!/bin/bash

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 Iniciando ambiente de desenvolvimento...${NC}"

# 1. Check if docker-compose exists
if ! command -v docker-compose &> /dev/null; then
    echo -e "${YELLOW}⚠️  docker-compose não encontrado${NC}"
    exit 1
fi

# 2. Stop any existing containers
echo -e "${BLUE}Parando containers anteriores...${NC}"
docker-compose down || true

# 3. Start postgres
echo -e "${BLUE}Iniciando PostgreSQL...${NC}"
docker-compose up -d postgres
sleep 5

# 4. Create database if not exists
echo -e "${BLUE}Criando database...${NC}"
docker-compose exec -T postgres psql -U postgres -tc "SELECT 1 FROM pg_database WHERE datname = 'lipid_development'" | grep -q 1 || \
docker-compose exec -T postgres psql -U postgres -c "CREATE DATABASE lipid_development;"

echo -e "${GREEN}✓ PostgreSQL pronto${NC}"

# 5. Install deps
echo -e "${BLUE}Instalando dependências...${NC}"
pnpm install

# 6. Run migrations (if Prisma exists)
if [ -f "apps/api/prisma/schema.prisma" ]; then
    echo -e "${BLUE}Rodando migrations...${NC}"
    cd apps/api
    pnpm prisma migrate dev --name init || true
    cd ../..
fi

echo -e "${GREEN}✓ Setup completo!${NC}"
echo -e "${BLUE}Próximo: pnpm run dev${NC}"
```

**Usar:**
```bash
chmod +x dev-start.sh
./dev-start.sh
```

---

## 🔧 Script: Quick troubleshoot

Salve como `troubleshoot.sh`:

```bash
#!/bin/bash

echo "🔍 Verificando setup..."

echo ""
echo "=== Docker ==="
docker --version
docker-compose --version

echo ""
echo "=== Node/NPM ==="
node --version
npm --version
pnpm --version || echo "pnpm não instalado"

echo ""
echo "=== Git ==="
git --version
git config user.email || echo "Git email não configurado"

echo ""
echo "=== Containers rodando ==="
docker-compose ps

echo ""
echo "=== PostgreSQL Connection ==="
docker-compose exec -T postgres psql -U postgres -c "SELECT version();" || echo "❌ Postgres não respondendo"

echo ""
echo "=== Arquivos importantes ==="
[ -f ".env.local" ] && echo "✓ .env.local existe" || echo "❌ .env.local faltando"
[ -f "docker-compose.yml" ] && echo "✓ docker-compose.yml existe" || echo "❌ docker-compose.yml faltando"
[ -d "apps/api" ] && echo "✓ apps/api/ existe" || echo "❌ apps/api/ faltando"
[ -d "apps/website" ] && echo "✓ apps/website/ existe" || echo "❌ apps/website/ faltando"

echo ""
echo "✅ Verificação concluída"
```

**Usar:**
```bash
chmod +x troubleshoot.sh
./troubleshoot.sh
```

---

## 🌍 Script: Deploy no Coolify (manual)

Salve como `deploy.sh`:

```bash
#!/bin/bash

set -e

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Config
REPO="https://github.com/[seu-usuario]/lipid-platform.git"
COOLIFY_URL="https://[seu-ip-vps]:3000"
APPS=("lipid-api" "lipid-website" "lipid-admin")

echo -e "${BLUE}🚀 Iniciando deploy no Coolify...${NC}"

# 1. Verificar mudanças
echo -e "${BLUE}Verificando status Git...${NC}"
if [ -z "$(git status --porcelain)" ]; then
    echo -e "${GREEN}✓ Sem mudanças não commitadas${NC}"
else
    echo -e "${RED}❌ Mudanças não commitadas encontradas${NC}"
    exit 1
fi

# 2. Get latest commit
COMMIT=$(git rev-parse --short HEAD)
echo -e "${BLUE}Último commit: ${COMMIT}${NC}"

# 3. Push para remote
echo -e "${BLUE}Fazendo push...${NC}"
git push origin main

echo -e "${GREEN}✓ Push realizado${NC}"
echo -e "${BLUE}Aguarde 2-5 min para Coolify fazer rebuild...${NC}"
echo -e "${BLUE}Acompanhe em: ${COOLIFY_URL}${NC}"
```

**Usar:**
```bash
chmod +x deploy.sh
./deploy.sh
```

---

## 📋 Makefile (alternativa a shell scripts)

Salve como `Makefile` (raiz do projeto):

```makefile
.PHONY: help dev dev-stop setup test lint format db-seed deploy

help:
	@echo "🚀 Daksa Development Commands"
	@echo ""
	@echo "Setup:"
	@echo "  make setup          - Setup inicial (deps, db, env)"
	@echo "  make dev            - Inicia ambiente dev"
	@echo "  make dev-stop       - Para containers"
	@echo ""
	@echo "Database:"
	@echo "  make db-seed        - Seed data inicial"
	@echo "  make db-reset       - Reset completo (cuidado!)"
	@echo ""
	@echo "Code:"
	@echo "  make lint           - Rodar linter"
	@echo "  make format         - Formatar código"
	@echo "  make test           - Rodar testes"
	@echo ""
	@echo "Deploy:"
	@echo "  make deploy         - Deploy no Coolify"

setup:
	@echo "📦 Setup inicial..."
	cp .env.example .env.local
	docker-compose up -d postgres
	sleep 5
	docker-compose exec -T postgres psql -U postgres -c "CREATE DATABASE lipid_development;" || true
	pnpm install
	@echo "✓ Setup concluído"

dev:
	@echo "🚀 Iniciando dev..."
	docker-compose up

dev-stop:
	@echo "🛑 Parando containers..."
	docker-compose down

db-seed:
	@echo "🌱 Seeding database..."
	cd apps/api && pnpm prisma db seed || true

db-reset:
	@echo "⚠️  Resetando banco (irrevogável)..."
	cd apps/api && pnpm prisma migrate reset --force

lint:
	@echo "🔍 Linting..."
	cd apps/api && pnpm lint
	cd apps/website && pnpm lint
	cd apps/admin && pnpm lint

format:
	@echo "✨ Formatando código..."
	prettier --write "apps/**/*.{ts,tsx,js,jsx}"
	prettier --write "packages/**/*.{ts,tsx,js,jsx}"

test:
	@echo "🧪 Rodando testes..."
	cd apps/api && pnpm test

deploy:
	@echo "🚀 Deployando no Coolify..."
	git push origin main
	@echo "✓ Aguarde Coolify fazer rebuild (2-5 min)"
```

**Usar:**
```bash
make help        # Ver todas opções
make setup       # Setup completo
make dev         # Inicia dev
make lint        # Rodar linter
make deploy      # Deploy
```

---

## 🔐 Script: Gerar secrets seguros

Salve como `generate-secrets.sh`:

```bash
#!/bin/bash

echo "🔐 Gerando secrets seguros..."
echo ""

# JWT Secret (32+ caracteres aleatórios)
JWT_SECRET=$(openssl rand -base64 32)
echo "JWT_SECRET=${JWT_SECRET}"

# Database Password
DB_PASSWORD=$(openssl rand -base64 16)
echo "DB_PASSWORD=${DB_PASSWORD}"

# API Key (se precisar futuramente)
API_KEY=$(openssl rand -hex 32)
echo "API_KEY=${API_KEY}"

echo ""
echo "⚠️  Copie e guarde esses valores em local seguro"
echo "    Não commit no Git!"
```

**Usar:**
```bash
chmod +x generate-secrets.sh
./generate-secrets.sh
```

---

## 📊 Script: Verificar saúde da aplicação

Salve como `health-check.sh`:

```bash
#!/bin/bash

echo "🏥 Health Check"
echo ""

API_URL="https://api.daksa.app.br"
WEBSITE_URL="https://daksa.app.br"
CMS_URL="https://cms.daksa.app.br"

check_health() {
    local url=$1
    local name=$2
    
    status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [ "$status" = "200" ]; then
        echo "✅ $name: OK (HTTP $status)"
    else
        echo "❌ $name: ERROR (HTTP $status)"
    fi
}

echo "Verificando endpoints..."
check_health "$API_URL/health" "API Health"
check_health "$WEBSITE_URL/" "Website"
check_health "$CMS_URL/" "CMS Admin"

echo ""
echo "Local Dev:"
check_health "http://localhost:3002/health" "API (Local)"
check_health "http://localhost:3000/" "Website (Local)"
check_health "http://localhost:3001/" "CMS (Local)"
```

**Usar:**
```bash
chmod +x health-check.sh
./health-check.sh
```

---

## 🎯 Script: Automatizar commit + push + deploy

Salve como `release.sh`:

```bash
#!/bin/bash

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

if [ -z "$1" ]; then
    echo "Uso: ./release.sh 'mensagem do commit'"
    exit 1
fi

MESSAGE=$1

echo -e "${BLUE}🚀 Iniciando release...${NC}"
echo -e "${YELLOW}Mensagem: $MESSAGE${NC}"

# Check status
if [ -z "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}⚠️  Nada pra commitar${NC}"
    exit 0
fi

# Stage all
echo -e "${BLUE}Staging arquivos...${NC}"
git add .

# Commit
echo -e "${BLUE}Commitando...${NC}"
git commit -m "$MESSAGE"

# Push
echo -e "${BLUE}Fazendo push...${NC}"
git push origin main

echo -e "${GREEN}✓ Committed and pushed!${NC}"
echo -e "${BLUE}Coolify detectará em breve e fará deploy...${NC}"
```

**Usar:**
```bash
chmod +x release.sh
./release.sh "feat: adicionar listagem de produtos"
```

---

## 🧪 Script: Testar conectividade banco

Salve como `test-db.sh`:

```bash
#!/bin/bash

echo "🗄️  Testando conexão com banco..."

# Local
echo ""
echo "=== Local (Docker) ==="
docker-compose exec -T postgres psql -U postgres -c "SELECT NOW();" && echo "✓ Local OK" || echo "❌ Erro local"

# Production (se conectar)
if [ -n "$DATABASE_URL" ]; then
    echo ""
    echo "=== Production ==="
    psql "$DATABASE_URL" -c "SELECT NOW();" && echo "✓ Production OK" || echo "❌ Erro production"
fi

echo ""
echo "=== Tables ==="
docker-compose exec -T postgres psql -U postgres lipid_development -c "\dt" || echo "❌ Banco lipid_development não existe"
```

**Usar:**
```bash
chmod +x test-db.sh
./test-db.sh
```

---

## 📝 Git Hooks (pre-commit)

Salve como `.git/hooks/pre-commit`:

```bash
#!/bin/bash

echo "🔍 Pre-commit checks..."

# Lint
echo "Running linter..."
pnpm lint || {
    echo "❌ Lint failed"
    exit 1
}

# Format
echo "Checking format..."
pnpm format || {
    echo "❌ Format failed"
    exit 1
}

echo "✓ Pre-commit checks passed"
```

**Ativar:**
```bash
chmod +x .git/hooks/pre-commit
```

---

## 🐳 Shortcut: docker-compose aliases

Adicione ao seu `~/.bashrc` ou `~/.zshrc`:

```bash
# Daksa dev shortcuts
alias dlogs='docker-compose logs -f'
alias dps='docker-compose ps'
alias dup='docker-compose up -d'
alias ddown='docker-compose down'
alias dapi='docker-compose exec api pnpm'
dweb='docker-compose exec website pnpm'
dadmin='docker-compose exec admin pnpm'
```

**Usar:**
```bash
dps                  # Ver status containers
dlogs postgres       # Ver logs Postgres
dapi start:dev       # Rodar dev no API
```

---

## 🚀 Quick Reference Card

```bash
# === SETUP ===
pnpm install                    # Install deps
docker-compose up -d postgres   # Start DB

# === DEV ===
pnpm run dev                    # Start all dev
docker-compose logs -f postgres # Monitor DB
npm run dev -w @app/api         # Start só API (workspace)

# === DEPLOY ===
git push origin main            # Trigger Coolify deploy

# === DATABASE ===
cd apps/api && pnpm prisma studio  # UI para editar DB
cd apps/api && pnpm prisma migrate dev --name [name]  # Nova migration

# === DEBUGGING ===
docker-compose ps               # Ver containers
docker-compose exec api sh      # SSH para container
docker-compose logs -f api      # Ver logs em tempo real

# === CLEANUP ===
docker-compose down             # Stop containers
docker system prune             # Limpar imagens não usadas
```

---

**Dica:** Coloque todos esses scripts em uma pasta `./scripts/` e adicione ao `.gitignore`:

```bash
mkdir scripts
# Mover scripts pra lá
chmod +x scripts/*.sh

# No package.json, adicionar:
"scripts": {
  "dev": "docker-compose up",
  "setup": "./scripts/dev-start.sh",
  "deploy": "./scripts/deploy.sh",
  "health": "./scripts/health-check.sh"
}
```

Aí você roda `npm run setup` ao invés de `./scripts/dev-start.sh`.
