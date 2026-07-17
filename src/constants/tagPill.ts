import type { CSSProperties } from "react";

/** Tags/pills must hug their label — never stretch to full container width */
export const TAG_PILL_HUG: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  width: "fit-content",
  maxWidth: "fit-content",
  alignSelf: "flex-start",
  flex: "0 0 auto",
  whiteSpace: "nowrap",
  flexShrink: 0,
};

export const TAG_STACK_HUG: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "fit-content",
  maxWidth: "fit-content",
};

/** Muted section / category pill — consistent site-wide */
export const SECTION_TAG_COLORS = {
  background: "#F2F0EE",
  border: "#E7E4E1",
  foreground: "hsl(var(--muted-foreground))",
} as const;

/** @deprecated Use SECTION_TAG_COLORS */
export const BENTO_CATEGORY_TAG_COLORS = SECTION_TAG_COLORS;
