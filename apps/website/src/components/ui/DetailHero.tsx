import { ReactNode } from 'react';
import Link from 'next/link';
import { HiArrowLeft } from 'react-icons/hi2';
import { Badge } from '@/components/ui/Badge';

interface DetailHeroProps {
  badge: string;
  title: string;
  description?: string | null;
  backHref: string;
  backLabel: string;
  children?: ReactNode;
}

export function DetailHero({ badge, title, description, backHref, backLabel, children }: DetailHeroProps) {
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
        <Badge variant="primary">{badge}</Badge>
        <h1 className="text-gray-900">{title}</h1>
        {description && <p className="max-w-2xl text-lg text-gray-600">{description}</p>}
        {children}
      </div>
    </section>
  );
}
