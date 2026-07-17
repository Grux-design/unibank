export type PageMastheadVariant = "classic" | "editorial";

const STORAGE_KEY = "dev-page-masthead-variant";

/** Default hero for internal pages on this branch — flip to "classic" to compare. */
const DEFAULT_VARIANT: PageMastheadVariant = "editorial";

export function getPageMastheadVariant(): PageMastheadVariant {
  if (import.meta.env.DEV && typeof window !== "undefined") {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "classic" || stored === "editorial") return stored;
  }

  const env = import.meta.env.VITE_PAGE_MASTHEAD_VARIANT;
  if (env === "classic" || env === "editorial") return env;

  return DEFAULT_VARIANT;
}

export function setPageMastheadVariant(variant: PageMastheadVariant) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, variant);
  window.dispatchEvent(new Event("page-masthead-variant-change"));
}

export const PAGE_MASTHEAD_VARIANT_EVENT = "page-masthead-variant-change";
