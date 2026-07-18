const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

const PROXY_URL = `${SUPABASE_URL}/functions/v1/contentful-proxy`;

export async function contentfulFetch<T>(
  _path: string,
  params: Record<string, string> = {}
): Promise<T> {
  const url = new URL(PROXY_URL);

  Object.entries(params).forEach(([key, value]) => {
    if (key === "fields.slug") {
      url.searchParams.set("slug", value);
    } else {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url.toString(), {
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_KEY,
    },
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    throw new Error(`Contentful proxy error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}
