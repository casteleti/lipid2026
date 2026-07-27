'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/Card';
import { api } from '@/lib/api-client';

interface PaginatedApplications {
  total: number;
}

export default function Dashboard() {
  const [totalApplications, setTotalApplications] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<PaginatedApplications>('/applications?take=1')
      .then((res) => setTotalApplications(res.total))
      .catch(() => setTotalApplications(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <p className="text-sm text-gray-500">Aplicações</p>
          <p className="text-3xl font-bold mt-2 text-gray-900">
            {loading ? '...' : (totalApplications ?? '-')}
          </p>
        </Card>
      </div>

      <Card title="Ações Rápidas">
        <div className="space-y-2">
          <a
            href="/aplicacoes/novo"
            className="block p-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700"
          >
            + Nova Aplicação
          </a>
        </div>
      </Card>
    </div>
  );
}
