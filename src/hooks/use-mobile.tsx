import * as React from "react";
import { MOBILE_MAX, resolveBreakpoint } from "@/constants/breakpoints";

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(() =>
    typeof window !== "undefined"
      ? resolveBreakpoint(window.innerWidth) === "mobile"
      : false
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_MAX}px)`);
    const onChange = () => {
      setIsMobile(resolveBreakpoint(window.innerWidth) === "mobile");
    };
    mql.addEventListener("change", onChange);
    onChange();
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}
