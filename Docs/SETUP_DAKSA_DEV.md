# 🚀 Documentação de Setup: Daksa App (LIPID)
## Desenvolvimento com Coolify

**Versão:** 1.0  
**Data:** Julho 2026  
**Status:** Pronto para implementação  
**Stack:** Next.js + NestJS + PostgreSQL + Docker  

---

## 📋 Sumário

1. [Pré-requisitos](#pré-requisitos)
2. [Arquitetura e Domínios](#arquitetura-e-domínios)
3. [Setup VPS e Coolify](#setup-vps-e-coolify)
4. [Banco de Dados](#banco-de-dados)
5. [Estrutura de Código](#estrutura-de-código)
6. [Configurações de Ambiente](#configurações-de-ambiente)
7. [Dockerfiles](#dockerfiles)
8. [Deploy no Coolify](#deploy-no-coolify)
9. [Workflow de Desenvolvimento](#workflow-de-desenvolvimento)
10. [Troubleshooting](#troubleshooting)

---

## ✅ Pré-requisitos

- VPS com Ubuntu 20.04+ LTS (4 vCPU, 8GB RAM, 120GB SSD)
- Coolify já instalado e rodando
- Acesso ao painel Coolify (porta 3000)
- Conta GitHub (repo privado)
- Domínio `daksa.app.br` com acesso ao DNS

---

## 🏗️ Arquitetura e Domínios

### Estrutura de Subdomínios

```
daksa.app.br
├── [Raiz] → Website institucional (Next.js)
├── api.daksa.app.br → Backend API (NestJS)
└── cms.daksa.app.br → Painel administrativo CMS (Next.js)
```

### Fluxo de Requisições

```
[Cliente Browser]
    ↓
    ├─→ daksa.app.br (HTTPS) → Website [Next.js Port 3000]
    ├─→ api.daksa.app.br (HTTPS) → Backend API [NestJS Port 3002]
    └─→ cms.daksa.app.br (HTTPS) → CMS Admin [Next.js Port 3001]
    
[Internamente no Docker]
    ↓
    All apps na mesma bridge network
    ↓
    Database: postgres:5432 (hostname interno = "postgres")
```

### Tecnologias por Serviço

| Serviço | Porta | Tecnologia | Responsabilidade |
|---------|-------|-----------|------------------|
| Website | 3000 | Next.js (React) | Site público, SEO, homepage |
| API | 3002 | NestJS | Backend, regras negócio, CRUD |
| Admin | 3001 | Next.js (React) | Painel CMS, gerenciamento conteúdo |
| Database | 5432 | PostgreSQL 15 | Armazenamento relacional |

---

## 🔧 Setup VPS e Coolify

### Passo 1: Acessar Painel Coolify

```bash
# Do seu computador, abra no navegador:
https://[IP_VPS]:3000

# Fazer login com credenciais configuradas no Coolify
```

### Passo 2: Configurar Domínio Temporário (DNS)

Você precisa apontar os 3 subdomínios para o IP da VPS. Vá para seu provedor de DNS (daksa.app.br):

```dns
Nome | Tipo | Valor
-----|------|-------
@ (raiz) | A | [IP_VPS]
api | A | [IP_VPS]
cms | A | [IP_VPS]
```

**Verificar propagação:**
```bash
nslookup daksa.app.br
nslookup api.daksa.app.br
nslookup cms.daksa.app.br
```

Todos devem retornar o IP da VPS.

### Passo 3: Atualizar Firewall da VPS (se necessário)

```bash
# SSH para VPS
ssh root@[IP_VPS]

# Abrir portas necessárias (se usar ufw)
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS

ufw enable
```

---

## 🗄️ Banco de Dados

### Passo 1: Criar Serviço PostgreSQL no Coolify

1. Acesse: Coolify Dashboard → Services
2. Clique em "Create Service"
3. Selecione "PostgreSQL"
4. Configure:
   - **Name:** postgres (não alterar)
   - **Version:** 15 (LTS)
   - **Password:** [gerar algo forte, ex: `Daksa2024!@#Dev`]
   - Deixar outros campos como padrão

5. Clique "Create & Deploy"
6. Aguarde status ficar "Running" (2-3 min)

### Passo 2: Anotar Credenciais

No Coolify → Services → PostgreSQL → Settings, você verá:

```env
# Guarde estas informações
DB_USER=postgres
DB_PASSWORD=[a-senha-que-você-criou]
DB_HOST=postgres          # Nome do serviço (interno)
DB_PORT=5432
DB_NAME=lipid_production  # Será criado depois

# String completa para .env:
DATABASE_URL=postgresql://postgres:[PASSWORD]@postgres:5432/lipid_production
```

### Passo 3: Criar Database

Acesse o terminal do container PostgreSQL via Coolify:

```bash
# Via Coolify UI
Services → PostgreSQL → Terminal

# Ou via SSH + docker exec
docker exec -it postgres_container psql -U postgres

# Dentro do psql:
CREATE DATABASE lipid_production;
CREATE DATABASE lipid_development;
\q
```

---

## 📂 Estrutura de Código

### Passo 1: Criar Repositório no GitHub

1. Ir para github.com → New Repository
2. Nome: `lipid-platform`
3. Privado
4. Clonar localmente:

```bash
git clone https://github.com/[seu-usuario]/lipid-platform.git
cd lipid-platform
```

### Passo 2: Estrutura de Pastas

```bash
# Criar estrutura
mkdir -p apps/{website,api,admin}
mkdir -p packages/{types,ui,config}

# Resultado:
lipid-platform/
├── apps/
│   ├── website/              # Next.js frontend público
│   │   ├── src/
│   │   │   ├── app/         # App router Next.js
│   │   │   ├── components/
│   │   │   └── pages/       # Se usar pages router
│   │   ├── package.json
│   │   ├── Dockerfile
│   │   └── next.config.js
│   │
│   ├── api/                  # NestJS backend
│   │   ├── src/
│   │   │   ├── app.controller.ts
│   │   │   └── main.ts
│   │   ├── package.json
│   │   ├── Dockerfile
│   │   └── nest-cli.json
│   │
│   └── admin/                # Next.js CMS
│       ├── src/
│       │   └── app/
│       ├── package.json
│       ├── Dockerfile
│       └── next.config.js
│
├── packages/
│   ├── types/                # TypeScript types compartilhados
│   │   ├── src/
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── ui/                   # Componentes React reutilizáveis
│   │   ├── src/
│   │   │   └── components/
│   │   └── package.json
│   │
│   └── config/               # Configs globais (Tailwind, etc)
│       ├── src/
│       └── package.json
│
├── docker-compose.yml        # Para dev local
├── .env.example              # Commitado (sem valores reais)
├── .env.local                # Local apenas (gitignored)
├── .gitignore
├── README.md
└── SETUP_DAKSA_DEV.md        # Esta documentação
```

### Passo 3: Criar Arquivo .gitignore

```bash
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/
.nyc_output/

# Next.js
.next/
out/
dist/

# NestJS
dist/
node_modules/

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Docker
docker-compose.override.yml

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
EOF
```

### Passo 4: Criar .env.example

```bash
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

# JWT
JWT_SECRET=dev-secret-change-in-production-please
JWT_EXPIRY=24h

# ============================================
# FRONTEND (Next.js Website)
# ============================================
NEXT_PUBLIC_API_URL=http://localhost:3002
# Em produção: https://api.daksa.app.br

# ============================================
# CMS ADMIN (Next.js)
# ============================================
# Usa mesma API do frontend
NEXT_PUBLIC_API_URL=http://localhost:3002
# Em produção: https://api.daksa.app.br

# ============================================
# OBSERVAÇÃO IMPORTANTE
# ============================================
# Copie este arquivo para .env.local e preencha valores reais
# NUNCA commit .env.local ou .env no Git
# Apenas .env.example é commitado
EOF
```

### Passo 5: Commit inicial

```bash
git add .
git commit -m "chore: inicial repo structure"
git push origin main
```

---

## 🌍 Configurações de Ambiente

### Variáveis por Ambiente

#### Desenvolvimento Local

```bash
# .env.local (local apenas, não commit)
DATABASE_URL=postgresql://postgres:dev@localhost:5432/lipid_development
NEXT_PUBLIC_API_URL=http://localhost:3002
NODE_ENV=development
JWT_SECRET=dev-secret-local
```

#### Staging (Coolify)

```bash
# Definidas no Coolify UI (por app)
DATABASE_URL=postgresql://postgres:[SENHA]@postgres:5432/lipid_production
NEXT_PUBLIC_API_URL=https://api.daksa.app.br
NODE_ENV=development
JWT_SECRET=[GERAR NO COOLIFY]
```

#### Produção (Futura)

Mesmos nomes, valores diferentes:
```bash
DATABASE_URL=postgresql://[user]:[SENHA]@[DB_HOST]:[PORT]/lipid_production
NEXT_PUBLIC_API_URL=https://api.daksa.app.br
NODE_ENV=production
JWT_SECRET=[SUPER_SECRET_ALEATORIO]
```

### Como Setar no Coolify

Para cada app no Coolify:

```
Application → Settings → Environment Variables

Adicionar cada variável individualmente:
Key: DATABASE_URL
Value: postgresql://postgres:password@postgres:5432/lipid_production

Key: NODE_ENV
Value: development

... etc
```

---

## 🐳 Dockerfiles

### 1. Backend (NestJS) - `apps/api/Dockerfile`

```dockerfile
# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package*.json ./
COPY pnpm-lock.yaml* ./

# Install deps
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy source
COPY . .

# Build NestJS
RUN pnpm run build

# Stage 2: Runtime
FROM node:18-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy deps do builder
COPY package*.json ./
COPY pnpm-lock.yaml* ./

# Install only prod deps
RUN pnpm install --frozen-lockfile --prod

# Copy built app
COPY --from=builder /app/dist ./dist

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3002/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

EXPOSE 3002

CMD ["pnpm", "run", "start:prod"]
```

### 2. Frontend (Next.js) - `apps/website/Dockerfile`

```dockerfile
# Stage 1: Dependencies
FROM node:18-alpine AS deps

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml* ./

RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Stage 2: Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml* ./

RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

# Stage 3: Runtime
FROM node:18-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY package*.json ./

EXPOSE 3000

CMD ["pnpm", "start"]
```

### 3. CMS Admin (Next.js) - `apps/admin/Dockerfile`

Idêntico ao frontend (apps/website/Dockerfile), só muda a porta de expose se precisar:

```dockerfile
# ... mesmo que website, mas:
EXPOSE 3001
```

### 4. .dockerignore (raiz do projeto)

```
node_modules
npm-debug.log
.git
.gitignore
.env
.env.local
.DS_Store
.next
.vscode
coverage
dist
```

---

## 📦 Package.json Base

### Backend (NestJS) - `apps/api/package.json`

```json
{
  "name": "lipid-api",
  "version": "0.0.1",
  "description": "LIPID Backend API",
  "author": "",
  "private": true,
  "license": "UNLICENSED",
  "scripts": {
    "prebuild": "rimraf dist",
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/jwt": "^11.0.0",
    "@nestjs/passport": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "@prisma/client": "^5.0.0",
    "passport": "^0.6.0",
    "passport-jwt": "^4.0.1",
    "reflect-metadata": "^0.1.13",
    "rimraf": "^5.0.1",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.0.1",
    "@nestjs/schematics": "^10.0.0",
    "@nestjs/testing": "^10.0.1",
    "@types/express": "^4.17.17",
    "@types/jest": "^29.5.2",
    "@types/node": "^20.3.1",
    "@types/passport-jwt": "^3.0.8",
    "@types/supertest": "^2.0.12",
    "@typescript-eslint/eslint-plugin": "^5.59.11",
    "@typescript-eslint/parser": "^5.59.11",
    "eslint": "^8.42.0",
    "jest": "^29.5.0",
    "prettier": "^2.8.8",
    "prisma": "^5.0.0",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.0",
    "ts-loader": "^9.4.3",
    "ts-node": "^10.9.1",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.1.3"
  }
}
```

### Frontend (Next.js) - `apps/website/package.json`

```json
{
  "name": "lipid-website",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write ."
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/node": "^20.3.1",
    "@types/react": "^18.2.14",
    "@types/react-dom": "^18.2.6",
    "autoprefixer": "^10.4.14",
    "eslint": "^8.42.0",
    "eslint-config-next": "^14.0.0",
    "postcss": "^8.4.24",
    "prettier": "^2.8.8",
    "tailwindcss": "^3.3.2",
    "typescript": "^5.1.3"
  }
}
```

### CMS Admin (Next.js) - `apps/admin/package.json`

Idêntico ao website.

---

## 🚀 Primeiras Rotas/Componentes

### Backend - `apps/api/src/app.controller.ts`

```typescript
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/health')
  health() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }

  @Get('/api/v1/ping')
  ping() {
    return { message: 'pong', version: '1.0.0' };
  }
}
```

### Backend - `apps/api/src/main.ts`

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://daksa.app.br',
      'https://cms.daksa.app.br',
    ],
  });

  const port = process.env.API_PORT || 3002;
  await app.listen(port);
  console.log(`🚀 API running on http://localhost:${port}`);
}

bootstrap();
```

### Frontend - `apps/website/src/app/page.tsx`

```typescript
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold">LIPID - Daksa</h1>
        <p className="text-lg text-gray-600">Plataforma institucional</p>
      </div>

      <div className="relative flex place-items-center">
        <div className="text-center">
          <p>Status: ✅ Desenvolvendo</p>
        </div>
      </div>
    </main>
  );
}
```

---

## 🐋 Docker Compose Local

### `docker-compose.yml` (raiz)

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: lipid_postgres_dev
    environment:
      POSTGRES_DB: lipid_development
      POSTGRES_PASSWORD: dev
      POSTGRES_USER: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - lipid_network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  api:
    build:
      context: .
      dockerfile: apps/api/Dockerfile
    container_name: lipid_api_dev
    environment:
      DATABASE_URL: postgresql://postgres:dev@postgres:5432/lipid_development
      NODE_ENV: development
      API_PORT: 3002
      JWT_SECRET: dev-secret-change-this
    ports:
      - "3002:3002"
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - lipid_network
    volumes:
      - ./apps/api/src:/app/src  # Hot reload
    command: pnpm run start:dev

  website:
    build:
      context: .
      dockerfile: apps/website/Dockerfile
    container_name: lipid_website_dev
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:3002
    ports:
      - "3000:3000"
    depends_on:
      - api
    networks:
      - lipid_network
    volumes:
      - ./apps/website/src:/app/src
    command: pnpm run dev

  admin:
    build:
      context: .
      dockerfile: apps/admin/Dockerfile
    container_name: lipid_admin_dev
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:3002
    ports:
      - "3001:3001"
    depends_on:
      - api
    networks:
      - lipid_network
    volumes:
      - ./apps/admin/src:/app/src
    command: pnpm run dev

volumes:
  postgres_data:

networks:
  lipid_network:
    driver: bridge
```

---

## 🌐 Deploy no Coolify

### Passo 1: Criar Aplicação Backend (API)

1. **Coolify UI** → Projects → Create New
2. **Application** → Docker → Build from source (Git)

```
Name: lipid-api
Repository: https://github.com/[seu-usuario]/lipid-platform.git
Branch: main
Dockerfile: apps/api/Dockerfile
Publish Port: 3002
```

3. **Environment Variables:**

```
DATABASE_URL=postgresql://postgres:[SENHA]@postgres:5432/lipid_production
NODE_ENV=development
JWT_SECRET=[GERAR ALGO ALEATÓRIO]
API_PORT=3002
```

4. **Domains:** api.daksa.app.br

5. Clique **Create & Deploy**

### Passo 2: Criar Aplicação Website

Repetir processo:

```
Name: lipid-website
Dockerfile: apps/website/Dockerfile
Publish Port: 3000
Environment:
  NEXT_PUBLIC_API_URL=https://api.daksa.app.br
Domains: daksa.app.br
```

### Passo 3: Criar Aplicação CMS Admin

Repetir processo:

```
Name: lipid-admin
Dockerfile: apps/admin/Dockerfile
Publish Port: 3001
Environment:
  NEXT_PUBLIC_API_URL=https://api.daksa.app.br
Domains: cms.daksa.app.br
```

### Passo 4: Verificar Deploy

Para cada aplicação:

```
Coolify → Application → Logs

Procurar por:
✓ Build successful
✓ Container running
✓ Health check OK
```

### Verificação de URLs

```bash
# Terminal local
curl https://daksa.app.br/             # Website
curl https://api.daksa.app.br/health   # API health
curl https://cms.daksa.app.br/         # CMS
```

Todas devem retornar 200 OK.

---

## 🔄 Workflow de Desenvolvimento

### Setup Inicial (primeira vez)

```bash
# 1. Clone
git clone https://github.com/[seu-usuario]/lipid-platform.git
cd lipid-platform

# 2. Install deps
pnpm install
# ou npm install (se preferir)

# 3. Setup env local
cp .env.example .env.local
# Editar .env.local com valores locais

# 4. Start banco
docker-compose up -d postgres

# 5. Aguardar postgres ficar ready
docker-compose logs postgres
# Até ver "database system is ready to accept connections"

# 6. Rodar migrations Prisma
# (Se estiver usando Prisma; ajustar conforme schema)
cd apps/api
pnpm prisma migrate dev --name init
cd ../..

# 7. Start apps
pnpm run dev
# Abre 3 terminals, um em cada app, ou usa
# docker-compose up
```

### Desenvolvimento Diário

```bash
# Terminal 1: Deixar postgres rodando
docker-compose up postgres

# Terminal 2: Backend (Auto-reload)
cd apps/api
pnpm run start:dev

# Terminal 3: Frontend
cd apps/website
pnpm run dev

# Terminal 4: Admin (opcional)
cd apps/admin
pnpm run dev
```

### Depois de Fazer Mudanças

```bash
# Local: testa, vê funcionar

# Commit
git add .
git commit -m "feat: adicionar endpoint users"
git push origin main

# Coolify detecta push, refaz build automaticamente
# Aguardar 2-5 min, logs aparecem no Coolify UI

# Testar em staging:
curl https://api.daksa.app.br/users
```

### Estrutura de Commits

```bash
# Features novas
git commit -m "feat: adicionar listagem de produtos"

# Bug fixes
git commit -m "fix: corrigir validação de email"

# Refactor
git commit -m "refactor: reorganizar estrutura de pastas"

# Docs
git commit -m "docs: adicionar guia de instalação"

# Chores
git commit -m "chore: atualizar dependências"
```

---

## 📊 Prisma Schema Inicial

### `apps/api/prisma/schema.prisma`

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String     @id @default(cuid())
  email     String     @unique
  name      String?
  role      String     @default("user")
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt

  @@map("users")
}

model Application {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  description String?
  category    String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("applications")
}

model Technology {
  id          String   @id @default(cuid())
  name        String   @unique
  slug        String   @unique
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("technologies")
}
```

### Rodar migrations

```bash
cd apps/api

# Criar migration inicial
pnpm prisma migrate dev --name init

# Depois que tiver mudanças no schema
pnpm prisma migrate dev --name add_new_fields

# Gerar Prisma client
pnpm prisma generate
```

---

## 🔍 Troubleshooting

### Problema: Coolify não consegue fazer build

**Solução:**

```bash
# 1. Verificar se Dockerfile está no lugar certo
ls apps/api/Dockerfile
ls apps/website/Dockerfile

# 2. Verificar sintaxe Dockerfile
docker build -f apps/api/Dockerfile .

# 3. Verificar logs no Coolify UI
Coolify → Application → Logs
```

### Problema: API não conecta no banco

**Erro comum:** `connect ECONNREFUSED postgres:5432`

**Solução:**

```bash
# 1. PostgreSQL está rodando?
docker-compose ps postgres
# Status deve ser "Up"

# 2. DATABASE_URL está correto?
# Deve ser: postgresql://postgres:password@postgres:5432/[db_name]

# 3. Database existe?
docker-compose exec postgres psql -U postgres -l
# Procure "lipid_production" na lista
```

### Problema: Website não consegue chamar API

**Erro no console:** `CORS error` ou `Failed to fetch from api`

**Solução:**

1. **Verificar NEXT_PUBLIC_API_URL:**

```bash
# Em .env.local (local):
NEXT_PUBLIC_API_URL=http://localhost:3002

# Em Coolify (staging):
NEXT_PUBLIC_API_URL=https://api.daksa.app.br
```

2. **Verificar CORS no Backend:**

```typescript
// apps/api/src/main.ts
app.enableCors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://daksa.app.br',
    'https://cms.daksa.app.br',
  ],
});
```

### Problema: SSL Certificate não gerou

**Esperado:** Let's Encrypt leva alguns minutos

**Solução:**

```bash
# 1. Aguardar 5 min e recarregar Coolify
# 2. Verificar se domínio aponta para VPS
nslookup daksa.app.br
# Deve retornar [IP_VPS]

