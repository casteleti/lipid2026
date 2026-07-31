'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { Button } from '@/components/Button';
import { ImageUpload } from '@/components/ImageUpload';
import { api } from '@/lib/api-client';
import type { Criterion, Pillar, Technology, TechStatsRow } from '../types';

const SECTIONS = [
  { id: 'basico', label: 'Básico' },
  { id: 'hero', label: 'Hero' },
  { id: 'essencia', label: 'Essência técnica' },
  { id: 'imagens', label: 'Ilustrações' },
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
    <section id={id} className="scroll-mt-28 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="mb-8 border-b border-gray-100 pb-5">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        {description && <p className="mt-1.5 text-sm text-gray-500">{description}</p>}
      </div>
      {children}
    </section>
  );
}

export default function EditarTecnologiaPage() {
  const { id } = useParams<{ id: string }>();
  const [tech, setTech] = useState<Technology | null>(null);
  const [stat, setStat] = useState<TechStatsRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    Promise.all([
      api.get<Technology>(`/technologies/${id}`),
      api.get<TechStatsRow[]>('/page-views/summary/technologies').catch(() => [] as TechStatsRow[]),
    ])
      .then(([t, s]) => {
        setTech(t);
        setStat(s.find((row) => row.slug === t.slug) ?? null);
      })
      .catch(() => setError('Tecnologia não encontrada'))
      .finally(() => setLoading(false));
  }, [id]);

  const patch = (p: Partial<Technology>) => setTech((prev) => (prev ? { ...prev, ...p } : prev));

  const patchPillar = (index: number, field: keyof Pillar, value: string) =>
    setTech((prev) => {
      if (!prev) return prev;
      const pillars = [...(prev.pillars || [])];
      pillars[index] = { ...pillars[index], [field]: value };
      return { ...prev, pillars };
    });

  const patchCriterion = (index: number, field: keyof Criterion, value: string) =>
    setTech((prev) => {
      if (!prev) return prev;
      const criteria = [...(prev.criteria || [])];
      criteria[index] = { ...criteria[index], [field]: value };
      return { ...prev, criteria };
    });

  const save = async () => {
    if (!tech) return;
    setSaving(true);
    setMessage('');
    setError('');
    try {
      // Payload explícito: id/slug/createdAt/updatedAt e as relações vêm no GET mas são
      // rejeitados pelo DTO do PUT (whitelist estrita).
      const updated = await api.put<Technology>(`/technologies/${tech.id}`, {
        name: tech.name,
        description: tech.description,
        excerpt: tech.excerpt || undefined,
        icon: tech.icon || undefined,
        active: tech.active,
        eyebrow: tech.eyebrow || undefined,
        h1: tech.h1 || undefined,
        subheadline: tech.subheadline || undefined,
        heroCtaLabel: tech.heroCtaLabel || undefined,
        imageOneUrl: tech.imageOneUrl || undefined,
        imageOneAlt: tech.imageOneAlt || undefined,
        imageOneCaption: tech.imageOneCaption || undefined,
        imageTwoUrl: tech.imageTwoUrl || undefined,
        imageTwoAlt: tech.imageTwoAlt || undefined,
        imageTwoCaption: tech.imageTwoCaption || undefined,
        essenceTitle: tech.essenceTitle || undefined,
        essenceIntro: tech.essenceIntro || undefined,
        pillars: tech.pillars || undefined,
        criteriaTitle: tech.criteriaTitle || undefined,
        criteria: tech.criteria || undefined,
        authorityStatement: tech.authorityStatement || undefined,
        formEyebrow: tech.formEyebrow || undefined,
        formTitle: tech.formTitle || undefined,
        formDescription: tech.formDescription || undefined,
        formValueProposition: tech.formValueProposition || undefined,
        formCtaLabel: tech.formCtaLabel || undefined,
        formSuccessMessage: tech.formSuccessMessage || undefined,
        formChallengeOptions: tech.formChallengeOptions || undefined,
        seoTitle: tech.seoTitle || undefined,
        seoDescription: tech.seoDescription || undefined,
        seoKeywords: tech.seoKeywords || undefined,
      });
      setTech((prev) => (prev ? { ...prev, ...updated } : updated));
      setMessage('Alterações salvas.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível salvar');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-sm text-gray-500">Carregando...</p>;
  if (!tech)
    return (
      <div className="space-y-4">
        <p className="text-sm text-red-600">{error || 'Tecnologia não encontrada.'}</p>
        <Link href="/tecnologias" className="text-sm font-semibold text-primary-600">
          ← Voltar para as tecnologias
        </Link>
      </div>
    );

  const pillars = tech.pillars || [];
  const criteria = tech.criteria || [];

  return (
    <div className="mx-auto max-w-[1600px] pb-16">
      <header className="sticky -top-8 z-10 -mx-8 -mt-8 mb-10 border-b border-gray-200 bg-gray-50 px-8 pb-5 pt-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="min-w-0">
            <Link
              href="/tecnologias"
              className="text-xs font-semibold uppercase tracking-wide text-gray-500 hover:text-primary-600"
            >
              ← Tecnologias
            </Link>
            <h1 className="mt-1.5 truncate text-2xl font-bold text-gray-900">
              /tecnologias/{tech.slug}
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
                  checked={tech.active}
                  onChange={(e) => patch({ active: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600"
                />
                Página ativa
              </label>
            </div>
          </div>
        </nav>

        <div className="space-y-10">
          <Section
            id="basico"
            title="Básico"
            description="Nome e resumo usados em listagens, menu e páginas relacionadas."
          >
            <div className="grid gap-6 lg:grid-cols-3">
              <Input
                label="Nome"
                value={tech.name}
                onChange={(e) => patch({ name: e.target.value })}
                hint="Alterar o nome muda o slug e, com ele, a URL da página."
              />
              <Textarea
                label="Resumo (listagens)"
                value={tech.excerpt || ''}
                onChange={(e) => patch({ excerpt: e.target.value })}
                rows={3}
              />
              <Textarea
                label="Descrição interna"
                value={tech.description}
                onChange={(e) => patch({ description: e.target.value })}
                rows={3}
              />
            </div>
          </Section>

          <Section id="hero" title="Hero" description="Primeira dobra da landing page.">
            <div className="grid gap-6 2xl:grid-cols-4">
              <Input
                label="Eyebrow"
                value={tech.eyebrow || ''}
                onChange={(e) => patch({ eyebrow: e.target.value })}
              />
              <Textarea
                label="H1"
                value={tech.h1 || ''}
                onChange={(e) => patch({ h1: e.target.value })}
                rows={3}
              />
              <Textarea
                label="Subheadline"
                value={tech.subheadline || ''}
                onChange={(e) => patch({ subheadline: e.target.value })}
                rows={3}
              />
              <Input
                label="Texto do botão"
                value={tech.heroCtaLabel || ''}
                onChange={(e) => patch({ heroCtaLabel: e.target.value })}
              />
            </div>
          </Section>

          <Section
            id="essencia"
            title="Essência técnica"
            description="Segunda dobra: o argumento de domínio — pilares, critérios e a frase de autoridade."
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <Input
                label="Título da seção"
                value={tech.essenceTitle || ''}
                onChange={(e) => patch({ essenceTitle: e.target.value })}
              />
              <Textarea
                label="Introdução"
                value={tech.essenceIntro || ''}
                onChange={(e) => patch({ essenceIntro: e.target.value })}
                rows={3}
              />
            </div>

            <p className="mb-4 mt-10 text-sm font-bold text-gray-900">Pilares ({pillars.length})</p>
            <div className="grid gap-5 lg:grid-cols-2">
              {pillars.map((pilar, i) => (
                <div key={i} className="space-y-4 rounded-lg border border-gray-200 bg-gray-50/60 p-5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Pilar {i + 1}
                  </span>
                  <Input
                    label="Título"
                    value={pilar.title}
                    onChange={(e) => patchPillar(i, 'title', e.target.value)}
                  />
                  <Textarea
                    label="Descrição"
                    value={pilar.description}
                    onChange={(e) => patchPillar(i, 'description', e.target.value)}
                    rows={4}
                  />
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <Input
                label="Título da lista de critérios"
                value={tech.criteriaTitle || ''}
                onChange={(e) => patch({ criteriaTitle: e.target.value })}
              />
              <Textarea
                label="Frase de autoridade"
                value={tech.authorityStatement || ''}
                onChange={(e) => patch({ authorityStatement: e.target.value })}
                rows={3}
              />
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {criteria.map((item, i) => (
                <div key={i} className="space-y-4 rounded-lg border border-gray-200 bg-gray-50/60 p-5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Critério {i + 1}
                  </span>
                  <Input
                    label="Rótulo"
                    value={item.label}
                    onChange={(e) => patchCriterion(i, 'label', e.target.value)}
                  />
                  <Textarea
                    label="Descrição"
                    value={item.description}
                    onChange={(e) => patchCriterion(i, 'description', e.target.value)}
                    rows={3}
                  />
                </div>
              ))}
            </div>
          </Section>

          <Section
            id="imagens"
            title="Ilustrações"
            description="Imagem 1 no hero, imagem 2 ao lado dos critérios. Enviar um arquivo substitui a ilustração padrão."
          >
            <div className="grid gap-10 lg:grid-cols-2">
              {[1, 2].map((n) => {
                const url = n === 1 ? tech.imageOneUrl : tech.imageTwoUrl;
                const alt = n === 1 ? tech.imageOneAlt : tech.imageTwoAlt;
                const caption = n === 1 ? tech.imageOneCaption : tech.imageTwoCaption;
                return (
                  <div key={n} className="space-y-4">
                    <ImageUpload
                      label={`Imagem ${n}`}
                      value={url || ''}
                      onChange={(v) => patch(n === 1 ? { imageOneUrl: v } : { imageTwoUrl: v })}
                    />
                    <Input
                      label="Texto alternativo (acessibilidade)"
                      value={alt || ''}
                      onChange={(e) =>
                        patch(n === 1 ? { imageOneAlt: e.target.value } : { imageTwoAlt: e.target.value })
                      }
                    />
                    <Textarea
                      label="Legenda"
                      value={caption || ''}
                      onChange={(e) =>
                        patch(
                          n === 1
                            ? { imageOneCaption: e.target.value }
                            : { imageTwoCaption: e.target.value },
                        )
                      }
                      rows={2}
                    />
                  </div>
                );
              })}
            </div>
          </Section>

          <Section
            id="formulario"
            title="Formulário"
            description="Terceira dobra. Cada envio é contado como conversão desta página."
          >
            <div className="grid gap-6 lg:grid-cols-2 2xl:grid-cols-3">
              <Input
                label="Eyebrow"
                value={tech.formEyebrow || ''}
                onChange={(e) => patch({ formEyebrow: e.target.value })}
              />
              <Textarea
                label="Título"
                value={tech.formTitle || ''}
                onChange={(e) => patch({ formTitle: e.target.value })}
                rows={2}
              />
              <Input
                label="Texto do botão"
                value={tech.formCtaLabel || ''}
                onChange={(e) => patch({ formCtaLabel: e.target.value })}
              />
              <Textarea
                label="Descrição"
                value={tech.formDescription || ''}
                onChange={(e) => patch({ formDescription: e.target.value })}
                rows={4}
              />
              <Textarea
                label="Proposta de valor"
                value={tech.formValueProposition || ''}
                onChange={(e) => patch({ formValueProposition: e.target.value })}
                rows={4}
              />
              <Textarea
                label="Mensagem de sucesso"
                value={tech.formSuccessMessage || ''}
                onChange={(e) => patch({ formSuccessMessage: e.target.value })}
                rows={4}
              />
            </div>

            <div className="mt-6">
              <Input
                label="Opções de 'principal desafio' (separadas por vírgula)"
                value={(tech.formChallengeOptions || []).join(', ')}
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
                  value={tech.seoTitle || ''}
                  onChange={(e) => patch({ seoTitle: e.target.value })}
                  hint="Sem a marca no fim — o site já adiciona “| Lipid Ingredients”."
                />
                <Input
                  label="Palavras-chave (separadas por vírgula)"
                  value={(tech.seoKeywords || []).join(', ')}
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
                value={tech.seoDescription || ''}
                onChange={(e) => patch({ seoDescription: e.target.value })}
                rows={6}
              />
            </div>
          </Section>

          <div className="flex items-center justify-between gap-6 rounded-xl border border-gray-200 bg-white px-8 py-6 shadow-sm">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={tech.active}
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
