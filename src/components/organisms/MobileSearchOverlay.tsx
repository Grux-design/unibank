import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Search, X } from "@/lib/icons";
import { Logo } from "@/components/atoms/Logo";
import { HEADER_PILL } from "@/constants/headerPill";
import { searchPages } from "@/data/searchPages";
import { searchEntries } from "@/lib/search";
import type { Lang } from "@/components/layout/SiteLayout";

interface MobileSearchOverlayProps {
  lang: Lang;
  onClose: () => void;
}

export function MobileSearchOverlay({ lang, onClose }: MobileSearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const filtered = searchEntries(searchPages, query, {
    limit: query.trim() ? 30 : 16,
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        background: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className="site-container-nav shell-safe-top"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
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
          aria-label={lang === "es" ? "Cerrar búsqueda" : "Close search"}
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

      <div className="site-container-nav" style={{ flexShrink: 0, paddingBottom: 12 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            height: 52,
            padding: "0 16px",
            borderRadius: 14,
            border: "1px solid #E8E4E0",
            background: "#F7F5F3",
          }}
        >
          <Search size={18} color="#908E8D" strokeWidth={2} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={lang === "es" ? "Buscar..." : "Search..."}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              fontFamily: "Inter, sans-serif",
              fontSize: 15,
              color: "#1C1917",
              minWidth: 0,
            }}
          />
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
        <div className="site-container-nav shell-safe-bottom" style={{ paddingBottom: 16 }}>
          {filtered.length === 0 ? (
            <p
              style={{
                padding: "24px 0",
                textAlign: "center",
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                color: "#908E8D",
              }}
            >
              {lang === "es" ? (
                <>Sin resultados para &ldquo;<strong>{query}</strong>&rdquo;</>
              ) : (
                <>No results for &ldquo;<strong>{query}</strong>&rdquo;</>
              )}
            </p>
          ) : (
            filtered.map((page) => (
              <button
                key={page.href + page.label}
                type="button"
                onClick={() => {
                  onClose();
                  if (/^https?:\/\//i.test(page.href)) {
                    window.open(page.href, "_blank", "noopener,noreferrer");
                  } else {
                    navigate(page.href);
                  }
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  width: "100%",
                  padding: "14px 0",
                  border: "none",
                  borderBottom: "1px solid #E8E4E0",
                  background: "transparent",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    flexShrink: 0,
                    background: "#F2EFED",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {page.icon}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 600,
                      fontSize: 15,
                      color: "#1C1917",
                    }}
                  >
                    {page.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 13,
                      color: "#908E8D",
                    }}
                  >
                    {page.desc}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}
