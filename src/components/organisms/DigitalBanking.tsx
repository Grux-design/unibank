import { useRef, useState, useEffect } from "react";
import React from "react";
import { motion, AnimatePresence, useInView, LayoutGroup } from "motion/react";
import {
  MessageCircle,
  Phone,
  ChevronRight,
  Smartphone,
  ShieldCheck,
} from "@/lib/icons";
import { useIsMobile } from "@/hooks/useIsMobile";
import { OrangeBlobBackground } from "@/components/atoms/OrangeBlobBackground";
import { AuthorityLineDecor } from "@/components/atoms/AuthorityLineDecor";
import { BtnPrimary } from "@/components/ui/atoms";
import { CTA_BUTTON_COLORS, CTA_BUTTON_SIZE } from "@/constants/ctaButtons";
import { TAG_PILL_HUG, TAG_STACK_HUG } from "@/constants/tagPill";

const OR = "var(--fun-orange)";
const DARK = "var(--uni-dark)";
const SOFT = "var(--uni-dark-soft)";
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

const LEFT_COLUMN = {
  headlineSize: "clamp(36px, 3.6vw, 56px)",
  headlineWeight: 500,
  headlineLineHeight: 1.14,
  headlineTracking: "-0.03em",
  rowPaddingBlock: 26,
  titleActive: { fontSize: 22, fontWeight: 600, lineHeight: 1.25 },
  titleInactive: { fontSize: 20, fontWeight: 500, lineHeight: 1.3 },
} as const;

const LEFT_COLUMN_MOBILE = {
  headlineSize: "clamp(30px, 8vw, 38px)",
  headlineWeight: 500,
  headlineLineHeight: 1.14,
  headlineTracking: "-0.03em",
  rowPaddingBlock: 22,
  titleActive: { fontSize: 20, fontWeight: 600, lineHeight: 1.3 },
  titleInactive: { fontSize: 18, fontWeight: 500, lineHeight: 1.35 },
} as const;

/** Shared spacing for desktop accordion + mobile feature cards */
const FEATURE_BOX = {
  paddingBlock: 24,
  headerBodyGap: 16,
  bodyGap: 16,
  bodyOffsetLeft: 42,
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

function BancaDigitalLabel({ light = false, showDot = false }: { light?: boolean; showDot?: boolean }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontSize: 11,
        fontWeight: 700,
        color: light ? "hsl(20 80% 92%)" : OR,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      }}
    >
      {showDot ? (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: OR,
            flexShrink: 0,
          }}
        />
      ) : (
        <Smartphone size={12} strokeWidth={2.25} />
      )}
      Banca Digital
    </span>
  );
}

