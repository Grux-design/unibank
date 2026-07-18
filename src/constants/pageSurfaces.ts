/** Page-level surface palette — aligned with homepage hero card (#F2EFED) */
export const PAGE_SURFACES = {
  page: "#FFFFFF",
  masthead: "#F2EFED",
  warm: "#FAF8F6",
  subtle: "#F5F2F0",
  /** funOrange/50 — benefit panels, footer */
  accent: "#FBF4F0",
  border: "#E7E4E1",
} as const;

export type PageSurface = "white" | "warm" | "subtle" | "accent";

/** Alternating bands after the beige masthead: white → warm → white … */
export function getContentSectionSurface(index: number): PageSurface {
  return index % 2 === 0 ? "white" : "warm";
}

/** Card fill that contrasts with its parent section surface */
export function getSectionCardSurface(sectionSurface: PageSurface): string {
  return sectionSurface === "white" ? PAGE_SURFACES.warm : PAGE_SURFACES.page;
}

export const PAGE_SURFACE_CLASS: Record<PageSurface, string> = {
  white: "page-surface-white",
  warm: "page-surface-warm",
  subtle: "page-surface-subtle",
  accent: "page-surface-accent",
};
