# 🚀 GUIA DETALHADO PARA CLAUDE CODE - DESENVOLVER FASE 1
## Daksa CMS - Backend + CMS Admin + Frontend MVP

**Este documento é um passo-a-passo completo. Siga exatamente como descrito.**

---

## 📋 ÍNDICE

1. [Preparação Inicial](#preparação-inicial)
2. [Backend (NestJS + Prisma)](#backend-nestjs--prisma)
3. [CMS Admin (Next.js)](#cms-admin-nextjs)
4. [Frontend Website (Next.js)](#frontend-website-nextjs)
5. [Testes](#testes)
6. [Deploy](#deploy)

---

# ⚙️ PREPARAÇÃO INICIAL

## Passo 1: Verificar Ambiente

```bash
# Verificar Node.js
node --version  # Deve ser v18+

# Verificar npm/pnpm
pnpm --version  # Usar pnpm (mais rápido)

# Verificar Docker + PostgreSQL
docker-compose --version
docker ps  # Verificar se containers estão rodando

# Verificar Coolify
# Acessar: https://[IP_VPS]:3000
# Fazer login no painel
```

## Passo 2: Clonar e Instalar

```bash
# Clone o repo (já deve existir)
cd lipid-platform

# Instalar todas as dependências
pnpm install

# Criar .env.local
cp .env.example .env.local

# Editar .env.local com valores locais
# DATABASE_URL=postgresql://postgres:dev@localhost:5432/lipid_development
# NEXT_PUBLIC_API_URL=http://localhost:3002
# NODE_ENV=development
```

## Passo 3: Preparar Banco

```bash
# Iniciar PostgreSQL
docker-compose up -d postgres

# Aguardar estar pronto (20-30 segundos)
# Verificar: docker-compose logs postgres

# Se não existir banco, criar
docker-compose exec postgres psql -U postgres -c "CREATE DATABASE lipid_development;"
```

---

# 🏗️ BACKEND (NestJS + Prisma)

## Fase 1.1: Estrutura Base do Projeto

### Passo 1: Criar arquivos estrutura NestJS

**Diretórios a criar:**
```bash
mkdir -p apps/api/src/modules/{auth,applications,technologies,ingredients,database}
mkdir -p apps/api/src/modules/auth/{guards,strategies}
mkdir -p apps/api/src/common/{decorators,exceptions,filters}
mkdir -p apps/api/prisma
```

### Passo 2: Criar package.json do API (se não existir)

**Arquivo:** `apps/api/package.json`

```json
{
  "name": "lipid-api",
  "version": "0.0.1",
  "description": "Daksa Backend API",
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
    "db:push": "prisma db push",
    "db:seed": "node -r tsconfig-paths/register prisma/seed.ts"
  },
  "dependencies": {
    "@nestjs/common": "^10.2.0",
    "@nestjs/core": "^10.2.0",
    "@nestjs/jwt": "^11.0.0",
    "@nestjs/passport": "^10.0.0",
    "@nestjs/platform-express": "^10.2.0",
    "@prisma/client": "^5.4.0",
    "passport": "^0.6.0",
    "passport-jwt": "^4.0.1",
    "bcrypt": "^5.1.0",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.0",
    "reflect-metadata": "^0.1.13",
    "rimraf": "^5.0.1",
    "rxjs": "^7.8.1",
    "uuid": "^9.0.0"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.2.0",
    "@nestjs/schematics": "^10.0.0",
    "@nestjs/testing": "^10.2.0",
    "@types/express": "^4.17.17",
    "@types/jest": "^29.5.2",
    "@types/node": "^20.3.1",
    "@types/passport-jwt": "^3.0.8",
    "@typescript-eslint/eslint-plugin": "^5.59.11",
    "@typescript-eslint/parser": "^5.59.11",
    "eslint": "^8.42.0",
    "jest": "^29.5.0",
    "prettier": "^2.8.8",
    "prisma": "^5.4.0",
    "ts-jest": "^29.1.0",
    "ts-loader": "^9.4.3",
    "ts-node": "^10.9.1",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.1.3"
  }
}
```

### Passo 3: Criar Prisma Schema

**Arquivo:** `apps/api/prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================
// USUARIOS
// ============================================
model User {
  id        String     @id @default(cuid())
  email     String     @unique
  name      String?
  password  String     // bcrypt hash
  role      UserRole   @default(USER)
  active    Boolean    @default(true)
  lastLogin DateTime?
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt

  @@map("users")
  @@index([email])
}

enum UserRole {
  ADMIN
  EDITOR
  USER
}

// ============================================
// APLICACOES (Mercados)
// ============================================
model Application {
  id          String   @id @default(cuid())
  name        String   @unique
  slug        String   @unique
  description String   @db.Text
  excerpt     String?
  icon        String?  // URL
  banner      String?  // URL
  order       Int      @default(0)
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relacionamentos
  technologies TechnologyOnApplication[]
  ingredients  IngredientOnApplication[]

  @@map("applications")
  @@index([slug])
}

// ============================================
// TECNOLOGIAS
// ============================================
model Technology {
  id          String   @id @default(cuid())
  name        String   @unique
  slug        String   @unique
  description String   @db.Text
  excerpt     String?
  icon        String?  // URL
  order       Int      @default(0)
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relacionamentos
  applications TechnologyOnApplication[]
  ingredients  IngredientOnTechnology[]

  @@map("technologies")
  @@index([slug])
}

// ============================================
// MANY-TO-MANY: Applications x Technologies
// ============================================
model TechnologyOnApplication {
  technology    Technology  @relation(fields: [technologyId], references: [id], onDelete: Cascade)
  technologyId  String
  application   Application @relation(fields: [applicationId], references: [id], onDelete: Cascade)
  applicationId String

  @@id([technologyId, applicationId])
  @@map("technologies_on_applications")
}

// ============================================
// INGREDIENTES
// ============================================
model Ingredient {
  id          String   @id @default(cuid())
  name        String   @unique
  slug        String   @unique
  description String   @db.Text
  inci        String?  // Nome técnico
  supplier    String?
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relacionamentos
  technologies IngredientOnTechnology[]
  applications IngredientOnApplication[]

  @@map("ingredients")
  @@index([slug])
}

// ============================================
// MANY-TO-MANY: Technologies x Ingredients
// ============================================
model IngredientOnTechnology {
  ingredient   Ingredient @relation(fields: [ingredientId], references: [id], onDelete: Cascade)
  ingredientId String
  technology   Technology @relation(fields: [technologyId], references: [id], onDelete: Cascade)
  technologyId String

  @@id([ingredientId, technologyId])
  @@map("ingredients_on_technologies")
}

// ============================================
// MANY-TO-MANY: Applications x Ingredients
// ============================================
model IngredientOnApplication {
  ingredient    Ingredient  @relation(fields: [ingredientId], references: [id], onDelete: Cascade)
  ingredientId  String
  application   Application @relation(fields: [applicationId], references: [id], onDelete: Cascade)
  applicationId String

  @@id([ingredientId, applicationId])
  @@map("ingredients_on_applications")
}

// ============================================
// LEADS (Formulários)
// ============================================
model Lead {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  phone     String?
  company   String?
  message   String?  @db.Text
  source    String   @default("website")
  active    Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("leads")
  @@index([email])
  @@index([createdAt])
}
```

### Passo 4: Instalar Prisma e Gerar Cliente

```bash
cd apps/api

# Instalar Prisma CLI
pnpm add -D prisma

# Gerar Prisma Client
pnpm exec prisma generate

# Criar migration inicial
pnpm exec prisma migrate dev --name init

# Verificar se tabelas foram criadas
# pnpm exec prisma studio  # (opcional, abre UI visual)
```

**Esperado:** Arquivo `apps/api/prisma/migrations/[timestamp]_init/migration.sql` criado

---

## Fase 1.2: Implementar Banco de Dados Service

**Arquivo:** `apps/api/src/modules/database/database.service.ts`

```typescript
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
    console.log('✅ Database connected');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

**Arquivo:** `apps/api/src/modules/database/database.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
```

---

## Fase 1.3: Implementar Autenticação (JWT)

### Criar DTOs

**Arquivo:** `apps/api/src/modules/auth/dto/login.dto.ts`

```typescript
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
```

**Arquivo:** `apps/api/src/modules/auth/dto/register.dto.ts`

```typescript
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(8)
  password: string;
}
```

**Arquivo:** `apps/api/src/modules/auth/dto/auth-response.dto.ts`

```typescript
export class AuthResponseDto {
  access_token: string;
  expires_in: number;
  user: {
    id: string;
    email: string;
    name: string;
  };
}
```

### Criar Auth Service

**Arquivo:** `apps/api/src/modules/auth/auth.service.ts`

```typescript
import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../database/database.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private db: DatabaseService,
    private jwt: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    // 1. Encontrar usuário
    const user = await this.db.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Email ou senha incorretos');
    }

    // 2. Verificar password
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou senha incorretos');
    }

    // 3. Verificar se ativo
    if (!user.active) {
      throw new UnauthorizedException('Conta não ativa');
    }

    // 4. Gerar JWT
    const token = this.jwt.sign(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
      },
      {
        expiresIn: '24h',
      },
    );

    // 5. Atualizar lastLogin
    await this.db.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    return {
      access_token: token,
      expires_in: 86400, // 24h em segundos
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async register(dto: RegisterDto): Promise<AuthResponseDto> {
    // 1. Verificar se email já existe
    const exists = await this.db.user.findUnique({
      where: { email: dto.email },
    });

    if (exists) {
      throw new BadRequestException('Email já cadastrado');
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // 3. Criar usuário
    const user = await this.db.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        password: hashedPassword,
        role: 'USER',
      },
    });

    // 4. Gerar JWT
    const token = this.jwt.sign(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
      },
      {
        expiresIn: '24h',
      },
    );

    return {
      access_token: token,
      expires_in: 86400,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async validateToken(token: string) {
    try {
      return this.jwt.verify(token);
    } catch {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }
}
```

### Criar JWT Strategy

**Arquivo:** `apps/api/src/modules/auth/strategies/jwt.strategy.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'dev-secret-change-this',
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
```

### Criar JWT Guard

**Arquivo:** `apps/api/src/modules/auth/guards/jwt.guard.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

### Criar Auth Controller

**Arquivo:** `apps/api/src/modules/auth/auth.controller.ts`

```typescript
import { Controller, Post, Body, HttpCode, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Request() req) {
    return {
      id: req.user.userId,
      email: req.user.email,
      role: req.user.role,
    };
  }
}
```

### Criar Auth Module

**Arquivo:** `apps/api/src/modules/auth/auth.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'dev-secret-change-this',
      signOptions: { expiresIn: '24h' },
    }),
    DatabaseModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
```

---

## Fase 1.4: Implementar CRUD Applications

### Criar DTOs

**Arquivo:** `apps/api/src/modules/applications/dto/create-application.dto.ts`

```typescript
import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

export class CreateApplicationDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  description: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  excerpt?: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsString()
  banner?: string;
}
```

**Arquivo:** `apps/api/src/modules/applications/dto/update-application.dto.ts`

```typescript
import { PartialType } from '@nestjs/mapped-types';
import { CreateApplicationDto } from './create-application.dto';

export class UpdateApplicationDto extends PartialType(CreateApplicationDto) {}
```

### Criar Applications Service

**Arquivo:** `apps/api/src/modules/applications/applications.service.ts`

```typescript
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(private db: DatabaseService) {}

  // Gerar slug único
  private async generateSlug(name: string): Promise<string> {
    let slug = name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    let original = slug;
    let counter = 1;

    while (await this.db.application.findUnique({ where: { slug } })) {
      slug = `${original}-${counter}`;
      counter++;
    }

    return slug;
  }

  async findAll(skip = 0, take = 10) {
    const [data, total] = await Promise.all([
      this.db.application.findMany({
        where: { active: true },
        skip,
        take,
        include: {
          technologies: {
            include: { technology: true },
          },
        },
        orderBy: { order: 'asc' },
      }),
      this.db.application.count({ where: { active: true } }),
    ]);

    return {
      data,
      total,
      page: Math.floor(skip / take) + 1,
      pageSize: take,
      totalPages: Math.ceil(total / take),
    };
  }

  async findOne(id: string) {
    const app = await this.db.application.findUnique({
      where: { id },
      include: {
        technologies: {
          include: { technology: true },
        },
        ingredients: {
          include: { ingredient: true },
        },
      },
    });

    if (!app) {
      throw new NotFoundException(`Aplicação ${id} não encontrada`);
    }

    if (!app.active) {
      throw new NotFoundException(`Aplicação ${id} não encontrada`);
    }

    return app;
  }

  async create(data: CreateApplicationDto) {
    const slug = await this.generateSlug(data.name);

    return await this.db.application.create({
      data: {
        ...data,
        slug,
      },
    });
  }

  async update(id: string, data: UpdateApplicationDto) {
    // Verificar se existe
    await this.findOne(id);

    // Se mudou o nome, regenerar slug
    let updateData = { ...data };
    if (data.name) {
      updateData.slug = await this.generateSlug(data.name);
    }

    return await this.db.application.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return await this.db.application.update({
      where: { id },
      data: { active: false }, // Soft delete
    });
  }
}
```

### Criar Applications Controller

**Arquivo:** `apps/api/src/modules/applications/applications.controller.ts`

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
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly service: ApplicationsService) {}

  // GET /applications?skip=0&take=10
  @Get()
  findAll(
    @Query('skip') skip = 0,
    @Query('take') take = 10,
  ) {
    return this.service.findAll(Number(skip), Number(take));
  }

  // GET /applications/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  // POST /applications
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateApplicationDto) {
    return this.service.create(dto);
  }

  // PUT /applications/:id
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateApplicationDto) {
    return this.service.update(id, dto);
  }

  // DELETE /applications/:id
  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
