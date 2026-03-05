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

      {/* Abre tu cuenta */}
      <div
        ref={dropdownRef}
        className="relative"
        onMouseEnter={() => setAccountOpen(true)}
        onMouseLeave={() => setAccountOpen(false)}
      >
        {/* Button — expands to dropdown width and flattens bottom corners when open */}
        <button
          onClick={() => setAccountOpen((o) => !o)}
          aria-expanded={accountOpen}
          aria-haspopup="true"
          className={cn(
            "inline-flex items-center gap-2 bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-200 focus-visible:outline-none",
            accountOpen
              ? "w-64 justify-between rounded-tl-[18px] rounded-tr-[18px] rounded-bl-none rounded-br-none"
              : "rounded-[18px]"
          )}
        >
          {lang === "es" ? "Abre tu cuenta" : "Open Account"}
          <span
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-lg bg-primary-foreground/20 transition-all duration-200",
              accountOpen && "bg-primary-foreground/30"
            )}
          >
            {accountOpen
              ? <X size={13} strokeWidth={2.5} />
              : <Plus size={13} strokeWidth={2.5} />
            }
          </span>
        </button>

        {/* Dropdown — absolutely positioned, top-right corner flat to merge with button */}
        <div
          className={cn(
            "absolute right-0 top-full z-50 w-64 origin-top rounded-tl-none rounded-tr-none rounded-bl-[18px] rounded-br-[18px] bg-primary px-3 pb-3 pt-3 shadow-xl transition-all duration-200 ease-out",
            accountOpen
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
          )}
        >
          {/* Overline */}
          <p className="mb-2.5 px-2 text-[10px] font-semibold uppercase tracking-widest text-primary-foreground/50">
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

            <div className="my-1 mx-2 h-px bg-primary-foreground/15" />

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
  );
}
