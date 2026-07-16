import { useRef, useState, useEffect } from "react";
import React from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  MessageCircle,
  Phone,
  ChevronRight,
  ChevronLeft,
  ArrowSwapHorizontal2,
  UserPlus,
  Card,
  Smartphone,
  ShieldCheck,
  Clock,
} from "@/lib/icons";
import { useIsMobile } from "@/hooks/useIsMobile";
import { OrangeBlobBackground } from "@/components/atoms/OrangeBlobBackground";
import { BtnPrimary, SectionHeading } from "@/components/ui/atoms";
import { TAG_PILL_HUG, TAG_STACK_HUG } from "@/constants/tagPill";

const OR = "var(--fun-orange)";
const DARK = "var(--uni-dark)";
const SOFT = "var(--uni-dark-soft)";
const CARD_BG = "#f2efed";
const BORDER = "#E7E4E1";
const MUTED = "var(--uni-muted)";
const IMG_OVERLAY = "hsl(20 25% 12% / 0.45)";

/* ── Data ───────────────────────────────────────────────── */
const FEATURES = [
  {
    id: "transfers",
    title: "Transferencias",
    tag: "ACH Xpress y Xpress",
    cta: "Hacer una transferencia",
    href: "https://ebanking.unibank.com.pa/DIBS_UNIBANK_PANAMA/pages/loginP.jsp",
    description:
      "Envía dinero en segundos a otros bancos de forma rápida, simple y segura.",
    image:
      "/transferencias.jpg",
  },
  {
    id: "opening",
    title: "Apertura digital",
    tag: "Sin papeleos",
    cta: "Abrir mi cuenta",
    href: "https://onboard.unibank.com.pa/es/auth/login",
    description:
      "Abre cuentas y solicita nuevos productos en minutos, sin visitar una sucursal. Tu tiempo es demasiado valioso.",
    image:
      "/apertura-digital.jpg",
  },
  {
    id: "payments",
    title: "Paga servicios",
    tag: "Sin comisiones",
    cta: "Pagar un servicio",
    href: "https://ebanking.unibank.com.pa/DIBS_UNIBANK_PANAMA/pages/loginP.jsp",
    description:
      "Paga electricidad, agua, celular y más directamente desde la app. Sin filas, sin comisiones, en segundos.",
    image:
      "/pagos-servicios.jpg",
  },
];

const FEATURE_ICONS = [ArrowSwapHorizontal2, UserPlus, Card];

/** Shared spacing for desktop accordion + mobile feature cards */
const FEATURE_BOX = {
  paddingBlock: 24,
  headerBodyGap: 16,
  bodyGap: 16,
  bodyOffsetLeft: 42,
  mobileContentPadding: "28px 20px 24px",
} as const;

const FEATURE_TAG_PILL_BASE: React.CSSProperties = TAG_PILL_HUG;

const IMAGE_OVERLAY_STACK: React.CSSProperties = {
  ...TAG_STACK_HUG,
  position: "absolute",
  gap: 8,
  zIndex: 2,
};

const OVERLAY_TAG_STYLE: React.CSSProperties = {
  ...FEATURE_TAG_PILL_BASE,
  padding: "4px 12px",
  borderRadius: 99,
  background: "hsl(20 100% 60% / 0.18)",
  border: "1px solid hsl(20 100% 60% / 0.35)",
  fontSize: 10,
  fontWeight: 700,
  color: "#fff",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
};

function FeatureIconBadge({
  index,
  isActive,
  size = 32,
}: {
  index: number;
  isActive: boolean;
  size?: number;
}) {
  const Icon = FEATURE_ICONS[index];
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: 10,
        background: isActive ? OR : "hsl(20 100% 95%)",
        transition: "background 0.25s, transform 0.25s",
        flexShrink: 0,
      }}
    >
      <Icon size={size === 32 ? 16 : 15} strokeWidth={1.75} color={isActive ? "#fff" : OR} />
    </span>
  );
}

function BancaDigitalLabel({ light = false }: { light?: boolean }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 10,
        fontWeight: 700,
        color: light ? "hsl(20 80% 92%)" : OR,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}
    >
      <Smartphone size={12} strokeWidth={2.25} />
      Banca Digital
    </span>
  );
}

