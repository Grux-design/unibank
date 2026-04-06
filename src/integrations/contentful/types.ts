export interface ContentfulSys {
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  locale?: string;
  contentType?: {
    sys: {
      id: string;
      type: string;
      linkType: string;
    };
  };
}

export interface ContentfulLink {
  sys: {
    type: "Link";
    linkType: "Entry" | "Asset";
    id: string;
  };
}

export interface ContentfulAssetFile {
  url: string;
  details: {
    size: number;
    image?: { width: number; height: number };
  };
  fileName: string;
  contentType: string;
}

export interface ContentfulAsset {
  sys: ContentfulSys;
  fields: {
    title: string;
    description?: string;
    file: ContentfulAssetFile;
  };
}

export interface ContentfulEntry<T> {
  sys: ContentfulSys;
  fields: T;
}

export interface ContentfulCollection<T> {
  sys: { type: string };
  total: number;
  skip: number;
  limit: number;
  items: ContentfulEntry<T>[];
  includes?: {
    Asset?: ContentfulAsset[];
    Entry?: ContentfulEntry<unknown>[];
  };
}

/* ── Domain-specific field types ─────────────────────────── */

export interface SeoMetadataFields {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: ContentfulLink;
}

export interface FeatureItemFields {
  title: string;
  description?: string;
  icon?: ContentfulAsset;
  image?: ContentfulAsset | ContentfulLink;
  question?: string;
  answer?: string;
  link?: string;
}

export interface SectionFields {
  type: string;
  title?: string;
  internalName?: string;
  headline?: string;
  subheadline?: string;
  mainImage?: ContentfulLink | ContentfulAsset;
  showForm?: boolean;
  copy?: string;
  secondaryCta?: string;
  items?: (ContentfulLink | ContentfulEntry<FeatureItemFields>)[];
}

export interface PageFields {
  title: string;
  slug: string;
  sections?: (ContentfulLink | ContentfulEntry<SectionFields>)[];
  seoMetadata?: ContentfulLink | ContentfulEntry<SeoMetadataFields>;
}

/* ── Resolved types (after includes are resolved) ───────── */

export interface ResolvedFeatureItem {
  sys: ContentfulSys;
  title: string;
  description?: string;
  icon?: ContentfulAsset;
  image?: ContentfulAsset;
  question?: string;
  answer?: string;
  link?: string;
}

export interface ResolvedSection {
  sys: ContentfulSys;
  type: string;
  title?: string;
  internalName?: string;
  headline?: string;
  subheadline?: string;
  mainImage?: ContentfulAsset;
  showForm?: boolean;
  copy?: string;
  secondaryCta?: string;
  items?: ResolvedFeatureItem[];
}

export interface ResolvedPage {
  sys: ContentfulSys;
  title: string;
  slug: string;
  sections: ResolvedSection[];
  seoMeta?: {
    title: string;
    description: string;
    canonicalUrl?: string;
  };
}
