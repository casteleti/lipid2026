'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { resolveMediaUrl } from '@/lib/api';

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  featured: string | null;
  publishedAt: string | null;
  categories: { category: { id: string; name: string } }[];
}

interface Paginated<T> {
  data: T[];
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/content?status=PUBLISHED&take=50`)
      .then((r) => r.json())
      .then((res: Paginated<Post>) => setPosts(res.data))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-20">
      <h1 className="text-4xl font-bold mb-12">Blog</h1>

      {loading ? (
        <p className="text-gray-500">Carregando...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500">Nenhum post publicado ainda.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="block overflow-hidden rounded-lg border transition hover:shadow-lg"
            >
              {post.featured && (
                <img
                  src={resolveMediaUrl(post.featured)}
                  alt={post.title}
                  className="h-40 w-full object-cover"
                />
              )}
              <div className="p-6">
                {post.categories.length > 0 && (
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-600">
                    {post.categories.map((c) => c.category.name).join(', ')}
                  </p>
                )}
                <h3 className="mb-2 text-xl font-semibold">{post.title}</h3>
                <p className="text-gray-600">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