```

### Criar Applications Module

**Arquivo:** `apps/api/src/modules/applications/applications.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
})
export class ApplicationsModule {}
```

---

## Fase 1.5: Criar Main App Module

**Arquivo:** `apps/api/src/app.module.ts`

```typescript
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { ApplicationsModule } from './modules/applications/applications.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
    }),
    DatabaseModule,
    AuthModule,
    ApplicationsModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    },
  ],
})
export class AppModule {}
```

---

## Fase 1.6: Criar Main.ts (Entry Point)

**Arquivo:** `apps/api/src/main.ts`

```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://daksa.app.br',
      'https://cms.daksa.app.br',
    ],
    credentials: true,
  });

  // Global prefix
  app.setGlobalPrefix('api/v1');

  const port = process.env.API_PORT || 3002;
  await app.listen(port);

  console.log(`🚀 API is running on http://localhost:${port}`);
  console.log(`📚 Swagger: http://localhost:${port}/api/docs`);
}

bootstrap().catch((err) => {
  console.error('❌ Failed to start API:', err);
  process.exit(1);
});
```

---

## Fase 1.7: Criar Seed Data

**Arquivo:** `apps/api/prisma/seed.ts`

```typescript
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Limpar dados anteriores
  await prisma.application.deleteMany();
  await prisma.technology.deleteMany();
  await prisma.user.deleteMany();
  await prisma.lead.deleteMany();

  // 2. Criar usuário admin
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@daksa.app.br',
      name: 'Admin Daksa',
      password: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin criado:', admin.email);

  // 3. Criar aplicações
  const cosmeticos = await prisma.application.create({
    data: {
      name: 'Cosméticos',
      slug: 'cosmeticos',
      description:
        'Soluções inovadoras em lipídios para formulações cosméticas premium. Nossos lipossomas garantem melhor absorção e eficácia de ativos.',
      excerpt: 'Cosméticos premium com tecnologia de ponta',
      order: 1,
    },
  });

  const pharma = await prisma.application.create({
    data: {
      name: 'Farmacêutica',
      slug: 'pharma',
      description:
        'Tecnologias de entrega controlada para ativos farmacêuticos. Lipossomas para melhor biodisponibilidade e redução de efeitos colaterais.',
      excerpt: 'Entrega controlada de ativos farmacêuticos',
      order: 2,
    },
  });

  const nutraceutical = await prisma.application.create({
    data: {
      name: 'Nutracêutico',
      slug: 'nutraceutico',
      description:
        'Encapsulação de nutrientes para máxima biodisponibilidade. Proteção de vitaminas, ômega-3 e outros ativos sensíveis.',
      excerpt: 'Nutrientes com proteção e biodisponibilidade',
      order: 3,
    },
  });

  console.log('✅ Aplicações criadas: 3');

  // 4. Criar tecnologias
  const lipossomas = await prisma.technology.create({
    data: {
      name: 'Lipossomas',
      slug: 'lipossomas',
      description:
        'Vesículas esféricas compostas por fosfolipídios que encapsulam ativos hidrofílicos e lipofílicos. Tecnologia comprovada em dermatologia e farmacêutica.',
      excerpt: 'Vesículas de fosfolipídios para encapsulação',
      order: 1,
    },
  });

  const fosfolipidios = await prisma.technology.create({
    data: {
      name: 'Fosfolipídios',
      slug: 'fosfolipidios',
      description:
        'Componentes fundamentais das membranas celulares. Fornecedores de alta pureza como Lipoid e Readline.',
      excerpt: 'Componentes de membranas celulares',
      order: 2,
    },
  });

  const encapsulacao = await prisma.technology.create({
    data: {
      name: 'Encapsulação',
      slug: 'encapsulacao',
      description:
        'Tecnologia de proteção de ativos sensíveis. Melhora estabilidade, biodisponibilidade e eficácia.',
      excerpt: 'Proteção de ativos sensíveis',
      order: 3,
    },
  });

  console.log('✅ Tecnologias criadas: 3');

  // 5. Relacionar aplicações com tecnologias
  await prisma.technologyOnApplication.createMany({
    data: [
      { applicationId: cosmeticos.id, technologyId: lipossomas.id },
      { applicationId: pharma.id, technologyId: lipossomas.id },
      { applicationId: nutraceutical.id, technologyId: encapsulacao.id },
    ],
  });

  console.log('✅ Relacionamentos criados');

  // 6. Criar alguns leads de exemplo
  await prisma.lead.create({
    data: {
      email: 'contato@empresa1.com.br',
      name: 'João Silva',
      company: 'Empresa 1',
      message: 'Interessado em cosméticos',
      source: 'website',
    },
  });

  console.log('✅ Seed completo!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

**Executar seed:**
```bash
cd apps/api
pnpm exec prisma db seed
```

---

## Fase 1.8: Testar Backend

```bash
# Terminal 1: Iniciar API
cd apps/api
pnpm start:dev

# Esperado: 
# 🚀 API is running on http://localhost:3002
# ✅ Database connected
```

**Testar endpoints (Terminal 2):**

```bash
# 1. Registrar usuário
curl -X POST http://localhost:3002/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "password": "Password123"
  }'

# 2. Login
curl -X POST http://localhost:3002/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123"
  }'
# Copiar o access_token

# 3. Listar aplicações (sem auth)
curl http://localhost:3002/api/v1/applications

# 4. Criar aplicação (com auth)
curl -X POST http://localhost:3002/api/v1/applications \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer [TOKEN_AQUI]" \
  -d '{
    "name": "Nova Aplicação",
    "description": "Descrição da nova aplicação"
  }'

# 5. Pegar aplicação específica
curl http://localhost:3002/api/v1/applications/[ID]
```

**Esperado:** Todas as rotas retornam 200/201 com dados válidos

---

# 💻 CMS ADMIN (Next.js)

## Fase 2.1: Setup Next.js

```bash
# Criar app Next.js (se não existir)
cd apps/admin

# Instalar dependências
pnpm install

# Criar .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:3002" > .env.local
```

## Fase 2.2: Setup Tailwind + Componentes Base

**Arquivo:** `apps/admin/tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          900: '#1E3A8A',
        },
        sidebar: '#0F172A',
      },
    },
  },
  plugins: [],
};
export default config;
```

## Fase 2.3: Criar Componentes Base

**Arquivo:** `apps/admin/src/components/Button.tsx`

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'font-semibold rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    ghost: 'bg-transparent text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? '⏳...' : children}
    </button>
  );
}
```

**Arquivo:** `apps/admin/src/components/Card.tsx`

```typescript
interface CardProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export function Card({ title, subtitle, action, children }: CardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      {(title || subtitle || action) && (
        <div className="flex justify-between items-start mb-6 pb-6 px-6 pt-6 border-b border-gray-200">
          <div>
            {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={title || subtitle || action ? 'px-6 pb-6' : 'p-6'}>{children}</div>
    </div>
  );
}
```

**Arquivo:** `apps/admin/src/components/Input.tsx`

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Input({ label, error, hint, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          {label}
          {props.required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      <input
        className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
          error ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
        }`}
        {...props}
      />
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
      {hint && !error && <p className="text-sm text-gray-500 mt-1">{hint}</p>}
    </div>
  );
}
```

**Arquivo:** `apps/admin/src/components/Toast.tsx`

```typescript
export function Toast({
  message,
  type = 'info',
  duration = 3000,
}: {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}) {
  const bgColor = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600',
    warning: 'bg-yellow-600',
  }[type];

  const icon = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    warning: '⚠️',
  }[type];

  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3`}>
      <span>{icon}</span>
      <span>{message}</span>
    </div>
  );
}
```

