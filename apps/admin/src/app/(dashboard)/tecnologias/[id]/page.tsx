'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { Button } from '@/components/Button';
import { api } from '@/lib/api-client';

interface Technology {
  id: string;
  name: string;
  description: string;
  excerpt: string | null;
  icon: string | null;
  active: boolean;
}

export default function EditarTecnologiaPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [icon, setIcon] = useState('');
  const [active, setActive] = useState(true);

  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    api
      .get<Technology>(`/technologies/${params.id}`)
      .then((item) => {
        setName(item.name);
        setDescription(item.description);
        setExcerpt(item.excerpt || '');
        setIcon(item.icon || '');
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
      await api.put(`/technologies/${params.id}`, {
        name,
        description,
        excerpt: excerpt || undefined,
        icon: icon || undefined,
      });
      router.push('/tecnologias');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível salvar as alterações');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Desativar esta tecnologia?')) return;
    setSaving(true);
    try {
      await api.delete(`/technologies/${params.id}`);
      router.push('/tecnologias');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível desativar a tecnologia');
      setSaving(false);
    }
  };

  if (loadingData) return <p className="text-gray-500">Carregando...</p>;
  if (notFound) return <p className="text-red-600">Tecnologia não encontrada.</p>;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Editar Tecnologia</h1>
        <Link href="/tecnologias" className="text-sm text-primary-600 hover:underline">
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
            minLength={3}
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
            hint="Texto curto usado em listagens (opcional)"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            maxLength={500}
            disabled={saving}
          />

          <Input
            label="URL do ícone"
            hint="Opcional"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
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
            <Link href="/tecnologias">
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
