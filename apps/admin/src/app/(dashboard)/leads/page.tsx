'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Card } from '@/components/Card';
import { api } from '@/lib/api-client';

interface Lead {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  company: string | null;
  sector: string | null;
  source: string;
  pageUrl: string | null;
  pageTitle: string | null;
  landingRoute: string | null;
  createdAt: string;
  ingredient: { id: string; name: string; slug: string } | null;
  content: { id: string; title: string; slug: string; type: string } | null;
}

interface Paginado {
  data: Lead[];
  total: number;
  page: number;
  totalPages: number;
}

interface RankingItem {
  id: string;
  name: string;
  slug: string;
  views: number;
  leads: number;
}

interface Stats {
  totalLeads: number;
  porSetor: { setor: string | null; total: number }[];
  porOrigem: { origem: string; total: number }[];
  maisAcessados: RankingItem[];
}

interface FilterOptions {
  origens: { valor: string; total: number }[];
  setores: { valor: string; total: number }[];
}

const ROTULO_SETOR: Record<string, string> = {
  FARMACEUTICA: 'Farmacêutica',
  COSMETICO: 'Cosmético',
  ALIMENTICIA: 'Alimentícia',
  NUTRICIONAL: 'Nutricional',
  VETERINARIO: 'Veterinário',
};

const ROTULO_ORIGEM: Record<string, string> = {
  website: 'Site (contato geral)',
  ingrediente: 'Ficha de ingrediente',
  material: 'Material baixado',
  tecnologia: 'Página de tecnologia',
};

const PERIODOS = [
  { valor: '', label: 'Qualquer data' },
  { valor: '7', label: 'Últimos 7 dias' },
  { valor: '30', label: 'Últimos 30 dias' },
  { valor: '90', label: 'Últimos 90 dias' },
];

const POR_PAGINA = 10;

const TONS = {
  ingrediente: 'bg-primary-50 text-primary-700',
  material: 'bg-amber-50 text-amber-700',
  landing: 'bg-emerald-50 text-emerald-700',
  site: 'bg-gray-100 text-gray-600',
};

