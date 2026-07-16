import { useEffect, useState } from "react";
import { resolveBreakpoint, type Breakpoint } from "@/constants/breakpoints";

export type HeaderLayout = Breakpoint;

/** Mobile nav bar + overlay menu for viewports below desktop (mobile + tablet). */
export function isMobileNavLayout(layout: HeaderLayout): boolean {
  return layout !== "full";
}

export function useHeaderLayout(): HeaderLayout {
  const [layout, setLayout] = useState<HeaderLayout>(() =>
    typeof window !== "undefined" ? resolveBreakpoint(window.innerWidth) : "full"
  );

  useEffect(() => {
    const update = () => setLayout(resolveBreakpoint(window.innerWidth));
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return layout;
}
