'use client';

import { useEffect } from 'react';

/** Conta a leitura do conteúdo. Ignora falha: telemetria não atrapalha a página. */
export function RegistrarVisitaConteudo({ slug }: { slug: string }) {
  useEffect(() => {
    let cancelado = false;

    const timer = setTimeout(() => {
      if (cancelado) return;
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/content/slug/${slug}/visita`, {
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
