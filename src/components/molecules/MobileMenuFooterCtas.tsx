import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus,
  Lock,
  X,
  ChevronRight,
  PiggyBank,
  Building2,
  User,
} from "@/lib/icons";
import type { Lang } from "@/components/layout/SiteLayout";

type ExpandedPanel = "abre" | "banca" | null;

const ABRE_OPTIONS = [
  {
    label: "Cuenta de Ahorros",
    description: "Para personas Naturales",
    href: "/cuenta-ahorros",
    icon: PiggyBank,
  },
  {
    label: "Cuenta Jurídica",
    description: "Para empresas y Negocios",
    href: "/cuenta-juridica",
    icon: Building2,
  },
] as const;

const BANCA_OPTIONS = [
  { label: "Personas", href: "/login", icon: User },
  { label: "Empresas", href: "/login", icon: Building2 },
] as const;

interface MobileMenuFooterCtasProps {
  lang: Lang;
  onClose: () => void;
}

export function MobileMenuFooterCtas({ lang, onClose }: MobileMenuFooterCtasProps) {
  const [expanded, setExpanded] = useState<ExpandedPanel>(null);
  const navigate = useNavigate();

  const handleSelect = (href: string) => {
    setExpanded(null);
    onClose();
    navigate(href);
  };

  const abreLabel = lang === "es" ? "Abre tu cuenta" : "Open account";
  const bancaLabel = lang === "es" ? "Banca en Línea" : "Online Banking";

  return (
    <div>
      <AnimatePresence>
        {expanded === "abre" && (
          <motion.div
            key="abre-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            style={{
              background: "hsl(var(--primary))",
              borderRadius: 20,
              padding: "12px 12px 8px",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "4px 4px 12px 4px",
              }}
            >
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: 14,
                  color: "#FFFFFF",
                }}
              >
                {abreLabel}
              </span>
              <button
                type="button"
                onClick={() => setExpanded(null)}
                aria-label={lang === "es" ? "Cerrar" : "Close"}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  padding: 4,
                  borderRadius: 8,
                }}
              >
                <X size={16} color="#FFFFFF" strokeWidth={2.5} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {ABRE_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.href}
                    type="button"
                    onClick={() => handleSelect(opt.href)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "14px 12px",
                      border: "none",
                      cursor: "pointer",
                      borderRadius: 14,
                      background: "transparent",
                      width: "100%",
                      textAlign: "left",
                      WebkitTapHighlightColor: "transparent",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          flexShrink: 0,
                          background: "rgba(255,255,255,0.18)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Icon size={18} color="#FFFFFF" strokeWidth={2} />
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                        <span
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 700,
                            fontSize: 16,
                            color: "#FFFFFF",
                          }}
                        >
                          {opt.label}
                        </span>
                        <span
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 400,
                            fontSize: 13,
                            color: "rgba(255,255,255,0.85)",
                          }}
                        >
                          {opt.description}
                        </span>
                      </div>
                    </div>
                    <ChevronRight
                      size={16}
                      color="#FFFFFF"
                      style={{ flexShrink: 0, marginLeft: 8 }}
                    />
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {expanded === "banca" && (
          <motion.div
            key="banca-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            style={{
              background: "#FFFFFF",
              border: "1px solid #E8E4E0",
              borderRadius: 18,
              padding: "10px 10px 8px",
              marginBottom: 10,
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "4px 6px 10px 8px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <Lock size={13} color="#908E8D" strokeWidth={2.5} />
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                    fontSize: 13,
                    color: "#908E8D",
                  }}
                >
                  {bancaLabel}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setExpanded(null)}
                aria-label={lang === "es" ? "Cerrar" : "Close"}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  padding: 4,
                  borderRadius: 7,
                }}
              >
                <X size={15} color="#908E8D" strokeWidth={2.5} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {BANCA_OPTIONS.map((opt, i) => {
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => handleSelect(opt.href)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 12px",
                      border: "none",
                      cursor: "pointer",
                      borderRadius: 11,
                      background: "#F7F5F3",
                      marginTop: i === 0 ? 2 : 0,
                      width: "100%",
                      textAlign: "left",
                      WebkitTapHighlightColor: "transparent",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 8,
                          flexShrink: 0,
                          background: "rgba(0,0,0,0.07)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Icon size={15} color="#484746" strokeWidth={2} />
                      </div>
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 600,
                          fontSize: 14,
                          color: "#1C1917",
                        }}
                      >
                        {opt.label}
                      </span>
                    </div>
                    <ChevronRight
                      size={13}
                      color="#484746"
                      style={{ flexShrink: 0 }}
                    />
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: "flex", gap: 10 }}>
        {expanded !== "banca" && (
          <button
            type="button"
            onClick={() => setExpanded(expanded === "abre" ? null : "abre")}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              height: 48,
              border: "none",
              borderRadius: 12,
              background: "hsl(var(--primary))",
              color: "#FFFFFF",
              fontFamily: "Inter, sans-serif",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {abreLabel}
            <Plus size={15} color="#fff" strokeWidth={2.5} />
          </button>
        )}

        {expanded !== "abre" && (
          <button
            type="button"
            onClick={() => setExpanded(expanded === "banca" ? null : "banca")}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              height: 48,
              border: "none",
              borderRadius: 12,
              background: "#F2EFED",
              color: "#484746",
              fontFamily: "Inter, sans-serif",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              whiteSpace: "nowrap",
              minWidth: 0,
            }}
          >
            <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
              {bancaLabel}
            </span>
            <Lock size={14} color="#484746" strokeWidth={2.5} style={{ flexShrink: 0 }} />
          </button>
        )}
      </div>
    </div>
  );
}
