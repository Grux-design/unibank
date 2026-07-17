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
    tag: "hsl(var(--muted-foreground))",
  },

  /** Uppercase eyebrow / section tag */
  tag: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
  },

  /** Page hero h1 — top of product / inner pages */
  pageTitle: {
    desktop: {
      fontSize: "clamp(32px, 5vw, 56px)",
      fontWeight: 700,
      lineHeight: 1.08,
      letterSpacing: "-0.03em",
    },
    mobile: {
      fontSize: "clamp(30px, 8vw, 42px)",
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: "-0.03em",
    },
  },

  /** Homepage & major scroll sections (Products, Banca Digital, etc.) */
  sectionHeadline: {
    desktop: {
      fontSize: "clamp(28px, 2.8vw, 44px)",
      fontWeight: 500,
      lineHeight: 1.16,
      letterSpacing: "-0.025em",
    },
    mobile: {
      fontSize: "clamp(26px, 6.5vw, 34px)",
      fontWeight: 500,
      lineHeight: 1.18,
      letterSpacing: "-0.025em",
    },
  },

  /** Section intro paragraph */
  sectionBody: {
    desktop: { fontSize: 17, lineHeight: 1.65 },
    mobile: { fontSize: 15, lineHeight: 1.65 },
  },

  /** Max readable width for section headline + body blocks */
  sectionCopyMaxWidth: {
    desktop: 480,
    mobile: 360,
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

  /** In-page scroll sections on product / Contentful pages */
  contentSectionHeadline: {
    desktop: {
      fontSize: "clamp(24px, 2.4vw, 34px)",
      fontWeight: 500,
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
    },
    mobile: {
      fontSize: "clamp(22px, 5.5vw, 28px)",
      fontWeight: 500,
      lineHeight: 1.22,
      letterSpacing: "-0.02em",
    },
  },
} as const;

/** Inline style for accent spans inside headlines */
export const accentSpanStyle = { color: TYPO.colors.accent } as const;
