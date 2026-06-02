import { apiFetch } from "./apiFetch";
import { cookies } from "next/headers";

async function getHeaders() {
  const token = (await cookies()).get("metricas_token")?.value;

  return {
    "Content-Type": "application/json",
    ...(token && {
      Authorization: `Bearer ${token}`,
    }),
  };
}

export const api = {
  get: async <T>(
    url: string,
    options?: Omit<Parameters<typeof apiFetch>[1], "method">,
  ) => {
    const headers = await getHeaders();

    return apiFetch<T>(url, {
      ...options,
      method: "GET",
      headers,
    });
  },

  post: async <T>(
    url: string,
    body?: unknown,
    options?: Omit<Parameters<typeof apiFetch>[1], "method" | "body">,
  ) => {
    const headers = await getHeaders();

    return apiFetch<T>(url, {
      ...options,
      method: "POST",
      body,
      headers,
    });
  },

  patch: async <T>(
    url: string,
    body?: unknown,
    options?: Omit<Parameters<typeof apiFetch>[1], "method" | "body">,
  ) => {
    const headers = await getHeaders();

    return apiFetch<T>(url, {
      ...options,
      method: "PATCH",
      body,
      headers,
    });
  },

  delete: async <T>(
    url: string,
    options?: Omit<Parameters<typeof apiFetch>[1], "method">,
  ) => {
    const headers = await getHeaders();

    return apiFetch<T>(url, {
      ...options,
      method: "DELETE",
      headers,
    });
  },
};
