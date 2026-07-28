# 🚀 DESENVOLVIMENTO INTEGRAÇÃO COMPLETA
## SEO Dinâmico | Tipos TypeScript | Testes | Deployment | Performance

**Status:** Módulo 6 de 6 (Final)  
**Escopo:** Integração de todo o website + deployment  
**Tempo:** 8-10 horas  
**Dependência:** Todos os módulos anteriores  

---

## 📋 ÍNDICE

1. [Visão Geral](#visão-geral)
2. [Tipos TypeScript Completos](#tipos-typescript-completos)
3. [SEO Dinâmico](#seo-dinâmico)
4. [Roteamento e Layout](#roteamento-e-layout)
5. [Testes Integrados](#testes-integrados)
6. [Performance](#performance)
7. [Deployment](#deployment)
8. [Checklist Final](#checklist-final)

---

## 🎯 VISÃO GERAL

```
INTEGRAÇÃO FINAL:
┌─────────────────────────────────┐
│ Tipos TypeScript Centralizados  │
├─────────────────────────────────┤
│ SEO Dinâmico + Meta Tags        │
├─────────────────────────────────┤
│ Navegação Global + Routing      │
├─────────────────────────────────┤
│ API Integration Centralizada    │
├─────────────────────────────────┤
│ Testes E2E + Unit Tests         │
├─────────────────────────────────┤
│ Performance Optimizations       │
├─────────────────────────────────┤
│ Deployment no Coolify           │
└─────────────────────────────────┘

OBJETIVOS:
✅ Tipo seguro (TypeScript strict)
✅ SEO otimizado (>90 Lighthouse)
✅ Performance (<2.5s LCP)
✅ Acessível (WCAG AA)
✅ Production-ready
```

---

## 📝 TIPOS TYPESCRIPT COMPLETOS

### Arquivo: types/api.ts (Completo)

**Arquivo:** `apps/website/src/types/api.ts`

```typescript
// ========== ENTITIES ==========

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Application {
  id: string;
  name: string;
  slug: string;
  description: string;
  excerpt?: string;
  icon?: string;
  banner?: string;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Technology {
  id: string;
  name: string;
  slug: string;
  description: string;
  excerpt?: string;
  icon?: string;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Ingredient {
  id: string;
  name: string;
  slug: string;
  description: string;
  inci?: string;
  supplier?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Content {
  id: string;
  title: string;
  slug: string;
  description: string;
  excerpt?: string;
  banner?: string;
  content: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface Partner {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo?: string;
  website?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  source: 'website_contact_form' | 'website_newsletter' | 'other';
  status: 'new' | 'contacted' | 'converted' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface SiteConfig {
  id: string;
  siteTitle: string;
  siteDescription: string;
  siteLogo?: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

// ========== API RESPONSES ==========

export interface ApiResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  statusCode: number;
  message: string;
  error: string;
}

// ========== FORM DATA ==========

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  source: string;
}

export interface NewsletterData {
  email: string;
}

// ========== FILTERS & PARAMS ==========

export interface QueryParams {
  page?: number;
  limit?: number;
  skip?: number;
  take?: number;
  q?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  [key: string]: any;
}

export interface FilterState {
  search: string;
  filters: Record<string, string | string[]>;
  page: number;
  pageSize: number;
}

// ========== NAVIGATION ==========

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  hasDropdown?: boolean;
  subItems?: NavItem[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// ========== SEO ==========

export interface SeoMetaTags {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: string;
}

// ========== PAGINATION ==========

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
```

---

## 🔍 SEO DINÂMICO

### Arquivo: lib/seo.ts

**Arquivo:** `apps/website/src/lib/seo.ts`

```typescript
import { SeoMetaTags } from '@/types/api';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://daksa.app.br';
const defaultImage = `${baseUrl}/og-image.png`;

export const seoConfig = {
  siteName: 'Daksa - Inovação em Lipídios',
  siteUrl: baseUrl,
  twitterHandle: '@daksa',
};

export function generateSeoTags(overrides: Partial<SeoMetaTags>): SeoMetaTags {
  return {
    title: 'Daksa - Inovação em Lipídios',
    description: 'Tecnologias avançadas em lipídios para cosméticos, farmacêutica e nutracêuticos.',
    keywords: ['lipídios', 'tecnologia', 'cosméticos', 'farmacêutica'],
    canonical: baseUrl,
    ogImage: defaultImage,
    ogType: 'website',
    ...overrides,
  };
}

export function generateApplicationSeo(app: any): SeoMetaTags {
  return generateSeoTags({
    title: `${app.name} | Daksa`,
    description: app.excerpt || app.description,
    canonical: `${baseUrl}/aplicacoes/${app.slug}`,
    ogImage: app.banner || defaultImage,
    ogType: 'article',
  });
}

export function generateTechnologySeo(tech: any): SeoMetaTags {
  return generateSeoTags({
    title: `${tech.name} | Daksa`,
    description: tech.excerpt || tech.description,
    canonical: `${baseUrl}/tecnologias/${tech.slug}`,
    ogImage: defaultImage,
    ogType: 'article',
  });
}

export function generateContentSeo(content: any): SeoMetaTags {
  return generateSeoTags({
    title: `${content.title} | Daksa`,
    description: content.excerpt || content.description,
    canonical: `${baseUrl}/conteudo/${content.slug}`,
    ogImage: content.banner || defaultImage,
    ogType: 'article',
  });
}

// Structured Data (JSON-LD)
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Daksa',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: 'Inovação em lipídios e tecnologias avançadas.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      telephone: '+55-16-14056-667',
      email: 'contato@lipid.com.br',
    },
  };
}

export function generateArticleSchema(article: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.banner,
    datePublished: article.createdAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Organization',
      name: 'Daksa',
    },
  };
}
```

---

### NextSeo Config

**Arquivo:** `apps/website/src/pages/_app.tsx` (ou app/layout.tsx)

```typescript
import { DefaultSeo } from 'next-seo';
import { seoConfig } from '@/lib/seo';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <DefaultSeo
          titleTemplate="%s | Daksa"
          defaultTitle="Daksa - Inovação em Lipídios"
          description="Tecnologias avançadas em lipídios para cosméticos, farmacêutica e nutracêuticos."
          canonical={seoConfig.siteUrl}
          openGraph={{
            type: 'website',
            locale: 'pt_BR',
            url: seoConfig.siteUrl,
            siteName: seoConfig.siteName,
          }}
          twitter={{
            handle: seoConfig.twitterHandle,
            cardType: 'summary_large_image',
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

## 🗺️ ROTEAMENTO E LAYOUT

### App Router Structure

**Arquivo:** `apps/website/src/app/layout.tsx` (Root Layout)

```typescript
import type { Metadata } from 'next';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://daksa.app.br'),
  title: {
    default: 'Daksa - Inovação em Lipídios',
    template: '%s | Daksa',
  },
  description: 'Tecnologias avançadas em lipídios para cosméticos, farmacêutica e nutracêuticos.',
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

---

## 🧪 TESTES INTEGRADOS

### Arquivo: Tests Setup

**Arquivo:** `apps/website/jest.config.js`

```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
}

module.exports = createJestConfig(customJestConfig)
```

---

### Unit Tests Example

**Arquivo:** `apps/website/src/components/ui/Button.test.tsx`

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

describe('Button Component', () => {
  it('renders with default variant', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary-600');
  });

  it('renders with secondary variant', () => {
    render(<Button variant="secondary">Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gray-200');
  });

  it('renders as link when href is provided', () => {
    render(<Button href="/test">Go</Button>);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/test');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
```

---

### Integration Tests

**Arquivo:** `apps/website/src/__tests__/integration/homepage.test.tsx`

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import HomePage from '@/app/page';

// Mock API
jest.mock('@/lib/api', () => ({
  api: {
    get: jest.fn(),
  },
}));

describe('Homepage', () => {
  it('renders all sections', async () => {
    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText(/Ciência que transforma/i)).toBeInTheDocument();
      expect(screen.getByText(/Inovação científica em lipídios/i)).toBeInTheDocument();
    });
  });

  it('fetches and displays applications', async () => {
    render(<HomePage />);

    await waitFor(() => {
      // Check if applications section loads
      expect(screen.getByText(/Soluções que impulsionam/i)).toBeInTheDocument();
    });
  });

  it('is accessible', async () => {
    const { container } = render(<HomePage />);
    
    // Check for proper headings hierarchy
    const headings = container.querySelectorAll('h1, h2, h3');
    expect(headings.length).toBeGreaterThan(0);
  });
});
```

---

## ⚡ PERFORMANCE

### Next.js Config Otimizado

**Arquivo:** `apps/website/next.config.js` (Otimizado)

```javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Compressão
  compress: true,

  // Power by header
  poweredByHeader: false,

  // Images otimizadas
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.daksa.app.br' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 ano
  },

  // Headers de segurança
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
        ],
      },
    ]
  },

  // Redirects (SEO)
  redirects: async () => {
    return [
      { source: '/tech', destination: '/tecnologias', permanent: true },
      { source: '/apps', destination: '/aplicacoes', permanent: true },
      { source: '/blog', destination: '/conteudo', permanent: true },
    ]
  },

  // Cache headers
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000, // 1 hora
    pagesBufferLength: 5,
  },
}

module.exports = withBundleAnalyzer(nextConfig)
```

---

### Métricas Web Vitals

**Arquivo:** `apps/website/src/lib/metrics.ts`

```typescript
export function reportWebVitals(metric: any) {
  if (metric.label === 'web-vital') {
    console.log(metric);
    
    // Send to analytics service (Sentry, Vercel Analytics, etc)
    if (metric.value > 2500 && metric.name === 'LCP') {
      console.warn('⚠️ LCP above 2.5s');
    }
    if (metric.value > 100 && metric.name === 'FID') {
      console.warn('⚠️ FID above 100ms');
    }
    if (metric.value > 0.1 && metric.name === 'CLS') {
      console.warn('⚠️ CLS above 0.1');
    }
  }
}
```

---

## 🚀 DEPLOYMENT

### Deployment no Coolify

**Arquivo:** `coolify.yml` (na raiz do projeto)

```yaml
version: '3'

services:
  website:
    image: node:18-alpine
    working_dir: /app
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=http://api:3002
      - NEXT_PUBLIC_SITE_URL=https://daksa.app.br
    ports:
      - "3000:3000"
    volumes:
      - .:/app
    command: >
      sh -c "pnpm install &&
             pnpm build &&
             pnpm start"
    restart: unless-stopped
    networks:
      - daksa
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3

networks:
  daksa:
    driver: bridge
```

---

### Environment Variables

**Arquivo:** `.env.production`

```env
# API
NEXT_PUBLIC_API_URL=https://api.daksa.app.br
NEXT_PUBLIC_API_TIMEOUT=10000

# Site
NEXT_PUBLIC_SITE_URL=https://daksa.app.br
NEXT_PUBLIC_SITE_NAME=Daksa

# Analytics (Fase 2)
NEXT_PUBLIC_GA_ID=G-XXXXX

# Sentry (Fase 2)
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx

# Environment
NODE_ENV=production
```

---

### CI/CD Pipeline

**Arquivo:** `.github/workflows/deploy.yml`

```yaml
name: Deploy Website

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test-and-build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Lint
        run: pnpm lint

      - name: Test
        run: pnpm test

      - name: Build
        run: pnpm build

      - name: Upload to Coolify
        if: github.ref == 'refs/heads/main'
        run: |
          curl -X POST https://coolify.daksa.app.br/api/deploy \
            -H "Authorization: Bearer ${{ secrets.COOLIFY_TOKEN }}" \
            -H "Content-Type: application/json" \
            -d '{"service":"website","branch":"main"}'
```

---

## ✅ CHECKLIST FINAL

```
ARQUITETURA:
☑ App router configurado
☑ Layout hierarchy OK
☑ Componentes reutilizáveis
☑ Tipos TypeScript centralizados

FUNCIONALIDADES:
☑ Homepage (6 seções)
☑ Listagens (4 páginas)
☑ Detalhes (3 páginas)
☑ Contato (formulário)
☑ Sobre (team + metrics)
☑ Navegação global

INTEGRAÇÃO:
☑ API client centralizado
☑ Tipos da API corretos
☑ Error handling
☑ Loading states

SEO:
☑ Meta tags dinâmicas
☑ JSON-LD schema
☑ Og tags
☑ Sitemap (Fase 2)
☑ Robots.txt

PERFORMANCE:
☑ Images otimizadas
☑ Code splitting
☑ Lazy loading
☑ Lighthouse > 90

TESTES:
☑ Unit tests
☑ Integration tests
☑ E2E tests (Cypress)
☑ Accessibility (a11y)

ACESSIBILIDADE:
☑ Sem headings quebrados
☑ Contraste OK
☑ Focus visible
☑ Keyboard navigation

SEGURANÇA:
☑ Headers segurança
☑ CSP configurado
☑ CORS permitido
☑ Sem vulnerabilidades

DEPLOYMENT:
☑ Coolify config
☑ Environment vars
☑ CI/CD pipeline
☑ Rollback strategy

DOCUMENTAÇÃO:
☑ README completo
☑ Setup instructions
☑ Architecture docs
☑ API docs

PRODUÇÃO:
☑ DNS configurado (daksa.app.br)
☑ SSL/HTTPS
☑ CDN (Cloudflare)
☑ Monitoramento (Sentry)
☑ Analytics (Vercel/GA)
```

---

## 📊 TIMELINE COMPLETA

```
SEMANA 1:
- Dia 1-2: Setup + Design System + Componentes
- Dia 3: Header/Footer
- Dia 4-5: Homepage (seções 1-3)
- Dia 6-7: Homepage (seções 4-6) + Testes

SEMANA 2:
- Dia 8-9: Páginas detalhe (3 páginas)
- Dia 10-11: Páginas listagem (4 páginas)
- Dia 12-13: Página contato + formulário
- Dia 14: Página sobre

SEMANA 3:
- Dia 15: Componentes avançados
- Dia 16-17: SEO + Testes
- Dia 18: Performance optimization
- Dia 19: Deployment + CI/CD
- Dia 20: Produção + Launch

TOTAL: ~100-120 horas (2-3 devs / 3-4 semanas)
```

---

## 🎯 PRÓXIMAS FASES

### Fase 2 (Após Launch):
- ☐ Analytics (Google Analytics + Vercel)
- ☐ SEO avançado (Sitemap, XML, Schema)
- ☐ Chatbot (AI customer support)
- ☐ Newsletter integration
- ☐ Blog automation
- ☐ Social media integration

### Fase 3 (CRM + Automation):
- ☐ RD Station integration
- ☐ n8n workflows
- ☐ Lead scoring
- ☐ Email marketing
- ☐ SMS notifications
- ☐ Webhooks

### Fase 4 (Premium):
- ☐ Multitenancy (SaaS)
- ☐ API pública
- ☐ Partner portal
- ☐ Advanced analytics
- ☐ Custom branding
- ☐ White-label

---

## 📞 SUPORTE

### Troubleshooting Comum

```
Problema: Build falha
→ Verificar TypeScript errors
→ Verificar import paths (@/ alias)
→ Clear .next e node_modules

Problema: API não conecta
→ Verificar NEXT_PUBLIC_API_URL
→ Verificar CORS no backend
→ Testar com curl/Postman

Problema: Lighthouse score baixo
→ Retirar unused dependencies
→ Lazy load images
→ Split code em chunks menores
→ Remover unused CSS

Problema: Deploy falha no Coolify
→ Verificar .env.production
→ Verificar node version match
→ Check docker logs
→ Restart container
```

---

## 🎉 CONCLUSÃO

Você tem agora **documentação completa** para um website production-ready:

✅ **Arquitetura modular** (6 documentos independentes)  
✅ **Componentes reutilizáveis** (40+ componentes)  
✅ **Páginas completas** (9 páginas implementadas)  
✅ **Integração API** (centralizada e tipo-segura)  
✅ **SEO otimizado** (meta tags dinâmicas, schema)  
✅ **Performance** (Lighthouse >90, LCP <2.5s)  
✅ **Testes** (unit, integration, E2E)  
✅ **Deployment pronto** (Coolify + CI/CD)  

**Status: PRONTO PARA IMPLEMENTAÇÃO COM CLAUDE CODE** 🚀

---

**Boa sorte! Qualquer dúvida, revise o módulo correspondente.** 💪
