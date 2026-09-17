/**
 * Base URL da API.
 * No servidor (SSR, Docker), `API_URL` (se definida) evita hairpin NAT — o container
 * chamaria a si mesmo via domínio público/Traefik. No browser, `API_URL` nunca existe
 * (não tem prefixo NEXT_PUBLIC_), então cai para a URL pública normalmente.
 *
 * Só serve pra `fetch()` feito pelo próprio servidor. Nunca usar pra montar `src` de
 * imagem/link que vai pro HTML entregue ao navegador — o navegador não resolve o
 * hostname interno do Docker. Pra isso, usar `PUBLIC_API_URL`.
 */
export const API_BASE_URL =
  process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

/**
 * URL da API alcançável pelo navegador do visitante — sempre a pública, nunca a interna
 * do Docker (`API_URL`), mesmo quando resolvida durante SSR. Usar em qualquer `src`/`href`
 * de asset (`resolveAssetUrl`, `resolveMediaUrl`) que acaba no HTML renderizado.
 */
export const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
