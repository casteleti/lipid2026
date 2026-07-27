'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Technology {
  id: string;
  slug: string;
  name: string;
  excerpt: string | null;
}

interface Paginated<T> {
  data: T[];
}

export default function TecnologiasPage() {
  const [items, setItems] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/technologies`)
      .then((r) => r.json())
      .then((res: Paginated<Technology>) => setItems(res.data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-20">
      <h1 className="text-4xl font-bold mb-12">Tecnologias</h1>

      {loading ? (
        <p className="text-gray-500">Carregando...</p>
      ) : items.length === 0 ? (
        <p className="text-gray-500">Nenhuma tecnologia cadastrada ainda.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/tecnologias/${item.slug}`}
              className="block rounded-lg border p-6 transition hover:shadow-lg"
            >
              <h3 className="mb-2 text-xl font-semibold">{item.name}</h3>
              <p className="text-gray-600">{item.excerpt}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