---

## Fase 2.4: Criar Context e Hooks

**Arquivo:** `apps/admin/src/context/AuthContext.tsx`

```typescript
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Checar token no localStorage ao montar
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();

    setToken(data.access_token);
    setUser(data.user);

    localStorage.setItem('token', data.access_token);
    localStorage.setItem('user', JSON.stringify(data.user));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

**Arquivo:** `apps/admin/src/lib/api-client.ts`

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

async function apiCall<T>(
  endpoint: string,
  options?: RequestInit & { skipAuth?: boolean },
): Promise<T> {
  const { skipAuth = false, ...requestInit } = options || {};

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...requestInit.headers,
  };

  if (!skipAuth) {
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...requestInit,
    headers,
  });

  if (response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/admin/login';
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `API error: ${response.statusText}`);
  }

  if (response.status === 204) {
    return null as T;
  }

  return response.json();
}

export const api = {
  get: <T,>(endpoint: string) => apiCall<T>(endpoint),
  post: <T,>(endpoint: string, data: unknown) =>
    apiCall<T>(endpoint, { method: 'POST', body: JSON.stringify(data) }),
  put: <T,>(endpoint: string, data: unknown) =>
    apiCall<T>(endpoint, { method: 'PUT', body: JSON.stringify(data) }),
  delete: <T,>(endpoint: string) => apiCall<T>(endpoint, { method: 'DELETE' }),
};
```

