import { ReactNode } from 'react';
import { Badge } from '@/components/ui/Badge';

interface ListingHeroProps {
  badge: string;
  title: string;
  description: string;
  children?: ReactNode;
}

export function ListingHero({ badge, title, description, children }: ListingHeroProps) {
  return (
    <section className="border-b border-gray-100 bg-gray-50 py-16 md:py-20">
      <div className="container-main space-y-5">
        <Badge variant="primary">{badge}</Badge>
        <h1 className="text-gray-900">{title}</h1>
        <p className="max-w-2xl text-lg text-gray-600">{description}</p>
        {children}
      </div>
    </section>
  );
}
