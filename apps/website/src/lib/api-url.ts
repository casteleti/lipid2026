/**
 * Base URL da API.
 * No servidor (SSR, Docker), `API_URL` (se definida) evita hairpin NAT — o container
 * chamaria a si mesmo via domínio público/Traefik. No browser, `API_URL` nunca existe
 * (não tem prefixo NEXT_PUBLIC_), então cai para a URL pública normalmente.
 */
export const API_BASE_URL =
  process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
