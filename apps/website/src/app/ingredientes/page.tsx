'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ListingHero } from '@/components/ui/ListingHero';
import { SearchBar } from '@/components/ui/SearchBar';
import { Pagination } from '@/components/ui/Pagination';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Grid } from '@/components/ui/Grid';
import { Section } from '@/components/ui/Section';
import { CollapsibleChips, type ChipOption } from '@/components/ui/CollapsibleChips';
import { ViewToggle, type ModoVisualizacao } from '@/components/ui/ViewToggle';
import { CHAVE_BUSCA } from '@/components/ingredientes/BackToSearch';
import { LiaWidget } from '@/components/lia/LiaWidget';

/** Preferência de exibição — fica no localStorage porque é gosto de quem navega, não
 *  filtro: não deve entrar na URL nem ser restaurada junto com uma busca compartilhada. */
const CHAVE_MODO = 'lipid:ingredientes:modo';

interface Ingredient {
  id: string;
  name: string;
  slug: string;
  description: string;
  excerpt: string | null;
  inci: string | null;
  partner: { id: string; name: string; slug: string } | null;
  category: { id: string; name: string; slug: string } | null;
  codes: { id: string; code: string }[];
  tags: { tag: { id: string; name: string; slug: string } }[];
}

interface Categoria {
  id: string;
  name: string;
  slug: string;
  _count: { ingredients: number };
}

interface Parceiro {
  id: string;
  name: string;
  slug: string;
}

interface Paginated<T> {
  data: T[];
  total: number;
  totalPages: number;
}

// 5 fileiras de 4 — reduz o número de páginas sem deixar a rolagem interminável.
const PAGE_SIZE = 20;

