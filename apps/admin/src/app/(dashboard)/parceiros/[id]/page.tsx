'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { Button } from '@/components/Button';
import { ImageUpload } from '@/components/ImageUpload';
import { api } from '@/lib/api-client';

interface Partner {
  id: string;
  name: string;
  description: string;
  excerpt: string | null;
  logo: string | null;
  image: string | null;
  websites: string[];
  country: string | null;
  highlights: string | null;
  active: boolean;
}

export default function EditarParceiroPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [logo, setLogo] = useState('');
  const [image, setImage] = useState('');
  const [websites, setWebsites] = useState<string[]>(['']);
  const [country, setCountry] = useState('');
  const [highlights, setHighlights] = useState('');
  const [active, setActive] = useState(true);

  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    api
      .get<Partner>(`/partners/${params.id}`)
      .then((item) => {
        setName(item.name);
        setDescription(item.description);
        setExcerpt(item.excerpt || '');
        setLogo(item.logo || '');
        setImage(item.image || '');
        setWebsites(item.websites && item.websites.length > 0 ? item.websites : ['']);
        setCountry(item.country || '');
        setHighlights(item.highlights || '');
        setActive(item.active);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoadingData(false));
  }, [params.id]);

  const updateWebsite = (index: number, value: string) => {
    setWebsites((prev) => prev.map((item, i) => (i === index ? value : item)));
  };

  const addWebsite = () => setWebsites((prev) => [...prev, '']);

  const removeWebsite = (index: number) => {
    setWebsites((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      await api.put(`/partners/${params.id}`, {
        name,
        description,
        excerpt: excerpt || undefined,
        logo: logo || undefined,
        image: image || undefined,
        websites: websites.map((w) => w.trim()).filter(Boolean),
        country: country || undefined,
        highlights: highlights || undefined,
      });
      router.push('/parceiros');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível salvar as alterações');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Desativar este parceiro?')) return;
    setSaving(true);
    try {
      await api.delete(`/partners/${params.id}`);
      router.push('/parceiros');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível desativar o parceiro');
      setSaving(false);
    }
  };

  if (loadingData) return <p className="text-gray-500">Carregando...</p>;
  if (notFound) return <p className="text-red-600">Parceiro não encontrado.</p>;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Editar Parceiro</h1>
        <Link href="/parceiros" className="text-sm text-primary-600 hover:underline">
          ← Voltar
        </Link>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
          <Input
            label="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={2}
            maxLength={100}
            disabled={saving}
          />

          <Textarea
            label="Sobre o parceiro"
            hint="Bloco de texto institucional exibido na página do parceiro"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            minLength={10}
            maxLength={1000}
            rows={6}
            disabled={saving}
          />

          <Input
            label="Resumo"
            hint="Opcional — usado em cards e SEO"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            maxLength={500}
            disabled={saving}
          />

          <ImageUpload label="Logotipo" value={logo} onChange={setLogo} disabled={saving} />

          <ImageUpload label="Imagem ilustrativa" value={image} onChange={setImage} disabled={saving} />

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-900">Site(s) oficial(is)</label>
            <div className="space-y-3">
              {websites.map((site, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Input
                    value={site}
                    onChange={(e) => updateWebsite(index, e.target.value)}
                    placeholder="https://parceiro.com"
                    type="url"
                    disabled={saving}
                    className="flex-1"
                  />
                  {websites.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeWebsite(index)}
                      className="text-sm text-red-600 hover:underline"
                      disabled={saving}
                    >
                      Remover
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addWebsite}
              className="mt-3 text-sm font-semibold text-primary-600 hover:underline"
              disabled={saving}
            >
              + Adicionar outro site
            </button>
          </div>

          <Input
            label="País de origem"
            hint="Opcional — ex: Alemanha"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            disabled={saving}
          />

          <Textarea
            label="Especializações"
            hint="Opcional — um destaque por linha, exibido como lista na página do parceiro"
            value={highlights}
            onChange={(e) => setHighlights(e.target.value)}
            rows={4}
            disabled={saving}
          />

          <p className="text-sm text-gray-500">
            Status atual:{' '}
            <span className={active ? 'text-green-700 font-semibold' : 'text-red-700 font-semibold'}>
              {active ? 'Ativo' : 'Inativo'}
            </span>
          </p>

          {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

          <div className="flex gap-3">
            <Button variant="primary" loading={saving}>
              Salvar
            </Button>
            <Link href="/parceiros">
              <Button type="button" variant="secondary" disabled={saving}>
                Cancelar
              </Button>
            </Link>
            <Button type="button" variant="danger" onClick={handleDelete} disabled={saving} className="ml-auto">
              Desativar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
