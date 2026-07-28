import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LinkArrow } from '@/components/ui/LinkArrow';
import { Grid } from '@/components/ui/Grid';
import { resolveMediaUrl } from '@/lib/api';

interface RelatedItem {
  id: string;
  title: string;
  href: string;
  excerpt?: string | null;
  image?: string | null;
  badge?: string;
}

interface RelatedItemsProps {
  title: string;
  items: RelatedItem[];
  moreHref: string;
  moreLabel: string;
}

export function RelatedItems({ title, items, moreHref, moreLabel }: RelatedItemsProps) {
  if (items.length === 0) return null;

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-gray-900">{title}</h2>
        <LinkArrow href={moreHref}>{moreLabel}</LinkArrow>
      </div>

      <Grid cols={3} gap="lg">
        {items.map((item) => (
          <Card key={item.id} href={item.href} className="flex flex-col">
            {item.image && (
              <div className="relative h-40 bg-gray-100">
                <Image
                  src={resolveMediaUrl(item.image)}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col gap-3 p-6">
              {item.badge && (
                <Badge variant="secondary" className="w-fit">
                  {item.badge}
                </Badge>
              )}
              <h3 className="line-clamp-2 text-lg font-bold text-gray-900">{item.title}</h3>
              {item.excerpt && <p className="line-clamp-2 flex-1 text-sm text-gray-600">{item.excerpt}</p>}
              <LinkArrow as="span">Saiba mais</LinkArrow>
            </div>
          </Card>
        ))}
      </Grid>
    </div>
  );
}