---

## Fase 2.5: Criar Layout e Login

**Arquivo:** `apps/admin/src/app/layout.tsx`

```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Daksa CMS - Admin',
  robots: 'noindex,nofollow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
```

**Arquivo:** `apps/admin/src/app/login/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      router.push('/admin');
    } catch {
      setError('Email ou senha incorretos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-blue-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Daksa CMS</h1>
          <p className="text-gray-600 mb-8">Painel de administração</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />

            <Input
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />

            {error && <div className="text-red-600 text-sm font-semibold">{error}</div>}

            <Button variant="primary" size="lg" loading={loading} className="w-full">
              Entrar
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            <a href="/forgot-password" className="text-primary-600 hover:underline">
              Esqueceu a senha?
            </a>
          </p>
        </div>

        {/* Demo login info */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
          <p className="font-semibold mb-2">🔓 Credenciais de teste:</p>
          <p>Email: admin@daksa.app.br</p>
          <p>Senha: admin123</p>
        </div>
      </div>
    </div>
  );
}
```

**Arquivo:** `apps/admin/src/app/(dashboard)/layout.tsx`

```typescript
'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-auto p-8">{children}</main>
      </div>
    </div>
  );
}
```

---

## Fase 2.6: Criar Dashboard

**Arquivo:** `apps/admin/src/app/(dashboard)/page.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/Card';
import { api } from '@/lib/api-client';

interface Stats {
  applications: number;
  technologies: number;
  ingredients: number;
  leads: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<Stats>('/api/v1/applications') // Temporário, depois criar endpoint de stats
      .then(() => {
        setStats({
          applications: 0,
          technologies: 0,
          ingredients: 0,
          leads: 0,
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-4 mb-8">
        {[
          { label: 'Aplicações', value: stats?.applications, icon: '📱' },
          { label: 'Tecnologias', value: stats?.technologies, icon: '⚙️' },
          { label: 'Ingredientes', value: stats?.ingredients, icon: '📦' },
          { label: 'Leads', value: stats?.leads, icon: '👥' },
        ].map((stat) => (
          <Card key={stat.label}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold mt-2">{stat.value ?? '-'}</p>
              </div>
              <div className="text-4xl">{stat.icon}</div>
            </div>
          </Card>
        ))}
      </div>

      <Card title="Ações Rápidas">
        <div className="space-y-2">
          <a href="/admin/aplicacoes/novo" className="block p-3 rounded border hover:bg-gray-50">
            + Nova Aplicação
          </a>
          <a href="/admin/tecnologias/nova" className="block p-3 rounded border hover:bg-gray-50">
            + Nova Tecnologia
          </a>
        </div>
      </Card>
    </div>
  );
}
```

