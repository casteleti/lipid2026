import { IconType } from 'react-icons';
import {
  HiOutlineBeaker,
  HiOutlineCube,
  HiOutlineShieldCheck,
  HiOutlineHeart,
  HiOutlineSparkles,
  HiOutlineGlobeAlt,
} from 'react-icons/hi2';

export interface NavSubItem {
  name: string;
  desc: string;
  href: string;
  icon: IconType;
}

export interface NavSection {
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  items: NavSubItem[];
}

export const megamenuContent = {
  TECNOLOGIAS: {
    title: 'Tecnologia lipídica em escala industrial.',
    description: 'Ciência aplicada e desempenho validado para indústrias regulamentadas.',
    ctaText: 'Ver todas as tecnologias',
    ctaHref: '/tecnologias',
    items: [
      {
        name: 'Lipossomas',
        desc: 'Vesículas para entrega ativa direcionada.',
        href: '/tecnologias/lipossomas',
        icon: HiOutlineBeaker,
      },
      {
        name: 'Fosfolipídios',
        desc: 'Estruturas biomiméticas de alta pureza.',
        href: '/tecnologias/fosfolipidios',
        icon: HiOutlineCube,
      },
      {
        name: 'Encapsulação',
        desc: 'Proteção e estabilização molecular.',
        href: '/tecnologias/encapsulacao',
        icon: HiOutlineShieldCheck,
      },
    ],
  },
  APLICAÇÕES: {
    title: 'Soluções para múltiplas indústrias.',
    description: 'Ingredientes especializados para cosméticos, farmacêutica e nutracêuticos.',
    ctaText: 'Ver todas as aplicações',
    ctaHref: '/aplicacoes',
    items: [
      {
        name: 'Farmacêutica',
        desc: 'Entrega controlada de ativos.',
        href: '/aplicacoes/pharma',
        icon: HiOutlineHeart,
      },
      {
        name: 'Cosméticos',
        desc: 'Fórmulas premium de alta performance.',
        href: '/aplicacoes/cosmeticos',
        icon: HiOutlineSparkles,
      },
      {
        name: 'Nutracêutico',
        desc: 'Nutrientes com maior biodisponibilidade.',
        href: '/aplicacoes/nutraceutico',
        icon: HiOutlineGlobeAlt,
      },
    ],
  },
} satisfies Record<string, NavSection>;

export type DropdownKey = keyof typeof megamenuContent;

export interface NavItem {
  label: string;
  href: string;
  dropdownKey?: DropdownKey;
}

export const menuItems: NavItem[] = [
  { label: 'SOBRE', href: '/sobre' },
  { label: 'TECNOLOGIAS', href: '/tecnologias', dropdownKey: 'TECNOLOGIAS' },
  { label: 'APLICAÇÕES', href: '/aplicacoes', dropdownKey: 'APLICAÇÕES' },
  { label: 'INGREDIENTES', href: '/ingredientes' },
  { label: 'CONTEÚDO TÉCNICO', href: '/blog' },
  { label: 'PARCEIROS', href: '/parceiros' },
  { label: 'CONTATO', href: '/contato' },
];
