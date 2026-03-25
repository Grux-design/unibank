import { useRef, useState, useLayoutEffect } from "react";
import React from "react";
import { motion, useInView } from "motion/react";
import { TrendingUp, Home, ArrowRight, Plus, Car } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { SectionTag, SectionHeading } from "@/components/ui/atoms";

const OR = "var(--fun-orange)";
const DARK = "var(--uni-dark)";
const SOFT = "var(--uni-dark-soft)";
const CARD_H = 480;
const G = 8;
const DELTA = 20;

/* ── Images ────────────────────────────────────────────── */
const IMG_PORTRAIT =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800";
const IMG_MASTERCARD =
  "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800";
const IMG_INVERTIS =
  "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800";
const IMG_VIVIENDA =
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800";
const IMG_AUTO =
  "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800";

/* ── Data ───────────────────────────────────────────────── */
const invertisData = {
  icon: TrendingUp,
  tag: "Inversiones",
  title: "Invertis Global Income Fund",
  body: "Diversifica tu portafolio. Accede a mercados globales con nuestros expertos.",
  cta: "Conocer el fondo",
  image: IMG_INVERTIS,
};

const viviendaData = {
  icon: Home,
  tag: "Hipotecario",
  title: "Préstamos de Vivienda",
  body: "Construye hoy el hogar que imaginas. Condiciones competitivas y acompañamiento.",
  cta: "Solicitar hipoteca",
  image: IMG_VIVIENDA,
};

/* ── Sub-components ─────────────────────────────────────── */
function OrangeButton({ children, fullWidth }: { children: React.ReactNode; fullWidth?: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "15px 28px",
        borderRadius: 16,
        border: "none",
        background: hov ? "hsl(20 100% 45%)" : OR,
        color: "#FBF4F0",
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: "0.004em",
        cursor: "pointer",
        transition: "background 0.18s",
        width: fullWidth ? "100%" : undefined,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
}

function CreamButton({ children }: { children: React.ReactNode }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "15px 28px",
        borderRadius: 16,
        border: "none",
        background: hov ? "rgba(247,232,224,0.75)" : "#F7E8E0",
        color: OR,
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: "0.004em",
        cursor: "pointer",
        transition: "background 0.18s",
        width: "100%",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
}

function CtaLink({ children }: { children: React.ReactNode }) {
  const [hov, setHov] = useState(false);
  return (
    <span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        color: OR,
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        transform: hov ? "translateX(4px)" : "translateX(0)",
        transition: "transform 0.22s ease",
        userSelect: "none",
      }}
    >
      {children}
      <ArrowRight size={13} strokeWidth={2.5} />
    </span>
  );
}

function CategoryTag({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "3px 10px",
        borderRadius: 99,
        background: "rgba(255,129,54,0.10)",
        color: OR,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
      }}
    >
      <Icon size={13} color={OR} strokeWidth={2} />
      {label}
    </span>
  );
}

function OrangeHoverOverlay({ visible, cta }: { visible: boolean; cta: string }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        padding: "28px 32px",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.28s ease",
        zIndex: 4,
        pointerEvents: "none",
      }}
    >
      <svg
        aria-hidden
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
        viewBox="0 0 1336 460"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <path d="M0 0H800C900 0 950 460 1336 460H0V0Z" fill="url(#ov_p0)" />
        <path d="M400 0H1336V300C1200 400 900 460 400 460H0L0 0Z" fill="url(#ov_p1)" opacity="0.55" />
        <defs>
          <linearGradient id="ov_p0" x1="256.854" y1="-37.47" x2="778.356" y2="399.288" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EF5721" />
            <stop offset="1" stopColor="#FF9E47" />
          </linearGradient>
          <linearGradient id="ov_p1" x1="681.477" y1="480.808" x2="1061.65" y2="-334.008" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF8136" />
            <stop offset="1" stopColor="#FFBA5C" />
          </linearGradient>
        </defs>
      </svg>
      <span
        style={{
          position: "relative",
          zIndex: 1,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          color: "#fff",
          fontSize: 15,
          fontWeight: 700,
        }}
      >
        {cta}
        <ArrowRight size={14} strokeWidth={2.5} />
      </span>
    </div>
  );
}

