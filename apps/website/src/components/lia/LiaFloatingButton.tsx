'use client';

import { useState } from 'react';
import { HiSparkles } from 'react-icons/hi2';

/**
 * Botão flutuante da Lia. `fixed` já resolve "acompanhar a rolagem" sozinho — não precisa
 * de listener de scroll, o elemento fica ancorado ao viewport, não ao documento.
 */
export function LiaFloatingButton({ onClick }: { onClick: () => void }) {
  const [ativo, setAtivo] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div
        role="tooltip"
        className={`absolute right-full top-1/2 mr-3 flex -translate-y-1/2 items-center whitespace-nowrap rounded-2xl bg-white px-5 py-3 shadow-[0_20px_40px_-15px_rgba(15,23,42,0.3)] transition-all duration-300 ease-brand ${
          ativo ? 'translate-x-0 opacity-100' : 'pointer-events-none translate-x-2 opacity-0'
        }`}
      >
        <div>
          <p className="text-sm font-bold text-gray-900">Lia</p>
          <p className="text-xs text-gray-500">Clique para conversar</p>
        </div>
      </div>

      <button
        type="button"
        aria-label="Conversar com a Lia"
        onClick={onClick}
        onMouseEnter={() => setAtivo(true)}
        onMouseLeave={() => setAtivo(false)}
        onFocus={() => setAtivo(true)}
        onBlur={() => setAtivo(false)}
        className="group relative flex h-16 w-16 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2"
      >
        {/* halo externo */}
        <span
          aria-hidden
          className="absolute inset-[-10px] rounded-full bg-primary-200/50 blur-md transition-opacity duration-300 group-hover:opacity-90"
        />
        {/* disco principal */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-400 via-primary-600 to-primary-950 shadow-[0_20px_40px_-12px_rgba(10,21,51,0.6)] transition-transform duration-300 ease-brand group-hover:scale-105"
        />
        {/* reflexo de vidro */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-70"
        />
        <HiSparkles className="relative h-7 w-7 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]" />
        {/* indicador online */}
        <span
          aria-hidden
          className="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500"
        />
      </button>
    </div>
  );
}
