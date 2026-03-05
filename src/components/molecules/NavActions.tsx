import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Lock, X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchOverlay } from "@/components/organisms/SearchOverlay";

interface NavActionsProps {
  lang: "es" | "en";
}

export function NavActions({ lang }: NavActionsProps) {
  const [accountOpen, setAccountOpen] = useState(false);
  const [searchOpen, setSearchOpen]   = useState(false);

  const accountRef   = useRef<HTMLDivElement>(null);
  const searchBtnRef = useRef<HTMLButtonElement>(null);

  /* Close account dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node))
        setAccountOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex items-center gap-2">

      {/* ── Search trigger ── */}
      <button
        ref={searchBtnRef}
        onClick={() => setSearchOpen(true)}
        aria-label={lang === "es" ? "Buscar" : "Search"}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-foreground/60 hover:text-foreground transition-colors"
      >
        <Search size={17} />
      </button>

      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        lang={lang}
        triggerRef={searchBtnRef}
      />

      {/* ── Banca en Línea ── */}
      <Link
        to="/login"
        className="hidden md:inline-flex items-center gap-2 rounded-xl bg-muted px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted/80 transition-colors"
      >
        <Lock size={14} />
        {lang === "es" ? "Banca en Línea" : "Online Banking"}
      </Link>

      {/* ── Abre tu cuenta ── */}
      <div
        ref={accountRef}
        className="relative"
        onMouseEnter={() => setAccountOpen(true)}
        onMouseLeave={() => setAccountOpen(false)}
      >
        <button
          onClick={() => setAccountOpen(o => !o)}
          aria-expanded={accountOpen}
          aria-haspopup="true"
          className={cn(
            "inline-flex items-center gap-2 bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground focus-visible:outline-none",
            "transition-[width,border-radius] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
            accountOpen
              ? "w-64 justify-between rounded-tl-[18px] rounded-tr-[18px] rounded-bl-none rounded-br-none"
              : "rounded-[18px]"
          )}
        >
          {lang === "es" ? "Abre tu cuenta" : "Open Account"}
          <span className={cn(
            "flex h-6 w-6 items-center justify-center rounded-lg bg-primary-foreground/20 transition-all duration-300",
            accountOpen && "bg-primary-foreground/30"
          )}>
            {accountOpen ? <X size={13} strokeWidth={2.5} /> : <Plus size={13} strokeWidth={2.5} />}
          </span>
        </button>

        <div
          className={cn(
            "absolute right-0 top-full z-50 w-64 rounded-tl-none rounded-tr-none rounded-bl-[18px] rounded-br-[18px] bg-primary px-3 pb-3 pt-3 shadow-xl",
            "transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
            accountOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          )}
        >
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
