'use client';

import { useEffect, useState } from 'react';
import { Section } from '@/components/ui/Section';
import { Grid } from '@/components/ui/Grid';
import { Card } from '@/components/ui/Card';
import { LinkArrow } from '@/components/ui/LinkArrow';
import { resolveMediaUrl } from '@/lib/api';

interface Application {
  id: string;
  name: string;
  slug: string;
  excerpt: string | null;
  banner: string | null;
}

interface ApplicationsSectionProps {
  eyebrow?: string;
  heading?: string;
  description?: string;
}

export function ApplicationsSection({
  eyebrow = 'WHERE SCIENCE MEETS PERFORMANCE',
  heading = 'Soluções que impulsionam inovação em diversas indústrias',
  description = 'Atuamos com ingredientes especializados e tecnologias avançadas que elevam o desempenho, a estabilidade e a eficácia de formulações em múltiplos segmentos.',
}: ApplicationsSectionProps = {}) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/applications?take=4`)
      .then((r) => r.json())
      .then((res) => setApplications(res.data || []))
      .catch(() => setApplications([]))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && applications.length === 0) return null;

  return (
    <Section variant="light">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-end mb-12">
        <div className="space-y-5">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="text-gray-900">{heading}</h2>
        </div>
        <div className="space-y-5 md:pb-1">
          <p className="text-lg text-gray-600">{description}</p>
          <LinkArrow href="/aplicacoes">Conheça nossas aplicações</LinkArrow>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500">Carregando...</p>
      ) : (
        <Grid cols={4} gap="md">
          {applications.map((app, idx) => (
            <Card key={app.id} className="flex flex-col">
              <div className="relative h-40 bg-gradient-to-br from-primary-100 to-primary-300">
                {app.banner && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={resolveMediaUrl(app.banner)}
                    alt={app.name}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-primary-700">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <h3 className="text-lg font-bold text-gray-900">{app.name}</h3>
                <p className="flex-1 text-sm text-gray-600">{app.excerpt}</p>
                <LinkArrow href={`/aplicacoes/${app.slug}`} className="mt-2">
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
