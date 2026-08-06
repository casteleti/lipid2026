'use client';

import { useCallback, useEffect, useState } from 'react';
import { ListingHero } from '@/components/ui/ListingHero';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LinkArrow } from '@/components/ui/LinkArrow';
import { Grid } from '@/components/ui/Grid';
import { Section } from '@/components/ui/Section';
import { resolveAssetUrl } from '@/lib/api';

interface Partner {
  id: string;
  slug: string;
  name: string;
  excerpt: string | null;
  description: string;
  logo: string | null;
  websites: string[];
}

export default function ParceirosPage() {
  const [items, setItems] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchPartners = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/partners?take=50`);
      if (!res.ok) throw new Error('Falha ao carregar parceiros');
      const json = await res.json();
      setItems(json.data || []);
    } catch {
      setItems([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPartners();
  }, [fetchPartners]);

  return (
    <>
      <ListingHero
        badge="PARCERIAS GLOBAIS"
        title="Nossos Parceiros"
        description="Representamos com exclusividade empresas globais líderes em ciência e inovação em lipídios."
      />

      <Section>
        {loading ? (
          <p className="py-12 text-center text-gray-500">Carregando...</p>
        ) : error ? (
          <div className="space-y-4 py-12 text-center">
            <p className="text-gray-600">Não foi possível carregar os parceiros agora.</p>
            <Button variant="outline" onClick={() => fetchPartners()}>
              Tentar novamente
            </Button>
          </div>
        ) : items.length === 0 ? (
          <p className="py-12 text-center text-gray-500">Nenhum parceiro cadastrado ainda.</p>
        ) : (
          <Grid cols={3} gap="lg">
            {items.map((item) => (
              <Card key={item.id} href={`/parceiros/${item.slug}`} className="flex h-full flex-col gap-4 p-8 text-center">
                <div className="relative mx-auto flex h-16 w-full items-center justify-center">
                  {item.logo ? (
                    /* <img> em vez de next/image: o otimizador rejeita a origem da API
                       (400 "url parameter is not allowed") e o logo já chega leve. Mesmo
                       padrão de PartnersSection na home. */
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={resolveAssetUrl(item.logo)}
                      alt={`Logo ${item.name}`}
                      loading="lazy"
                      className="max-h-16 w-full object-contain"
                    />
                  ) : (
                    <p className="text-xl font-bold text-gray-900">{item.name}</p>
                  )}
                </div>
                <p className="flex-1 text-sm text-gray-600">{item.excerpt || item.description}</p>
                <div className="mx-auto">
                  <LinkArrow as="span">Conhecer parceiro</LinkArrow>
                </div>
              </Card>
            ))}
          </Grid>
        )}
      </Section>
    </>
  );
}
