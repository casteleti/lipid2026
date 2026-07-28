export interface InstitutionalBlock {
  id: string;
  icon: string | null;
  title: string | null;
  value: string | null;
  description: string | null;
  order: number;
}

export interface InstitutionalPageData {
  heroEyebrow: string | null;
  heroTitle: string | null;
  heroDescription: string | null;
  heroImage: string | null;
  heroCtaPrimaryLabel: string | null;
  heroCtaPrimaryHref: string | null;
  heroCtaSecondaryLabel: string | null;
  heroCtaSecondaryHref: string | null;
  quemSomosIntro: string | null;
  comoAjudamosCta: string | null;
  parceriaText: string | null;
  qualidadeText: string | null;
  historiaText: string | null;
  ctaFinalHeading: string | null;
  ctaFinalText: string | null;
  ctaFinalPrimaryLabel: string | null;
  ctaFinalPrimaryHref: string | null;
  ctaFinalSecondaryLabel: string | null;
  ctaFinalSecondaryHref: string | null;
  blocks: {
    FACT: InstitutionalBlock[];
    PROCESS_STEP: InstitutionalBlock[];
    QUALITY_ITEM: InstitutionalBlock[];
    METRIC: InstitutionalBlock[];
    PRINCIPLE: InstitutionalBlock[];
    FAQ: InstitutionalBlock[];
  };
}
