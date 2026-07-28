import { Section } from '@/components/ui/Section';
import { INSTITUTIONAL_ICONS } from '@/lib/institutional-icons';
import type { InstitutionalBlock } from './types';

interface Props {
  intro: string | null;
  facts: InstitutionalBlock[];
}

export function QuemSomosSection({ intro, facts }: Props) {
  if (!intro && facts.length === 0) return null;

  return (
    <Section>
      <div className="mx-auto max-w-3xl space-y-10">
        <div className="space-y-5">
          <h2 className="text-gray-900">Uma parceira tecnológica para a indústria de Life Sciences</h2>
          {intro && <p className="text-lg leading-relaxed text-gray-700">{intro}</p>}
        </div>

        {facts.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {facts.map((fact) => {
              const Icon = fact.icon ? INSTITUTIONAL_ICONS[fact.icon] : null;
              return (
                <div key={fact.id} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
                  {Icon && (
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white text-primary-600">
                      <Icon className="h-4 w-4" />
                    </span>
                  )}
                  <span className="text-sm font-semibold text-gray-900">{fact.title}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Section>
  );
}
