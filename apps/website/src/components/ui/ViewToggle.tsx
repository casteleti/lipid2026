'use client';

import clsx from 'clsx';
import { HiSquares2X2, HiBars3 } from 'react-icons/hi2';

export type ModoVisualizacao = 'grade' | 'lista';

interface ViewToggleProps {
  valor: ModoVisualizacao;
  onChange: (modo: ModoVisualizacao) => void;
  className?: string;
}

const OPCOES: { valor: ModoVisualizacao; rotulo: string; Icone: typeof HiSquares2X2 }[] = [
  { valor: 'grade', rotulo: 'Grade', Icone: HiSquares2X2 },
  { valor: 'lista', rotulo: 'Listagem', Icone: HiBars3 },
];

/**
 * Alternador de visualização, no padrão de e-commerce.
 *
 * `role="radiogroup"` em vez de dois botões soltos: são opções mutuamente exclusivas de
 * um mesmo controle, e é isso que faz o leitor de tela anunciar "1 de 2 selecionado" em
 * vez de dois botões sem relação entre si.
 */
export function ViewToggle({ valor, onChange, className }: ViewToggleProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Modo de visualização"
      className={clsx('inline-flex items-center gap-1 rounded-full bg-gray-100 p-1', className)}
    >
      {OPCOES.map(({ valor: v, rotulo, Icone }) => {
        const ativo = valor === v;
        return (
          <button
            key={v}
            type="button"
            role="radio"
            aria-checked={ativo}
            aria-label={rotulo}
            title={rotulo}
            onClick={() => onChange(v)}
            className={clsx(
              'inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-300',
              ativo
                ? 'bg-white text-gray-900 shadow-[0_6px_16px_-8px_rgba(15,23,42,0.35)]'
                : 'text-gray-500 hover:text-gray-800',
            )}
          >
            <Icone className="h-4 w-4" />
            <span className="hidden sm:inline">{rotulo}</span>
          </button>
        );
      })}
    </div>
  );
}
