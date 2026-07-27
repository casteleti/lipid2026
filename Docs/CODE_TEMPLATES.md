# 💻 Code Templates - Daksa Project

Templates prontos de código para copiar/colar nas estruturas base.

---

## 🏗️ Backend (NestJS)

### `apps/api/src/app.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### `apps/api/src/app.service.ts`

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello from Daksa API!';
  }

  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'lipid-api',
      version: '1.0.0',
    };
  }
}
```

### `apps/api/src/app.controller.ts`

```typescript
import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/health')
  @HttpCode(200)
  health() {
    return this.appService.getHealth();
  }

  @Get('/api/v1/ping')
  ping() {
    return { message: 'pong', timestamp: new Date().toISOString() };
  }
}
```

### `apps/api/src/main.ts`

```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS configuration
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://daksa.app.br',
      'https://cms.daksa.app.br',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  });

  // Prefix API
  app.setGlobalPrefix('api/v1');

  const port = process.env.API_PORT || 3002;
  await app.listen(port);

  console.log(`🚀 Daksa API running on http://localhost:${port}`);
  console.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
}

bootstrap().catch((err) => {
  console.error('❌ Failed to start app:', err);
  process.exit(1);
});
```

### `apps/api/src/database/database.service.ts`

```typescript
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
    console.log('✓ Database connected');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

### `apps/api/src/database/database.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
```

### `apps/api/prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ========== USERS ==========
model User {
  id        String     @id @default(cuid())
  email     String     @unique
  name      String?
  password  String?
  role      UserRole   @default(USER)
  active    Boolean    @default(true)
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt

  @@map("users")
}

enum UserRole {
  ADMIN
  EDITOR
  USER
}

// ========== APPLICATIONS (Aplicações por mercado) ==========
model Application {
  id          String   @id @default(cuid())
  name        String   @unique
  slug        String   @unique
  description String?
  icon        String?  // URL da imagem
  category    String?
  order       Int      @default(0)
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  technologies TechnologyOnApplication[]

  @@map("applications")
}

// ========== TECHNOLOGIES ==========
model Technology {
  id          String   @id @default(cuid())
  name        String   @unique
  slug        String   @unique
  description String?
  icon        String?
  order       Int      @default(0)
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  applications TechnologyOnApplication[]
  ingredients  IngredientOnTechnology[]

  @@map("technologies")
}

// ========== MANY-TO-MANY: Applications x Technologies ==========
model TechnologyOnApplication {
  application   Application @relation(fields: [applicationId], references: [id], onDelete: Cascade)
  applicationId String
  technology    Technology  @relation(fields: [technologyId], references: [id], onDelete: Cascade)
  technologyId  String

  @@id([applicationId, technologyId])
  @@map("technologies_on_applications")
}

// ========== INGREDIENTS ==========
model Ingredient {
  id          String   @id @default(cuid())
  name        String   @unique
  slug        String   @unique
  description String?
  INCI        String?  // Nome técnico
  supplier    String?
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  technologies IngredientOnTechnology[]

  @@map("ingredients")
}

// ========== MANY-TO-MANY: Technologies x Ingredients ==========
model IngredientOnTechnology {
  technology   Technology @relation(fields: [technologyId], references: [id], onDelete: Cascade)
  technologyId String
  ingredient   Ingredient @relation(fields: [ingredientId], references: [id], onDelete: Cascade)
  ingredientId String

  @@id([technologyId, ingredientId])
  @@map("ingredients_on_technologies")
}

// ========== CONTENT (Blog posts, articles, case studies) ==========
model Content {
  id          String   @id @default(cuid())
  title       String   @unique
  slug        String   @unique
  excerpt     String?
  content     String   // Markdown
  featured    String?  // URL da imagem
  status      ContentStatus @default(DRAFT)
  author      String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  publishedAt DateTime?

  @@map("content")
}

enum ContentStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

// ========== LEADS (Newsletter, contact forms) ==========
model Lead {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  phone     String?
  company   String?
  message   String?
  source    String   @default("website")
  active    Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("leads")
  @@index([email])
  @@index([createdAt])
}

