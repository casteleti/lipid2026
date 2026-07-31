'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import type { SegmentPage, StatsRow } from './types';

export default function SegmentosPage() {
  const [pages, setPages] = useState<SegmentPage[]>([]);
  const [stats, setStats] = useState<StatsRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    Promise.all([
      api.get<SegmentPage[]>('/segment-pages'),
      api.get<StatsRow[]>('/page-views/summary'),
    ])
      .then(([p, s]) => {
        setPages(p.sort((a, b) => a.slug.localeCompare(b.slug)));
        setStats(s);
      })
      .catch(() => setMessage('Não foi possível carregar as páginas de segmento'))
      .finally(() => setLoading(false));
  }, []);

  const statFor = (sector: string) => stats.find((s) => s.sector === sector);

  if (loading) return <p className="text-sm text-gray-500">Carregando...</p>;

  return (
    <div className="mx-auto max-w-[1600px] space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Páginas por Segmento</h1>
        <p className="mt-2 max-w-3xl text-sm text-gray-500">
          As 4 landing pages de <code className="rounded bg-gray-100 px-1.5 py-0.5">/segmentos/*</code> —
          Farmacêutica, Cosmética, Nutricional e Veterinária. Clique em uma delas para editar todo o
          conteúdo em uma tela própria.
        </p>
      </div>

      {message && <p className="text-sm font-semibold text-red-600">{message}</p>}

      <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-4">
        {pages.map((page) => {
          const s = statFor(page.sector);

          return (
            <Link
              key={page.id}
              href={`/segmentos/${page.slug}`}
              className="group flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">
                  /segmentos/{page.slug}
                </p>
                {!page.active && (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
                    inativa
                  </span>
                )}
              </div>

              <p className="mt-3 min-h-[3.5rem] font-semibold leading-snug text-gray-900 group-hover:text-primary-700">
                {page.h1}
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
    </div>
  );
}
