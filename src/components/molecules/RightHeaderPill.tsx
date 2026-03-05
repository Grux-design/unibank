import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  Search, Plus, X, ArrowRight, User, Building2,
  Globe, Check, ChevronDown, Home, Users, Briefcase,
  FileText, Phone, PiggyBank, CreditCard, Smartphone, Lock,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// LANGUAGE WIDGET
// ─────────────────────────────────────────────────────────────
interface LanguageWidgetProps {
  lang: "es" | "en";
  onLangChange: (code: "es" | "en") => void;
}

function LanguageWidget({ lang, onLangChange }: LanguageWidgetProps) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const languages = [
    { code: "es" as const, label: "Español" },
    { code: "en" as const, label: "English" },
  ];

  return (
    <div ref={ref} style={{ position: "relative", flexShrink: 0 }}>
      <button
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex", alignItems: "center", gap: 6,
          height: 48, padding: "0 14px",
          background: hovered && !open ? "#FAFAFA" : "transparent",
          border: open
            ? "2px solid hsl(var(--primary))"
            : hovered ? "1px solid #D6D1CC" : "1px solid #E8E4E0",
          borderRadius: 12, cursor: "pointer",
          fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 14, color: "#484746",
          transition: "border-color 0.14s, border-width 0.14s, background 0.14s",
          whiteSpace: "nowrap",
        }}
      >
        <Globe size={15} color="#484746" strokeWidth={1.8} />
        <span style={{ letterSpacing: "0.02em" }}>{lang === "es" ? "ES" : "EN"}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.16 }}
          style={{ display: "flex", alignItems: "center" }}
        >
          <ChevronDown size={13} color="#908E8D" strokeWidth={2.5} />
        </motion.span>
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
              background: "#fff", borderRadius: 16,
              border: "1px solid #E0DDD9",
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
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "#F2EFED"; }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
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

// ─────────────────────────────────────────────────────────────
// SEARCH WIDGET
// ─────────────────────────────────────────────────────────────
const searchPages = [
  { icon: <Home size={18} color="#484746" strokeWidth={1.8} />, label: "Inicio", desc: "Página principal", href: "/" },
  { icon: <Users size={18} color="#484746" strokeWidth={1.8} />, label: "Nosotros", desc: "Quiénes somos", href: "/about" },
  { icon: <Briefcase size={18} color="#484746" strokeWidth={1.8} />, label: "Servicios", desc: "Productos y soluciones", href: "/services" },
  { icon: <FileText size={18} color="#484746" strokeWidth={1.8} />, label: "Blog", desc: "Artículos y noticias", href: "/blog" },
  { icon: <Phone size={18} color="#484746" strokeWidth={1.8} />, label: "Contacto", desc: "Escríbenos o llámanos", href: "/contact" },
  { icon: <PiggyBank size={18} color="#484746" strokeWidth={1.8} />, label: "Cuenta de Ahorros", desc: "Para personas naturales", href: "/cuenta-ahorros" },
  { icon: <Building2 size={18} color="#484746" strokeWidth={1.8} />, label: "Cuenta Jurídica", desc: "Para empresas y negocios", href: "/cuenta-juridica" },
  { icon: <CreditCard size={18} color="#484746" strokeWidth={1.8} />, label: "Tarjetas", desc: "Débito y crédito", href: "/tarjetas" },
  { icon: <Smartphone size={18} color="#484746" strokeWidth={1.8} />, label: "Banca Móvil", desc: "Tu banco en el bolsillo", href: "/banca-movil" },
];

