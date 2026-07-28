import { Section } from '@/components/ui/Section';

interface Props {
  text: string | null;
}

const NODES = ['Cliente brasileiro', 'Lipid', 'Fabricantes internacionais'];

export function ModeloParceriaSection({ text }: Props) {
  return (
    <Section>
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="space-y-5">
          <p className="eyebrow">MODELO DE PARCERIA</p>
          <h2 className="text-gray-900">Uma atuação construída em colaboração</h2>
          <p className="text-lg text-gray-600">
            {text ||
              'A Lipid atua como interlocutora técnica local, conectando o cliente brasileiro a fabricantes internacionais especializados — sem nunca se apresentar como fabricante.'}
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          {NODES.map((node, idx) => (
            <div key={node} className="flex w-full max-w-xs flex-col items-center gap-4">
              <div className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-6 py-4 text-center">
                <span
                  className={
                    idx === 1
                      ? 'text-base font-bold text-primary-700'
                      : 'text-sm font-semibold text-gray-700'
                  }
                >
                  {node}
                </span>
              </div>
              {idx < NODES.length - 1 && <span className="text-gray-300">↕</span>}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
