import type { PageMastheadContent, PageMastheadPreset } from "@/types/pageMasthead";

/** Default layout rules per preset — edit once to restyle every page using that preset. */
export const PAGE_MASTHEAD_PRESETS: Record<PageMastheadPreset, PageMastheadContent> = {
  /** Institutional / footer pages — text only, left aligned, gray left texture */
  text: {
    preset: "text",
    align: "left",
    title: "",
  },
  /** Product landing pages — optional image, highlight, masthead CTAs */
  product: {
    preset: "product",
    align: "left",
    title: "",
  },
  /** Contentful Hero - Form sections */
  "cms-product": {
    preset: "cms-product",
    align: "left",
    title: "",
  },
};
