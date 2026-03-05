import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Lock, X, Plus } from "lucide-react";
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

      {/* Abre tu cuenta — unified orange card */}
      <div
        ref={dropdownRef}
        onMouseEnter={() => setAccountOpen(true)}
        onMouseLeave={() => setAccountOpen(false)}
        className={cn(
          "relative rounded-[18px] bg-primary shadow-sm transition-shadow duration-200",
          accountOpen && "shadow-xl"
        )}
      >
        {/* Trigger row — always visible */}
        <button
          onClick={() => setAccountOpen((o) => !o)}
          aria-expanded={accountOpen}
          aria-haspopup="true"
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-primary-foreground focus-visible:outline-none"
        >
          {lang === "es" ? "Abre tu cuenta" : "Open Account"}
          <span
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-lg bg-primary-foreground/20 transition-all duration-200",
              accountOpen ? "bg-primary-foreground/30" : "hover:bg-primary-foreground/25"
            )}
          >
            {accountOpen
              ? <X size={13} strokeWidth={2.5} />
              : <Plus size={13} strokeWidth={2.5} />
            }
          </span>
        </button>

        {/* Expandable content */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-200 ease-out",
            accountOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          {/* Thin separator */}
          <div className="mx-4 h-px bg-primary-foreground/20" />

          <div className="px-4 pt-3 pb-4">
            {/* Overline */}
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-primary-foreground/50">
              {lang === "es" ? "Tipo de cuenta" : "Account type"}
            </p>

            <div className="flex flex-col">
              <Link
                to="/cuenta-ahorros"
                onClick={() => setAccountOpen(false)}
                className="rounded-xl px-2 py-2.5 transition-colors hover:bg-primary-foreground/15"
              >
                <p className="text-sm font-semibold text-primary-foreground leading-tight">
                  {lang === "es" ? "Cuenta de Ahorros" : "Savings Account"}
                </p>
                <p className="mt-0.5 text-xs text-primary-foreground/60 leading-snug">
                  {lang === "es" ? "Para personas naturales" : "For individuals"}
                </p>
              </Link>

              <div className="my-1 h-px bg-primary-foreground/15" />

              <Link
                to="/cuenta-juridica"
                onClick={() => setAccountOpen(false)}
                className="rounded-xl px-2 py-2.5 transition-colors hover:bg-primary-foreground/15"
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
    </div>
  );
}
