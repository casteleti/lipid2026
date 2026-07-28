import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { INSTITUTIONAL_ICONS } from '@/lib/institutional-icons';
import type { InstitutionalBlock } from './types';

interface Props {
  ctaText: string | null;
  steps: InstitutionalBlock[];
}

export function ComoAjudamosSection({ ctaText, steps }: Props) {
  if (steps.length === 0) return null;

  return (
    <Section variant="light">
      <div className="space-y-12">
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <h2 className="text-gray-900">
            Mais do que fornecer ingredientes: ajudamos a viabilizar aplicações
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {steps.map((step, idx) => {
            const Icon = step.icon ? INSTITUTIONAL_ICONS[step.icon] : null;
            return (
              <div key={step.id} className="space-y-3 rounded-2xl border border-gray-100 bg-white p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary-50 text-sm font-bold text-primary-700">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  {Icon && <Icon className="h-5 w-5 text-primary-600" />}
                </div>
                <h3 className="text-base font-bold text-gray-900">{step.title}</h3>
                {step.description && <p className="text-sm text-gray-600">{step.description}</p>}
              </div>
            );
          })}
        </div>

        {ctaText && (
          <div className="mx-auto max-w-xl space-y-4 text-center">
            <p className="text-lg text-gray-600">{ctaText}</p>
            <Button href="/contato" variant="primary" size="lg">
              Apresente seu desafio ao nosso time
            </Button>
          </div>
        )}
      </div>
    </Section>
  );
}
