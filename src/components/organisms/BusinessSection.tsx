import { useState, useRef, useLayoutEffect } from "react";
import React from "react";
import { motion, useInView } from "motion/react";
import { Building2, Truck, BarChart3, ChevronRight } from "@/lib/icons";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/useIsMobile";
import { SectionHeading, LinkArrow, HeadlineAccent } from "@/components/ui/atoms";
import { TYPO } from "@/constants/typography";

const OR = "var(--fun-orange)";
const DARK = "var(--uni-dark)";
const SOFT = "var(--uni-dark-soft)";
const G = 8;
const DELTA = 20;
const CARD_H = 380;

/* ── Images ────────────────────────────────────────────── */
const IMG_LOANS =
  "https://images.unsplash.com/photo-1685981244090-c14c196d0bde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const IMG_LEASING =
  "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const IMG_SECURITIES =
  "/f640d2cc-2ec6-40bd-8fd2-a953cc05b798.jpg";

/* ── Data ───────────────────────────────────────────────── */
const services = [
  {
    id: "prestamos",
    icon: Building2,
    label: "Préstamos Comerciales",
    title: "Impulsa el crecimiento de tu empresa.",
    body: "Préstamos comerciales, financiamiento agroindustrial y líneas de crédito diseñadas para cada sector productivo de Panamá.",
    cta: "Solicitar financiamiento",
    href: "/empresas/financiamiento/prestamo-comercial",
    image: IMG_LOANS,
  },
  {
    id: "unileasing",
    icon: Truck,
    label: "Uni Leasing",
    title: "Impulsa tu negocio.",
    body: "Crece y Evoluciona con nuestro Leasing para adquirir la flota que necesites.",
    cta: "Más información",
    href: "/grupo/unileasing",
    image: IMG_LEASING,
  },
  {
    id: "valores",
    icon: BarChart3,
    label: "Emisión de Valores",
    title: "Asesoría corporativa de alto nivel.",
    body: "Te acompañamos en la estructuración y emisión de valores para llevar tu empresa al siguiente nivel.",
    cta: "Hablar con un asesor",
    href: "/empresas/otros-servicios/emision-de-valores",
    image: IMG_SECURITIES,
  },
];

/* ── Shared sub-components (matching Personas style) ──── */
function CategoryTag({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <span className="type-section-tag" style={{ gap: 5, padding: "3px 10px" }}>
      <Icon size={13} strokeWidth={2} />
      {label}
    </span>
  );
}

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
    return (
      <Link
        to={href}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={style}
      >
        {inner}
      </Link>
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

/* ── LargeCard ──────────────────────────────────────────── */
function LargeCard({ service, isMobile }: { service: typeof services[0]; isMobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        height: isMobile ? "auto" : "100%",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* Image */}
      <div style={{ flex: isMobile ? undefined : "1 1 55%", minHeight: isMobile ? 200 : undefined, overflow: "hidden" }}>
        <img
          src={service.image}
          alt={service.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      {/* Content */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          flex: isMobile ? undefined : "1 1 45%",
          background: "#fff",
          padding: isMobile ? "24px 20px 20px" : "32px 28px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10 }}>
          <CategoryTag icon={service.icon} label={service.label} />
          <h3
            style={{
              margin: 0,
              ...TYPO.cardTitle,
              color: DARK,
            }}
          >
            {service.title}
          </h3>
          <p style={{ margin: 0, fontSize: 13, color: SOFT, lineHeight: 1.6 }}>{service.body}</p>
        </div>
        <CtaLink href={(service as { href?: string }).href}>{service.cta}</CtaLink>
      </motion.div>
    </div>
  );
}

/* ── SmallCard ──────────────────────────────────────────── */
function SmallCard({ service, index }: { service: typeof services[0]; index: number }) {
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
          src={service.image}
          alt={service.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
      {/* Content */}
      <div style={{ padding: "20px 20px 24px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10, flex: "0 0 auto" }}>
        <CategoryTag icon={service.icon} label={service.label} />
        <h4 style={{ margin: 0, ...TYPO.itemTitleSm, color: DARK }}>
          {service.title}
        </h4>
        <p style={{ margin: 0, fontSize: 13, color: SOFT, lineHeight: 1.6 }}>{service.body}</p>
        <CtaLink href={(service as { href?: string }).href}>{service.cta}</CtaLink>
      </div>
    </motion.div>
  );
}

/* ── Desktop Grid (with hover-expand like Personas) ───── */
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

  const T = "width 0.42s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s ease";

  /* Row 1: full-width large card */
  const wLarge = cw;

  /* Row 2: two equal cards with hover expand */
  const halfBase = cw > 0 ? (cw - G) / 2 : 0;
  const wUnileasing = halfBase + (hovered === "unileasing" ? DELTA : hovered === "valores" ? -DELTA : 0);
  const wValores = halfBase + (hovered === "valores" ? DELTA : hovered === "unileasing" ? -DELTA : 0);

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
      <div
        onMouseEnter={() => setHovered("prestamos")}
        onMouseLeave={() => setHovered(null)}
        style={{
          width: wLarge,
          height: CARD_H,
          borderRadius: 32,
          overflow: "hidden",
          border: `1px solid ${hovered === "prestamos" ? "var(--fun-orange)" : "#E7E4E1"}`,
          cursor: "pointer",
          transition: "border-color 0.3s ease",
        }}
      >
        <LargeCard service={services[0]} isMobile={false} />
      </div>
      <div style={{ display: "flex", gap: G }}>
        {card("unileasing", wUnileasing, <SmallCard service={services[1]} index={1} />)}
        {card("valores", wValores, <SmallCard service={services[2]} index={2} />)}
      </div>
    </div>
  );
}

/* ── Mobile Stack ───────────────────────────────────────── */
function BentoMobileStack() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: G }}>
      <div style={{ borderRadius: 32, overflow: "hidden", border: "1px solid #E7E4E1" }}>
        <LargeCard service={services[0]} isMobile />
      </div>
      {services.slice(1).map((s, i) => (
        <div key={s.id} style={{ borderRadius: 32, overflow: "hidden", border: "1px solid #E7E4E1" }}>
          <SmallCard service={s} index={i + 1} />
        </div>
      ))}
    </div>
  );
}

/* ── BusinessSection (export) ───────────────────────────── */
export function BusinessSection() {
  const isMobile = useIsMobile();
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <section
      style={{
        background: "#fff",
        paddingTop: isMobile ? 32 : 40,
        paddingBottom: isMobile ? 36 : 64,
      }}
    >
      <div className="site-container">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <SectionHeading
            tag="Banca Empresarial"
            headline={<>Financiamos el futuro y <HeadlineAccent>la visión de tu negocio</HeadlineAccent></>}
            body="Crédito comercial, planilla empresarial, Leasing, bonos verdes y soluciones financieras adaptadas a cada etapa y sector de tu negocio."
            
            mb={40}
          />
        </motion.div>

        {isMobile ? <BentoMobileStack /> : <BentoDesktopGrid />}
      </div>
    </section>
  );
}
