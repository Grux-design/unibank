/**
 * Editorial typography — derived from Digital Banking section.
 * Lighter section headlines (500), semibold card titles (600), hero stays at 700.
 */
export const TYPO = {
  colors: {
    headline: "var(--uni-dark)",
    accent: "var(--fun-orange)",
    body: "var(--uni-dark-soft)",
    muted: "var(--uni-muted)",
    tag: "var(--fun-orange)",
  },

  /** Uppercase eyebrow / section tag */
  tag: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
  },

  /** Primary section h2 — editorial, medium weight */
  sectionHeadline: {
    desktop: {
      fontSize: "clamp(36px, 3.6vw, 56px)",
      fontWeight: 500,
      lineHeight: 1.14,
      letterSpacing: "-0.03em",
    },
    mobile: {
      fontSize: "clamp(30px, 8vw, 38px)",
      fontWeight: 500,
      lineHeight: 1.14,
      letterSpacing: "-0.03em",
    },
  },

  /** Section intro paragraph */
  sectionBody: {
    desktop: { fontSize: 17, lineHeight: 1.65 },
    mobile: { fontSize: 15, lineHeight: 1.65 },
  },

  /** Bento / feature card titles */
  cardTitle: {
    fontSize: "clamp(18px, 2vw, 24px)",
    fontWeight: 600,
    lineHeight: 1.25,
    letterSpacing: "-0.02em",
  },

  /** Strip / grid item titles */
  itemTitle: {
    fontSize: "clamp(20px, 2vw, 26px)",
    fontWeight: 600,
    lineHeight: 1.25,
    letterSpacing: "-0.02em",
  },

  /** Small card / list item titles */
  itemTitleSm: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: "-0.01em",
  },

  /** Homepage hero — keep existing weight */
  hero: {
    fontWeight: 700,
    lineHeight: 1.08,
    letterSpacing: "-0.02em",
  },

  /** Contentful section headings (slightly smaller scale) */
  contentSectionHeadline: {
    fontSize: "clamp(30px, 4vw, 44px)",
    fontWeight: 500,
    lineHeight: 1.14,
    letterSpacing: "-0.03em",
  },
} as const;

/** Inline style for accent spans inside headlines */
export const accentSpanStyle = { color: TYPO.colors.accent } as const;
