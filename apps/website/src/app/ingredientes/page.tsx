'use client';

import { useEffect, useState } from 'react';

interface Ingredient {
  id: string;
  name: string;
  description: string;
  inci: string | null;
}

interface Paginated<T> {
  data: T[];
}

export default function IngredientesPage() {
  const [items, setItems] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ingredients`)
      .then((r) => r.json())
      .then((res: Paginated<Ingredient>) => setItems(res.data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-20">
      <h1 className="text-4xl font-bold mb-12">Ingredientes</h1>

      {loading ? (
        <p className="text-gray-500">Carregando...</p>
      ) : items.length === 0 ? (
        <p className="text-gray-500">Nenhum ingrediente cadastrado ainda.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="rounded-lg border p-6">
              <h3 className="mb-1 text-xl font-semibold">{item.name}</h3>
              {item.inci && <p className="mb-2 text-xs uppercase tracking-wide text-gray-400">{item.inci}</p>}
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