/* ── FeaturedBanner ─────────────────────────────────────── */
function FeaturedBanner({ isMobile }: { isMobile: boolean }) {
  return (
    <div
      style={{
        width: "100%",
        height: isMobile ? "auto" : "100%",
        background: OR,
        borderRadius: isMobile ? 32 : 0,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "flex-start" : "stretch",
        minHeight: isMobile ? 360 : undefined,
      }}
    >
      {/* SVG pattern */}
      <svg
        aria-hidden
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
        viewBox="0 0 1336 460"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <path d="M0 0H800C900 0 950 460 1336 460H0V0Z" fill="url(#bp0)" />
        <path d="M400 0H1336V300C1200 400 900 460 400 460H0L0 0Z" fill="url(#bp1)" opacity="0.45" />
        <path d="M600 -100 Q900 200 1200 100 T1600 300" stroke="url(#bp2)" strokeWidth="120" fill="none" opacity="0.2" />
        <defs>
          <linearGradient id="bp0" x1="256.854" y1="-37.47" x2="778.356" y2="399.288" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EF5721" />
            <stop offset="1" stopColor="#FF9E47" />
          </linearGradient>
          <linearGradient id="bp1" x1="681.477" y1="480.808" x2="1061.65" y2="-334.008" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF8136" />
            <stop offset="1" stopColor="#FFBA5C" />
          </linearGradient>
          <linearGradient id="bp2" x1="777.539" y1="1.555" x2="777.539" y2="-379" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF8136" />
            <stop offset="1" stopColor="#FF8136" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          flex: "1 1 auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 12,
          padding: isMobile ? "32px 24px 20px" : "36px 36px 28px",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "3px 10px",
            borderRadius: 99,
            background: "rgba(255,255,255,0.18)",
            border: "1px solid rgba(255,255,255,0.25)",
            color: "#fff",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            width: "fit-content",
          }}
        >
          100% Digital
        </span>
        <h3
          style={{
            margin: 0,
            fontSize: isMobile ? 24 : "clamp(22px, 2.5vw, 36px)",
            fontWeight: 800,
            lineHeight: 1.1,
            color: "#fff",
            letterSpacing: "-0.02em",
          }}
        >
          Cuenta Naranja<br />+ Digital
        </h3>
        <p
          style={{
            margin: 0,
            fontSize: 13,
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.85)",
            maxWidth: 280,
          }}
        >
          Aprobación en minutos! Abre tu cuenta 100% digital sin filas ni papeleos. Accede a todos los servicios de UniBank desde donde estés.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
          <OrangeButton>
            Abrir mi cuenta ahora <Plus size={14} strokeWidth={2.5} />
          </OrangeButton>
          <CreamButton>Saber más...</CreamButton>
        </div>
      </div>

      {/* Portrait image */}
      <div
        style={{
          position: isMobile ? "relative" : "absolute",
          right: 0,
          bottom: 0,
          top: isMobile ? undefined : 0,
          width: isMobile ? "100%" : "42%",
          height: isMobile ? 200 : "100%",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <img
          src={IMG_PORTRAIT}
          alt="Persona abriendo cuenta digital"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
            mixBlendMode: "multiply",
            filter: "saturate(0.85)",
          }}
        />
      </div>
    </div>
  );
}

/* ── MastercardCard ─────────────────────────────────────── */
function MastercardCard() {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        background: "#1a1a2e",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "28px 24px",
      }}
    >
      <img
        src={IMG_MASTERCARD}
        alt="Mastercard"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: hov ? "scale(1.04)" : "scale(1)",
          transition: "transform 0.45s ease",
          display: "block",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <h4
          style={{
            margin: "0 0 4px",
            fontSize: 18,
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "-0.01em",
          }}
        >
          Tarjeta Mastercard Black Débito
        </h4>
        <p style={{ margin: "0 0 12px", fontSize: 12, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>
          Exclusividad y control en tus manos. Beneficios premium globales.
        </p>
        <CtaLink>Solicitar tarjeta</CtaLink>
      </div>
    </div>
  );
}

/* ── SmallProductCard ───────────────────────────────────── */
function SmallProductCard({ item, index }: { item: typeof invertisData; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Image */}
      <div style={{ flex: "1 1 auto", overflow: "hidden", minHeight: 160 }}>
        <img
          src={item.image}
          alt={item.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
      {/* Content */}
      <div style={{ padding: "20px 20px 24px", display: "flex", flexDirection: "column", gap: 10, flex: "0 0 auto" }}>
        <CategoryTag icon={item.icon} label={item.tag} />
        <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: DARK, letterSpacing: "-0.01em", lineHeight: 1.3 }}>
          {item.title}
        </h4>
        <p style={{ margin: 0, fontSize: 13, color: SOFT, lineHeight: 1.6 }}>{item.body}</p>
        <CtaLink>{item.cta}</CtaLink>
      </div>
    </motion.div>
  );
}

/* ── AutoLoanCard ───────────────────────────────────────── */
function AutoLoanCard({ isMobile }: { isMobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        height: "100%",
        width: "100%",
      }}
    >
      {/* Left: text */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          flex: isMobile ? undefined : "1 1 50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 16,
          padding: isMobile ? "24px 20px 20px" : "32px 28px",
          background: "#fff",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <CategoryTag icon={Car} label="Crédito Automotriz" />
          <h4
            style={{
              margin: 0,
              fontSize: "clamp(18px, 2vw, 24px)",
              fontWeight: 800,
              color: DARK,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}
          >
            Préstamo de Auto Digital
          </h4>
          <p style={{ margin: 0, fontSize: 13, color: SOFT, lineHeight: 1.6 }}>
            El auto de tus sueños está más cerca. Tasas competitivas y aprobación rápida.
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              padding: "12px 16px",
              background: "hsl(20 100% 97%)",
              borderRadius: 12,
              borderLeft: `3px solid ${OR}`,
            }}
          >
            <span style={{ fontSize: 11, color: SOFT, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Tasa desde
            </span>
            <span style={{ fontSize: 24, fontWeight: 800, color: OR, letterSpacing: "-0.02em" }}>7.5% anual</span>
            <span style={{ fontSize: 11, color: SOFT }}>Condiciones competitivas según tu perfil crediticio.</span>
          </div>
        </div>
        <OrangeButton fullWidth>
          Solicitar Crédito ahora <Plus size={14} strokeWidth={2.5} />
        </OrangeButton>
      </motion.div>
      {/* Right: image */}
      <div style={{ flex: isMobile ? undefined : "1 1 50%", minHeight: isMobile ? 200 : undefined, overflow: "hidden" }}>
        <img
          src={IMG_AUTO}
          alt="Auto loan"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
    </div>
  );
}

