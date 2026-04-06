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
const IMG_PORTRAIT = "/5ca273f3-86ff-4e66-a9f7-ae25d492fce4.png";
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

/* ── FeaturedBanner ─────────────────────────────────────── */
function FeaturedBanner({ isMobile }: { isMobile: boolean }) {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: isMobile ? 32 : 0,
        background: "#FF8136",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "stretch",
        height: isMobile ? "auto" : "100%",
        width: "100%",
        minHeight: isMobile ? 360 : undefined,
      }}
    >
      {/* ── Blob SVG background ── */}
      <svg
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
        }}
        viewBox="0 0 1336 460"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <circle cx="1060" cy="230" r="340" fill="#FF9A52" fillOpacity="0.55" />
        <circle cx="1180" cy="140" r="220" fill="#FFB273" fillOpacity="0.35" />
        <ellipse cx="120" cy="480" rx="260" ry="200" fill="#E8721F" fillOpacity="0.35" />
      </svg>

      {/* ── Left panel: badge + title ── */}
      <div
        style={{
          flex: 1,
          padding: isMobile ? "32px 24px 20px" : 48,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          position: "relative",
          zIndex: 1,
          gap: 16,
        }}
      >
        {/* Badge */}
        <div
          style={{
            border: "1px solid rgba(255,255,255,0.45)",
            borderRadius: 9999,
            padding: "5px 14px",
            display: "inline-flex",
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.9)",
            }}
          >
            100% Digital
          </span>
        </div>

        {/* Title */}
        <p
          style={{
            margin: 0,
            color: "#fff",
            fontSize: isMobile ? 32 : 48,
            fontWeight: 700,
            lineHeight: isMobile ? "40px" : "58px",
          }}
        >
          Cuenta<br />Naranja +<br />Digital
        </p>
      </div>

      {/* ── Center: portrait image (desktop only) ── */}
      {!isMobile && (
        <div
          style={{
            width: 300,
            flexShrink: 0,
            position: "relative",
            zIndex: 1,
            alignSelf: "stretch",
            overflow: "visible",
          }}
        >
          <img
            src={IMG_PORTRAIT}
            alt="Cuenta Naranja + Digital"
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              height: "110%",
              width: "auto",
              objectFit: "contain",
              objectPosition: "bottom center",
              maxWidth: "none",
            }}
          />
        </div>
      )}

      {/* ── Right panel: subtitle + body + CTAs ── */}
      <div
        style={{
          flex: 1,
          padding: isMobile ? "0 24px 32px" : 48,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          position: "relative",
          zIndex: 1,
          gap: 12,
        }}
      >
        <p
          style={{
            margin: 0,
            color: "#fff",
            fontSize: isMobile ? 20 : 24,
            fontWeight: 600,
            lineHeight: "32px",
          }}
        >
          Aprobación en minutos!
        </p>
        <p
          style={{
            margin: 0,
            color: "rgba(255,255,255,0.85)",
            fontSize: 15,
            fontWeight: 400,
            lineHeight: "22px",
          }}
        >
          Abre tu cuenta 100% digital sin filas ni
          papeleos. Accede a todos los servicios
          de UniBank desde donde estés.
        </p>

        {/* CTAs */}
        <div
          style={{
            paddingTop: 20,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <button
            style={{
              width: "100%",
              height: 52,
              background: "#F7E8E0",
              border: "none",
              borderRadius: 16,
              color: "#FF8136",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "0.004em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            Abrir mi cuenta ahora <Plus size={16} strokeWidth={2.5} />
          </button>
          <button
            style={{
              width: "100%",
              height: 52,
              background: "transparent",
              border: "2px solid rgba(247,232,224,0.7)",
              borderRadius: 16,
              color: "#F7E8E0",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "0.004em",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(247,232,224,0.7)"; }}
          >
            Saber más...
          </button>
        </div>
      </div>

      {/* ── Mobile image ── */}
      {isMobile && (
        <div style={{ width: "100%", height: 200, overflow: "hidden", position: "relative", zIndex: 1 }}>
          <img
            src={IMG_PORTRAIT}
            alt="Cuenta Naranja + Digital"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
          />
        </div>
      )}
    </div>
  );
}

/* ── MastercardCard ─────────────────────────────────────── */
const mastercardData = {
  icon: Plus,
  tag: "Tarjetas",
  title: "Tarjeta Mastercard Black Débito",
  body: "Exclusividad y control en tus manos. Beneficios premium globales.",
  cta: "Solicitar tarjeta",
  image: IMG_MASTERCARD,
};

function MastercardCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
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
          src={mastercardData.image}
          alt={mastercardData.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
      {/* Content */}
      <div style={{ padding: "20px 20px 24px", display: "flex", flexDirection: "column", gap: 10, flex: "0 0 auto" }}>
        <CategoryTag icon={mastercardData.icon} label={mastercardData.tag} />
        <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: DARK, letterSpacing: "-0.01em", lineHeight: 1.3 }}>
          {mastercardData.title}
        </h4>
        <p style={{ margin: 0, fontSize: 13, color: SOFT, lineHeight: 1.6 }}>{mastercardData.body}</p>
        <CtaLink>{mastercardData.cta}</CtaLink>
      </div>
    </motion.div>
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
