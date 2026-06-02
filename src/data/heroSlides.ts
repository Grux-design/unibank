// ─── DESIGN TOKENS ────────────────────────────────────────────
export const SLIDE_DURATION = 6000;

export const THEME = {
  cardBg:                  "#F2EFED",
  hasPattern:              true,
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
  ctaAlt:    string;
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
    ctaAlt:    "",
    image:     "/be66e5af-67ba-4fd2-851b-2be6ac50832b.jpg",
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
    body:      "Sin saldo mínimo ni filas. Abre en 5 minutos, 100% digital, al 4.5% TEA.",
    cta:       "Abre tu cuenta",
    ctaAlt:    "",
    image:     "/b6f5b3af-65b3-42cb-a174-da7f0eb5f34a.jpg",
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
    ctaAlt:    "Más sobre Leasing",
    image:     "/893174f9-3139-46c3-a57d-e0aa762dfbb8.jpg",
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
    ctaAlt:    "Calcular mi cuota",
    image:     "/7ea7ba88-a073-446a-8edd-ed2b250324c3.jpg",
    cardTitle: "Crédito Hipotecario",
    cardSub:   "Desde 6.5% EA",
  },
];
