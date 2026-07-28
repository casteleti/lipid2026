import type { Metadata } from 'next';
import { HeroInstitucional } from '@/components/sections/institucional/HeroInstitucional';
import { QuemSomosSection } from '@/components/sections/institucional/QuemSomosSection';
import { ComoAjudamosSection } from '@/components/sections/institucional/ComoAjudamosSection';
import { MercadosSection } from '@/components/sections/institucional/MercadosSection';
import { CompetenciasSection } from '@/components/sections/institucional/CompetenciasSection';
import { ModeloParceriaSection } from '@/components/sections/institucional/ModeloParceriaSection';
import { ParceirosGlobaisSection } from '@/components/sections/institucional/ParceirosGlobaisSection';
import { QualidadeSection } from '@/components/sections/institucional/QualidadeSection';
import { EvidenciasSection } from '@/components/sections/institucional/EvidenciasSection';
import { HistoriaSection } from '@/components/sections/institucional/HistoriaSection';
import { FaqSection } from '@/components/sections/institucional/FaqSection';
import { CtaFinalSection } from '@/components/sections/institucional/CtaFinalSection';
import type { InstitutionalPageData } from '@/components/sections/institucional/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

const EMPTY_BLOCKS: InstitutionalPageData['blocks'] = {
  FACT: [],
  PROCESS_STEP: [],
  QUALITY_ITEM: [],
  METRIC: [],
  PRINCIPLE: [],
  FAQ: [],
};

async function getInstitutionalPage(): Promise<InstitutionalPageData> {
  try {
    const res = await fetch(`${API_URL}/api/v1/institutional-page`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Falha ao carregar página institucional');
    return res.json();
  } catch {
    return {
      heroEyebrow: null,
      heroTitle: null,
      heroDescription: null,
      heroImage: null,
      heroCtaPrimaryLabel: null,
      heroCtaPrimaryHref: null,
      heroCtaSecondaryLabel: null,
      heroCtaSecondaryHref: null,
      quemSomosIntro: null,
      comoAjudamosCta: null,
      parceriaText: null,
      qualidadeText: null,
      historiaText: null,
      ctaFinalHeading: null,
      ctaFinalText: null,
      ctaFinalPrimaryLabel: null,
      ctaFinalPrimaryHref: null,
      ctaFinalSecondaryLabel: null,
      ctaFinalSecondaryHref: null,
      blocks: EMPTY_BLOCKS,
    };
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
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo();

  return {
    title: seo?.title || 'Sobre - Daksa',
    description: seo?.description || 'Conheça a missão, visão e valores da Daksa em tecnologias de lipídios.',
    keywords: seo?.keywords || undefined,
    openGraph: seo?.ogImage ? { images: [seo.ogImage] } : undefined,
  };
}

export default async function SobrePage() {
  const page = await getInstitutionalPage();
  const blocks = page.blocks || EMPTY_BLOCKS;

  return (
    <>
      <HeroInstitucional
        heroEyebrow={page.heroEyebrow}
        heroTitle={page.heroTitle}
        heroDescription={page.heroDescription}
        heroImage={page.heroImage}
        heroCtaPrimaryLabel={page.heroCtaPrimaryLabel}
        heroCtaPrimaryHref={page.heroCtaPrimaryHref}
        heroCtaSecondaryLabel={page.heroCtaSecondaryLabel}
        heroCtaSecondaryHref={page.heroCtaSecondaryHref}
      />
      <QuemSomosSection intro={page.quemSomosIntro} facts={blocks.FACT} />
      <ComoAjudamosSection ctaText={page.comoAjudamosCta} steps={blocks.PROCESS_STEP} />
      <MercadosSection />
      <CompetenciasSection />
      <ModeloParceriaSection text={page.parceriaText} />
      <ParceirosGlobaisSection />
      <QualidadeSection text={page.qualidadeText} items={blocks.QUALITY_ITEM} />
      <EvidenciasSection metrics={blocks.METRIC} />
      <HistoriaSection text={page.historiaText} principles={blocks.PRINCIPLE} />
      <FaqSection items={blocks.FAQ} />
      <CtaFinalSection
        ctaFinalHeading={page.ctaFinalHeading}
        ctaFinalText={page.ctaFinalText}
        ctaFinalPrimaryLabel={page.ctaFinalPrimaryLabel}
        ctaFinalPrimaryHref={page.ctaFinalPrimaryHref}
        ctaFinalSecondaryLabel={page.ctaFinalSecondaryLabel}
        ctaFinalSecondaryHref={page.ctaFinalSecondaryHref}
      />
    </>
  );
}