---

## Fase 2.7: Criar CRUD Aplicações

**Arquivo:** `apps/admin/src/app/(dashboard)/aplicacoes/page.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { api } from '@/lib/api-client';
import Link from 'next/link';

interface Application {
  id: string;
  name: string;
  slug: string;
  active: boolean;
}

export default function AplicacoesPage() {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<any>('/api/v1/applications?take=100')
      .then((res) => setApps(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Aplicações</h1>
        <Link href="/admin/aplicacoes/novo">
          <Button variant="primary">+ Nova Aplicação</Button>
        </Link>
      </div>

      <Card>
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Slug</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {apps.map((app) => (
              <tr key={app.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{app.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{app.slug}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      app.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {app.active ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <Link href={`/admin/aplicacoes/${app.id}`} className="text-primary-600 hover:underline">
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
```

---

## Fase 2.8: Testar CMS

```bash
# Terminal: Iniciar CMS
cd apps/admin
pnpm dev

# Acessar: http://localhost:3001/admin/login
# Email: admin@daksa.app.br
# Senha: admin123
```

---

# 🌐 FRONTEND WEBSITE (Next.js)

## Fase 3.1: Setup e Homepage

**Arquivo:** `apps/website/src/app/page.tsx`

```typescript
import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold leading-tight mb-4">
            Inovação em Lipídios
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Tecnologias avançadas para cosméticos, farmacêutica e nutracêuticos
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/aplicacoes"
              className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700"
            >
              Explorar
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Nossas Competências</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {['📱 Cosméticos', '⚙️ Farmacêutica', '📦 Nutracêutico'].map((item) => (
              <div key={item} className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">{item}</h3>
                <p className="text-gray-600">Descrição aqui</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
```

