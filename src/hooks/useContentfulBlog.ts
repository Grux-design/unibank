import { useQuery } from "@tanstack/react-query";
import { contentfulFetch } from "@/integrations/contentful/client";
import type {
  ContentfulAsset,
  ContentfulCollection,
  ContentfulEntry,
  BlogFields,
  ResolvedBlog,
} from "@/integrations/contentful/types";

function resolveAssetUrl(url?: string): string | undefined {
  if (!url) return undefined;
  return url.startsWith("//") ? `https:${url}` : url;
}

function buildAssetMap(
  includes?: ContentfulCollection<unknown>["includes"],
): Map<string, ContentfulAsset> {
  const map = new Map<string, ContentfulAsset>();
  includes?.Asset?.forEach((a) => {
    if (a.fields?.file?.url) {
      a.fields.file.url = resolveAssetUrl(a.fields.file.url) ?? a.fields.file.url;
    }
    map.set(a.sys.id, a);
  });
  return map;
}

function resolveAssetRef(
  ref: unknown,
  assetMap: Map<string, ContentfulAsset>,
): ContentfulAsset | undefined {
  if (!ref) return undefined;
  const r = ref as { sys?: { id?: string }; fields?: ContentfulAsset["fields"] };
  if (r.fields?.file) {
    const asset = ref as ContentfulAsset;
    if (asset.fields?.file?.url) {
      asset.fields.file.url =
        resolveAssetUrl(asset.fields.file.url) ?? asset.fields.file.url;
    }
    return asset;
  }
  const id = r.sys?.id;
  if (!id) return undefined;
  return assetMap.get(id);
}

function entryToBlog(
  entry: ContentfulEntry<BlogFields>,
  assetMap: Map<string, ContentfulAsset>,
): ResolvedBlog {
  const f = entry.fields;
  return {
    sys: entry.sys,
    title: f.title,
    slug: f.slug,
    excerpt: f.excerpt,
    thumbnail: resolveAssetRef(f.thumbnail, assetMap),
    content: f.content,
    category: f.category,
    author: f.author,
    publishedDate: f.publishedDate,
  };
}

/* ── Public hooks ─────────────────────────────────────── */

export function useContentfulBlogList() {
  return useQuery({
    queryKey: ["contentful-blog-list"],
    queryFn: async () => {
      const data = await contentfulFetch<ContentfulCollection<BlogFields>>(
        "/entries",
        { content_type: "blog", include: "2" },
      );
      const assetMap = buildAssetMap(data.includes);
      const posts = data.items.map((e) => entryToBlog(e, assetMap));
      posts.sort((a, b) => {
        const ad = a.publishedDate
          ? new Date(a.publishedDate).getTime()
          : new Date(a.sys.createdAt).getTime();
        const bd = b.publishedDate
          ? new Date(b.publishedDate).getTime()
          : new Date(b.sys.createdAt).getTime();
        return bd - ad;
      });
      return posts;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export interface BlogPostResult {
  post: ResolvedBlog;
  assetMap: Map<string, ContentfulAsset>;
}

export function useContentfulBlogPost(slug: string | undefined) {
  return useQuery({
    queryKey: ["contentful-blog-post", slug],
    enabled: Boolean(slug),
    queryFn: async (): Promise<BlogPostResult> => {
      const data = await contentfulFetch<ContentfulCollection<BlogFields>>(
        "/entries",
        {
          content_type: "blog",
          "fields.slug": slug!,
          include: "4",
        },
      );
      const raw = data.items[0];
      if (!raw) throw new Error(`No blog post found for slug: "${slug}"`);
      const assetMap = buildAssetMap(data.includes);
      return { post: entryToBlog(raw, assetMap), assetMap };
    },
    staleTime: 1000 * 60 * 5,
  });
}
