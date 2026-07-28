'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { ListingHero } from '@/components/ui/ListingHero';
import { SearchBar } from '@/components/ui/SearchBar';
import { FilterButton } from '@/components/ui/FilterButton';
import { Pagination } from '@/components/ui/Pagination';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { LinkArrow } from '@/components/ui/LinkArrow';
import { Grid } from '@/components/ui/Grid';
import { Section } from '@/components/ui/Section';
import { resolveMediaUrl } from '@/lib/api';

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  featured: string | null;
  publishedAt: string | null;
  categories: { category: { id: string; name: string; slug: string } }[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Paginated<T> {
  data: T[];
  total: number;
  totalPages: number;
}

const PAGE_SIZE = 9;

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories?take=20`)
      .then((r) => r.json())
      .then((res) => setCategories(res.data || []))
      .catch(() => setCategories([]));
  }, []);

  const fetchPosts = useCallback(async (currentPage: number, q: string, categorySlug: string | null) => {
    setLoading(true);
    setError(false);
    try {
      const skip = (currentPage - 1) * PAGE_SIZE;
      const params = new URLSearchParams({
        skip: String(skip),
        take: String(PAGE_SIZE),
        status: 'PUBLISHED',
      });
      if (q) params.set('q', q);
      if (categorySlug) params.set('category', categorySlug);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/content?${params}`);
      if (!res.ok) throw new Error('Falha ao carregar artigos');
      const json: Paginated<Post> = await res.json();
      setPosts(json.data || []);
      setTotal(json.total || 0);
      setTotalPages(json.totalPages || 1);
    } catch {
      setPosts([]);
      setTotal(0);
      setTotalPages(1);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts(page, query, activeCategory);
  }, [fetchPosts, page, query, activeCategory]);

  const handleSearch = (q: string) => {
    setQuery(q);
    setPage(1);
  };

  const handleCategoryChange = (slug: string | null) => {
    setActiveCategory(slug);
    setPage(1);
  };

  return (
    <>
      <ListingHero
        badge="CONTEÚDO TÉCNICO"
        title="Conteúdo Técnico"
        description="Acesso a artigos científicos e materiais técnicos sobre lipídios, tecnologias e aplicações."
      >
        <SearchBar value={query} onChange={handleSearch} placeholder="Buscar artigos..." />
      </ListingHero>

      <Section>
        <div className="space-y-12">
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-3">
              <FilterButton
                label="Todos"
                active={activeCategory === null}
                onClick={() => handleCategoryChange(null)}
              />
              {categories.map((cat) => (
                <FilterButton
                  key={cat.id}
                  label={cat.name}
                  active={activeCategory === cat.slug}
                  onClick={() => handleCategoryChange(cat.slug)}
                />
              ))}
            </div>
          )}

          {loading ? (
            <p className="py-12 text-center text-gray-500">Carregando...</p>
          ) : error ? (
            <div className="space-y-4 py-12 text-center">
              <p className="text-gray-600">Não foi possível carregar os artigos agora.</p>
              <Button variant="outline" onClick={() => fetchPosts(page, query, activeCategory)}>
                Tentar novamente
              </Button>
            </div>
          ) : posts.length === 0 ? (
            <p className="py-12 text-center text-gray-500">Nenhum artigo encontrado.</p>
          ) : (
            <>
              <p className="text-sm text-gray-500">
                {total} artigo{total === 1 ? '' : 's'} {query && `para "${query}"`}
              </p>

              <Grid cols={3} gap="lg">
                {posts.map((post) => (
                  <Card key={post.id} href={`/blog/${post.slug}`} className="flex flex-col">
                    <div className="relative h-44 bg-gray-100">
                      {post.featured && (
                        <Image
                          src={resolveMediaUrl(post.featured)}
                          alt={post.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover"
                        />
                      )}
                      <Badge variant="secondary" className="absolute left-4 top-4 bg-white">
                        {post.categories[0]?.category.name || 'ARTIGO'}
                      </Badge>
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-5">
                      <h3 className="line-clamp-2 text-lg font-bold text-gray-900">{post.title}</h3>
                      {post.excerpt && (
                        <p className="line-clamp-3 flex-1 text-sm text-gray-600">{post.excerpt}</p>
                      )}
                      {post.publishedAt && (
                        <p className="text-xs text-gray-500">
                          {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
                        </p>
                      )}
                      <LinkArrow as="span">Ler artigo</LinkArrow>
                    </div>
                  </Card>
                ))}
              </Grid>

              <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            </>
          )}
        </div>
      </Section>
    </>
  );
}
