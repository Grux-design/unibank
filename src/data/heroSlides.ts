// ─── DESIGN TOKENS ────────────────────────────────────────────
export const SLIDE_DURATION = 6000;

import { CTA_BUTTON_SIZE } from "@/constants/ctaButtons";

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
export const slides: Slide[] = [
  {
    id:        "auto",
    tag:       "Personas",
    eyebrow:   "¡Aprobación en minutos!",
    headline:  [
      { text: "El préstamo\ndigital para tu\n", highlight: false },
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
      { text: "ahorros\n",      highlight: true  },
      { text: "trabajando\npara ti.", highlight: false },
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
      { text: "Moderniza sin\n", highlight: false },
      { text: "tocar\n",          highlight: true  },
      { text: "tu capital.",      highlight: false },
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
      { text: "El hogar que\n", highlight: false },
      { text: "soñaste,\n",      highlight: true  },
      { text: "financiado.",     highlight: false },
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
