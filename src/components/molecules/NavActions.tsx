import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Lock, Plus } from "lucide-react";
import { NavPill } from "@/components/atoms/NavPill";
import { cn } from "@/lib/utils";

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
      <Link
        to="/login"
        className="hidden md:inline-flex items-center gap-2 rounded-xl bg-[hsl(30_20%_94%)] px-4 py-2.5 text-sm font-medium text-foreground hover:bg-[hsl(30_15%_90%)] transition-colors"
      >
        <Lock size={14} />
        {lang === "es" ? "Banca en Línea" : "Online Banking"}
      </Link>

      {/* Abre tu cuenta */}
      <div
        className="relative"
        ref={dropdownRef}
        onMouseEnter={() => setAccountOpen(true)}
        onMouseLeave={() => setAccountOpen(false)}
      >
        <NavPill
          variant="filled"
          onClick={() => setAccountOpen((o) => !o)}
          aria-expanded={accountOpen}
          aria-haspopup="true"
        >
          {lang === "es" ? "Abre tu cuenta" : "Open Account"}
          <span className={cn("transition-transform duration-200", accountOpen && "rotate-45")}>
            <Plus size={15} />
          </span>
        </NavPill>

        {/* Dropdown — always rendered, CSS-animated */}
        <div
          className={cn(
            "absolute right-0 top-[calc(100%-12px)] z-40 w-64 origin-top-right rounded-[20px] bg-primary pt-14 pb-2 px-2 shadow-xl transition-all duration-200 ease-out",
            accountOpen
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
          )}
        >
          {/* Overline label */}
          <p className="px-3 pt-1 pb-2 text-[10px] font-semibold uppercase tracking-widest text-primary-foreground/50">
            {lang === "es" ? "Tipo de cuenta" : "Account type"}
          </p>

          <div className="flex flex-col gap-0.5">
            <Link
              to="/cuenta-ahorros"
              onClick={() => setAccountOpen(false)}
              className="group rounded-xl px-3 py-3 transition-colors hover:bg-primary-foreground/10"
            >
              <p className="text-sm font-semibold text-primary-foreground leading-tight">
                {lang === "es" ? "Cuenta de Ahorros" : "Savings Account"}
              </p>
              <p className="mt-0.5 text-xs text-primary-foreground/60 leading-snug">
                {lang === "es" ? "Para personas naturales" : "For individuals"}
              </p>
            </Link>

            <div className="mx-3 h-px bg-primary-foreground/15" />

            <Link
              to="/cuenta-juridica"
              onClick={() => setAccountOpen(false)}
              className="group rounded-xl px-3 py-3 transition-colors hover:bg-primary-foreground/10"
            >
              <p className="text-sm font-semibold text-primary-foreground leading-tight">
                {lang === "es" ? "Cuenta Jurídica" : "Business Account"}
              </p>
              <p className="mt-0.5 text-xs text-primary-foreground/60 leading-snug">
                {lang === "es" ? "Para empresas y negocios" : "For companies & businesses"}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