// ========== SEO (Metadata por página) ==========
model SeoPage {
  id          String   @id @default(cuid())
  route       String   @unique
  title       String?
  description String?
  keywords    String?
  ogImage     String?
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("seo_pages")
}
```

### `apps/api/src/auth/auth.service.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateToken(payload: { id: string; email: string; role: string }) {
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: process.env.JWT_EXPIRY || '24h',
      }),
    };
  }

  async validateToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      return null;
    }
  }
}
```

---

## 🎨 Frontend (Next.js Website)

### `apps/website/src/app/layout.tsx`

```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Daksa - Inovação em Lipídios',
  description: 'Plataforma institucional especializada em tecnologias de lipídios para cosméticos e farmacêutica',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://daksa.app.br',
    siteName: 'Daksa',
    images: [
      {
        url: 'https://daksa.app.br/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <header className="sticky top-0 border-b bg-white">
          <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
            <div className="text-2xl font-bold">Daksa</div>
            <ul className="flex gap-8">
              <li><a href="/">Home</a></li>
              <li><a href="/aplicacoes">Aplicações</a></li>
              <li><a href="/tecnologias">Tecnologias</a></li>
              <li><a href="/sobre">Sobre</a></li>
              <li><a href="/contato">Contato</a></li>
            </ul>
          </nav>
        </header>

        <main>{children}</main>

        <footer className="border-t bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-12">
            <p className="text-center text-sm text-gray-600">
              © 2026 Daksa. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
```

### `apps/website/src/app/page.tsx`

```typescript
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="space-y-6 bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-20 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold leading-tight">
            Inovação em Lipídios
          </h1>
          <p className="mt-4 text-xl text-slate-300">
            Tecnologias avançadas para cosméticos, farmacêutica e nutracêuticos
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Link
              href="/aplicacoes"
              className="rounded-lg bg-blue-600 px-8 py-3 font-semibold hover:bg-blue-700"
            >
              Explorar Aplicações
            </Link>
            <Link
              href="/contato"
              className="rounded-lg border-2 border-white px-8 py-3 font-semibold hover:bg-white hover:text-slate-900"
            >
              Entre em contato
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl space-y-12 px-4 py-20">
        <h2 className="text-3xl font-bold text-center">Nossas Competências</h2>
        
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4 rounded-lg border p-6">
            <h3 className="text-xl font-semibold">Cosméticos</h3>
            <p className="text-gray-600">
              Soluções inovadoras para formulações cosméticas premium
            </p>
          </div>

          <div className="space-y-4 rounded-lg border p-6">
            <h3 className="text-xl font-semibold">Farmacêutica</h3>
            <p className="text-gray-600">
              Tecnologias de lipossomas para entrega controlada de ativos
            </p>
          </div>

          <div className="space-y-4 rounded-lg border p-6">
            <h3 className="text-xl font-semibold">Nutracêuticos</h3>
            <p className="text-gray-600">
              Encapsulação de nutrientes para máxima biodisponibilidade
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
```

### `apps/website/src/lib/api.ts`

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

async function apiCall<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
}

export const api = {
  // GET methods
  get: <T,>(endpoint: string) => apiCall<T>(endpoint),
  
  // POST methods
  post: <T,>(endpoint: string, data: unknown) =>
    apiCall<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  // PUT methods
  put: <T,>(endpoint: string, data: unknown) =>
    apiCall<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  
  // DELETE methods
  delete: <T,>(endpoint: string) =>
    apiCall<T>(endpoint, { method: 'DELETE' }),
};

// Usage examples
export async function getApplications() {
  return api.get('/applications');
}

export async function getTechnologies() {
  return api.get('/technologies');
}

export async function submitContact(data: {
  email: string;
  name: string;
  message: string;
}) {
  return api.post('/leads', data);
}
```

### `apps/website/next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  images: {
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

---

## 🔐 CMS Admin (Next.js)

### `apps/admin/src/app/layout.tsx`

```typescript
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Daksa CMS - Painel Administrativo',
  description: 'Gerenciamento de conteúdo LIPID',
  robots: 'noindex,nofollow', // Impedir indexação do admin
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-64 border-r bg-gray-900 text-white p-6">
            <h1 className="text-2xl font-bold mb-8">Daksa CMS</h1>
            <nav className="space-y-4">
              <a href="/admin" className="block hover:text-blue-400">Dashboard</a>
              <a href="/admin/aplicacoes" className="block hover:text-blue-400">Aplicações</a>
              <a href="/admin/tecnologias" className="block hover:text-blue-400">Tecnologias</a>
              <a href="/admin/ingredientes" className="block hover:text-blue-400">Ingredientes</a>
              <a href="/admin/conteudo" className="block hover:text-blue-400">Conteúdo</a>
              <a href="/admin/leads" className="block hover:text-blue-400">Leads</a>
              <a href="/admin/usuarios" className="block hover:text-blue-400">Usuários</a>
              <a href="/admin/config" className="block hover:text-blue-400">Configurações</a>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
```

### `apps/admin/src/app/page.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';

interface Stats {
  totalAplicacoes: number;
  totalTecnologias: number;
  totalLeads: number;
  totalUsuarios: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch stats from API
    fetch('/api/v1/admin/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading stats:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-12">Carregando...</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Aplicações', value: stats?.totalAplicacoes },
          { label: 'Tecnologias', value: stats?.totalTecnologias },
          { label: 'Leads', value: stats?.totalLeads },
          { label: 'Usuários', value: stats?.totalUsuarios },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg bg-white p-6 shadow">
            <p className="text-sm text-gray-600">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold">{stat.value ?? '-'}</p>
          </div>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Ações Rápidas</h2>
        <div className="space-y-2">
          <a href="/admin/aplicacoes/novo" className="block p-3 rounded border hover:bg-gray-50">
            + Nova Aplicação
          </a>
          <a href="/admin/tecnologias/nova" className="block p-3 rounded border hover:bg-gray-50">
            + Nova Tecnologia
          </a>
          <a href="/admin/conteudo/novo" className="block p-3 rounded border hover:bg-gray-50">
            + Novo Artigo
          </a>
        </div>
      </section>
    </div>
  );
}
```

---

## 🧪 Exemplo: Criar CRUD Completo

### Controller (NestJS)

```typescript
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto, UpdateApplicationDto } from './dto';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly service: ApplicationService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateApplicationDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateApplicationDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
```

### Service (NestJS)

```typescript
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { CreateApplicationDto, UpdateApplicationDto } from './dto';

