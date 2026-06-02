import { useRef, useState, useEffect } from "react";
import React from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  MessageCircle,
  Phone,
  ArrowRight,
  ArrowLeftRight,
  UserPlus,
  CreditCard,
  Bell,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { BtnPrimary, SectionHeading } from "@/components/ui/atoms";

const OR = "var(--fun-orange)";
const DARK = "var(--uni-dark)";
const SOFT = "var(--uni-dark-soft)";
const CARD_BG = "#f2efed";
const BORDER = "#E7E4E1";

/* ── Data ───────────────────────────────────────────────── */
const FEATURES = [
  {
    id: "transfers",
    title: "Transferencias",
    tag: "ACH Xpress y Xpress",
    cta: "Hacer una transferencia",
    href: "/banca-digital/transferencias",
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
  {
    id: "notifications",
    title: "Notificaciones",
    tag: "Alertas en tiempo real",
    cta: "Activar alertas",
    href: "/banca-digital/alertas",
    description:
      "Cada movimiento en tu cuenta llega al instante a tu teléfono. Tú siempre en control, siempre informado.",
    image:
      "/notificaciones.jpg",
  },
];

const FEATURE_ICONS = [ArrowLeftRight, UserPlus, CreditCard, Bell];

/* ── Ghost CTA button ───────────────────────────────────── */
function CtaGhostBtn({
  href,
  children,
  icon,
}: {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
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
        gap: 9,
        padding: "14px 28px",
        borderRadius: 14,
        background: hov ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.15)",
        color: "#fff",
        border: "none",
        textDecoration: "none",
        fontSize: "var(--btn-font-size)",
        fontWeight: "var(--btn-font-weight)",
        transition: "background 0.18s",
        whiteSpace: "nowrap",
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
  isMobile,
  onClick,
}: {
  feature: (typeof FEATURES)[0];
  index: number;
  isActive: boolean;
  isMobile: boolean;
  onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  const Icon = FEATURE_ICONS[index];

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ cursor: isActive ? "default" : "pointer" }}
    >
      {/* Top rule */}
      <div
        style={{
          height: isActive ? 2 : 1,
          background: isActive ? OR : BORDER,
          marginBottom: 16,
          transition: "background 0.25s, height 0.25s",
        }}
      />
      {/* Number + icon + title row */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: isActive ? OR : BORDER,
            letterSpacing: "0.06em",
            minWidth: 24,
            transition: "color 0.25s",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 30,
            height: 30,
            borderRadius: 8,
            background: isActive ? OR : "rgba(31,30,30,0.06)",
            transition: "background 0.25s",
            flexShrink: 0,
          }}
        >
          <Icon size={15} strokeWidth={1.5} color={isActive ? "#fff" : SOFT} />
        </span>
        <span
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: isActive ? DARK : hov ? DARK : "rgba(31,30,30,0.45)",
            letterSpacing: "-0.01em",
            transition: "color 0.25s",
          }}
        >
          {feature.title}
        </span>
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            key={`exp-${index}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ paddingLeft: 42, marginTop: 18, display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Tag pill */}
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "3px 10px",
                  borderRadius: 99,
                  background: "hsl(20 100% 95%)",
                  color: OR,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  width: "fit-content",
                }}
              >
                {feature.tag}
              </span>
              <p style={{ margin: 0, fontSize: 14, color: SOFT, lineHeight: 1.65, maxWidth: 380 }}>
                {feature.description}
              </p>
              <BtnPrimary href={feature.href}>
                {feature.cta}
                <ArrowRight size={13} strokeWidth={2.5} />
              </BtnPrimary>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom spacer */}
      <div style={{ height: 20 }} />
    </div>
  );
}

/* ── Mobile Carousel ────────────────────────────────────── */
function MobileFeatureCarousel({ features }: { features: typeof FEATURES }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const touchStartX = useRef(0);
  const N = features.length;

  const goTo = (idx: number, d: number) => {
    setDir(d);
    setActiveIndex(idx);
  };
  const goNext = () => goTo((activeIndex + 1) % N, 1);
  const goPrev = () => goTo((activeIndex - 1 + N) % N, -1);

  const feature = features[activeIndex];

  return (
    <div
      style={{ width: "100%", borderRadius: 28, overflow: "hidden", position: "relative" }}
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
            background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)",
          }}
        />
        <div style={{ position: "absolute", bottom: 16, left: 16, display: "flex", flexDirection: "column", gap: 8 }}>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "rgba(255,255,255,0.8)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Banca Digital
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={`mob-tag-${activeIndex}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.22 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "3px 10px",
                borderRadius: 99,
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                fontSize: 10,
                fontWeight: 700,
                color: "rgba(255,255,255,0.92)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                width: "fit-content",
              }}
            >
              {feature.tag}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Content */}
      <div style={{ background: "#fff", padding: "20px 20px 24px" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`mob-content-${activeIndex}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
          >
            <h4
              style={{
                margin: "0 0 8px",
                fontSize: 20,
                fontWeight: 800,
                color: DARK,
                letterSpacing: "-0.02em",
              }}
            >
              {feature.title}
            </h4>
            <p style={{ margin: "0 0 16px", fontSize: 14, color: SOFT, lineHeight: 1.65 }}>
              {feature.description}
            </p>
            <BtnPrimary href={feature.href}>
              {feature.cta}
            </BtnPrimary>
          </motion.div>
        </AnimatePresence>

        {/* Dot nav */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 20 }}>
          <button
            onClick={goPrev}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: `1px solid ${BORDER}`,
              background: "#fff",
              cursor: "pointer",
              color: DARK,
            }}
          >
            <ChevronLeft size={16} />
          </button>
          {features.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > activeIndex ? 1 : -1)}
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
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: `1px solid ${BORDER}`,
              background: "#fff",
              cursor: "pointer",
              color: DARK,
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
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {features.map((f, i) => (
            <FeatureRow
              key={f.id}
              feature={f}
              index={i}
              isActive={i === activeIndex}
              isMobile={false}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>

        {/* Right: image */}
        <div style={{ borderRadius: 28, overflow: "hidden", position: "relative", height: "100%" }}>
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

          {/* Overlay label */}
          <div
            style={{
              position: "absolute",
              top: 20,
              left: 20,
              display: "flex",
              flexDirection: "column",
              gap: 8,
              zIndex: 2,
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "rgba(255,255,255,0.75)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Banca Digital
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={`tag-${activeIndex}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "4px 12px",
                  borderRadius: 99,
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.9)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  width: "fit-content",
                }}
              >
                {features[activeIndex].tag}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── DigitalBanking (export) ────────────────────────────── */
