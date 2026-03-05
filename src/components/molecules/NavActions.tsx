import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search, Lock, X, Plus, Home, Users, Briefcase, FileText,
  Phone, PiggyBank, Building2, SearchX, Loader2, CircleStop
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavActionsProps {
  lang: "es" | "en";
}

interface SiteEntry {
  title: string;
  subtitle: string;
  href: string;
  icon: React.ElementType;
}

const siteIndex: SiteEntry[] = [
  { title: "Inicio",            subtitle: "Página principal",           href: "/",                icon: Home },
  { title: "Nosotros",          subtitle: "Quiénes somos",              href: "/about",           icon: Users },
  { title: "Servicios",         subtitle: "Productos y soluciones",     href: "/services",        icon: Briefcase },
  { title: "Blog",              subtitle: "Artículos y noticias",       href: "/blog",            icon: FileText },
  { title: "Contacto",          subtitle: "Escríbenos o llámanos",      href: "/contact",         icon: Phone },
  { title: "Cuenta de Ahorros", subtitle: "Para personas naturales",    href: "/cuenta-ahorros",  icon: PiggyBank },
  { title: "Cuenta Jurídica",   subtitle: "Para empresas y negocios",   href: "/cuenta-juridica", icon: Building2 },
  { title: "Banca en Línea",    subtitle: "Accede a tu cuenta",         href: "/login",           icon: Lock },
];

export function NavActions({ lang }: NavActionsProps) {
  const [accountOpen, setAccountOpen] = useState(false);
  const [searchOpen, setSearchOpen]   = useState(false);
  const [searchVisible, setSearchVisible] = useState(false); // controls bar width (delayed on close)
  const [query, setQuery]             = useState("");
  const [navigating, setNavigating]   = useState(false);

  const accountRef = useRef<HTMLDivElement>(null);
  const searchRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);
  const navigate   = useNavigate();

  /* Close account dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node))
        setAccountOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Close search on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node))
        closeSearch();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Esc key */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeSearch(); };
    if (searchOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [searchOpen]);

  /* Focus input when search opens */
  useEffect(() => {
    if (searchOpen) setTimeout(() => inputRef.current?.focus(), 50);
  }, [searchOpen]);

  const closeSearch = useCallback(() => {
    // 1. fade out dropdown first
    setSearchOpen(false);
    setNavigating(false);
    // 2. after dropdown has fully faded (200ms transition + small buffer), shrink bar
    setTimeout(() => {
      setSearchVisible(false);
      setQuery("");
    }, 220);
  }, []);

  const openSearch = useCallback(() => {
    setSearchVisible(true);
    // bar expands first, then dropdown appears (handled via delay in dropdown class)
    setTimeout(() => setSearchOpen(true), 10);
  }, []);

  const handleSelect = useCallback((href: string) => {
    setNavigating(true);
    setTimeout(() => {
      navigate(href);
      closeSearch();
    }, 800);
  }, [navigate, closeSearch]);

  const filtered = query.trim()
    ? siteIndex.filter(e =>
        e.title.toLowerCase().includes(query.toLowerCase()) ||
        e.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    : siteIndex;

  return (
    <div className="flex items-center gap-2">

      {/* ── Search widget ── */}
      <div ref={searchRef} className="relative">

        {/* Trigger / Input bar — same "unified shape" pattern as account CTA */}
        <div
          className={cn(
            "flex items-center bg-background border border-border",
            "transition-[width,border-radius] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
            searchVisible
              ? "w-72 rounded-tl-[18px] rounded-tr-[18px] rounded-bl-none rounded-br-none border-b-0 px-3 gap-2 h-10"
              : "w-10 h-10 rounded-xl justify-center"
          )}
        >
          {/* Search icon — always visible, acts as toggle when closed */}
          <button
            onClick={() => !searchVisible && openSearch()}
            aria-label={lang === "es" ? "Buscar" : "Search"}
            className={cn(
              "shrink-0 text-foreground/60 focus-visible:outline-none",
              !searchOpen && "w-full h-full flex items-center justify-center"
            )}
          >
            <Search size={17} />
          </button>

          {/* Input — only visible when open */}
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={lang === "es" ? "Buscar…" : "Search…"}
            className={cn(
              "flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none",
              "transition-[opacity,width] duration-300",
              searchVisible ? "opacity-100 w-full" : "opacity-0 w-0 pointer-events-none"
            )}
          />

          {/* Close button */}
          {searchVisible && (
            <button
              onClick={closeSearch}
              className="shrink-0 flex h-5 w-5 items-center justify-center rounded-md text-foreground/40 hover:text-foreground transition-colors"
            >
              <X size={13} strokeWidth={2.5} />
            </button>
          )}
        </div>

        {/* Dropdown results — connected below, same fill as bar */}
        <div
          className={cn(
            "absolute left-0 top-full z-50 w-72 rounded-tl-none rounded-tr-none rounded-bl-[18px] rounded-br-[18px]",
            "bg-background border border-border border-t-0 overflow-hidden",
            "transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]",
            searchOpen
              ? "opacity-100 translate-y-0 pointer-events-auto delay-200"
              : "opacity-0 -translate-y-1 pointer-events-none"
          )}
        >
          {/* Results list */}
          <div className="max-h-[320px] overflow-y-auto py-2 px-1.5">
            {filtered.length > 0 ? (
              filtered.map(entry => {
                const Icon = entry.icon;
                return (
                  <button
                    key={entry.href}
                    onClick={() => handleSelect(entry.href)}
                    className="flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-left transition-colors hover:bg-foreground/[0.06] focus:outline-none focus:bg-foreground/[0.06]"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-foreground/[0.06] text-foreground/50">
                      <Icon size={13} />
                    </span>
                    <span className="flex flex-col min-w-0">
                      <span className="text-sm font-semibold text-foreground leading-tight truncate">
                        {entry.title}
                      </span>
                      <span className="text-[11px] text-muted-foreground leading-snug truncate">
                        {entry.subtitle}
                      </span>
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center gap-1.5 py-8 text-muted-foreground">
                <SearchX size={22} strokeWidth={1.5} />
                <p className="text-xs font-medium">Sin resultados</p>
              </div>
            )}
          </div>

          {/* Navigating bar */}
          <div
            className={cn(
              "overflow-hidden transition-all duration-300 ease-out",
              navigating ? "max-h-10 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <div className="h-px bg-foreground/10" />
            <div className="flex items-center gap-2 px-3 py-2.5">
              <Loader2 size={13} className="animate-spin text-primary shrink-0" />
              <span className="flex-1 text-[11px] font-medium text-muted-foreground">
                {lang === "es" ? "Navegando…" : "Navigating…"}
              </span>
              <button onClick={closeSearch} className="text-muted-foreground hover:text-foreground transition-colors">
                <CircleStop size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>

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
