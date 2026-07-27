'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { Button } from '@/components/Button';
import { api } from '@/lib/api-client';

export default function NovaTecnologiaPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [icon, setIcon] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/technologies', {
        name,
        description,
        excerpt: excerpt || undefined,
        icon: icon || undefined,
      });
      router.push('/tecnologias');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível criar a tecnologia');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Nova Tecnologia</h1>
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
            label="Resumo"
            hint="Texto curto usado em listagens (opcional)"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            maxLength={500}
            disabled={loading}
          />

          <Input
            label="URL do ícone"
            hint="Opcional"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            disabled={loading}
          />

          {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

          <div className="flex gap-3">
            <Button variant="primary" loading={loading}>
              Salvar
            </Button>
            <Link href="/tecnologias">
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
