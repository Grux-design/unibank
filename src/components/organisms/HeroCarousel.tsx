import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Lang } from "@/components/layout/SiteLayout";

// ─────────────────────────────────────────────────────────
//  DESIGN TOKENS
// ─────────────────────────────────────────────────────────
const SLIDE_DURATION = 6000;

const THEME = {
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

// ─────────────────────────────────────────────────────────
//  SLIDE DATA
// ─────────────────────────────────────────────────────────
interface HeadlinePart { text: string; highlight: boolean }
interface Slide {
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

const slides: Slide[] = [
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

// ─────────────────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────────────────
interface HeroCarouselProps {
  lang: Lang;
}

export function HeroCarousel({ lang: _lang }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [dir,     setDir]     = useState(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advance = useCallback((next: number, d: number) => {
    setDir(d);
    setCurrent(next);
  }, []);

  useEffect(() => {
    timerRef.current = setTimeout(
      () => advance((current + 1) % slides.length, 1),
      SLIDE_DURATION
    );
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, advance]);

  const goNext = () => advance((current + 1) % slides.length,  1);
  const goPrev = () => advance((current - 1 + slides.length) % slides.length, -1);

  const slide     = slides[current];
  const nextSlide = slides[(current + 1) % slides.length];
  const t         = THEME;

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    /* ── Outer page wrapper ─────────────────────────────── */
    <section
      style={{
        background: "#F8F7F6",
        paddingTop: 80,
        paddingBottom: 32,
        paddingLeft: 16,
        paddingRight: 16,
        fontFamily: '"Inter", -apple-system, sans-serif',
      }}
    >
      {/* ── Hero card ──────────────────────────────────── */}
      <div
        style={{
          background:    t.cardBg,
          borderRadius:  28,
          overflow:      "hidden",
          position:      "relative",
          maxWidth:      1200,
          margin:        "0 auto",
          minHeight:     540,
          paddingTop:    32,
          paddingRight:  48,
        }}
      >
        {/* ── Diagonal line pattern overlay ── */}
        {t.hasPattern && (
          <svg
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.18, pointerEvents: "none" }}
          >
            <defs>
              <pattern id="diag" patternUnits="userSpaceOnUse" width="16" height="16" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="16" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diag)" />
          </svg>
        )}

        {/* ── Two-column row ─────────────────────────── */}
        <div
          style={{
            display:       "flex",
            flexDirection: "row",
            alignItems:    "stretch",
            gap:           0,
          }}
        >
          {/* ── LEFT — copy ── */}
          <div
            style={{
              flex:          "1 1 0",
              padding:       "20px 48px 32px 48px",
              display:       "flex",
              flexDirection: "column",
              justifyContent:"center",
              position:      "relative",
              overflow:      "hidden",
              minWidth:      0,
            }}
          >
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={slide.id}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                {/* Eyebrow */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      fontSize:     12,
                      fontWeight:   600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color:        t.eyebrowColor,
                      background:   "rgba(255,255,255,0.15)",
                      borderRadius: 100,
                      padding:      "4px 12px",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {slide.eyebrow}
                  </span>
                </div>

                {/* Headline */}
                <h1
                  style={{
                    fontSize:    "clamp(2rem, 4vw, 3.25rem)",
                    fontWeight:  700,
                    lineHeight:  1.1,
                    margin:      0,
                    color:       t.headlineColor,
                    whiteSpace:  "pre-line",
                  }}
                >
                  {slide.headline.map((part, i) => (
                    <span
                      key={i}
                      style={{ color: part.highlight ? t.highlightColor : t.headlineColor }}
                    >
                      {part.text}
                    </span>
                  ))}
                </h1>

                {/* Body */}
                <p
                  style={{
                    fontSize:   15,
                    lineHeight: 1.6,
                    color:      t.bodyColor,
                    margin:     0,
                    maxWidth:   380,
                  }}
                >
                  {slide.body}
                </p>

                {/* CTA buttons */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 4 }}>
                  {/* Primary */}
                  <button
                    style={{
                      background:   t.primaryBtnBg,
                      color:        t.primaryBtnColor,
                      border:       "none",
                      borderRadius: 100,
                      padding:      "13px 26px",
                      fontSize:     14,
                      fontWeight:   600,
                      cursor:       "pointer",
                      transition:   "opacity 0.18s",
                      fontFamily:   "inherit",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = t.primaryBtnHoverOp; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
                  >
                    {slide.cta}
                  </button>

                  {/* Secondary */}
                  <button
                    style={{
                      background:   t.secondaryBtnBg,
                      color:        t.secondaryBtnColor,
                      border:       `1.5px solid ${t.secondaryBtnBorder}`,
                      borderRadius: 100,
                      padding:      "13px 26px",
                      fontSize:     14,
                      fontWeight:   600,
                      cursor:       "pointer",
                      transition:   "border-color 0.18s",
                      fontFamily:   "inherit",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = t.secondaryBtnHoverBorder; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = t.secondaryBtnBorder; }}
                  >
                    {slide.ctaAlt}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── RIGHT — photo + glass card ── */}
          <div
            style={{
              flex:     "0 0 auto",
              width:    "clamp(260px, 38%, 440px)",
              position: "relative",
            }}
          >
            <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
              {/* Secondary accent circle — decorative, clipped by parent overflow:hidden */}
              <div
                style={{
                  position:     "absolute",
                  bottom:       "5%",
                  right:        "-8%",
                  width:        "38%",
                  aspectRatio:  "1",
                  borderRadius: "50%",
                  background:   t.blobAccent,
                  pointerEvents:"none",
                  zIndex:       0,
                }}
              />

              {/* Main blob — inset from top and right */}
              <div
                style={{
                  position:     "absolute",
                  top:          12,
                  left:         0,
                  right:        12,
                  bottom:       0,
                  borderRadius: "20px 20px 0 0",
                  background:   t.blobFill,
                  pointerEvents:"none",
                  zIndex:       1,
                }}
              />

              {/* Person photo — inset: top + right margin, flush bottom-left */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id + "-img"}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                  style={{
                    position:     "absolute",
                    top:          12,
                    left:         0,
                    right:        12,
                    bottom:       0,
                    borderRadius: "20px 20px 0 0",
                    overflow:     "hidden",
                    zIndex:       2,
                  }}
                >
                  <img
                    src={slide.image}
                    alt={slide.cardTitle}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
                    loading="eager"
                    decoding="async"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Glass card — next slide preview */}
              <div
                style={{
                  position:       "absolute",
                  bottom:         24,
                  right:          16,
                  zIndex:         10,
                  background:     t.glassBg,
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  borderRadius:   16,
                  padding:        "14px 16px",
                  minWidth:       190,
                  border:         `1px solid ${t.borderColor}`,
                }}
              >
                {/* Thumbnail + text row */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  {/* Next slide thumbnail */}
                  <div
                    style={{
                      width:        40,
                      height:       40,
                      borderRadius: 8,
                      overflow:     "hidden",
                      flexShrink:   0,
                    }}
                  >
                    <img
                      src={nextSlide.image}
                      alt={nextSlide.cardTitle}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>

                  {/* Text */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span
                      style={{
                        fontSize:   13,
                        fontWeight: 600,
                        color:      t.glassTitleColor,
                        lineHeight: 1.2,
                      }}
                    >
                      {nextSlide.cardTitle}
                    </span>
                    <span
                      style={{
                        fontSize:   12,
                        fontWeight: 500,
                        color:      t.glassSubColor,
                        opacity:    0.72,
                      }}
                    >
                      {nextSlide.cardSub}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div
                  style={{
                    height:       3,
                    borderRadius: 100,
                    background:   t.progressTrack,
                    overflow:     "hidden",
                  }}
                >
                  <motion.div
                    key={current}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                    style={{
                      height:          "100%",
                      background:      t.progressFill,
                      transformOrigin: "left center",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Slide controls row ─────────────────────── */}
        <div
          style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
            padding:        "16px 48px 24px 48px",
          }}
        >
          {/* Counter + progress dash + tag */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span
              style={{
                fontSize:      13,
                fontWeight:    700,
                color:         t.mutedColor,
                fontVariantNumeric: "tabular-nums",
                fontFamily:    "monospace",
              }}
            >
              {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>

            {/* Inline progress dash */}
            <div
              style={{
                width:        80,
                height:       3,
                borderRadius: 100,
                background:   t.progressTrack,
                overflow:     "hidden",
              }}
            >
              <motion.div
                key={current + "-bar"}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                style={{
                  height:          "100%",
                  background:      t.progressFill,
                  transformOrigin: "left center",
                }}
              />
            </div>

            <span
              style={{
                fontSize:     12,
                fontWeight:   600,
                letterSpacing:"0.06em",
                textTransform:"uppercase",
                color:        t.eyebrowColor,
              }}
            >
              {slide.tag}
            </span>
          </div>

          {/* Arrow buttons */}
          <div style={{ display: "flex", gap: 8 }}>
            {[
              { label: "Anterior",  onClick: goPrev, path: "M15.833 10H4.167M4.167 10L10 15.833M4.167 10L10 4.167" },
              { label: "Siguiente", onClick: goNext, path: "M4.167 10H15.833M15.833 10L10 4.167M15.833 10L10 15.833" },
            ].map(({ label, onClick, path }) => (
              <button
                key={label}
                aria-label={label}
                onClick={onClick}
                style={{
                  width:        40,
                  height:       40,
                  borderRadius: "50%",
                  background:   t.arrowBtnBg,
                  border:       `1px solid ${t.arrowBtnBorder}`,
                  cursor:       "pointer",
                  display:      "flex",
                  alignItems:   "center",
                  justifyContent:"center",
                  transition:   "background 0.18s, border-color 0.18s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background   = t.arrowBtnHoverBg;
                  (e.currentTarget as HTMLButtonElement).style.borderColor  = t.arrowBtnHoverBg;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background   = t.arrowBtnBg;
                  (e.currentTarget as HTMLButtonElement).style.borderColor  = t.arrowBtnBorder;
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d={path} stroke={t.arrowIconStroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
