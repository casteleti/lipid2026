'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { Button } from '@/components/Button';
import { ImageUpload } from '@/components/ImageUpload';
import { CheckboxGroup } from '@/components/CheckboxGroup';
import { RichTextEditor } from '@/components/RichTextEditor';
import { SummaryPointsEditor, type SummaryPoint } from '@/components/SummaryPointsEditor';
import { FaqEditor, type FaqItem } from '@/components/FaqEditor';
import { MaterialUpload, type MaterialFile } from '@/components/MaterialUpload';
import { api } from '@/lib/api-client';

interface Category {
  id: string;
  name: string;
}

export type ContentTipo = 'ARTIGO' | 'DOWNLOAD';

export interface ContentFormValues {
  type: ContentTipo;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  featured: string;
  featuredAlt: string;
  status: 'DRAFT' | 'PUBLISHED';
  seoTitle: string;
  seoDescription: string;
  categoryIds: string[];
  summaryPoints: SummaryPoint[];
  faqs: FaqItem[];
  files: MaterialFile[];
}

export const VALORES_INICIAIS: ContentFormValues = {
  type: 'ARTIGO',
  title: '',
  excerpt: '',
  content: '',
  author: '',
  featured: '',
  featuredAlt: '',
  status: 'DRAFT',
  seoTitle: '',
  seoDescription: '',
  categoryIds: [],
  summaryPoints: [],
  faqs: [],
  files: [],
};

