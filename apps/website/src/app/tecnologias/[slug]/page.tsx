import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

interface Technology {
  id: string;
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

  return (
    <div className="mx-auto max-w-4xl px-4 py-20">
      <Link href="/tecnologias" className="text-sm text-blue-600 hover:underline">
        ← Tecnologias
      </Link>

      <h1 className="mt-4 text-4xl font-bold">{tech.name}</h1>
      <p className="mt-6 whitespace-pre-line text-lg text-gray-700">{tech.description}</p>

      {tech.applications.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Usada em</h2>
          <div className="flex flex-wrap gap-3">
            {tech.applications.map(({ application }) => (
              <Link
                key={application.id}
                href={`/aplicacoes/${application.slug}`}
                className="rounded-full border px-4 py-2 text-sm hover:bg-gray-50"
              >
                {application.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {tech.ingredients.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Ingredientes relacionados</h2>
          <div className="flex flex-wrap gap-3">
            {tech.ingredients.map(({ ingredient }) => (
              <span key={ingredient.id} className="rounded-full border px-4 py-2 text-sm text-gray-600">
                {ingredient.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
