import { useRef, useState, useLayoutEffect } from "react";
import React from "react";
import { motion, useInView } from "motion/react";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Home, ChevronRight, Card, Car } from "@/lib/icons";
import { useIsMobile } from "@/hooks/useIsMobile";
import { SectionTag, SectionHeading } from "@/components/ui/atoms";
import { CTA_BUTTON_COLORS, CTA_BUTTON_SIZE } from "@/constants/ctaButtons";
import { TAG_PILL_HUG } from "@/constants/tagPill";
import { HeroCtaButton } from "@/components/atoms/HeroCtaButton";

const CUENTA_AHORROS_ROUTE = "/personas/cuentas/cuenta-de-ahorros";

const OR = "var(--fun-orange)";
const DARK = "var(--uni-dark)";
const SOFT = "var(--uni-dark-soft)";
const CARD_H = 480;
const G = 8;
const DELTA = 20;
/** Mobile bento — all cards match the orange featured banner height */
const MOBILE_BENTO_CARD_H = 512;

/* ── Images ────────────────────────────────────────────── */
const IMG_PORTRAIT = "/5ca273f3-86ff-4e66-a9f7-ae25d492fce4.png";
const IMG_MASTERCARD =
  "/3fb82a8f-5139-401a-b4db-72502ed6a3c9.jpg";
const IMG_INVERTIS =
  "/f640d2cc-2ec6-40bd-8fd2-a953cc05b798.jpg";
const IMG_VIVIENDA =
  "/vivienda-panama.jpg";
const IMG_AUTO =
  "/db823a97-bba4-4a2f-a533-9c07d80474ef.jpg";

/* ── Data ───────────────────────────────────────────────── */
const invertisData = {
  icon: TrendingUp,
  tag: "Inversiones",
  title: "Invertis Global Income Fund",
  body: "Diversifica tu portafolio. Accede a mercados globales con nuestros expertos.",
  cta: "Conocer el fondo",
  href: "https://www.invertissecurities.com/es/invertis-global-income-fund",
  image: IMG_INVERTIS,
};

const viviendaData = {
  icon: Home,
  tag: "Hipotecario",
  title: "Préstamos de Vivienda",
  body: "Construye hoy el hogar que imaginas. Condiciones competitivas y acompañamiento.",
  cta: "Solicitar hipoteca",
  href: "/personas/credito/prestamo-de-vivienda",
  image: IMG_VIVIENDA,
};

/* ── Sub-components ─────────────────────────────────────── */
type ProductButtonVariant = "primary" | "onOrangeSolid" | "onOrangeOutline" | "onLightSolid";

interface ProductButtonProps {
  children: React.ReactNode;
  variant?: ProductButtonVariant;
  fullWidth?: boolean;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

function ProductButton({ children, variant = "primary", fullWidth, href, onClick }: ProductButtonProps) {
  const [hov, setHov] = useState(false);
  const [pressed, setPressed] = useState(false);

  const palette: Record<ProductButtonVariant, {
    bg: string; bgHover: string; bgActive: string; color: string; border: string; borderHover: string;
  }> = {
    primary: {
      bg: CTA_BUTTON_COLORS.primary.bg,
      bgHover: CTA_BUTTON_COLORS.primary.bgHover,
      bgActive: CTA_BUTTON_COLORS.primary.bgHover,
      color: CTA_BUTTON_COLORS.primary.color,
      border: "none", borderHover: "none",
    },
    onLightSolid: {
      bg: CTA_BUTTON_COLORS.lightSolid.bg,
      bgHover: CTA_BUTTON_COLORS.lightSolid.bgHover,
      bgActive: CTA_BUTTON_COLORS.lightSolid.bgActive,
      color: CTA_BUTTON_COLORS.lightSolid.color,
      border: "none", borderHover: "none",
    },
    onOrangeSolid: {
      bg: CTA_BUTTON_COLORS.onOrangeSolid.bg,
      bgHover: CTA_BUTTON_COLORS.onOrangeSolid.bgHover,
      bgActive: CTA_BUTTON_COLORS.onOrangeSolid.bgActive,
      color: CTA_BUTTON_COLORS.onOrangeSolid.color,
      border: "none", borderHover: "none",
    },
    onOrangeOutline: {
      bg: "transparent", bgHover: "transparent", bgActive: "transparent", color: "#F7E8E0",
      border: "2px solid rgba(247,232,224,0.7)", borderHover: "2px solid #fff",
    },
  };
  const p = palette[variant];
  const bg = pressed ? p.bgActive : hov ? p.bgHover : p.bg;

  const style: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: variant === "primary" ? CTA_BUTTON_SIZE.paddingPrimary : `0 ${CTA_BUTTON_SIZE.paddingX}px`,
    height: variant === "primary" ? undefined : CTA_BUTTON_SIZE.height,
    minHeight: variant === "primary" ? undefined : CTA_BUTTON_SIZE.minHeight,
    borderRadius: CTA_BUTTON_SIZE.borderRadius,
    border: hov ? p.borderHover : p.border,
    background: bg,
    color: p.color,
    fontSize: CTA_BUTTON_SIZE.fontSize,
    fontWeight: CTA_BUTTON_SIZE.fontWeight,
    lineHeight: CTA_BUTTON_SIZE.lineHeight,
    cursor: "pointer",
    transition: "background 0.18s, border-color 0.18s, color 0.18s",
    width: fullWidth ? "100%" : undefined,
    whiteSpace: "nowrap",
    textDecoration: "none",
    boxSizing: "border-box",
  };

