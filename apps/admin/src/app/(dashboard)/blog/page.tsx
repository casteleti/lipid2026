'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { api, resolveMediaUrl } from '@/lib/api-client';

interface ContentItem {
  id: string;
  type: 'ARTIGO' | 'DOWNLOAD';
  title: string;
  slug: string;
  featured: string | null;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  views: number;
  publishedAt: string | null;
  categories: { category: { name: string } }[];
  summaryPoints: { id: string }[];
  faqs: { id: string }[];
  files: { id: string }[];
}

const ROTULO_STATUS: Record<ContentItem['status'], { text: string; className: string }> = {
  DRAFT: { text: 'Rascunho', className: 'bg-yellow-100 text-yellow-800' },
  PUBLISHED: { text: 'Publicado', className: 'bg-green-100 text-green-800' },
  ARCHIVED: { text: 'Arquivado', className: 'bg-gray-100 text-gray-600' },
};

type Filtro = 'TODOS' | 'ARTIGO' | 'DOWNLOAD';

export default function ConteudoPage() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [filtro, setFiltro] = useState<Filtro>('TODOS');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get<{ data: ContentItem[] }>('/content?take=100')
      .then((res) => setItems(res.data))
      .catch(() => setError('Não foi possível carregar os conteúdos'))
      .finally(() => setLoading(false));
  }, []);

  const visiveis = useMemo(
    () => (filtro === 'TODOS' ? items : items.filter((i) => i.type === filtro)),
    [items, filtro],
  );

  const contagem = useMemo(
    () => ({
      TODOS: items.length,
      ARTIGO: items.filter((i) => i.type === 'ARTIGO').length,
      DOWNLOAD: items.filter((i) => i.type === 'DOWNLOAD').length,
    }),
    [items],
  );

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Conteúdo técnico</h1>
          <p className="mt-1 text-sm text-gray-600">
            Artigos e materiais para download aparecem juntos na mesma listagem do site.
          </p>
        </div>
        <Link href="/blog/novo">
          <Button variant="primary">+ Novo conteúdo</Button>
        </Link>
      </div>

      <div className="mb-5 flex gap-2">
        {(['TODOS', 'ARTIGO', 'DOWNLOAD'] as Filtro[]).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFiltro(f)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filtro === f ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {f === 'TODOS' ? 'Todos' : f === 'ARTIGO' ? 'Artigos' : 'Downloads'}
            <span className="ml-1.5 opacity-60">{contagem[f]}</span>
          </button>
        ))}
      </div>

      <Card>
        {loading ? (
          <p className="py-8 text-center text-gray-500">Carregando...</p>
        ) : error ? (
          <p className="py-8 text-center text-red-600">{error}</p>
        ) : visiveis.length === 0 ? (
          <p className="py-8 text-center text-gray-500">Nenhum conteúdo nesta aba ainda.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700">
                    Conteúdo
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700">
                    Tipo
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700">
                    Categorias
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700">
                    Completude
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-700">
                    Visitas
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {visiveis.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {item.featured ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={resolveMediaUrl(item.featured)}
                            alt=""
                            className="h-10 w-16 flex-shrink-0 rounded object-cover"
                          />
                        ) : (
                          <span className="flex h-10 w-16 flex-shrink-0 items-center justify-center rounded bg-gray-100 text-[10px] text-gray-400">
                            sem capa
                          </span>
                        )}
                        <span className="font-medium text-gray-900">{item.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${
                          item.type === 'DOWNLOAD'
                            ? 'bg-primary-50 text-primary-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {item.type === 'DOWNLOAD' ? 'Download' : 'Artigo'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {item.categories.map((c) => c.category.name).join(', ') || '—'}
                    </td>
                    {/* Sinaliza o que falta para o conteúdo render bem em busca. */}
                    <td className="px-4 py-3 text-xs">
                      <div className="flex gap-1.5">
                        <span
                          title="Imagem de capa"
                          className={item.featured ? 'text-green-600' : 'text-gray-300'}
                        >
                          capa
                        </span>
                        <span
                          title="Resumo em tópicos"
                          className={item.summaryPoints?.length ? 'text-green-600' : 'text-gray-300'}
                        >
                          resumo
                        </span>
                        <span
                          title="Perguntas frequentes"
                          className={item.faqs?.length ? 'text-green-600' : 'text-gray-300'}
                        >
                          FAQ
                        </span>
                        {item.type === 'DOWNLOAD' && (
                          <span
                            title="Arquivos anexados"
                            className={item.files?.length ? 'text-green-600' : 'text-red-500'}
                          >
                            arquivo
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-gray-600">{item.views ?? 0}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${ROTULO_STATUS[item.status].className}`}
                      >
                        {ROTULO_STATUS[item.status].text}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Link href={`/blog/${item.id}`} className="text-primary-600 hover:underline">
                        Editar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
