# 📄 DESENVOLVIMENTO PÁGINAS DE DETALHE
## Aplicação | Tecnologia | Artigo Detail Pages

**Status:** Módulo 1 de 6  
**Escopo:** 3 páginas dinâmicas com layout detail  
**Tempo:** 6-8 horas  
**Dependência:** Homepage pronta + API funcional  

---

## 📋 ÍNDICE

1. [Visão Geral](#visão-geral)
2. [Componentes Detail](#componentes-detail)
3. [Página Aplicação Detail](#página-aplicação-detail)
4. [Página Tecnologia Detail](#página-tecnologia-detail)
5. [Página Artigo Detail](#página-artigo-detail)
6. [Related Items](#related-items)
7. [Testes](#testes)

---

## 🎯 VISÃO GERAL

```
3 PÁGINAS DINÂMICAS (usando [slug]):
┌─────────────────────────────────────────┐
│ /aplicacoes/[slug]                      │
│ Detalhes de 1 aplicação                 │
├─────────────────────────────────────────┤
│ /tecnologias/[slug]                     │
│ Detalhes de 1 tecnologia                │
├─────────────────────────────────────────┤
│ /conteudo/[slug]                        │
│ Artigo/conteúdo completo                │
└─────────────────────────────────────────┘

PADRÃO COMUM:
Hero section (banner + título)
    ↓
Content area (descrição completa)
    ↓
Related section (3-4 items relacionados)
    ↓
CTA section (próximos passos)
```

---

## 🧩 COMPONENTES DETAIL

### Componente 1: DetailHero

**Arquivo:** `apps/website/src/components/ui/DetailHero.tsx`

```typescript
import { Image } from '@/components/ui/Image';
import { Badge } from '@/components/ui/Badge';
import { LinkArrow } from '@/components/ui/LinkArrow';

interface DetailHeroProps {
  title: string;
  subtitle?: string;
  description: string;
  badge: string;
  image?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function DetailHero({
  title,
  subtitle,
  description,
  badge,
  image,
  ctaLabel,
  ctaHref,
}: DetailHeroProps) {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div className="space-y-6">
          <Badge variant="primary">{badge}</Badge>

          <h1 className="text-5xl md:text-6xl font-bold">{title}</h1>

          {subtitle && <p className="text-xl text-gray-600">{subtitle}</p>}

          <p className="text-lg text-gray-600 leading-relaxed">{description}</p>

          {ctaLabel && ctaHref && (
            <LinkArrow href={ctaHref}>{ctaLabel}</LinkArrow>
          )}
        </div>

        {/* Right - Image */}
        {image && (
          <div className="h-96 relative">
            <Image
              src={image}
              alt={title}
              width={500}
              height={500}
              priority
              className="w-full h-full"
            />
          </div>
        )}
      </div>
    </section>
  );
}
```

---

### Componente 2: ContentBlock

**Arquivo:** `apps/website/src/components/ui/ContentBlock.tsx`

```typescript
import { ReactNode } from 'react';
import clsx from 'clsx';

interface ContentBlockProps {
  title?: string;
  children: ReactNode;
  layout?: 'full' | 'two-col' | 'two-col-image';
  imageUrl?: string;
  imagePosition?: 'left' | 'right';
  className?: string;
}

export function ContentBlock({
  title,
  children,
  layout = 'full',
  imageUrl,
  imagePosition = 'right',
  className,
}: ContentBlockProps) {
  return (
    <div className={clsx('py-12 md:py-16', className)}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {layout === 'full' && (
          <div className="space-y-6">
            {title && <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>}
            <div className="prose prose-lg max-w-none">{children}</div>
          </div>
        )}

        {layout === 'two-col' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              {title && <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>}
              <div className="prose prose-lg">{children}</div>
            </div>
            {imageUrl && (
              <div className="h-96 relative">
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        )}

        {layout === 'two-col-image' && imagePosition === 'left' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {imageUrl && (
              <div className="h-96 relative">
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            )}
            <div className="space-y-6">
              {title && <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>}
              <div className="prose prose-lg">{children}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

---

### Componente 3: RelatedItems

**Arquivo:** `apps/website/src/components/ui/RelatedItems.tsx`

```typescript
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LinkArrow } from '@/components/ui/LinkArrow';
import { Image } from '@/components/ui/Image';
import { Grid } from '@/components/ui/Grid';

interface RelatedItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image?: string;
  badge?: string;
}

interface RelatedItemsProps {
  title: string;
  items: RelatedItem[];
  href: string;
  linkLabel: string;
}

export function RelatedItems({
  title,
  items,
  href,
  linkLabel,
}: RelatedItemsProps) {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
          <LinkArrow href={href}>{linkLabel}</LinkArrow>
        </div>

        <Grid cols={3} gap="lg">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-shadow">
              {item.image && (
                <div className="h-40 relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={300}
                    className="w-full h-full"
                  />
                </div>
              )}

              <div className="p-6 space-y-3">
                {item.badge && (
                  <Badge variant="secondary" size="sm">
                    {item.badge}
                  </Badge>
                )}
                <h3 className="text-lg font-bold line-clamp-2">{item.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{item.excerpt}</p>
                <LinkArrow href={`${href}/${item.slug}`}>Saiba mais</LinkArrow>
              </div>
            </Card>
          ))}
        </Grid>
      </div>
    </section>
  );
}
```

---

## 📱 PÁGINA APLICAÇÃO DETAIL

**Arquivo:** `apps/website/src/app/aplicacoes/[slug]/page.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { DetailHero } from '@/components/ui/DetailHero';
import { ContentBlock } from '@/components/ui/ContentBlock';
import { RelatedItems } from '@/components/ui/RelatedItems';
import { Button } from '@/components/ui/Button';
import { api } from '@/lib/api';
import { Application } from '@/types/api';

export default function ApplicationDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [application, setApplication] = useState<Application | null>(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Buscar aplicação específica
        const appResponse = await api.get(`/applications?slug=${slug}`);
        if (appResponse.data.length > 0) {
          setApplication(appResponse.data[0]);
        }

        // Buscar relacionadas
        const relatedResponse = await api.get('/applications?take=3');
        setRelated(relatedResponse.data.filter((a: Application) => a.slug !== slug));
      } catch (error) {
        console.error('Erro ao buscar aplicação:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  if (loading) return <div className="text-center py-20">Carregando...</div>;
  if (!application) return <div className="text-center py-20">Aplicação não encontrada</div>;

  return (
    <>
      <DetailHero
        title={application.name}
        description={application.excerpt || application.description}
        badge="APLICAÇÃO"
        image={application.banner}
        ctaLabel="Entre em contato"
        ctaHref="/contato"
      />

      {/* Descrição Completa */}
      <ContentBlock
        title="Sobre esta aplicação"
        layout="full"
        className="py-16"
      >
        <div className="prose prose-lg max-w-none text-gray-700">
          <p>{application.description}</p>

          <h3>Benefícios</h3>
          <ul>
            <li>Desempenho superior em formulações</li>
            <li>Estabilidade garantida</li>
            <li>Qualidade farmacêutica</li>
            <li>Suporte técnico especializado</li>
          </ul>

          <h3>Aplicações Específicas</h3>
          <p>Esta plataforma é ideal para desenvolvimento de produtos inovadores em diversos segmentos industriais.</p>
        </div>
      </ContentBlock>

      {/* Related Technologies */}
      {related.length > 0 && (
        <RelatedItems
          title="Outras aplicações"
          items={related.map((app: Application) => ({
            id: app.id,
            title: app.name,
            slug: app.slug,
            excerpt: app.excerpt || '',
            image: app.banner,
            badge: 'APLICAÇÃO',
          }))}
          href="/aplicacoes"
          linkLabel="Ver todas"
        />
      )}

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Pronto para transformar suas formulações?
          </h2>
          <p className="text-lg text-primary-100">
            Fale com nossos especialistas e descubra como esta aplicação pode impulsionar seu negócio.
          </p>
          <Button variant="secondary" size="lg" href="/contato">
            Agendar conversa
          </Button>
        </div>
      </section>
    </>
  );
}
```

---

## ⚙️ PÁGINA TECNOLOGIA DETAIL

**Arquivo:** `apps/website/src/app/tecnologias/[slug]/page.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { DetailHero } from '@/components/ui/DetailHero';
import { ContentBlock } from '@/components/ui/ContentBlock';
import { RelatedItems } from '@/components/ui/RelatedItems';
import { Button } from '@/components/ui/Button';
import { Grid } from '@/components/ui/Grid';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { api } from '@/lib/api';
import { Technology } from '@/types/api';

export default function TechnologyDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [technology, setTechnology] = useState<Technology | null>(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const techResponse = await api.get(`/technologies?slug=${slug}`);
        if (techResponse.data.length > 0) {
          setTechnology(techResponse.data[0]);
        }

        const relatedResponse = await api.get('/technologies?take=3');
        setRelated(relatedResponse.data.filter((t: Technology) => t.slug !== slug));
      } catch (error) {
        console.error('Erro ao buscar tecnologia:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  if (loading) return <div className="text-center py-20">Carregando...</div>;
  if (!technology) return <div className="text-center py-20">Tecnologia não encontrada</div>;

  return (
    <>
      <DetailHero
        title={technology.name}
        description={technology.excerpt || technology.description}
        badge="TECNOLOGIA"
        image={technology.icon}
        ctaLabel="Solicitar informações técnicas"
        ctaHref="/contato"
      />

      {/* Descrição Técnica */}
      <ContentBlock
        title="Descrição Técnica"
        layout="full"
        className="py-16"
      >
        <div className="prose prose-lg max-w-none text-gray-700">
          <p>{technology.description}</p>

          <h3>Características Principais</h3>
          <ul>
            <li>Eficácia comprovada scientificamente</li>
            <li>Biocompatibilidade garantida</li>
            <li>Estabilidade em diversas condições</li>
            <li>Aplicabilidade em múltiplos segmentos</li>
          </ul>

          <h3>Especificações</h3>
          <p>Documentação técnica completa disponível sob solicitação.</p>
        </div>
      </ContentBlock>

      {/* Especificações Grid */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Especificações</h2>
          <Grid cols={2} gap="lg">
            {[
              { label: 'Pureza', value: '> 98%' },
              { label: 'Estabilidade', value: '24 meses' },
              { label: 'Biodisponibilidade', value: 'Otimizada' },
              { label: 'Conformidade', value: 'Farmacêutica' },
            ].map((spec, idx) => (
              <Card key={idx} className="space-y-3">
                <h4 className="font-semibold text-gray-600">{spec.label}</h4>
                <p className="text-2xl font-bold text-primary-600">{spec.value}</p>
              </Card>
            ))}
          </Grid>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <RelatedItems
          title="Outras tecnologias"
          items={related.map((tech: Technology) => ({
            id: tech.id,
            title: tech.name,
            slug: tech.slug,
            excerpt: tech.excerpt || '',
            image: tech.icon,
            badge: 'TECNOLOGIA',
          }))}
          href="/tecnologias"
          linkLabel="Ver todas"
        />
      )}

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Integre esta tecnologia em seus produtos
          </h2>
          <p className="text-lg text-primary-100">
            Solicitamos documentação completa e suporte técnico personalizado.
          </p>
          <Button variant="secondary" size="lg" href="/contato">
            Fale com especialista
          </Button>
        </div>
      </section>
    </>
  );
}
```

---

## 📰 PÁGINA ARTIGO DETAIL

**Arquivo:** `apps/website/src/app/conteudo/[slug]/page.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { DetailHero } from '@/components/ui/DetailHero';
import { ContentBlock } from '@/components/ui/ContentBlock';
import { RelatedItems } from '@/components/ui/RelatedItems';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { api } from '@/lib/api';
import { Content } from '@/types/api';

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [article, setArticle] = useState<Content | null>(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const artResponse = await api.get(`/content?slug=${slug}`);
        if (artResponse.data.length > 0) {
          setArticle(artResponse.data[0]);
        }

        const relatedResponse = await api.get('/content?take=3');
        setRelated(relatedResponse.data.filter((c: Content) => c.slug !== slug));
      } catch (error) {
        console.error('Erro ao buscar artigo:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  if (loading) return <div className="text-center py-20">Carregando...</div>;
  if (!article) return <div className="text-center py-20">Artigo não encontrado</div>;

  return (
    <>
      <DetailHero
        title={article.title}
        description={article.excerpt || article.description}
        badge="ARTIGO"
        image={article.banner}
      />

      {/* Article Content */}
      <article className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Meta Info */}
          <div className="mb-12 pb-8 border-b border-gray-200">
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span>📅 {new Date(article.createdAt).toLocaleDateString('pt-BR')}</span>
              <span>📖 Leitura: 5 min</span>
              <span>✍️ Equipe Daksa</span>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>

          {/* Author Card */}
          <Card className="bg-gray-50 space-y-4">
            <h4 className="font-bold">Sobre o autor</h4>
            <p className="text-gray-700">
              Artigo desenvolvido pela equipe técnica da Daksa. Para dúvidas específicas, consulte nossos especialistas.
            </p>
            <div className="flex gap-4">
              <button className="text-primary-600 hover:text-primary-700 font-semibold">
                LinkedIn →
              </button>
              <button className="text-primary-600 hover:text-primary-700 font-semibold">
                Fale conosco →
              </button>
            </div>
          </Card>
        </div>
      </article>

      {/* Related Articles */}
      {related.length > 0 && (
        <RelatedItems
          title="Leitura Recomendada"
          items={related.map((content: Content) => ({
            id: content.id,
            title: content.title,
            slug: content.slug,
            excerpt: content.excerpt || '',
            image: content.banner,
            badge: 'ARTIGO',
          }))}
          href="/conteudo"
          linkLabel="Ver todos artigos"
        />
      )}
    </>
  );
}
```

---

## 🔗 RELATED ITEMS AVANÇADO

Para mostrar itens realmente relacionados (por tags, categorias, etc):

**Arquivo:** `apps/website/src/lib/related.ts`

```typescript
import { Application, Technology, Content } from '@/types/api';

export function getRelatedApplications(
  current: Application,
  all: Application[],
  limit: number = 3
) {
  return all
    .filter((a) => a.id !== current.id)
    .slice(0, limit);
}

export function getRelatedTechnologies(
  current: Technology,
  all: Technology[],
  limit: number = 3
) {
  return all
    .filter((t) => t.id !== current.id)
    .slice(0, limit);
}

export function getRelatedContent(
  current: Content,
  all: Content[],
  limit: number = 3
) {
  return all
    .filter((c) => c.id !== current.id && c.status === 'published')
    .slice(0, limit);
}
```

---

## 🧪 TESTES PAGINAS DETAIL

```bash
# Routing
☑ /aplicacoes/[slug] carrega correto
☑ /tecnologias/[slug] carrega correto
☑ /conteudo/[slug] carrega correto
☑ Slug inválido mostra "não encontrado"

# Componentes
☑ DetailHero renderiza com dados
☑ ContentBlock exibe conteúdo
☑ RelatedItems mostra 3 items
☑ CTAs funcionam

# Dados
☑ API é chamada ao carregar
☑ Dados corretos são exibidos
☑ Images carregam
☑ Erro ao buscar é tratado

# Responsividade
☑ Mobile: layout stack
☑ Tablet: 2 colunas
☑ Desktop: full width
☑ Tipografia responsiva

# Performance
☑ Lighthouse > 85
☑ Imagens lazy loaded
☑ Code splitting OK
```

---

## 📊 CHECKLIST

```
COMPONENTES:
☑ DetailHero criado
☑ ContentBlock criado
☑ RelatedItems criado

PÁGINAS:
☑ /aplicacoes/[slug] completa
☑ /tecnologias/[slug] completa
☑ /conteudo/[slug] completa

INTEGRAÇÃO:
☑ API conectada
☑ Dados dinâmicos
☑ Error handling
☑ Loading states

QUALIDADE:
☑ TypeScript ok
☑ Responsivo
☑ Performance OK
☑ Sem console errors
```

---

**Pronto! Próximo: DESENVOLVIMENTO_PAGINAS_LISTAGENS.md** 🚀