# 3. Se persistir, checar logs do Coolify
# Coolify → Services → Nginx → Logs
```

### Problema: Porta já está em uso (local)

**Erro:** `Error: listen EADDRINUSE :::3002`

**Solução:**

```bash
# Encontrar processo
lsof -i :3002
# Matar processo
kill -9 [PID]

# Ou mudar porta em docker-compose.yml
ports:
  - "3003:3002"  # Muda 3002 pra 3003
```

### Problema: Permissão negada ao Git push

**Solução:**

```bash
# Gerar SSH key
ssh-keygen -t rsa -b 4096 -C "seu-email@example.com"

# Copiar chave pública
cat ~/.ssh/id_rsa.pub

# Ir em GitHub → Settings → SSH Keys → Add
# Colar conteúdo

# Testar
ssh -T git@github.com
# Deve retornar "Hi [username]!"
```

---

## 📋 Checklist Pré-Launch

- [ ] VPS + Coolify rodando
- [ ] PostgreSQL criado, database `lipid_production` existe
- [ ] DNS apontando (A records para daksa.app.br, api.daksa.app.br, cms.daksa.app.br)
- [ ] Repo GitHub criado e estrutura base commitada
- [ ] 3 apps criadas no Coolify (api, website, admin)
- [ ] Build bem-sucedido em todas apps
- [ ] HTTPS/SSL certificados (Let's Encrypt)
- [ ] Health checks respondendo:
  - [ ] `curl https://api.daksa.app.br/health`
  - [ ] `curl https://daksa.app.br/`
  - [ ] `curl https://cms.daksa.app.br/`
