# 🚀 DESENVOLVIMENTO HOMEPAGE DAKSA - GUIA COMPLETO
## Next.js + Tailwind + API Integration

**Status:** Pronto para implementação com Claude Code  
**Escopo:** Homepage completa (6 seções) + Header + Footer  
**Tempo Estimado:** 10-12 horas (1 dev)  
**Versão:** Fase 1 (funcional + responsivo)  

---

## 📋 ÍNDICE COMPLETO

1. [Setup Inicial](#setup-inicial)
2. [Design System](#design-system)
3. [Estrutura de Pastas](#estrutura-de-pastas)
4. [Componentes Reutilizáveis](#componentes-reutilizáveis)
5. [Layout Components](#layout-components)
6. [Seções da Homepage](#seções-da-homepage)
7. [Integração API](#integração-api)
8. [Timeline Dia-a-Dia](#timeline-dia-a-dia)
9. [Testes](#testes)
10. [Troubleshooting](#troubleshooting)

---

# ⚙️ SETUP INICIAL

## Passo 1: Criar Projeto Next.js (se não existir)

```bash
# Na pasta raiz do projeto
cd apps/website

# Se não existir, criar:
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app

# Ou usar pnpm
pnpm create next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app
```

## Passo 2: Instalar Dependências

```bash
cd apps/website

pnpm install

# Dependências adicionais necessárias:
pnpm add \
  axios \
  next-seo \
  clsx \
  tailwind-merge \
  react-icons

pnpm add -D \
  @types/node \
  @types/react \
  typescript
```

## Passo 3: Configurar .env.local

**Arquivo:** `apps/website/.env.local`

```env
# API Backend
NEXT_PUBLIC_API_URL=http://localhost:3002
NEXT_PUBLIC_API_TIMEOUT=10000

# SEO
NEXT_PUBLIC_SITE_URL=https://daksa.app.br
NEXT_PUBLIC_SITE_NAME=Daksa - Inovação em Lipídios

# Modo desenvolvimento
NODE_ENV=development
```

## Passo 4: Verificar next.config.js

**Arquivo:** `apps/website/next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.daksa.app.br',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

---

# 🎨 DESIGN SYSTEM

## Paleta de Cores

**Arquivo:** `apps/website/src/styles/colors.ts`

```typescript
export const colors = {
  // Primária (Azul)
  primary: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },

  // Neutros (Cinza)
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Estados
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Backgrounds
  white: '#FFFFFF',
  black: '#000000',
  background: '#FFFFFF',
  backgroundSecondary: '#F9FAFB',
  backgroundDark: '#0F172A', // Azul muito escuro para footer
};
```

## Tailwind Config

**Arquivo:** `apps/website/tailwind.config.ts`

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
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        sidebar: '#0F172A',
      },

      spacing: {
        '8xs': '0.5rem',   // 8px
        '4xs': '1rem',     // 16px
        '2xs': '1.5rem',   // 24px
        xs: '2rem',        // 32px
        sm: '2.5rem',      // 40px
        md: '3rem',        // 48px
        lg: '4rem',        // 64px
        xl: '5rem',        // 80px
      },

      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1.2' }],
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
      },

      borderRadius: {
        'none': '0',
        'sm': '0.25rem',   // 4px
        'md': '0.5rem',    // 8px
        'lg': '0.75rem',   // 12px
        'xl': '1rem',      // 16px
        '2xl': '1.5rem',   // 24px
        '3xl': '2rem',     // 32px
        'full': '9999px',  // Totalmente redondo
      },

      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      },

      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },

  plugins: [],
};

export default config;
```

## Tipografia

**Arquivo:** `apps/website/src/styles/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-white text-gray-900 font-sans;
  }

  h1 {
    @apply text-5xl md:text-6xl lg:text-7xl font-bold leading-tight;
  }

  h2 {
    @apply text-4xl md:text-5xl font-bold leading-tight;
  }

  h3 {
    @apply text-2xl md:text-3xl font-bold;
  }

  h4 {
    @apply text-xl md:text-2xl font-semibold;
  }

  p {
    @apply text-base md:text-lg leading-relaxed;
  }

  .text-label {
    @apply text-xs md:text-sm uppercase tracking-wide font-semibold;
  }

  .text-subtitle {
    @apply text-sm md:text-base text-gray-500;
  }
}

@layer components {
  /* Containers */
  .container-main {
    @apply max-w-7xl mx-auto px-4 md:px-6 lg:px-8;
  }

  .section {
    @apply py-16 md:py-20 lg:py-24;
  }

  .section-light {
    @apply section bg-gray-50;
  }

  /* Links */
  .link-arrow {
    @apply inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors;
  }

  .link-arrow::after {
    content: '→';
    @apply ml-1;
  }
}

/* Animations */
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
```

---

# 📁 ESTRUTURA DE PASTAS

```bash
apps/website/
├── public/
│   ├── images/
│   │   ├── icons/
│   │   ├── logos/
│   │   └── placeholders/
│   └── favicons/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout raiz
│   │   ├── page.tsx            # Homepage
│   │   ├── globals.css         # Estilos globais
│   │   └── favicon.ico
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Megamenu.tsx
│   │   │   └── Container.tsx
│   │   │
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Link.tsx
│   │   │   ├── Image.tsx
│   │   │   ├── Section.tsx
│   │   │   └── Grid.tsx
│   │   │
│   │   └── sections/
│   │       ├── HeroSection.tsx
│   │       ├── FeaturesSection.tsx
│   │       ├── ApplicationsSection.tsx
│   │       ├── TechnologiesSection.tsx
│   │       ├── PartnersSection.tsx
│   │       ├── ContentSection.tsx
│   │       └── CTASection.tsx (opcional)
│   │
│   ├── lib/
│   │   ├── api.ts              # Cliente HTTP
│   │   ├── constants.ts        # Constantes
│   │   └── utils.ts            # Funções utilitárias
│   │
│   ├── types/
│   │   ├── api.ts              # Tipos da API
│   │   └── components.ts       # Tipos de componentes
│   │
│   └── styles/
│       └── colors.ts
│
├── .env.local
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
└── package.json
```

---

# 🧩 COMPONENTES REUTILIZÁVEIS

## Componente 1: Button

**Arquivo:** `apps/website/src/components/ui/Button.tsx`

```typescript
import { cva, type VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';
import Link from 'next/link';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400',
        ghost: 'text-primary-600 hover:bg-primary-50 active:bg-primary-100',
        danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm rounded-lg',
        md: 'px-4 py-2 text-base rounded-lg',
        lg: 'px-6 py-3 text-lg rounded-xl',
        xl: 'px-8 py-4 text-lg rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  children,
  href,
  variant,
  size,
  className,
  ...props
}: ButtonProps) {
  const baseClass = buttonVariants({ variant, size, className });

  if (href) {
    return (
      <Link href={href} className={baseClass}>
        {children}
      </Link>
    );
  }

  return (
    <button className={baseClass} {...props}>
      {children}
    </button>
  );
}
```

**Uso:**
```jsx
<Button variant="primary" size="lg">Nossas tecnologias</Button>
<Button variant="ghost" href="/contato">Fale com um especialista</Button>
<Button variant="secondary" size="sm">Explorar</Button>
```

---

## Componente 2: Card

**Arquivo:** `apps/website/src/components/ui/Card.tsx`

```typescript
import { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  variant?: 'default' | 'elevated';
}

export function Card({
  children,
  className,
  hoverable = false,
  variant = 'default',
}: CardProps) {
  return (
    <div
      className={clsx(
        'bg-white rounded-lg p-6',
        variant === 'elevated' && 'shadow-lg',
        variant === 'default' && 'shadow-md border border-gray-200',
        hoverable && 'hover:shadow-xl hover:scale-105 transition-all duration-300',
        className,
      )}
    >
      {children}
    </div>
  );
}
```

**Uso:**
```jsx
<Card>
  <h3 className="text-xl font-bold">Título</h3>
  <p className="text-gray-600">Descrição</p>
</Card>
```

---

## Componente 3: Badge

**Arquivo:** `apps/website/src/components/ui/Badge.tsx`

```typescript
import clsx from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
}

export function Badge({ children, variant = 'primary', size = 'sm' }: BadgeProps) {
  const variantStyles = {
    primary: 'bg-primary-100 text-primary-700',
    secondary: 'bg-gray-100 text-gray-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-amber-100 text-amber-700',
    error: 'bg-red-100 text-red-700',
  };

  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  };

  return (
    <span
      className={clsx(
        'inline-block rounded-full font-semibold uppercase tracking-wide',
        variantStyles[variant],
        sizeStyles[size],
      )}
    >
      {children}
    </span>
  );
}
```

**Uso:**
```jsx
<Badge variant="primary" size="sm">ARTIGO</Badge>
<Badge variant="secondary">01</Badge>
```

---

## Componente 4: Link com Arrow

**Arquivo:** `apps/website/src/components/ui/LinkArrow.tsx`

```typescript
import Link from 'next/link';
import clsx from 'clsx';

interface LinkArrowProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}

export function LinkArrow({
  href,
  children,
  external = false,
  className,
}: LinkArrowProps) {
  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={clsx(
        'inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-200 group',
        className,
      )}
    >
      {children}
      <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
    </Link>
  );
}
```

**Uso:**
```jsx
<LinkArrow href="/tecnologias">Ver todas as tecnologias</LinkArrow>
```

---

## Componente 5: Image com Fallback

**Arquivo:** `apps/website/src/components/ui/Image.tsx`

```typescript
import NextImage from 'next/image';
import { useState } from 'react';
import clsx from 'clsx';

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
}

export function Image({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  objectFit = 'cover',
}: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={clsx(
          'bg-gray-200 flex items-center justify-center',
          className,
        )}
        style={{ aspectRatio: `${width}/${height}` }}
      >
        <span className="text-gray-500 text-sm">Imagem indisponível</span>
      </div>
    );
  }

  return (
    <div className={clsx('relative overflow-hidden bg-gray-100', className)}>
      <NextImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        className={clsx(
          'transition-all duration-700 ease-in-out',
          isLoading ? 'scale-110 blur-sm' : 'scale-100 blur-0',
          `object-${objectFit}`,
        )}
      />
    </div>
  );
}
```

---

## Componente 6: Section

**Arquivo:** `apps/website/src/components/ui/Section.tsx`

```typescript
import clsx from 'clsx';
import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'light' | 'dark';
}

export function Section({ children, className, variant = 'default' }: SectionProps) {
  const variantStyles = {
    default: 'bg-white',
    light: 'bg-gray-50',
    dark: 'bg-gray-900 text-white',
  };

  return (
    <section
      className={clsx(
        'py-16 md:py-20 lg:py-24',
        variantStyles[variant],
        className,
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
```

---

## Componente 7: Grid

**Arquivo:** `apps/website/src/components/ui/Grid.tsx`

```typescript
import clsx from 'clsx';
import { ReactNode } from 'react';

interface GridProps {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Grid({
  children,
  cols = 3,
  gap = 'md',
  className,
}: GridProps) {
  const colsMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  const gapMap = {
    sm: 'gap-4',
    md: 'gap-6 md:gap-8',
    lg: 'gap-8 md:gap-10 lg:gap-12',
  };

  return (
    <div className={clsx('grid', colsMap[cols], gapMap[gap], className)}>
      {children}
    </div>
  );
}
```

---

## Componente 8: Container

**Arquivo:** `apps/website/src/components/common/Container.tsx`

```typescript
import clsx from 'clsx';
import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'full';
}

export function Container({ children, className, size = 'lg' }: ContainerProps) {
  const sizeMap = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    full: 'w-full',
  };

  return (
    <div className={clsx('mx-auto px-4 md:px-6 lg:px-8', sizeMap[size], className)}>
      {children}
    </div>
  );
}
```

---

# 🏗️ LAYOUT COMPONENTS

## Componente 9: Header + Navbar

**Arquivo:** `apps/website/src/components/common/Header.tsx`

```typescript
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Megamenu } from './Megamenu';
import clsx from 'clsx';

const menuItems = [
  { label: 'SOBRE', href: '#' },
  { label: 'TECNOLOGIAS', href: '#', hasDropdown: true },
  { label: 'APLICAÇÕES', href: '#', hasDropdown: true },
  { label: 'INGREDIENTES', href: '#', hasDropdown: true },
  { label: 'CONTEÚDO TÉCNICO', href: '#', hasDropdown: true },
  { label: 'PARCEIROS', href: '#', hasDropdown: true },
  { label: 'CONTATO', href: '#', hasDropdown: true },
];

export function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 bg-primary-600 rounded-full" />
          <span>LIPID</span>
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={clsx(
                  'text-sm font-medium transition-colors pb-2',
                  activeDropdown === item.label
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-600 hover:text-gray-900',
                )}
              >
                {item.label}
              </button>

              {/* Megamenu */}
              {item.hasDropdown && activeDropdown === item.label && (
                <Megamenu section={item.label} />
              )}
            </div>
          ))}
        </nav>

        {/* CTA Button */}
        <Button variant="primary" size="lg" href="/contato">
          Fale com um especialista
        </Button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="w-6 h-0.5 bg-gray-900" />
          <div className="w-6 h-0.5 bg-gray-900" />
          <div className="w-6 h-0.5 bg-gray-900" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-gray-50 border-t border-gray-200 p-4 space-y-3">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block text-sm font-medium text-gray-900 hover:text-primary-600 py-2"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
```

---

## Componente 10: Megamenu

**Arquivo:** `apps/website/src/components/common/Megamenu.tsx`

```typescript
import { LinkArrow } from '@/components/ui/LinkArrow';

interface MegamenuProps {
  section: string;
}

const megamenuContent = {
  TECNOLOGIAS: {
    title: 'Tecnologia lipídica em escala industrial.',
    description:
      'Explore nosso portfólio de tecnologias — ciência aplicada, qualidade farmacêutica e desempenho validado para indústrias regulamentadas.',
    ctaText: 'CONHECER PLATAFORMA',
    ctaHref: '/tecnologias',
    left: {
      items: [
        { icon: '○', name: 'Lipossomas', desc: 'Vesículas para entrega ativa' },
        { icon: '●', name: 'Encapsulação', desc: 'Proteção e estabilização' },
        { icon: '⬡', name: 'Fosfolipídios', desc: 'Estruturas biomimética' },
        { icon: '◆', name: 'Delivery Systems', desc: 'Sistemas avançados' },
      ],
    },
  },
  APLICAÇÕES: {
    title: 'Soluções para múltiplas indústrias.',
    description: 'Ingredientes especializados para cosméticos, farmacêutica, nutracêuticos e veterinária.',
    ctaText: 'CONHEÇA NOSSAS APLICAÇÕES',
    ctaHref: '/aplicacoes',
    left: {
      items: [
        { icon: '💊', name: 'Farmacêutica', desc: 'Entrega controlada' },
        { icon: '✨', name: 'Cosméticos', desc: 'Fórmulas premium' },
        { icon: '🥗', name: 'Nutracêutica', desc: 'Nutrientes protegidos' },
        { icon: '🐾', name: 'Veterinária', desc: 'Saúde animal' },
      ],
    },
  },
  INGREDIENTES: {
    title: 'Ingredientes de alta performance.',
    description: 'Fornecedores de referência em matérias-primas de qualidade.',
    ctaText: 'EXPLORAR INGREDIENTES',
    ctaHref: '/ingredientes',
    left: {
      items: [
        { name: 'Lipoid (Suíça)', desc: 'Líderes em fosfolipídios' },
        { name: 'Readline (Alemanha)', desc: 'Inovação em biotecnologia' },
      ],
    },
  },
  'CONTEÚDO TÉCNICO': {
    title: 'Recurso técnico e científico.',
    description: 'Artigos, whitepapers e FAQs sobre lipídios e tecnologias.',
    ctaText: 'ACESSAR BIBLIOTECA',
    ctaHref: '/conteudo',
    left: {
      items: [
        { name: 'Artigos', desc: 'Publicações científicas' },
        { name: 'Estudos', desc: 'Evidência clínica' },
        { name: 'FAQ', desc: 'Perguntas técnicas' },
      ],
    },
  },
};

export function Megamenu({ section }: MegamenuProps) {
  const content = megamenuContent[section as keyof typeof megamenuContent];

  if (!content) return null;

  return (
    <div className="absolute top-full left-0 right-0 bg-white shadow-lg mt-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 gap-12">
        {/* Left Column */}
        <div>
          <h3 className="text-xl font-bold mb-2">{content.title}</h3>
          <p className="text-gray-600 mb-6">{content.description}</p>
          <LinkArrow href={content.ctaHref}>{content.ctaText}</LinkArrow>
        </div>

        {/* Right Column */}
        <div className="grid grid-cols-2 gap-6">
          {content.left.items.map((item, idx) => (
            <div key={idx} className="space-y-2">
              {item.icon && <div className="text-2xl">{item.icon}</div>}
              <h4 className="font-semibold text-gray-900">{item.name}</h4>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

## Componente 11: Footer

**Arquivo:** `apps/website/src/components/common/Footer.tsx`

```typescript
'use client';

import Link from 'next/link';
import { Container } from './Container';

const footerLinks = {
  navegacao: [
    { label: 'Sobre', href: '#' },
    { label: 'Tecnologias', href: '#' },
    { label: 'Aplicações', href: '#' },
    { label: 'Ingredientes', href: '#' },
    { label: 'Conteúdo', href: '#' },
    { label: 'Parceiros', href: '#' },
    { label: 'Contato', href: '#' },
  ],
  tecnologias: [
    { label: 'Lipossomas', href: '#' },
    { label: 'Encapsulação', href: '#' },
    { label: 'Fosfolipídios', href: '#' },
    { label: 'Sistemas de delivery', href: '#' },
    { label: 'Emulsificantes', href: '#' },
  ],
  aplicacoes: [
    { label: 'Farma', href: '#' },
    { label: 'Cosméticos', href: '#' },
    { label: 'Nutricional', href: '#' },
    { label: 'Veterinária', href: '#' },
  ],
};

export function Footer() {
  return (
    <>
      {/* Main Footer */}
      <footer className="bg-white border-t border-gray-200">
        <Container className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12">
            {/* Col 1: Logo + Tagline */}
            <div>
              <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-4">
                <div className="w-8 h-8 bg-primary-600 rounded-full" />
                <span>LIPID</span>
              </Link>
              <p className="text-sm text-gray-600 mb-4">
                Ciência, tecnologia e ingredientes de alta performance para transformar formulações em resultados.
              </p>
              <Link href="#" className="text-primary-600 hover:text-primary-700">
                LinkedIn
              </Link>
            </div>

            {/* Col 2: Navegação */}
            <div>
              <h4 className="text-xs font-bold uppercase text-gray-500 mb-4">Navegação</h4>
              <ul className="space-y-2">
                {footerLinks.navegacao.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-gray-600 hover:text-primary-600">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Tecnologias */}
            <div>
              <h4 className="text-xs font-bold uppercase text-gray-500 mb-4">Tecnologias</h4>
              <ul className="space-y-2">
                {footerLinks.tecnologias.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-gray-600 hover:text-primary-600">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Aplicações */}
            <div>
              <h4 className="text-xs font-bold uppercase text-gray-500 mb-4">Aplicações</h4>
              <ul className="space-y-2">
                {footerLinks.aplicacoes.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-gray-600 hover:text-primary-600">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 5: Contato */}
            <div>
              <h4 className="text-xs font-bold uppercase text-gray-500 mb-4">Entre em Contato</h4>
              <ul className="space-y-3">
                <li>
                  <a href="tel:+551640566667" className="text-sm text-gray-600 hover:text-primary-600 flex items-center gap-2">
                    <span>📞</span> +55 16 14056-667
                  </a>
                </li>
                <li>
                  <a href="mailto:contato@lipid.com.br" className="text-sm text-gray-600 hover:text-primary-600 flex items-center gap-2">
                    <span>✉️</span> contato@lipid.com.br
                  </a>
                </li>
                <li>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <span>📍</span>
                    <span>
                      Supera Parque Tecnológico<br />
                      Ribeirão Preto — SP
                    </span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </footer>

      {/* Dark Footer */}
      <div className="bg-sidebar text-white">
        <Container className="py-6 flex flex-col md:flex-row justify-between items-center text-sm gap-4">
          <p>© 2026 Lipid Ingredients. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary-400">
              Política de Privacidade
            </Link>
            <span className="text-gray-600">Desenvolvido com excelência</span>
          </div>
        </Container>
      </div>
    </>
  );
}
```

---

# 📄 SEÇÕES DA HOMEPAGE

## Seção 1: Hero

**Arquivo:** `apps/website/src/components/sections/HeroSection.tsx`

```typescript
'use client';

import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { LinkArrow } from '@/components/ui/LinkArrow';
import { Image } from '@/components/ui/Image';

export function HeroSection() {
  return (
    <Section className="!py-24 md:!py-32 lg:!py-40 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <div className="space-y-6">
          <Badge variant="primary">LIPID TECHNOLOGY PLATFORM</Badge>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Ciência que transforma <span className="text-primary-600">formulações</span> em <em>performance</em>.
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed">
            Ingredientes inovadores, tecnologias avançadas e suporte técnico especializado para as indústrias farmacêutica, cosmética, nutricional e veterinária.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" size="xl" href="/tecnologias">
              Nossas tecnologias
            </Button>
            <LinkArrow href="/contato">Fale com um especialista</LinkArrow>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="relative h-96 md:h-full md:min-h-96">
          <Image
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=600&fit=crop"
            alt="Molécula de lipossoma"
            width={600}
            height={600}
            priority
            className="w-full h-full"
          />
        </div>
      </div>
    </Section>
  );
}
```

---

## Seção 2: Features

**Arquivo:** `apps/website/src/components/sections/FeaturesSection.tsx`

```typescript
'use client';

import { Section } from '@/components/ui/Section';
import { Grid } from '@/components/ui/Grid';
import { Card } from '@/components/ui/Card';

const features = [
  {
    icon: '🧪',
    title: 'Inovação científica em lipídios',
    description: 'Pesquisa contínua e desenvolvimento de tecnologias avançadas.',
  },
  {
    icon: '✅',
    title: 'Qualidade e segurança comprovadas',
    description: 'Padrões farmacêuticos de excelência em todos os produtos.',
  },
  {
    icon: '🌍',
    title: 'Parcerias globais estratégicas',
    description: 'Colaborações com líderes em tecnologia lipídica mundial.',
  },
  {
    icon: '⚡',
    title: 'Soluções personalizadas por aplicação',
    description: 'Formulas desenvolvidas conforme necessidades específicas.',
  },
];

export function FeaturesSection() {
  return (
    <Section>
      <Grid cols={4} gap="lg">
        {features.map((feature, idx) => (
          <Card key={idx} className="text-center">
            <div className="text-5xl mb-4">{feature.icon}</div>
            <h3 className="font-bold mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
```

---

## Seção 3: Aplicações

**Arquivo:** `apps/website/src/components/sections/ApplicationsSection.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';
import { Section } from '@/components/ui/Section';
import { Grid } from '@/components/ui/Grid';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LinkArrow } from '@/components/ui/LinkArrow';
import { Image } from '@/components/ui/Image';
import { api } from '@/lib/api';

interface Application {
  id: string;
  name: string;
  slug: string;
  excerpt: string;
  banner?: string;
}

export function ApplicationsSection() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApplications() {
      try {
        const response = await api.get('/applications?take=4');
        setApplications(response.data);
      } catch (error) {
        console.error('Erro ao buscar aplicações:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchApplications();
  }, []);

  if (loading) {
    return <Section>Carregando...</Section>;
  }

  return (
    <Section variant="light">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Left Column */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              Soluções que impulsionam inovação em diversas indústrias
            </h2>

            <p className="text-lg text-gray-600">
              Atuamos com ingredientes especializados e tecnologias avançadas que elevam o desempenho, a estabilidade e a eficácia de formulações em múltiplos segmentos.
            </p>

            <LinkArrow href="/aplicacoes">Conheça nossas aplicações</LinkArrow>
          </div>
        </div>

        {/* Right Column - Cards Grid (2x2) */}
        <Grid cols={2} gap="lg">
          {applications.map((app, idx) => (
            <Card key={app.id} className="overflow-hidden hover:shadow-xl transition-shadow">
              {app.banner && (
                <div className="h-48 relative mb-4">
                  <Image
                    src={app.banner}
                    alt={app.name}
                    width={400}
                    height={300}
                    className="w-full h-full"
                  />
                </div>
              )}

              <div className="p-6 space-y-3">
                <Badge variant="secondary" size="sm">
                  {idx + 1:02d}
                </Badge>
                <h3 className="text-xl font-bold">{app.name}</h3>
                <p className="text-sm text-gray-600">{app.excerpt}</p>
                <LinkArrow href={`/aplicacoes/${app.slug}`}>Explorar</LinkArrow>
              </div>
            </Card>
          ))}
        </Grid>
      </div>
    </Section>
  );
}
```

---

## Seção 4: Tecnologias

**Arquivo:** `apps/website/src/components/sections/TechnologiesSection.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';
import { Section } from '@/components/ui/Section';
import { Grid } from '@/components/ui/Grid';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LinkArrow } from '@/components/ui/LinkArrow';
import { Image } from '@/components/ui/Image';
import { api } from '@/lib/api';

interface Technology {
  id: string;
  name: string;
  slug: string;
  excerpt: string;
  icon?: string;
}

export function TechnologiesSection() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTechnologies() {
      try {
        const response = await api.get('/technologies?take=3');
        setTechnologies(response.data);
      } catch (error) {
        console.error('Erro ao buscar tecnologias:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTechnologies();
  }, []);

  if (loading) {
    return <Section>Carregando...</Section>;
  }

  return (
    <Section>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Left Column */}
          <div className="space-y-6">
            <Badge variant="primary">PLATAFORMAS CIENTÍFICAS</Badge>

            <h2 className="text-4xl md:text-5xl font-bold">
              Tecnologias de ponta baseadas em lipídios
            </h2>

            <p className="text-lg text-gray-600">
              Plataformas tecnológicas que garantem estabilidade, biodisponibilidade e eficácia para sistemas de entrega avançados e formulações de alta performance.
            </p>

            <LinkArrow href="/tecnologias">Ver todas as tecnologias</LinkArrow>
          </div>
        </div>

        {/* Right Column - 3 Cards in line */}
        <Grid cols={3} gap="lg">
          {technologies.map((tech, idx) => (
            <Card key={tech.id} className="space-y-4">
              {tech.icon && (
                <div className="h-40 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-6xl">{tech.icon}</div>
                </div>
              )}

              <div className="space-y-2">
                <Badge variant="secondary" size="sm">
                  T-{idx + 1:02d}
                </Badge>
                <h3 className="text-xl font-bold">{tech.name}</h3>
                <p className="text-sm text-gray-600">{tech.excerpt}</p>
              </div>

              <LinkArrow href={`/tecnologias/${tech.slug}`}>Saiba mais</LinkArrow>
            </Card>
          ))}
        </Grid>
      </div>
    </Section>
  );
}
```

---

## Seção 5: Parceiros

**Arquivo:** `apps/website/src/components/sections/PartnersSection.tsx`

```typescript
'use client';

import { Section } from '@/components/ui/Section';
import { Image } from '@/components/ui/Image';

const partners = [
  {
    name: 'Lipoid',
    country: 'Suíça',
    description: 'We invest in quality',
    logo: 'https://via.placeholder.com/200x100',
  },
  {
    name: 'Readline',
    country: 'Biotecnologia',
    description: 'Innovation in bio',
    logo: 'https://via.placeholder.com/200x100',
  },
];

export function PartnersSection() {
  return (
    <Section variant="light">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase text-primary-600 mb-2">PARCERIAS GLOBAIS</h3>
            <h2 className="text-4xl md:text-5xl font-bold">
              Parcerias que geram valor
            </h2>

            <p className="text-lg text-gray-600">
              Representamos com exclusividade no Brasil empresas globais líderes em ciência e inovação em lipídios.
            </p>
          </div>

          {/* Right Column - Partners Logos */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-center">
            {partners.map((partner) => (
              <div key={partner.name} className="text-center">
                <div className="h-20 mb-4 flex items-center justify-center">
                  <div className="text-6xl">🏢</div>
                </div>
                <h4 className="font-bold text-lg mb-1">{partner.name}</h4>
                <p className="text-sm text-gray-600">{partner.country.toUpperCase()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
```

---

## Seção 6: Conteúdo Técnico

**Arquivo:** `apps/website/src/components/sections/ContentSection.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';
import { Section } from '@/components/ui/Section';
import { Grid } from '@/components/ui/Grid';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LinkArrow } from '@/components/ui/LinkArrow';
import { Image } from '@/components/ui/Image';
import { api } from '@/lib/api';

interface Content {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  banner?: string;
}

export function ContentSection() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await api.get('/content?take=3');
        setContents(response.data);
      } catch (error) {
        console.error('Erro ao buscar conteúdo:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, []);

  if (loading) {
    return <Section>Carregando...</Section>;
  }

  return (
    <Section>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Left Column */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase text-primary-600 mb-2">CONHECIMENTO APLICADO</h3>
            <h2 className="text-4xl md:text-5xl font-bold">
              Conteúdo técnico e científico
            </h2>

            <p className="text-lg text-gray-600">
              Explore nossos artigos, estudos e materiais técnicos sobre lipídios, tecnologias e aplicações.
            </p>

            <LinkArrow href="/conteudo">Acessar biblioteca</LinkArrow>
          </div>
        </div>

        {/* Right Column - Content Cards */}
        <Grid cols={3} gap="lg">
          {contents.map((content) => (
            <Card key={content.id} className="space-y-4 overflow-hidden hover:shadow-xl transition-shadow">
              {content.banner && (
                <div className="h-40 relative">
                  <Image
                    src={content.banner}
                    alt={content.title}
                    width={400}
                    height={300}
                    className="w-full h-full"
                  />
                </div>
              )}

              <div className="p-4 space-y-3">
                <Badge variant="secondary" size="sm">ARTIGO</Badge>
                <h3 className="text-lg font-bold line-clamp-2">{content.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3">{content.excerpt}</p>
                <LinkArrow href={`/conteudo/${content.slug}`}>Ler artigo</LinkArrow>
              </div>
            </Card>
          ))}
        </Grid>
      </div>
    </Section>
  );
}
```

---

# 🌐 INTEGRAÇÃO API

## API Client

**Arquivo:** `apps/website/src/lib/api.ts`

```typescript
import axios, { AxiosInstance } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
const API_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000');

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: `${API_URL}/api/v1`,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para erros
    this.client.interceptors.response.use(
      (response) => response.data,
      (error) => {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
      },
    );
  }

  async get<T>(endpoint: string, params?: any): Promise<T> {
    return this.client.get<T>(endpoint, { params });
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.client.post<T>(endpoint, data);
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.client.put<T>(endpoint, data);
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.client.delete<T>(endpoint);
  }
}

export const api = new ApiClient();
```

---

## Tipos da API

**Arquivo:** `apps/website/src/types/api.ts`

```typescript
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

export interface ApiResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
```

---

# 🏠 HOMEPAGE COMPLETA

**Arquivo:** `apps/website/src/app/page.tsx`

```typescript
import { DefaultSeo } from 'next-seo';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { ApplicationsSection } from '@/components/sections/ApplicationsSection';
import { TechnologiesSection } from '@/components/sections/TechnologiesSection';
import { PartnersSection } from '@/components/sections/PartnersSection';
import { ContentSection } from '@/components/sections/ContentSection';

export const metadata = {
  title: 'Daksa - Inovação em Lipídios',
  description: 'Tecnologias avançadas em lipídios para cosméticos, farmacêutica e nutracêuticos.',
  robots: 'index, follow',
  openGraph: {
    title: 'Daksa - Inovação em Lipídios',
    description: 'Tecnologias avançadas em lipídios para cosméticos, farmacêutica e nutracêuticos.',
    url: 'https://daksa.app.br',
    siteName: 'Daksa',
    type: 'website',
  },
};

export default function Home() {
  return (
    <>
      <DefaultSeo
        titleTemplate="%s | Daksa"
        defaultTitle="Daksa - Inovação em Lipídios"
        description="Tecnologias avançadas em lipídios para cosméticos, farmacêutica e nutracêuticos."
        canonical="https://daksa.app.br"
        openGraph={{
          type: 'website',
          locale: 'pt_BR',
          url: 'https://daksa.app.br',
          siteName: 'Daksa',
        }}
      />

      <Header />

      <main>
        <HeroSection />
        <FeaturesSection />
        <ApplicationsSection />
        <TechnologiesSection />
        <PartnersSection />
        <ContentSection />
      </main>

      <Footer />
    </>
  );
}
```

---

# 🗓️ TIMELINE DIA-A-DIA

## DIA 1 (Segunda) - Setup + Design System
- ⏰ 1h: Setup Next.js + Tailwind
- ⏰ 1.5h: Tailwind config + Design system
- ⏰ 1h: CSS globals + Tipografia
- ⏰ 0.5h: Commit
- **Checkpoint:** Projeto estruturado, cores/tipografia prontas

## DIA 2 (Terça) - Componentes Base
- ⏰ 2h: Criar componentes (Button, Card, Badge, Link)
- ⏰ 1h: Container + Section + Grid
- ⏰ 1h: Image com fallback
- **Checkpoint:** 7 componentes reutilizáveis prontos

## DIA 3 (Quarta) - Header + Footer
- ⏰ 2h: Header com navbar
- ⏰ 2h: Megamenu interativo
- ⏰ 2h: Footer com 5 colunas
- **Checkpoint:** Header e Footer 100% funcionais

## DIA 4 (Quinta) - Seção Hero + Features
- ⏰ 1.5h: Hero Section
- ⏰ 1h: Features Section (4 cards)
- ⏰ 1h: Testes responsivos
- **Checkpoint:** 2 seções completas

## DIA 5 (Sexta) - Aplicações + Tecnologias
- ⏰ 1.5h: Applications Section (grid 2x2 + API)
- ⏰ 1.5h: Technologies Section (3 cards + API)
- ⏰ 1h: Integração API real
- **Checkpoint:** Seções dinâmicas buscando dados do backend

## DIA 6 (Segunda) - Parceiros + Conteúdo
- ⏰ 1h: Partners Section
- ⏰ 1.5h: Content Section (3 cards)
- ⏰ 1h: Testes integração API
- **Checkpoint:** Todas seções completas

## DIA 7 (Terça) - Homepage + Responsividade
- ⏰ 1h: Montar página completa (page.tsx)
- ⏰ 2h: Testes responsividade (mobile/tablet)
- ⏰ 1h: Ajustes finais
- **Checkpoint:** Homepage 100% responsiva

## DIA 8 (Quarta) - Performance + SEO
- ⏰ 1.5h: Next.js SEO (next-seo)
- ⏰ 1h: Lighthouse audit
- ⏰ 1.5h: Performance optimizations
- **Checkpoint:** Lighthouse > 85

## DIA 9 (Quinta) - Testes + Deployment
- ⏰ 1.5h: Testes em navegadores
- ⏰ 1h: Testes em dispositivos reais
- ⏰ 1h: Deploy no Coolify
- **Checkpoint:** Website rodando em produção

## DIA 10 (Sexta) - Finalização
- ⏰ 1h: Ajustes em produção
- ⏰ 1h: Documentação
- ⏰ 1h: Cleanup + commits
- **Checkpoint:** 🎉 HOMEPAGE COMPLETA E EM PRODUÇÃO

---

# 🧪 TESTES

## Verificar Componentes

```bash
# Layout components
☑ Header renderiza corretamente
☑ Megamenu abre/fecha ao hover
☑ Mobile menu funciona
☑ Footer com 5 colunas
☑ Links funcionam

# Componentes UI
☑ Button com variantes
☑ Card com hover
☑ Badge mostrando
☑ Image com fallback
☑ Section padding correto

# Seções
☑ Hero com imagem
☑ Features 4 cards
☑ Applications 2x2 grid (dados da API)
☑ Technologies 3 cards (dados da API)
☑ Partners logos
☑ Content 3 cards (dados da API)
```

## Testes Responsivos

```bash
# Desktop (1200px+)
☑ Layouts 2 col/3 col/4 col
☑ Megamenu aparece ao hover
☑ Espaçamento correto

# Tablet (768px)
☑ Layouts stackam corretamente
☑ Mobile menu escondido
☑ Cards em 2 colunas
☑ Tipografia reduzida proporcionalmente

# Mobile (< 768px)
☑ Layouts 1 coluna
☑ Mobile menu visível
☑ Hero stackado
☑ Cards ocupam 100%
☑ Tipografia mobile OK
☑ Touch targets > 48px
```

## Performance

```bash
# Lighthouse
☑ Performance > 85
☑ Accessibility > 90
☑ Best Practices > 85
☑ SEO > 90

# Web Vitals
☑ LCP < 2.5s
☑ FID < 100ms
☑ CLS < 0.1
```

---

# 🚨 TROUBLESHOOTING

## Problema: Megamenu não aparece

**Solução:**
```
1. Verificar z-index (deve ser > 50)
2. Verificar onMouseEnter está funcionando
3. Verificar se section existe em megamenuContent
4. Adicionar console.log para debug
```

## Problema: Imagens não carregam da API

**Solução:**
```
1. Verificar NEXT_PUBLIC_API_URL está correto
2. Verificar se backend está rodando
3. Verificar CORS está configurado
4. Testar endpoint com curl/Postman
5. Verificar se banner_url vem na resposta
```

## Problema: Responsivo quebrado

**Solução:**
```
1. Verificar grid cols: { 1: 'grid-cols-1', 2: 'grid-cols-1 md:grid-cols-2' }
2. Testar com DevTools (mobile view)
3. Verificar padding px-4 em mobile
4. Verificar font-size é relativo
```

## Problema: Lighthouse score baixo

**Solução:**
```
1. Lazy load imagens (Priority = false por padrão)
2. Minify CSS/JS (Tailwind já faz)
3. Remover unused packages
4. Adicionar next/image para otimização
5. Usar WebP para imagens
```

---

## ✅ CHECKLIST FINAL

```
SETUP:
☑ Next.js instalado e rodando
☑ Tailwind configurado
☑ .env.local com API_URL

COMPONENTES:
☑ 8+ componentes reutilizáveis criados
☑ Header com megamenu
☑ Footer estruturado

SEÇÕES:
☑ Hero section complete
☑ Features section (4 cards)
☑ Applications section (dinâmico)
☑ Technologies section (dinâmico)
☑ Partners section
☑ Content section (dinâmico)

INTEGRAÇÃO:
☑ API client configurado
☑ Endpoints consumindo dados reais
☑ Error handling implementado

QUALIDADE:
☑ Responsivo (mobile/tablet/desktop)
☑ Lighthouse > 85
☑ Sem console errors
☑ Tipos TypeScript ok

DEPLOYMENT:
☑ Deploy no Coolify
☑ Domínio configurado
☑ HTTPS funcionando
☑ Em produção
```

---

**Pronto para começar com Claude Code! 🚀**

Documento pronto com TUDO que precisa!
