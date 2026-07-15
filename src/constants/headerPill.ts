import type { CSSProperties } from "react";

/** Shared header pill chrome — desktop LeftHeaderPill / RightHeaderPill / mobile bar */
export const HEADER_PILL = {
  height: 66,
  borderRadius: 16,
  background: "#ffffff",
  border: "0.5px solid #E7E4E1",
  logoHeight: 48,
  mobileLogoPaddingInline: 12,
  mobileActionsPaddingInline: 10,
} as const;

export const headerPillShellStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  background: HEADER_PILL.background,
  borderRadius: HEADER_PILL.borderRadius,
  height: HEADER_PILL.height,
  border: HEADER_PILL.border,
  flexShrink: 0,
  width: "fit-content",
  transition: "background 0.2s ease, border-radius 0.2s ease, border 0.2s ease",
};
