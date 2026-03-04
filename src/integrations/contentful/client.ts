const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID as string;
const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN as string;

export const CONTENTFUL_SPACE_ID = SPACE_ID;
export const CONTENTFUL_BASE_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master`;

export async function contentfulFetch<T>(
  path: string,
  params: Record<string, string> = {}
): Promise<T> {
  const url = new URL(`${CONTENTFUL_BASE_URL}${path}`);
  url.searchParams.set("access_token", ACCESS_TOKEN);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Contentful API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}
