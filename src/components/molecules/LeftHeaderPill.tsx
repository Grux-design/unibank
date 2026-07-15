import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "@/lib/icons";
import { Logo } from "@/components/atoms/Logo";
import { HEADER_PILL } from "@/constants/headerPill";
import type { Lang } from "@/components/layout/SiteLayout";
import type { HeaderLayout } from "@/hooks/useHeaderLayout";

const MENU_BUTTON_HEIGHT = 48;

interface LeftHeaderPillProps {
  menuOpen: boolean;
  lang: Lang;
  onToggle: () => void;
  layout?: HeaderLayout;
}

export function LeftHeaderPill({
  menuOpen,
  lang,
  onToggle,
  layout = "full",
}: LeftHeaderPillProps) {
  const showPymeBadge = layout === "full";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: menuOpen ? "transparent" : "#ffffff",
        borderRadius: menuOpen ? 0 : 16,
        height: 66,
        padding: layout === "compact" ? "0 14px 0 8px" : "0 20px 0 8px",
        gap: layout === "compact" ? 14 : 20,
        border: menuOpen ? "0.5px solid transparent" : "0.5px solid #E7E4E1",
        boxShadow: menuOpen ? "none" : undefined,
        transition: "background 0.2s ease, border-radius 0.2s ease, border 0.2s ease",
        flexShrink: 0,
        minWidth: 0,
      }}
    >
      <button
        onClick={(e) => {
          onToggle();
          e.currentTarget.blur();
        }}
        aria-label={menuOpen ? (lang === "es" ? "Cerrar menú" : "Close menu") : (lang === "es" ? "Abrir menú" : "Open menu")}
        aria-expanded={menuOpen}
        className="focus-visible:outline-none"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: menuOpen ? "#FF8136" : "#F7E8E0",
          border: "none",
          borderRadius: 12,
          height: 48,
          padding: "0 16px",
          cursor: "pointer",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          if (!menuOpen) e.currentTarget.style.background = "#FFDCC8";
        }}
        onMouseLeave={(e) => {
          if (!menuOpen) e.currentTarget.style.background = "#F7E8E0";
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {menuOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{ display: "flex", alignItems: "center" }}
            >
              <X size={18} color="#ffffff" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Menu size={18} color="#FF8136" />
            </motion.span>
          )}
        </AnimatePresence>

        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: 14,
            lineHeight: "20px",
            color: menuOpen ? "#ffffff" : "#FF8136",
            userSelect: "none",
          }}
        >
          {lang === "es" ? "Menú" : "Menu"}
        </span>
      </button>

      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
          textDecoration: "none",
          height: HEADER_PILL.logoHeight,
          lineHeight: 0,
        }}
        aria-label="UniBank – Inicio"
      >
        <Logo variant="full-color" height={HEADER_PILL.logoHeight} priority />
      </Link>

      {showPymeBadge && (
        <Link
          to="/empresas/cuentas/cuenta-juridica-digital"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            height: 40,
            padding: "0 12px 0 8px",
            borderRadius: 10,
            background: "#F5F0FF",
            border: "0.5px solid #E4D9FF",
            textDecoration: "none",
            flexShrink: 0,
            transition: "background 0.15s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#ECE1FF"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#F5F0FF"; }}
        >
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: 10,
              lineHeight: 1,
              letterSpacing: 0.4,
              textTransform: "uppercase",
              color: "#ffffff",
              background: "#801FFF",
              padding: "4px 6px",
              borderRadius: 6,
            }}
          >
            {lang === "es" ? "Nuevo" : "New"}
          </span>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: 13,
              lineHeight: "20px",
              color: "#000000F5",
              whiteSpace: "nowrap",
            }}
          >
            {lang === "es" ? "Cuenta PYME Digital" : "Digital SME Account"}
          </span>
        </Link>
      )}
    </div>
  );
}
