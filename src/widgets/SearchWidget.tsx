import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "@/lib/icons";
import { searchPages } from "@/data/searchPages";

export function SearchWidget() {
  const [open,    setOpen]    = useState(false);
  const [hovered, setHovered] = useState(false);
  const [query,   setQuery]   = useState("");
  const inputRef   = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate   = useNavigate();

  const handleOpen  = () => { setOpen(true); setTimeout(() => inputRef.current?.focus(), 60); };
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
        p.desc.toLowerCase().includes(query.toLowerCase()))
    : searchPages;

  return (
    <div ref={wrapperRef} style={{ position: "relative", flexShrink: 0 }}>
      <button
        onClick={open ? handleClose : handleOpen}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Buscar"
        style={{
          background: hovered && !open ? "#FAFAFA" : "transparent",
          border: open ? "2px solid hsl(var(--primary))" : hovered ? "1px solid #D6D1CC" : "1px solid #E8E4E0",
          borderRadius: 12, cursor: "pointer",
          width: 48, height: 48,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
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
              width: 440, zIndex: 60, background: "#fff",
              border: "2px solid hsl(var(--primary))",
              borderRadius: 22, overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 16px", height: 64, borderBottom: "1px solid #E0DDD9" }}>
              <Search size={17} color="#908E8D" strokeWidth={2} style={{ flexShrink: 0 }} />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Buscar páginas y recursos..."
                style={{
                  flex: 1, border: "none", outline: "none", background: "transparent",
                  fontFamily: "Inter, sans-serif", fontSize: 15, color: "#1C1917", minWidth: 0,
                }}
              />
              <span style={{
                flexShrink: 0, padding: "4px 9px", border: "1px solid #E0DDD9", borderRadius: 8,
                fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 500, color: "#908E8D",
                letterSpacing: "0.01em", whiteSpace: "nowrap",
              }}>Esc</span>
              <button onClick={handleClose}
                style={{ flexShrink: 0, background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: 8, transition: "background 0.13s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#F2EFED"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
              >
                <X size={16} strokeWidth={2.5} color="#908E8D" />
              </button>
            </div>

            <div style={{ overflowY: "auto", maxHeight: 400, padding: 8 }}>
              {filtered.length === 0 ? (
                <div style={{ padding: "28px 16px", textAlign: "center", fontFamily: "Inter, sans-serif", fontSize: 14, color: "#908E8D" }}>
                  Sin resultados para &ldquo;<strong>{query}</strong>&rdquo;
                </div>
              ) : filtered.map((page, i) => (
                <button
                  key={i}
                  onClick={() => { handleClose(); navigate(page.href); }}
                  style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "11px 12px", borderRadius: 14, width: "100%",
                    border: "none", cursor: "pointer", textDecoration: "none",
                    background: "transparent", transition: "background 0.12s", textAlign: "left",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#F7F5F3"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: "#F2EFED", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {page.icon}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 15, color: "#1C1917" }}>{page.label}</span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#908E8D" }}>{page.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
