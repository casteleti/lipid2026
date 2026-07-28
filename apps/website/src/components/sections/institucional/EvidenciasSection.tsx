import { Section } from '@/components/ui/Section';
import type { InstitutionalBlock } from './types';

interface Props {
  metrics: InstitutionalBlock[];
}

export function EvidenciasSection({ metrics }: Props) {
  if (metrics.length === 0) return null;

  return (
    <Section>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.id} className="space-y-1 text-center">
            <p className="text-3xl font-bold text-primary-700 md:text-4xl">{metric.value}</p>
            <p className="text-sm text-gray-600">{metric.title}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
