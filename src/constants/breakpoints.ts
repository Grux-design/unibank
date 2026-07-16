/** Shared viewport breakpoints — keep header and body in sync */
export const MOBILE_MAX = 767;
export const COMPACT_MIN = 768;
export const FULL_MIN = 1200;

export type Breakpoint = "mobile" | "compact" | "full";

export function resolveBreakpoint(width: number): Breakpoint {
  if (width <= MOBILE_MAX) return "mobile";
  if (width < FULL_MIN) return "compact";
  return "full";
}

export const BREAKPOINT_MEDIA = {
  mobile: `(max-width: ${MOBILE_MAX}px)`,
  compact: `(min-width: ${COMPACT_MIN}px) and (max-width: ${FULL_MIN - 1}px)`,
  full: `(min-width: ${FULL_MIN}px)`,
} as const;
