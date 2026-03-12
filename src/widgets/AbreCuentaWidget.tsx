import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Plus, X, ArrowRight } from "lucide-react";

const options = [
  { label: "Cuenta de Ahorros", description: "Para personas Naturales", href: "/cuenta-ahorros"  },
  { label: "Cuenta Jurídica",   description: "Para empresas y Negocios", href: "/cuenta-juridica" },
];

const CLOSED_W = 200;
const OPEN_W   = 300;

export function AbreCuentaWidget() {
  const [open, setOpen] = useState(false);
  const ref             = useRef<HTMLDivElement>(null);
  const navigate        = useNavigate();

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
      animate={{ width: open ? OPEN_W : CLOSED_W }}
      transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
      style={{ position: "relative", flexShrink: 0, height: 48 }}
    >
      <motion.button
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.15 }}
        onClick={() => setOpen(true)}
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          background: "hsl(var(--primary))", border: "none", borderRadius: 12,
          cursor: open ? "default" : "pointer", pointerEvents: open ? "none" : "auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 16px",
        }}
      >
        <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 14, color: "#fff", whiteSpace: "nowrap" }}>
          Abre tu cuenta
        </span>
        <Plus size={15} color="#fff" strokeWidth={2.5} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.18 }}
            style={{
              position: "absolute", top: 0, left: 0, width: OPEN_W,
              background: "hsl(var(--primary))", borderRadius: 20, padding: 8, zIndex: 60,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px 14px 12px" }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 14, color: "#fff" }}>
                Abre tu cuenta
              </span>
              <button onClick={() => setOpen(false)}
                style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: 4, borderRadius: 8 }}>
                <X size={16} color="#fff" strokeWidth={2.5} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => { setOpen(false); navigate(opt.href); }}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "14px 14px", border: "none", cursor: "pointer",
                    borderRadius: 14, background: "transparent", transition: "background 0.15s",
                    width: "100%", textAlign: "left",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(0,0,0,0.08)";
                    const arrow = e.currentTarget.querySelector(".opt-arrow") as HTMLElement | null;
                    if (arrow) arrow.style.opacity = "1";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "transparent";
                    const arrow = e.currentTarget.querySelector(".opt-arrow") as HTMLElement | null;
                    if (arrow) arrow.style.opacity = "0";
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 16, color: "#fff", whiteSpace: "nowrap" }}>
                      {opt.label}
                    </span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, color: "rgba(255,255,255,0.85)" }}>
                      {opt.description}
                    </span>
                  </div>
                  <span className="opt-arrow" style={{ opacity: 0, transition: "opacity 0.15s", display: "flex", alignItems: "center", flexShrink: 0, marginLeft: 12 }}>
                    <ArrowRight size={16} color="#fff" style={{ transform: "rotate(-45deg)" }} />
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
