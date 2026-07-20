import type { ReactNode } from "react";
import {
  BarChart3,
  Leaf,
  Mail,
  MapPin,
  Newspaper,
  ShieldCheck,
  Sparkles,
} from "@/lib/icons";
import { PAGE_MASTHEAD_PRESETS } from "@/constants/pageMastheadPresets";
import { getPageMastheadConfig } from "@/constants/pageMastheads";
import type { PageMastheadProps } from "@/components/organisms/PageMastheadClassic";
import type {
  PageMastheadContent,
  PageMastheadEyebrow,
  PageMastheadIconKey,
  PageMastheadOverrides,
  PageMastheadPreset,
} from "@/types/pageMasthead";

const MASTHEAD_ICON_MAP = {
  shield: ShieldCheck,
  leaf: Leaf,
  "bar-chart": BarChart3,
  sparkles: Sparkles,
  newspaper: Newspaper,
  "map-pin": MapPin,
  mail: Mail,
} as const;

export function renderPageMastheadEyebrow(eyebrow: string | PageMastheadEyebrow): ReactNode {
  if (typeof eyebrow === "string") return eyebrow;

  const Icon = eyebrow.icon ? MASTHEAD_ICON_MAP[eyebrow.icon] : null;
  return (
    <>
      {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
      {eyebrow.label}
    </>
  );
}

function mergeMastheadContent(
  ...layers: Array<PageMastheadContent | PageMastheadOverrides | undefined>
): PageMastheadContent {
  return layers.reduce<PageMastheadContent>(
    (acc, layer) => ({ ...acc, ...layer }),
    PAGE_MASTHEAD_PRESETS.text,
  );
}

export function resolvePageMastheadContent({
  page,
  preset = "text",
  ...overrides
}: {
  page?: keyof typeof import("@/constants/pageMastheads").PAGE_MASTHEADS;
  preset?: PageMastheadPreset;
} & PageMastheadOverrides): PageMastheadContent {
  const registry = page ? getPageMastheadConfig(page) : undefined;
  const presetDefaults = PAGE_MASTHEAD_PRESETS[preset];
  const registryPreset = registry?.preset
    ? PAGE_MASTHEAD_PRESETS[registry.preset]
    : undefined;

  return mergeMastheadContent(presetDefaults, registryPreset, registry, overrides);
}

export function toPageMastheadProps(content: PageMastheadContent): PageMastheadProps {
  return {
    eyebrow: content.eyebrow ? renderPageMastheadEyebrow(content.eyebrow) : undefined,
    title: content.title,
    titleHtml: content.titleHtml,
    subtitle: content.subtitle,
    highlight: content.highlight,
    imageSrc: content.imageSrc,
    imageAlt: content.imageAlt,
    align: content.align,
  };
}

/** Maps Contentful Hero - Form fields to masthead content */
export function cmsSectionToMastheadContent(section: {
  title?: string;
  headline?: string;
  subheadline?: string;
  mainImage?: { fields?: { file?: { url?: string }; title?: string } };
}): PageMastheadContent {
  const imgSrc = section.mainImage?.fields?.file?.url;
  return {
    preset: "cms-product",
    eyebrow: section.title,
    title: section.headline ?? "",
    titleHtml: section.headline,
    subtitle: section.subheadline,
    imageSrc: imgSrc,
    imageAlt: section.mainImage?.fields?.title ?? section.headline ?? "",
  };
}