  const handlers = {
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => { setHov(false); setPressed(false); },
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
  };

  if (href) {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        onClick={onClick}
        {...handlers}
        style={style}
      >
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} {...handlers} style={style}>
      {children}
    </button>
  );
}

// Backwards-compatible alias for the primary orange CTA used elsewhere in this section
const OrangeButton = ({ children, fullWidth, href }: { children: React.ReactNode; fullWidth?: boolean; href?: string }) => (
  <ProductButton variant="primary" fullWidth={fullWidth} href={href}>{children}</ProductButton>
);

function CtaLink({ children, href }: { children: React.ReactNode; href?: string }) {
  const [hov, setHov] = useState(false);
  const style: React.CSSProperties = {
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
    textDecoration: "none",
  };
  const inner = (
    <>
      {children}
      <ChevronRight size={13} strokeWidth={2.5} />
    </>
  );
  if (href) {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={style}
      >
        {inner}
      </a>
    );
  }
  return (
    <span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={style}
    >
      {inner}
    </span>
  );
}

function CategoryTag({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <span
      style={{
        ...TAG_PILL_HUG,
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
  const navigate = useNavigate();
  const go = () => navigate(CUENTA_AHORROS_ROUTE);
  return (
    <div
      role="link"
      tabIndex={0}
      onClick={go}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } }}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: isMobile ? 32 : 0,
        background: "#FF8136",
        display: isMobile ? "block" : "flex",
        flexDirection: isMobile ? undefined : "row",
        alignItems: "stretch",
        height: isMobile ? MOBILE_BENTO_CARD_H : "100%",
        width: "100%",
        minHeight: isMobile ? MOBILE_BENTO_CARD_H : undefined,
        cursor: "pointer",
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

      {isMobile ? (
        <>
          {/* Mobile: portrait as background — bottom-right, full figure visible */}
          <img
            src={IMG_PORTRAIT}
            alt=""
            aria-hidden
            style={{
              position: "absolute",
              right: -4,
              bottom: 0,
              height: "94%",
              width: "auto",
              maxWidth: "62%",
              objectFit: "contain",
              objectPosition: "bottom right",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          {/* Mobile: content overlay */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              height: "100%",
              padding: "28px 24px 24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 20,
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 12,
                maxWidth: "58%",
              }}
            >
              <div
                style={{
                  ...TAG_PILL_HUG,
                  border: "1px solid rgba(255,255,255,0.45)",
                  borderRadius: 9999,
                  padding: "5px 14px",
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
              <p
                style={{
                  margin: 0,
                  color: "#fff",
                  fontSize: 28,
                  fontWeight: 700,
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                }}
              >
                Cuenta de ahorros digital
              </p>
              <p
                style={{
                  margin: 0,
                  color: "#fff",
                  fontSize: 18,
                  fontWeight: 600,
                  lineHeight: 1.35,
                }}
              >
                Aprobación en minutos!
              </p>
              <p
                style={{
                  margin: 0,
                  color: "rgba(255,255,255,0.88)",
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: 1.55,
                }}
              >
                Abre tu cuenta 100% digital sin filas ni papeleos. Accede a todos los servicios de UniBank desde donde estés.
              </p>
            </div>

            <div onClick={(e) => e.stopPropagation()} style={{ width: "100%" }}>
              <HeroCtaButton to={CUENTA_AHORROS_ROUTE} variant="secondary" fullWidth>
                Abrir mi cuenta ahora
              </HeroCtaButton>
            </div>
          </div>
        </>
      ) : (
        <>
      {/* ── Left panel: badge + title ── */}
      <div
        style={{
          flex: 1,
          padding: 48,
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
            ...TAG_PILL_HUG,
            border: "1px solid rgba(255,255,255,0.45)",
            borderRadius: 9999,
            padding: "5px 14px",
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
            fontSize: 48,
            fontWeight: 700,
            lineHeight: "58px",
          }}
        >
          Cuenta de ahorros digital
        </p>
      </div>

      {/* ── Center: portrait image ── */}
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
            alt="Cuenta de Ahorros"
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

      {/* ── Right panel: subtitle + body + CTAs ── */}
      <div
        style={{
          flex: 1,
          padding: 48,
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
            fontSize: 24,
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

        {/* CTA */}
        <div style={{ paddingTop: 12 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              userSelect: "none",
            }}
          >
            Abrir mi cuenta ahora
            <ChevronRight size={13} strokeWidth={2.5} />
          </span>
        </div>
      </div>
        </>
      )}
    </div>
  );
}

/* ── MastercardCard ─────────────────────────────────────── */
const mastercardData = {
  icon: Card,
  tag: "Tarjetas",
  title: "Tarjeta Mastercard Black Débito",
  body: "Exclusividad y control en tus manos. Beneficios premium globales.",
  cta: "Solicitar tarjeta",
  href: "/personas/otros-servicios/mastercard-black-debito",
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
      <div style={{ padding: "20px 20px 24px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10, flex: "0 0 auto" }}>
        <CategoryTag icon={mastercardData.icon} label={mastercardData.tag} />
        <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: DARK, letterSpacing: "-0.01em", lineHeight: 1.3 }}>
          {mastercardData.title}
        </h4>
        <p style={{ margin: 0, fontSize: 13, color: SOFT, lineHeight: 1.6 }}>{mastercardData.body}</p>
        <CtaLink href={mastercardData.href}>{mastercardData.cta}</CtaLink>
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
      <div style={{ padding: "20px 20px 24px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10, flex: "0 0 auto" }}>
        <CategoryTag icon={item.icon} label={item.tag} />
        <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: DARK, letterSpacing: "-0.01em", lineHeight: 1.3 }}>
          {item.title}
        </h4>
        <p style={{ margin: 0, fontSize: 13, color: SOFT, lineHeight: 1.6 }}>{item.body}</p>
        <CtaLink href={(item as { href?: string }).href}>{item.cta}</CtaLink>
      </div>
    </motion.div>
  );
}

/* ── AutoLoanCard ───────────────────────────────────────── */
function AutoLoanCard({ isMobile }: { isMobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  const imageBlock = (
    <div style={{ flex: isMobile ? "1 1 auto" : "1 1 50%", minHeight: isMobile ? 160 : undefined, overflow: "hidden" }}>
      <img
        src={IMG_AUTO}
        alt="Auto loan"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </div>
  );

  const contentBlock = (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        flex: isMobile ? "0 0 auto" : "1 1 50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 16,
        padding: isMobile ? "24px 20px 20px" : "32px 28px",
        background: "#fff",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10 }}>
        <CategoryTag icon={Car} label="Crédito de Auto" />
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
      </div>
      <CtaLink href="https://onboardauto.unibank.com.pa/">Solicitar Crédito ahora</CtaLink>
    </motion.div>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        height: "100%",
        width: "100%",
      }}
    >
      {isMobile ? (
        <>
          {imageBlock}
          {contentBlock}
        </>
      ) : (
        <>
          {contentBlock}
          {imageBlock}
        </>
      )}
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
const mobileBentoCardStyle: React.CSSProperties = {
  borderRadius: 32,
  overflow: "hidden",
  border: "1px solid #E7E4E1",
  height: MOBILE_BENTO_CARD_H,
};

function BentoMobileStack() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: G }}>
      <FeaturedBanner isMobile key="featured" />
      <div key="mastercard" style={mobileBentoCardStyle}><MastercardCard /></div>
      <div key="invertis" style={mobileBentoCardStyle}><SmallProductCard item={invertisData} index={0} /></div>
      <div key="autoLoan" style={mobileBentoCardStyle}><AutoLoanCard isMobile /></div>
      <div key="vivienda" style={mobileBentoCardStyle}><SmallProductCard item={viviendaData} index={1} /></div>
    </div>
  );
}

/* ── ProductsSection (export) ───────────────────────────── */
export function ProductsSection() {
  const isMobile = useIsMobile();

  return (
    <section style={{ background: "#fff", paddingTop: 40, paddingBottom: 64 }}>
      <div className="site-container">
        <SectionHeading
          tag="Banca para Personas"
          headline={<>Protegemos y multiplicamos lo que más valoras</>}
          body="Cuentas, tarjetas e inversiones pensados para simplificar tu vida financiera y hacer crecer lo que construyes."
          mb={40}
        />
        {isMobile ? <BentoMobileStack /> : <BentoDesktopGrid />}
      </div>
    </section>
  );
}
