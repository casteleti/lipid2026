'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ContentForm,
  VALORES_INICIAIS,
  type ContentFormValues,
} from '@/components/ContentForm';
import { Button } from '@/components/Button';
import { montarPayload } from '@/lib/content-payload';
import { api } from '@/lib/api-client';

interface ContentResponse {
  id: string;
  type: 'ARTIGO' | 'DOWNLOAD';
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  author: string | null;
  featured: string | null;
  featuredAlt: string | null;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  seoTitle: string | null;
  seoDescription: string | null;
  views: number;
  categories: { category: { id: string; name: string } }[];
  summaryPoints: { id: string; text: string }[];
  faqs: { id: string; question: string; answer: string }[];
  files: {
    id: string;
    url: string;
    label: string;
    sizeBytes: number | null;
    mimetype: string | null;
  }[];
}

export default function EditarConteudoPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [valores, setValores] = useState<ContentFormValues>(VALORES_INICIAIS);
  const [slug, setSlug] = useState('');
  const [views, setViews] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');
  const [naoEncontrado, setNaoEncontrado] = useState(false);

  useEffect(() => {
    api
      .get<ContentResponse>(`/content/${params.id}`)
      .then((item) => {
        setSlug(item.slug);
        setViews(item.views ?? 0);
        setValores({
          type: item.type ?? 'ARTIGO',
          title: item.title,
          excerpt: item.excerpt || '',
          content: item.content || '',
          author: item.author || '',
          featured: item.featured || '',
          featuredAlt: item.featuredAlt || '',
          // ARCHIVED não é opção no seletor: reabrir um arquivado cai em rascunho, e o
          // autor decide se republica.
          status: item.status === 'ARCHIVED' ? 'DRAFT' : item.status,
          seoTitle: item.seoTitle || '',
          seoDescription: item.seoDescription || '',
          categoryIds: (item.categories ?? []).map((c) => c.category.id),
          summaryPoints: (item.summaryPoints ?? []).map((p) => ({ text: p.text })),
          faqs: (item.faqs ?? []).map((f) => ({ question: f.question, answer: f.answer })),
          files: (item.files ?? []).map((f) => ({
            url: f.url,
            label: f.label,
            sizeBytes: f.sizeBytes ?? undefined,
            mimetype: f.mimetype ?? undefined,
          })),
        });
      })
      .catch(() => setNaoEncontrado(true))
      .finally(() => setCarregando(false));
  }, [params.id]);

  const handleSubmit = async () => {
    setSalvando(true);
    setErro('');
    try {
      await api.put(`/content/${params.id}`, montarPayload(valores));
      router.push('/blog');
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Não foi possível salvar as alterações');
      setSalvando(false);
    }
  };

  const handleArquivar = async () => {
    if (!confirm('Arquivar este conteúdo? Ele sai do site, mas não é apagado.')) return;
    setSalvando(true);
    try {
      await api.delete(`/content/${params.id}`);
      router.push('/blog');
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Não foi possível arquivar');
      setSalvando(false);
    }
  };

  if (carregando) return <p className="text-gray-500">Carregando...</p>;
  if (naoEncontrado) return <p className="text-red-600">Conteúdo não encontrado.</p>;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Editar conteúdo</h1>
          <p className="mt-1 text-sm text-gray-600">
            {views} visualizaç{views === 1 ? 'ão' : 'ões'} ·{' '}
            <a
              href={`${siteUrl}/blog/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline"
            >
              ver no site ↗
            </a>
          </p>
        </div>
        <Link href="/blog" className="text-sm text-primary-600 hover:underline">
          ← Voltar
        </Link>
      </div>

      <ContentForm
        valores={valores}
        onChange={setValores}
        onSubmit={handleSubmit}
        salvando={salvando}
        erro={erro}
        textoBotao="Salvar alterações"
        extra={
          <Button
            type="button"
            variant="danger"
            onClick={handleArquivar}
            disabled={salvando}
            className="ml-auto"
          >
            Arquivar
          </Button>
        }
      />
    </div>
  );
}
