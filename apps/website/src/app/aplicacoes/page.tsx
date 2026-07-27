'use client';

import { useEffect, useState } from 'react';

interface Application {
  id: string;
  name: string;
  excerpt: string | null;
}

interface PaginatedApplications {
  data: Application[];
}

export default function AplicacoesPage() {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/applications`)
      .then((r) => r.json())
      .then((res: PaginatedApplications) => setApps(res.data))
      .catch(() => setApps([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-20">
      <h1 className="text-4xl font-bold mb-12">Aplicações</h1>

      {loading ? (
        <p className="text-gray-500">Carregando...</p>
      ) : apps.length === 0 ? (
        <p className="text-gray-500">Nenhuma aplicação cadastrada ainda.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          {apps.map((app) => (
            <div key={app.id} className="rounded-lg border p-6 transition hover:shadow-lg">
              <h3 className="mb-2 text-xl font-semibold">{app.name}</h3>
              <p className="text-gray-600">{app.excerpt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
