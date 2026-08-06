import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { DetailHero } from '@/components/ui/DetailHero';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { resolveAssetUrl } from '@/lib/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

interface Partner {
  id: string;
  slug: string;
  name: string;
  description: string;
  excerpt: string | null;
  logo: string | null;
  image: string | null;
  websites: string[];
  country: string | null;
  highlights: string | null;
}

async function getPartner(slug: string): Promise<Partner | null> {
  const res = await fetch(`${API_URL}/api/v1/partners/slug/${slug}`, { next: { revalidate: 300 } });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const partner = await getPartner(params.slug);
  if (!partner) return { title: 'Parceiro não encontrado' };

  const description = partner.excerpt || partner.description.slice(0, 160);
  return {
    title: partner.name,
    description,
    keywords: [partner.name, 'fabricante representado pela Lipid Ingredients'],
    openGraph: { title: partner.name, description },
  };
}

export default async function PartnerDetailPage({ params }: { params: { slug: string } }) {
  const partner = await getPartner(params.slug);
  if (!partner) notFound();

  const highlights = partner.highlights
    ? partner.highlights.split('\n').map((line) => line.trim()).filter(Boolean)
    : [];

  return (
    <>
      <DetailHero
        badge="PARCEIRO REPRESENTADO"
        title={partner.name}
        description={partner.excerpt}
        backHref="/parceiros"
        backLabel="Parceiros"
      />

      <Section>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-8">
            {partner.image && (
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={resolveAssetUrl(partner.image)}
                  alt={`${partner.name} — registro institucional`}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <div className="prose prose-lg max-w-none whitespace-pre-line text-gray-700">
              {partner.description}
            </div>
          </div>

          <aside className="space-y-8">
            {partner.logo && (
              <div className="relative h-16 w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={resolveAssetUrl(partner.logo)}
                  alt={`Logo ${partner.name}`}
                  className="h-full w-full object-contain object-left"
                />
              </div>
            )}

            {partner.country && (
              <div className="space-y-2">
                <p className="eyebrow">País de origem</p>
                <p className="text-sm text-gray-700">{partner.country}</p>
              </div>
            )}

            {highlights.length > 0 && (
              <div className="space-y-3">
                <p className="eyebrow">Especializações</p>
                <ul className="space-y-2">
                  {highlights.map((line) => (
                    <li key={line} className="text-sm text-gray-700">
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {partner.websites.length > 0 && (
              <div className="space-y-2">
                {partner.websites.length > 1 && <p className="eyebrow">Sites oficiais</p>}
                {partner.websites.map((site) => (
                  <a
                    key={site}
                    href={site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm font-semibold text-primary-600 hover:text-primary-700"
                  >
                    {partner.websites.length > 1 ? site.replace(/^https?:\/\//, '') : 'Visitar site oficial →'}
                  </a>
                ))}
              </div>
            )}

            <Button href="/contato" variant="primary" size="lg" className="w-full">
              Entre em contato
            </Button>
          </aside>
        </div>
      </Section>

      <Section variant="dark">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <h2>Quer saber mais sobre esse parceiro?</h2>
          <p className="text-lg text-white/70">
            Fale com nossos especialistas e descubra como a Lipid conecta você a essa tecnologia.
          </p>
          <Button href="/contato" variant="secondary" size="lg">
            Fale com um especialista
          </Button>
        </div>
      </Section>
    </>
  );
}
