'use client';

import { useEffect } from 'react';

/**
 * Conta uma visita na ficha do ingrediente (alimenta o ranking do painel).
 *
 * Dispara uma vez por montagem e ignora falha de propósito: telemetria nunca pode
 * atrapalhar a leitura da página. O guard de StrictMode evita contar em dobro no dev,
 * onde o React monta o efeito duas vezes.
 */
export function RegistrarVisita({ slug }: { slug: string }) {
  useEffect(() => {
    let cancelado = false;

    const timer = setTimeout(() => {
      if (cancelado) return;
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ingredients/slug/${slug}/visita`, {
        method: 'POST',
        keepalive: true,
      }).catch(() => {});
    }, 0);

    return () => {
      cancelado = true;
      clearTimeout(timer);
    };
  }, [slug]);

  return null;
}
