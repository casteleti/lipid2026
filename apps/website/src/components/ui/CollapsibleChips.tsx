'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import clsx from 'clsx';

export interface ChipOption {
  valor: string;
  rotulo: string;
  contagem?: number;
}

interface CollapsibleChipsProps {
  opcoes: ChipOption[];
  selecionado: string;
  onSelect: (valor: string) => void;
  /** Primeiro chip, que limpa o filtro. */
  rotuloTodos?: string;
  /** Quantas linhas ficam visíveis quando recolhido. */
  linhasVisiveis?: number;
  className?: string;
}

/**
 * Lista de filtros que mostra só as primeiras linhas e revela o resto deslizando.
 *
 * Com dezenas de categorias, exibir tudo de uma vez empurra a listagem para fora da tela —
 * o visitante rola um paredão de chips antes de ver um único produto.
 *
 * A altura recolhida é MEDIDA, não fixa: os chips têm larguras diferentes e quebram de
 * forma distinta em cada largura de tela, então não há como prever quantos cabem por linha.
 * Medimos o `offsetTop` de cada chip para descobrir onde cada linha termina, e refazemos a
 * conta quando a tela muda de tamanho.
 */
export function CollapsibleChips({
  opcoes,
  selecionado,
  onSelect,
  rotuloTodos = 'Todos',
  linhasVisiveis = 2,
  className,
}: CollapsibleChipsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [aberto, setAberto] = useState(false);
  const [alturaRecolhida, setAlturaRecolhida] = useState<number | null>(null);
  const [ocultos, setOcultos] = useState(0);

  const medir = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const filhos = Array.from(container.children) as HTMLElement[];
    if (!filhos.length) return;

    // Posição RELATIVA ao container. `offsetTop` não serve: ele é medido a partir do
    // offsetParent, que aqui é um ancestral posicionado bem acima — os valores vinham
    // centenas de pixels maiores que a própria altura do bloco, e o recorte nunca cortava
    // nada. getBoundingClientRect não depende de quem é o offsetParent.
    const topoContainer = container.getBoundingClientRect().top;
    const posicoes = filhos.map((filho) => {
      const rect = filho.getBoundingClientRect();
      return { topo: rect.top - topoContainer, altura: rect.height };
    });

    // Agrupa por linha. Tolerância de 2px porque sub-pixel de layout faz elementos da
    // mesma linha diferirem por frações.
    const linhas: { topo: number; fundo: number }[] = [];
    for (const { topo, altura } of posicoes) {
      const existente = linhas.find((l) => Math.abs(l.topo - topo) <= 2);
      if (existente) {
        existente.fundo = Math.max(existente.fundo, topo + altura);
      } else {
        linhas.push({ topo, fundo: topo + altura });
      }
    }

    if (linhas.length <= linhasVisiveis) {
      setAlturaRecolhida(null); // cabe tudo: nem precisa do botão
      setOcultos(0);
      return;
    }

    const corte = linhas[linhasVisiveis - 1].fundo;
    setAlturaRecolhida(corte);
    setOcultos(posicoes.filter((p) => p.topo > corte).length);
  }, [linhasVisiveis]);

  // useLayoutEffect: mede antes da pintura, para não haver um quadro com tudo aberto.
  useLayoutEffect(() => {
    medir();
  }, [medir, opcoes]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(() => medir());
    observer.observe(container);
    return () => observer.disconnect();
  }, [medir]);

  // Se o filtro ativo está numa linha escondida, abre: caso contrário o visitante veria
  // a lista filtrada sem enxergar qual filtro está aplicado.
  useEffect(() => {
    const container = containerRef.current;
    if (!container || aberto || alturaRecolhida === null) return;

    const ativo = container.querySelector('[data-ativo="true"]') as HTMLElement | null;
    if (!ativo) return;

    const relativo = ativo.getBoundingClientRect().top - container.getBoundingClientRect().top;
    if (relativo > alturaRecolhida) setAberto(true);
  }, [selecionado, aberto, alturaRecolhida]);

  const podeRecolher = alturaRecolhida !== null;

  return (
    <div className={className}>
      <div
        ref={containerRef}
        className="flex flex-wrap gap-2 transition-[max-height] duration-500 ease-brand"
        style={{
          maxHeight: podeRecolher && !aberto ? alturaRecolhida : undefined,
          overflow: podeRecolher && !aberto ? 'hidden' : undefined,
        }}
      >
        <button
          type="button"
          onClick={() => onSelect('')}
          data-ativo={selecionado === '' ? 'true' : undefined}
          aria-pressed={selecionado === ''}
          className={clsx(
            'rounded-full px-4 py-2 text-sm font-medium transition-all duration-300',
            selecionado === ''
              ? 'bg-primary-600 text-white shadow-[0_10px_24px_-12px_rgba(30,63,153,0.7)]'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
          )}
        >
          {rotuloTodos}
        </button>

        {opcoes.map((op) => (
          <button
            key={op.valor}
            type="button"
            onClick={() => onSelect(op.valor === selecionado ? '' : op.valor)}
            data-ativo={selecionado === op.valor ? 'true' : undefined}
            aria-pressed={selecionado === op.valor}
            className={clsx(
              'rounded-full px-4 py-2 text-sm font-medium transition-all duration-300',
              selecionado === op.valor
                ? 'bg-primary-600 text-white shadow-[0_10px_24px_-12px_rgba(30,63,153,0.7)]'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
            )}
          >
            {op.rotulo}
            {typeof op.contagem === 'number' && (
              <span className="ml-1.5 opacity-60">{op.contagem}</span>
            )}
          </button>
        ))}
      </div>

      {podeRecolher && (
        <button
          type="button"
          onClick={() => setAberto((a) => !a)}
          aria-expanded={aberto}
          className="group mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
        >
          {aberto ? 'Mostrar menos' : `Exibir todas${ocultos ? ` (+${ocultos})` : ''}`}
          <span
            aria-hidden
            className={clsx(
              'transition-transform duration-500 ease-brand',
              aberto ? 'rotate-180' : 'group-hover:translate-y-0.5',
            )}
          >
            ⌄
          </span>
        </button>
      )}
    </div>
  );
}
