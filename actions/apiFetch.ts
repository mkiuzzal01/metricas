const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL! as string;

export type FetchOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: HeadersInit;
  cache?: RequestCache;
  revalidate?: number | false;
  tags?: string[];
};

export async function apiFetch<T>(
  url: string,
  options: FetchOptions = {},
): Promise<T> {
  const {
    method = "GET",
    body,
    headers,
    cache = "force-cache",
    revalidate,
    tags,
  } = options;

  const isMutation = method !== "GET";

  const res = await fetch(`${API_BASE_URL}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,

    cache: isMutation ? "no-store" : cache,

    next:
      !isMutation && (typeof revalidate === "number" || tags)
        ? { revalidate, tags }
        : undefined,
  });

  if (!res.ok) {
    throw {
      status: res.status,
      message: res.statusText,
      data: await res.json().catch(() => null),
    };
  }

  return res.json();
}