function DigitalBankingLeftHeading({ mobile = false }: { mobile?: boolean }) {
  const col = mobile ? LEFT_COLUMN_MOBILE : LEFT_COLUMN;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: mobile ? 16 : 20,
        paddingBottom: mobile ? 0 : 8,
      }}
    >
      <BancaDigitalLabel showDot />
      <h2
        style={{
          margin: 0,
          fontSize: col.headlineSize,
          fontWeight: col.headlineWeight,
          lineHeight: col.headlineLineHeight,
          letterSpacing: col.headlineTracking,
          color: DARK,
        }}
      >
        Todo tu banco en{" "}
        <span style={{ color: OR }}>la palma de tu mano.</span>
      </h2>
      <p
        style={{
          margin: 0,
          fontSize: mobile ? 15 : 17,
          lineHeight: 1.65,
          color: SOFT,
          maxWidth: mobile ? undefined : 480,
        }}
      >
        Transfiere en segundos, paga servicios y abre cuentas sin pisar una sucursal. Disponible las
        24 horas, los 7 días de la semana.
      </p>
    </div>
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
function CtaWhiteBtn({
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
  const [active, setActive] = useState(false);
  const colors = CTA_BUTTON_COLORS.lightSolid;
  const bg = active ? colors.bgActive : hov ? colors.bgHover : colors.bg;

  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => {
        setHov(false);
        setActive(false);
      }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        boxSizing: "border-box",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 9,
        height: CTA_BUTTON_SIZE.height,
        minHeight: CTA_BUTTON_SIZE.minHeight,
        padding: `0 ${CTA_BUTTON_SIZE.paddingX}px`,
        borderRadius: CTA_BUTTON_SIZE.borderRadius,
        background: bg,
        color: colors.color,
        border: "none",
        textDecoration: "none",
        fontSize: CTA_BUTTON_SIZE.fontSize,
        fontWeight: CTA_BUTTON_SIZE.fontWeight,
        lineHeight: CTA_BUTTON_SIZE.lineHeight,
        fontFamily: "Inter, sans-serif",
        transition: "background 0.18s ease",
        whiteSpace: "nowrap",
        width: fullWidth ? "100%" : undefined,
        alignSelf: fullWidth ? "stretch" : undefined,
        flexShrink: 0,
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
  isLast = false,
  mobile = false,
}: {
  feature: (typeof FEATURES)[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
  isLast?: boolean;
  mobile?: boolean;
}) {
  const [hov, setHov] = useState(false);
  const col = mobile ? LEFT_COLUMN_MOBILE : LEFT_COLUMN;
  const titleStyle = isActive ? col.titleActive : col.titleInactive;

  return (
    <motion.article
      layout={mobile ? "position" : false}
      id={mobile ? `banca-feature-${index}` : undefined}
      onClick={onClick}
      onMouseEnter={() => !mobile && setHov(true)}
      onMouseLeave={() => !mobile && setHov(false)}
      transition={mobile ? { layout: MOBILE_SCROLL.layoutSpring } : undefined}
      style={{
        borderTop: `1px solid ${BORDER}`,
        borderBottom: isLast ? `1px solid ${BORDER}` : "none",
        paddingTop: col.rowPaddingBlock,
        paddingBottom: col.rowPaddingBlock,
        background: "transparent",
        cursor: isActive ? "default" : "pointer",
        transition: mobile ? "opacity 0.45s ease, color 0.45s ease" : "opacity 0.22s ease",
        opacity: mobile ? (isActive ? 1 : 0.72) : !isActive && !hov ? 0.72 : 1,
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: isActive ? FEATURE_BOX.headerBodyGap : 0,
        }}
      >
        <span
          style={{
            fontSize: titleStyle.fontSize,
            fontWeight: titleStyle.fontWeight,
            lineHeight: titleStyle.lineHeight,
            color: isActive ? DARK : hov ? DARK : MUTED,
            letterSpacing: "-0.02em",
            transition: mobile ? "color 0.45s ease, font-size 0.45s ease" : "color 0.25s",
          }}
        >
          {feature.title}
        </span>

        <AnimatePresence initial={false}>
          {isActive && (
            <motion.div
              key={`exp-${index}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={
                mobile
                  ? {
                      opacity: { duration: 0.35, ease: MOBILE_SCROLL.layoutEase },
                      height: MOBILE_SCROLL.layoutSpring,
                    }
                  : { duration: 0.32, ease: "easeOut" }
              }
              style={{ overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "flex-start" }}
            >
              <FeatureBoxBody feature={feature} indent={false} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

/* ── Mobile accordion layout ────────────────────────────── */
function FeaturePreviewImage({
  features,
  activeIndex,
  height = 240,
}: {
  features: typeof FEATURES;
  activeIndex: number;
  height?: number;
}) {
  return (
    <div
      style={{
        width: "100%",
        borderRadius: 24,
        overflow: "hidden",
        position: "relative",
        height,
        border: `1px solid ${BORDER}`,
        isolation: "isolate",
      }}
    >
      {features.map((f, i) => {
        const isActive = i === activeIndex;

        return (
          <img
            key={f.id}
            src={f.image}
            alt={f.title}
            draggable={false}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              opacity: isActive ? 1 : 0,
              visibility: isActive ? "visible" : "hidden",
              zIndex: isActive ? 1 : 0,
              pointerEvents: "none",
              transform: "translateZ(0)",
            }}
          />
        );
      })}
    </div>
  );
}

const MOBILE_SCROLL = {
  /** Finger-scroll (vh) required between each item change while the panel stays pinned. */
  scrollPerItemVh: 68,
  /** Short release scroll after the last item before the next section. */
  releaseVh: 20,
  /** Scroll down: advance to next item when float crosses idx + this (0.58 ≈ 58% into step). */
  indexAdvanceAt: 0.58,
  /** Scroll up: retreat to previous item when float drops below idx - 1 + this (0.42 ≈ 42%). */
  indexRetreatAt: 0.42,
  stickyTop: 64,
  imageHeight: 168,
  panelPaddingBottom: 40,
  bottomStackPadding: 28,
  layoutEase: [0.4, 0, 0.2, 1] as const,
  layoutSpring: { type: "spring" as const, stiffness: 260, damping: 32, mass: 0.85 },
} as const;

function mobileScrollTotalVh(n: number): number {
  if (n <= 1) return 100 + MOBILE_SCROLL.releaseVh;
  return 100 + MOBILE_SCROLL.scrollPerItemVh * (n - 1) + MOBILE_SCROLL.releaseVh;
}

function mobileStepFloat(prog: number, n: number): number {
  if (n <= 1) return 0;
  return Math.min(Math.max(prog, 0) * (n - 1), n - 1);
}

function updateMobileActiveIndex(
  stepFloat: number,
  n: number,
  indexRef: React.MutableRefObject<number>,
): number {
  let idx = indexRef.current;

  while (idx < n - 1 && stepFloat >= idx + MOBILE_SCROLL.indexAdvanceAt) {
    idx += 1;
  }
  while (idx > 0 && stepFloat <= idx - 1 + MOBILE_SCROLL.indexRetreatAt) {
    idx -= 1;
  }

  indexRef.current = idx;
  return idx;
}

function mobileScrollOffset(totalScrollable: number, index: number, n: number): number {
  if (n <= 1 || totalScrollable <= 0) return 0;
  const travelSteps = n - 1;
  const targetProg = index >= travelSteps ? 1 : index / travelSteps;
  return targetProg * totalScrollable;
}

function MobileScrollProgress({
  activeIndex,
  stepFloat,
  total,
}: {
  activeIndex: number;
  stepFloat?: number;
  total: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {Array.from({ length: total }, (_, i) => {
          const fill =
            stepFloat !== undefined
              ? Math.max(0, 1 - Math.abs(stepFloat - i))
              : i === activeIndex
                ? 1
                : 0;
          return (
            <span
              key={i}
              style={{
                width: 8 + fill * 14,
                height: 8,
                borderRadius: 99,
                background: fill > 0.35 ? OR : BORDER,
                opacity: fill > 0 ? 0.55 + fill * 0.45 : 1,
                transition: stepFloat === undefined
                  ? "width 0.45s ease, background 0.45s ease, opacity 0.45s ease"
                  : undefined,
              }}
            />
          );
        })}
      </div>
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: MUTED,
          letterSpacing: "0.08em",
        }}
      >
        {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}

function MobileStickyPanel({
  features,
  activeIndex,
  stepFloat,
  onSelect,
}: {
  features: typeof FEATURES;
  activeIndex: number;
  stepFloat: number;
  onSelect: (index: number) => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const panelInView = useInView(panelRef, { once: true, margin: "0px 0px -60px 0px" });
  const topItems = features.slice(0, activeIndex + 1);
  const bottomItems = features.slice(activeIndex + 1);
  const isPinnedStack = bottomItems.length > 0;
  const panelHeight = `calc(100dvh - ${MOBILE_SCROLL.stickyTop}px)`;

  return (
    <motion.div
      ref={panelRef}
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={panelInView ? { opacity: 1, y: 0 } : {}}
      transition={{ layout: MOBILE_SCROLL.layoutSpring, duration: 0.4, ease: "easeOut" }}
      style={{
        position: "sticky",
        top: MOBILE_SCROLL.stickyTop,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        height: isPinnedStack ? panelHeight : "auto",
        maxHeight: isPinnedStack ? panelHeight : undefined,
        paddingTop: 12,
        paddingBottom: isPinnedStack ? MOBILE_SCROLL.panelPaddingBottom : 20,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <FeaturePreviewImage
          features={features}
          activeIndex={activeIndex}
          height={MOBILE_SCROLL.imageHeight}
        />
        <MobileScrollProgress activeIndex={activeIndex} stepFloat={stepFloat} total={features.length} />
        {bottomItems.length > 0 && activeIndex === 0 && (
          <p
            style={{
              margin: 0,
              fontSize: 12,
              lineHeight: 1.5,
              color: MUTED,
              textAlign: "center",
            }}
          >
            Desliza para explorar cada servicio
          </p>
        )}
      </div>

      <LayoutGroup id="banca-mobile-stack">
        <div
          style={{
            flex: isPinnedStack ? 1 : undefined,
            minHeight: isPinnedStack ? 0 : undefined,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <motion.div
            layout
            transition={{ layout: MOBILE_SCROLL.layoutSpring }}
            style={{
              flex: isPinnedStack ? 1 : undefined,
              minHeight: isPinnedStack ? 0 : undefined,
              overflowY: isPinnedStack ? "auto" : "visible",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {topItems.map((f, i) => (
              <FeatureRow
                key={f.id}
                feature={f}
                index={i}
                isActive={i === activeIndex}
                onClick={() => onSelect(i)}
                isLast={bottomItems.length === 0 && i === features.length - 1}
                mobile
              />
            ))}
          </motion.div>

          {bottomItems.length > 0 && (
            <motion.div
              layout
              transition={{ layout: MOBILE_SCROLL.layoutSpring }}
              style={{
                flexShrink: 0,
                paddingBottom: MOBILE_SCROLL.bottomStackPadding,
              }}
            >
              {bottomItems.map((f, i) => {
                const index = activeIndex + 1 + i;
                return (
                  <FeatureRow
                    key={f.id}
                    feature={f}
                    index={index}
                    isActive={false}
                    onClick={() => onSelect(index)}
                    isLast={index === features.length - 1}
                    mobile
                  />
                );
              })}
            </motion.div>
          )}
        </div>
      </LayoutGroup>
    </motion.div>
  );
}

/* ── Sticky Scroll (desktop + mobile) ───────────────────── */
function StickyScrollFeatures({ features }: { features: typeof FEATURES }) {
  const N = features.length;
  const outerRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "0px 0px -60px 0px" });
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepFloat, setStepFloat] = useState(0);
  const mobileIndexRef = useRef(0);
  const stepVh = isMobile ? mobileScrollTotalVh(N) : 100;

  const scrollToStep = (index: number) => {
    if (!outerRef.current) return;
    const outerH = outerRef.current.offsetHeight;
    const viewH = window.innerHeight;
    const totalScrollable = Math.max(outerH - viewH, 0);
    const sectionTop = outerRef.current.getBoundingClientRect().top + window.scrollY;
    const clamped = Math.max(0, Math.min(index, N - 1));
    const offset = isMobile
      ? mobileScrollOffset(totalScrollable, clamped, N)
      : (clamped / N) * totalScrollable;
    window.scrollTo({ top: sectionTop + offset + 1, behavior: "smooth" });
    mobileIndexRef.current = clamped;
    setActiveIndex(clamped);
    setStepFloat(clamped);
  };

  useEffect(() => {
    const onScroll = () => {
      if (!outerRef.current) return;
      const rect = outerRef.current.getBoundingClientRect();
      const outerH = outerRef.current.offsetHeight;
      const viewH = window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const totalScrollable = outerH - viewH;
      if (totalScrollable <= 0) return;
      const prog = Math.min(scrolled / totalScrollable, 1);

      if (isMobile) {
        const float = mobileStepFloat(prog, N);
        setStepFloat(float);
        setActiveIndex(updateMobileActiveIndex(float, N, mobileIndexRef));
        return;
      }

      setActiveIndex(Math.min(Math.floor(prog * N), N - 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile, N]);

  if (isMobile) {
    return (
      <>
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 16 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, ease: "easeOut" }}
          style={{ paddingTop: 48, paddingBottom: 28 }}
        >
          <DigitalBankingLeftHeading mobile />
        </motion.div>
        <div
          ref={outerRef}
          style={{ height: `${stepVh}vh`, position: "relative" }}
        >
          <MobileStickyPanel
            features={features}
            activeIndex={activeIndex}
            stepFloat={stepFloat}
            onSelect={scrollToStep}
          />
        </div>
      </>
    );
  }

  return (
    <div
      ref={outerRef}
      style={{ height: `${N * stepVh}vh`, position: "relative" }}
    >
      <div
        style={{
          position: "sticky",
          top: 80,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 56,
          height: "calc(100vh - 160px)",
          maxHeight: 700,
          alignItems: "stretch",
        }}
      >
        {/* Left: heading + accordion list */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            minHeight: 0,
          }}
        >
          <DigitalBankingLeftHeading />
          <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
            {features.map((f, i) => (
              <FeatureRow
                key={f.id}
                feature={f}
                index={i}
                isActive={i === activeIndex}
                onClick={() => scrollToStep(i)}
                isLast={i === features.length - 1}
              />
            ))}
          </div>
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

  return (
    <section style={{ background: "#fff" }}>
      <div className="site-container">
        <div style={{ paddingTop: isMobile ? 0 : 64 }}>
          <StickyScrollFeatures features={FEATURES} />
        </div>

        {/* Authority quote */}
        <div
          style={{
            boxSizing: "border-box",
            position: "relative",
            isolation: "isolate",
            overflow: "hidden",
            margin: isMobile ? "20px 0 0" : "64px 0 0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: isMobile ? "48px 32px" : "64px 96px",
            gap: 20,
            minHeight: isMobile ? 300 : 340,
            background: "#F5F0EC",
            border: `1px solid ${BORDER}`,
            borderRadius: 28,
            textAlign: "center",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              width: 506,
              height: 506,
              left: isMobile ? -220 : -152,
              top: isMobile ? 80 : 42,
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            <AuthorityLineDecor variant="bottom-left" width={506} height={506} />
          </div>
          <div
            aria-hidden
            style={{
              position: "absolute",
              width: 442,
              height: 442,
              right: isMobile ? -220 : -157,
              top: isMobile ? -200 : -272,
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            <AuthorityLineDecor variant="top-right" width={442} height={442} />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              position: "relative",
              zIndex: 1,
            }}
          >
            <ShieldCheck size={15} color="#FF7733" strokeWidth={2.25} />
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: 12,
                lineHeight: "18px",
                letterSpacing: "1.2px",
                textTransform: "uppercase",
                color: "#FF7733",
              }}
            >
              Liderazgo y ética comprobada
            </span>
          </div>
          <p
            style={{
              margin: 0,
              maxWidth: 700,
              position: "relative",
              zIndex: 1,
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: isMobile ? 18 : 22,
              lineHeight: isMobile ? "30px" : "37px",
              textAlign: "center",
              color: "#726F6E",
            }}
          >
            Somos una entidad enfocada en la{" "}
            <strong style={{ fontWeight: 700 }}>innovación y la sostenibilidad</strong> —
            incluyendo la emisión de{" "}
            <strong style={{ fontWeight: 700 }}>Bonos Verdes</strong> — regulada y supervisada por
            la <strong style={{ fontWeight: 700 }}>Superintendencia de Bancos de Panamá</strong>.
          </p>
        </div>

        {/* Orange CTA banner */}
        <div
          style={{
            margin: "40px 0 80px",
            borderRadius: 32,
            background: "#FF8136",
            overflow: "hidden",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            minHeight: "68vh",
          }}
        >
          <OrangeBlobBackground />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: 1,
              justifyContent: "center",
              textAlign: "center",
              gap: isMobile ? 28 : 32,
              padding: isMobile ? "56px 28px" : "72px 80px",
              boxSizing: "border-box",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 720 }}>
              <p
                style={{
                  margin: 0,
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
                  lineHeight: 1.12,
                }}
              >
                Contáctanos hoy mismo.
              </h3>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                width: isMobile ? "100%" : undefined,
              }}
            >
              <CtaWhiteBtn
                href="https://wa.me/50763280229"
                icon={<MessageCircle size={16} />}
                fullWidth={isMobile}
              >
                WhatsApp 6328-0229
              </CtaWhiteBtn>
              <CtaWhiteBtn
                href="tel:+50722976000"
                icon={<Phone size={16} />}
                fullWidth={isMobile}
              >
                297-6000
              </CtaWhiteBtn>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                maxWidth: 640,
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  color: "rgba(255,255,255,0.82)",
                  lineHeight: 1.5,
                }}
              >
                Lunes a viernes 8:00 a.m. – 4:00 p.m. - Sábados 9:00 a.m. – 12:00 p.m.
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  color: "rgba(255,255,255,0.72)",
                  lineHeight: 1.5,
                }}
              >
                Cajero automático disponible 24 horas
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
