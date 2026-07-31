import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conteúdo Técnico',
  description:
    'Artigos e materiais técnicos sobre lipídios, fosfolipídios, encapsulação e tecnologias de formulação — conhecimento aplicado da equipe da Lipid Ingredients.',
  keywords: ['conteúdo técnico lipídios', 'artigos fosfolipídios', 'blog formulação'],
  openGraph: {
    title: 'Conteúdo Técnico | Lipid Ingredients',
    description: 'Artigos e materiais técnicos sobre lipídios, tecnologias e aplicações — conhecimento aplicado, não promocional.',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
