import { useEffect, useState } from "react";
import { resolveBreakpoint, type Breakpoint } from "@/constants/breakpoints";

function getInitialBreakpoint(): Breakpoint {
  if (typeof window === "undefined") return "full";
  return resolveBreakpoint(window.innerWidth);
}

/** Unified 3-tier breakpoint: mobile ≤767 · compact 768–1199 · full ≥1200 */
export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(getInitialBreakpoint);

  useEffect(() => {
    const update = () => setBreakpoint(resolveBreakpoint(window.innerWidth));
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return breakpoint;
}

export function useIsMobileBreakpoint(): boolean {
  return useBreakpoint() === "mobile";
}

export function useIsCompactBreakpoint(): boolean {
  return useBreakpoint() === "compact";
}
