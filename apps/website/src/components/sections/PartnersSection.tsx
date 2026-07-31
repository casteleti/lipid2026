'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { resolveMediaUrl } from '@/lib/api';

interface Partner {
  id: string;
  slug: string;
  name: string;
  logo: string | null;
}

interface PartnersSectionProps {
  eyebrow?: string;
  heading?: string;
  description?: string;
}

export function PartnersSection({
  eyebrow = 'PARCERIAS GLOBAIS',
  heading = 'Parcerias que geram valor',
  description = 'Representamos com exclusividade no Brasil empresas globais líderes em ciência e inovação em lipídios.',
}: PartnersSectionProps = {}) {
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
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="text-gray-900">{heading}</h2>
          <p className="text-lg text-gray-600">{description}</p>
        </div>

        {/* Grade de 2 colunas em vez de flex-wrap: garante cartões de largura idêntica.
            Com flex-wrap cada cartão ficava do tamanho do próprio conteúdo, e os dois
            saíam desiguais. */}
        <div className="grid grid-cols-2 gap-5">
          {loading
            ? [0, 1].map((i) => (
                <div key={i} className="h-36 animate-pulse rounded-2xl bg-white/60" />
              ))
            : partners.map((partner) => (
                <Link
                  key={partner.id}
                  href={`/parceiros/${partner.slug}`}
                  className="group flex h-36 items-center justify-center rounded-2xl border border-black/[0.05] bg-white px-8 transition-all duration-500 ease-brand hover:-translate-y-1 hover:border-black/[0.08] hover:shadow-[0_30px_50px_-30px_rgba(15,23,42,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                >
                  {partner.logo ? (
                    <>
                      {/* `w-full` com `object-contain` e teto de altura: os dois logos são
                          largos (≈3:1 e ≈3,7:1), então limitar só pela altura fazia um
                          encostar na borda e o outro sobrar. Assim ambos ocupam a mesma
                          caixa e ficam com peso visual equivalente. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={resolveMediaUrl(partner.logo)}
                        alt={partner.name}
                        className="max-h-14 w-full object-contain opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                      />
                      {/* O nome sai da tela, mas continua disponível para leitor de tela. */}
                      <span className="sr-only">{partner.name}</span>
                    </>
                  ) : (
                    <p className="text-center text-lg font-bold text-gray-900">{partner.name}</p>
                  )}
                </Link>
              ))}
        </div>
      </div>
    </Section>
  );
}
