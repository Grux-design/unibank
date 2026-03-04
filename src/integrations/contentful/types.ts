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
