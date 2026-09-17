/**
 * Base URL da API.
 * No servidor (SSR, Docker), `API_URL` (se definida) evita hairpin NAT — o container
 * chamaria a si mesmo via domínio público/Traefik. No browser, `API_URL` nunca existe
 * (não tem prefixo NEXT_PUBLIC_), então cai para a URL pública normalmente.
 *
 * Só serve pra `fetch()` feito pelo próprio servidor. Nunca usar pra montar `src` de
 * imagem/link que vai pro HTML entregue ao navegador — o navegador não resolve o
 * hostname interno do Docker. `/uploads/…` é servido via rewrite pelo próprio domínio do
 * site (`next.config.js`), então `src`/`href` de asset usa o path relativo puro, sem
 * precisar de outra constante aqui (ver `resolveAssetUrl`/`resolveMediaUrl` em `api.ts`).
 */
export const API_BASE_URL =
  process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
