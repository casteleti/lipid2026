'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { Button } from '@/components/Button';
import { api } from '@/lib/api-client';

export default function NovoParceiroPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [logo, setLogo] = useState('');
  const [website, setWebsite] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
        website: website || undefined,
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
            hint="Opcional"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            maxLength={500}
            disabled={loading}
          />

          <Input
            label="URL do logo"
            hint="Opcional"
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
            disabled={loading}
          />

          <Input
            label="Website"
            hint="Opcional — ex: https://parceiro.com.br"
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
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
