'use client';

import { useState } from 'react';
import { maskTelefone } from '@/lib/mask';

const SETORES = [
  { value: 'FARMACEUTICA', label: 'Farmacêutica' },
  { value: 'COSMETICO', label: 'Cosmético' },
  { value: 'ALIMENTICIA', label: 'Alimentícia' },
  { value: 'NUTRICIONAL', label: 'Nutricional' },
  { value: 'VETERINARIO', label: 'Veterinário' },
];

interface IngredientInterestFormProps {
  ingredientId: string;
  ingredientName: string;
}

const campoBase =
  'w-full rounded-xl border border-white/15 bg-white/[0.07] px-4 py-3 text-sm text-white placeholder-white/40 backdrop-blur-md transition-all duration-300 focus:border-white/40 focus:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50';

type Estado = 'editando' | 'enviando' | 'sucesso';

export function IngredientInterestForm({ ingredientId, ingredientName }: IngredientInterestFormProps) {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [sector, setSector] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [estado, setEstado] = useState<Estado>('editando');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEstado('enviando');
    setErro('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          company,
          sector: sector || undefined,
          email,
          phone,
          ingredientId,
          message: `Interesse no ingrediente ${ingredientName}.`,
          pageUrl: window.location.href,
          pageTitle: `Página do ingrediente ${ingredientName}`,
        }),
      });

      if (!res.ok) throw new Error('Falha ao enviar');
      setEstado('sucesso');
    } catch {
      setErro('Não foi possível enviar agora. Tente novamente em instantes.');
      setEstado('editando');
    }
  };

  if (estado === 'sucesso') {
    return (
      <div className="form-sucesso flex flex-col items-center gap-4 py-6 text-center">
        <div className="check-pulso relative flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md">
          <svg
            className="check-traco h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <div className="space-y-2">
          <p className="text-xl font-semibold text-white">Obrigado pelo contato</p>
          <p className="text-sm leading-relaxed text-white/70">
            Recebemos seu interesse no{' '}
            <strong className="font-semibold text-white">{ingredientName}</strong>. A equipe técnica
            da Lipid vai retornar em breve.
          </p>
        </div>
      </div>
    );
  }

  const enviando = estado === 'enviando';

  return (
    <form onSubmit={handleSubmit} className={`space-y-3.5 ${enviando ? 'form-enviando' : ''}`}>
      <div className="space-y-1.5">
        <label htmlFor="int-nome" className="block text-xs font-semibold uppercase tracking-wide text-white/60">
          Nome
        </label>
        <input
          id="int-nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={100}
          disabled={enviando}
          className={campoBase}
          placeholder="Seu nome"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="int-empresa" className="block text-xs font-semibold uppercase tracking-wide text-white/60">
          Empresa
        </label>
        <input
          id="int-empresa"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
          maxLength={100}
          disabled={enviando}
          className={campoBase}
          placeholder="Nome da empresa"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="int-setor" className="block text-xs font-semibold uppercase tracking-wide text-white/60">
          Setor
        </label>
        <select
          id="int-setor"
          value={sector}
          onChange={(e) => setSector(e.target.value)}
          required
          disabled={enviando}
          className={`${campoBase} [&>option]:bg-primary-950 [&>option]:text-white`}
        >
          <option value="" disabled>
            Selecione o setor
          </option>
          {SETORES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="int-email" className="block text-xs font-semibold uppercase tracking-wide text-white/60">
          E-mail
        </label>
        <input
          id="int-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={enviando}
          className={campoBase}
          placeholder="voce@empresa.com.br"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="int-telefone" className="block text-xs font-semibold uppercase tracking-wide text-white/60">
          Telefone
        </label>
        <input
          id="int-telefone"
          type="tel"
          inputMode="numeric"
          value={phone}
          onChange={(e) => setPhone(maskTelefone(e.target.value))}
          required
          disabled={enviando}
          className={campoBase}
          placeholder="(11) 90000-0000"
        />
      </div>

      {erro && (
        <p role="alert" className="text-sm font-medium text-red-300">
          {erro}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="mt-2 w-full rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-primary-950 shadow-[0_18px_40px_-16px_rgba(255,255,255,0.5)] transition-all duration-500 ease-brand hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-16px_rgba(255,255,255,0.65)] focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-primary-950 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {enviando ? 'Enviando...' : 'Falar com a equipe técnica'}
      </button>

      <p className="pt-1 text-center text-[11px] leading-relaxed text-white/40">
        Seus dados são usados apenas para este atendimento técnico.
      </p>
    </form>
  );
}
