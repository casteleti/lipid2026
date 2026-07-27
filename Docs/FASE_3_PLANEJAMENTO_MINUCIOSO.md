# 🚀 FASE 3: PLANEJAMENTO DETALHADO E MINUCIOSO
## Otimização + Automações (Semana 5-6)

**Objetivo:** Integrar ferramentas externas, automações completas, performance máxima  
**Duração:** 2 semanas (14-16 horas)  
**Equipe:** 1-2 devs  
**Pré-requisito:** Fase 2 100% completa e funcionando  

---

## 📋 ÍNDICE

1. [Visão Geral da Fase 3](#visão-geral-da-fase-3)
2. [Dependências e Sequência](#dependências-e-sequência)
3. [Breakdown Detalhado](#breakdown-detalhado)
4. [Timeline Dia-a-Dia](#timeline-dia-a-dia)
5. [Implementação por Componente](#implementação-por-componente)
6. [Testes](#testes)
7. [Troubleshooting](#troubleshooting)

---

# 📊 VISÃO GERAL DA FASE 3

## O que Entra

```
BACKEND:
├─ n8n self-hosted (automação central)
├─ RD Station integration (CRM sync)
├─ SendGrid/SMTP (email automático)
├─ Redis cache (performance)
├─ Elasticsearch (search avançado)
├─ Sentry (error tracking)
├─ OpenTelemetry (observability)
├─ Security hardening
└─ Load testing preparation

CMS:
├─ Image tools avançadas
├─ Rich text melhorado
├─ Content workflows (draft/publish)
├─ Analytics dashboard
├─ SEO tools integradas
└─ Backup/recovery

WEBSITE:
├─ Performance otimizada (Lighthouse > 90)
├─ SEO avançado completo
├─ Acessibilidade WCAG 2.1 AA
├─ Analytics (GA4, heatmaps)
└─ Security hardening
```

## O que NÃO Entra

```
❌ Nova feature (Fase 2 foi a última)
❌ Mudança de arquitetura
❌ Rewrite de código
❌ Design novo
❌ Novos modelos de dados
```

## Dependencies (O que precisa estar pronto)

```
✅ FASE 1: Backend base + autenticação
✅ FASE 2: 6 CRUDs + relacionamentos + image upload
✅ Prisma migrations todas rodadas
✅ Website consumindo dados reais
✅ CMS funcionando 100%
✅ Banco de dados com dados de teste
✅ DNS/domínios configurados
✅ Coolify rodando e deployando
```

---

# 🔗 DEPENDÊNCIAS E SEQUÊNCIA

## Ordem Correta de Implementação

```
SEMANA 1 (Dia 1-5):
├─ n8n setup
├─ RD Station API integration
├─ Email templates (SendGrid/SMTP)
├─ Redis setup
└─ Primeira automação completa

SEMANA 2 (Dia 6-10):
├─ Elasticsearch setup
├─ Search implementation
├─ Sentry integration
├─ OpenTelemetry setup
├─ Performance optimization
├─ Security audit
└─ Load testing
```

### Por Quê Esta Ordem?

1. **n8n primeiro:** Todas automações dependem dele
2. **RD Station antes de email:** Eles trabalham juntos
3. **Cache antes de search:** Cache melhora performance
4. **Sentry depois:** Monitora tudo que vem antes
5. **Performance no final:** Proveita de todas otimizações

---

# 🔨 BREAKDOWN DETALHADO

## Componente 1: n8n Self-Hosted

### O que é n8n?
Workflow automation platform. Conecta sistemas sem código.

### Arquitetura

```
[Webhook from site]
         ↓
    [n8n Workflow]
         ↓
    ┌────┴────┬────────┐
    ↓         ↓        ↓
[RD Station][Email][DB Update]
```

### Instalação (Dia 1-2, 4h)

**Passo 1: Docker setup**

```bash
# SSH na VPS
ssh root@[IP_VPS]

# Criar diretório n8n
mkdir -p /data/n8n
cd /data/n8n

# Criar docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  n8n:
    image: n8nio/n8n:latest
    container_name: n8n
    ports:
      - "5678:5678"
    environment:
      - DB_TYPE=postgresql
      - DB_POSTGRESDB_HOST=postgres
      - DB_POSTGRESDB_PORT=5432
      - DB_POSTGRESDB_DATABASE=n8n
      - DB_POSTGRESDB_USER=n8n_user
      - DB_POSTGRESDB_PASSWORD=n8n_secure_password_here
      - N8N_HOST=n8n.daksa.app.br
      - N8N_PROTOCOL=https
      - N8N_PORT=443
      - WEBHOOK_URL=https://n8n.daksa.app.br/
      - NODE_ENV=production
      - EXECUTIONS_DATA_PRUNE=true
      - EXECUTIONS_DATA_MAX_AGE=336h
    volumes:
      - n8n_storage:/home/node/.n8n
    networks:
      - n8n_network
    depends_on:
      - postgres
    restart: always
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5678/healthz"]
      interval: 30s
      timeout: 10s
      retries: 3

  postgres:
    image: postgres:15-alpine
    container_name: n8n_postgres
    environment:
      - POSTGRES_DB=n8n
      - POSTGRES_USER=n8n_user
      - POSTGRES_PASSWORD=n8n_secure_password_here
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - n8n_network
    restart: always

volumes:
  n8n_storage:
  postgres_data:

networks:
  n8n_network:
    driver: bridge
EOF

# Iniciar
docker-compose up -d

# Verificar status
docker-compose logs -f n8n
```

**Passo 2: Acessar n8n**

```
https://n8n.daksa.app.br

Admin setup inicial:
- Email: admin@daksa.app.br
- Senha: [criar segura]
- Ativar 2FA se possível
```

**Passo 3: Configurar integração API Daksa**

```bash
# No painel n8n:
1. Credentials → New
2. Type: "HTTP Request"
3. Name: "Daksa API"
4. URL: https://api.daksa.app.br
5. Headers:
   - Authorization: Bearer [JWT_TOKEN_ADMIN]
   - Content-Type: application/json
6. Save
```

**Tempo: 2-3 horas**

### Workflows n8n (Dia 3-5, 6h)

**Workflow 1: Novo Lead → RD Station + Email**

```json
{
  "name": "Lead → RD Station + Email",
  "nodes": [
    {
      "name": "Webhook (Trigger)",
      "type": "webhook",
      "webhookUrl": "https://n8n.daksa.app.br/webhook/new-lead",
      "method": "POST",
      "headers": {
        "Authorization": "Bearer webhook_secret_token"
      }
    },
    {
      "name": "Validar dados",
      "type": "if",
      "conditions": [
        { "key": "email", "condition": "contains @" },
        { "key": "email", "condition": "isLongerThan", "value": "5" }
      ]
    },
    {
      "name": "Adicionar em RD Station",
      "type": "httpRequest",
      "method": "POST",
      "url": "https://api.rdstation.com/platform/contacts",
      "headers": {
        "Authorization": "Bearer [RD_STATION_TOKEN]",
        "Content-Type": "application/json"
      },
      "body": {
        "email": "{{ $node.Webhook.json.email }}",
        "name": "{{ $node.Webhook.json.name }}",
        "tags": ["lead_website", "fase3"],
        "fields": {
          "company": "{{ $node.Webhook.json.company }}",
          "phone": "{{ $node.Webhook.json.phone }}"
        }
      }
    },
    {
      "name": "Enviar email confirmação",
      "type": "sendEmail",
      "service": "sendgrid",
      "to": "{{ $node.Webhook.json.email }}",
      "from": "noreply@daksa.app.br",
      "subject": "Obrigado por seu interesse, {{ $node.Webhook.json.name }}!",
      "templateId": "d-confirmation_template",
      "variables": {
        "name": "{{ $node.Webhook.json.name }}"
      }
    },
    {
      "name": "Notificar admin",
      "type": "sendEmail",
      "service": "sendgrid",
      "to": "admin@daksa.app.br",
      "subject": "Novo lead: {{ $node.Webhook.json.name }}",
      "text": "Email: {{ $node.Webhook.json.email }}\nEmpresa: {{ $node.Webhook.json.company }}"
    },
    {
      "name": "Log para DB",
      "type": "httpRequest",
      "method": "POST",
      "url": "https://api.daksa.app.br/api/v1/leads",
      "body": {
        "email": "{{ $node.Webhook.json.email }}",
        "name": "{{ $node.Webhook.json.name }}",
        "company": "{{ $node.Webhook.json.company }}",
        "phone": "{{ $node.Webhook.json.phone }}",
        "message": "{{ $node.Webhook.json.message }}",
        "source": "website_form"
      }
    }
  ]
}
```

**Workflow 2: Novo Artigo Publicado → RD Station Newsletter**

```
Trigger: POST /api/v1/content (webhook do CMS)
  ↓
Validar se status = PUBLISHED
  ↓
Criar email com conteúdo
  ↓
Enviar via RD Station (newsletter automática)
  ↓
Log em analytics
```

**Workflow 3: Lead Score Automático**

```
Trigger: Daily schedule (9AM)
  ↓
Buscar leads do RD Station
  ↓
Calcular score (abriu email? Visitou site? etc)
  ↓
Atualizar tag em RD Station
  ↓
Notificar team se score > 70
```

**Tempo: 6 horas**

---

## Componente 2: RD Station Integration

### Setup (Dia 2, 3h)

**Passo 1: Obter credenciais**

```
1. Ir em: https://app.rdstation.com
2. Integrations → OAuth
3. Criar nova integração
4. Redirect URI: https://n8n.daksa.app.br/rest/oauth2/callback
5. Copiar: Client ID, Client Secret
```

**Passo 2: Configurar no Backend**

**Arquivo:** `apps/api/.env.local`

```env
RD_STATION_CLIENT_ID=xxxxx
RD_STATION_CLIENT_SECRET=yyyyy
RD_STATION_WEBHOOK_SECRET=zzzzz
```

**Passo 3: Criar RD Station Service**

**Arquivo:** `apps/api/src/modules/integrations/rd-station/rd-station.service.ts`

```typescript
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class RdStationService {
  private accessToken: string | null = null;
  private tokenExpiry: Date | null = null;

  constructor(private db: DatabaseService) {}

  // Obter token OAuth
  async getAccessToken(): Promise<string> {
    if (this.accessToken && this.tokenExpiry && this.tokenExpiry > new Date()) {
      return this.accessToken;
    }

    const response = await axios.post(
      'https://api.rdstation.com/auth/token',
      {
        client_id: process.env.RD_STATION_CLIENT_ID,
        client_secret: process.env.RD_STATION_CLIENT_SECRET,
        grant_type: 'client_credentials',
      },
    );

    this.accessToken = response.data.access_token;
    this.tokenExpiry = new Date(Date.now() + response.data.expires_in * 1000);

    return this.accessToken;
  }

  // Criar/atualizar contato
  async syncContact(email: string, data: {
    name?: string;
    company?: string;
    phone?: string;
    tags?: string[];
  }) {
    const token = await this.getAccessToken();

    try {
      const response = await axios.post(
        'https://api.rdstation.com/platform/contacts',
        {
          email,
          name: data.name,
          tags: data.tags || [],
          fields: {
            company: data.company,
            phone: data.phone,
          },
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error('RD Station sync error:', error);
      throw error;
    }
  }

  // Obter contato
  async getContact(email: string) {
    const token = await this.getAccessToken();

    try {
      const response = await axios.get(
        `https://api.rdstation.com/platform/contacts?email=${email}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error('RD Station get error:', error);
      return null;
    }
  }

  // Webhook validação
  validateWebhookSignature(
    body: string,
    signature: string,
  ): boolean {
    const crypto = require('crypto');
    const hmac = crypto
      .createHmac('sha256', process.env.RD_STATION_WEBHOOK_SECRET)
      .update(body)
      .digest('hex');

    return hmac === signature;
  }
}
```

**Passo 4: Criar Webhook Controller**

**Arquivo:** `apps/api/src/modules/integrations/rd-station/rd-station.controller.ts`

```typescript
import { Controller, Post, Body, Headers, BadRequestException } from '@nestjs/common';
import { RdStationService } from './rd-station.service';
import { DatabaseService } from '../../database/database.service';

@Controller('integrations/rd-station')
export class RdStationController {
  constructor(
    private rdStation: RdStationService,
    private db: DatabaseService,
  ) {}

  // Webhook de eventos do RD Station
  @Post('webhook')
  async handleWebhook(
    @Body() body: any,
    @Headers('x-rdstation-signature') signature: string,
  ) {
    // Validar assinatura
    const isValid = this.rdStation.validateWebhookSignature(
      JSON.stringify(body),
      signature,
    );

    if (!isValid) {
      throw new BadRequestException('Invalid signature');
    }

    // Processar eventos
    if (body.event === 'contact.created') {
      console.log('Novo contato criado no RD Station:', body.data.email);
    }

    if (body.event === 'contact.updated') {
      console.log('Contato atualizado no RD Station:', body.data.email);
    }

    return { success: true };
  }

  // Sincronizar lead para RD Station
  @Post('sync-lead')
  async syncLead(@Body() data: any) {
    await this.rdStation.syncContact(data.email, {
      name: data.name,
      company: data.company,
      phone: data.phone,
      tags: ['website_lead', 'fase3'],
    });

    return { success: true };
  }
}
```

**Tempo: 3 horas**

---

## Componente 3: Email Automático (SendGrid/SMTP)

### Setup (Dia 2, 2h)

**Passo 1: Configurar SendGrid**

```bash
# Ir em: https://sendgrid.com
# Criar account / fazer login
# Settings → API Keys → Create API Key
# Copy: SG.xxxxxx_yyyyyyyy

# Ou usar SMTP local (Postal/Postfix)
```

**Arquivo:** `apps/api/.env.local`

```env
# SendGrid
SENDGRID_API_KEY=SG.xxxxx
SENDGRID_FROM_EMAIL=noreply@daksa.app.br
SENDGRID_FROM_NAME=Daksa

# Ou SMTP (alternativa)
SMTP_HOST=smtp.seuservidor.com
SMTP_PORT=587
SMTP_USER=seu_usuario
SMTP_PASS=sua_senha
SMTP_FROM=noreply@daksa.app.br
```

**Passo 2: Criar Email Service**

**Arquivo:** `apps/api/src/modules/email/email.service.ts`

```typescript
import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

interface EmailOptions {
  to: string;
  subject: string;
  templateId?: string;
  variables?: Record<string, any>;
  html?: string;
  text?: string;
}

@Injectable()
export class EmailService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendEmail(options: EmailOptions) {
    const msg = {
      to: options.to,
      from: `${process.env.SENDGRID_FROM_NAME} <${process.env.SENDGRID_FROM_EMAIL}>`,
      subject: options.subject,
      templateId: options.templateId,
      dynamicTemplateData: options.variables,
      html: options.html,
      text: options.text,
    };

    try {
      await sgMail.send(msg);
      console.log(`✅ Email enviado para ${options.to}`);
      return { success: true };
    } catch (error) {
      console.error('❌ Erro ao enviar email:', error);
      throw error;
    }
  }

  async sendLeadConfirmation(email: string, name: string) {
    return this.sendEmail({
      to: email,
      subject: `Obrigado, ${name}! 🙏`,
      templateId: 'd-lead_confirmation', // Template ID do SendGrid
      variables: {
        name,
        confirmationLink: `https://daksa.app.br/confirm?email=${email}`,
      },
    });
  }

  async sendNewsletter(email: string, content: {
    title: string;
    excerpt: string;
    link: string;
  }) {
    return this.sendEmail({
      to: email,
      subject: `📰 Novo conteúdo: ${content.title}`,
      templateId: 'd-newsletter',
      variables: {
        title: content.title,
        excerpt: content.excerpt,
        link: content.link,
      },
    });
  }

  async sendAdminNotification(subject: string, html: string) {
    return this.sendEmail({
      to: 'admin@daksa.app.br',
      subject,
      html,
    });
  }
}
```

**Passo 3: Módulo Email**

**Arquivo:** `apps/api/src/modules/email/email.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';

@Module({
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
```

**Tempo: 2 horas**

---

## Componente 4: Redis Cache

### Setup (Dia 3, 3h)

**Passo 1: Instalar Redis na VPS**

```bash
# SSH
ssh root@[IP_VPS]

# Criar redis no Coolify (ou docker)
docker run -d \
  --name redis \
  -p 6379:6379 \
  -v redis_data:/data \
  redis:7-alpine redis-server --appendonly yes

# Verificar
redis-cli ping
# Esperado: PONG
```

**Passo 2: Configurar no Backend**

**Arquivo:** `apps/api/.env.local`

```env
REDIS_URL=redis://localhost:6379
CACHE_TTL=3600  # 1 hora
```

**Passo 3: Criar Cache Service**

**Arquivo:** `apps/api/src/modules/cache/cache.service.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class CacheService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis(process.env.REDIS_URL);
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.redis.get(key);
    if (!value) return null;

    try {
      return JSON.parse(value);
    } catch {
      return value as any;
    }
  }

  async set<T>(key: string, value: T, ttl: number = 3600): Promise<void> {
    const serialized = typeof value === 'string' ? value : JSON.stringify(value);
    await this.redis.setex(key, ttl, serialized);
  }

  async delete(key: string): Promise<void> {
    await this.redis.del(key);
  }

  async deletePattern(pattern: string): Promise<void> {
    const keys = await this.redis.keys(pattern);
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
  }

  // Casos de uso específicos
  async getApplications(skip: number, take: number) {
    const key = `apps:list:${skip}:${take}`;
    return this.get(key);
  }

  async setApplications(skip: number, take: number, data: any) {
    const key = `apps:list:${skip}:${take}`;
    await this.set(key, data, 3600); // 1 hora
  }

  async invalidateApplications() {
    await this.deletePattern('apps:*');
  }
}
```

**Passo 4: Integrar no Service**

**Arquivo:** `apps/api/src/modules/applications/applications.service.ts`

```typescript
// Adicionar ao constructor
constructor(
  private db: DatabaseService,
  private cache: CacheService,
) {}

// Modificar findAll
async findAll(skip = 0, take = 10) {
  // Tentar get do cache
  const cached = await this.cache.getApplications(skip, take);
  if (cached) {
    console.log('📦 Cache HIT');
    return cached;
  }

  console.log('📦 Cache MISS');

  const [data, total] = await Promise.all([
    this.db.application.findMany({
      where: { active: true },
      skip,
      take,
      include: { technologies: { include: { technology: true } } },
      orderBy: { order: 'asc' },
    }),
    this.db.application.count({ where: { active: true } }),
  ]);

  const result = {
    data,
    total,
    page: Math.floor(skip / take) + 1,
    pageSize: take,
    totalPages: Math.ceil(total / take),
  };

  // Salvar no cache
  await this.cache.setApplications(skip, take, result);

  return result;
}

// Ao criar/atualizar/deletar, invalidar cache
async create(data: CreateApplicationDto) {
  const app = await this.db.application.create({ data });
  await this.cache.invalidateApplications();
  return app;
}
```

**Tempo: 3 horas**

---

## Componente 5: Search Avançado (Elasticsearch)

### Setup (Dia 4, 4h)

**Passo 1: Instalar Elasticsearch**

```bash
# Docker Compose (simples)
docker run -d \
  --name elasticsearch \
  -e discovery.type=single-node \
  -e "ES_JAVA_OPTS=-Xms512m -Xmx512m" \
  -p 9200:9200 \
  docker.elastic.co/elasticsearch/elasticsearch:8.0.0

# Verificar
curl http://localhost:9200
```

**Arquivo:** `apps/api/.env.local`

```env
ELASTICSEARCH_URL=http://localhost:9200
ELASTICSEARCH_INDEX=daksa_index
```

**Passo 2: Criar Elasticsearch Service**

**Arquivo:** `apps/api/src/modules/search/elasticsearch.service.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class ElasticsearchService {
  private client: Client;

  constructor() {
    this.client = new Client({
      node: process.env.ELASTICSEARCH_URL,
    });
  }

  // Indexar documento
  async indexApplication(id: string, data: {
    name: string;
    slug: string;
    description: string;
    excerpt?: string;
  }) {
    await this.client.index({
      index: 'applications',
      id,
      body: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        excerpt: data.excerpt,
        createdAt: new Date(),
      },
    });
  }

  // Buscar
  async search(query: string, size: number = 10) {
    const result = await this.client.search({
      index: 'applications',
      body: {
        query: {
          multi_match: {
            query,
            fields: ['name^3', 'description^2', 'excerpt'],
            fuzziness: 'AUTO',
          },
        },
        size,
      },
    });

    return result.hits.hits.map((hit: any) => ({
      id: hit._id,
      score: hit._score,
      ...hit._source,
    }));
  }

  // Deletar documento
  async deleteApplication(id: string) {
    await this.client.delete({
      index: 'applications',
      id,
    });
  }

  // Atualizar documento
  async updateApplication(id: string, data: any) {
    await this.client.update({
      index: 'applications',
      id,
      body: {
        doc: data,
        doc_as_upsert: true,
      },
    });
  }
}
```

**Passo 3: Criar Search Controller**

**Arquivo:** `apps/api/src/modules/search/search.controller.ts`

```typescript
import { Controller, Get, Query } from '@nestjs/common';
import { ElasticsearchService } from './elasticsearch.service';

@Controller('search')
export class SearchController {
  constructor(private elasticsearch: ElasticsearchService) {}

  @Get()
  async search(@Query('q') query: string, @Query('limit') limit = 10) {
    if (!query || query.length < 2) {
      return { results: [], total: 0 };
    }

    const results = await this.elasticsearch.search(query, limit);

    return {
      query,
      results,
      total: results.length,
    };
  }
}
```

**Passo 4: Integrar em Applications**

Ao criar/editar/deletar, sincronizar com Elasticsearch:

```typescript
async create(data: CreateApplicationDto) {
  const app = await this.db.application.create({ data });
  
  // Indexar no Elasticsearch
  await this.elasticsearch.indexApplication(app.id, {
    name: app.name,
    slug: app.slug,
    description: app.description,
    excerpt: app.excerpt,
  });
  
  return app;
}

async update(id: string, data: UpdateApplicationDto) {
  const app = await this.db.application.update({
    where: { id },
    data,
  });

  // Atualizar no Elasticsearch
  await this.elasticsearch.updateApplication(id, {
    name: app.name,
    description: app.description,
  });

  return app;
}

async remove(id: string) {
  await this.db.application.update({
    where: { id },
    data: { active: false },
  });

  // Deletar do Elasticsearch
  await this.elasticsearch.deleteApplication(id);
}
```

**Tempo: 4 horas**

---

## Componente 6: Monitoramento (Sentry + OpenTelemetry)

### Sentry Setup (Dia 5, 2h)

**Passo 1: Criar conta Sentry**

```
https://sentry.io
- Sign up
- Create project: NestJS
- Copy: DSN (Sentry Data Source Name)
```

**Arquivo:** `apps/api/.env.local`

```env
SENTRY_DSN=https://xxxxx@yyyyy.ingest.sentry.io/zzzzz
SENTRY_ENVIRONMENT=production
SENTRY_TRACES_SAMPLE_RATE=0.1  # 10%
```

**Passo 2: Integrar Sentry**

**Arquivo:** `apps/api/src/main.ts`

```typescript
import * as Sentry from '@sentry/nestjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

async function bootstrap() {
  // Inicializar Sentry
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.SENTRY_ENVIRONMENT,
    tracesSampleRate: parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE),
    integrations: [
      nodeProfilingIntegration(),
      new Sentry.Integrations.Http({ tracing: true }),
    ],
  });

  const app = await NestFactory.create(AppModule);

  // Middleware Sentry
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.errorHandler());

  // ... resto do setup

  // Middleware de erro no final
  app.use(Sentry.Handlers.errorHandler());
}
```

**Passo 3: Criar Error Filter**

**Arquivo:** `apps/api/src/common/filters/sentry.filter.ts`

```typescript
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import * as Sentry from '@sentry/nestjs';

