'use client';

import { HiMagnifyingGlass, HiXMark } from 'react-icons/hi2';

interface SearchInputProps {
  value: string;
  onChange: (valor: string) => void;
  placeholder?: string;
  /** Resultado atual, mostrado à direita — evita a dúvida "filtrou ou zerou?". */
  contagem?: number;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Buscar...',
  contagem,
  className = '',
}: SearchInputProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex-1">
        <HiMagnifyingGlass className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-gray-200 bg-gray-50/70 py-2.5 pl-10 pr-10 text-sm text-gray-900 transition-all duration-200 placeholder:text-gray-400 focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary-500/10"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label="Limpar busca"
            className="absolute right-3 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700"
          >
            <HiXMark className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {typeof contagem === 'number' && (
        <span className="whitespace-nowrap text-sm text-gray-500">
          {contagem} {contagem === 1 ? 'registro' : 'registros'}
        </span>
      )}
    </div>
  );
}

/**
 * Filtro de texto sobre os campos indicados.
 *
 * Compara sem acento e sem caixa: quem digita "acai" precisa achar "Açaí", e quem digita
 * "HERBASOL" precisa achar "Herbasol". Sem isso a busca falha justo nos nomes do catálogo.
 */
export function filtrarPorTexto<T>(itens: T[], termo: string, campos: (item: T) => (string | null | undefined)[]) {
  const alvo = normalizar(termo);
  if (!alvo) return itens;

  return itens.filter((item) =>
    campos(item).some((valor) => valor && normalizar(valor).includes(alvo)),
  );
}

function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();
}