function SearchWidget() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleOpen = () => { setOpen(true); setTimeout(() => inputRef.current?.focus(), 60); };
  const handleClose = () => { setOpen(false); setQuery(""); };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) handleClose();
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [open]);

  const filtered = query.trim()
    ? searchPages.filter(p =>
        p.label.toLowerCase().includes(query.toLowerCase()) ||
        p.desc.toLowerCase().includes(query.toLowerCase())
      )
    : searchPages;

  const handleSelect = (href: string) => {
    handleClose();
    navigate(href);
  };

  return (
    <div ref={wrapperRef} style={{ position: "relative", flexShrink: 0 }}>
      <button
        onClick={open ? handleClose : handleOpen}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Buscar"
        style={{
          background: hovered && !open ? "#FAFAFA" : "transparent",
          border: open
            ? "2px solid hsl(var(--primary))"
            : hovered ? "1px solid #D6D1CC" : "1px solid #E8E4E0",
          borderRadius: 12, cursor: "pointer",
          width: 48, height: 48,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          transition: "border-color 0.14s, border-width 0.14s, background 0.14s",
        }}
      >
        <Search size={16} color={open ? "hsl(var(--primary))" : "#484746"} strokeWidth={2} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              position: "absolute", top: "calc(100% + 10px)", right: 0,
              width: 440, zIndex: 60,
              background: "#fff",
              border: "2px solid hsl(var(--primary))",
              borderRadius: 22, overflow: "hidden",
            }}
          >
            {/* Input row */}
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "0 16px", height: 64,
              borderBottom: "1px solid #E0DDD9",
            }}>
              <Search size={17} color="#908E8D" strokeWidth={2} style={{ flexShrink: 0 }} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar páginas y recursos..."
                style={{
                  flex: 1, border: "none", outline: "none", background: "transparent",
                  fontFamily: "Inter, sans-serif", fontSize: 15, color: "#1C1917", minWidth: 0,
                }}
              />
              <span style={{
                flexShrink: 0, padding: "4px 9px",
                border: "1px solid #E0DDD9", borderRadius: 8,
                fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 500,
                color: "#908E8D", letterSpacing: "0.01em", whiteSpace: "nowrap",
              }}>
                Esc
              </span>
              <button
                onClick={handleClose}
                style={{
                  flexShrink: 0, background: "transparent", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: 30, height: 30, borderRadius: 8, transition: "background 0.13s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#F2EFED"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                <X size={16} strokeWidth={2.5} color="#908E8D" />
              </button>
            </div>

            {/* Results */}
            <div style={{ overflowY: "auto", maxHeight: 400, padding: 8 }}>
              {filtered.length === 0 ? (
                <div style={{
                  padding: "28px 16px", textAlign: "center",
                  fontFamily: "Inter, sans-serif", fontSize: 14, color: "#908E8D",
                }}>
                  Sin resultados para &ldquo;<strong>{query}</strong>&rdquo;
                </div>
              ) : (
                filtered.map((page, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(page.href)}
                    style={{
                      display: "flex", alignItems: "center", gap: 14,
                      padding: "11px 12px", borderRadius: 14, width: "100%",
                      border: "none", cursor: "pointer",
                      textDecoration: "none", background: "transparent", transition: "background 0.12s",
                      textAlign: "left",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#F7F5F3"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                  >
                    <div style={{
                      width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                      background: "#F2EFED",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {page.icon}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 15, color: "#1C1917" }}>
                        {page.label}
                      </span>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#908E8D" }}>
                        {page.desc}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// BANCA EN LÍNEA WIDGET
// ─────────────────────────────────────────────────────────────
function BancaEnLineaWidget() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const options = [
    { label: "Personas", href: "/login", icon: <User size={15} color="#484746" /> },
    { label: "Empresas", href: "/login", icon: <Building2 size={15} color="#484746" /> },
  ];

  const CLOSED_W = 166;
  const OPEN_W = 280;

  return (
    <motion.div
      ref={ref}
      animate={{ width: open ? OPEN_W : CLOSED_W }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      style={{ position: "relative", flexShrink: 0, height: 48 }}
    >
      {/* Closed state */}
      <motion.button
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.13 }}
        onClick={() => setOpen(true)}
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          background: "#F2EFED", border: "none", borderRadius: 12,
          cursor: open ? "default" : "pointer", pointerEvents: open ? "none" : "auto",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 14, color: "#484746",
          whiteSpace: "nowrap",
        }}
      >
        Banca en Línea
        <Lock size={14} color="#484746" strokeWidth={2.5} />
      </motion.button>

      {/* Open card */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, delay: 0.14 }}
            style={{
              position: "absolute", top: 0, left: 0, width: OPEN_W,
              background: "#fff",
              border: "1px solid #E8E4E0",
              borderRadius: 18, padding: 8, zIndex: 60,
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 10px 10px 12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <Lock size={13} color="#908E8D" strokeWidth={2.5} />
                <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 13, color: "#908E8D" }}>
                  Banca en Línea
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: 4, borderRadius: 7 }}
              >
                <X size={15} color="#908E8D" strokeWidth={2.5} />
              </button>
            </div>

            {/* Options */}
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => { setOpen(false); navigate(opt.href); }}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "11px 12px", border: "none", cursor: "pointer", borderRadius: 11,
                    background: "#F7F5F3",
                    marginTop: i === 0 ? 6 : 0,
                    transition: "background 0.14s", width: "100%", textAlign: "left",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#EEE9E5"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#F7F5F3"; }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                      background: "rgba(0,0,0,0.07)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {opt.icon}
                    </div>
                    <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 14, color: "#1C1917" }}>
                      {opt.label}
                    </span>
                  </div>
                  <ArrowRight size={13} color="#484746" style={{ transform: "rotate(-45deg)", flexShrink: 0 }} />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// ABRE CUENTA WIDGET
