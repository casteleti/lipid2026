import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { HiArrowLeft } from 'react-icons/hi2';
import { Badge } from '@/components/ui/Badge';
import { RelatedItems } from '@/components/ui/RelatedItems';
import { Section } from '@/components/ui/Section';
import { resolveMediaUrl } from '@/lib/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

interface Post {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string | null;
  featured: string | null;
  author: string | null;
  publishedAt: string | null;
  categories: { category: { id: string; name: string } }[];
}

async function getPost(slug: string): Promise<Post | null> {
  const res = await fetch(`${API_URL}/api/v1/content/slug/${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

async function getRelated(currentSlug: string) {
  const res = await fetch(`${API_URL}/api/v1/content?status=PUBLISHED&take=4`, { cache: 'no-store' });
  if (!res.ok) return [];
  const json = await res.json();
  return (json.data as Post[]).filter((p) => p.slug !== currentSlug).slice(0, 3);
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: 'Post não encontrado' };

  return {
    title: `${post.title} - Blog Daksa`,
    description: post.excerpt || post.content.slice(0, 160),
    openGraph: {
      title: post.title,
      description: post.excerpt || post.content.slice(0, 160),
      images: post.featured ? [resolveMediaUrl(post.featured)] : undefined,
    },
  };
}

export default async function PostDetailPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const related = await getRelated(post.slug);

  return (
    <>
      <section className="border-b border-gray-100 bg-gray-50 py-16 md:py-20">
        <div className="container-main mx-auto max-w-3xl space-y-5">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-500 transition-colors hover:text-primary-600"
          >
            <HiArrowLeft className="h-4 w-4" />
            Blog
          </Link>

          {post.categories.length > 0 && (
            <Badge variant="primary">{post.categories.map((c) => c.category.name).join(', ')}</Badge>
          )}

          <h1 className="text-gray-900">{post.title}</h1>

          {(post.author || post.publishedAt) && (
            <p className="text-sm text-gray-500">
              {post.author && <span>{post.author}</span>}
              {post.author && post.publishedAt && ' · '}
              {post.publishedAt && new Date(post.publishedAt).toLocaleDateString('pt-BR')}
            </p>
          )}
        </div>
      </section>

      <article className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
          {post.featured && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={resolveMediaUrl(post.featured)}
              alt={post.title}
              className="mb-10 w-full rounded-2xl object-cover"
            />
          )}

          <div className="prose prose-lg max-w-none whitespace-pre-line text-gray-700">
            {post.content}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <Section variant="light">
          <RelatedItems
            title="Leitura recomendada"
            moreHref="/blog"
            moreLabel="Ver todos os artigos"
            items={related.map((p) => ({
              id: p.id,
              title: p.title,
              href: `/blog/${p.slug}`,
              excerpt: p.excerpt,
              image: p.featured,
              badge: 'ARTIGO',
            }))}
          />
        </Section>
      )}
    </>
  );
}
