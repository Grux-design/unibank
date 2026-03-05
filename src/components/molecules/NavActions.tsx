import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Lock, Plus, X } from "lucide-react";
import { NavPill } from "@/components/atoms/NavPill";
import { cn } from "@/lib/utils";

interface NavActionsProps {
  lang: "es" | "en";
}

export function NavActions({ lang }: NavActionsProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  // Close account dropdown on outside click
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
      {/* Search */}
      <div className="relative flex items-center">
        {searchOpen ? (
          <div className="flex items-center gap-2 rounded-full border border-foreground/20 bg-background px-3 py-1.5">
            <Search size={16} className="text-foreground/40 shrink-0" />
            <input
              ref={searchRef}
              type="search"
              placeholder={lang === "es" ? "Buscar…" : "Search…"}
              className="w-36 bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/40"
              aria-label={lang === "es" ? "Campo de búsqueda" : "Search field"}
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="text-foreground/40 hover:text-foreground transition-colors"
              aria-label="Close search"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setSearchOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-foreground/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label={lang === "es" ? "Abrir búsqueda" : "Open search"}
          >
            <Search size={18} className="text-foreground/70" />
          </button>
        )}
      </div>

      {/* Banca en Línea */}
      <NavPill variant="outline" asChild className="hidden md:inline-flex">
        <Link to="/login" className="inline-flex items-center gap-2">
          <Lock size={13} />
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
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/15 text-base">
                💰
              </span>
              {lang === "es" ? "Cuenta de Ahorros" : "Savings Account"}
            </Link>
            <Link
              to="/cuenta-juridica"
              onClick={() => setAccountOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/15 text-base">
                🏢
              </span>
              {lang === "es" ? "Cuenta Jurídica" : "Business Account"}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
