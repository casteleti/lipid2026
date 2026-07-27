import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

interface Application {
  id: string;
  name: string;
  description: string;
  excerpt: string | null;
  technologies: { technology: { id: string; name: string; slug: string } }[];
  ingredients: { ingredient: { id: string; name: string } }[];
}

async function getApplication(slug: string): Promise<Application | null> {
  const res = await fetch(`${API_URL}/api/v1/applications/slug/${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
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

  return (
    <div className="mx-auto max-w-4xl px-4 py-20">
      <Link href="/aplicacoes" className="text-sm text-blue-600 hover:underline">
        ← Aplicações
      </Link>

      <h1 className="mt-4 text-4xl font-bold">{app.name}</h1>
      <p className="mt-6 whitespace-pre-line text-lg text-gray-700">{app.description}</p>

      {app.technologies.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Tecnologias relacionadas</h2>
          <div className="flex flex-wrap gap-3">
            {app.technologies.map(({ technology }) => (
              <Link
                key={technology.id}
                href={`/tecnologias/${technology.slug}`}
                className="rounded-full border px-4 py-2 text-sm hover:bg-gray-50"
              >
                {technology.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {app.ingredients.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Ingredientes</h2>
          <div className="flex flex-wrap gap-3">
            {app.ingredients.map(({ ingredient }) => (
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
