import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catálogo de Ingredientes',
  description:
    'Fosfolipídios, lecitinas, ativos e extratos botânicos com código comercial, categoria técnica e documentação. Busque por família, aplicação ou fabricante — Lipoid e demais parceiros da Lipid Ingredients.',
  keywords: ['catálogo de ingredientes', 'lecitinas', 'fosfolipídios', 'ativos cosméticos', 'extratos botânicos', 'INCI'],
  openGraph: {
    title: 'Catálogo de Ingredientes | Lipid Ingredients',
    description: 'Ingredientes especializados com código comercial, categoria técnica e documentação — busque por família, aplicação ou fabricante.',
  },
};

export default function IngredientesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
