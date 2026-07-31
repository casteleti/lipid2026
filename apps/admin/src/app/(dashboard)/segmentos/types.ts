export interface Application {
  title: string;
  description: string;
}

export interface SegmentPage {
  id: string;
  slug: string;
  sector: string;
  active: boolean;
  eyebrow: string | null;
  h1: string | null;
  subheadline: string | null;
  salesParagraphs: string[] | null;
  applicationsTitle: string | null;
  applicationsIntro: string | null;
  applications: Application[] | null;
  floatingHighlight: string | null;
  ingredientExplorerHeadline: string | null;
  ingredientExplorerSupportingText: string | null;
  formEyebrow: string | null;
  formTitle: string | null;
  formDescription: string | null;
  formValueProposition: string | null;
  formCtaLabel: string | null;
  formSuccessMessage: string | null;
  formChallengeOptions: string[] | null;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string[] | null;
}

export interface StatsRow {
  sector: string;
  views: number;
  leads: number;
  conversionRate: number;
}
