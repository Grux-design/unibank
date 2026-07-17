import { useEffect, useState } from "react";
import { COMPACT_MIN, FULL_MIN, MOBILE_MAX } from "@/constants/breakpoints";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const LABELS = {
  mobile: "Mobile",
  compact: "Tablet",
  full: "Desktop",
} as const;

/**
 * Dev-only overlay — shows active breakpoint while resizing the browser.
 * Hidden in production builds.
 */
export function ViewportDebugBadge() {
  const breakpoint = useBreakpoint();
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  if (!import.meta.env.DEV) return null;

  return (
    <div
      aria-hidden
      className="fixed bottom-4 left-4 z-[9999] pointer-events-none select-none rounded-xl border border-border bg-background/95 px-3 py-2 font-mono text-[11px] leading-tight text-foreground shadow-none backdrop-blur-sm"
    >
      <div className="font-semibold text-primary">{LABELS[breakpoint]}</div>
      <div className="mt-0.5 text-muted-foreground">{width}px</div>
      <div className="mt-1 text-[10px] text-muted-foreground/80">
        ≤{MOBILE_MAX} · {COMPACT_MIN}–{FULL_MIN - 1} · ≥{FULL_MIN}
      </div>
    </div>
  );
}
