'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { Button } from '@/components/Button';
import { RepeatableList } from '@/components/RepeatableList';
import { api } from '@/lib/api-client';

interface InstitutionalPageData {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  heroCtaPrimaryLabel: string;
  heroCtaPrimaryHref: string;
  heroCtaSecondaryLabel: string;
  heroCtaSecondaryHref: string;
  quemSomosIntro: string;
  comoAjudamosCta: string;
  parceriaText: string;
  qualidadeText: string;
  historiaText: string;
  ctaFinalHeading: string;
  ctaFinalText: string;
  ctaFinalPrimaryLabel: string;
  ctaFinalPrimaryHref: string;
  ctaFinalSecondaryLabel: string;
  ctaFinalSecondaryHref: string;
}

const EMPTY_PAGE: InstitutionalPageData = {
  heroEyebrow: '',
  heroTitle: '',
  heroDescription: '',
  heroImage: '',
  heroCtaPrimaryLabel: '',
  heroCtaPrimaryHref: '',
  heroCtaSecondaryLabel: '',
  heroCtaSecondaryHref: '',
  quemSomosIntro: '',
  comoAjudamosCta: '',
  parceriaText: '',
  qualidadeText: '',
  historiaText: '',
  ctaFinalHeading: '',
  ctaFinalText: '',
  ctaFinalPrimaryLabel: '',
  ctaFinalPrimaryHref: '',
  ctaFinalSecondaryLabel: '',
  ctaFinalSecondaryHref: '',
};

const TABS = [
  { id: 'hero', label: 'Hero' },
  { id: 'quem-somos', label: 'Quem somos' },
  { id: 'como-ajudamos', label: 'Como ajudamos' },
  { id: 'parceria', label: 'Parceria' },
  { id: 'qualidade', label: 'Qualidade' },
  { id: 'metricas', label: 'Métricas' },
  { id: 'historia', label: 'História & Princípios' },
  { id: 'faq', label: 'FAQ' },
  { id: 'cta-final', label: 'CTA final' },
  { id: 'seo', label: 'SEO' },
] as const;

type TabId = (typeof TABS)[number]['id'];

const TEXT_TABS: TabId[] = [
  'hero',
  'quem-somos',
  'como-ajudamos',
  'parceria',
  'qualidade',
  'historia',
  'cta-final',
];

interface SeoPageData {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
}

const EMPTY_SEO: SeoPageData = { title: '', description: '', keywords: '', ogImage: '' };

