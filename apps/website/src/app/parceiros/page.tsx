'use client';

import { useEffect, useState } from 'react';
import { ListingHero } from '@/components/ui/ListingHero';
import { Card } from '@/components/ui/Card';
import { Grid } from '@/components/ui/Grid';
import { Section } from '@/components/ui/Section';
import { resolveMediaUrl } from '@/lib/api';

interface Partner {
  id: string;
  name: string;
  excerpt: string | null;
  description: string;
  logo: string | null;
  website: string | null;
}

export default function ParceirosPage() {
  const [items, setItems] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/partners?take=50`)
      .then((r) => r.json())
      .then((res) => setItems(res.data || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <ListingHero
        badge="PARCERIAS GLOBAIS"
        title="Nossos Parceiros"
        description="Representamos com exclusividade empresas globais líderes em ciência e inovação em lipídios."
      />

      <Section>
        {loading ? (
          <p className="py-12 text-center text-gray-400">Carregando...</p>
        ) : items.length === 0 ? (
          <p className="py-12 text-center text-gray-500">Nenhum parceiro cadastrado ainda.</p>
        ) : (
          <Grid cols={3} gap="lg">
            {items.map((item) => {
              const card = (
                <Card className="flex h-full flex-col gap-4 p-8 text-center">
                  <div className="mx-auto flex h-16 w-full items-center justify-center">
                    {item.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={resolveMediaUrl(item.logo)}
                        alt={item.name}
                        className="max-h-16 max-w-full object-contain"
                      />
                    ) : (
                      <p className="text-xl font-bold text-gray-900">{item.name}</p>
                    )}
                  </div>
                  <p className="flex-1 text-sm text-gray-600">{item.excerpt || item.description}</p>
                  {item.website && (
                    <p className="text-sm font-semibold text-primary-600">Visitar site →</p>
                  )}
                </Card>
              );

              return item.website ? (
                <a key={item.id} href={item.website} target="_blank" rel="noopener noreferrer">
                  {card}
                </a>
              ) : (
                <div key={item.id}>{card}</div>
              );
            })}
          </Grid>
        )}
      </Section>
    </>
  );
}
