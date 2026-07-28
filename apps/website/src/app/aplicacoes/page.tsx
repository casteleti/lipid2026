'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { HiOutlineBeaker } from 'react-icons/hi2';
import { ListingHero } from '@/components/ui/ListingHero';
import { SearchBar } from '@/components/ui/SearchBar';
import { Pagination } from '@/components/ui/Pagination';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LinkArrow } from '@/components/ui/LinkArrow';
import { Grid } from '@/components/ui/Grid';
import { Section } from '@/components/ui/Section';
import { resolveMediaUrl } from '@/lib/api';

interface Application {
  id: string;
  slug: string;
  name: string;
  excerpt: string | null;
  banner: string | null;
}

interface Paginated<T> {
  data: T[];
  total: number;
  totalPages: number;
}

const PAGE_SIZE = 9;

export default function AplicacoesPage() {
  const [apps, setApps] = useState<Application[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchApps = useCallback(async (currentPage: number, q: string) => {
    setLoading(true);
    setError(false);
    try {
      const skip = (currentPage - 1) * PAGE_SIZE;
      const params = new URLSearchParams({ skip: String(skip), take: String(PAGE_SIZE) });
      if (q) params.set('q', q);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/applications?${params}`);
      if (!res.ok) throw new Error('Falha ao carregar aplicações');
      const json: Paginated<Application> = await res.json();
      setApps(json.data || []);
      setTotal(json.total || 0);
      setTotalPages(json.totalPages || 1);
    } catch {
      setApps([]);
      setTotal(0);
      setTotalPages(1);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApps(page, query);
  }, [fetchApps, page, query]);

  const handleSearch = (q: string) => {
    setQuery(q);
    setPage(1);
  };

  return (
    <>
      <ListingHero
        badge="APLICAÇÕES"
        title="Nossas Aplicações"
        description="Explore soluções especializadas em lipídios para múltiplos segmentos industriais, desenvolvidas com rigor científico e validadas para máximo desempenho."
      >
        <SearchBar value={query} onChange={handleSearch} placeholder="Buscar aplicações..." />
      </ListingHero>

      <Section>
        {loading ? (
          <p className="py-12 text-center text-gray-500">Carregando...</p>
        ) : error ? (
          <div className="space-y-4 py-12 text-center">
            <p className="text-gray-600">Não foi possível carregar as aplicações agora.</p>
            <Button variant="outline" onClick={() => fetchApps(page, query)}>
              Tentar novamente
            </Button>
          </div>
        ) : apps.length === 0 ? (
          <p className="py-12 text-center text-gray-500">Nenhuma aplicação encontrada.</p>
        ) : (
          <div className="space-y-12">
            <p className="text-sm text-gray-500">
              {total} aplicaç{total === 1 ? 'ão' : 'ões'} {query && `para "${query}"`}
            </p>

            <Grid cols={3} gap="lg">
              {apps.map((app) => (
                <Card key={app.id} href={`/aplicacoes/${app.slug}`} className="flex flex-col">
                  <div className="relative flex h-44 items-center justify-center bg-gray-50">
                    {app.banner ? (
                      <Image
                        src={resolveMediaUrl(app.banner)}
                        alt={app.name}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    ) : (
                      <HiOutlineBeaker className="h-10 w-10 text-primary-300" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <h3 className="text-lg font-bold text-gray-900">{app.name}</h3>
                    {app.excerpt && <p className="line-clamp-2 flex-1 text-sm text-gray-600">{app.excerpt}</p>}
                    <LinkArrow as="span">Explorar</LinkArrow>
                  </div>
                </Card>
              ))}
            </Grid>

            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        )}
      </Section>

      <Section variant="dark">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <h2>Não encontrou o que procura?</h2>
          <p className="text-lg text-white/70">
            Fale com nossos especialistas sobre suas necessidades específicas.
          </p>
          <Button href="/contato" variant="secondary" size="lg">
            Solicitar solução customizada
          </Button>
        </div>
      </Section>
    </>
  );
}
