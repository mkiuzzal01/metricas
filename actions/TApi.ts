import { apiFetch } from './apiFetch';

export const api = {
  get: <T>(
    url: string,
    options?: Omit<Parameters<typeof apiFetch>[1], 'method'>,
  ) => apiFetch<T>(url, { ...options, method: 'GET' }),

  post: <T>(
    url: string,
    body?: unknown,
    options?: Omit<Parameters<typeof apiFetch>[1], 'method' | 'body'>,
  ) => apiFetch<T>(url, { ...options, method: 'POST', body }),

  patch: <T>(
    url: string,
    body?: unknown,
    options?: Omit<Parameters<typeof apiFetch>[1], 'method' | 'body'>,
  ) => apiFetch<T>(url, { ...options, method: 'PATCH', body }),

  delete: <T>(
    url: string,
    options?: Omit<Parameters<typeof apiFetch>[1], 'method'>,
  ) => apiFetch<T>(url, { ...options, method: 'DELETE' }),
};
