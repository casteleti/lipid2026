import { Card } from '@/components/ui/Card';
import { LinkArrow } from '@/components/ui/LinkArrow';

/**
 * Card de segmento. Nasceu dentro do SegmentsSection (home e institucional) e foi extraído
 * para cá quando o rodapé das próprias landings de /segmentos passou a oferecer os outros
 * três — os dois lugares mostram a mesma coisa e agora dividem o mesmo componente.
 */

/** Nome curto do segmento — o conteúdo cadastrado é uma frase, longa demais para um card. */
export const NOMES_SEGMENTO: Record<string, string> = {
  farmaceutica: 'Farmacêutica',
  cosmetica: 'Cosmética',
  nutricional: 'Nutricional',
  veterinaria: 'Veterinária',
};

/**
 * Arte do card. São quatro segmentos fixos, então a peça é um asset versionado do site em vez
 * de um campo do CMS — `SegmentPage` não tem coluna de imagem.
 */
export const ARTES_CARD: Record<string, { src: string; alt: string }> = {
  farmaceutica: {
    src: '/segmentos/card-farmaceutica.webp',
    alt: 'Frasco-ampola, cápsulas e vesícula lipossomal em corte',
  },
  cosmetica: {
    src: '/segmentos/card-cosmetica.webp',
    alt: 'Creme cosmético, frasco de sérum e vesícula lipossomal em corte',
  },
  nutricional: {
    src: '/segmentos/card-nutricional.webp',
    alt: 'Lecitina em pó, leite e grãos de soja em vidraria de laboratório',
  },
  veterinaria: {
    src: '/segmentos/card-veterinaria.webp',
    alt: 'Bovino leiteiro em ambiente laboratorial, ao lado de ração e frasco de suplemento',
  },
};

/**
 * Ordem do numerador. É fixa por slug, e não o índice da lista onde o card aparece: no rodapé
 * de /segmentos/cosmetica só entram três cards, e numerá-los 01-02-03 faria o mesmo segmento
 * trocar de número conforme a página. Farmacêutica é 02 em qualquer lugar.
 */
const ORDEM = ['cosmetica', 'farmaceutica', 'nutricional', 'veterinaria'];

export function numeroDoSegmento(slug: string): string {
  const i = ORDEM.indexOf(slug);
  return String((i < 0 ? ORDEM.length : i) + 1).padStart(2, '0');
}

export function CardSegmento({ slug, descricao }: { slug: string; descricao: string | null }) {
  const arte = ARTES_CARD[slug];

  return (
    <Card className="group flex flex-col">
      <div className="relative flex h-40 items-end overflow-hidden bg-gradient-to-br from-primary-100 to-primary-300 p-5">
        {arte && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={arte.src}
            alt={arte.alt}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.04]"
          />
        )}
        {/* Véu inferior: as artes têm fundo claro e o badge branco sumiria sobre elas. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-primary-900/25 to-transparent" />
        <span className="relative rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-primary-700">
          {numeroDoSegmento(slug)}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-lg font-bold text-gray-900">{NOMES_SEGMENTO[slug] || slug}</h3>
        <p className="flex-1 text-sm leading-relaxed text-gray-600">{descricao}</p>
        <LinkArrow href={`/segmentos/${slug}`} className="mt-2">
          Explorar
        </LinkArrow>
      </div>
    </Card>
  );
}
