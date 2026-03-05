import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Lock, Plus } from "lucide-react";
import { NavPill } from "@/components/atoms/NavPill";

interface NavActionsProps {
  lang: "es" | "en";
}

export function NavActions({ lang }: NavActionsProps) {
  const [accountOpen, setAccountOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex items-center gap-2">
      {/* Search pill */}
      <button
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(30_20%_94%)] text-foreground/60 hover:bg-[hsl(30_15%_90%)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label={lang === "es" ? "Buscar" : "Search"}
      >
        <Search size={17} />
      </button>

      {/* Banca en Línea */}
      <NavPill variant="tinted" className="hidden md:inline-flex" asChild>
        <Link to="/login" className="inline-flex items-center gap-2">
          <Lock size={14} />
          {lang === "es" ? "Banca en Línea" : "Online Banking"}
        </Link>
      </NavPill>

      {/* Abre tu cuenta */}
      <div className="relative" ref={dropdownRef}>
        <NavPill
          variant="filled"
          onClick={() => setAccountOpen((o) => !o)}
          aria-expanded={accountOpen}
          aria-haspopup="true"
        >
          {lang === "es" ? "Abre tu cuenta" : "Open Account"}
          <Plus size={15} />
        </NavPill>

        {accountOpen && (
          <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-64 rounded-2xl bg-primary p-2 shadow-xl">
            <Link
              to="/cuenta-ahorros"
              onClick={() => setAccountOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/15 text-base">💰</span>
              {lang === "es" ? "Cuenta de Ahorros" : "Savings Account"}
            </Link>
            <Link
              to="/cuenta-juridica"
              onClick={() => setAccountOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/15 text-base">🏢</span>
              {lang === "es" ? "Cuenta Jurídica" : "Business Account"}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
