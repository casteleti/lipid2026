'use client';

import { useEffect, useState } from 'react';
import { Section } from '@/components/ui/Section';
import { Grid } from '@/components/ui/Grid';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LinkArrow } from '@/components/ui/LinkArrow';

interface Technology {
  id: string;
  name: string;
  slug: string;
  excerpt: string | null;
}

interface TechnologiesSectionProps {
  eyebrow?: string;
  heading?: string;
  description?: string;
}

/**
 * Arte do card, por slug. São três tecnologias fixas e a mesma peça serve a home e a listagem
 * de /tecnologias — asset versionado do site, não upload do CMS.
 */
export const ARTES_TECNOLOGIA: Record<string, { src: string; alt: string }> = {
  lipossomas: {
    src: '/tecnologias/card-lipossomas.webp',
    alt: 'Vesícula lipossomal em corte, com núcleo aquoso e bicamada fosfolipídica',
  },
  fosfolipidios: {
    src: '/tecnologias/card-fosfolipidios.webp',
    alt: 'Fosfolipídios alinhados em bicamada, com uma molécula em destaque',
  },
  encapsulacao: {
    src: '/tecnologias/card-encapsulacao.webp',
    alt: 'Vesícula lipídica protegendo um ativo alojado no núcleo',
  },
};

export function TechnologiesSection({
  eyebrow = 'PLATAFORMAS CIENTÍFICAS',
  heading = 'Tecnologias de ponta baseadas em lipídios',
  description = 'Plataformas tecnológicas que garantem estabilidade, biodisponibilidade e eficácia para sistemas de entrega avançados e formulações de alta performance.',
}: TechnologiesSectionProps = {}) {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/technologies?take=3`)
      .then((r) => r.json())
      .then((res) => setTechnologies(res.data || []))
      .catch(() => setTechnologies([]))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && technologies.length === 0) return null;

  return (
    <Section>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-end mb-12">
        <div className="space-y-5">
          <Badge variant="primary">{eyebrow}</Badge>
          <h2 className="text-gray-900">{heading}</h2>
        </div>
        <div className="space-y-5 md:pb-1">
          <p className="text-lg text-gray-600">{description}</p>
          <LinkArrow href="/tecnologias">Ver todas as tecnologias</LinkArrow>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500">Carregando...</p>
      ) : (
        <Grid cols={3} gap="lg">
          {technologies.map((tech, idx) => (
            <Card key={tech.id} className="p-6 space-y-4" hoverable>
              <div className="relative flex h-32 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary-100 via-primary-200 to-primary-400">
                {ARTES_TECNOLOGIA[tech.slug] ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={ARTES_TECNOLOGIA[tech.slug].src}
                    alt={ARTES_TECNOLOGIA[tech.slug].alt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="h-14 w-14 rounded-full bg-white/40 shadow-inner backdrop-blur-sm transition-transform duration-700 ease-brand group-hover:scale-110" />
                )}
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  T · {String(idx + 1).padStart(2, '0')}
                </p>
                <h3 className="text-xl font-bold text-gray-900">{tech.name}</h3>
                <p className="text-sm text-gray-600">{tech.excerpt}</p>
              </div>
              <LinkArrow href={`/tecnologias/${tech.slug}`}>Saiba mais</LinkArrow>
            </Card>
          ))}
        </Grid>
      )}
    </Section>
  );
}
