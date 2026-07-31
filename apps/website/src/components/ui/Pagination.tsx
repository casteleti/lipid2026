'use client';

import clsx from 'clsx';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Páginas visíveis de cada lado da atual. */
  vizinhos?: number;
}

const RETICENCIAS = 'reticencias' as const;
type Item = number | typeof RETICENCIAS;

/**
 * Monta a régua de páginas no formato "1 2 3 4 … 19".
 *
 * A versão anterior mostrava só a página atual mais uma de cada lado, então em 19 páginas
 * aparecia "1 … 9 10 11 … 19" — sem noção de tamanho nem como pular adiante.
 *
 * O total de posições é fixo, para a régua não mudar de largura ao navegar (o que fazia os
 * botões dançarem sob o cursor). Quando a atual está numa ponta, o bloco cresce para o lado
 * oposto em vez de deixar buraco.
 */
function montarPaginas(atual: number, total: number, vizinhos: number): Item[] {
  // 1 + total + reticências dos dois lados + janela ao redor da atual
  const posicoes = vizinhos * 2 + 5;

  if (total <= posicoes) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const inicioJanela = Math.max(atual - vizinhos, 1);
  const fimJanela = Math.min(atual + vizinhos, total);

  const mostrarReticenciasEsquerda = inicioJanela > 2;
  const mostrarReticenciasDireita = fimJanela < total - 1;

  if (!mostrarReticenciasEsquerda && mostrarReticenciasDireita) {
    const tamanho = vizinhos * 2 + 3;
    return [...Array.from({ length: tamanho }, (_, i) => i + 1), RETICENCIAS, total];
  }

  if (mostrarReticenciasEsquerda && !mostrarReticenciasDireita) {
    const tamanho = vizinhos * 2 + 3;
    return [
      1,
      RETICENCIAS,
      ...Array.from({ length: tamanho }, (_, i) => total - tamanho + 1 + i),
    ];
  }

  return [
    1,
    RETICENCIAS,
    ...Array.from({ length: fimJanela - inicioJanela + 1 }, (_, i) => inicioJanela + i),
    RETICENCIAS,
    total,
  ];
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  vizinhos = 1,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const itens = montarPaginas(currentPage, totalPages, vizinhos);

  return (
    <nav aria-label="Paginação" className="flex flex-col items-center gap-3 pt-4">
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-colors hover:border-primary-300 hover:text-primary-600 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Página anterior"
        >
          <HiChevronLeft className="h-4 w-4" />
        </button>

        {itens.map((item, idx) =>
          item === RETICENCIAS ? (
            <span
              key={`r-${idx}`}
              aria-hidden
              className="flex h-10 w-8 items-center justify-center text-gray-400"
            >
              …
            </span>
          ) : (
            <button
              key={item}
              onClick={() => onPageChange(item)}
              aria-current={item === currentPage ? 'page' : undefined}
              aria-label={`Página ${item}`}
              className={clsx(
                'flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300',
                item === currentPage
                  ? 'bg-primary-900 text-white shadow-[0_10px_24px_-12px_rgba(30,63,153,0.7)]'
                  : 'text-gray-600 hover:bg-gray-100',
              )}
            >
              {item}
            </button>
          ),
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-colors hover:border-primary-300 hover:text-primary-600 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Próxima página"
        >
          <HiChevronRight className="h-4 w-4" />
        </button>
      </div>

      <p className="text-xs text-gray-500">
        Página {currentPage} de {totalPages}
      </p>
    </nav>
  );
}