/* ── BentoDesktopGrid ───────────────────────────────────── */
function BentoDesktopGrid() {
  const [hovered, setHovered] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cw, setCw] = useState(0);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => setCw(entries[0].contentRect.width));
    ro.observe(containerRef.current);
    setCw(containerRef.current.clientWidth);
    return () => ro.disconnect();
  }, []);

  const col = cw > 0 ? (cw - 3 * G) / 4 : 0;

  const wFeatured = col * 3 + G * 2 + (hovered === "featured" ? DELTA : hovered === "mastercard" ? -DELTA : 0);
  const wMastercard = col + (hovered === "mastercard" ? DELTA : hovered === "featured" ? -DELTA : 0);

  const wInvertis = col + (hovered === "invertis" ? DELTA : hovered === "autoLoan" ? -DELTA / 2 : 0);
  const wAutoLoan = col * 2 + G + (hovered === "autoLoan" ? DELTA : hovered === "invertis" || hovered === "vivienda" ? -DELTA : 0);
  const wVivienda = col + (hovered === "vivienda" ? DELTA : hovered === "autoLoan" ? -DELTA / 2 : 0);

  const T = "width 0.42s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s ease";

  const card = (id: string, w: number, children: React.ReactNode) => (
    <div
      key={id}
      onMouseEnter={() => setHovered(id)}
      onMouseLeave={() => setHovered(null)}
      style={{
        flexShrink: 0,
        width: w,
        height: CARD_H,
        borderRadius: 32,
        overflow: "hidden",
        border: `1px solid ${hovered === id ? "var(--fun-orange)" : "#E7E4E1"}`,
        cursor: "pointer",
        transition: T,
      }}
    >
      {children}
    </div>
  );

  return (
    <div ref={containerRef} style={{ display: "flex", flexDirection: "column", gap: G }}>
      <div style={{ display: "flex", gap: G }}>
        {card("featured", wFeatured, <FeaturedBanner isMobile={false} />)}
        {card("mastercard", wMastercard, <MastercardCard />)}
      </div>
      <div style={{ display: "flex", gap: G }}>
        {card("invertis", wInvertis, <SmallProductCard item={invertisData} index={0} />)}
        {card("autoLoan", wAutoLoan, <AutoLoanCard isMobile={false} />)}
        {card("vivienda", wVivienda, <SmallProductCard item={viviendaData} index={1} />)}
      </div>
    </div>
  );
}

/* ── Mobile Stack ───────────────────────────────────────── */
function BentoMobileStack() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: G }}>
      {[
        <FeaturedBanner isMobile key="featured" />,
        <div key="mastercard" style={{ borderRadius: 32, overflow: "hidden", border: "1px solid #E7E4E1", height: 300 }}><MastercardCard /></div>,
        <div key="invertis" style={{ borderRadius: 32, overflow: "hidden", border: "1px solid #E7E4E1" }}><SmallProductCard item={invertisData} index={0} /></div>,
        <div key="autoLoan" style={{ borderRadius: 32, overflow: "hidden", border: "1px solid #E7E4E1", minHeight: 320 }}><AutoLoanCard isMobile /></div>,
        <div key="vivienda" style={{ borderRadius: 32, overflow: "hidden", border: "1px solid #E7E4E1" }}><SmallProductCard item={viviendaData} index={1} /></div>,
      ]}
    </div>
  );
}

/* ── ProductsSection (export) ───────────────────────────── */
export function ProductsSection() {
  const isMobile = useIsMobile();
  const px = isMobile ? 16 : "clamp(16px, 3.9vw, 72px)";

  return (
    <section style={{ background: "#fff", paddingTop: 40, paddingBottom: 64 }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", paddingLeft: px, paddingRight: px }}>
        <SectionHeading
          tag="Banca para Personas"
          headline={<>Protegemos y multiplicamos<br />lo que más valoras</>}
          body="Cuentas, tarjetas, préstamos e inversiones pensados para simplificar tu vida financiera y hacer crecer lo que construyes."
          mb={40}
        />
        {isMobile ? <BentoMobileStack /> : <BentoDesktopGrid />}
      </div>
    </section>
  );
}
