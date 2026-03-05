import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/atoms/Logo";
import type { Lang } from "@/components/layout/SiteLayout";

interface LeftHeaderPillProps {
  menuOpen: boolean;
  lang: Lang;
  onToggle: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function LeftHeaderPill({
  menuOpen,
  lang,
  onToggle,
  onMouseEnter,
  onMouseLeave,
}: LeftHeaderPillProps) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        display: "flex",
        alignItems: "center",
        background: menuOpen ? "transparent" : "#ffffff",
        borderRadius: menuOpen ? 0 : 16,
        height: 66,
        padding: "0 20px 0 8px",
        gap: 20,
        transition: "background 0.2s ease, border-radius 0.2s ease",
      }}
    >
      {/* Hamburger button */}
      <button
        onClick={onToggle}
        aria-label={menuOpen ? (lang === "es" ? "Cerrar menú" : "Close menu") : (lang === "es" ? "Abrir menú" : "Open menu")}
        aria-expanded={menuOpen}
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
        {/* Animated icon swap */}
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

        {/* Label */}
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

      {/* Logo */}
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
          textDecoration: "none",
        }}
        aria-label="UniBank – Inicio"
      >
        <Logo variant="full-color" height={36} />
      </Link>
    </div>
  );
}
