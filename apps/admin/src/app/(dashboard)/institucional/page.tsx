'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import type { Section } from './types';

export default function InstitucionalPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get<Section[]>('/institutional-sections')
      .then((data) => setSections(data.sort((a, b) => a.order - b.order)))
      .catch(() => setError('Não foi possível carregar a página institucional'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-sm text-gray-500">Carregando...</p>;

  return (
    <div className="mx-auto max-w-[1600px] space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Página Institucional</h1>
        <p className="mt-2 max-w-3xl text-sm text-gray-500">
          Cada bloco de <code className="rounded bg-gray-100 px-1.5 py-0.5">/sobre</code> é uma
          seção aqui, na mesma ordem em que aparece no site. Clique em uma delas para editar todo
          o conteúdo em uma tela própria.
        </p>
      </div>

      {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

      <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
        {sections.map((section) => (
          <Link
            key={section.id}
            href={`/institucional/${section.slug}`}
            className="group flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">
                #{section.order} · {section.slug}
              </p>
              {!section.active && (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
                  oculta
                </span>
              )}
            </div>

            <p className="mt-3 min-h-[3rem] font-semibold leading-snug text-gray-900 group-hover:text-primary-700">
              {section.title || section.eyebrow || '(sem título)'}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-4 text-xs">
              <span className="rounded-full bg-gray-100 px-2.5 py-1 font-medium text-gray-600">
                {section.type}
              </span>
              {section.items.length > 0 && (
                <span className="rounded-full bg-primary-50 px-2.5 py-1 font-medium text-primary-700">
                  {section.items.length} {section.items.length === 1 ? 'item' : 'itens'}
                </span>
              )}
              {section.imageUrl && (
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700">
                  com imagem
                </span>
              )}
            </div>

            <span className="mt-5 text-sm font-semibold text-primary-600">Editar seção →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
