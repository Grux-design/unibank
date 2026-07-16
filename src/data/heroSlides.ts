// ─── DESIGN TOKENS ────────────────────────────────────────────
export const SLIDE_DURATION = 6000;

import { CTA_BUTTON_SIZE } from "@/constants/ctaButtons";
import type { Breakpoint } from "@/constants/breakpoints";

export type HeroLayoutTier = Breakpoint;

/** Hero carousel arrow buttons — shared with glass card offset math */
export const HERO_ARROW_BUTTON = {
  size: 48,
  gap: 8,
} as const;

function controlsPaddingBottom(controlsPadding: string): number {
  const parts = controlsPadding.trim().split(/\s+/);
  if (parts.length === 1) return Number.parseInt(parts[0], 10);
  if (parts.length === 2) return Number.parseInt(parts[0], 10);
  return Number.parseInt(parts[2], 10);
}

function controlsPaddingRight(controlsPadding: string): number {
  const parts = controlsPadding.trim().split(/\s+/);
  if (parts.length === 1) return Number.parseInt(parts[0], 10);
  if (parts.length === 2) return Number.parseInt(parts[1], 10);
  return Number.parseInt(parts[1], 10);
}

/** Glass preview card sits above arrow buttons with a fixed gap */
export function getHeroGlassCardInset(controlsPadding: string) {
  const bottom =
    controlsPaddingBottom(controlsPadding) +
    HERO_ARROW_BUTTON.size +
    HERO_ARROW_BUTTON.gap;

  return {
    right: controlsPaddingRight(controlsPadding),
    bottom,
  };
}

/** Shared sizing for hero CTA buttons across all slides */
export const HERO_CTA_BUTTON = {
  height:       CTA_BUTTON_SIZE.height,
  minHeight:    CTA_BUTTON_SIZE.minHeight,
  padding:      `0 ${CTA_BUTTON_SIZE.paddingX}px`,
  fontSize:     CTA_BUTTON_SIZE.fontSize,
  fontWeight:   CTA_BUTTON_SIZE.fontWeight,
  lineHeight:   CTA_BUTTON_SIZE.lineHeight,
  borderRadius: CTA_BUTTON_SIZE.borderRadius,
  borderWidth:  1.5,
} as const;

/** Responsive hero layout tokens — mobile ≤767 · compact 768–1199 · full ≥1200
 *  Rule: ctaFullWidth is true only on mobile; tablet and desktop use inline CTAs.
 */
export const HERO_LAYOUT = {
  full: {
    sectionPaddingTop: 90,
    sectionPaddingBottom: 32,
    cardBorderRadius: 36,
    cardMinHeight: 684,
    cardHeight: 684,
    innerMinHeight: 624,
    imageMinHeight: 624,
    contentPadding: "20px 48px 32px 48px",
    contentGap: 24,
    controlsPadding: "16px 48px 24px 48px",
    columnGap: 64,
    equalColumns: true,
    showGlassCard: true,
    stackLayout: false,
    ctaFullWidth: false,
  },
  compact: {
    sectionPaddingTop: 32,
    sectionPaddingBottom: 24,
    cardBorderRadius: 28,
    cardMinHeight: 520,
    innerMinHeight: 460,
    imageMinHeight: 440,
    contentPadding: "20px 28px 24px",
    contentGap: 20,
    controlsPadding: "14px 28px 20px",
    columnGap: 32,
    equalColumns: true,
    showGlassCard: true,
    stackLayout: false,
    ctaFullWidth: false,
  },
  mobile: {
    sectionPaddingTop: 16,
    sectionPaddingBottom: 16,
    cardBorderRadius: 28,
    cardHeight: "98vh",
    imageFlexBasis: "52%",
    imagePadding: 12,
    imagePaddingTop: 28,
    contentPadding: "20px 20px 4px",
    contentGap: 16,
    controlsPadding: "12px 20px 16px",
    columnGap: 0,
    equalColumns: false,
    showGlassCard: false,
    stackLayout: true,
    ctaFullWidth: true,
  },
} as const;

export function getHeroLayout(tier: HeroLayoutTier) {
  return HERO_LAYOUT[tier];
}

export const THEME = {
  cardBg:                  "#F2EFED",
  hasPattern:              false,
  eyebrowColor:            "#726F6E",
  headlineColor:           "#1F1E1E",
  highlightColor:          "#FF8136",
  bodyColor:               "#726F6E",
  mutedColor:              "#908E8D",
  borderColor:             "#E7E4E1",
  primaryBtnBg:            "#FF8136",
  primaryBtnColor:         "#FFFFFF",
  primaryBtnHoverBg:       "#CE4D00",
  secondaryBtnBg:          "#FFFFFF",
  secondaryBtnColor:       "#1F1E1E",
  secondaryBtnHoverBg:     "#F7E8E0",
  secondaryBtnActiveBg:    "#F0D4C4",
  secondaryBtnBorder:      "#E7E4E1",
  secondaryBtnHoverBorder: "#CAC6C3",
  arrowBtnBg:              "rgba(255,129,54,0.12)",
  arrowBtnBorder:          "rgba(255,129,54,0.12)",
  arrowBtnHoverBg:         "rgba(255,129,54,0.20)",
  arrowIconStroke:         "#FF8136",
  progressTrack:           "#E7E4E1",
  progressFill:            "#FF8136",
  glassBg:                 "#FFFFFF",
  glassTitleColor:         "#FF8136",
  glassSubColor:           "#1F1E1E",
  blobFill:                "rgba(255,129,54,0.08)",
  blobAccent:              "rgba(255,129,54,0.05)",
};

