import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Lock, X, User, Building2, ChevronRight } from "@/lib/icons";
import type { HeaderLayout } from "@/hooks/useHeaderLayout";

const options = [
  { label: "Personas", href: "/login", icon: <User     size={15} color="#484746" /> },
  { label: "Empresas", href: "/login", icon: <Building2 size={15} color="#484746" /> },
];

const OPEN_W = 280;

const LAYOUT_STYLES: Record<HeaderLayout, { gap: number; padding: string; closedW: number }> = {
  full:    { gap: 8, padding: "0 14px", closedW: 166 },
  compact: { gap: 5, padding: "0 10px", closedW: 158 },
  mobile:  { gap: 4, padding: "0 8px",  closedW: 152 },
};

interface BancaEnLineaWidgetProps {
  layout?: HeaderLayout;
}

export function BancaEnLineaWidget({ layout = "full" }: BancaEnLineaWidgetProps) {
  const [open, setOpen] = useState(false);
  const ref             = useRef<HTMLDivElement>(null);
  const navigate        = useNavigate();
  const styles          = LAYOUT_STYLES[layout];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <motion.div
      ref={ref}
      animate={{ width: open ? OPEN_W : styles.closedW }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      style={{ position: "relative", flexShrink: 0, height: 48 }}
    >
      <motion.button
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.13 }}
        onClick={() => setOpen(true)}
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          background: "#F2EFED", border: "none", borderRadius: 12,
          cursor: open ? "default" : "pointer", pointerEvents: open ? "none" : "auto",
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: styles.gap, padding: styles.padding,
          fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 14, color: "#484746",
          whiteSpace: "nowrap",
        }}
      >
        Banca en Línea
        <Lock size={14} color="#484746" strokeWidth={2.5} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, delay: 0.14 }}
            style={{
              position: "absolute", top: 0, left: 0, width: OPEN_W,
              background: "#fff", border: "1px solid #E8E4E0",
              borderRadius: 18, padding: 8, zIndex: 60,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 10px 10px 12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <Lock size={13} color="#908E8D" strokeWidth={2.5} />
                <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 13, color: "#908E8D" }}>Banca en Línea</span>
              </div>
              <button onClick={() => setOpen(false)}
                style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: 4, borderRadius: 7 }}>
                <X size={15} color="#908E8D" strokeWidth={2.5} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => { setOpen(false); navigate(opt.href); }}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "11px 12px", border: "none", cursor: "pointer", borderRadius: 11,
                    background: "#F7F5F3", marginTop: i === 0 ? 6 : 0,
                    transition: "background 0.14s", width: "100%", textAlign: "left",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#EEE9E5"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#F7F5F3"; }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, background: "rgba(0,0,0,0.07)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {opt.icon}
                    </div>
                    <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 14, color: "#1C1917" }}>{opt.label}</span>
                  </div>
                  <ChevronRight size={13} color="#484746" style={{ flexShrink: 0 }} />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
