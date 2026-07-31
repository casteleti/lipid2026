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
            <Card key={s.id} className="flex flex-col">
              <div className="flex h-40 items-end bg-gradient-to-br from-primary-100 to-primary-300 p-5">
                <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-primary-700">
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
