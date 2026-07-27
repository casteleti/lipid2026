import type { MetadataRoute } from 'next';

const SITE_URL = 'https://lipid.daksa.app.br';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

async function safeFetch<T>(path: string): Promise<T[]> {
  try {
    const res = await fetch(`${API_URL}/api/v1${path}`, { cache: 'no-store' });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [applications, technologies, posts] = await Promise.all([
    safeFetch<{ slug: string }>('/applications?take=100'),
    safeFetch<{ slug: string }>('/technologies?take=100'),
    safeFetch<{ slug: string }>('/content?status=PUBLISHED&take=100'),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL },
    { url: `${SITE_URL}/aplicacoes` },
    { url: `${SITE_URL}/tecnologias` },
    { url: `${SITE_URL}/ingredientes` },
    { url: `${SITE_URL}/parceiros` },
    { url: `${SITE_URL}/blog` },
    { url: `${SITE_URL}/sobre` },
    { url: `${SITE_URL}/contato` },
  ];

  return [
    ...staticRoutes,
    ...applications.map((a) => ({ url: `${SITE_URL}/aplicacoes/${a.slug}` })),
    ...technologies.map((t) => ({ url: `${SITE_URL}/tecnologias/${t.slug}` })),
    ...posts.map((p) => ({ url: `${SITE_URL}/blog/${p.slug}` })),
  ];
}