@Catch()
export class SentryExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // Capturar exception em Sentry
    if (!(exception instanceof HttpException)) {
      Sentry.captureException(exception, {
        tags: {
          url: request.url,
          method: request.method,
        },
      });
    }

    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json(exception.getResponse());
    } else {
      response.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  }
}
```

**Tempo: 2 horas**

---

## Componente 7: Performance Optimization

### Website Performance (Dia 6-7, 4h)

**Passo 1: Lazy Loading de Imagens**

**Arquivo:** `apps/website/src/components/ImageWithFallback.tsx`

```typescript
import Image from 'next/image';
import { useState } from 'react';

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}

export function ImageWithFallback({
  src,
  alt,
  width,
  height,
  priority = false,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative overflow-hidden bg-gray-200">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        onLoadingComplete={() => setIsLoading(false)}
        className={`duration-700 ease-in-out ${
          isLoading ? 'scale-110 blur-lg' : 'scale-100 blur-0'
        }`}
      />
    </div>
  );
}
```

**Passo 2: Code Splitting**

**Arquivo:** `apps/website/next.config.js`

```javascript
module.exports = {
  swcMinify: true,
  compress: true,
  
  experimental: {
    esmExternals: true,
  },
  
  webpack: (config, { isServer }) => {
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          
          vendor: {
            filename: 'chunks/vendor.js',
            test: /node_modules/,
            priority: 10,
            reuseExistingChunk: true,
          },
          
          common: {
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
            filename: 'chunks/common.js',
          },
        },
      },
    };

    return config;
  },
  
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.daksa.app.br',
      },
    ],
  },
};
```

**Passo 3: SEO Avançado com next-seo**

**Arquivo:** `apps/website/src/pages/_app.tsx`

```typescript
import { DefaultSeo } from 'next-seo';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo
        titleTemplate="%s | Daksa - Inovação em Lipídios"
        description="Tecnologias avançadas em lipídios para cosméticos, farmacêutica e nutracêuticos"
        openGraph={{
          type: 'website',
          locale: 'pt_BR',
          url: 'https://daksa.app.br',
          siteName: 'Daksa',
          images: [
            {
              url: 'https://cdn.daksa.app.br/og-image.jpg',
              width: 1200,
              height: 630,
              alt: 'Daksa',
            },
          ],
        }}
        twitter={{
          handle: '@daksa',
          site: '@daksa',
          cardType: 'summary_large_image',
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
```

**Passo 4: Lighthouse Audit**

```bash
# Instalar
npm install -g lighthouse

# Rodar audit
lighthouse https://daksa.app.br --view

# Esperado: Tudo > 90
# Metas:
# Performance: > 90
# Accessibility: > 95
# Best Practices: > 90
# SEO: > 95
```

**Tempo: 4 horas**

---

# 🗓️ TIMELINE DIA-A-DIA

## SEMANA 1

### Dia 1 (Segunda) - n8n Setup
- ⏰ 2h: Instalar n8n (docker-compose)
- ⏰ 1h: Configurar integração com API Daksa
- ⏰ 1h: Criar primeira automação (webhook test)
- **Checkpoint:** n8n rodando em https://n8n.daksa.app.br

### Dia 2 (Terça) - RD Station + Email
- ⏰ 1.5h: Setup RD Station OAuth
- ⏰ 1h: Criar RdStationService
- ⏰ 1h: Configurar SendGrid/SMTP
- ⏰ 1h: Criar EmailService
- **Checkpoint:** Email sendo enviado com sucesso

### Dia 3 (Quarta) - Workflows n8n
- ⏰ 2h: Criar workflow: Lead → RD Station + Email
- ⏰ 2h: Criar workflow: Novo artigo → Newsletter
- ⏰ 1h: Teste e ajustes
- **Checkpoint:** 2 workflows automáticos funcionando

### Dia 4 (Quinta) - Redis + Cache
- ⏰ 1.5h: Setup Redis
- ⏰ 1.5h: Criar CacheService
- ⏰ 1h: Integrar cache em Applications
- ⏰ 1h: Testes de cache (hit/miss)
- **Checkpoint:** Cache reduzindo queries do banco 80%+

### Dia 5 (Sexta) - Elasticsearch
- ⏰ 1h: Setup Elasticsearch
- ⏰ 2h: Criar ElasticsearchService
- ⏰ 1h: Criar search endpoint
- ⏰ 1h: Teste search (queries complexas)
- **Checkpoint:** Search funcionando em < 100ms

## SEMANA 2

### Dia 6 (Segunda) - Sentry + Monitoring
- ⏰ 1h: Setup Sentry
- ⏰ 1h: Integrar Sentry no NestJS
- ⏰ 1h: Criar exception filter
- ⏰ 1h: Test errors (verificar em Sentry)
- **Checkpoint:** Errors sendo capturados em tempo real

### Dia 7 (Terça) - Performance Website
- ⏰ 1h: Lazy loading de imagens
- ⏰ 1h: Code splitting
- ⏰ 1h: SEO avançado (next-seo)
- ⏰ 1h: Lighthouse audit e fixes
- **Checkpoint:** Lighthouse scores todos > 90

### Dia 8 (Quarta) - CMS Avançado
- ⏰ 2h: Image tools (crop, resize)
- ⏰ 1h: Rich text melhorado
- ⏰ 1h: Content workflow (draft/publish)
- **Checkpoint:** CMS com features avançadas

### Dia 9 (Quinta) - Security + Testing
- ⏰ 1h: Security audit (Helmet, CORS refinado)
- ⏰ 2h: Load testing (artillery)
- ⏰ 1h: Testes de automações (n8n)
- **Checkpoint:** Sistema seguro e escalável

### Dia 10 (Sexta) - Finalização
- ⏰ 1h: Documentação Fase 3
- ⏰ 1h: Cleanup e otimizações finais
- ⏰ 1h: Deploy tudo no Coolify
- ⏰ 1h: Testes em produção
- **Checkpoint:** 🟢 FASE 3 COMPLETA

---

# 🧪 TESTES FASE 3

## Backend Tests

```bash
# Performance test
npm run test:performance

# Esperado:
# - Responses < 200ms (sem cache)
# - Responses < 50ms (com cache)
# - 1000 requests/segundo

# Integration tests
npm run test:integration

# Esperado:
# - n8n workflows rodam
# - RD Station sync funciona
# - Email enviado com sucesso
# - Cache invalidada corretamente
# - Search retorna resultados
# - Sentry captura errors
```

## Website Tests

```bash
# Lighthouse local
npm run lighthouse

# Esperado:
# Performance: 90+
# Accessibility: 95+
# Best Practices: 90+
# SEO: 95+

# Accessibility
npm run test:a11y

# Esperado: 0 violations
```

## Load Testing

```bash
# Instalar artillery
npm install -g artillery

# Test file
cat > load-test.yml << 'EOF'
config:
  target: 'https://api.daksa.app.br'
  phases:
    - duration: 60
      arrivalRate: 10  # 10 users/sec
      
scenarios:
  - name: 'API Usage'
    flow:
      - get:
          url: '/api/v1/applications'
      - get:
          url: '/api/v1/technologies'
      - post:
          url: '/api/v1/leads'
          json:
            email: "test@example.com"
            name: "Test"
EOF

# Rodar
artillery run load-test.yml

# Esperado:
# - P95 response time < 500ms
# - Error rate < 1%
# - Throughput > 500 req/sec
```

---

# 🚨 TROUBLESHOOTING

## Problema: n8n não conecta com RD Station

**Solução:**
```
1. Verificar se OAuth token é válido
2. Verificar se URL do webhook está correto
3. Verificar logs do n8n: docker logs n8n
4. Testar credenciais manualmente com curl
```

## Problema: Cache não está sendo invalidado

**Solução:**
```
1. Verificar se CacheService está sendo injetado
2. Verificar Redis connection: redis-cli ping
3. Verificar se keys estão sendo deletadas
4. Aumentar TTL se for muito curto
```

## Problema: Elasticsearch não encontra resultados

**Solução:**
```
1. Verificar se índice foi criado
2. Verificar se documentos foram indexados
3. Testar query no Kibana
4. Verificar análise de texto (tokenização)
```

## Problema: Email não está sendo enviado

**Solução:**
```
1. Verificar SENDGRID_API_KEY no .env
2. Verificar de onde email está sendo enviado
3. Verificar logs do SendGrid
4. Testar com curl:
   curl --request POST \
     --url https://api.sendgrid.com/v3/mail/send \
     --header "authorization: Bearer $SENDGRID_API_KEY" \
     --data ...
```

## Problema: Sentry não recebe errors

**Solução:**
```
1. Verificar DSN está correto
2. Verificar environment está setado
3. Verificar se exception filter está registrado
4. Testar com erro forçado em endpoint
```

---

# ✅ CHECKLIST FASE 3

```
SEMANA 1:
☐ n8n instalado e rodando
☐ RD Station integrado
☐ Email automático funcionando
☐ Redis cache setup
☐ Elasticsearch setup
☐ Primeira automação testada

SEMANA 2:
☐ Sentry capturando errors
☐ Website performance > 90 (Lighthouse)
☐ Search funcionando
☐ Load tests passando
☐ Security audit feito
☐ Tudo deployado no Coolify

FINAL:
☐ Documentação atualizada
☐ Todos os componentes testados
☐ Zero critical issues
☐ Pronto para Fase 4 (testes + lançamento)
```

---

# 📊 MÉTRICAS DE SUCESSO

| Métrica | Meta | Como Medir |
|---------|------|-----------|
| Response time (com cache) | < 50ms | `ab -c 100 https://api.daksa.app.br` |
| Cache hit rate | > 70% | Logs de cache |
| Search latency | < 100ms | Elasticsearch dashboard |
| Error rate | < 0.5% | Sentry dashboard |
| Lighthouse score | > 90 | `lighthouse` CLI |
| Email delivery | > 99% | SendGrid analytics |
| Automation success | > 95% | n8n logs |

---

**Pronto para começar Fase 3?**

Tem alguma dúvida sobre os componentes? Quer mais detalhes sobre alguma tecnologia?

Avise! 🚀
