'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { Button } from '@/components/Button';
import { api } from '@/lib/api-client';

interface Partner {
  id: string;
  name: string;
  description: string;
  excerpt: string | null;
  logo: string | null;
  website: string | null;
  active: boolean;
}

export default function EditarParceiroPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [logo, setLogo] = useState('');
  const [website, setWebsite] = useState('');
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
        setWebsite(item.website || '');
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
      await api.put(`/partners/${params.id}`, {
        name,
        description,
        excerpt: excerpt || undefined,
        logo: logo || undefined,
        website: website || undefined,
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
            label="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            minLength={10}
            maxLength={1000}
            rows={5}
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

          <Input
            label="URL do logo"
            hint="Opcional"
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
            disabled={saving}
          />

          <Input
            label="Website"
            hint="Opcional"
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
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
