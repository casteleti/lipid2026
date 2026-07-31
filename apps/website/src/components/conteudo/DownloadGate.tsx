'use client';

import { useState } from 'react';
import { maskTelefone } from '@/lib/mask';
import { resolveMediaUrl } from '@/lib/api';

const SETORES = [
  { value: 'FARMACEUTICA', label: 'Farmacêutica' },
  { value: 'COSMETICO', label: 'Cosmético' },
  { value: 'ALIMENTICIA', label: 'Alimentícia' },
  { value: 'NUTRICIONAL', label: 'Nutricional' },
  { value: 'VETERINARIO', label: 'Veterinário' },
];

interface Arquivo {
  id: string;
  url: string;
  label: string;
  sizeBytes: number | null;
  mimetype: string | null;
}

/** O que a página entrega ao componente: nome e tamanho, NUNCA a URL. */
export interface ArquivoAnunciado {
  id: string;
  label: string;
  sizeBytes: number | null;
}

interface DownloadGateProps {
  contentId: string;
  contentSlug: string;
  contentTitle: string;
  arquivos: ArquivoAnunciado[];
}

const campoBase =
  'w-full rounded-xl border border-white/15 bg-white/[0.07] px-4 py-3 text-sm text-white placeholder-white/40 backdrop-blur-md transition-all duration-300 focus:border-white/40 focus:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50';

function formatarTamanho(bytes: number | null): string {
  if (!bytes) return '';
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

/**
 * Libera o material só depois do formulário — é o ponto de conversão do conteúdo.
 *
 * O link fica fora do HTML até o envio: renderizar e apenas esconder entregaria o arquivo
 * a quem abrisse o código-fonte, e a conversão nunca seria registrada.
 */
export function DownloadGate({
  contentId,
  contentSlug,
  contentTitle,
  arquivos,
}: DownloadGateProps) {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [sector, setSector] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [enviando, setEnviando] = useState(false);
  const [files, setFiles] = useState<Arquivo[]>([]);
  const [erro, setErro] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setErro('');

    try {
      const base = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${base}/api/v1/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          company,
          sector: sector || undefined,
          email,
          phone,
          contentId,
          message: `Download do material "${contentTitle}".`,
          pageUrl: window.location.href,
          pageTitle: `Material: ${contentTitle}`,
        }),
      });

      if (!res.ok) throw new Error('Falha ao enviar');
      const lead = await res.json();

      // As URLs só são pedidas agora, com o lead já gravado.
      const resArquivos = await fetch(
        `${base}/api/v1/content/slug/${contentSlug}/arquivos?lead=${encodeURIComponent(lead.id)}`,
      );
      if (!resArquivos.ok) throw new Error('Falha ao liberar');

      setFiles(await resArquivos.json());
    } catch {
      setErro('Não foi possível liberar o download agora. Tente novamente em instantes.');
    } finally {
      setEnviando(false);
    }
  };

  if (files.length > 0) {
    return (
      <div className="form-sucesso space-y-5">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="check-pulso flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md">
            <svg
              className="check-traco h-7 w-7 text-white"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <p className="text-lg font-semibold text-white">Material liberado</p>
          <p className="text-sm text-white/70">
            Enviamos também uma cópia do interesse para nossa equipe técnica.
          </p>
        </div>

        <div className="space-y-2">
          {files.map((file) => (
            <a
              key={file.id}
              href={resolveMediaUrl(file.url)}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="group flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.07] p-4 transition-all duration-300 hover:border-white/35 hover:bg-white/[0.12]"
            >
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white text-[10px] font-bold text-primary-900">
                ↓
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-white">
                  {file.label}
                </span>
                {file.sizeBytes && (
                  <span className="block text-xs text-white/50">
                    {formatarTamanho(file.sizeBytes)}
                  </span>
                )}
              </span>
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-3.5 ${enviando ? 'form-enviando' : ''}`}>
      <div className="space-y-1.5">
        <label htmlFor="dl-nome" className="block text-xs font-semibold uppercase tracking-wide text-white/60">
          Nome
        </label>
        <input
          id="dl-nome"
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
        <label htmlFor="dl-empresa" className="block text-xs font-semibold uppercase tracking-wide text-white/60">
          Empresa
        </label>
        <input
          id="dl-empresa"
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
        <label htmlFor="dl-setor" className="block text-xs font-semibold uppercase tracking-wide text-white/60">
          Setor
        </label>
        <select
          id="dl-setor"
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
        <label htmlFor="dl-email" className="block text-xs font-semibold uppercase tracking-wide text-white/60">
          E-mail
        </label>
        <input
          id="dl-email"
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
        <label htmlFor="dl-telefone" className="block text-xs font-semibold uppercase tracking-wide text-white/60">
          Telefone
        </label>
        <input
          id="dl-telefone"
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

      {/* Diz o que a pessoa recebe antes de entregar os dados — sem expor a URL. */}
      {arquivos.length > 0 && (
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
            Você vai receber
          </p>
          <ul className="mt-1.5 space-y-1">
            {arquivos.map((a) => (
              <li key={a.id} className="text-xs text-white/70">
                {a.label}
                {a.sizeBytes ? ` · ${formatarTamanho(a.sizeBytes)}` : ''}
              </li>
            ))}
          </ul>
        </div>
      )}

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
        {enviando ? 'Liberando...' : 'Liberar download'}
      </button>

      <p className="pt-1 text-center text-[11px] leading-relaxed text-white/40">
        Seus dados são usados apenas para este atendimento técnico.
      </p>
    </form>
  );
}