function formatarData(iso: string): string {
  return new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** De onde veio o lead, em um rótulo legível para o comercial. */
function origemDoLead(lead: Lead): { rotulo: string; tom: keyof typeof TONS } {
  if (lead.ingredient) return { rotulo: lead.ingredient.name, tom: 'ingrediente' };
  if (lead.content) return { rotulo: lead.content.title, tom: 'material' };
  if (lead.landingRoute) return { rotulo: lead.landingRoute, tom: 'landing' };
  return { rotulo: lead.pageTitle || 'Site', tom: 'site' };
}

const campoFiltro =
  'w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-900 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30';

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const [stats, setStats] = useState<Stats | null>(null);
  const [opcoes, setOpcoes] = useState<FilterOptions>({ origens: [], setores: [] });

  // Os dois filtros de texto passam por debounce; selects aplicam na hora.
  const [q, setQ] = useState('');
  const [pagina, setPagina] = useState('');
  const [sector, setSector] = useState('');
  const [source, setSource] = useState('');
  const [dias, setDias] = useState('');
  const [qAplicado, setQAplicado] = useState('');
  const [paginaAplicada, setPaginaAplicada] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const t = setTimeout(() => {
      setQAplicado(q);
      setPaginaAplicada(pagina);
      setPage(1);
    }, 350);
    return () => clearTimeout(t);
  }, [q, pagina]);

  const carregar = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({
        skip: String((page - 1) * POR_PAGINA),
        take: String(POR_PAGINA),
      });
      if (qAplicado) params.set('q', qAplicado);
      if (paginaAplicada) params.set('pagina', paginaAplicada);
      if (sector) params.set('sector', sector);
      if (source) params.set('source', source);
      if (dias) params.set('dias', dias);

      const res = await api.get<Paginado>(`/leads?${params}`);
      setLeads(res.data);
      setTotal(res.total);
      setTotalPages(Math.max(1, res.totalPages));
    } catch {
      setError('Não foi possível carregar os leads');
      setLeads([]);
    } finally {
      setLoading(false);
    }
  }, [page, qAplicado, paginaAplicada, sector, source, dias]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  useEffect(() => {
    Promise.all([
      api.get<Stats>('/leads/stats'),
      api.get<FilterOptions>('/leads/filtros').catch(() => ({ origens: [], setores: [] })),
    ])
      .then(([s, o]) => {
        setStats(s);
        setOpcoes(o);
      })
      .catch(() => {});
  }, []);

  const filtrosAtivos = Boolean(qAplicado || paginaAplicada || sector || source || dias);

  const limpar = () => {
    setQ('');
    setPagina('');
    setSector('');
    setSource('');
    setDias('');
    setPage(1);
  };

  const maxViews = Math.max(1, ...(stats?.maisAcessados.map((i) => i.views) ?? [1]));
  const inicio = total === 0 ? 0 : (page - 1) * POR_PAGINA + 1;
  const fim = Math.min(page * POR_PAGINA, total);

  const paginasVisiveis = useMemo(() => {
    const ate = Math.min(totalPages, Math.max(1, page - 2) + 4);
    const de = Math.max(1, ate - 4);
    return Array.from({ length: ate - de + 1 }, (_, i) => de + i);
  }, [page, totalPages]);

  return (
    <div className="mx-auto max-w-[1600px] space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
        <p className="mt-2 max-w-3xl text-sm text-gray-500">
          Todo formulário do site grava aqui, junto com a página que converteu.
        </p>
      </div>

      {stats && (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 2xl:grid-cols-6">
          <Card>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Total de leads
            </p>
            <p className="mt-1 text-3xl font-bold text-gray-900">{stats.totalLeads}</p>
          </Card>
          {stats.porOrigem.map((o) => (
            <Card key={o.origem}>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                {ROTULO_ORIGEM[o.origem] || o.origem}
              </p>
              <p className="mt-1 text-3xl font-bold text-gray-900">{o.total}</p>
            </Card>
          ))}
        </div>
      )}

      {/* ------------------------------------------------------------------ FILTROS */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-5">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
              Nome, e-mail ou empresa
            </label>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar contato..."
              className={campoFiltro}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
              Página, ingrediente ou material
            </label>
            <input
              value={pagina}
              onChange={(e) => setPagina(e.target.value)}
              placeholder="Ex.: lipossomas, NMN, e-book..."
              className={campoFiltro}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
              Setor da empresa
            </label>
            <select
              value={sector}
              onChange={(e) => {
                setSector(e.target.value);
                setPage(1);
              }}
              className={campoFiltro}
            >
              <option value="">Todos os setores</option>
              {opcoes.setores.map((s) => (
                <option key={s.valor} value={s.valor}>
                  {ROTULO_SETOR[s.valor] || s.valor} ({s.total})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
              Origem
            </label>
            <select
              value={source}
              onChange={(e) => {
                setSource(e.target.value);
                setPage(1);
              }}
              className={campoFiltro}
            >
              <option value="">Todas as origens</option>
              {opcoes.origens.map((o) => (
                <option key={o.valor} value={o.valor}>
                  {ROTULO_ORIGEM[o.valor] || o.valor} ({o.total})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
              Período
            </label>
            <select
              value={dias}
              onChange={(e) => {
                setDias(e.target.value);
                setPage(1);
              }}
              className={campoFiltro}
            >
              {PERIODOS.map((p) => (
                <option key={p.valor} value={p.valor}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
          <p className="text-sm text-gray-500">
            {loading ? (
              'Buscando...'
            ) : total === 0 ? (
              'Nenhum lead encontrado'
            ) : (
              <>
                Mostrando{' '}
                <span className="font-semibold text-gray-900">
                  {inicio}–{fim}
                </span>{' '}
                de <span className="font-semibold text-gray-900">{total}</span>
                {filtrosAtivos && ' (filtrado)'}
              </>
            )}
          </p>
          {filtrosAtivos && (
            <button
              type="button"
              onClick={limpar}
              className="text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              Limpar filtros
            </button>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------------- LISTA */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {error ? (
          <p className="py-12 text-center text-sm text-red-600">{error}</p>
        ) : loading ? (
          <p className="py-12 text-center text-sm text-gray-500">Carregando...</p>
        ) : leads.length === 0 ? (
          <div className="space-y-3 py-14 text-center">
            <p className="text-sm text-gray-500">
              {filtrosAtivos
                ? 'Nenhum lead corresponde a esses filtros.'
                : 'Nenhum lead recebido ainda.'}
            </p>
            {filtrosAtivos && (
              <button
                type="button"
                onClick={limpar}
                className="text-sm font-semibold text-primary-600 hover:text-primary-700"
              >
                Limpar filtros
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  {['Data', 'Contato', 'Empresa', 'Setor', 'Página que converteu'].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-600"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.map((lead) => {
                  const origem = origemDoLead(lead);
                  return (
                    <tr key={lead.id} className="transition-colors hover:bg-gray-50/70">
                      <td className="whitespace-nowrap px-6 py-4 align-top text-sm text-gray-600">
                        {formatarData(lead.createdAt)}
                      </td>
                      <td className="px-6 py-4 align-top text-sm">
                        <span className="block font-semibold text-gray-900">{lead.name || '—'}</span>
                        <a
                          href={`mailto:${lead.email}`}
                          className="block text-primary-600 hover:underline"
                        >
                          {lead.email}
                        </a>
                        {lead.phone && <span className="block text-gray-500">{lead.phone}</span>}
                      </td>
                      <td className="px-6 py-4 align-top text-sm text-gray-700">
                        {lead.company || '—'}
                      </td>
                      <td className="px-6 py-4 align-top text-sm text-gray-700">
                        {lead.sector ? ROTULO_SETOR[lead.sector] ?? lead.sector : '—'}
                      </td>
                      <td className="px-6 py-4 align-top text-sm">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${TONS[origem.tom]}`}
                        >
                          {origem.rotulo}
                        </span>
                        {lead.pageUrl && (
                          <a
                            href={lead.pageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1.5 block max-w-xs truncate text-xs text-gray-400 hover:text-primary-600 hover:underline"
                          >
                            {lead.pageUrl}
                          </a>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && !loading && (
          <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg border border-gray-300 px-3.5 py-1.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Anterior
            </button>

            <div className="flex items-center gap-1">
              {paginasVisiveis.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  className={`h-9 min-w-9 rounded-lg px-3 text-sm font-semibold transition ${
                    p === page ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {p}
                </button>
              ))}
              {paginasVisiveis[paginasVisiveis.length - 1] < totalPages && (
                <span className="px-2 text-sm text-gray-400">de {totalPages}</span>
              )}
            </div>

            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-lg border border-gray-300 px-3.5 py-1.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Próxima →
            </button>
          </div>
        )}
      </div>

      {/* ------------------------------------ RANKING — agora depois da lista de leads */}
      {stats && (
        <Card>
          <h2 className="text-lg font-bold text-gray-900">Ingredientes mais acessados</h2>
          <p className="mt-1 max-w-3xl text-sm text-gray-600">
            Visitas na ficha pública e quantos leads cada uma gerou. Muita visita sem lead indica
            página a melhorar; poucos acessos convertendo bem pedem mais divulgação.
          </p>

          {stats.maisAcessados.length === 0 ? (
            <p className="mt-4 text-sm text-gray-500">Nenhum acesso registrado ainda.</p>
          ) : (
            <div className="mt-5 space-y-3">
              {stats.maisAcessados.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <span className="w-56 flex-shrink-0 truncate text-sm font-medium text-gray-900">
                    {item.name}
                  </span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-primary-500 transition-all duration-700"
                      style={{ width: `${(item.views / maxViews) * 100}%` }}
                    />
                  </div>
                  <span className="w-24 flex-shrink-0 text-right text-sm text-gray-600">
                    {item.views} visita{item.views === 1 ? '' : 's'}
                  </span>
                  <span className="w-20 flex-shrink-0 text-right text-sm font-semibold text-primary-700">
                    {item.leads} lead{item.leads === 1 ? '' : 's'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
