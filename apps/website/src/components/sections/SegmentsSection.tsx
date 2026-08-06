'use client';

import { useEffect, useState } from 'react';
import { Section } from '@/components/ui/Section';
import { Grid } from '@/components/ui/Grid';
import { Card } from '@/components/ui/Card';
import { LinkArrow } from '@/components/ui/LinkArrow';

interface SegmentPage {
  id: string;
  slug: string;
  active: boolean;
  h1: string | null;
  subheadline: string | null;
}

interface SegmentsSectionProps {
  eyebrow?: string;
  heading?: string;
  description?: string;
}

/** Nome curto do segmento — o conteúdo cadastrado é uma frase, longa demais para um card. */
const NOMES: Record<string, string> = {
  farmaceutica: 'Farmacêutica',
  cosmetica: 'Cosmética',
  nutricional: 'Nutricional',
  veterinaria: 'Veterinária',
};

/**
 * Arte do card. São quatro segmentos fixos, então a peça é um asset versionado do site em vez
 * de um campo do CMS — `SegmentPage` não tem coluna de imagem.
 */
const ARTES: Record<string, { src: string; alt: string }> = {
  farmaceutica: {
    src: '/segmentos/card-farmaceutica.webp',
    alt: 'Frasco-ampola, cápsulas e vesícula lipossomal em corte',
  },
  cosmetica: {
    src: '/segmentos/card-cosmetica.webp',
    alt: 'Creme cosmético, frasco de sérum e vesícula lipossomal em corte',
  },
  nutricional: {
    src: '/segmentos/card-nutricional.webp',
    alt: 'Lecitina em pó, leite e grãos de soja em vidraria de laboratório',
  },
  veterinaria: {
    src: '/segmentos/card-veterinaria.webp',
    alt: 'Bovino leiteiro em ambiente laboratorial, ao lado de ração e frasco de suplemento',
  },
};

/**
 * Bloco de segmentos da home e da institucional. Substituiu o antigo ApplicationsSection:
 * as páginas públicas por mercado agora são as landings de /segmentos.
 */
export function SegmentsSection({
  eyebrow = 'WHERE SCIENCE MEETS PERFORMANCE',
  heading = 'Soluções que impulsionam inovação em diversas indústrias',
  description = 'Atuamos com ingredientes especializados e tecnologias avançadas que elevam o desempenho, a estabilidade e a eficácia de formulações em múltiplos segmentos.',
}: SegmentsSectionProps = {}) {
  const [segmentos, setSegmentos] = useState<SegmentPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/segment-pages`)
      .then((r) => r.json())
      .then((data: SegmentPage[]) =>
        setSegmentos(
          (data || []).filter((s) => s.active).sort((a, b) => a.slug.localeCompare(b.slug)),
        ),
      )
      .catch(() => setSegmentos([]))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && segmentos.length === 0) return null;

  return (
    <Section variant="light">
      <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 md:items-end">
        <div className="space-y-5">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="text-gray-900">{heading}</h2>
        </div>
        <div className="space-y-5 md:pb-1">
          <p className="text-lg text-gray-600">{description}</p>
          <LinkArrow href="/segmentos">Conheça os segmentos que atendemos</LinkArrow>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500">Carregando...</p>
      ) : (
        <Grid cols={4} gap="md">
          {segmentos.map((s, idx) => (
            <Card key={s.id} className="group flex flex-col">
              <div className="relative flex h-40 items-end overflow-hidden bg-gradient-to-br from-primary-100 to-primary-300 p-5">
                {ARTES[s.slug] && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={ARTES[s.slug].src}
                    alt={ARTES[s.slug].alt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.04]"
                  />
                )}
                {/* Véu inferior: as artes têm fundo claro e o badge branco sumiria sobre elas. */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-primary-900/25 to-transparent" />
                <span className="relative rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-primary-700">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <h3 className="text-lg font-bold text-gray-900">{NOMES[s.slug] || s.slug}</h3>
                <p className="flex-1 text-sm leading-relaxed text-gray-600">{s.h1}</p>
                <LinkArrow href={`/segmentos/${s.slug}`} className="mt-2">
                  Explorar
                </LinkArrow>
              </div>
            </Card>
          ))}
        </Grid>
      )}
    </Section>
  );
}
