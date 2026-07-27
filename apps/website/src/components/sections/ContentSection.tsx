'use client';

import { useEffect, useState } from 'react';
import { Section } from '@/components/ui/Section';
import { Grid } from '@/components/ui/Grid';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LinkArrow } from '@/components/ui/LinkArrow';
import { resolveMediaUrl } from '@/lib/api';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured: string | null;
}

export function ContentSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/content?status=PUBLISHED&take=3`)
      .then((r) => r.json())
      .then((res) => setPosts(res.data || []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && posts.length === 0) return null;

  return (
    <Section>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-end mb-12">
        <div className="space-y-5">
          <p className="eyebrow">CONHECIMENTO APLICADO</p>
          <h2 className="text-gray-900">Conteúdo técnico e científico</h2>
        </div>
        <div className="space-y-5 md:pb-1">
          <p className="text-lg text-gray-600">
            Explore nossos artigos, estudos e materiais técnicos sobre lipídios, tecnologias e
            aplicações.
          </p>
          <LinkArrow href="/blog">Acessar biblioteca</LinkArrow>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-400">Carregando...</p>
      ) : (
        <Grid cols={3} gap="lg">
          {posts.map((post) => (
            <Card key={post.id} className="flex flex-col">
              <div className="relative h-44 bg-gray-100">
                {post.featured && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={resolveMediaUrl(post.featured)}
                    alt={post.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
                <Badge variant="secondary" className="absolute left-4 top-4 bg-white">
                  ARTIGO
                </Badge>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <h3 className="line-clamp-2 text-lg font-bold text-gray-900">{post.title}</h3>
                <p className="line-clamp-3 flex-1 text-sm text-gray-600">{post.excerpt}</p>
                <LinkArrow href={`/blog/${post.slug}`}>Ler artigo</LinkArrow>
              </div>
            </Card>
          ))}
        </Grid>
      )}
    </Section>
  );
}
