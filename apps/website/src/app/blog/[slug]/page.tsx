import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

function resolveMediaUrl(path?: string | null): string {
  if (!path) return '';
  return path.startsWith('http') ? path : `${API_URL}${path}`;
}

interface Post {
  id: string;
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

  return (
    <article className="mx-auto max-w-3xl px-4 py-20">
      <Link href="/blog" className="text-sm text-blue-600 hover:underline">
        ← Blog
      </Link>

      {post.categories.length > 0 && (
        <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-blue-600">
          {post.categories.map((c) => c.category.name).join(', ')}
        </p>
      )}

      <h1 className="mt-2 text-4xl font-bold">{post.title}</h1>

      {(post.author || post.publishedAt) && (
        <p className="mt-3 text-sm text-gray-500">
          {post.author && <span>{post.author}</span>}
          {post.author && post.publishedAt && ' · '}
          {post.publishedAt && new Date(post.publishedAt).toLocaleDateString('pt-BR')}
        </p>
      )}

      {post.featured && (
        <img
          src={resolveMediaUrl(post.featured)}
          alt={post.title}
          className="mt-8 w-full rounded-lg object-cover"
        />
      )}

      <div className="mt-8 whitespace-pre-line text-lg leading-relaxed text-gray-700">{post.content}</div>
    </article>
  );
}
