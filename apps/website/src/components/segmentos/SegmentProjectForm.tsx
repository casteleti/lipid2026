'use client';

import { useState } from 'react';
import { maskTelefone } from '@/lib/mask';

const campoBase =
  'w-full rounded-xl border border-white/15 bg-white/[0.07] px-4 py-3 text-sm text-white placeholder-white/40 backdrop-blur-md transition-all duration-300 focus:border-white/40 focus:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50';

type Estado = 'editando' | 'enviando' | 'sucesso';

interface SegmentProjectFormProps {
  sector: string;
  segmentLabel: string;
  challengeOptions: string[];
  ctaLabel: string;
  successMessage: string;
}

/** Mesmo padrão visual do formulário institucional (glass escuro), com o campo específico do
 * segmento (principal desafio técnico) vindo do conteúdo cadastrado no painel. */
export function SegmentProjectForm({
  sector,
  segmentLabel,
  challengeOptions,
  ctaLabel,
  successMessage,
}: SegmentProjectFormProps) {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [challenges, setChallenges] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const [estado, setEstado] = useState<Estado>('editando');
  const [erro, setErro] = useState('');

  const toggleChallenge = (opt: string) => {
    setChallenges((prev) => (prev.includes(opt) ? prev.filter((c) => c !== opt) : [...prev, opt]));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEstado('enviando');
    setErro('');

    const partesMensagem = [
      `Projeto ${segmentLabel}.`,
      role ? `Cargo/área: ${role}.` : null,
      challenges.length ? `Principal desafio técnico: ${challenges.join(', ')}.` : null,
      message ? `Detalhes: ${message}` : null,
    ].filter(Boolean);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          company,
          sector,
          email,
          phone,
          message: partesMensagem.join(' '),
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
          <p className="text-sm leading-relaxed text-white/70">{successMessage}</p>
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
          <label htmlFor="seg-nome" className="block text-xs font-semibold uppercase tracking-wide text-white/60">
            Nome
          </label>
          <input
            id="seg-nome"
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
          <label htmlFor="seg-empresa" className="block text-xs font-semibold uppercase tracking-wide text-white/60">
            Empresa
          </label>
          <input
            id="seg-empresa"
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
          <label htmlFor="seg-cargo" className="block text-xs font-semibold uppercase tracking-wide text-white/60">
            Cargo ou área
          </label>
          <input
            id="seg-cargo"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            maxLength={100}
            disabled={enviando}
            className={campoBase}
            placeholder="Ex.: P&D, inovação, compras"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="seg-email" className="block text-xs font-semibold uppercase tracking-wide text-white/60">
            E-mail
          </label>
          <input
            id="seg-email"
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
          <label htmlFor="seg-telefone" className="block text-xs font-semibold uppercase tracking-wide text-white/60">
            Telefone ou WhatsApp
          </label>
          <input
            id="seg-telefone"
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(maskTelefone(e.target.value))}
            disabled={enviando}
            className={campoBase}
            placeholder="(11) 90000-0000"
          />
        </div>
      </div>

      {challengeOptions.length > 0 && (
        <fieldset className="space-y-2">
          <legend className="text-xs font-semibold uppercase tracking-wide text-white/60">
            Principal desafio técnico
          </legend>
          <div className="flex flex-wrap gap-2">
            {challengeOptions.map((opt) => {
              const active = challenges.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleChallenge(opt)}
                  disabled={enviando}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium capitalize transition-all duration-300 ${
                    active
                      ? 'border-white bg-white text-primary-950'
                      : 'border-white/20 bg-white/[0.04] text-white/70 hover:border-white/40'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      <div className="space-y-1.5">
        <label htmlFor="seg-mensagem" className="block text-xs font-semibold uppercase tracking-wide text-white/60">
          Conte os detalhes do desafio
        </label>
        <textarea
          id="seg-mensagem"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          disabled={enviando}
          className={campoBase}
          placeholder="Estágio do projeto, forma pretendida, o que precisa melhorar..."
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
        {enviando ? 'Enviando...' : ctaLabel}
      </button>

      <p className="pt-1 text-center text-[11px] leading-relaxed text-white/40">
        Não é necessário compartilhar informações confidenciais nesta etapa. Seus dados são usados
        apenas para este atendimento técnico.
      </p>
    </form>
  );
}
