export interface SectionItem {
  id: string;
  order: number;
  active: boolean;
  icon: string | null;
  title: string | null;
  subtitle: string | null;
  text: string | null;
  value: string | null;
  linkLabel: string | null;
  linkHref: string | null;
  imageHint: string | null;
  imageUrl: string | null;
  extra: Record<string, unknown> | null;
}

export interface Section {
  id: string;
  slug: string;
  type: string;
  order: number;
  active: boolean;
  eyebrow: string | null;
  title: string | null;
  subtitle: string | null;
  body: string | null;
  highlight: string | null;
  quote: string | null;
  ctaLabel: string | null;
  ctaHref: string | null;
  secondaryCtaLabel: string | null;
  secondaryCtaHref: string | null;
  imageHint: string | null;
  imageUrl: string | null;
  extra: Record<string, unknown> | null;
  items: SectionItem[];
}