// ─── TYPES ────────────────────────────────────────────────────
export interface HeadlinePart { text: string; highlight: boolean }

export interface Slide {
  id:        string;
  tag:       string;
  eyebrow:   string;
  headline:  HeadlinePart[];
  body:      string;
  cta:       string;
  ctaHref?:  string;
  ctaAlt:    string;
  ctaAltHref?: string;
  image:     string;
  cardTitle: string;
  cardSub:   string;
}

// ─── DATA ─────────────────────────────────────────────────────
function stripLineBreaks(text: string): string {
  return text.replace(/\n+/g, " ");
}

function normalizeSlide(slide: Slide): Slide {
  return {
    ...slide,
    tag: stripLineBreaks(slide.tag),
    eyebrow: stripLineBreaks(slide.eyebrow),
    headline: slide.headline.map((part) => ({
      ...part,
      text: stripLineBreaks(part.text),
    })),
    body: stripLineBreaks(slide.body),
    cta: stripLineBreaks(slide.cta),
    ctaAlt: stripLineBreaks(slide.ctaAlt),
    cardTitle: stripLineBreaks(slide.cardTitle),
    cardSub: stripLineBreaks(slide.cardSub),
  };
}

const RAW_SLIDES: Slide[] = [
  {
    id:        "auto",
    tag:       "Personas",
    eyebrow:   "¡Aprobación en minutos!",
    headline:  [
      { text: "El préstamo digital para tu ", highlight: false },
      { text: "próximo auto.",                   highlight: true  },
    ],
    body:      "Cotiza tu Préstamo de Auto donde estés, de la manera más fácil y rápida. ¡Conoce tu letra mensual ahora!",
    cta:       "Solicitar ahora",
    ctaHref:   "https://onboardauto.unibank.com.pa/",
    ctaAlt:    "",
    image:     "/images/uni-hero-1.png",
    cardTitle: "Préstamo Auto",
    cardSub:   "Desde 8.5% EA",
  },
  {
    id:        "naranja",
    tag:       "Personas",
    eyebrow:   "Banca sin saldo mínimo",
    headline:  [
      { text: "Tus ",           highlight: false },
      { text: "ahorros ",      highlight: true  },
      { text: "trabajando para ti.", highlight: false },
    ],
    body:      "Sin saldo mínimo ni filas.",
    cta:       "Abre tu cuenta",
    ctaHref:   "https://onboard.unibank.com.pa/es/auth/login",
    ctaAlt:    "",
    image:     "/images/uni-hero-2.png",
    cardTitle: "Cuenta de Ahorros",
    cardSub:   "4.5% TEA anual",
  },
  {
    id:        "leasing",
    tag:       "Empresas",
    eyebrow:   "Para tu empresa",
    headline:  [
      { text: "Moderniza sin tocar ", highlight: false },
      { text: "tu capital.",          highlight: true  },
    ],
    body:      "Equipos, vehículos y tecnología con deducción fiscal real, adaptado a tu flujo de caja.",
    cta:       "Solicitar Leasing",
    ctaHref:   "mailto:unileasing@unibank.com.pa",
    ctaAlt:    "Más sobre Leasing",
    ctaAltHref: "/grupo/unileasing",
    image:     "/images/uni-hero-3.png",
    cardTitle: "Uni Leasing",
    cardSub:   "$1,850 / mes",
  },
  {
    id:        "hipoteca",
    tag:       "Personas",
    eyebrow:   "Tu hogar, tu sueño",
    headline:  [
      { text: "El hogar que soñaste, ", highlight: false },
      { text: "financiado.",            highlight: true  },
    ],
    body:      "Tasas competitivas, hasta 30 años de plazo. Asesor dedicado desde el día uno.",
    cta:       "Solicitar hipoteca",
    ctaHref:   "https://api.whatsapp.com/send?phone=50763280229",
    ctaAlt:    "Conocer más",
    ctaAltHref: "/personas/credito/prestamo-de-vivienda",
    image:     "/images/uni-hero-new-4.png",
    cardTitle: "Crédito Hipotecario",
    cardSub:   "Desde 6.5% EA",
  },
];

export const slides: Slide[] = RAW_SLIDES.map(normalizeSlide);
