const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

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

export function resolveMediaUrl(path?: string | null): string {
  if (!path) return '';
  return path.startsWith('http') ? path : `${API_URL}${path}`;
}

/**
 * Um campo de imagem do CMS pode apontar para um upload da API (`/uploads/…`) ou para um
 * asset versionado no próprio site (`/sobre/…`, `/tecnologias/…`). Só o primeiro precisa do
 * prefixo da API; `resolveMediaUrl` prefixaria os dois e quebraria o segundo.
 */
export function resolveAssetUrl(path?: string | null): string {
  if (!path) return '';
  if (path.startsWith('http') || !path.startsWith('/uploads')) return path;
  return `${API_URL}${path}`;
}