**Arquivo:** `apps/website/src/app/layout.tsx`

```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Daksa - Inovação em Lipídios',
  description: 'Tecnologias avançadas em lipídios para cosméticos e farmacêutica',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <header className="bg-white shadow">
          <nav className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Daksa</h1>
            <ul className="flex gap-8">
              <li><a href="/">Home</a></li>
              <li><a href="/aplicacoes">Aplicações</a></li>
              <li><a href="/tecnologias">Tecnologias</a></li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="bg-gray-50 border-t py-12 px-4">
          <p className="text-center text-gray-600">© 2026 Daksa. Todos os direitos reservados.</p>
        </footer>
      </body>
    </html>
  );
}
```

**Arquivo:** `apps/website/src/app/aplicacoes/page.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';

interface Application {
  id: string;
  name: string;
  excerpt: string;
}

export default function AplicacoesPage() {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/applications`)
      .then((r) => r.json())
      .then((res) => setApps(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8">Carregando...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-12">Aplicações</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {apps.map((app) => (
          <div key={app.id} className="border rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">{app.name}</h3>
            <p className="text-gray-600">{app.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Fase 3.2: Testar Website

```bash
# Terminal: Iniciar website
cd apps/website
pnpm dev

# Acessar: http://localhost:3000
```

---

# ✅ TESTES

## Checklist Geral

```
Backend (NestJS):
☐ npm start:dev roda sem erros
☐ /api/v1/auth/login funciona
☐ /api/v1/applications GET retorna dados
☐ /api/v1/applications POST cria novo (com auth)
☐ Prisma migrations OK

CMS Admin (Next.js):
☐ npm dev roda sem erros
☐ /admin/login carrega
☐ Login com admin@daksa.app.br / admin123 funciona
☐ /admin dashboard carrega
☐ /admin/aplicacoes lista dados da API
☐ Criar nova aplicação funciona

Website (Next.js):
☐ npm dev roda sem erros
☐ / (homepage) carrega
☐ /aplicacoes lista dados da API
☐ Responsivo em mobile
```

---

# 🚀 DEPLOY

## Para Coolify (após tudo pronto)

1. **Push para GitHub:**
```bash
git add .
git commit -m "feat: fase 1 backend cms website"
git push origin main
```

2. **Coolify detecta e faz deploy automático**

3. **Verificar:**
- API: https://api.daksa.app.br/health
- CMS: https://cms.daksa.app.br/admin/login
- Website: https://daksa.app.br/

---

## 📌 Próximas Ações

1. ✅ Seguir este guia passo-a-passo
2. ✅ Testar cada parte
3. ✅ Fazer commits incrementais
4. ✅ Quando Fase 1 estiver pronta, iniciar Fase 2 (tecnologias, ingredientes, etc)

**Tempo estimado:** 10-12 horas (desenvolvedor experiente)

Boa sorte! 🚀
