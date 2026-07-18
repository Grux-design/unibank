import { useEffect, useState } from "react";
import { PageMastheadClassic, type PageMastheadProps } from "@/components/organisms/PageMastheadClassic";
import { PageMastheadEditorial } from "@/components/organisms/PageMastheadEditorial";
import {
  getPageMastheadVariant,
  PAGE_MASTHEAD_VARIANT_EVENT,
} from "@/constants/pageMastheadVariant";

export type { PageMastheadProps };

/**
 * Internal-page masthead router.
 * - `editorial` (default on cursor/masthead-editorial): open warm band, typography-first
 * - `classic`: beige card shell (previous iteration)
 *
 * In dev, toggle via the badge bottom-left or localStorage key `dev-page-masthead-variant`.
 */
export function PageMasthead(props: PageMastheadProps) {
  const [variant, setVariant] = useState(getPageMastheadVariant);

  useEffect(() => {
    const sync = () => setVariant(getPageMastheadVariant());
    window.addEventListener(PAGE_MASTHEAD_VARIANT_EVENT, sync);
    return () => window.removeEventListener(PAGE_MASTHEAD_VARIANT_EVENT, sync);
  }, []);

  if (variant === "editorial") {
    return <PageMastheadEditorial {...props} />;
  }

  return <PageMastheadClassic {...props} />;
}
