/** Shared CTA sizing — hero + ProductsSection below the fold */
export const CTA_BUTTON_SIZE = {
  height: 52,
  minHeight: 52,
  paddingX: 26,
  paddingPrimary: "15px 28px",
  fontSize: 14,
  fontWeight: 600,
  lineHeight: "21px",
  borderRadius: 12,
} as const;

/** Shared CTA palettes */
export const CTA_BUTTON_COLORS = {
  primary: {
    bg: "#FF8136",
    bgHover: "hsl(20 100% 45%)",
    color: "#FFFFFF",
  },
  /** White button on light/beige backgrounds (hero secondary) */
  lightSolid: {
    bg: "#FFFFFF",
    bgHover: "#F7E8E0",
    bgActive: "#F0D4C4",
    color: "#1F1E1E",
  },
  /** Light orange button on orange backgrounds (bento cards) */
  onOrangeSolid: {
    bg: "#F7E8E0",
    bgHover: "#FFFFFF",
    bgActive: "#F0D4C4",
    color: "#FF8136",
  },
  /** Inactive segment in Personas / Empresas toggles */
  toggleInactive: {
    bg: "transparent",
    bgHover: "#F7E8E0",
    bgActive: "#F0D4C4",
    color: "#1F1E1E",
  },
} as const;

/** Personas / Empresas segmented control */
export const SEGMENTED_TOGGLE = {
  containerBorder: "1.5px solid #E7E4E1",
  containerRadius: 12,
  containerPadding: 4,
  containerGap: 2,
  buttonRadius: 8,
  buttonPadding: "10px 28px",
  fontSize: 15,
  fontWeight: 600,
  activeBg: "#FF8136",
  activeColor: "#FFFFFF",
  /** Neutral variant — language toggles, secondary controls */
  neutralActiveBg: "#F2EFED",
  neutralActiveColor: "#1C1917",
  neutralInactiveColor: "#908E8D",
} as const;

/** Mobile full-width; desktop fit-content. Use with md:self-start inside flex-col. */
export const CTA_BUTTON_LAYOUT_CLASS = "w-full md:w-auto md:self-start";
