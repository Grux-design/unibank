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
    ctaAlt:    "Ver condiciones",
    image:     "https://images.unsplash.com/photo-1747671688812-76d7bca21f34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
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
    ctaAlt:    "Ver condiciones",
    image:     "https://images.unsplash.com/photo-1770871820934-daf713c304af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
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
    image:     "https://images.unsplash.com/photo-1585846416120-3a7354ed7d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
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
    image:     "https://images.unsplash.com/photo-1758523671285-9ff3f4e0ff38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    cardTitle: "Crédito Hipotecario",
    cardSub:   "Desde 6.5% EA",
  },
];
