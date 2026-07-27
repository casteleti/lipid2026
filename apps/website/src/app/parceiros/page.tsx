'use client';

import { useEffect, useState } from 'react';

interface Partner {
  id: string;
  name: string;
  excerpt: string | null;
  description: string;
  website: string | null;
}

interface Paginated<T> {
  data: T[];
}

export default function ParceirosPage() {
  const [items, setItems] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/partners`)
      .then((r) => r.json())
      .then((res: Paginated<Partner>) => setItems(res.data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-20">
      <h1 className="text-4xl font-bold mb-12">Parceiros</h1>

      {loading ? (
        <p className="text-gray-500">Carregando...</p>
      ) : items.length === 0 ? (
        <p className="text-gray-500">Nenhum parceiro cadastrado ainda.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="rounded-lg border p-6">
              <h3 className="mb-2 text-xl font-semibold">{item.name}</h3>
              <p className="text-gray-600">{item.excerpt || item.description}</p>
              {item.website && (
                <a
                  href={item.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm text-blue-600 hover:underline"
                >
                  Visitar site →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
