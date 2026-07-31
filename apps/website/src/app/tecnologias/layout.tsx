import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tecnologias Lipídicas',
  description:
    'Lipossomas, fosfolipídios e sistemas de encapsulação para formulações farmacêuticas, cosméticas, nutricionais e veterinárias. Conheça as plataformas tecnológicas da Lipid Ingredients.',
  keywords: ['lipossomas', 'fosfolipídios', 'encapsulação', 'sistemas de entrega lipídicos', 'tecnologia lipídica'],
  openGraph: {
    title: 'Tecnologias Lipídicas | Lipid Ingredients',
    description: 'Plataformas tecnológicas que garantem estabilidade, biodisponibilidade e eficácia em sistemas de entrega avançados.',
  },
};

export default function TecnologiasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
