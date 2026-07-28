import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import type { InstitutionalPageData } from './types';

type Props = Pick<
  InstitutionalPageData,
  | 'ctaFinalHeading'
  | 'ctaFinalText'
  | 'ctaFinalPrimaryLabel'
  | 'ctaFinalPrimaryHref'
  | 'ctaFinalSecondaryLabel'
  | 'ctaFinalSecondaryHref'
>;

export function CtaFinalSection({
  ctaFinalHeading,
  ctaFinalText,
  ctaFinalPrimaryLabel,
  ctaFinalPrimaryHref,
  ctaFinalSecondaryLabel,
  ctaFinalSecondaryHref,
}: Props) {
  return (
    <Section variant="dark">
      <div className="mx-auto max-w-2xl space-y-6 text-center">
        <h2>{ctaFinalHeading || 'Vamos conversar sobre o seu próximo projeto?'}</h2>
        <p className="text-lg text-white/70">
          {ctaFinalText ||
            'Compartilhe sua aplicação, desafio técnico ou necessidade de ingrediente. Nossa equipe poderá direcionar sua solicitação e identificar as alternativas mais adequadas para o projeto.'}
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button href={ctaFinalPrimaryHref || '/contato'} variant="secondary" size="lg">
            {ctaFinalPrimaryLabel || 'Fale com um especialista'}
          </Button>
          {ctaFinalSecondaryLabel && (
            <Button href={ctaFinalSecondaryHref || '/ingredientes'} variant="secondary" size="lg">
              {ctaFinalSecondaryLabel}
            </Button>
          )}
        </div>
      </div>
    </Section>
  );
}
