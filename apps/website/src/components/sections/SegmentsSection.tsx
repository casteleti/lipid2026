'use client';

import { useEffect, useState } from 'react';
import { Section } from '@/components/ui/Section';
import { Grid } from '@/components/ui/Grid';
import { LinkArrow } from '@/components/ui/LinkArrow';
import { CardSegmento } from '@/components/segmentos/CardSegmento';

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
          {segmentos.map((s) => (
            <CardSegmento key={s.id} slug={s.slug} descricao={s.h1} />
          ))}
        </Grid>
      )}
    </Section>
  );
}
