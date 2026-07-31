'use client';

import { useMemo, useState } from 'react';

export type Direcao = 'asc' | 'desc';

/** Como extrair o valor de cada coluna ordenável. */
export type Acessores<T> = Record<string, (item: T) => string | number | null | undefined>;

/**
 * Ordenação client-side das tabelas do painel.
 *
 * Compara com `localeCompare` em pt-BR e `sensitivity: 'base'`, não com `<`/`>`: em ASCII
 * "Ácido" viria depois de "Zinco", e o catálogo é cheio de acento. Números são comparados
 * como número, não como texto ("10" antes de "9").
 *
 * Vazio vai sempre para o fim, independente da direção — um campo em branco não é "menor",
 * é ausência de informação, e não deve ocupar o topo da tela quando se ordena decrescente.
 */
export function useTableSort<T>(itens: T[], acessores: Acessores<T>, campoInicial?: string) {
  const [campo, setCampo] = useState<string | null>(campoInicial ?? null);
  const [direcao, setDirecao] = useState<Direcao>('asc');

  const alternar = (novoCampo: string) => {
    if (novoCampo === campo) {
      setDirecao((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setCampo(novoCampo);
      setDirecao('asc');
    }
  };

  const dados = useMemo(() => {
    if (!campo || !acessores[campo]) return itens;

    const pegar = acessores[campo];
    const fator = direcao === 'asc' ? 1 : -1;

    return [...itens].sort((a, b) => {
      const va = pegar(a);
      const vb = pegar(b);

      const vazioA = va === null || va === undefined || va === '';
      const vazioB = vb === null || vb === undefined || vb === '';
      if (vazioA && vazioB) return 0;
      if (vazioA) return 1;
      if (vazioB) return -1;

      if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * fator;

      return String(va).localeCompare(String(vb), 'pt-BR', { sensitivity: 'base' }) * fator;
    });
  }, [itens, campo, direcao, acessores]);

  return { dados, campo, direcao, alternar };
}

interface SortHeadProps {
  campo: string;
  atual: string | null;
  direcao: Direcao;
  onClick: (campo: string) => void;
  children: React.ReactNode;
  alinhamento?: 'left' | 'right';
  className?: string;
}

/** Cabeçalho clicável. A seta só aparece na coluna ativa; nas demais surge no hover. */
export function SortHead({
  campo,
  atual,
  direcao,
  onClick,
  children,
  alinhamento = 'left',
  className = '',
}: SortHeadProps) {
  const ativo = atual === campo;

  return (
    <th
      scope="col"
      aria-sort={ativo ? (direcao === 'asc' ? 'ascending' : 'descending') : 'none'}
      className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 ${
        alinhamento === 'right' ? 'text-right' : 'text-left'
      } ${className}`}
    >
      <button
        type="button"
        onClick={() => onClick(campo)}
        className={`group inline-flex items-center gap-1.5 rounded transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
          ativo ? 'text-gray-900' : ''
        } ${alinhamento === 'right' ? 'flex-row-reverse' : ''}`}
        title={
          ativo && direcao === 'asc' ? 'Ordenar de Z a A' : 'Ordenar de A a Z'
        }
      >
        {children}
        <span
          aria-hidden
          className={`text-[10px] leading-none transition-all duration-200 ${
            ativo ? 'text-primary-600 opacity-100' : 'opacity-0 group-hover:opacity-40'
          }`}
        >
          {ativo && direcao === 'desc' ? '▼' : '▲'}
        </span>
      </button>
    </th>
  );
}

/** Cabeçalho simples, para colunas que não fazem sentido ordenar (ações, miniatura). */
export function PlainHead({
  children,
  alinhamento = 'left',
  className = '',
}: {
  children: React.ReactNode;
  alinhamento?: 'left' | 'right';
  className?: string;
}) {
  return (
    <th
      scope="col"
      className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 ${
        alinhamento === 'right' ? 'text-right' : 'text-left'
      } ${className}`}
    >
      {children}
    </th>
  );
}
