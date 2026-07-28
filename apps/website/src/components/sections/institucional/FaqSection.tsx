import { Section } from '@/components/ui/Section';
import type { InstitutionalBlock } from './types';

interface Props {
  items: InstitutionalBlock[];
}

export function FaqSection({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <Section>
      <div className="mx-auto max-w-3xl space-y-8">
        <h2 className="text-center text-gray-900">Perguntas frequentes sobre a Lipid</h2>

        <div className="divide-y divide-gray-100 rounded-2xl border border-gray-100">
          {items.map((item) => (
            <details key={item.id} className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-gray-900">
                {item.title}
                <span
                  aria-hidden
                  className="flex-shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              {item.description && (
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.description}</p>
              )}
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