// ─────────────────────────────────────────────────────────────
function AbreCuentaWidget() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const options = [
    { label: "Cuenta de Ahorros", description: "Para personas Naturales", href: "/cuenta-ahorros" },
    { label: "Cuenta Jurídica", description: "Para empresas y Negocios", href: "/cuenta-juridica" },
  ];

  const CLOSED_W = 200;
  const OPEN_W = 300;

  return (
    <motion.div
      ref={ref}
      animate={{ width: open ? OPEN_W : CLOSED_W }}
      transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
      style={{ position: "relative", flexShrink: 0, height: 48 }}
    >
      {/* Closed button */}
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

      {/* Open card */}
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
            {/* Header row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px 14px 12px" }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 14, color: "#fff" }}>
                Abre tu cuenta
              </span>
              <button
                onClick={() => setOpen(false)}
                style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: 4, borderRadius: 8 }}
              >
                <X size={16} color="#fff" strokeWidth={2.5} />
              </button>
            </div>

            {/* Options */}
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
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(0,0,0,0.08)";
                    const arrow = e.currentTarget.querySelector(".opt-arrow") as HTMLElement | null;
                    if (arrow) arrow.style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
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
                  <span
                    className="opt-arrow"
                    style={{ opacity: 0, transition: "opacity 0.15s", display: "flex", alignItems: "center", flexShrink: 0, marginLeft: 12 }}
                  >
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

// ─────────────────────────────────────────────────────────────
// RIGHT PILL — root exportable component
// ─────────────────────────────────────────────────────────────
interface RightHeaderPillProps {
  isMenuOpen?: boolean;
  lang: "es" | "en";
  onLangChange: (code: "es" | "en") => void;
}

export function RightHeaderPill({ isMenuOpen = false, lang, onLangChange }: RightHeaderPillProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: isMenuOpen ? "transparent" : "#fff",
        borderRadius: isMenuOpen ? 0 : 16,
        height: 66,
        padding: "0 10px",
        gap: 4,
        transition: "background 0.2s ease, border-radius 0.2s ease",
      }}
    >
      <LanguageWidget lang={lang} onLangChange={onLangChange} />
      <SearchWidget />
      <BancaEnLineaWidget />
      <AbreCuentaWidget />
    </div>
  );
}
