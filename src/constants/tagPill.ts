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