export function DigitalBanking() {
  const isMobile = useIsMobile();
  const px = isMobile ? 16 : "clamp(16px, 3.9vw, 72px)";
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <section style={{ background: "#fff" }}>
      <div style={{ maxWidth: "98vw", margin: "0 auto", paddingLeft: px, paddingRight: px }}>
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
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: "0 0 20px",
              fontSize: 12,
              fontWeight: 700,
              color: OR,
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
            }}
          >
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
          }}
        >

          <div
            style={{
              position: "relative",
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
                Contáctanos{"\n"}hoy mismo.
              </h3>
            </div>

            {/* Right column */}
            <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: 12,
                }}
              >
                <CtaGhostBtn
                  href="tel:+50722976000"
                  icon={<Phone size={16} />}
                >
                  297-6000
                </CtaGhostBtn>
                <CtaGhostBtn
                  href="https://wa.me/50763280229"
                  icon={<MessageCircle size={16} />}
                >
                  WhatsApp 6328-0229
                </CtaGhostBtn>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>
                  Lunes a viernes 8:00 a.m. – 4:00 p.m. · Sábados 9:00 a.m. – 12:00 p.m.
                </span>
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>
                  Cajero automático disponible 24 horas
                </span>
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>
                  Oficinas: Ave. Balboa, Edificio Grand Bay Tower, Planta Baja · Costa del Este, Edificio Península Center, Local #5
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
