'use client';

import clsx from 'clsx';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1,
  );

  return (
    <div className="flex items-center justify-center gap-2 pt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-colors hover:border-primary-300 hover:text-primary-600 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Página anterior"
      >
        <HiChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((page, idx) => (
        <span key={page} className="flex items-center gap-2">
          {idx > 0 && pages[idx - 1] !== page - 1 && <span className="text-gray-400">…</span>}
          <button
            onClick={() => onPageChange(page)}
            className={clsx(
              'flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors',
              page === currentPage
                ? 'bg-primary-900 text-white'
                : 'text-gray-600 hover:bg-gray-100',
            )}
          >
            {page}
          </button>
        </span>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-colors hover:border-primary-300 hover:text-primary-600 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Próxima página"
      >
        <HiChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
