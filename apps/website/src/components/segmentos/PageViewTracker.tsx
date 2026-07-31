'use client';

import { useEffect } from 'react';

/**
 * Registra 1 acesso por carregamento de landing — dispara uma vez, silenciosamente
 * (nunca deve travar a navegação nem aparecer erro pro visitante se a chamada falhar).
 *
 * `sector` é opcional: páginas de segmento têm um setor fixo, páginas de tecnologia não
 * (recebem visitante de qualquer indústria) e são contadas pela `route`.
 */
export function PageViewTracker({ route, sector }: { route: string; sector?: string }) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/page-views`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        route,
        sector,
        referrer: document.referrer || undefined,
        utmSource: params.get('utm_source') || undefined,
        utmMedium: params.get('utm_medium') || undefined,
        utmCampaign: params.get('utm_campaign') || undefined,
      }),
    }).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
