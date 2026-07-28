import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { DetailHero } from '@/components/ui/DetailHero';
import { RelatedItems } from '@/components/ui/RelatedItems';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

interface Technology {
  id: string;
  slug: string;
  name: string;
  description: string;
  excerpt: string | null;
  applications: { application: { id: string; name: string; slug: string } }[];
  ingredients: { ingredient: { id: string; name: string } }[];
}

async function getTechnology(slug: string): Promise<Technology | null> {
  const res = await fetch(`${API_URL}/api/v1/technologies/slug/${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

async function getRelated(currentSlug: string) {
  const res = await fetch(`${API_URL}/api/v1/technologies?take=4`, { cache: 'no-store' });
  if (!res.ok) return [];
  const json = await res.json();
  return (json.data as Technology[]).filter((t) => t.slug !== currentSlug).slice(0, 3);
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tech = await getTechnology(params.slug);
  if (!tech) return { title: 'Tecnologia não encontrada' };

  return {
    title: `${tech.name} - Daksa`,
    description: tech.excerpt || tech.description.slice(0, 160),
  };
}

export default async function TechnologyDetailPage({ params }: { params: { slug: string } }) {
  const tech = await getTechnology(params.slug);
  if (!tech) notFound();

  const related = await getRelated(tech.slug);

  return (
    <>
      <DetailHero
        badge="TECNOLOGIA"
        title={tech.name}
        description={tech.excerpt}
        backHref="/tecnologias"
        backLabel="Tecnologias"
      />

      <Section>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="prose prose-lg max-w-none whitespace-pre-line text-gray-700">
            {tech.description}
          </div>

          <aside className="space-y-8">
            {tech.applications.length > 0 && (
              <div className="space-y-4">
                <p className="eyebrow">Usada em</p>
                <div className="flex flex-wrap gap-2">
                  {tech.applications.map(({ application }) => (
                    <Link
                      key={application.id}
                      href={`/aplicacoes/${application.slug}`}
                      className="rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-700 transition-colors hover:border-primary-300 hover:text-primary-600"
                    >
                      {application.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {tech.ingredients.length > 0 && (
              <div className="space-y-4">
                <p className="eyebrow">Ingredientes relacionados</p>
                <div className="flex flex-wrap gap-2">
                  {tech.ingredients.map(({ ingredient }) => (
                    <span
                      key={ingredient.id}
                      className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-600"
                    >
                      {ingredient.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <Button href="/contato" variant="primary" size="lg" className="w-full">
              Solicitar informações técnicas
            </Button>
          </aside>
        </div>
      </Section>

      {related.length > 0 && (
        <Section variant="light">
          <RelatedItems
            title="Outras tecnologias"
            moreHref="/tecnologias"
            moreLabel="Ver todas"
            items={related.map((t) => ({
              id: t.id,
              title: t.name,
              href: `/tecnologias/${t.slug}`,
              excerpt: t.excerpt,
              badge: 'TECNOLOGIA',
            }))}
          />
        </Section>
      )}

      <Section variant="dark">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <h2>Integre esta tecnologia em seus produtos</h2>
          <p className="text-lg text-white/70">
            Solicite documentação completa e suporte técnico personalizado.
          </p>
          <Button href="/contato" variant="secondary" size="lg">
            Fale com especialista
          </Button>
        </div>
      </Section>
    </>
  );
}
