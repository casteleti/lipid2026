'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { Button } from '@/components/Button';
import { TagPicker } from '@/components/TagPicker';
import { CodeListInput } from '@/components/CodeListInput';
import { GalleryUpload, type GalleryImage } from '@/components/GalleryUpload';
import { PdfUpload, type PdfFile } from '@/components/PdfUpload';
import { api } from '@/lib/api-client';

interface Partner {
  id: string;
  name: string;
}
interface Categoria {
  id: string;
  name: string;
}
interface Tag {
  id: string;
  name: string;
}

interface Ingredient {
  id: string;
  name: string;
  description: string;
  excerpt: string | null;
  inci: string | null;
  partnerId: string | null;
  categoryId: string | null;
  active: boolean;
  codes: { id: string; code: string }[];
  images: { id: string; url: string; alt: string | null }[];
  files: { id: string; url: string; label: string; sizeBytes: number | null }[];
  tags: { tag: Tag }[];
}

export default function EditarIngredientePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [name, setName] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [description, setDescription] = useState('');
  const [inci, setInci] = useState('');
  const [partnerId, setPartnerId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [codes, setCodes] = useState<string[]>(['']);
  const [tagIds, setTagIds] = useState<string[]>([]);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [active, setActive] = useState(true);

  const [partners, setPartners] = useState<Partner[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    api
      .get<{ data: Partner[] }>('/partners?take=100')
      .then((res) => setPartners(res.data))
      .catch(() => setPartners([]));
    api
      .get<Categoria[]>('/ingredient-categories')
      .then(setCategorias)
      .catch(() => setCategorias([]));
    api
      .get<Tag[]>('/tags')
      .then(setTags)
      .catch(() => setTags([]));

    api
      .get<Ingredient>(`/ingredients/${params.id}`)
      .then((item) => {
        setName(item.name);
        setDescription(item.description);
        setExcerpt(item.excerpt || '');
        setInci(item.inci || '');
        setPartnerId(item.partnerId || '');
        setCategoryId(item.categoryId || '');
        setCodes(item.codes.length > 0 ? item.codes.map((c) => c.code) : ['']);
        setTagIds(item.tags.map((t) => t.tag.id));
        setImages(item.images.map((img) => ({ url: img.url, alt: img.alt || '' })));
        setFiles(
          item.files.map((f) => ({
            url: f.url,
            label: f.label,
            sizeBytes: f.sizeBytes ?? undefined,
          })),
        );
        setActive(item.active);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoadingData(false));
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      await api.put(`/ingredients/${params.id}`, {
        name,
        description,
        excerpt: excerpt || undefined,
        inci: inci || undefined,
        partnerId: partnerId || undefined,
        categoryId: categoryId || undefined,
        codes: codes.map((c) => c.trim()).filter(Boolean),
        tagIds,
        images,
        files,
      });
      router.push('/ingredientes');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível salvar as alterações');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Desativar este ingrediente?')) return;
    setSaving(true);
    try {
      await api.delete(`/ingredients/${params.id}`);
      router.push('/ingredientes');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível desativar o ingrediente');
      setSaving(false);
    }
  };

  if (loadingData) return <p className="text-gray-500">Carregando...</p>;
  if (notFound) return <p className="text-red-600">Ingrediente não encontrado.</p>;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Editar Ingrediente</h1>
        <Link href="/ingredientes" className="text-sm text-primary-600 hover:underline">
          ← Voltar
        </Link>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
          <Input
            label="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={3}
            maxLength={100}
            disabled={saving}
          />

          <Input
            label="Subtítulo"
            hint="Uma linha resumindo a função — aparece no card e na busca"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            maxLength={500}
            disabled={saving}
          />

          <Textarea
            label="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            minLength={10}
            maxLength={5000}
            rows={8}
            disabled={saving}
          />

          <Input
            label="INCI"
            hint="Nome técnico. Deixe vazio se ainda não confirmado na ficha técnica."
            value={inci}
            onChange={(e) => setInci(e.target.value)}
            maxLength={100}
            disabled={saving}
          />

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-900">Fabricante</label>
            <select
              value={partnerId}
              onChange={(e) => setPartnerId(e.target.value)}
              disabled={saving}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Sem fabricante</option>
              {partners.map((partner) => (
                <option key={partner.id} value={partner.id}>
                  {partner.name}
                </option>
              ))}
            </select>
            <p className="mt-1 text-sm text-gray-500">
              Carregado dos parceiros cadastrados.{' '}
              <Link href="/parceiros/novo" className="text-primary-600 hover:underline">
                Cadastrar novo parceiro
              </Link>
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-900">Categoria</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              disabled={saving}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Sem categoria</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.name}
                </option>
              ))}
            </select>
            <p className="mt-1 text-sm text-gray-500">
              Cada ingrediente tem uma categoria só. A lista é compartilhada entre os fabricantes.
            </p>
          </div>

          <CodeListInput value={codes} onChange={setCodes} disabled={saving} />

          <GalleryUpload
            label="Imagens do ingrediente"
            value={images}
            onChange={setImages}
            disabled={saving}
          />

          <PdfUpload
            label="Documentos (PDF)"
            value={files}
            onChange={setFiles}
            disabled={saving}
          />

          <TagPicker
            label="Tags"
            hint="Marcadores de busca — um ingrediente pode ter várias."
            tags={tags}
            selected={tagIds}
            onChange={setTagIds}
            disabled={saving}
          />

          <p className="text-sm text-gray-500">
            Status atual:{' '}
            <span className={active ? 'font-semibold text-green-700' : 'font-semibold text-red-700'}>
              {active ? 'Ativo' : 'Inativo'}
            </span>
          </p>

          {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

          <div className="flex gap-3">
            <Button variant="primary" loading={saving}>
              Salvar
            </Button>
            <Link href="/ingredientes">
              <Button type="button" variant="secondary" disabled={saving}>
                Cancelar
              </Button>
            </Link>
            <Button
              type="button"
              variant="danger"
              onClick={handleDelete}
              disabled={saving}
              className="ml-auto"
            >
              Desativar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
