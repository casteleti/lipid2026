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

export function TechnologiesSection() {
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
          <Badge variant="primary">PLATAFORMAS CIENTÍFICAS</Badge>
          <h2 className="text-gray-900">Tecnologias de ponta baseadas em lipídios</h2>
        </div>
        <div className="space-y-5 md:pb-1">
          <p className="text-lg text-gray-600">
            Plataformas tecnológicas que garantem estabilidade, biodisponibilidade e eficácia para
            sistemas de entrega avançados e formulações de alta performance.
          </p>
          <LinkArrow href="/tecnologias">Ver todas as tecnologias</LinkArrow>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-400">Carregando...</p>
      ) : (
        <Grid cols={3} gap="lg">
          {technologies.map((tech, idx) => (
            <Card key={tech.id} className="p-6 space-y-4" hoverable>
              <div className="flex h-32 items-center justify-center rounded-xl bg-gradient-to-br from-primary-100 via-primary-200 to-primary-400">
                <div className="h-14 w-14 rounded-full bg-white/40 shadow-inner backdrop-blur-sm" />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
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