interface ContentFormProps {
  valores: ContentFormValues;
  onChange: (valores: ContentFormValues) => void;
  onSubmit: () => Promise<void>;
  salvando: boolean;
  erro?: string;
  textoBotao?: string;
  extra?: React.ReactNode;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://daksa.app.br';

function Secao({
  titulo,
  descricao,
  children,
}: {
  titulo: string;
  descricao?: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <div className="mb-5">
        <h2 className="text-lg font-bold text-gray-900">{titulo}</h2>
        {descricao && <p className="mt-1 text-sm text-gray-600">{descricao}</p>}
      </div>
      <div className="space-y-5">{children}</div>
    </Card>
  );
}

export function ContentForm({
  valores,
  onChange,
  onSubmit,
  salvando,
  erro,
  textoBotao = 'Salvar',
  extra,
}: ContentFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    api
      .get<{ data: Category[] }>('/categories?take=100')
      .then((res) => setCategories(res.data))
      .catch(() => setCategories([]));
  }, []);

  const set = <K extends keyof ContentFormValues>(campo: K, valor: ContentFormValues[K]) =>
    onChange({ ...valores, [campo]: valor });

  const ehDownload = valores.type === 'DOWNLOAD';

  // Prévia do resultado de busca: o que cai no Google é o SEO quando preenchido, com o
  // título/resumo editorial como reserva. Mostrar isso evita título cortado em produção.
  const previa = useMemo(() => {
    const titulo = valores.seoTitle || valores.title || 'Título do conteúdo';
    const descricao =
      valores.seoDescription || valores.excerpt || 'Resumo que aparece no resultado de busca.';
    return { titulo, descricao };
  }, [valores.seoTitle, valores.seoDescription, valores.title, valores.excerpt]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Secao
        titulo="Tipo de conteúdo"
        descricao="Define o que o visitante encontra ao abrir — e se há captura de lead."
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {(
            [
              {
                valor: 'ARTIGO' as const,
                titulo: 'Artigo',
                texto: 'Texto aberto, lido na própria página. Sem formulário.',
              },
              {
                valor: 'DOWNLOAD' as const,
                titulo: 'Material para download',
                texto: 'PDF, apresentação ou planilha liberados após o formulário.',
              },
            ]
          ).map((op) => (
            <button
              key={op.valor}
              type="button"
              onClick={() => set('type', op.valor)}
              disabled={salvando}
              className={`rounded-xl border p-4 text-left transition-all ${
                valores.type === op.valor
                  ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-500/20'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="block font-semibold text-gray-900">{op.titulo}</span>
              <span className="mt-1 block text-sm text-gray-600">{op.texto}</span>
            </button>
          ))}
        </div>
      </Secao>

      <Secao titulo="Identificação">
        <Input
          label="Título"
          value={valores.title}
          onChange={(e) => set('title', e.target.value)}
          required
          minLength={3}
          maxLength={200}
          disabled={salvando}
        />

        <Textarea
          label="Chamada"
          hint="Uma ou duas linhas — aparece no card da listagem e serve de reserva para a meta description"
          value={valores.excerpt}
          onChange={(e) => set('excerpt', e.target.value)}
          rows={2}
          maxLength={500}
          disabled={salvando}
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input
            label="Autor"
            hint="Opcional"
            value={valores.author}
            onChange={(e) => set('author', e.target.value)}
            maxLength={100}
            disabled={salvando}
          />

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-900">Status</label>
            <select
              value={valores.status}
              onChange={(e) => set('status', e.target.value as 'DRAFT' | 'PUBLISHED')}
              disabled={salvando}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="DRAFT">Rascunho</option>
              <option value="PUBLISHED">Publicado</option>
            </select>
            <p className="mt-1 text-sm text-gray-500">Só publicado aparece no site.</p>
          </div>
        </div>

        <CheckboxGroup
          label="Categorias"
          options={categories.map((c) => ({ id: c.id, label: c.name }))}
          selected={valores.categoryIds}
          onChange={(ids) => set('categoryIds', ids)}
          disabled={salvando}
          emptyText="Nenhuma categoria cadastrada ainda. Crie categorias primeiro."
        />
      </Secao>

      <Secao
        titulo="Capa"
        descricao="A mesma imagem serve de miniatura na listagem e de abertura na leitura."
      >
        <ImageUpload
          label="Imagem de capa"
          value={valores.featured}
          onChange={(url) => set('featured', url)}
          disabled={salvando}
        />
        <Input
          label="Descrição da imagem"
          hint="Para leitores de tela e para busca por imagem. Descreva o que se vê."
          value={valores.featuredAlt}
          onChange={(e) => set('featuredAlt', e.target.value)}
          maxLength={200}
          disabled={salvando}
        />
      </Secao>

      {ehDownload ? (
        <Secao
          titulo="Material"
          descricao="O visitante preenche o formulário e só então recebe o link — é assim que a conversão é registrada."
        >
          <MaterialUpload
            value={valores.files}
            onChange={(files) => set('files', files)}
            disabled={salvando}
          />
          <RichTextEditor
            label="Descrição do material (opcional)"
            hint="O que a pessoa encontra dentro. Aparece acima do formulário."
            value={valores.content}
            onChange={(html) => set('content', html)}
            disabled={salvando}
          />
        </Secao>
      ) : (
        <Secao titulo="Texto do artigo">
          <RichTextEditor
            value={valores.content}
            onChange={(html) => set('content', html)}
            hint="Use títulos (Título 2 / Título 3) para dividir o texto — é o que dá estrutura para leitura e para busca."
            disabled={salvando}
          />
        </Secao>
      )}

      <Secao
        titulo="Resumo e perguntas"
        descricao="Ajudam quem lê rápido e dão aos buscadores e motores de resposta um sumário explícito do conteúdo. Seções vazias não aparecem na página."
      >
        <SummaryPointsEditor
          value={valores.summaryPoints}
          onChange={(pontos) => set('summaryPoints', pontos)}
          disabled={salvando}
        />
        <div className="border-t border-gray-100 pt-5">
          <FaqEditor
            value={valores.faqs}
            onChange={(faqs) => set('faqs', faqs)}
            disabled={salvando}
          />
        </div>
      </Secao>

      <Secao
        titulo="SEO"
        descricao="Preencha quando o título que converte na tela não for o melhor título para busca. Vazio, usa o título e a chamada acima."
      >
        <Input
          label="Título para busca"
          hint="Até ~60 caracteres — acima disso o Google corta"
          value={valores.seoTitle}
          onChange={(e) => set('seoTitle', e.target.value)}
          maxLength={200}
          disabled={salvando}
        />
        <Textarea
          label="Descrição para busca"
          hint="Até ~155 caracteres"
          value={valores.seoDescription}
          onChange={(e) => set('seoDescription', e.target.value)}
          rows={2}
          maxLength={300}
          disabled={salvando}
        />

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Prévia no resultado de busca
          </p>
          <p className="text-xs text-gray-600">
            {SITE_URL.replace(/^https?:\/\//, '')} › blog
          </p>
          <p className="mt-0.5 truncate text-lg text-[#1a0dab]">{previa.titulo}</p>
          <p className="mt-0.5 line-clamp-2 text-sm text-gray-600">{previa.descricao}</p>
          <div className="mt-3 flex gap-4 text-xs">
            <span className={previa.titulo.length > 60 ? 'text-amber-600' : 'text-gray-500'}>
              Título: {previa.titulo.length} car.
            </span>
            <span className={previa.descricao.length > 155 ? 'text-amber-600' : 'text-gray-500'}>
              Descrição: {previa.descricao.length} car.
            </span>
          </div>
        </div>
      </Secao>

      {erro && <p className="text-sm font-semibold text-red-600">{erro}</p>}

      <div className="flex gap-3">
        <Button variant="primary" loading={salvando}>
          {textoBotao}
        </Button>
        <Link href="/blog">
          <Button type="button" variant="secondary" disabled={salvando}>
            Cancelar
          </Button>
        </Link>
        {extra}
      </div>
    </form>
  );
}
