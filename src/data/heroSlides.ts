// ─── DESIGN TOKENS ────────────────────────────────────────────
export const SLIDE_DURATION = 6000;

export const THEME = {
  cardBg:                  "linear-gradient(148deg, #FF9D60 0%, #FF6B1A 40%, #D94400 100%)",
  hasPattern:              true,
  eyebrowColor:            "rgba(255,255,255,0.78)",
  headlineColor:           "#FFFFFF",
  highlightColor:          "rgba(255,255,255,0.62)",
  bodyColor:               "rgba(255,255,255,0.76)",
  mutedColor:              "rgba(255,255,255,0.52)",
  borderColor:             "rgba(255,255,255,0.22)",
  primaryBtnBg:            "#201F1F",
  primaryBtnColor:         "#FFFFFF",
  primaryBtnHoverOp:       "0.82",
  secondaryBtnBg:          "#FFFFFF",
  secondaryBtnColor:       "#201F1F",
  secondaryBtnBorder:      "#FFFFFF",
  secondaryBtnHoverBorder: "rgba(255,255,255,0.8)",
  arrowBtnBg:              "rgba(255,255,255,0.16)",
  arrowBtnBorder:          "rgba(255,255,255,0.28)",
  arrowBtnHoverBg:         "rgba(255,255,255,0.26)",
  arrowIconStroke:         "#FFFFFF",
  progressTrack:           "rgba(255,255,255,0.22)",
  progressFill:            "rgba(255,255,255,0.9)",
  glassBg:                 "rgba(20,10,0,0.38)",
  glassTitleColor:         "rgba(255,200,160,1)",
  glassSubColor:           "#FFFFFF",
  blobFill:                "rgba(255,255,255,0.10)",
  blobAccent:              "rgba(255,255,255,0.06)",
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
      { text: "El ",            highlight: false },
      { text: "Préstamo\n",     highlight: true  },
      { text: "digital para tu\nAuto", highlight: false },
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
    cardTitle: "Cuenta Naranja+",
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
    cardTitle: "UniLeasing",
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
