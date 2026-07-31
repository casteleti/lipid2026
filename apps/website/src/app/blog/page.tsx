'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ListingHero } from '@/components/ui/ListingHero';
import { SearchBar } from '@/components/ui/SearchBar';
import { Pagination } from '@/components/ui/Pagination';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { resolveMediaUrl } from '@/lib/api';

interface ContentItem {
  id: string;
  type: 'ARTIGO' | 'DOWNLOAD';
  title: string;
  slug: string;
  excerpt: string | null;
  featured: string | null;
  featuredAlt: string | null;
  author: string | null;
  publishedAt: string | null;
  categories: { category: { id: string; name: string; slug: string } }[];
  files: { id: string; mimetype: string | null }[];
}

interface Paginated<T> {
  data: T[];
  total: number;
  totalPages: number;
}

const PAGE_SIZE = 9; // múltiplo de 3: a grade nunca fecha com linha quebrada

type Filtro = 'TODOS' | 'ARTIGO' | 'DOWNLOAD';

const FILTROS: { valor: Filtro; rotulo: string }[] = [
  { valor: 'TODOS', rotulo: 'Tudo' },
  { valor: 'ARTIGO', rotulo: 'Artigos' },
  { valor: 'DOWNLOAD', rotulo: 'Materiais para baixar' },
];

function rotuloArquivo(mimetype: string | null): string {
  if (!mimetype) return 'ARQUIVO';
  if (mimetype.includes('pdf')) return 'PDF';
  if (mimetype.includes('presentation') || mimetype.includes('powerpoint')) return 'APRESENTAÇÃO';
  if (mimetype.includes('spreadsheet') || mimetype.includes('excel')) return 'PLANILHA';
  if (mimetype.includes('csv')) return 'CSV';
  return 'ARQUIVO';
}

function formatarData(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export default function ConteudoTecnicoPage() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [filtro, setFiltro] = useState<Filtro>('TODOS');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchItems = useCallback(async (currentPage: number, q: string, tipo: Filtro) => {
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
      if (tipo !== 'TODOS') params.set('tipo', tipo);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/content?${params}`);
      if (!res.ok) throw new Error('Falha ao carregar');
      const json: Paginated<ContentItem> = await res.json();
      setItems(json.data || []);
      setTotal(json.total || 0);
      setTotalPages(json.totalPages || 1);
    } catch {
      setItems([]);
      setTotal(0);
      setTotalPages(1);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems(page, query, filtro);
  }, [fetchItems, page, query, filtro]);

  return (
    <>
      <ListingHero
        badge="CONTEÚDO TÉCNICO"
        title="Conhecimento aplicado a formulação"
        description="Artigos e materiais sobre lipídios, fosfolipídios e tecnologias de entrega — escritos para quem desenvolve produto."
      >
        <SearchBar
          value={query}
          onChange={(q) => {
            setQuery(q);
            setPage(1);
          }}
          placeholder="Buscar por tema..."
        />
      </ListingHero>

      <Section>
        <div className="mb-12 flex flex-wrap gap-2">
          {FILTROS.map((f) => (
            <button
              key={f.valor}
              type="button"
              onClick={() => {
                setFiltro(f.valor);
                setPage(1);
              }}
              aria-pressed={filtro === f.valor}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                filtro === f.valor
                  ? 'bg-primary-600 text-white shadow-[0_10px_24px_-12px_rgba(30,63,153,0.7)]'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {f.rotulo}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="py-12 text-center text-gray-500">Carregando...</p>
        ) : error ? (
          <div className="space-y-4 py-12 text-center">
            <p className="text-gray-600">Não foi possível carregar os conteúdos agora.</p>
            <Button variant="outline" onClick={() => fetchItems(page, query, filtro)}>
              Tentar novamente
            </Button>
          </div>
        ) : items.length === 0 ? (
          <p className="py-12 text-center text-gray-500">Nenhum conteúdo encontrado.</p>
        ) : (
          <div className="space-y-12">
            <p className="text-sm text-gray-500">
              {total} conteúdo{total === 1 ? '' : 's'} {query && `para "${query}"`}
            </p>

            {/* 3 por linha no desktop, como pedido; 2 no tablet e 1 no celular. */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item, i) => {
                const ehDownload = item.type === 'DOWNLOAD';
                return (
                  <Reveal key={item.id} delay={(i % 3) * 90}>
                    <Link
                      href={`/blog/${item.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-black/[0.05] bg-white transition-all duration-700 ease-brand hover:-translate-y-1.5 hover:border-primary-200 hover:shadow-[0_40px_60px_-30px_rgba(15,23,42,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                        {item.featured ? (
                          <Image
                            src={resolveMediaUrl(item.featured)}
                            alt={item.featuredAlt || item.title}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover transition-transform duration-700 ease-brand group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary-50 to-gray-100">
                            <span className="text-sm font-medium text-primary-300">
                              Lipid Ingredients
                            </span>
                          </div>
                        )}

                        <span
                          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${
                            ehDownload ? 'bg-primary-900/90 text-white' : 'bg-white/90 text-gray-700'
                          }`}
                        >
                          {ehDownload ? rotuloArquivo(item.files?.[0]?.mimetype ?? null) : 'Artigo'}
                        </span>
                      </div>

                      {/* Título abaixo da imagem, conforme o padrão pedido. */}
                      <div className="flex flex-1 flex-col gap-3 p-6">
                        {item.categories.length > 0 && (
                          <p className="text-[10px] font-bold uppercase tracking-wider text-primary-600">
                            {item.categories.map((c) => c.category.name).join(' · ')}
                          </p>
                        )}

                        <h3 className="text-lg font-bold leading-snug text-gray-900 transition-colors group-hover:text-primary-700">
                          {item.title}
                        </h3>

                        {item.excerpt && (
                          <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
                            {item.excerpt}
                          </p>
                        )}

                        <div className="mt-auto flex items-center justify-between pt-3 text-xs text-gray-500">
                          <span>{formatarData(item.publishedAt)}</span>
                          <span className="inline-flex items-center gap-1.5 font-semibold text-primary-600">
                            {ehDownload ? 'Baixar' : 'Ler'}
                            <span
                              aria-hidden
                              className="transition-transform duration-500 ease-brand group-hover:translate-x-1"
                            >
                              →
                            </span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>

            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        )}
      </Section>
    </>
  );
}
