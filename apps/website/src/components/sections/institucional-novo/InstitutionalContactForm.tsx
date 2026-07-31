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

const campoBase =
  'w-full rounded-xl border border-white/15 bg-white/[0.07] px-4 py-3 text-sm text-white placeholder-white/40 backdrop-blur-md transition-all duration-300 focus:border-white/40 focus:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50';

type Estado = 'editando' | 'enviando' | 'sucesso';

/**
 * Mesmo padrão visual/comportamental do IngredientInterestForm (glass escuro, sucesso com
 * check desenhado), mas sem ingredientId — é o formulário geral de atendimento da página
 * institucional, alvo de todos os CTAs de "Falar com um especialista" desta página.
 */
export function InstitutionalContactForm() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [sector, setSector] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

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
          message: message || 'Contato via página institucional.',
          pageUrl: window.location.href,
          pageTitle: document.title,
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
      <div className="form-sucesso flex flex-col items-center gap-4 rounded-[24px] bg-primary-950 px-8 py-14 text-center">
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
            Recebemos sua mensagem. A equipe técnica da Lipid vai retornar em breve.
          </p>
        </div>
      </div>
    );
  }

  const enviando = estado === 'enviando';

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-3.5 rounded-[24px] bg-primary-950 p-8 ${enviando ? 'form-enviando' : ''}`}
    >
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="inst-nome" className="block text-xs font-semibold uppercase tracking-wide text-white/60">
            Nome
          </label>
          <input
            id="inst-nome"
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
          <label htmlFor="inst-empresa" className="block text-xs font-semibold uppercase tracking-wide text-white/60">
            Empresa
          </label>
          <input
            id="inst-empresa"
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
          <label htmlFor="inst-setor" className="block text-xs font-semibold uppercase tracking-wide text-white/60">
            Setor
          </label>
          <select
            id="inst-setor"
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
          <label htmlFor="inst-email" className="block text-xs font-semibold uppercase tracking-wide text-white/60">
            E-mail
          </label>
          <input
            id="inst-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={enviando}
            className={campoBase}
            placeholder="voce@empresa.com.br"
          />
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <label htmlFor="inst-telefone" className="block text-xs font-semibold uppercase tracking-wide text-white/60">
            Telefone
          </label>
          <input
            id="inst-telefone"
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
      </div>

      <div className="space-y-1.5">
        <label htmlFor="inst-mensagem" className="block text-xs font-semibold uppercase tracking-wide text-white/60">
          Mensagem
        </label>
        <textarea
          id="inst-mensagem"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          disabled={enviando}
          className={campoBase}
          placeholder="Conte o que você está desenvolvendo e onde estão as principais dúvidas"
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
        {enviando ? 'Enviando...' : 'Preencher o Formulário de Atendimento'}
      </button>

      <p className="pt-1 text-center text-[11px] leading-relaxed text-white/40">
        Seus dados são usados apenas para este atendimento técnico.
      </p>
    </form>
  );
}