function FeatureBoxBody({
  feature,
  indent = true,
  showTag = true,
}: {
  feature: (typeof FEATURES)[0];
  indent?: boolean;
  showTag?: boolean;
}) {
  const isMobile = useIsMobile();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: isMobile ? "stretch" : "flex-start",
        gap: FEATURE_BOX.bodyGap,
        paddingLeft: indent ? FEATURE_BOX.bodyOffsetLeft : 0,
        width: isMobile && !indent ? "100%" : undefined,
      }}
    >
      {showTag && (
        <span
          style={{
            ...FEATURE_TAG_PILL_BASE,
            gap: 5,
            padding: "4px 10px",
            borderRadius: 99,
            background: "hsl(20 100% 95%)",
            color: OR,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {feature.tag}
        </span>
      )}
      <p style={{ margin: 0, fontSize: 14, color: SOFT, lineHeight: 1.65, maxWidth: 380 }}>
        {feature.description}
      </p>
      <BtnPrimary href={feature.href} fullWidth={isMobile}>
        {feature.cta}
        <ChevronRight size={13} strokeWidth={2.5} />
      </BtnPrimary>
    </div>
  );
}

/* ── Ghost CTA button ───────────────────────────────────── */
function CtaGhostBtn({
  href,
  children,
  icon,
  fullWidth = false,
}: {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 9,
        padding: "14px 28px",
        borderRadius: 14,
        background: hov ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.15)",
        color: "#fff",
        border: "1px solid rgba(255,255,255,0.28)",
        textDecoration: "none",
        fontSize: "var(--btn-font-size)",
        fontWeight: "var(--btn-font-weight)",
        transition: "background 0.18s, border-color 0.18s",
        whiteSpace: "nowrap",
        width: fullWidth ? "100%" : undefined,
        alignSelf: fullWidth ? "stretch" : undefined,
      }}
    >
      {icon}
      {children}
    </a>
  );
}

