import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { X, Globe } from "@/lib/icons";
import { Logo } from "@/components/atoms/Logo";
import { SegmentedToggle } from "@/components/atoms/SegmentedToggle";
import { MobileMegaMenuList } from "@/components/molecules/MobileMegaMenuList";
import { MobileMenuFooterCtas } from "@/components/molecules/MobileMenuFooterCtas";
import { HEADER_PILL } from "@/constants/headerPill";
import { personasData, empresasData } from "@/data/megaMenuData";
import type { Lang } from "@/components/layout/SiteLayout";

type Tab = "personas" | "empresas";

interface MobileMenuOverlayProps {
  lang: Lang;
  onClose: () => void;
  onLangChange: (code: Lang) => void;
}

const TAB_OPTIONS = [
  { value: "personas" as const, label: "Personas" },
  { value: "empresas" as const, label: "Empresas" },
];

const LANG_OPTIONS = [
  { value: "es" as const, label: "ES" },
  { value: "en" as const, label: "EN" },
];

export function MobileMenuOverlay({ lang, onClose, onLangChange }: MobileMenuOverlayProps) {
  const [activeTab, setActiveTab] = useState<Tab>("personas");
  const data = activeTab === "personas" ? personasData : empresasData;
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={prefersReduced ? { opacity: 0 } : { y: "-100%" }}
      animate={prefersReduced ? { opacity: 1 } : { y: 0 }}
      exit={prefersReduced ? { opacity: 0 } : { y: "-100%" }}
      transition={
        prefersReduced
          ? { duration: 0.2 }
          : { duration: 0.38, ease: [0.32, 0.72, 0, 1] }
      }
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        background: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        willChange: prefersReduced ? undefined : "transform",
      }}
    >
      <div
        className="site-container-nav"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 16,
          paddingBottom: 12,
          flexShrink: 0,
        }}
      >
        <Link
          to="/"
          onClick={onClose}
          aria-label="UniBank – Inicio"
          style={{ display: "flex", alignItems: "center", lineHeight: 0 }}
        >
          <Logo variant="full-color" height={HEADER_PILL.logoHeight} />
        </Link>
        <button
          type="button"
          onClick={onClose}
          aria-label={lang === "es" ? "Cerrar menú" : "Close menu"}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: 12,
            border: "none",
            background: "#F2EFED",
            cursor: "pointer",
          }}
        >
          <X size={18} color="#484746" strokeWidth={2.5} />
        </button>
      </div>

      <div className="site-container-nav" style={{ flexShrink: 0, paddingBottom: 4 }}>
        <SegmentedToggle
          value={activeTab}
          onChange={setActiveTab}
          options={TAB_OPTIONS}
          layoutId="mobile-menu-segment-pill"
          align="left"
          stretch
          wrapperStyle={{ padding: "16px 0 12px" }}
        />
      </div>

      <div style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: activeTab === "personas" ? -12 : 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <MobileMegaMenuList
              data={data}
              isPersonas={activeTab === "personas"}
              onClose={onClose}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        className="site-container-nav"
        style={{
          flexShrink: 0,
          paddingTop: 16,
          paddingBottom: 24,
          borderTop: "1px solid #E8E4E0",
          background: "#FFFFFF",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <Globe size={15} color="#908E8D" strokeWidth={1.8} />
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: "#908E8D",
              flex: 1,
            }}
          >
            {lang === "es" ? "Idioma" : "Language"}
          </span>
          <SegmentedToggle
            value={lang}
            onChange={onLangChange}
            options={LANG_OPTIONS}
            layoutId="mobile-menu-lang-segment-pill"
            align="left"
            compact
            variant="neutral"
          />
        </div>

        <MobileMenuFooterCtas lang={lang} onClose={onClose} />
      </div>
    </motion.div>
  );
}
