'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/Card';
import { api } from '@/lib/api-client';

interface Stats {
  applications: number;
  technologies: number;
  ingredients: number;
  partners: number;
  leads: number;
  content: number;
}

const cards: { key: keyof Stats; label: string }[] = [
  { key: 'applications', label: 'Aplicações' },
  { key: 'technologies', label: 'Tecnologias' },
  { key: 'ingredients', label: 'Ingredientes' },
  { key: 'partners', label: 'Parceiros' },
  { key: 'content', label: 'Posts publicados' },
  { key: 'leads', label: 'Leads' },
];

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<Stats>('/admin/stats')
      .then(setStats)
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6 mb-8">
        {cards.map((card) => (
          <Card key={card.key}>
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className="text-3xl font-bold mt-2 text-gray-900">
              {loading ? '...' : (stats?.[card.key] ?? '-')}
            </p>
          </Card>
        ))}
      </div>

      <Card title="Ações Rápidas">
        <div className="grid gap-2 md:grid-cols-2">
          <a href="/aplicacoes/novo" className="block p-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700">
            + Nova Aplicação
          </a>
          <a href="/tecnologias/novo" className="block p-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700">
            + Nova Tecnologia
          </a>
          <a href="/ingredientes/novo" className="block p-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700">
            + Novo Ingrediente
          </a>
          <a href="/parceiros/novo" className="block p-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700">
            + Novo Parceiro
          </a>
          <a href="/blog/novo" className="block p-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700">
            + Novo Post
          </a>
          <a href="/categorias/novo" className="block p-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700">
            + Nova Categoria
          </a>
        </div>
      </Card>
    </div>
  );
}
