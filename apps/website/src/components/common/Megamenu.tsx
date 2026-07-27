import { LinkArrow } from '@/components/ui/LinkArrow';

interface MegamenuProps {
  section: string;
}

const megamenuContent: Record<
  string,
  {
    title: string;
    description: string;
    ctaText: string;
    ctaHref: string;
    groups: { heading: string; items: { name: string; desc: string; href: string }[] }[];
  }
> = {
  TECNOLOGIAS: {
    title: 'Tecnologia lipídica em escala industrial.',
    description:
      'Explore nosso portfólio de tecnologias — ciência aplicada e desempenho validado para indústrias regulamentadas.',
    ctaText: 'CONHECER PLATAFORMA',
    ctaHref: '/tecnologias',
    groups: [
      {
        heading: 'PLATAFORMAS',
        items: [
          { name: 'Lipossomas', desc: 'Vesículas para entrega ativa direcionada.', href: '/tecnologias/lipossomas' },
          { name: 'Fosfolipídios', desc: 'Estruturas biomiméticas de alta pureza.', href: '/tecnologias/fosfolipidios' },
          { name: 'Encapsulação', desc: 'Proteção e estabilização molecular.', href: '/tecnologias/encapsulacao' },
        ],
      },
    ],
  },
  APLICAÇÕES: {
    title: 'Soluções para múltiplas indústrias.',
    description: 'Ingredientes especializados para cosméticos, farmacêutica, nutracêuticos e veterinária.',
    ctaText: 'CONHEÇA NOSSAS APLICAÇÕES',
    ctaHref: '/aplicacoes',
    groups: [
      {
        heading: 'MERCADOS',
        items: [
          { name: 'Farmacêutica', desc: 'Entrega controlada de ativos.', href: '/aplicacoes' },
          { name: 'Cosméticos', desc: 'Fórmulas premium de alta performance.', href: '/aplicacoes' },
          { name: 'Nutracêutico', desc: 'Nutrientes com maior biodisponibilidade.', href: '/aplicacoes' },
        ],
      },
    ],
  },
  'CONTEÚDO TÉCNICO': {
    title: 'Conhecimento técnico e científico.',
    description: 'Artigos e materiais sobre lipídios, tecnologias e aplicações.',
    ctaText: 'ACESSAR BIBLIOTECA',
    ctaHref: '/blog',
    groups: [
      {
        heading: 'RECURSOS',
        items: [{ name: 'Blog', desc: 'Artigos e novidades técnicas.', href: '/blog' }],
      },
    ],
  },
};

export function Megamenu({ section }: MegamenuProps) {
  const content = megamenuContent[section];
  if (!content) return null;

  return (
    <div className="absolute left-0 right-0 top-full z-40 border-t border-gray-100 bg-white shadow-xl animate-fade-in">
      <div className="container-main grid grid-cols-1 gap-10 py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div>
          <p className="eyebrow mb-3">{section}</p>
          <h3 className="mb-3 text-2xl font-bold text-gray-900">{content.title}</h3>
          <p className="mb-6 text-gray-600">{content.description}</p>
          <LinkArrow href={content.ctaHref}>{content.ctaText}</LinkArrow>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {content.groups.map((group) => (
            <div key={group.heading}>
              <p className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-400">{group.heading}</p>
              <div className="space-y-4">
                {group.items.map((item) => (
                  <a key={item.name} href={item.href} className="block group">
                    <p className="font-semibold text-gray-900 group-hover:text-primary-600">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