/* ── Feature Row (accordion) ────────────────────────────── */
function FeatureRow({
  feature,
  index,
  isActive,
  onClick,
}: {
  feature: (typeof FEATURES)[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const [hov, setHov] = useState(false);

  return (
    <article
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderTop: `${isActive ? 2 : 1}px solid ${isActive ? OR : BORDER}`,
        paddingTop: FEATURE_BOX.paddingBlock,
        paddingBottom: FEATURE_BOX.paddingBlock,
        background: isActive ? "hsl(20 100% 60% / 0.05)" : hov ? "hsl(0 0% 12% / 0.02)" : "transparent",
        cursor: isActive ? "default" : "pointer",
        transition: "background 0.22s ease, border-color 0.22s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: isActive ? FEATURE_BOX.headerBodyGap : 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: isActive ? OR : MUTED,
              letterSpacing: "0.06em",
              minWidth: 24,
              transition: "color 0.25s",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <FeatureIconBadge index={index} isActive={isActive} />
          <span
            style={{
              flex: 1,
              fontSize: 16,
              fontWeight: 700,
              color: isActive ? DARK : hov ? DARK : MUTED,
              letterSpacing: "-0.01em",
              transition: "color 0.25s",
            }}
          >
            {feature.title}
          </span>
          {!isActive && (
            <ChevronRight
              size={16}
              color={hov ? OR : BORDER}
              style={{ flexShrink: 0, opacity: hov ? 1 : 0.5, transition: "opacity 0.2s, color 0.2s" }}
            />
          )}
        </div>

        <AnimatePresence initial={false}>
          {isActive && (
            <motion.div
              key={`exp-${index}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.32, ease: "easeOut" }}
              style={{ overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "flex-start" }}
            >
              <FeatureBoxBody feature={feature} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
}

/* ── Mobile Carousel ────────────────────────────────────── */
function MobileFeatureCarousel({ features }: { features: typeof FEATURES }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const N = features.length;

  const goTo = (idx: number) => setActiveIndex(idx);
  const goNext = () => goTo((activeIndex + 1) % N);
  const goPrev = () => goTo((activeIndex - 1 + N) % N);

  const feature = features[activeIndex];

  return (
    <div
      style={{
        width: "100%",
        borderRadius: 28,
        overflow: "hidden",
        position: "relative",
        border: `1px solid ${BORDER}`,
        boxShadow: "var(--shadow-sm)",
      }}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        const dx = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(dx) > 44) dx > 0 ? goNext() : goPrev();
      }}
    >
      {/* Image stack */}
      <div style={{ position: "relative", height: 280, overflow: "hidden" }}>
        {features.map((f, i) => (
          <motion.img
            key={f.id}
            src={f.image}
            alt={f.title}
            animate={{ opacity: i === activeIndex ? 1 : 0, scale: i === activeIndex ? 1 : 1.04 }}
            transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: IMG_OVERLAY,
          }}
        />
        <div
          style={{
            ...IMAGE_OVERLAY_STACK,
            bottom: 16,
            left: 16,
          }}
        >
          <BancaDigitalLabel light />
          <AnimatePresence mode="wait">
            <motion.span
              key={`mob-tag-${activeIndex}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.22 }}
              style={OVERLAY_TAG_STYLE}
            >
              {feature.tag}
            </motion.span>
          </AnimatePresence>
        </div>
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            padding: "6px 10px",
            borderRadius: 99,
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(6px)",
            fontSize: 11,
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "0.06em",
          }}
        >
          {String(activeIndex + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
        </div>
      </div>

      {/* Content */}
      <div style={{ background: CARD_BG, padding: FEATURE_BOX.mobileContentPadding }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`mob-content-${activeIndex}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              gap: FEATURE_BOX.headerBodyGap,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <FeatureIconBadge index={activeIndex} isActive />
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4
                  style={{
                    margin: 0,
                    fontSize: 20,
                    fontWeight: 800,
                    color: DARK,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {feature.title}
                </h4>
                <span
                  style={{
                    ...FEATURE_TAG_PILL_BASE,
                    gap: 5,
                    marginTop: 8,
                    padding: "3px 10px",
                    borderRadius: 99,
                    background: "hsl(20 100% 95%)",
                    color: OR,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {feature.tag}
                </span>
              </div>
            </div>
            <FeatureBoxBody feature={feature} indent={false} showTag={false} />
          </motion.div>
        </AnimatePresence>

        {/* Dot nav */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginTop: 28,
          }}
        >
          <button
            onClick={goPrev}
            aria-label="Anterior"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: 12,
              border: `1px solid ${BORDER}`,
              background: "#fff",
              cursor: "pointer",
              color: DARK,
              transition: "border-color 0.18s, color 0.18s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = OR;
              e.currentTarget.style.color = OR;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = BORDER;
              e.currentTarget.style.color = DARK;
            }}
          >
            <ChevronLeft size={16} />
          </button>
          {features.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === activeIndex ? 24 : 8,
                height: 8,
                borderRadius: 99,
                border: "none",
                cursor: "pointer",
                padding: 0,
                background: i === activeIndex ? OR : BORDER,
                transition: "width 0.28s ease, background 0.2s",
              }}
            />
          ))}
          <button
            onClick={goNext}
            aria-label="Siguiente"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: 12,
              border: `1px solid ${BORDER}`,
              background: "#fff",
              cursor: "pointer",
              color: DARK,
              transition: "border-color 0.18s, color 0.18s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = OR;
              e.currentTarget.style.color = OR;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = BORDER;
              e.currentTarget.style.color = DARK;
            }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Sticky Scroll (desktop) ────────────────────────────── */
function StickyScrollFeatures({ features }: { features: typeof FEATURES }) {
  const N = features.length;
  const outerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (isMobile) return;
    const onScroll = () => {
      if (!outerRef.current) return;
      const rect = outerRef.current.getBoundingClientRect();
      const outerH = outerRef.current.offsetHeight;
      const viewH = window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const totalScrollable = outerH - viewH;
      if (totalScrollable <= 0) return;
      const prog = Math.min(scrolled / totalScrollable, 1);
      setActiveIndex(Math.min(Math.floor(prog * N), N - 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile, N]);

  if (isMobile) {
    return <MobileFeatureCarousel features={features} />;
  }

  return (
    <div
      ref={outerRef}
      style={{ height: `${N * 100}vh`, position: "relative" }}
    >
      <div
        style={{
          position: "sticky",
          top: 80,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
          height: "calc(100vh - 160px)",
          maxHeight: 700,
          alignItems: "stretch",
        }}
      >
        {/* Left: accordion list */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
          {features.map((f, i) => (
            <FeatureRow
              key={f.id}
              feature={f}
              index={i}
              isActive={i === activeIndex}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>

        {/* Right: image */}
        <div
          style={{
            borderRadius: 28,
            overflow: "hidden",
            position: "relative",
            height: "100%",
            boxShadow: "var(--shadow-md)",
          }}
        >
          {features.map((f, i) => (
            <motion.img
              key={f.id}
              src={f.image}
              alt={f.title}
              animate={{ opacity: i === activeIndex ? 1 : 0, scale: i === activeIndex ? 1 : 1.06 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          ))}

          <div
            style={{
              position: "absolute",
              inset: 0,
              background: IMG_OVERLAY,
              pointerEvents: "none",
            }}
          />

          {/* Overlay label */}
          <div
            style={{
              ...IMAGE_OVERLAY_STACK,
              top: 20,
              left: 20,
            }}
          >
            <BancaDigitalLabel light />
            <AnimatePresence mode="wait">
              <motion.span
                key={`tag-${activeIndex}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                style={OVERLAY_TAG_STYLE}
              >
                {features[activeIndex].tag}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Step dots */}
          <div
            style={{
              position: "absolute",
              right: 20,
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              zIndex: 2,
            }}
          >
            {features.map((_, i) => (
              <span
                key={i}
                style={{
                  width: 8,
                  height: i === activeIndex ? 24 : 8,
                  borderRadius: 99,
                  background: i === activeIndex ? OR : "rgba(255,255,255,0.45)",
                  transition: "height 0.28s ease, background 0.2s",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── DigitalBanking (export) ────────────────────────────── */
export function DigitalBanking() {
  const isMobile = useIsMobile();
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <section style={{ background: "#fff" }}>
      <div className="site-container">
        {/* Section heading */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
          style={{ paddingTop: 64, paddingBottom: 48 }}
        >
          <SectionHeading
            tag="Banca Digital"
            headline={
              <>
                Todo tu banco en{" "}
                <span style={{ color: OR }}>la palma de tu mano.</span>
              </>
            }
            body="Transfiere en segundos, paga servicios y abre cuentas sin pisar una sucursal. Disponible las 24 horas, los 7 días de la semana."
            mb={0}
          />
        </motion.div>

        {/* Sticky scroll / mobile carousel */}
        <StickyScrollFeatures features={FEATURES} />

        {/* Authority quote */}
        <div
          style={{
            margin: "64px 0 0",
            padding: isMobile ? "40px 24px" : "56px 80px",
            background: "#f5f0ec",
            borderRadius: 24,
            border: `1px solid ${BORDER}`,
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: "0 0 20px",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12,
              fontWeight: 700,
              color: OR,
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
            }}
          >
            <ShieldCheck size={15} strokeWidth={2.25} />
            Liderazgo y ética comprobada
          </p>
          <p
            style={{
              margin: 0,
              fontSize: isMobile ? 18 : 22,
              lineHeight: 1.7,
              color: "#726f6e",
              fontWeight: 400,
            }}
          >
            Somos una entidad enfocada en la{" "}
            <strong style={{ color: "#1f1e1e" }}>innovación y la sostenibilidad</strong> —
            incluyendo la emisión de{" "}
            <strong style={{ color: "#1f1e1e" }}>Bonos Verdes</strong> — regulada y supervisada por
            la <strong style={{ color: "#1f1e1e" }}>Superintendencia de Bancos de Panamá</strong>.
          </p>
        </div>

        {/* Orange CTA banner */}
        <div
          style={{
            margin: "32px 0 64px",
            borderRadius: 28,
            background: "#FF8136",
            overflow: "hidden",
            position: "relative",
            boxShadow: "var(--shadow-orange)",
          }}
        >
          <OrangeBlobBackground />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "flex-start" : "center",
              justifyContent: "space-between",
              gap: isMobile ? 32 : 48,
              padding: isMobile ? "36px 20px" : "56px 64px",
            }}
          >
            {/* Left column */}
            <div style={{ flex: 1 }}>
              <p
                style={{
                  margin: "0 0 12px",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.85)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                }}
              >
                ¿Listo para transformar tu experiencia bancaria?
              </p>
              <h3
                style={{
                  margin: 0,
                  fontSize: isMobile ? 32 : 48,
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                Contáctanos hoy mismo.
              </h3>
            </div>

            {/* Right column */}
            <div
              style={{
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                gap: 16,
                width: isMobile ? "100%" : undefined,
                alignSelf: isMobile ? "stretch" : undefined,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: 12,
                  width: isMobile ? "100%" : undefined,
                }}
              >
                <CtaGhostBtn
                  href="tel:+50722976000"
                  icon={<Phone size={16} />}
                  fullWidth={isMobile}
                >
                  297-6000
                </CtaGhostBtn>
                <CtaGhostBtn
                  href="https://wa.me/50763280229"
                  icon={<MessageCircle size={16} />}
                  fullWidth={isMobile}
                >
                  WhatsApp 6328-0229
                </CtaGhostBtn>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 14,
                    color: "rgba(255,255,255,0.82)",
                    lineHeight: 1.5,
                  }}
                >
                  <Clock size={14} strokeWidth={2} />
                  Lunes a viernes 8:00 a.m. – 4:00 p.m. · Sábados 9:00 a.m. – 12:00 p.m.
                </span>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 14,
                    color: "rgba(255,255,255,0.72)",
                    lineHeight: 1.5,
                    paddingLeft: 22,
                  }}
                >
                  Cajero automático disponible 24 horas
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
