const SPACE_ID =
  (import.meta.env.VITE_CONTENTFUL_SPACE_ID as string) || "bsxwchto8q9z";
const ACCESS_TOKEN =
  (import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN as string) ||
  "VNnoM4bYf2n4ABp9XjwWwQ2VxA0qbIsGrxcRjbLJaNs";
const ENVIRONMENT =
  (import.meta.env.VITE_CONTENTFUL_ENVIRONMENT as string) || "master";

export async function contentfulFetch<T>(
  path: string = "/entries",
  params: Record<string, string> = {}
): Promise<T> {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(
    `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}${cleanPath}`
  );

  url.searchParams.set("access_token", ACCESS_TOKEN);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url.toString(), {
    headers: {
      "Content-Type": "application/json",
    },
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    throw new Error(`Contentful API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

