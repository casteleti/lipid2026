'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { api } from '@/lib/api-client';
import Link from 'next/link';

interface Ingredient {
  id: string;
  name: string;
  slug: string;
  active: boolean;
}

interface Paginated<T> {
  data: T[];
}

export default function IngredientesPage() {
  const [items, setItems] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get<Paginated<Ingredient>>('/ingredients?take=100')
      .then((res) => setItems(res.data))
      .catch(() => setError('Não foi possível carregar os ingredientes'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Ingredientes</h1>
        <Link href="/ingredientes/novo">
          <Button variant="primary">+ Novo Ingrediente</Button>
        </Link>
      </div>

      <Card>
        {loading ? (
          <p className="text-gray-500 py-8 text-center">Carregando...</p>
        ) : error ? (
          <p className="text-red-600 py-8 text-center">{error}</p>
        ) : items.length === 0 ? (
          <p className="text-gray-500 py-8 text-center">Nenhum ingrediente cadastrado ainda.</p>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.slug}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        item.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {item.active ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Link href={`/ingredientes/${item.id}`} className="text-primary-600 hover:underline">
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
