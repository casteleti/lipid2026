'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { Button } from '@/components/Button';
import { ImageUpload } from '@/components/ImageUpload';
import { api } from '@/lib/api-client';

export default function NovoParceiroPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [logo, setLogo] = useState('');
  const [image, setImage] = useState('');
  const [websites, setWebsites] = useState<string[]>(['']);
  const [country, setCountry] = useState('');
  const [highlights, setHighlights] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const updateWebsite = (index: number, value: string) => {
    setWebsites((prev) => prev.map((item, i) => (i === index ? value : item)));
  };

  const addWebsite = () => setWebsites((prev) => [...prev, '']);

  const removeWebsite = (index: number) => {
    setWebsites((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/partners', {
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
      setError(err instanceof Error ? err.message : 'Não foi possível criar o parceiro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Novo Parceiro</h1>
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
            disabled={loading}
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
            disabled={loading}
          />

          <Input
            label="Resumo"
            hint="Opcional — usado em cards e SEO"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            maxLength={500}
            disabled={loading}
          />

          <ImageUpload label="Logotipo" value={logo} onChange={setLogo} disabled={loading} />

          <ImageUpload label="Imagem ilustrativa" value={image} onChange={setImage} disabled={loading} />

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
                    disabled={loading}
                    className="flex-1"
                  />
                  {websites.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeWebsite(index)}
                      className="text-sm text-red-600 hover:underline"
                      disabled={loading}
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
              disabled={loading}
            >
              + Adicionar outro site
            </button>
          </div>

          <Input
            label="País de origem"
            hint="Opcional — ex: Alemanha"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            disabled={loading}
          />

          <Textarea
            label="Especializações"
            hint="Opcional — um destaque por linha, exibido como lista na página do parceiro"
            value={highlights}
            onChange={(e) => setHighlights(e.target.value)}
            rows={4}
            disabled={loading}
          />

          {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

          <div className="flex gap-3">
            <Button variant="primary" loading={loading}>
              Salvar
            </Button>
            <Link href="/parceiros">
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
