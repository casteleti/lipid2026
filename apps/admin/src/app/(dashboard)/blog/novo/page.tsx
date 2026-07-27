'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { Button } from '@/components/Button';
import { ImageUpload } from '@/components/ImageUpload';
import { CheckboxGroup } from '@/components/CheckboxGroup';
import { api } from '@/lib/api-client';

interface Category {
  id: string;
  name: string;
}

export default function NovoPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [featured, setFeatured] = useState('');
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED'>('DRAFT');
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get<{ data: Category[] }>('/categories?take=100')
      .then((res) => setCategories(res.data))
      .catch(() => setCategories([]));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/content', {
        title,
        excerpt: excerpt || undefined,
        content,
        author: author || undefined,
        featured: featured || undefined,
        status,
        categoryIds,
      });
      router.push('/blog');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível criar o post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Novo Post</h1>
        <Link href="/blog" className="text-sm text-primary-600 hover:underline">
          ← Voltar
        </Link>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
          <Input
            label="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            minLength={3}
            maxLength={200}
            disabled={loading}
          />

          <Input
            label="Resumo"
            hint="Opcional"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            maxLength={500}
            disabled={loading}
          />

          <Textarea
            label="Texto"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            minLength={10}
            rows={12}
            disabled={loading}
          />

          <ImageUpload label="Imagem destacada" value={featured} onChange={setFeatured} disabled={loading} />

          <CheckboxGroup
            label="Categorias"
            options={categories.map((c) => ({ id: c.id, label: c.name }))}
            selected={categoryIds}
            onChange={setCategoryIds}
            disabled={loading}
            emptyText="Nenhuma categoria cadastrada ainda. Crie categorias primeiro."
          />

          <Input
            label="Autor"
            hint="Opcional"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            maxLength={100}
            disabled={loading}
          />

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'DRAFT' | 'PUBLISHED')}
              disabled={loading}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="DRAFT">Rascunho</option>
              <option value="PUBLISHED">Publicado</option>
            </select>
          </div>

          {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

          <div className="flex gap-3">
            <Button variant="primary" loading={loading}>
              Salvar
            </Button>
            <Link href="/blog">
              <Button type="button" variant="secondary">
                Cancelar
              </Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
