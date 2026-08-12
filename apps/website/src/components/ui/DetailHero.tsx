import { ReactNode } from 'react';
import Link from 'next/link';
import { HiArrowLeft } from 'react-icons/hi2';
import { Badge } from '@/components/ui/Badge';

interface DetailHeroProps {
  badge: string;
  /** Variante do selo principal — o blog marca material para download em escuro. */
  badgeVariant?: 'primary' | 'dark';
  /** Selo secundário ao lado do principal (as categorias, no caso do blog). */
  badgeExtra?: string | null;
  title: string;
  description?: string | null;
  backHref: string;
  backLabel: string;
  children?: ReactNode;
}

export function DetailHero({
  badge,
  badgeVariant = 'primary',
  badgeExtra,
  title,
  description,
  backHref,
  backLabel,
  children,
}: DetailHeroProps) {
  return (
    <section className="border-b border-gray-100 bg-gray-50 py-16 md:py-20">
      <div className="container-main space-y-5">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-500 transition-colors hover:text-primary-600"
        >
          <HiArrowLeft className="h-4 w-4" />
          {backLabel}
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={badgeVariant}>{badge}</Badge>
          {badgeExtra && <Badge variant="secondary">{badgeExtra}</Badge>}
        </div>
        {/* `max-w-4xl` segura o título de virar uma linha larguíssima em 4K sem tirá-lo da
            borda do container, que é onde todos os heros do site começam. */}
        <h1 className="max-w-4xl text-gray-900">{title}</h1>
        {description && <p className="max-w-2xl text-lg text-gray-600">{description}</p>}
        {children}
      </div>
    </section>
  );
}
