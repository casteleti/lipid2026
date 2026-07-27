'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { Button } from '@/components/Button';
import { api } from '@/lib/api-client';

interface Ingredient {
  id: string;
  name: string;
  description: string;
  inci: string | null;
  supplier: string | null;
  active: boolean;
}

export default function EditarIngredientePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [inci, setInci] = useState('');
  const [supplier, setSupplier] = useState('');
  const [active, setActive] = useState(true);

  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    api
      .get<Ingredient>(`/ingredients/${params.id}`)
      .then((item) => {
        setName(item.name);
        setDescription(item.description);
        setInci(item.inci || '');
        setSupplier(item.supplier || '');
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
        inci: inci || undefined,
        supplier: supplier || undefined,
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
            label="INCI"
            hint="Nome técnico (opcional)"
            value={inci}
            onChange={(e) => setInci(e.target.value)}
            maxLength={100}
            disabled={saving}
          />

          <Input
            label="Fornecedor"
            hint="Opcional"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            maxLength={200}
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
            <Link href="/ingredientes">
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
