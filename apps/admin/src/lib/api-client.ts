const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

async function apiCall<T>(
  endpoint: string,
  options?: RequestInit & { skipAuth?: boolean },
): Promise<T> {
  const { skipAuth = false, ...requestInit } = options || {};

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...requestInit.headers,
  };

  if (!skipAuth) {
    const token = localStorage.getItem('token');
    if (token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${API_URL}/api/v1${endpoint}`, {
    ...requestInit,
    headers,
  });

  if (response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `API error: ${response.statusText}`);
  }

  if (response.status === 204) {
    return null as T;
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

export interface UploadResult {
  url: string;
  filename: string;
  size: number;
  mimetype: string;
}

export async function uploadFile(file: File): Promise<UploadResult> {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/api/v1/upload`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Falha no upload');
  }

  return response.json();
}

export function resolveMediaUrl(path: string): string {
  if (!path) return path;
  return path.startsWith('http') ? path : `${API_URL}${path}`;
}
