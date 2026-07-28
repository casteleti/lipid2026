'use client';

import { useCallback, useEffect, useState } from 'react';
import { HiOutlineCube } from 'react-icons/hi2';
import { ListingHero } from '@/components/ui/ListingHero';
import { SearchBar } from '@/components/ui/SearchBar';
import { Pagination } from '@/components/ui/Pagination';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LinkArrow } from '@/components/ui/LinkArrow';
import { Grid } from '@/components/ui/Grid';
import { Section } from '@/components/ui/Section';

interface Technology {
  id: string;
  slug: string;
  name: string;
  excerpt: string | null;
}

interface Paginated<T> {
  data: T[];
  total: number;
  totalPages: number;
}

const PAGE_SIZE = 9;

export default function TecnologiasPage() {
  const [items, setItems] = useState<Technology[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchItems = useCallback(async (currentPage: number, q: string) => {
    setLoading(true);
    try {
      const skip = (currentPage - 1) * PAGE_SIZE;
      const params = new URLSearchParams({ skip: String(skip), take: String(PAGE_SIZE) });
      if (q) params.set('q', q);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/technologies?${params}`);
      const json: Paginated<Technology> = await res.json();
      setItems(json.data || []);
      setTotal(json.total || 0);
      setTotalPages(json.totalPages || 1);
    } catch {
      setItems([]);
      setTotal(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems(page, query);
  }, [fetchItems, page, query]);

  const handleSearch = (q: string) => {
    setQuery(q);
    setPage(1);
  };

  return (
    <>
      <ListingHero
        badge="TECNOLOGIAS"
        title="Tecnologias Lipídicas"
        description="Plataformas científicas de ponta baseadas em lipídios, com estabilidade, biodisponibilidade e eficácia comprovadas para formulações avançadas."
      >
        <SearchBar value={query} onChange={handleSearch} placeholder="Buscar tecnologias..." />
      </ListingHero>

      <Section>
        {loading ? (
          <p className="py-12 text-center text-gray-400">Carregando...</p>
        ) : items.length === 0 ? (
          <p className="py-12 text-center text-gray-500">Nenhuma tecnologia encontrada.</p>
        ) : (
          <div className="space-y-12">
            <p className="text-sm text-gray-500">
              {total} tecnologia{total === 1 ? '' : 's'} {query && `para "${query}"`}
            </p>

            <Grid cols={3} gap="lg">
              {items.map((tech, idx) => (
                <Card key={tech.id} className="flex flex-col gap-4 p-6">
                  <div className="flex h-32 items-center justify-center rounded-xl bg-gray-50">
                    <HiOutlineCube className="h-10 w-10 text-primary-300" />
                  </div>
                  <Badge variant="secondary" className="w-fit">
                    T-{String(idx + 1).padStart(2, '0')}
                  </Badge>
                  <h3 className="text-lg font-bold text-gray-900">{tech.name}</h3>
                  {tech.excerpt && <p className="line-clamp-2 flex-1 text-sm text-gray-600">{tech.excerpt}</p>}
                  <LinkArrow href={`/tecnologias/${tech.slug}`}>Saiba mais</LinkArrow>
                </Card>
              ))}
            </Grid>

            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        )}
      </Section>
    </>
  );
}
