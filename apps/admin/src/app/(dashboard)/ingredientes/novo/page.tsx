'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { Button } from '@/components/Button';
import { api } from '@/lib/api-client';

export default function NovoIngredientePage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [inci, setInci] = useState('');
  const [supplier, setSupplier] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/ingredients', {
        name,
        description,
        inci: inci || undefined,
        supplier: supplier || undefined,
      });
      router.push('/ingredientes');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível criar o ingrediente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Novo Ingrediente</h1>
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
            disabled={loading}
          />

          <Textarea
            label="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            minLength={10}
            maxLength={1000}
            rows={5}
            disabled={loading}
          />

          <Input
            label="INCI"
            hint="Nome técnico (opcional)"
            value={inci}
            onChange={(e) => setInci(e.target.value)}
            maxLength={100}
            disabled={loading}
          />

          <Input
            label="Fornecedor"
            hint="Opcional"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            maxLength={200}
            disabled={loading}
          />

          {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

          <div className="flex gap-3">
            <Button variant="primary" loading={loading}>
              Salvar
            </Button>
            <Link href="/ingredientes">
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
