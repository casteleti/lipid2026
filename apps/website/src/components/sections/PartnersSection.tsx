'use client';

import { useEffect, useState } from 'react';
import { Section } from '@/components/ui/Section';
import { resolveMediaUrl } from '@/lib/api';

interface Partner {
  id: string;
  name: string;
  excerpt: string | null;
  logo: string | null;
  website: string | null;
}

export function PartnersSection() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/partners?take=8`)
      .then((r) => r.json())
      .then((res) => setPartners(res.data || []))
      .catch(() => setPartners([]))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && partners.length === 0) return null;

  return (
    <Section variant="light">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
        <div className="space-y-5">
          <p className="eyebrow">PARCERIAS GLOBAIS</p>
          <h2 className="text-gray-900">Parcerias que geram valor</h2>
          <p className="text-lg text-gray-600">
            Representamos com exclusividade no Brasil empresas globais líderes em ciência e inovação
            em lipídios.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 md:justify-end">
          {loading ? (
            <p className="text-gray-400">Carregando...</p>
          ) : (
            partners.map((partner) => {
              const content = (
                <div className="flex h-28 w-44 flex-col items-center justify-center gap-1 rounded-2xl border border-gray-200 bg-white px-4 text-center transition-shadow hover:shadow-md">
                  {partner.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={resolveMediaUrl(partner.logo)}
                      alt={partner.name}
                      className="max-h-10 max-w-full object-contain"
                    />
                  ) : (
                    <p className="text-lg font-bold text-gray-900">{partner.name}</p>
                  )}
                  {partner.excerpt && <p className="text-xs text-gray-500">{partner.excerpt}</p>}
                </div>
              );

              return partner.website ? (
                <a key={partner.id} href={partner.website} target="_blank" rel="noopener noreferrer">
                  {content}
                </a>
              ) : (
                <div key={partner.id}>{content}</div>
              );
            })
          )}
        </div>
      </div>
    </Section>
  );
}
