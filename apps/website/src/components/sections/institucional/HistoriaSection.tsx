import { Section } from '@/components/ui/Section';
import { Grid } from '@/components/ui/Grid';
import { ValueCard } from '@/components/ui/ValueCard';
import { INSTITUTIONAL_ICONS } from '@/lib/institutional-icons';
import { HiOutlineSparkles } from 'react-icons/hi2';
import type { InstitutionalBlock } from './types';

interface Props {
  text: string | null;
  principles: InstitutionalBlock[];
}

export function HistoriaSection({ text, principles }: Props) {
  if (!text && principles.length === 0) return null;

  return (
    <Section variant="light">
      <div className="space-y-16">
        {text && (
          <div className="mx-auto max-w-3xl space-y-5 text-center">
            <p className="eyebrow">HISTÓRIA E PROPÓSITO</p>
            <h2 className="text-gray-900">Uma trajetória dedicada à ciência aplicada</h2>
            <p className="whitespace-pre-line text-left text-lg leading-relaxed text-gray-700">{text}</p>
          </div>
        )}

        {principles.length > 0 && (
          <div>
            <p className="mb-10 text-center text-sm font-bold uppercase tracking-wider text-gray-500">
              Princípios que orientam nossa atuação
            </p>
            <Grid cols={3} gap="lg">
              {principles.map((principle) => (
                <ValueCard
                  key={principle.id}
                  icon={(principle.icon && INSTITUTIONAL_ICONS[principle.icon]) || HiOutlineSparkles}
                  title={principle.title || ''}
                  description={principle.description || ''}
                />
              ))}
            </Grid>
          </div>
        )}
      </div>
    </Section>
  );
}
