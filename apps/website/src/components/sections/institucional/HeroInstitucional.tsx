import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { LinkArrow } from '@/components/ui/LinkArrow';
import { resolveMediaUrl } from '@/lib/api';
import type { InstitutionalPageData } from './types';

type Props = Pick<
  InstitutionalPageData,
  | 'heroEyebrow'
  | 'heroTitle'
  | 'heroDescription'
  | 'heroImage'
  | 'heroCtaPrimaryLabel'
  | 'heroCtaPrimaryHref'
  | 'heroCtaSecondaryLabel'
  | 'heroCtaSecondaryHref'
>;

export function HeroInstitucional({
  heroEyebrow,
  heroTitle,
  heroDescription,
  heroImage,
  heroCtaPrimaryLabel,
  heroCtaPrimaryHref,
  heroCtaSecondaryLabel,
  heroCtaSecondaryHref,
}: Props) {
  const eyebrow = heroEyebrow || 'SOBRE';
  const title = heroTitle || 'Sobre a Daksa';
  const description =
    heroDescription ||
    'Inovação em lipídios. Ciência aplicada ao desempenho. Parcerias que transformam formulações em resultados de impacto.';

  return (
    <section className="border-b border-gray-100 bg-gray-50 py-16 md:py-20">
      <div className="container-main grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div className="space-y-5">
          <Badge variant="primary">{eyebrow}</Badge>
          <h1 className="text-gray-900">{title}</h1>
          <p className="max-w-xl text-lg text-gray-600">{description}</p>

          {(heroCtaPrimaryLabel || heroCtaSecondaryLabel) && (
            <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
              {heroCtaPrimaryLabel && (
                <Button href={heroCtaPrimaryHref || '/contato'} variant="primary" size="lg">
                  {heroCtaPrimaryLabel}
                </Button>
              )}
              {heroCtaSecondaryLabel && (
                <LinkArrow href={heroCtaSecondaryHref || '/contato'} diagonal>
                  {heroCtaSecondaryLabel}
                </LinkArrow>
              )}
            </div>
          )}
        </div>

        {heroImage && (
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl">
            <Image src={resolveMediaUrl(heroImage)} alt={title} fill className="object-cover" />
          </div>
        )}
      </div>
    </section>
  );
}
