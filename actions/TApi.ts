import { apiFetch } from "./apiFetch";
import { cookies } from "next/headers";

async function getHeaders() {
  const token = (await cookies()).get("metricas_token")?.value;
  return {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };
}

export const api = {
  get: <T>(
    url: string,
    options?: Omit<Parameters<typeof apiFetch>[1], "method">,
  ) => apiFetch<T>(url, { ...getHeaders(), ...options, method: "GET" }),

  post: <T>(
    url: string,
    body?: unknown,
    options?: Omit<Parameters<typeof apiFetch>[1], "method" | "body">,
  ) => apiFetch<T>(url, { ...getHeaders(), ...options, method: "POST", body }),

  patch: <T>(
    url: string,
    body?: unknown,
    options?: Omit<Parameters<typeof apiFetch>[1], "method" | "body">,
  ) => apiFetch<T>(url, { ...getHeaders(), ...options, method: "PATCH", body }),

  delete: <T>(
    url: string,
    options?: Omit<Parameters<typeof apiFetch>[1], "method">,
  ) => apiFetch<T>(url, { ...getHeaders(), ...options, method: "DELETE" }),
};
