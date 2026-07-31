'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { Button } from '@/components/Button';
import { api } from '@/lib/api-client';
import type { Application, SegmentPage, StatsRow } from '../types';

const SECTIONS = [
  { id: 'hero', label: 'Hero' },
  { id: 'comercial', label: 'Texto comercial' },
  { id: 'aplicacoes', label: 'Aplicações' },
  { id: 'destaque', label: 'Destaque + ingredientes' },
  { id: 'formulario', label: 'Formulário' },
  { id: 'seo', label: 'SEO' },
];

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 rounded-xl border border-gray-200 bg-white p-8 shadow-sm"
    >
      <div className="mb-8 border-b border-gray-100 pb-5">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        {description && <p className="mt-1.5 text-sm text-gray-500">{description}</p>}
      </div>
      {children}
    </section>
  );
}

export default function SegmentoDetalhePage() {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<SegmentPage | null>(null);
  const [stat, setStat] = useState<StatsRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;
    Promise.all([
      api.get<SegmentPage>(`/segment-pages/${slug}`),
      api.get<StatsRow[]>('/page-views/summary'),
    ])
      .then(([p, s]) => {
        setPage(p);
        setStat(s.find((row) => row.sector === p.sector) ?? null);
      })
      .catch(() => setError('Não foi possível carregar esta página de segmento'))
      .finally(() => setLoading(false));
  }, [slug]);

  const patch = (p: Partial<SegmentPage>) =>
    setPage((prev) => (prev ? { ...prev, ...p } : prev));

  const patchParagraph = (index: number, value: string) =>
    setPage((prev) => {
      if (!prev) return prev;
      const paragraphs = [...(prev.salesParagraphs || ['', '', ''])];
      paragraphs[index] = value;
      return { ...prev, salesParagraphs: paragraphs };
    });

  const patchApplication = (index: number, field: keyof Application, value: string) =>
    setPage((prev) => {
      if (!prev) return prev;
      const apps = [...(prev.applications || [])];
      apps[index] = { ...apps[index], [field]: value };
      return { ...prev, applications: apps };
    });

  const addApplication = () =>
    setPage((prev) =>
      prev
        ? { ...prev, applications: [...(prev.applications || []), { title: '', description: '' }] }
        : prev,
    );

  const removeApplication = (index: number) =>
    setPage((prev) =>
      prev
        ? { ...prev, applications: (prev.applications || []).filter((_, i) => i !== index) }
        : prev,
    );

  const save = async () => {
    if (!page) return;
    setSaving(true);
    setMessage('');
    setError('');
    try {
      // Só os campos editáveis: id/slug/sector são imutáveis e createdAt/updatedAt
      // vêm no GET mas são rejeitados pelo DTO do PUT (whitelist estrita).
      const editable = {
        active: page.active,
        eyebrow: page.eyebrow,
        h1: page.h1,
        subheadline: page.subheadline,
        salesParagraphs: page.salesParagraphs,
        applicationsTitle: page.applicationsTitle,
        applicationsIntro: page.applicationsIntro,
        applications: page.applications,
        floatingHighlight: page.floatingHighlight,
        ingredientExplorerHeadline: page.ingredientExplorerHeadline,
        ingredientExplorerSupportingText: page.ingredientExplorerSupportingText,
        formEyebrow: page.formEyebrow,
        formTitle: page.formTitle,
        formDescription: page.formDescription,
        formValueProposition: page.formValueProposition,
        formCtaLabel: page.formCtaLabel,
        formSuccessMessage: page.formSuccessMessage,
        formChallengeOptions: page.formChallengeOptions,
        seoTitle: page.seoTitle,
        seoDescription: page.seoDescription,
        seoKeywords: page.seoKeywords,
      };
      const updated = await api.put<SegmentPage>(`/segment-pages/${page.id}`, editable);
      setPage(updated);
      setMessage('Alterações salvas.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível salvar');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-sm text-gray-500">Carregando...</p>;
  if (!page)
    return (
      <div className="space-y-4">
        <p className="text-sm text-red-600">{error || 'Página não encontrada.'}</p>
        <Link href="/segmentos" className="text-sm font-semibold text-primary-600">
          ← Voltar para as páginas de segmento
        </Link>
      </div>
    );

  const applications = page.applications || [];

  return (
    <div className="mx-auto max-w-[1600px] pb-16">
      <header className="sticky -top-8 z-10 -mx-8 -mt-8 mb-10 border-b border-gray-200 bg-gray-50 px-8 pb-5 pt-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="min-w-0">
            <Link
              href="/segmentos"
              className="text-xs font-semibold uppercase tracking-wide text-gray-500 hover:text-primary-600"
            >
              ← Páginas por Segmento
            </Link>
            <h1 className="mt-1.5 truncate text-2xl font-bold text-gray-900">
              /segmentos/{page.slug}
            </h1>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex gap-7 text-center">
              <div>
                <p className="text-lg font-bold text-gray-900">{stat?.views ?? 0}</p>
                <p className="text-xs text-gray-500">acessos</p>
              </div>
              <div>
                <p className="text-lg font-bold text-primary-600">{stat?.leads ?? 0}</p>
                <p className="text-xs text-gray-500">leads</p>
              </div>
              <div>
                <p className="text-lg font-bold text-green-600">{stat?.conversionRate ?? 0}%</p>
                <p className="text-xs text-gray-500">conversão</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {message && <span className="text-sm font-semibold text-primary-700">{message}</span>}
              {error && <span className="text-sm font-semibold text-red-600">{error}</span>}
              <Button type="button" variant="primary" loading={saving} onClick={save}>
                Salvar página
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="grid gap-10 xl:grid-cols-[200px_minmax(0,1fr)]">
        <nav className="hidden xl:block">
          <div className="sticky top-32 space-y-1">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Seções
            </p>
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="block rounded-lg px-3 py-2 text-sm text-gray-600 transition hover:bg-white hover:text-primary-700"
              >
                {s.label}
              </a>
            ))}
            <div className="mt-6 border-t border-gray-200 pt-4">
              <label className="flex items-center gap-2 px-3 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={page.active}
                  onChange={(e) => patch({ active: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600"
                />
                Página ativa
              </label>
            </div>
          </div>
        </nav>

        <div className="space-y-10">
          <Section id="hero" title="Hero" description="Primeira dobra da landing page.">
            <div className="grid gap-6 2xl:grid-cols-3">
              <Input
                label="Eyebrow"
                value={page.eyebrow || ''}
                onChange={(e) => patch({ eyebrow: e.target.value })}
              />
              <Textarea
                label="H1"
                value={page.h1 || ''}
                onChange={(e) => patch({ h1: e.target.value })}
                rows={3}
              />
              <Textarea
                label="Subheadline"
                value={page.subheadline || ''}
                onChange={(e) => patch({ subheadline: e.target.value })}
                rows={3}
              />
            </div>
          </Section>

          <Section
            id="comercial"
            title="Texto comercial"
            description="Os 3 parágrafos que abrem o argumento do segmento."
          >
            <div className="grid gap-6 2xl:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <Textarea
                  key={i}
                  label={`Parágrafo ${i + 1}`}
                  value={(page.salesParagraphs || [])[i] || ''}
                  onChange={(e) => patchParagraph(i, e.target.value)}
                  rows={6}
                />
              ))}
            </div>
          </Section>

          <Section
            id="aplicacoes"
            title={`Aplicações (${applications.length})`}
            description="Grid de aplicações exibido na página."
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <Input
                label="Título da seção"
                value={page.applicationsTitle || ''}
                onChange={(e) => patch({ applicationsTitle: e.target.value })}
              />
              <Textarea
                label="Introdução"
                value={page.applicationsIntro || ''}
                onChange={(e) => patch({ applicationsIntro: e.target.value })}
                rows={2}
              />
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-2 2xl:grid-cols-3">
              {applications.map((app, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-gray-50/60 p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Aplicação {i + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeApplication(i)}
                      className="text-xs font-semibold text-red-600 hover:text-red-700"
                    >
                      Remover
                    </button>
                  </div>
                  <Input
                    label="Título"
                    value={app.title}
                    onChange={(e) => patchApplication(i, 'title', e.target.value)}
                  />
                  <Textarea
                    label="Descrição"
                    value={app.description}
                    onChange={(e) => patchApplication(i, 'description', e.target.value)}
                    rows={3}
                  />
                </div>
              ))}

              <button
                type="button"
                onClick={addApplication}
                className="flex min-h-[180px] items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-sm font-semibold text-gray-500 transition hover:border-primary-400 hover:text-primary-600"
              >
                + Adicionar aplicação
              </button>
            </div>
          </Section>

          <Section
            id="destaque"
            title="Destaque + navegador de ingredientes"
            description="Frase flutuante e o bloco que leva ao catálogo."
          >
            <div className="grid gap-6 lg:grid-cols-3">
              <Textarea
                label="Frase flutuante de destaque"
                value={page.floatingHighlight || ''}
                onChange={(e) => patch({ floatingHighlight: e.target.value })}
                rows={4}
              />
              <Input
                label="Título do navegador de ingredientes"
                value={page.ingredientExplorerHeadline || ''}
                onChange={(e) => patch({ ingredientExplorerHeadline: e.target.value })}
              />
              <Textarea
                label="Texto de apoio"
                value={page.ingredientExplorerSupportingText || ''}
                onChange={(e) => patch({ ingredientExplorerSupportingText: e.target.value })}
                rows={4}
              />
            </div>
          </Section>

          <Section
            id="formulario"
            title="Formulário do projeto"
            description="Bloco de conversão no fim da página."
          >
            <div className="grid gap-6 lg:grid-cols-2 2xl:grid-cols-3">
              <Input
                label="Eyebrow"
                value={page.formEyebrow || ''}
                onChange={(e) => patch({ formEyebrow: e.target.value })}
              />
              <Textarea
                label="Título"
                value={page.formTitle || ''}
                onChange={(e) => patch({ formTitle: e.target.value })}
                rows={2}
              />
              <Input
                label="Texto do botão"
                value={page.formCtaLabel || ''}
                onChange={(e) => patch({ formCtaLabel: e.target.value })}
              />
              <Textarea
                label="Descrição"
                value={page.formDescription || ''}
                onChange={(e) => patch({ formDescription: e.target.value })}
                rows={4}
              />
              <Textarea
                label="Proposta de valor"
                value={page.formValueProposition || ''}
                onChange={(e) => patch({ formValueProposition: e.target.value })}
                rows={4}
              />
              <Textarea
                label="Mensagem de sucesso"
                value={page.formSuccessMessage || ''}
                onChange={(e) => patch({ formSuccessMessage: e.target.value })}
                rows={4}
              />
            </div>

            <div className="mt-6">
              <Input
                label="Opções de 'principal desafio' (separadas por vírgula)"
                value={(page.formChallengeOptions || []).join(', ')}
                onChange={(e) =>
                  patch({
                    formChallengeOptions: e.target.value
                      .split(',')
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
              />
            </div>
          </Section>

          <Section id="seo" title="SEO" description="Metadados usados pelo buscador.">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-6">
                <Input
                  label="Título (SEO)"
                  value={page.seoTitle || ''}
                  onChange={(e) => patch({ seoTitle: e.target.value })}
                />
                <Input
                  label="Palavras-chave (separadas por vírgula)"
                  value={(page.seoKeywords || []).join(', ')}
                  onChange={(e) =>
                    patch({
                      seoKeywords: e.target.value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </div>
              <Textarea
                label="Descrição (SEO)"
                value={page.seoDescription || ''}
                onChange={(e) => patch({ seoDescription: e.target.value })}
                rows={6}
              />
            </div>
          </Section>

          <div className="flex items-center justify-between gap-6 rounded-xl border border-gray-200 bg-white px-8 py-6 shadow-sm">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={page.active}
                onChange={(e) => patch({ active: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-primary-600"
              />
              Página ativa
            </label>
            <Button type="button" variant="primary" loading={saving} onClick={save}>
              Salvar página
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
