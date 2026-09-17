import { API_BASE_URL as API_URL } from './api-url';

async function apiCall<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_URL}/api/v1${endpoint}`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
}

export const api = {
  get: <T,>(endpoint: string) => apiCall<T>(endpoint),
  post: <T,>(endpoint: string, data: unknown) =>
    apiCall<T>(endpoint, { method: 'POST', body: JSON.stringify(data) }),
  put: <T,>(endpoint: string, data: unknown) =>
    apiCall<T>(endpoint, { method: 'PUT', body: JSON.stringify(data) }),
  delete: <T,>(endpoint: string) => apiCall<T>(endpoint, { method: 'DELETE' }),
};

export async function getApplications() {
  return api.get('/applications');
}

export async function getTechnologies() {
  return api.get('/technologies');
}

export async function submitContact(data: {
  email: string;
  name?: string;
  phone?: string;
  company?: string;
  message?: string;
  /** Enum `LeadSector` da API (ex.: 'FARMACEUTICA') — quem qualifica o setor no quiz envia. */
  sector?: string;
  pageUrl?: string;
  pageTitle?: string;
  /** Rota normalizada da landing que converteu, ex.: '/especialista'. */
  landingRoute?: string;
}) {
  return api.post('/leads', data);
}

/**
 * `/uploads/…` é servido pelo próprio domínio do site (rewrite em `next.config.js`, proxia
 * pra API internamente) — por isso não precisa mais de prefixo de domínio aqui, só passar o
 * path como veio da API. Caminho relativo também deixa o `openGraph.images` do Next resolver
 * sozinho contra `metadataBase`; onde precisar de URL absoluta de verdade (ex. campo `image`
 * de JSON-LD, que não passa pela resolução do Next), montar na mão com o domínio do site.
 */
export function resolveMediaUrl(path?: string | null): string {
  return path || '';
}

/**
 * Um campo de imagem do CMS pode apontar para um upload da API (`/uploads/…`) ou para um
 * asset versionado no próprio site (`/sobre/…`, `/tecnologias/…`) — os dois já funcionam como
 * path relativo ao domínio do site, então esta função hoje só normaliza `null`/`undefined`.
 * Mantida separada de `resolveMediaUrl` porque os call sites documentam intenções diferentes.
 */
export function resolveAssetUrl(path?: string | null): string {
  return path || '';
}
