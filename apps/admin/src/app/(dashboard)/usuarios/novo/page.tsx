'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { api } from '@/lib/api-client';

export default function NovoUsuarioPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'ADMIN' | 'EDITOR' | 'USER'>('EDITOR');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/admin/users', { name, email, password, role });
      router.push('/usuarios');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível criar o usuário');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Novo Usuário</h1>
        <Link href="/usuarios" className="text-sm text-primary-600 hover:underline">
          ← Voltar
        </Link>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-5 max-w-md">
          <Input
            label="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={3}
            disabled={loading}
          />

          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />

          <Input
            label="Senha"
            type="password"
            hint="Mínimo de 8 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            disabled={loading}
          />

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Papel</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as 'ADMIN' | 'EDITOR' | 'USER')}
              disabled={loading}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="ADMIN">Administrador</option>
              <option value="EDITOR">Editor</option>
              <option value="USER">Usuário</option>
            </select>
          </div>

          {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

          <div className="flex gap-3">
            <Button variant="primary" loading={loading}>
              Salvar
            </Button>
            <Link href="/usuarios">
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
