'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { api } from '@/lib/api-client';
import type { Technology, TechStatsRow } from './types';

interface Paginated<T> {
  data: T[];
}

export default function TecnologiasPage() {
  const [items, setItems] = useState<Technology[]>([]);
  const [stats, setStats] = useState<TechStatsRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      api.get<Paginated<Technology>>('/technologies?take=100'),
      // Se o resumo falhar, a lista continua útil — os números não são o essencial da tela.
      api.get<TechStatsRow[]>('/page-views/summary/technologies').catch(() => [] as TechStatsRow[]),
    ])
      .then(([res, s]) => {
        setItems(res.data);
        setStats(s);
      })
      .catch(() => setError('Não foi possível carregar as tecnologias'))
      .finally(() => setLoading(false));
  }, []);

  const statFor = (slug: string) => stats.find((s) => s.slug === slug);

  return (
    <div className="mx-auto max-w-[1600px] space-y-8">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tecnologias</h1>
          <p className="mt-2 max-w-3xl text-sm text-gray-500">
            Cada tecnologia é também a landing page de{' '}
            <code className="rounded bg-gray-100 px-1.5 py-0.5">/tecnologias/*</code> — hero,
            essência técnica e formulário. Acessos e leads gerados aparecem em cada card.
          </p>
        </div>
        <Link href="/tecnologias/novo">
          <Button variant="primary">+ Nova Tecnologia</Button>
        </Link>
      </div>

      {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

      {loading ? (
        <p className="text-sm text-gray-500">Carregando...</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-gray-500">Nenhuma tecnologia cadastrada ainda.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
          {items.map((item) => {
            const s = statFor(item.slug);

            return (
              <Link
                key={item.id}
                href={`/tecnologias/${item.id}`}
                className="group flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">
                    /tecnologias/{item.slug}
                  </p>
                  {!item.active && (
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
                      inativa
                    </span>
                  )}
                </div>

                <p className="mt-3 text-lg font-bold text-gray-900 group-hover:text-primary-700">
                  {item.name}
                </p>
                <p className="mt-2 min-h-[3rem] text-sm leading-relaxed text-gray-600">
                  {item.h1 || item.excerpt || 'Landing ainda não preenchida.'}
                </p>

                <div className="mt-6 grid grid-cols-3 gap-2 border-t border-gray-100 pt-5 text-center">
                  <div>
                    <p className="text-xl font-bold text-gray-900">{s?.views ?? 0}</p>
                    <p className="mt-0.5 text-xs text-gray-500">acessos</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-primary-600">{s?.leads ?? 0}</p>
                    <p className="mt-0.5 text-xs text-gray-500">leads</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-green-600">{s?.conversionRate ?? 0}%</p>
                    <p className="mt-0.5 text-xs text-gray-500">conversão</p>
                  </div>
                </div>

                <span className="mt-5 text-sm font-semibold text-primary-600">Editar página →</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
