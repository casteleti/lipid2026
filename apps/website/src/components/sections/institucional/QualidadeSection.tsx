import { HiCheck } from 'react-icons/hi2';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import type { InstitutionalBlock } from './types';

interface Props {
  text: string | null;
  items: InstitutionalBlock[];
}

export function QualidadeSection({ text, items }: Props) {
  if (!text && items.length === 0) return null;

  return (
    <Section variant="light">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="space-y-5">
          <p className="eyebrow">QUALIDADE, PROCEDÊNCIA E CONFIANÇA</p>
          <h2 className="text-gray-900">Confiança construída com procedência, documentação e suporte</h2>
          {text && <p className="text-lg text-gray-600">{text}</p>}
          <Button href="/contato" variant="outline" size="md">
            Solicite informações técnicas
          </Button>
        </div>

        {items.length > 0 && (
          <ul className="space-y-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4"
              >
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                  <HiCheck className="h-4 w-4" />
                </span>
                <span className="text-sm font-semibold text-gray-900">{item.title}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}
