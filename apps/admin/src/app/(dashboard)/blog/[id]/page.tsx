'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
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

interface Post {
  id: string;
  title: string;
  excerpt: string | null;
  content: string;
  author: string | null;
  featured: string | null;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  categories: { category: Category }[];
}

export default function EditarPostPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [featured, setFeatured] = useState('');
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED' | 'ARCHIVED'>('DRAFT');
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    api
      .get<{ data: Category[] }>('/categories?take=100')
      .then((res) => setCategories(res.data))
      .catch(() => setCategories([]));

    api
      .get<Post>(`/content/${params.id}`)
      .then((post) => {
        setTitle(post.title);
        setExcerpt(post.excerpt || '');
        setContent(post.content);
        setAuthor(post.author || '');
        setFeatured(post.featured || '');
        setStatus(post.status);
        setCategoryIds(post.categories.map((c) => c.category.id));
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoadingData(false));
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      await api.put(`/content/${params.id}`, {
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
      setError(err instanceof Error ? err.message : 'Não foi possível salvar as alterações');
    } finally {
      setSaving(false);
    }
  };

  const handleArchive = async () => {
    if (!confirm('Arquivar este post?')) return;
    setSaving(true);
    try {
      await api.delete(`/content/${params.id}`);
      router.push('/blog');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível arquivar o post');
      setSaving(false);
    }
  };

  if (loadingData) return <p className="text-gray-500">Carregando...</p>;
  if (notFound) return <p className="text-red-600">Post não encontrado.</p>;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Editar Post</h1>
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
            disabled={saving}
          />

          <Input
            label="Resumo"
            hint="Opcional"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            maxLength={500}
            disabled={saving}
          />

          <Textarea
            label="Texto"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            minLength={10}
            rows={12}
            disabled={saving}
          />

          <ImageUpload label="Imagem destacada" value={featured} onChange={setFeatured} disabled={saving} />

          <CheckboxGroup
            label="Categorias"
            options={categories.map((c) => ({ id: c.id, label: c.name }))}
            selected={categoryIds}
            onChange={setCategoryIds}
            disabled={saving}
            emptyText="Nenhuma categoria cadastrada ainda."
          />

          <Input
            label="Autor"
            hint="Opcional"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            maxLength={100}
            disabled={saving}
          />

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED')}
              disabled={saving}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="DRAFT">Rascunho</option>
              <option value="PUBLISHED">Publicado</option>
              <option value="ARCHIVED">Arquivado</option>
            </select>
          </div>

          {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

          <div className="flex gap-3">
            <Button variant="primary" loading={saving}>
              Salvar
            </Button>
            <Link href="/blog">
              <Button type="button" variant="secondary" disabled={saving}>
                Cancelar
              </Button>
            </Link>
            <Button type="button" variant="danger" onClick={handleArchive} disabled={saving} className="ml-auto">
              Arquivar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
