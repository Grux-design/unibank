import { useState, useRef } from "react";
import React from "react";
import { motion, useInView } from "motion/react";
import { Building2, Users, BarChart3, ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { SectionHeading, LinkArrow } from "@/components/ui/atoms";
import { MagicBentoGrid, MagicBentoCard } from "@/components/ui/MagicBento";

const OR = "var(--fun-orange)";
const DARK = "var(--uni-dark)";
const SOFT = "var(--uni-dark-soft)";

/* ── Images ────────────────────────────────────────────── */
const IMG_LOANS =
  "https://images.unsplash.com/photo-1685981244090-c14c196d0bde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const IMG_PAYROLL =
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const IMG_SECURITIES =
  "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

/* ── Data ───────────────────────────────────────────────── */
const services = [
  {
    id: "prestamos",
    icon: Building2,
    label: "Préstamos Comerciales",
    title: "Impulsa el crecimiento de tu empresa.",
    body: "Préstamos comerciales, financiamiento agroindustrial y líneas de crédito diseñadas para cada sector productivo de Panamá.",
    cta: "Solicitar financiamiento",
    image: IMG_LOANS,
  },
  {
    id: "planilla",
    icon: Users,
    label: "Servicios de Planilla",
    title: "Optimiza tu tiempo y flujo de caja.",
    body: "Simplifica la administración de tu negocio con nuestro ágil sistema de Pago de Planilla Empresarial.",
    cta: "Conocer el servicio",
    image: IMG_PAYROLL,
  },
  {
    id: "valores",
    icon: BarChart3,
    label: "Emisión de Valores",
    title: "Asesoría corporativa de alto nivel.",
    body: "Te acompañamos en la estructuración y emisión de valores para llevar tu empresa al siguiente nivel.",
    cta: "Hablar con un asesor",
    image: IMG_SECURITIES,
  },
];

/* ── Shared sub-components (matching Personas style) ──── */
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

/* ── LargeCard ──────────────────────────────────────────── */
function LargeCard({ service, isMobile }: { service: typeof services[0]; isMobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        height: isMobile ? "auto" : 380,
        width: "100%",
        overflow: "hidden",
        borderRadius: 32,
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
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <CategoryTag icon={service.icon} label={service.label} />
          <h3
            style={{
              margin: 0,
              fontSize: "clamp(18px, 2vw, 24px)",
              fontWeight: 800,
              color: DARK,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}
          >
            {service.title}
          </h3>
          <p style={{ margin: 0, fontSize: 13, color: SOFT, lineHeight: 1.6 }}>{service.body}</p>
        </div>
        <CtaLink>{service.cta}</CtaLink>
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
        borderRadius: 32,
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
      <div style={{ padding: "20px 20px 24px", display: "flex", flexDirection: "column", gap: 10, flex: "0 0 auto" }}>
        <CategoryTag icon={service.icon} label={service.label} />
        <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: DARK, letterSpacing: "-0.01em", lineHeight: 1.3 }}>
          {service.title}
        </h4>
        <p style={{ margin: 0, fontSize: 13, color: SOFT, lineHeight: 1.6 }}>{service.body}</p>
        <CtaLink>{service.cta}</CtaLink>
      </div>
    </motion.div>
  );
}

/* ── BusinessSection (export) ───────────────────────────── */
export function BusinessSection() {
  const isMobile = useIsMobile();
  const px = isMobile ? 16 : "clamp(16px, 3.9vw, 72px)";
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <section style={{ background: "#fff", paddingTop: 40, paddingBottom: 64 }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", paddingLeft: px, paddingRight: px }}>
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <SectionHeading
            tag="Banca Empresarial"
            headline={<>Financiamos el futuro<br />y la visión de tu negocio</>}
            body="Crédito comercial, planilla empresarial y valores – soluciones financieras adaptadas a cada etapa y sector de tu empresa."
            cta={<LinkArrow href="#">Ver todos los servicios</LinkArrow>}
            mb={40}
          />
        </motion.div>

        <MagicBentoGrid style={{ gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}>
          <MagicBentoCard style={{ gridColumn: isMobile ? undefined : "1 / -1" }}>
            <LargeCard service={services[0]} isMobile={isMobile} />
          </MagicBentoCard>
          {services.slice(1).map((s, i) => (
            <MagicBentoCard key={s.id}>
              <SmallCard service={s} index={i + 1} />
            </MagicBentoCard>
          ))}
        </MagicBentoGrid>
      </div>
    </section>
  );
}
