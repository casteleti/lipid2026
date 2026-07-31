export interface Pillar {
  title: string;
  description: string;
}

export interface Criterion {
  label: string;
  description: string;
}

export interface Technology {
  id: string;
  name: string;
  slug: string;
  description: string;
  excerpt: string | null;
  icon: string | null;
  active: boolean;

  eyebrow: string | null;
  h1: string | null;
  subheadline: string | null;
  heroCtaLabel: string | null;

  imageOneUrl: string | null;
  imageOneAlt: string | null;
  imageOneCaption: string | null;
  imageTwoUrl: string | null;
  imageTwoAlt: string | null;
  imageTwoCaption: string | null;

  essenceTitle: string | null;
  essenceIntro: string | null;
  pillars: Pillar[] | null;
  criteriaTitle: string | null;
  criteria: Criterion[] | null;
  authorityStatement: string | null;

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

export interface TechStatsRow {
  route: string;
  slug: string;
  views: number;
  leads: number;
  conversionRate: number;
}
