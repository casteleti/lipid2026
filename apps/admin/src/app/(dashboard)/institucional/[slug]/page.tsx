'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { Button } from '@/components/Button';
import { ImageUpload } from '@/components/ImageUpload';
import { api } from '@/lib/api-client';
import type { Section, SectionItem } from '../types';

const SECTIONS = [
  { id: 'conteudo', label: 'Conteúdo' },
  { id: 'botoes', label: 'Botões' },
  { id: 'imagem', label: 'Imagem' },
  { id: 'itens', label: 'Itens' },
];

function Bloco({
  id,
  title,
  description,
  action,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="mb-8 flex items-start justify-between gap-6 border-b border-gray-100 pb-5">
        <div>
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          {description && <p className="mt-1.5 text-sm text-gray-500">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export default function EditarSecaoInstitucionalPage() {
  const { slug } = useParams<{ slug: string }>();
  const [section, setSection] = useState<Section | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingItem, setSavingItem] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;
    // A API lista todas as seções em uma chamada só (são ~11) e não tem busca por slug;
    // filtrar aqui evita um endpoint novo só para esta tela.
    api
      .get<Section[]>('/institutional-sections')
      .then((todas) => {
        const encontrada = todas.find((s) => s.slug === slug);
        if (!encontrada) setError('Seção não encontrada');
        else setSection(encontrada);
      })
      .catch(() => setError('Não foi possível carregar a seção'))
      .finally(() => setLoading(false));
  }, [slug]);

  const patch = (p: Partial<Section>) => setSection((prev) => (prev ? { ...prev, ...p } : prev));

  const patchItem = (itemId: string, p: Partial<SectionItem>) =>
    setSection((prev) =>
      prev
        ? { ...prev, items: prev.items.map((it) => (it.id === itemId ? { ...it, ...p } : it)) }
        : prev,
    );

  const salvarSecao = async () => {
    if (!section) return;
    setSaving(true);
    setMessage('');
    setError('');
    try {
      // Payload explícito: o GET traz createdAt/updatedAt/relações que o DTO do PUT
      // rejeita (whitelist estrita) — espalhar o objeto inteiro devolve 400.
      const atualizada = await api.put<Section>(`/institutional-sections/${section.id}`, {
        order: section.order,
        active: section.active,
        eyebrow: section.eyebrow,
        title: section.title,
        subtitle: section.subtitle,
        body: section.body,
        highlight: section.highlight,
        quote: section.quote,
        ctaLabel: section.ctaLabel,
        ctaHref: section.ctaHref,
        secondaryCtaLabel: section.secondaryCtaLabel,
        secondaryCtaHref: section.secondaryCtaHref,
        imageHint: section.imageHint,
        imageUrl: section.imageUrl,
      });
      setSection((prev) => (prev ? { ...prev, ...atualizada } : prev));
      setMessage('Alterações salvas.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível salvar');
    } finally {
      setSaving(false);
    }
  };

  const salvarItem = async (item: SectionItem) => {
    setSavingItem(item.id);
    setMessage('');
    setError('');
    try {
      const atualizado = await api.put<SectionItem>(
        `/institutional-sections/items/${item.id}`,
        {
          order: item.order,
          active: item.active,
          icon: item.icon,
          title: item.title,
          subtitle: item.subtitle,
          text: item.text,
          value: item.value,
          linkLabel: item.linkLabel,
          linkHref: item.linkHref,
          imageHint: item.imageHint,
          imageUrl: item.imageUrl,
        },
      );
      patchItem(item.id, atualizado);
      setMessage('Item salvo.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível salvar o item');
    } finally {
      setSavingItem(null);
    }
  };

  const adicionarItem = async () => {
    if (!section) return;
    setSavingItem('new');
    setError('');
    try {
      const criado = await api.post<SectionItem>(
        `/institutional-sections/${section.id}/items`,
        { order: section.items.length },
      );
      patch({ items: [...section.items, criado] });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível adicionar o item');
    } finally {
      setSavingItem(null);
    }
  };

  const removerItem = async (itemId: string) => {
    if (!section) return;
    if (!confirm('Remover este item? Essa ação não pode ser desfeita.')) return;
    setSavingItem(itemId);
    setError('');
    try {
      await api.delete(`/institutional-sections/items/${itemId}`);
      patch({ items: section.items.filter((it) => it.id !== itemId) });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível remover o item');
    } finally {
      setSavingItem(null);
    }
  };

  if (loading) return <p className="text-sm text-gray-500">Carregando...</p>;
  if (!section)
    return (
      <div className="space-y-4">
        <p className="text-sm text-red-600">{error || 'Seção não encontrada.'}</p>
        <Link href="/institucional" className="text-sm font-semibold text-primary-600">
          ← Voltar para a página institucional
        </Link>
      </div>
    );

  return (
    <div className="mx-auto max-w-[1600px] pb-16">
      <header className="sticky -top-8 z-10 -mx-8 -mt-8 mb-10 border-b border-gray-200 bg-gray-50 px-8 pb-5 pt-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="min-w-0">
            <Link
              href="/institucional"
              className="text-xs font-semibold uppercase tracking-wide text-gray-500 hover:text-primary-600"
            >
              ← Página Institucional
            </Link>
            <h1 className="mt-1.5 truncate text-2xl font-bold text-gray-900">
              #{section.order} · {section.slug}
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-700">
              {section.type}
            </span>
            {message && <span className="text-sm font-semibold text-primary-700">{message}</span>}
            {error && <span className="text-sm font-semibold text-red-600">{error}</span>}
            <Button type="button" variant="primary" loading={saving} onClick={salvarSecao}>
              Salvar seção
            </Button>
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
                  checked={section.active}
                  onChange={(e) => patch({ active: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600"
                />
                Aparece no site
              </label>
            </div>
          </div>
        </nav>

        <div className="space-y-10">
          <Bloco
            id="conteudo"
            title="Conteúdo"
            description="Nem toda seção usa todos os campos — o que ficar vazio simplesmente não é renderizado."
          >
            <div className="grid gap-6 2xl:grid-cols-3">
              <Input
                label="Eyebrow (rótulo pequeno acima do título)"
                value={section.eyebrow || ''}
                onChange={(e) => patch({ eyebrow: e.target.value })}
              />
              <Textarea
                label="Título"
                value={section.title || ''}
                onChange={(e) => patch({ title: e.target.value })}
                rows={3}
              />
              <Textarea
                label="Subtítulo / introdução"
                value={section.subtitle || ''}
                onChange={(e) => patch({ subtitle: e.target.value })}
                rows={3}
              />
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <Textarea
                label="Corpo de texto (separe parágrafos com linha em branco)"
                value={section.body || ''}
                onChange={(e) => patch({ body: e.target.value })}
                rows={8}
              />
              <div className="space-y-6">
                <Textarea
                  label="Frase de destaque (highlight)"
                  value={section.highlight || ''}
                  onChange={(e) => patch({ highlight: e.target.value })}
                  rows={3}
                />
                <Textarea
                  label="Citação (quote)"
                  value={section.quote || ''}
                  onChange={(e) => patch({ quote: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          </Bloco>

          <Bloco id="botoes" title="Botões" description="Deixe em branco para não exibir o botão.">
            <div className="grid gap-6 lg:grid-cols-2 2xl:grid-cols-4">
              <Input
                label="Botão principal — texto"
                value={section.ctaLabel || ''}
                onChange={(e) => patch({ ctaLabel: e.target.value })}
              />
              <Input
                label="Botão principal — link"
                value={section.ctaHref || ''}
                onChange={(e) => patch({ ctaHref: e.target.value })}
              />
              <Input
                label="Botão secundário — texto"
                value={section.secondaryCtaLabel || ''}
                onChange={(e) => patch({ secondaryCtaLabel: e.target.value })}
              />
              <Input
                label="Botão secundário — link"
                value={section.secondaryCtaHref || ''}
                onChange={(e) => patch({ secondaryCtaHref: e.target.value })}
              />
            </div>
          </Bloco>

          <Bloco
            id="imagem"
            title="Imagem"
            description="Enquanto não houver imagem, o site mostra a área tracejada com a descrição abaixo."
          >
            <div className="grid gap-8 lg:grid-cols-2">
              <ImageUpload
                label="Imagem do bloco"
                value={section.imageUrl || ''}
                onChange={(url) => patch({ imageUrl: url })}
              />
              <Textarea
                label="O que deve ter nessa imagem"
                value={section.imageHint || ''}
                onChange={(e) => patch({ imageHint: e.target.value })}
                rows={4}
              />
            </div>
          </Bloco>

          <Bloco
            id="itens"
            title={`Itens (${section.items.length})`}
            description="Fatos, passos, cards ou pilares repetíveis desta seção. Cada item salva por conta própria."
            action={
              <Button
                type="button"
                variant="secondary"
                size="sm"
                loading={savingItem === 'new'}
                onClick={adicionarItem}
              >
                + Adicionar item
              </Button>
            }
          >
            {section.items.length === 0 ? (
              <p className="text-sm text-gray-500">Esta seção não usa itens repetíveis.</p>
            ) : (
              <div className="grid gap-6 2xl:grid-cols-2">
                {section.items.map((item, i) => (
                  <div
                    key={item.id}
                    className="space-y-5 rounded-lg border border-gray-200 bg-gray-50/60 p-6"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Item {i + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removerItem(item.id)}
                        disabled={savingItem === item.id}
                        className="text-xs font-semibold text-red-600 hover:text-red-700 disabled:opacity-40"
                      >
                        Remover
                      </button>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <Input
                        label="Ordem"
                        type="number"
                        value={item.order}
                        onChange={(e) => patchItem(item.id, { order: Number(e.target.value) })}
                      />
                      <Input
                        label="Ícone (opcional)"
                        value={item.icon || ''}
                        onChange={(e) => patchItem(item.id, { icon: e.target.value })}
                      />
                      <Input
                        label="Valor (nº, ano...)"
                        value={item.value || ''}
                        onChange={(e) => patchItem(item.id, { value: e.target.value })}
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                        label="Título"
                        value={item.title || ''}
                        onChange={(e) => patchItem(item.id, { title: e.target.value })}
                      />
                      <Input
                        label="Subtítulo"
                        value={item.subtitle || ''}
                        onChange={(e) => patchItem(item.id, { subtitle: e.target.value })}
                      />
                    </div>

                    <Textarea
                      label="Texto"
                      value={item.text || ''}
                      onChange={(e) => patchItem(item.id, { text: e.target.value })}
                      rows={3}
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                        label="Link — texto"
                        value={item.linkLabel || ''}
                        onChange={(e) => patchItem(item.id, { linkLabel: e.target.value })}
                      />
                      <Input
                        label="Link — endereço"
                        value={item.linkHref || ''}
                        onChange={(e) => patchItem(item.id, { linkHref: e.target.value })}
                      />
                    </div>

                    <ImageUpload
                      label="Imagem do item"
                      value={item.imageUrl || ''}
                      onChange={(url) => patchItem(item.id, { imageUrl: url })}
                    />
                    <Textarea
                      label="O que deve ter na imagem deste item"
                      value={item.imageHint || ''}
                      onChange={(e) => patchItem(item.id, { imageHint: e.target.value })}
                      rows={2}
                    />

                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      loading={savingItem === item.id}
                      onClick={() => salvarItem(item)}
                    >
                      Salvar item
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Bloco>

          <div className="flex items-center justify-between gap-6 rounded-xl border border-gray-200 bg-white px-8 py-6 shadow-sm">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={section.active}
                onChange={(e) => patch({ active: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-primary-600"
              />
              Aparece no site
            </label>
            <Button type="button" variant="primary" loading={saving} onClick={salvarSecao}>
              Salvar seção
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
