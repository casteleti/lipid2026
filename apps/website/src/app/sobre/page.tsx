import type { Metadata } from 'next';
import { InstitutionalSections } from '@/components/sections/institucional-novo/InstitutionalSections';
import type { InstitutionalSectionData } from '@/components/sections/institucional-novo/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

async function getSections(): Promise<InstitutionalSectionData[]> {
  try {
    const res = await fetch(`${API_URL}/api/v1/institutional-sections`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Falha ao carregar página institucional');
    return await res.json();
  } catch {
    return [];
  }
}

interface SeoPage {
  title: string | null;
  description: string | null;
  keywords: string | null;
  ogImage: string | null;
}

async function getSeo(): Promise<SeoPage | null> {
  try {
    const res = await fetch(`${API_URL}/api/v1/seo-pages?route=%2Fsobre`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo();

  return {
    title: seo?.title || 'Lipid Ingredients | Ingredientes, tecnologia e suporte técnico',
    description:
      seo?.description ||
      'Conheça a Lipid Ingredients, empresa brasileira que conecta ingredientes especializados, tecnologia internacional e suporte técnico para projetos farmacêuticos, cosméticos, nutricionais e veterinários.',
    keywords: seo?.keywords || undefined,
    openGraph: seo?.ogImage ? { images: [seo.ogImage] } : undefined,
  };
}

export default async function SobrePage() {
  const sections = await getSections();

  return <InstitutionalSections sections={sections} />;
}
