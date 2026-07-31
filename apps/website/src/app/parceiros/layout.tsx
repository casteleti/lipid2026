import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Parceiros e Fabricantes',
  description:
    'Fabricantes internacionais representados com exclusividade no Brasil pela Lipid Ingredients — referências globais em fosfolipídios, ativos e ingredientes especializados, como o Grupo Lipoid.',
  keywords: ['Lipoid Brasil', 'fabricantes de fosfolipídios', 'representante exclusivo Lipoid'],
  openGraph: {
    title: 'Parceiros e Fabricantes | Lipid Ingredients',
    description: 'Fabricantes internacionais representados com exclusividade no Brasil — referências globais em ciência e inovação em lipídios.',
  },
};

export default function ParceirosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
