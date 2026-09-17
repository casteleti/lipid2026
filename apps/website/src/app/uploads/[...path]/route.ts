import { NextRequest, NextResponse } from 'next/server';
import { API_BASE_URL } from '@/lib/api-url';

/**
 * Proxy pra `/uploads/…` da API, servido pelo próprio domínio do site.
 *
 * Precisa ser uma Route Handler (roda por request, no servidor) e não um `rewrites()` de
 * `next.config.js` — aquilo é resolvido em `next build` e o destino fica congelado no
 * routes-manifest; como `API_URL` é runtime-only no Coolify (não existe em build-time), o
 * destino acabaria gravado com `NEXT_PUBLIC_API_URL` (o domínio público da API) mesmo assim.
 * Aqui, `API_BASE_URL` é lido a cada request, igual todo outro fetch server-side do projeto —
 * resolve pra `API_URL` (endereço interno do Docker) em produção.
 *
 * Isso evita o hairpin NAT do incidente 2026-09-11 tanto pro navegador (que agora busca
 * `/uploads/…` no próprio domínio do site, sem CORS/mixed content) quanto pro otimizador de
 * imagem do Next (`/_next/image`, que busca essa mesma URL no servidor).
 */
export async function GET(_request: NextRequest, { params }: { params: { path: string[] } }) {
  const upstream = `${API_BASE_URL}/uploads/${params.path.map(encodeURIComponent).join('/')}`;
  const upstreamResponse = await fetch(upstream);

  if (!upstreamResponse.ok || !upstreamResponse.body) {
    return new NextResponse(null, { status: upstreamResponse.status });
  }

  const headers = new Headers();
  const contentType = upstreamResponse.headers.get('content-type');
  if (contentType) headers.set('content-type', contentType);
  const contentLength = upstreamResponse.headers.get('content-length');
  if (contentLength) headers.set('content-length', contentLength);
  headers.set('cache-control', upstreamResponse.headers.get('cache-control') || 'public, max-age=31536000, immutable');

  return new NextResponse(upstreamResponse.body, { status: 200, headers });
}
