'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { api } from '@/lib/api-client';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  slug: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  categories: { category: { name: string } }[];
}

interface Paginated<T> {
  data: T[];
}

const statusLabel: Record<Post['status'], { text: string; className: string }> = {
  DRAFT: { text: 'Rascunho', className: 'bg-yellow-100 text-yellow-800' },
  PUBLISHED: { text: 'Publicado', className: 'bg-green-100 text-green-800' },
  ARCHIVED: { text: 'Arquivado', className: 'bg-gray-100 text-gray-600' },
};

export default function BlogPage() {
  const [items, setItems] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get<Paginated<Post>>('/content?take=100')
      .then((res) => setItems(res.data))
      .catch(() => setError('Não foi possível carregar os posts'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Blog</h1>
        <Link href="/blog/novo">
          <Button variant="primary">+ Novo Post</Button>
        </Link>
      </div>

      <Card>
        {loading ? (
          <p className="text-gray-500 py-8 text-center">Carregando...</p>
        ) : error ? (
          <p className="text-red-600 py-8 text-center">{error}</p>
        ) : items.length === 0 ? (
          <p className="text-gray-500 py-8 text-center">Nenhum post cadastrado ainda.</p>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Título</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Categorias</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{item.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.categories.map((c) => c.category.name).join(', ') || '—'}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${statusLabel[item.status].className}`}
                    >
                      {statusLabel[item.status].text}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Link href={`/blog/${item.id}`} className="text-primary-600 hover:underline">
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
