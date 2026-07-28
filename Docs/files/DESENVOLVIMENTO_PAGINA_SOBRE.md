# 🏢 DESENVOLVIMENTO PÁGINA SOBRE
## About Page com Missão, Visão, Valores, Time

**Status:** Módulo 4 de 6  
**Escopo:** Página sobre com seções estruturadas  
**Tempo:** 4-6 horas  
**Dependência:** Componentes de listagem  

---

## 📋 ÍNDICE

1. [Visão Geral](#visão-geral)
2. [Componentes de About](#componentes-de-about)
3. [Página Completa](#página-completa)
4. [Seções](#seções)
5. [Team Section](#team-section)
6. [Testes](#testes)

---

## 🎯 VISÃO GERAL

```
PÁGINA: /sobre
┌─────────────────────────────────────┐
│ Hero Section                        │
│ Título + Imagem                     │
├─────────────────────────────────────┤
│ Missão, Visão, Valores (3 cards)    │
├─────────────────────────────────────┤
│ História (timeline ou narrativa)    │
├─────────────────────────────────────┤
│ Time Section (team members cards)   │
├─────────────────────────────────────┤
│ Números/Métricas                    │
├─────────────────────────────────────┤
│ Parcerias/Certificados              │
├─────────────────────────────────────┤
│ CTA: Fale conosco                   │
└─────────────────────────────────────┘
```

---

## 🧩 COMPONENTES DE ABOUT

### Componente 1: ValueCard

**Arquivo:** `apps/website/src/components/ui/ValueCard.tsx`

```typescript
import { ReactNode } from 'react';

interface ValueCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function ValueCard({ icon, title, description }: ValueCardProps) {
  return (
    <div className="space-y-4 text-center">
      <div className="flex justify-center">
        <div className="text-5xl">{icon}</div>
      </div>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
```

---

### Componente 2: TeamMemberCard

**Arquivo:** `apps/website/src/components/ui/TeamMemberCard.tsx`

```typescript
import { Image } from '@/components/ui/Image';

interface TeamMemberCardProps {
  name: string;
  role: string;
  bio?: string;
  image?: string;
  social?: {
    linkedin?: string;
    email?: string;
  };
}

export function TeamMemberCard({
  name,
  role,
  bio,
  image,
  social,
}: TeamMemberCardProps) {
  return (
    <div className="space-y-4 text-center">
      {image && (
        <div className="h-64 rounded-lg overflow-hidden bg-gray-200">
          <Image
            src={image}
            alt={name}
            width={300}
            height={300}
            className="w-full h-full"
          />
        </div>
      )}

      <div className="space-y-2">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-primary-600 font-semibold">{role}</p>
        {bio && <p className="text-sm text-gray-600">{bio}</p>}
      </div>

      {social && (
        <div className="flex justify-center gap-4">
          {social.linkedin && (
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn →
            </a>
          )}
          {social.email && (
            <a href={`mailto:${social.email}`}>
              Email
            </a>
          )}
        </div>
      )}
    </div>
  );
}
```

---

### Componente 3: MetricCard

**Arquivo:** `apps/website/src/components/ui/MetricCard.tsx`

```typescript
interface MetricCardProps {
  value: string;
  label: string;
  description?: string;
}

export function MetricCard({ value, label, description }: MetricCardProps) {
  return (
    <div className="text-center space-y-2">
      <div className="text-4xl md:text-5xl font-bold text-primary-600">
        {value}
      </div>
      <h4 className="text-lg font-semibold">{label}</h4>
      {description && <p className="text-sm text-gray-600">{description}</p>}
    </div>
  );
}
```

---

### Componente 4: TimelineItem

**Arquivo:** `apps/website/src/components/ui/TimelineItem.tsx`

```typescript
interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  side?: 'left' | 'right';
}

export function TimelineItem({
  year,
  title,
  description,
  side = 'left',
}: TimelineItemProps) {
  return (
    <div className={`flex gap-8 items-center mb-12 ${side === 'right' ? 'flex-row-reverse' : ''}`}>
      {/* Left: Content */}
      <div className="flex-1 space-y-2">
        <h4 className="text-2xl font-bold text-primary-600">{year}</h4>
        <h5 className="text-xl font-semibold">{title}</h5>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* Center: Timeline dot */}
      <div className="flex flex-col items-center">
        <div className="w-4 h-4 bg-primary-600 rounded-full"></div>
        <div className="w-1 h-16 bg-primary-200"></div>
      </div>

      {/* Right: Spacer */}
      <div className="flex-1 hidden md:block"></div>
    </div>
  );
}
```

---

## 📱 PÁGINA SOBRE COMPLETA

**Arquivo:** `apps/website/src/app/sobre/page.tsx`

```typescript
import { ListingHero } from '@/components/ui/ListingHero';
import { ValueCard } from '@/components/ui/ValueCard';
import { TeamMemberCard } from '@/components/ui/TeamMemberCard';
import { MetricCard } from '@/components/ui/MetricCard';
import { TimelineItem } from '@/components/ui/TimelineItem';
import { Grid } from '@/components/ui/Grid';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const metadata = {
  title: 'Sobre - Daksa',
  description: 'Conheça a missão, visão e valores da Daksa. Inovação em lipídios desde 2019.',
};

export default function AboutPage() {
  return (
    <>
      <ListingHero
        title="Sobre a Daksa"
        description="Inovação em lipídios. Ciência aplicada ao desempenho. Parcerias que transformam formulações em resultados de impacto."
        badge="SOBRE"
      />

      {/* Missão, Visão, Valores */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Missão, Visão e Valores
          </h2>

          <Grid cols={3} gap="lg">
            <ValueCard
              icon="🎯"
              title="Missão"
              description="Impulsionar inovação em formulas através de tecnologias lipídicas avançadas, científicas e de alto desempenho para indústrias regulamentadas."
            />

            <ValueCard
              icon="🚀"
              title="Visão"
              description="Ser referência global em tecnologias lipídicas, conectando ciência, ingredientes e soluções que transformam formulações."
            />

            <ValueCard
              icon="💎"
              title="Valores"
              description="Excelência científica, inovação contínua, integridade nas parcerias, e compromisso com desempenho e qualidade."
            />
          </Grid>
        </div>
      </section>

      {/* Historia */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-16">Nossa História</h2>

          <div className="space-y-12">
            <TimelineItem
              year="2019"
              title="Fundação da Daksa"
              description="Iniciativa de especialistas em ciência de lipídios com visão de transformar o mercado de ingredientes de alto desempenho no Brasil."
              side="left"
            />

            <TimelineItem
              year="2020"
              title="Primeira Parceria Global"
              description="Estabelecimento de parceria exclusiva com Lipoid (Suíça), referência mundial em fosfolipídios farmacêuticos."
              side="right"
            />

            <TimelineItem
              year="2021"
              title="Certificações e Validações"
              description="Obtenção de certificações internacionais e validação de tecnologias em múltiplas aplicações."
              side="left"
            />

            <TimelineItem
              year="2022"
              title="Expansão de Portfólio"
              description="Lançamento de múltiplas plataformas tecnológicas e ampliação de atuação em segmentos pharma, cosméticos e nutracêuticos."
              side="right"
            />

            <TimelineItem
              year="2023"
              title="Reconhecimento no Mercado"
              description="Consolidação como referência técnica em lipídios no Brasil, com crescimento de 150% em parcerias e projetos."
              side="left"
            />

            <TimelineItem
              year="2024"
              title="Plataforma Digital"
              description="Lançamento de portal web com acesso a catálogo completo, documentação técnica e sistema de leads integrado."
              side="right"
            />
          </div>
        </div>
      </section>

      {/* Números */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Por Números
          </h2>

          <Grid cols={4} gap="lg">
            <MetricCard
              value="50+"
              label="Parceiros"
              description="Empresas confiando em nossas tecnologias"
            />

            <MetricCard
              value="100+"
              label="Projetos"
              description="Implementações bem-sucedidas"
            />

            <MetricCard
              value="15+"
              label="Tecnologias"
              description="Plataformas validadas"
            />

            <MetricCard
              value="24h"
              label="Suporte"
              description="Disponível para especialistas"
            />
          </Grid>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Nosso Time
          </h2>

          <Grid cols={3} gap="lg">
            <TeamMemberCard
              name="Dr. Marcus Silva"
              role="Fundador & CEO"
              bio="PhD em Biotecnologia, 15+ anos em lipídios"
              image="https://via.placeholder.com/300x300"
              social={{
                linkedin: 'https://linkedin.com',
                email: 'marcus@daksa.com.br',
              }}
            />

            <TeamMemberCard
              name="Dra. Cristina Mendes"
              role="Diretora Técnica"
              bio="Especialista em formulação e validação"
              image="https://via.placeholder.com/300x300"
              social={{
                linkedin: 'https://linkedin.com',
                email: 'cristina@daksa.com.br',
              }}
            />

            <TeamMemberCard
              name="João Ferreira"
              role="Head de Parcerias"
              bio="15 anos em relacionamento B2B"
              image="https://via.placeholder.com/300x300"
              social={{
                linkedin: 'https://linkedin.com',
                email: 'joao@daksa.com.br',
              }}
            />

            <TeamMemberCard
              name="Marina Costa"
              role="Especialista Técnico"
              bio="Suporte e desenvolvimento de aplicações"
              image="https://via.placeholder.com/300x300"
              social={{
                linkedin: 'https://linkedin.com',
                email: 'marina@daksa.com.br',
              }}
            />

            <TeamMemberCard
              name="Pedro Santos"
              role="Pesquisador"
              bio="Inovação e P&D em lipídios"
              image="https://via.placeholder.com/300x300"
              social={{
                linkedin: 'https://linkedin.com',
                email: 'pedro@daksa.com.br',
              }}
            />

            <TeamMemberCard
              name="Ana Oliveira"
              role="Analista de Negócios"
              bio="Estratégia e desenvolvimento comercial"
              image="https://via.placeholder.com/300x300"
              social={{
                linkedin: 'https://linkedin.com',
                email: 'ana@daksa.com.br',
              }}
            />
          </Grid>
        </div>
      </section>

      {/* Certificações e Parceiros */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Certificações e Reconhecimentos
          </h2>

          <Grid cols={2} gap="lg">
            <Card className="space-y-4 text-center">
              <div className="text-5xl">🏆</div>
              <h4 className="font-bold">ISO 9001:2015</h4>
              <p className="text-sm text-gray-600">
                Gestão de Qualidade
              </p>
            </Card>

            <Card className="space-y-4 text-center">
              <div className="text-5xl">🧪</div>
              <h4 className="font-bold">GMP</h4>
              <p className="text-sm text-gray-600">
                Boas Práticas de Manufatura
              </p>
            </Card>

            <Card className="space-y-4 text-center">
              <div className="text-5xl">🔬</div>
              <h4 className="font-bold">ANVISA</h4>
              <p className="text-sm text-gray-600">
                Regulamentação Farmacêutica
              </p>
            </Card>

            <Card className="space-y-4 text-center">
              <div className="text-5xl">📋</div>
              <h4 className="font-bold">REACH</h4>
              <p className="text-sm text-gray-600">
                Conformidade Europeia
              </p>
            </Card>
          </Grid>
        </div>
      </section>

      {/* Compromisso */}
      <section className="py-16 md:py-20 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Nosso Compromisso com a Excelência
          </h2>

          <p className="text-lg text-primary-100">
            Cada tecnologia, cada ingrediente, cada parceria é desenvolvida com rigor científico,
            validação robusta e foco inquebrantável em desempenho e qualidade.
          </p>

          <div className="pt-6">
            <Button variant="secondary" size="lg" href="/contato">
              Fale com nossos especialistas
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
```

---

## 🧪 TESTES

```bash
# Componentes
☑ ValueCard renderiza
☑ TeamMemberCard com imagem
☑ MetricCard mostra números
☑ TimelineItem alternado

# Conteúdo
☑ Missão/Visão/Valores exibe
☑ Timeline mostra eventos
☑ Team cards mostram info
☑ Certificações exibem

# Responsividade
☑ Mobile: 1 coluna
☑ Tablet: 2 colunas
☑ Desktop: 3-4 colunas
☑ Timeline responsivo

# Acessibilidade
☑ Semântica HTML correta
☑ Contraste OK
☑ Links funcionam
☑ Sem console errors
```

---

## 📊 CHECKLIST

```
COMPONENTES:
☑ ValueCard criado
☑ TeamMemberCard criado
☑ MetricCard criado
☑ TimelineItem criado

PÁGINA:
☑ /sobre completa
☑ Todas seções renderizam
☑ Conteúdo correto
☑ Imagens carregam

QUALIDADE:
☑ Responsivo
☑ Performance OK
☑ SEO meta tags
☑ TypeScript ok
```

---

**Próximo: DESENVOLVIMENTO_COMPONENTES_AVANCADOS.md** 🚀
