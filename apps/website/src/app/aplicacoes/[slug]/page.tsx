import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { DetailHero } from '@/components/ui/DetailHero';
import { RelatedItems } from '@/components/ui/RelatedItems';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

interface Application {
  id: string;
  slug: string;
  name: string;
  description: string;
  excerpt: string | null;
  banner: string | null;
  technologies: { technology: { id: string; name: string; slug: string } }[];
  ingredients: { ingredient: { id: string; name: string } }[];
}

async function getApplication(slug: string): Promise<Application | null> {
  const res = await fetch(`${API_URL}/api/v1/applications/slug/${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

async function getRelated(currentSlug: string) {
  const res = await fetch(`${API_URL}/api/v1/applications?take=4`, { cache: 'no-store' });
  if (!res.ok) return [];
  const json = await res.json();
  return (json.data as Application[]).filter((a) => a.slug !== currentSlug).slice(0, 3);
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const app = await getApplication(params.slug);
  if (!app) return { title: 'Aplicação não encontrada' };

  return {
    title: `${app.name} - Daksa`,
    description: app.excerpt || app.description.slice(0, 160),
    openGraph: {
      title: app.name,
      description: app.excerpt || app.description.slice(0, 160),
    },
  };
}

export default async function ApplicationDetailPage({ params }: { params: { slug: string } }) {
  const app = await getApplication(params.slug);
  if (!app) notFound();

  const related = await getRelated(app.slug);

  return (
    <>
      <DetailHero
        badge="APLICAÇÃO"
        title={app.name}
        description={app.excerpt}
        backHref="/aplicacoes"
        backLabel="Aplicações"
      />

      <Section>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="prose prose-lg max-w-none whitespace-pre-line text-gray-700">
            {app.description}
          </div>

          <aside className="space-y-8">
            {app.technologies.length > 0 && (
              <div className="space-y-4">
                <p className="eyebrow">Tecnologias relacionadas</p>
                <div className="flex flex-wrap gap-2">
                  {app.technologies.map(({ technology }) => (
                    <Link
                      key={technology.id}
                      href={`/tecnologias/${technology.slug}`}
                      className="rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-700 transition-colors hover:border-primary-300 hover:text-primary-600"
                    >
                      {technology.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {app.ingredients.length > 0 && (
              <div className="space-y-4">
                <p className="eyebrow">Ingredientes</p>
                <div className="flex flex-wrap gap-2">
                  {app.ingredients.map(({ ingredient }) => (
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
              Entre em contato
            </Button>
          </aside>
        </div>
      </Section>

      {related.length > 0 && (
        <Section variant="light">
          <RelatedItems
            title="Outras aplicações"
            moreHref="/aplicacoes"
            moreLabel="Ver todas"
            items={related.map((a) => ({
              id: a.id,
              title: a.name,
              href: `/aplicacoes/${a.slug}`,
              excerpt: a.excerpt,
              image: a.banner,
              badge: 'APLICAÇÃO',
            }))}
          />
        </Section>
      )}

      <Section variant="dark">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <h2>Pronto para transformar suas formulações?</h2>
          <p className="text-lg text-white/70">
            Fale com nossos especialistas e descubra como esta aplicação pode impulsionar seu negócio.
          </p>
          <Button href="/contato" variant="secondary" size="lg">
            Agendar conversa
          </Button>
        </div>
      </Section>
    </>
  );
}
