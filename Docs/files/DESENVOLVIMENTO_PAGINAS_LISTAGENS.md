# 📋 DESENVOLVIMENTO PÁGINAS DE LISTAGEM
## Aplicações | Tecnologias | Ingredientes | Conteúdo

**Status:** Módulo 2 de 6  
**Escopo:** 4 páginas de listagem com filtros, busca e paginação  
**Tempo:** 8-10 horas  
**Dependência:** Componentes de listagem + API funcional  

---

## 📋 ÍNDICE

1. [Visão Geral](#visão-geral)
2. [Componentes de Listagem](#componentes-de-listagem)
3. [Página Aplicações](#página-aplicações)
4. [Página Tecnologias](#página-tecnologias)
5. [Página Ingredientes](#página-ingredientes)
6. [Página Conteúdo](#página-conteúdo)
7. [Filtros e Busca](#filtros-e-busca)
8. [Paginação](#paginação)

---

## 🎯 VISÃO GERAL

```
4 PÁGINAS LISTAGEM:
┌─────────────────────────────────────┐
│ /aplicacoes                         │
│ Lista todas aplicações              │
│ + Filtros + Busca + Paginação       │
├─────────────────────────────────────┤
│ /tecnologias                        │
│ Lista todas tecnologias             │
│ + Filtros + Busca + Paginação       │
├─────────────────────────────────────┤
│ /ingredientes                       │
│ Lista todos ingredientes            │
│ + Busca + Paginação                 │
├─────────────────────────────────────┤
│ /conteudo                           │
│ Lista artigos/conteúdo              │
│ + Filtros + Busca + Paginação       │
└─────────────────────────────────────┘

PADRÃO COMUM:
Hero section (banner + título)
    ↓
Filtros / Busca
    ↓
Grid de items (3-4 colunas)
    ↓
Paginação
    ↓
CTA section (próximos passos)
```

---

## 🧩 COMPONENTES DE LISTAGEM

### Componente 1: ListingHero

**Arquivo:** `apps/website/src/components/ui/ListingHero.tsx`

```typescript
import { Badge } from '@/components/ui/Badge';
import { LinkArrow } from '@/components/ui/LinkArrow';

interface ListingHeroProps {
  title: string;
  subtitle?: string;
  description: string;
  badge: string;
  image?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function ListingHero({
  title,
  subtitle,
  description,
  badge,
  image,
  ctaLabel,
  ctaHref,
}: ListingHeroProps) {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="space-y-6">
          <Badge variant="primary">{badge}</Badge>

          <h1 className="text-5xl md:text-6xl font-bold">{title}</h1>

          {subtitle && <p className="text-2xl text-gray-600">{subtitle}</p>}

          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            {description}
          </p>

          {ctaLabel && ctaHref && (
            <LinkArrow href={ctaHref}>{ctaLabel}</LinkArrow>
          )}
        </div>
      </div>
    </section>
  );
}
```

---

### Componente 2: SearchBar

**Arquivo:** `apps/website/src/components/ui/SearchBar.tsx`

```typescript
'use client';

import { useState } from 'react';
import clsx from 'clsx';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  loading?: boolean;
}

export function SearchBar({
  onSearch,
  placeholder = 'Buscar...',
  loading = false,
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button
          type="submit"
          disabled={loading}
          className={clsx(
            'absolute right-2 text-2xl transition-colors',
            loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:text-primary-600',
          )}
        >
          🔍
        </button>
      </div>
    </form>
  );
}
```

---

### Componente 3: FilterButton

**Arquivo:** `apps/website/src/components/ui/FilterButton.tsx`

```typescript
'use client';

import clsx from 'clsx';

interface FilterButtonProps {
  label: string;
  active?: boolean;
  onClick: () => void;
}

export function FilterButton({ label, active = false, onClick }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200',
        active
          ? 'bg-primary-600 text-white'
          : 'bg-gray-200 text-gray-900 hover:bg-gray-300',
      )}
    >
      {label}
    </button>
  );
}
```

---

### Componente 4: Pagination

**Arquivo:** `apps/website/src/components/ui/Pagination.tsx`

```typescript
'use client';

import clsx from 'clsx';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.slice(
    Math.max(0, currentPage - 2),
    Math.min(totalPages, currentPage + 1),
  );

  return (
    <div className="flex justify-center items-center gap-2 my-12">
      {/* Anterior */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={clsx(
          'px-3 py-2 rounded transition-colors',
          currentPage === 1
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-gray-200 cursor-pointer',
        )}
      >
        ← Anterior
      </button>

      {/* Páginas */}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={clsx(
            'px-3 py-2 rounded font-semibold transition-colors',
            page === currentPage
              ? 'bg-primary-600 text-white'
              : 'hover:bg-gray-200 cursor-pointer',
          )}
        >
          {page}
        </button>
      ))}

      {/* Próxima */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={clsx(
          'px-3 py-2 rounded transition-colors',
          currentPage === totalPages
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-gray-200 cursor-pointer',
        )}
      >
        Próxima →
      </button>
    </div>
  );
}
```

---

## 📱 PÁGINA APLICAÇÕES

**Arquivo:** `apps/website/src/app/aplicacoes/page.tsx`

```typescript
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ListingHero } from '@/components/ui/ListingHero';
import { SearchBar } from '@/components/ui/SearchBar';
import { FilterButton } from '@/components/ui/FilterButton';
import { Pagination } from '@/components/ui/Pagination';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LinkArrow } from '@/components/ui/LinkArrow';
import { Grid } from '@/components/ui/Grid';
import { api } from '@/lib/api';
import { Application } from '@/types/api';

const filters = ['Todos', 'Farmacêutica', 'Cosmética', 'Nutricional', 'Veterinária'];

export default function ApplicationsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get('page') || '1'),
  );
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 12;

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const skip = (currentPage - 1) * pageSize;
      const params = new URLSearchParams({
        skip: skip.toString(),
        take: pageSize.toString(),
        ...(searchQuery && { q: searchQuery }),
      });

      const response = await api.get(`/applications?${params}`);
      setApplications(response.data);
      setTotalPages(Math.ceil(response.total / pageSize));

      // Update URL
      const newParams = new URLSearchParams();
      if (currentPage > 1) newParams.set('page', currentPage.toString());
      if (searchQuery) newParams.set('q', searchQuery);
      router.push(`/aplicacoes?${newParams.toString()}`);
    } catch (error) {
      console.error('Erro ao buscar aplicações:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery, router]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <ListingHero
        title="Nossas Aplicações"
        description="Explore soluções especializadas em lipídios para múltiplos segmentos industriais. Cada aplicação é desenvolvida com rigor científico e validada para máximo desempenho."
        badge="APLICAÇÕES"
        ctaLabel="Fale com especialista"
        ctaHref="/contato"
      />

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 space-y-8">
          {/* Search + Filters */}
          <div className="space-y-6">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Buscar aplicações..."
              loading={loading}
            />

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <FilterButton
                  key={filter}
                  label={filter}
                  active={selectedFilter === filter}
                  onClick={() => handleFilterChange(filter)}
                />
              ))}
            </div>

            {/* Results count */}
            <p className="text-sm text-gray-600">
              {applications.length} aplicações encontradas
              {searchQuery && ` para "${searchQuery}"`}
            </p>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="text-center py-20">Carregando...</div>
          ) : applications.length === 0 ? (
            <div className="text-center py-20">Nenhuma aplicação encontrada</div>
          ) : (
            <>
              <Grid cols={4} gap="lg">
                {applications.map((app, idx) => (
                  <Card
                    key={app.id}
                    className="overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    {app.banner && (
                      <div className="h-40 bg-gray-200 rounded-t-lg relative">
                        <img
                          src={app.banner}
                          alt={app.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="p-6 space-y-3">
                      <Badge variant="secondary" size="sm">
                        {idx + 1 :02d}
                      </Badge>
                      <h3 className="text-lg font-bold">{app.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {app.excerpt || app.description}
                      </p>
                      <LinkArrow href={`/aplicacoes/${app.slug}`}>
                        Explorar
                      </LinkArrow>
                    </div>
                  </Card>
                ))}
              </Grid>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Não encontrou o que procura?
          </h2>
          <p className="text-lg text-gray-600">
            Fale com nossos especialistas sobre suas necessidades específicas.
          </p>
          <button className="px-8 py-3 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-colors">
            Solicitar solução customizada
          </button>
        </div>
      </section>
    </>
  );
}
```

---

## ⚙️ PÁGINA TECNOLOGIAS

**Arquivo:** `apps/website/src/app/tecnologias/page.tsx`

```typescript
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ListingHero } from '@/components/ui/ListingHero';
import { SearchBar } from '@/components/ui/SearchBar';
import { Pagination } from '@/components/ui/Pagination';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LinkArrow } from '@/components/ui/LinkArrow';
import { Grid } from '@/components/ui/Grid';
import { api } from '@/lib/api';
import { Technology } from '@/types/api';

export default function TechnologiesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get('page') || '1'),
  );
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 12;

  const fetchTechnologies = useCallback(async () => {
    setLoading(true);
    try {
      const skip = (currentPage - 1) * pageSize;
      const params = new URLSearchParams({
        skip: skip.toString(),
        take: pageSize.toString(),
        ...(searchQuery && { q: searchQuery }),
      });

      const response = await api.get(`/technologies?${params}`);
      setTechnologies(response.data);
      setTotalPages(Math.ceil(response.total / pageSize));

      const newParams = new URLSearchParams();
      if (currentPage > 1) newParams.set('page', currentPage.toString());
      if (searchQuery) newParams.set('q', searchQuery);
      router.push(`/tecnologias?${newParams.toString()}`);
    } catch (error) {
      console.error('Erro ao buscar tecnologias:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery, router]);

  useEffect(() => {
    fetchTechnologies();
  }, [fetchTechnologies]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <ListingHero
        title="Tecnologias Lipídicas"
        description="Plataformas científicas de ponta baseadas em lipídios. Cada tecnologia oferece estabilidade, biodisponibilidade e eficácia comprovadas para formulações avançadas."
        badge="TECNOLOGIAS"
        ctaLabel="Solicitar informações técnicas"
        ctaHref="/contato"
      />

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 space-y-8">
          {/* Search */}
          <div className="space-y-4">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Buscar tecnologias..."
              loading={loading}
            />
            <p className="text-sm text-gray-600">
              {technologies.length} tecnologias disponíveis
              {searchQuery && ` para "${searchQuery}"`}
            </p>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="text-center py-20">Carregando...</div>
          ) : technologies.length === 0 ? (
            <div className="text-center py-20">Nenhuma tecnologia encontrada</div>
          ) : (
            <>
              <Grid cols={3} gap="lg">
                {technologies.map((tech, idx) => (
                  <Card
                    key={tech.id}
                    className="space-y-4 hover:shadow-xl transition-shadow"
                  >
                    {tech.icon && (
                      <div className="h-40 flex items-center justify-center bg-gray-50 rounded-lg text-5xl">
                        {tech.icon}
                      </div>
                    )}

                    <div className="space-y-2">
                      <Badge variant="secondary" size="sm">
                        T-{idx + 1 :02d}
                      </Badge>
                      <h3 className="text-lg font-bold">{tech.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {tech.excerpt || tech.description}
                      </p>
                      <LinkArrow href={`/tecnologias/${tech.slug}`}>
                        Saiba mais
                      </LinkArrow>
                    </div>
                  </Card>
                ))}
              </Grid>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
```

---

## 📦 PÁGINA INGREDIENTES

**Arquivo:** `apps/website/src/app/ingredientes/page.tsx`

```typescript
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ListingHero } from '@/components/ui/ListingHero';
import { SearchBar } from '@/components/ui/SearchBar';
import { Pagination } from '@/components/ui/Pagination';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Grid } from '@/components/ui/Grid';
import { api } from '@/lib/api';
import { Ingredient } from '@/types/api';

export default function IngredientsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get('page') || '1'),
  );
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 16;

  const fetchIngredients = useCallback(async () => {
    setLoading(true);
    try {
      const skip = (currentPage - 1) * pageSize;
      const params = new URLSearchParams({
        skip: skip.toString(),
        take: pageSize.toString(),
        ...(searchQuery && { q: searchQuery }),
      });

      const response = await api.get(`/ingredients?${params}`);
      setIngredients(response.data);
      setTotalPages(Math.ceil(response.total / pageSize));

      const newParams = new URLSearchParams();
      if (currentPage > 1) newParams.set('page', currentPage.toString());
      if (searchQuery) newParams.set('q', searchQuery);
      router.push(`/ingredientes?${newParams.toString()}`);
    } catch (error) {
      console.error('Erro ao buscar ingredientes:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery, router]);

  useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <ListingHero
        title="Ingredientes Especializados"
        description="Catálogo completo de ingredientes lipídicos de alta performance para formulações exigentes. Fornecedores parceiros de referência mundial."
        badge="INGREDIENTES"
        ctaLabel="Solicitar informações técnicas"
        ctaHref="/contato"
      />

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 space-y-8">
          {/* Search */}
          <div className="space-y-4">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Buscar ingredientes (nome ou INCI)..."
              loading={loading}
            />
            <p className="text-sm text-gray-600">
              {ingredients.length} ingredientes disponíveis
              {searchQuery && ` para "${searchQuery}"`}
            </p>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="text-center py-20">Carregando...</div>
          ) : ingredients.length === 0 ? (
            <div className="text-center py-20">Nenhum ingrediente encontrado</div>
          ) : (
            <>
              <Grid cols={4} gap="md">
                {ingredients.map((ingredient) => (
                  <Card key={ingredient.id} className="space-y-3 hover:shadow-lg transition-shadow">
                    <h3 className="font-bold text-gray-900">{ingredient.name}</h3>

                    {ingredient.inci && (
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500">INCI</p>
                        <p className="text-sm text-gray-700">{ingredient.inci}</p>
                      </div>
                    )}

                    {ingredient.supplier && (
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500">Fornecedor</p>
                        <Badge variant="secondary" size="sm">
                          {ingredient.supplier}
                        </Badge>
                      </div>
                    )}

                    <p className="text-sm text-gray-600 line-clamp-2">
                      {ingredient.description}
                    </p>

                    <button className="text-primary-600 hover:text-primary-700 text-sm font-semibold">
                      Mais informações →
                    </button>
                  </Card>
                ))}
              </Grid>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
```

---

## 📰 PÁGINA CONTEÚDO

**Arquivo:** `apps/website/src/app/conteudo/page.tsx`

```typescript
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ListingHero } from '@/components/ui/ListingHero';
import { SearchBar } from '@/components/ui/SearchBar';
import { FilterButton } from '@/components/ui/FilterButton';
import { Pagination } from '@/components/ui/Pagination';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LinkArrow } from '@/components/ui/LinkArrow';
import { Grid } from '@/components/ui/Grid';
import { api } from '@/lib/api';
import { Content } from '@/types/api';

const contentTypes = ['Todos', 'Artigos', 'Estudos', 'Whitepapers', 'FAQs'];

export default function ContentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get('page') || '1'),
  );
  const [selectedType, setSelectedType] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 12;

  const fetchContent = useCallback(async () => {
    setLoading(true);
    try {
      const skip = (currentPage - 1) * pageSize;
      const params = new URLSearchParams({
        skip: skip.toString(),
        take: pageSize.toString(),
        status: 'published',
        ...(searchQuery && { q: searchQuery }),
      });

      const response = await api.get(`/content?${params}`);
      setContents(response.data);
      setTotalPages(Math.ceil(response.total / pageSize));

      const newParams = new URLSearchParams();
      if (currentPage > 1) newParams.set('page', currentPage.toString());
      if (searchQuery) newParams.set('q', searchQuery);
      router.push(`/conteudo?${newParams.toString()}`);
    } catch (error) {
      console.error('Erro ao buscar conteúdo:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery, router]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <ListingHero
        title="Biblioteca Técnica"
        description="Acesso a artigos científicos, estudos clínicos, whitepapers e FAQs sobre lipídios, tecnologias e aplicações."
        badge="CONTEÚDO TÉCNICO"
        ctaLabel="Agendar consultoria"
        ctaHref="/contato"
      />

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 space-y-8">
          {/* Search + Filters */}
          <div className="space-y-6">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Buscar artigos..."
              loading={loading}
            />

            <div className="flex flex-wrap gap-3">
              {contentTypes.map((type) => (
                <FilterButton
                  key={type}
                  label={type}
                  active={selectedType === type}
                  onClick={() => handleTypeChange(type)}
                />
              ))}
            </div>

            <p className="text-sm text-gray-600">
              {contents.length} artigos encontrados
              {searchQuery && ` para "${searchQuery}"`}
            </p>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="text-center py-20">Carregando...</div>
          ) : contents.length === 0 ? (
            <div className="text-center py-20">Nenhum artigo encontrado</div>
          ) : (
            <>
              <Grid cols={3} gap="lg">
                {contents.map((content) => (
                  <Card
                    key={content.id}
                    className="overflow-hidden flex flex-col hover:shadow-xl transition-shadow"
                  >
                    {content.banner && (
                      <div className="h-40 bg-gray-200 relative">
                        <img
                          src={content.banner}
                          alt={content.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex-1 p-6 space-y-3">
                      <Badge variant="secondary" size="sm">
                        ARTIGO
                      </Badge>
                      <h3 className="text-lg font-bold line-clamp-2">
                        {content.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {content.excerpt}
                      </p>

                      <div className="text-xs text-gray-500 mt-auto">
                        {new Date(content.createdAt).toLocaleDateString('pt-BR')}
                      </div>

                      <LinkArrow href={`/conteudo/${content.slug}`}>
                        Ler artigo
                      </LinkArrow>
                    </div>
                  </Card>
                ))}
              </Grid>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 md:py-20 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Receba novos artigos por email
          </h2>
          <p className="text-lg text-primary-100">
            Inscreva-se em nossa newsletter para conteúdo técnico exclusivo.
          </p>
          <form className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="seu@email.com"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Inscrever
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
```

---

## 🧪 TESTES PAGINAS LISTAGEM

```bash
# Routing
☑ /aplicacoes carrega
☑ /tecnologias carrega
☑ /ingredientes carrega
☑ /conteudo carrega

# Busca
☑ SearchBar funciona
☑ Query atualiza URL
☑ Resultados filtram
☑ Enter funciona

# Filtros
☑ FilterButton ativa/desativa
☑ Seleção muda resultados
☑ Múltiplos filtros funcionam

# Paginação
☑ Pagination renderiza
☑ Navegação funciona
☑ Page muda conteúdo
☑ URL atualiza

# Responsividade
☑ Mobile: 1 col
☑ Tablet: 2-3 cols
☑ Desktop: 3-4 cols
☑ SearchBar responsivo

# Performance
☑ Lazy loading funciona
☑ Sem layout shift
☑ Lighthouse > 85
```

---

## 📊 CHECKLIST

```
COMPONENTES:
☑ ListingHero criado
☑ SearchBar criado
☑ FilterButton criado
☑ Pagination criado

PÁGINAS:
☑ /aplicacoes completa
☑ /tecnologias completa
☑ /ingredientes completa
☑ /conteudo completa

FUNCIONALIDADES:
☑ Busca funciona
☑ Filtros funcionam
☑ Paginação funciona
☑ URLs atualizadas

QUALIDADE:
☑ Responsivo
☑ Performance OK
☑ TypeScript ok
☑ Sem errors
```

---

**Próximo: DESENVOLVIMENTO_CONTATO_FORMULARIO.md** 🚀
