import { useEffect, useState } from "react";
import { COMPACT_MIN, FULL_MIN, MOBILE_MAX } from "@/constants/breakpoints";
import {
  getPageMastheadVariant,
  setPageMastheadVariant,
  type PageMastheadVariant,
} from "@/constants/pageMastheadVariant";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const LABELS = {
  mobile: "Mobile",
  compact: "Tablet",
  full: "Desktop",
} as const;

/**
 * Dev-only overlay — breakpoint + hero variant toggle while iterating.
 */
export function ViewportDebugBadge() {
  const breakpoint = useBreakpoint();
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );
  const [heroVariant, setHeroVariant] = useState<PageMastheadVariant>(getPageMastheadVariant);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const sync = () => setHeroVariant(getPageMastheadVariant());
    window.addEventListener("page-masthead-variant-change", sync);
    return () => window.removeEventListener("page-masthead-variant-change", sync);
  }, []);

  if (!import.meta.env.DEV) return null;

  const toggleHero = () => {
    setPageMastheadVariant(heroVariant === "editorial" ? "classic" : "editorial");
  };

  return (
    <div
      aria-hidden
      className="fixed bottom-4 left-4 z-[9999] select-none rounded-xl border border-border bg-background/95 px-3 py-2 font-mono text-[11px] leading-tight text-foreground backdrop-blur-sm"
    >
      <div className="font-semibold text-primary">{LABELS[breakpoint]}</div>
      <div className="mt-0.5 text-muted-foreground">{width}px</div>
      <div className="mt-1 text-[10px] text-muted-foreground/80">
        ≤{MOBILE_MAX} · {COMPACT_MIN}–{FULL_MIN - 1} · ≥{FULL_MIN}
      </div>
      <button
        type="button"
        onClick={toggleHero}
        className="mt-2 w-full rounded-md border border-border bg-muted/50 px-2 py-1 text-[10px] font-medium text-foreground pointer-events-auto hover:bg-muted transition-colors"
      >
        Hero: {heroVariant === "editorial" ? "Editorial" : "Classic"} ↻
      </button>
    </div>
  );
}
