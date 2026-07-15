import { useEffect, useState } from "react";

export type HeaderLayout = "mobile" | "compact" | "full";

const MOBILE_MAX = 767;
const FULL_MIN = 1200;

export function useHeaderLayout(): HeaderLayout {
  const [layout, setLayout] = useState<HeaderLayout>(() => resolveLayout(window.innerWidth));

  useEffect(() => {
    const update = () => setLayout(resolveLayout(window.innerWidth));
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return layout;
}

function resolveLayout(width: number): HeaderLayout {
  if (width <= MOBILE_MAX) return "mobile";
  if (width < FULL_MIN) return "compact";
  return "full";
}
