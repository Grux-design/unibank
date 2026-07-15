import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Globe, ChevronDown, Check } from "@/lib/icons";

interface LanguageWidgetProps {
  lang:         "es" | "en";
  onLangChange: (code: "es" | "en") => void;
  variant?:     "full" | "compact" | "icon";
}

const languages = [
  { code: "es" as const, label: "Español" },
  { code: "en" as const, label: "English" },
];

export function LanguageWidget({ lang, onLangChange, variant = "full" }: LanguageWidgetProps) {
  const [open,    setOpen]    = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", flexShrink: 0 }}>
      <button
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex", alignItems: "center", gap: variant === "icon" ? 0 : 6,
          height: 48, padding: variant === "icon" ? 0 : "0 14px",
          width: variant === "icon" ? 48 : undefined,
          justifyContent: variant === "icon" ? "center" : undefined,
          background: hovered && !open ? "#FAFAFA" : "transparent",
          border: open ? "2px solid hsl(var(--primary))" : hovered ? "1px solid #D6D1CC" : "1px solid #E8E4E0",
          borderRadius: 12, cursor: "pointer",
          fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 14, color: "#484746",
          transition: "border-color 0.14s, border-width 0.14s, background 0.14s",
          whiteSpace: "nowrap",
        }}
      >
        <Globe size={15} color="#484746" strokeWidth={1.8} />
        {variant !== "icon" && (
          <span style={{ letterSpacing: "0.02em" }}>{lang === "es" ? "ES" : "EN"}</span>
        )}
        {variant === "full" && (
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.16 }}
            style={{ display: "flex", alignItems: "center" }}>
            <ChevronDown size={13} color="#908E8D" strokeWidth={2.5} />
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{
              position: "absolute", top: "calc(100% + 8px)", left: 0,
              background: "#fff", borderRadius: 16, border: "1px solid #E0DDD9",
              padding: 6, zIndex: 60, minWidth: 160,
            }}
          >
            {languages.map((l) => {
              const isActive = lang === l.code;
              return (
                <button
                  key={l.code}
                  onClick={() => { onLangChange(l.code); setOpen(false); }}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    width: "100%", padding: "11px 14px", borderRadius: 10,
                    border: "none", cursor: "pointer",
                    background: isActive ? "hsl(var(--primary))" : "transparent",
                    fontFamily: "Inter, sans-serif", fontWeight: isActive ? 600 : 500,
                    fontSize: 15, color: isActive ? "#fff" : "#1C1917",
                    transition: "background 0.13s",
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "#F2EFED"; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                >
                  {l.label}
                  {isActive && <Check size={15} color="#fff" strokeWidth={2.5} />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