export default function InstitucionalPage() {
  const [tab, setTab] = useState<TabId>('hero');
  const [page, setPage] = useState<InstitutionalPageData>(EMPTY_PAGE);
  const [seo, setSeo] = useState<SeoPageData>(EMPTY_SEO);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [savedMessage, setSavedMessage] = useState('');

  useEffect(() => {
    Promise.all([
      api.get<Partial<InstitutionalPageData>>('/institutional-page'),
      api.get<Partial<SeoPageData> | null>('/seo-pages?route=%2Fsobre'),
    ])
      .then(([pageData, seoData]) => {
        const pageOnly = pageData
          ? (Object.fromEntries(
              Object.keys(EMPTY_PAGE).map((key) => [key, pageData[key as keyof InstitutionalPageData]]),
            ) as Partial<InstitutionalPageData>)
          : {};
        setPage((prev) => ({ ...prev, ...stripNulls(pageOnly) }));
        if (seoData) setSeo((prev) => ({ ...prev, ...stripNulls(seoData) }));
      })
      .catch(() => setError('Não foi possível carregar o conteúdo da página institucional'))
      .finally(() => setLoading(false));
  }, []);

  const updatePage = (key: keyof InstitutionalPageData, value: string) => {
    setPage((prev) => ({ ...prev, [key]: value }));
    setSavedMessage('');
  };

  const updateSeo = (key: keyof SeoPageData, value: string) => {
    setSeo((prev) => ({ ...prev, [key]: value }));
    setSavedMessage('');
  };

  const handleSavePage = async () => {
    setSaving(true);
    setError('');
    setSavedMessage('');
    try {
      await api.put('/institutional-page', toUndefinedIfEmpty(page));
      setSavedMessage('Salvo com sucesso.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível salvar');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSeo = async () => {
    setSaving(true);
    setError('');
    setSavedMessage('');
    try {
      await api.put('/seo-pages?route=%2Fsobre', toUndefinedIfEmpty(seo));
      setSavedMessage('Salvo com sucesso.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível salvar');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-gray-500">Carregando...</p>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Página Institucional</h1>
        <p className="mt-1 text-sm text-gray-500">
          Conteúdo exibido em <code>/sobre</code> no site.
        </p>
      </div>

      <div className="mb-6 rounded-lg border border-primary-100 bg-primary-50 p-4 text-sm text-gray-700">
        Mercados atendidos, Competências e tecnologias e Parceiros globais usam os cadastros já
        existentes — edite por lá:
        <div className="mt-2 flex flex-wrap gap-4">
          <Link href="/aplicacoes" className="font-semibold text-primary-700 hover:underline">
            Aplicações (Mercados) →
          </Link>
          <Link href="/tecnologias" className="font-semibold text-primary-700 hover:underline">
            Tecnologias (Competências) →
          </Link>
          <Link href="/parceiros" className="font-semibold text-primary-700 hover:underline">
            Parceiros (Lipoid, Readline...) →
          </Link>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2 border-b border-gray-200 pb-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
              tab === t.id
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {error && <p className="mb-4 text-sm font-semibold text-red-600">{error}</p>}
      {savedMessage && <p className="mb-4 text-sm font-semibold text-green-700">{savedMessage}</p>}

      <Card>
        {tab === 'hero' && (
          <div className="max-w-2xl space-y-5">
            <Input
              label="Eyebrow"
              value={page.heroEyebrow}
              onChange={(e) => updatePage('heroEyebrow', e.target.value)}
            />
            <Input
              label="Título (H1)"
              value={page.heroTitle}
              onChange={(e) => updatePage('heroTitle', e.target.value)}
            />
            <Textarea
              label="Descrição"
              value={page.heroDescription}
              onChange={(e) => updatePage('heroDescription', e.target.value)}
              rows={4}
            />
            <Input
              label="Imagem do hero (URL)"
              hint="Opcional"
              value={page.heroImage}
              onChange={(e) => updatePage('heroImage', e.target.value)}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="CTA primário — texto"
                value={page.heroCtaPrimaryLabel}
                onChange={(e) => updatePage('heroCtaPrimaryLabel', e.target.value)}
              />
              <Input
                label="CTA primário — link"
                value={page.heroCtaPrimaryHref}
                onChange={(e) => updatePage('heroCtaPrimaryHref', e.target.value)}
              />
              <Input
                label="CTA secundário — texto"
                value={page.heroCtaSecondaryLabel}
                onChange={(e) => updatePage('heroCtaSecondaryLabel', e.target.value)}
              />
              <Input
                label="CTA secundário — link"
                value={page.heroCtaSecondaryHref}
                onChange={(e) => updatePage('heroCtaSecondaryHref', e.target.value)}
              />
            </div>
          </div>
        )}

        {tab === 'quem-somos' && (
          <div className="max-w-2xl space-y-5">
            <Textarea
              label="Texto de introdução"
              value={page.quemSomosIntro}
              onChange={(e) => updatePage('quemSomosIntro', e.target.value)}
              rows={6}
            />
            <div>
              <p className="mb-3 text-sm font-semibold text-gray-900">Fatos objetivos</p>
              <RepeatableList
                section="FACT"
                addLabel="+ Adicionar fato"
                emptyText="Nenhum fato cadastrado ainda."
                fields={[
                  { key: 'icon', label: 'Ícone', kind: 'icon-select' },
                  { key: 'title', label: 'Rótulo', kind: 'text', placeholder: 'ex: Atuação B2B' },
                ]}
              />
            </div>
          </div>
        )}

        {tab === 'como-ajudamos' && (
          <div className="max-w-2xl space-y-5">
            <Textarea
              label="Texto do CTA contextual"
              value={page.comoAjudamosCta}
              onChange={(e) => updatePage('comoAjudamosCta', e.target.value)}
              rows={3}
            />
            <div>
              <p className="mb-3 text-sm font-semibold text-gray-900">Passos (Entender/Selecionar/Desenvolver/Escalar)</p>
              <RepeatableList
                section="PROCESS_STEP"
                addLabel="+ Adicionar passo"
                emptyText="Nenhum passo cadastrado ainda."
                fields={[
                  { key: 'icon', label: 'Ícone', kind: 'icon-select' },
                  { key: 'title', label: 'Título', kind: 'text' },
                  { key: 'description', label: 'Descrição', kind: 'textarea' },
                ]}
              />
            </div>
          </div>
        )}

        {tab === 'parceria' && (
          <div className="max-w-2xl space-y-5">
            <p className="text-sm text-gray-500">
              O diagrama (Cliente ↔ Lipid ↔ Fabricantes) é fixo no site — aqui você edita só o
              texto explicativo.
            </p>
            <Textarea
              label="Texto explicativo"
              value={page.parceriaText}
              onChange={(e) => updatePage('parceriaText', e.target.value)}
              rows={6}
            />
          </div>
        )}

        {tab === 'qualidade' && (
          <div className="max-w-2xl space-y-5">
            <Textarea
              label="Texto principal"
              value={page.qualidadeText}
              onChange={(e) => updatePage('qualidadeText', e.target.value)}
              rows={6}
            />
            <div>
              <p className="mb-3 text-sm font-semibold text-gray-900">Itens de confiança (bullets)</p>
              <RepeatableList
                section="QUALITY_ITEM"
                addLabel="+ Adicionar item"
                emptyText="Nenhum item cadastrado ainda."
                fields={[{ key: 'title', label: 'Item', kind: 'text', placeholder: 'ex: Procedência' }]}
              />
            </div>
          </div>
        )}

        {tab === 'metricas' && (
          <div className="max-w-2xl">
            <p className="mb-3 text-sm text-gray-500">
              Cards de métrica com valor + rótulo, preenchidos manualmente (sem contador
              automático).
            </p>
            <RepeatableList
              section="METRIC"
              addLabel="+ Adicionar métrica"
              emptyText="Nenhuma métrica cadastrada ainda."
              fields={[
                { key: 'value', label: 'Valor', kind: 'text', placeholder: 'ex: 2006' },
                { key: 'title', label: 'Rótulo', kind: 'text', placeholder: 'ex: Desde' },
              ]}
            />
          </div>
        )}

        {tab === 'historia' && (
          <div className="max-w-2xl space-y-5">
            <Textarea
              label="Narrativa (2-4 parágrafos)"
              value={page.historiaText}
              onChange={(e) => updatePage('historiaText', e.target.value)}
              rows={8}
            />
            <div>
              <p className="mb-3 text-sm font-semibold text-gray-900">Princípios</p>
              <RepeatableList
                section="PRINCIPLE"
                addLabel="+ Adicionar princípio"
                emptyText="Nenhum princípio cadastrado ainda."
                fields={[
                  { key: 'icon', label: 'Ícone', kind: 'icon-select' },
                  { key: 'title', label: 'Título', kind: 'text' },
                  { key: 'description', label: 'Descrição', kind: 'textarea' },
                ]}
              />
            </div>
          </div>
        )}

        {tab === 'faq' && (
          <div className="max-w-2xl">
            <RepeatableList
              section="FAQ"
              addLabel="+ Adicionar pergunta"
              emptyText="Nenhuma pergunta cadastrada ainda."
              fields={[
                { key: 'title', label: 'Pergunta', kind: 'text' },
                { key: 'description', label: 'Resposta', kind: 'textarea' },
              ]}
            />
          </div>
        )}

        {tab === 'cta-final' && (
          <div className="max-w-2xl space-y-5">
            <Input
              label="Título"
              value={page.ctaFinalHeading}
              onChange={(e) => updatePage('ctaFinalHeading', e.target.value)}
            />
            <Textarea
              label="Texto"
              value={page.ctaFinalText}
              onChange={(e) => updatePage('ctaFinalText', e.target.value)}
              rows={3}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Botão primário — texto"
                value={page.ctaFinalPrimaryLabel}
                onChange={(e) => updatePage('ctaFinalPrimaryLabel', e.target.value)}
              />
              <Input
                label="Botão primário — link"
                value={page.ctaFinalPrimaryHref}
                onChange={(e) => updatePage('ctaFinalPrimaryHref', e.target.value)}
              />
              <Input
                label="Botão secundário — texto"
                value={page.ctaFinalSecondaryLabel}
                onChange={(e) => updatePage('ctaFinalSecondaryLabel', e.target.value)}
              />
              <Input
                label="Botão secundário — link"
                value={page.ctaFinalSecondaryHref}
                onChange={(e) => updatePage('ctaFinalSecondaryHref', e.target.value)}
              />
            </div>
          </div>
        )}

        {tab === 'seo' && (
          <div className="max-w-2xl space-y-5">
            <Input
              label="Title"
              hint="Recomendado até 70 caracteres"
              value={seo.title}
              onChange={(e) => updateSeo('title', e.target.value)}
              maxLength={70}
            />
            <Textarea
              label="Meta description"
              hint="Recomendado até 200 caracteres"
              value={seo.description}
              onChange={(e) => updateSeo('description', e.target.value)}
              rows={3}
              maxLength={200}
            />
            <Input
              label="Keywords"
              hint="Opcional"
              value={seo.keywords}
              onChange={(e) => updateSeo('keywords', e.target.value)}
            />
            <Input
              label="Imagem Open Graph (URL)"
              hint="Opcional"
              value={seo.ogImage}
              onChange={(e) => updateSeo('ogImage', e.target.value)}
            />
          </div>
        )}

        {TEXT_TABS.includes(tab) && (
          <div className="mt-6">
            <Button variant="primary" loading={saving} onClick={handleSavePage}>
              Salvar
            </Button>
          </div>
        )}

        {tab === 'seo' && (
          <div className="mt-6">
            <Button variant="primary" loading={saving} onClick={handleSaveSeo}>
              Salvar
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

function stripNulls<T extends object>(obj: T | null | undefined): Partial<T> {
  if (!obj) return {};
  const result: Partial<T> = {};
  (Object.keys(obj) as (keyof T)[]).forEach((key) => {
    const value = obj[key];
    if (value !== null && value !== undefined) {
      result[key] = value;
    }
  });
  return result;
}

function toUndefinedIfEmpty<T extends object>(obj: T): { [K in keyof T]: T[K] | undefined } {
  const result = {} as { [K in keyof T]: T[K] | undefined };
  (Object.keys(obj) as (keyof T)[]).forEach((key) => {
    const value = obj[key];
    result[key] = value === '' ? undefined : value;
  });
  return result;
}
