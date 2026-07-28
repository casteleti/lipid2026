'use client';

import { useCallback, useEffect, useState } from 'react';
import { ListingHero } from '@/components/ui/ListingHero';
import { SearchBar } from '@/components/ui/SearchBar';
import { Pagination } from '@/components/ui/Pagination';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Grid } from '@/components/ui/Grid';
import { Section } from '@/components/ui/Section';

interface Ingredient {
  id: string;
  name: string;
  description: string;
  inci: string | null;
  supplier: string | null;
}

interface Paginated<T> {
  data: T[];
  total: number;
  totalPages: number;
}

const PAGE_SIZE = 12;

export default function IngredientesPage() {
  const [items, setItems] = useState<Ingredient[]>([]);
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

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ingredients?${params}`);
      const json: Paginated<Ingredient> = await res.json();
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
        badge="INGREDIENTES"
        title="Ingredientes Especializados"
        description="Catálogo de ingredientes lipídicos de alta performance para formulações exigentes, fornecidos por parceiros de referência mundial."
      >
        <SearchBar value={query} onChange={handleSearch} placeholder="Buscar por nome ou INCI..." />
      </ListingHero>

      <Section>
        {loading ? (
          <p className="py-12 text-center text-gray-400">Carregando...</p>
        ) : items.length === 0 ? (
          <p className="py-12 text-center text-gray-500">Nenhum ingrediente encontrado.</p>
        ) : (
          <div className="space-y-12">
            <p className="text-sm text-gray-500">
              {total} ingrediente{total === 1 ? '' : 's'} {query && `para "${query}"`}
            </p>

            <Grid cols={4} gap="md">
              {items.map((item) => (
                <Card key={item.id} className="space-y-3 p-6">
                  <h3 className="font-bold text-gray-900">{item.name}</h3>

                  {item.inci && (
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-wide text-gray-400">INCI</p>
                      <p className="text-sm text-gray-700">{item.inci}</p>
                    </div>
                  )}

                  {item.supplier && (
                    <Badge variant="secondary" className="w-fit">
                      {item.supplier}
                    </Badge>
                  )}

                  <p className="line-clamp-3 text-sm text-gray-600">{item.description}</p>
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