export default function IngredientesPage() {
  const [items, setItems] = useState<Ingredient[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [parceiros, setParceiros] = useState<Parceiro[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fabricante, setFabricante] = useState('');
  const [tag, setTag] = useState('');
  const [modo, setModo] = useState<ModoVisualizacao>('grade');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const listaRef = useRef<HTMLDivElement>(null);
  // Só depois de ler a URL é que podemos gravar em sessionStorage — senão o primeiro
  // efeito sobrescreveria a busca salva com o estado vazio inicial.
  const pronto = useRef(false);

  useEffect(() => {
    // Lido de window em vez de useSearchParams para não exigir Suspense no prerender.
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get('q') || '');
    setCategoria(params.get('categoria') || '');
    setFabricante(params.get('fabricante') || '');
    setTag(params.get('tag') || '');
    setPage(Number(params.get('page')) || 1);
    pronto.current = true;

    try {
      const salvo = localStorage.getItem(CHAVE_MODO);
      if (salvo === 'grade' || salvo === 'lista') setModo(salvo);
    } catch {
      // localStorage bloqueado: segue no modo padrão.
    }

    const base = process.env.NEXT_PUBLIC_API_URL;
    fetch(`${base}/api/v1/ingredient-categories`)
      .then((r) => r.json())
      .then((json) => setCategorias(Array.isArray(json) ? json : []))
      .catch(() => setCategorias([]));

    fetch(`${base}/api/v1/partners?take=100`)
      .then((r) => r.json())
      .then((json) => setParceiros(json?.data ?? []))
      .catch(() => setParceiros([]));
  }, []);

  const fetchItems = useCallback(
    async (currentPage: number, q: string, cat: string, fab: string, tg: string) => {
      setLoading(true);
      setError(false);
      try {
        const skip = (currentPage - 1) * PAGE_SIZE;
        const params = new URLSearchParams({ skip: String(skip), take: String(PAGE_SIZE) });
        if (q) params.set('q', q);
        if (cat) params.set('categoria', cat);
        if (fab) params.set('fabricante', fab);
        if (tg) params.set('tag', tg);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ingredients?${params}`);
        if (!res.ok) throw new Error('Falha ao carregar ingredientes');
        const json: Paginated<Ingredient> = await res.json();
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
    },
    [],
  );

  useEffect(() => {
    fetchItems(page, query, categoria, fabricante, tag);
  }, [fetchItems, page, query, categoria, fabricante, tag]);

  // Espelha o estado na URL e guarda para o "Voltar na sua pesquisa" da ficha do produto.
  useEffect(() => {
    if (!pronto.current) return;

    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (categoria) params.set('categoria', categoria);
    if (fabricante) params.set('fabricante', fabricante);
    if (tag) params.set('tag', tag);
    if (page > 1) params.set('page', String(page));

    const qs = params.toString();
    window.history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname);
    try {
      sessionStorage.setItem(CHAVE_BUSCA, qs);
    } catch {
      // sessionStorage bloqueado: o botão de voltar cai na listagem limpa.
    }
  }, [query, categoria, fabricante, tag, page]);

  const opcoesCategoria: ChipOption[] = useMemo(
    () =>
      categorias.map((c) => ({
        valor: c.slug,
        rotulo: c.name,
        contagem: c._count?.ingredients,
      })),
    [categorias],
  );

  const trocarModo = (novo: ModoVisualizacao) => {
    setModo(novo);
    try {
      localStorage.setItem(CHAVE_MODO, novo);
    } catch {
      // localStorage bloqueado: a escolha vale só nesta navegação.
    }
  };

  const trocarPagina = (nova: number) => {
    setPage(nova);
    // Sem isto a pessoa troca de página e continua no rodapé, olhando a paginação
    // enquanto os produtos novos ficaram lá em cima.
    listaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const limparTudo = () => {
    setQuery('');
    setCategoria('');
    setFabricante('');
    setTag('');
    setPage(1);
  };

  const temFiltro = Boolean(query || categoria || fabricante || tag);

  return (
    <>
      <ListingHero
        badge="INGREDIENTES"
        title="Ingredientes Especializados"
        description="Catálogo de ingredientes lipídicos de alta performance para formulações exigentes, fornecidos por parceiros de referência mundial."
      >
        <SearchBar
          value={query}
          onChange={(q) => {
            setQuery(q);
            setPage(1);
          }}
          placeholder="Buscar por nome, INCI ou código..."
        />
      </ListingHero>

      <Section>
        <div className="mb-10 space-y-6">
          {parceiros.length > 0 && (
            <div>
              <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-gray-400">
                Fabricante
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setFabricante('');
                    setPage(1);
                  }}
                  aria-pressed={fabricante === ''}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    fabricante === ''
                      ? 'bg-primary-600 text-white shadow-[0_10px_24px_-12px_rgba(30,63,153,0.7)]'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Todos
                </button>
                {parceiros.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setFabricante(p.slug === fabricante ? '' : p.slug);
                      setPage(1);
                    }}
                    aria-pressed={fabricante === p.slug}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      fabricante === p.slug
                        ? 'bg-primary-600 text-white shadow-[0_10px_24px_-12px_rgba(30,63,153,0.7)]'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {opcoesCategoria.length > 0 && (
            <div>
              <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-gray-400">
                Categoria
              </p>
              <CollapsibleChips
                opcoes={opcoesCategoria}
                selecionado={categoria}
                onSelect={(valor) => {
                  setCategoria(valor);
                  setPage(1);
                }}
              />
            </div>
          )}

          {tag && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Marcador:</span>
              <button
                type="button"
                onClick={() => {
                  setTag('');
                  setPage(1);
                }}
                className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3.5 py-1.5 text-sm font-medium text-primary-700 transition-colors hover:bg-primary-100"
              >
                {tag}
                <span aria-hidden>×</span>
                <span className="sr-only">Remover filtro de marcador</span>
              </button>
            </div>
          )}
        </div>

        <div ref={listaRef} className="scroll-mt-28">
          {loading ? (
            <p className="py-12 text-center text-gray-500">Carregando...</p>
          ) : error ? (
            <div className="space-y-4 py-12 text-center">
              <p className="text-gray-600">Não foi possível carregar os ingredientes agora.</p>
              <Button
                variant="outline"
                onClick={() => fetchItems(page, query, categoria, fabricante, tag)}
              >
                Tentar novamente
              </Button>
            </div>
          ) : items.length === 0 ? (
            <div className="space-y-4 py-12 text-center">
              <p className="text-gray-500">Nenhum ingrediente encontrado com esses filtros.</p>
              {temFiltro && (
                <Button variant="outline" onClick={limparTudo}>
                  Limpar filtros
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-12">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-4">
                  <p className="text-sm text-gray-500">
                    {total} ingrediente{total === 1 ? '' : 's'} {query && `para "${query}"`}
                  </p>
                  {temFiltro && (
                    <button
                      type="button"
                      onClick={limparTudo}
                      className="text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
                    >
                      Limpar filtros
                    </button>
                  )}
                </div>

                <ViewToggle valor={modo} onChange={trocarModo} />
              </div>

              {modo === 'grade' ? (
                <Grid cols={4} gap="md">
                  {items.map((item) => (
                    <Link
                      key={item.id}
                      href={`/ingredientes/${item.slug}`}
                      className="group flex h-full flex-col gap-3 overflow-hidden rounded-[20px] border border-black/[0.05] bg-white p-6 transition-all duration-700 ease-brand hover:-translate-y-1.5 hover:border-primary-200 hover:shadow-[0_40px_60px_-30px_rgba(15,23,42,0.22),0_8px_20px_-12px_rgba(15,23,42,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                    >
                      <div className="space-y-1">
                        <h3 className="font-bold text-gray-900 transition-colors group-hover:text-primary-700">
                          {item.name}
                        </h3>
                        {item.excerpt && (
                          <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
                            {item.excerpt}
                          </p>
                        )}
                      </div>

                      {item.inci && (
                        <div className="space-y-1">
                          <p className="text-xs uppercase tracking-wide text-gray-500">INCI</p>
                          <p className="text-sm text-gray-700">{item.inci}</p>
                        </div>
                      )}

                      {item.codes.length > 0 && (
                        <div className="space-y-1">
                          <p className="text-xs uppercase tracking-wide text-gray-500">
                            Código{item.codes.length > 1 ? 's' : ''}
                          </p>
                          <p className="font-mono text-xs text-gray-600">
                            {item.codes.map((c) => c.code).join(' · ')}
                          </p>
                        </div>
                      )}

                      <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-2">
                        {item.partner && <Badge variant="secondary">{item.partner.name}</Badge>}
                        {item.category && <Badge variant="dark">{item.category.name}</Badge>}
                      </div>
                    </Link>
                  ))}
                </Grid>
              ) : (
                /* Listagem: colunas alinhadas entre as linhas. É o modo de COMPARAR — o
                   INCI e o código de um produto caem exatamente sob os do produto de cima,
                   o que a grade não permite porque cada card tem altura própria. */
                <div className="divide-y divide-gray-100 overflow-hidden rounded-[20px] border border-black/[0.05] bg-white">
                  {items.map((item) => (
                    <Link
                      key={item.id}
                      href={`/ingredientes/${item.slug}`}
                      className="group grid grid-cols-1 items-center gap-x-6 gap-y-3 px-6 py-4 transition-colors duration-300 hover:bg-gray-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1.4fr)_auto]"
                    >
                      <div className="min-w-0 space-y-1">
                        {/* Sem a chamada aqui, ao contrário da grade: no modo comparação o
                            nome é a informação que distingue os produtos (muitos passam de
                            50 caracteres), e a chamada só empurraria as linhas para baixo. */}
                        <h3 className="font-bold leading-snug text-gray-900 transition-colors group-hover:text-primary-700">
                          {item.name}
                        </h3>
                        {/* Selos abaixo do nome só no mobile, onde não há colunas. */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-1 lg:hidden">
                          {item.partner && <Badge variant="secondary">{item.partner.name}</Badge>}
                          {item.category && <Badge variant="dark">{item.category.name}</Badge>}
                        </div>
                      </div>

                      <div className="min-w-0">
                        {item.inci ? (
                          <>
                            <p className="text-[10px] uppercase tracking-wide text-gray-400">INCI</p>
                            <p className="truncate text-sm text-gray-700">{item.inci}</p>
                          </>
                        ) : (
                          <span className="hidden text-sm text-gray-300 lg:inline">—</span>
                        )}
                      </div>

                      <div className="min-w-0">
                        {item.codes.length > 0 ? (
                          <>
                            <p className="text-[10px] uppercase tracking-wide text-gray-400">
                              Código{item.codes.length > 1 ? 's' : ''}
                            </p>
                            <p className="truncate font-mono text-xs text-gray-600">
                              {item.codes.map((c) => c.code).join(' · ')}
                            </p>
                          </>
                        ) : (
                          <span className="hidden text-sm text-gray-300 lg:inline">—</span>
                        )}
                      </div>

                      {/* Fabricante e categoria empilhados na própria coluna: lado a lado
                          eles quebravam em duas linhas e engordavam a linha inteira, que é
                          o oposto do que se quer numa listagem. */}
                      <div className="hidden min-w-0 flex-col items-start gap-1 lg:flex">
                        {item.partner && (
                          <span className="max-w-full truncate text-xs font-semibold text-gray-700">
                            {item.partner.name}
                          </span>
                        )}
                        {item.category && (
                          <span className="max-w-full truncate text-xs text-gray-500">
                            {item.category.name}
                          </span>
                        )}
                      </div>

                      <span
                        aria-hidden
                        className="hidden text-gray-300 transition-all duration-500 ease-brand group-hover:translate-x-1 group-hover:text-primary-600 lg:inline"
                      >
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              )}

              <Pagination currentPage={page} totalPages={totalPages} onPageChange={trocarPagina} />
            </div>
          )}
        </div>
      </Section>

      <LiaWidget />
    </>
  );
}