- [ ] Variáveis de ambiente setadas corretamente
- [ ] CORS funcionando (website chama API)
- [ ] Git webhook automático (push = deploy)

---

## 🎓 Próximos Passos

Após ter tudo rodando:

1. **Começar desenvolvimento de features**
   - Criar branches (feature/*, fix/*)
   - Fazer commits
   - Push automático dispara deploy

2. **Adicionar Prisma schema completo**
   - Modelar todas tabelas
   - Rodar migrations
   - Gerar seed data

3. **Criar endpoints API base**
   - CRUD: Users, Applications, Technologies
   - Authentication (JWT)
   - Validação

4. **Build páginas frontend**
   - Homepage
   - Listagem aplicações
   - Listagem tecnologias
   - Página individual produto

5. **CMS Admin**
   - CRUD interfaces
   - Dashboard
   - Gerenciamento conteúdo

---

## 📚 Referências Úteis

- **NestJS Docs:** https://docs.nestjs.com
- **Next.js Docs:** https://nextjs.org/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **Coolify Docs:** https://coolify.io/docs
- **PostgreSQL Docs:** https://www.postgresql.org/docs

---

## 📞 Suporte

Se algo não funcionar:

1. **Verificar Logs:**
   - Coolify UI → Application → Logs
   - Terminal local: `docker-compose logs [service-name]`

2. **Consultar Troubleshooting acima**

3. **Abrir issue no GitHub:** [seu-repo]/issues

---

**Última atualização:** Julho 2026  
**Versão:** 1.0
