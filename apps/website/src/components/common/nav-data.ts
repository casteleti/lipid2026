import { IconType } from 'react-icons';
import {
  HiOutlineBeaker,
  HiOutlineCube,
  HiOutlineShieldCheck,
  HiOutlineHeart,
  HiOutlineSparkles,
  HiOutlineGlobeAlt,
} from 'react-icons/hi2';
// hi2 não tem ícone de veterinária; o fa6 já é usado no rodapé.
import { FaPaw } from 'react-icons/fa6';

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
  SEGMENTOS: {
    title: 'Soluções para múltiplas indústrias.',
    description: 'Tecnologia lipídica aplicada ao que cada segmento precisa provar.',
    ctaText: 'Ver todos os segmentos',
    ctaHref: '/segmentos',
    items: [
      {
        name: 'Farmacêutica',
        desc: 'Formulações de maior valor terapêutico.',
        href: '/segmentos/farmaceutica',
        icon: HiOutlineHeart,
      },
      {
        name: 'Cosmética',
        desc: 'Tecnologia que vira experiência de uso.',
        href: '/segmentos/cosmetica',
        icon: HiOutlineSparkles,
      },
      {
        name: 'Nutricional',
        desc: 'Mais função e mais valor percebido.',
        href: '/segmentos/nutricional',
        icon: HiOutlineGlobeAlt,
      },
      {
        name: 'Veterinária',
        desc: 'Saúde e nutrição animal competitivas.',
        href: '/segmentos/veterinaria',
        icon: FaPaw,
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
  { label: 'SOBRE A LIPID', href: '/sobre' },
  { label: 'TECNOLOGIAS', href: '/tecnologias', dropdownKey: 'TECNOLOGIAS' },
  { label: 'SEGMENTOS', href: '/segmentos', dropdownKey: 'SEGMENTOS' },
  { label: 'INGREDIENTES', href: '/ingredientes' },
  { label: 'CONTEÚDO TÉCNICO', href: '/blog' },
  { label: 'PARCEIROS', href: '/parceiros' },
  { label: 'CONTATO', href: '/contato' },
];
