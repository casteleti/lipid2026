'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      router.push('/');
    } catch {
      setError('Email ou senha incorretos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-100 p-4">
      {/* Decoração de fundo */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full border-[40px] border-primary-100 opacity-60" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-[28rem] w-[28rem] rounded-full border-[50px] border-primary-100 opacity-50" />

      <div className="relative w-full max-w-md">
        <div className="rounded-2xl bg-white/90 backdrop-blur p-8 shadow-xl border border-gray-100">
          <div className="mb-8 flex justify-center">
            <Image
              src="/logo/lipid-horizontal.png"
              alt="LIPID Ingredients"
              width={220}
              height={67}
              priority
            />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 text-center">Bem-vindo de volta</h1>
          <p className="text-gray-500 text-center mt-1 mb-8">Faça login para acessar sua conta</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />

            <div className="relative">
              <Input
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600"
                tabIndex={-1}
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>

            <div className="flex justify-end">
              <a href="#" className="text-sm text-primary-600 hover:underline">
                Esqueci minha senha
              </a>
            </div>

            {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

            <Button variant="primary" size="lg" loading={loading} className="w-full">
              Entrar
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} LIPID Ingredients. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
