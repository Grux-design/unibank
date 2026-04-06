import { useQuery } from "@tanstack/react-query";
import { contentfulFetch } from "@/integrations/contentful/client";
import type {
  ContentfulCollection,
  ContentfulEntry,
  ContentfulAsset,
  PageFields,
  SectionFields,
  FeatureItemFields,
  SeoMetadataFields,
  ResolvedPage,
  ResolvedSection,
  ResolvedFeatureItem,
} from "@/integrations/contentful/types";

type AnyEntry = ContentfulEntry<Record<string, unknown>>;

function resolveAssetUrl(url?: string): string | undefined {
  if (!url) return undefined;
  return url.startsWith("//") ? `https:${url}` : url;
}

function buildLookups(includes?: ContentfulCollection<unknown>["includes"]) {
  const entryMap = new Map<string, AnyEntry>();
  const assetMap = new Map<string, ContentfulAsset>();

  includes?.Entry?.forEach((e) => entryMap.set(e.sys.id, e as AnyEntry));
  includes?.Asset?.forEach((a) => assetMap.set(a.sys.id, a));

  return { entryMap, assetMap };
}

function resolveAsset(
  ref: unknown,
  assetMap: Map<string, ContentfulAsset>
): ContentfulAsset | undefined {
  if (!ref) return undefined;
  const r = ref as { sys?: { id?: string }; fields?: ContentfulAsset["fields"] };
  // Already resolved
  if (r.fields?.file) {
    const asset = ref as ContentfulAsset;
    if (asset.fields?.file?.url) {
      asset.fields.file.url = resolveAssetUrl(asset.fields.file.url) ?? asset.fields.file.url;
    }
    return asset;
  }
  // Link — look up
  const id = r.sys?.id;
  if (!id) return undefined;
  const asset = assetMap.get(id);
  if (asset?.fields?.file?.url) {
    asset.fields.file.url = resolveAssetUrl(asset.fields.file.url) ?? asset.fields.file.url;
  }
  return asset;
}

function resolveFeatureItem(
  ref: unknown,
  entryMap: Map<string, AnyEntry>,
  assetMap: Map<string, ContentfulAsset>
): ResolvedFeatureItem | undefined {
  let entry: AnyEntry | undefined;

  const r = ref as { sys?: { id?: string }; fields?: unknown };
  if (r.fields) {
    entry = ref as AnyEntry;
  } else {
    const id = r.sys?.id;
    if (!id) return undefined;
    entry = entryMap.get(id);
  }

  if (!entry) return undefined;
  const f = entry.fields as FeatureItemFields & Record<string, unknown>;

  return {
    sys: entry.sys,
    title: (f.title as string) ?? "",
    description: f.description as string | undefined,
    icon: resolveAsset(f.icon, assetMap),
    question: f.question as string | undefined,
    answer: f.answer as string | undefined,
    link: f.link as string | undefined,
  };
}

function resolveSection(
  ref: unknown,
  entryMap: Map<string, AnyEntry>,
  assetMap: Map<string, ContentfulAsset>
): ResolvedSection | undefined {
  let entry: AnyEntry | undefined;

  const r = ref as { sys?: { id?: string }; fields?: unknown };
  if (r.fields) {
    entry = ref as AnyEntry;
  } else {
    const id = r.sys?.id;
    if (!id) return undefined;
    entry = entryMap.get(id);
  }

  if (!entry) return undefined;
  const f = entry.fields as SectionFields & Record<string, unknown>;

  const items = (f.items as unknown[])
    ?.map((item) => resolveFeatureItem(item, entryMap, assetMap))
    .filter((x): x is ResolvedFeatureItem => Boolean(x));

  return {
    sys: entry.sys,
    type: (f.type as string) ?? "",
    title: f.title as string | undefined,
    internalName: f.internalName as string | undefined,
    headline: f.headline as string | undefined,
    subheadline: f.subheadline as string | undefined,
    mainImage: resolveAsset(f.mainImage, assetMap),
    showForm: f.showForm as boolean | undefined,
    secondaryCta: f.secondaryCta as string | undefined,
    items: items?.length ? items : undefined,
  };
}

async function fetchPage(slug: string): Promise<ResolvedPage> {
  const data = await contentfulFetch<ContentfulCollection<PageFields>>("/entries", {
    content_type: "page",
    "fields.slug": slug,
    include: "3",
  });

  const raw = data.items[0];
  if (!raw) throw new Error(`No page found for slug: "${slug}"`);

  const { entryMap, assetMap } = buildLookups(data.includes);
  const f = raw.fields;

  // Resolve sections
  const sections = (f.sections as unknown[] | undefined)
    ?.map((s) => resolveSection(s, entryMap, assetMap))
    .filter((s): s is ResolvedSection => Boolean(s)) ?? [];

  // Resolve SEO metadata
  let seoMeta: ResolvedPage["seoMeta"];
  if (f.seoMetadata) {
    const seoRef = f.seoMetadata as unknown;
    const seoR = seoRef as { sys?: { id?: string }; fields?: unknown };
    let seoEntry: AnyEntry | undefined;
    if (seoR.fields) {
      seoEntry = seoRef as AnyEntry;
    } else {
      const id = seoR.sys?.id;
      if (id) seoEntry = entryMap.get(id);
    }
    if (seoEntry) {
      const sf = seoEntry.fields as unknown as SeoMetadataFields;
      seoMeta = {
        title: sf.title,
        description: sf.description,
        canonicalUrl: sf.canonicalUrl,
      };
    }
  }

  return {
    sys: raw.sys,
    title: f.title,
    slug: f.slug,
    sections,
    seoMeta,
  };
}

export function useContentfulPage(slug: string | undefined) {
  return useQuery({
    queryKey: ["contentful-page", slug],
    queryFn: () => fetchPage(slug!),
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