@Injectable()
export class ApplicationService {
  constructor(private db: DatabaseService) {}

  findAll() {
    return this.db.application.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    });
  }

  findOne(id: string) {
    return this.db.application.findUnique({
      where: { id },
      include: {
        technologies: {
          include: { technology: true },
        },
      },
    });
  }

  create(data: CreateApplicationDto) {
    return this.db.application.create({
      data: {
        ...data,
        slug: data.name.toLowerCase().replace(/\s+/g, '-'),
      },
    });
  }

  update(id: string, data: UpdateApplicationDto) {
    return this.db.application.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.db.application.delete({
      where: { id },
    });
  }
}
```

### DTO

```typescript
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateApplicationDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  category?: string;
}

export class UpdateApplicationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
```

---

## 📝 TypeScript Types Compartilhados

### `packages/types/src/index.ts`

```typescript
// ============== USERS ==============
export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'ADMIN' | 'EDITOR' | 'USER';
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ============== APPLICATIONS ==============
export interface Application {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  category?: string;
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ============== TECHNOLOGIES ==============
export interface Technology {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ============== API RESPONSES ==============
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ============== FORMS ==============
export interface ContactFormData {
  email: string;
  name: string;
  company?: string;
  phone?: string;
  message: string;
}
```

---

**Dica:** Esses templates podem ser copiados diretamente nos arquivos do projeto. Ajuste conforme necessário!
