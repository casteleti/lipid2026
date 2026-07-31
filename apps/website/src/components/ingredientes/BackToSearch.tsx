'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

/** Chave onde a listagem guarda a querystring da última busca. */
export const CHAVE_BUSCA = 'lipid:ingredientes:busca';

/**
 * Retoma a listagem no estado em que a pessoa a deixou (termo buscado, categoria e página).
 *
 * Usa sessionStorage em vez de router.back() porque o histórico não é confiável aqui: quem
 * chega por link direto, busca do Google ou pelo bloco "Conheça também" não tem uma listagem
 * atrás. Sem estado salvo, o botão ainda leva à listagem limpa.
 */
export function BackToSearch() {
  const [href, setHref] = useState('/ingredientes');
  const [temFiltro, setTemFiltro] = useState(false);

  useEffect(() => {
    try {
      const salvo = sessionStorage.getItem(CHAVE_BUSCA);
      if (salvo) {
        setHref(`/ingredientes?${salvo}`);
        setTemFiltro(true);
      }
    } catch {
      // sessionStorage bloqueado (modo restrito): mantém o link limpo.
    }
  }, []);

  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-900 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.4)] transition-all duration-500 ease-brand hover:-translate-x-0.5 hover:border-primary-200 hover:shadow-[0_16px_40px_-18px_rgba(30,63,153,0.4)] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
    >
      <span
        aria-hidden
        className="transition-transform duration-500 ease-brand group-hover:-translate-x-1"
      >
        ←
      </span>
      Voltar na sua pesquisa
      {temFiltro && (
        <span className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700">
          filtros preservados
        </span>
      )}
    </Link>
  );
}
