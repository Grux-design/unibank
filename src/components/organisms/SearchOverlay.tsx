import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search, X, Home, Users, Briefcase, FileText, Phone,
  PiggyBank, Building2, Lock, SearchX, Loader2, CircleStop
} from "lucide-react";
import { cn } from "@/lib/utils";

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

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [navigating, setNavigating] = useState(false);
  const [visible, setVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Mount animation
  useEffect(() => {
    if (open) {
      setVisible(true);
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setVisible(false);
      setTimeout(() => {
        setQuery("");
        setNavigating(false);
      }, 200);
    }
  }, [open]);

  // Esc key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const filtered = query.trim()
    ? siteIndex.filter(
        (e) =>
          e.title.toLowerCase().includes(query.toLowerCase()) ||
          e.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    : siteIndex;

  const handleSelect = useCallback(
    (href: string) => {
      setNavigating(true);
      setTimeout(() => {
        navigate(href);
        onClose();
      }, 800);
    },
    [navigate, onClose]
  );

  if (!open && !visible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] flex items-start justify-center px-4 pt-24 transition-opacity duration-200",
        open && visible ? "opacity-100" : "opacity-0"
      )}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Card */}
      <div
        className={cn(
          "relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-background shadow-[var(--shadow-lg)]",
          "transition-all duration-200 ease-out",
          open && visible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-2"
        )}
      >
        {/* Search input row */}
        <div className="flex items-center gap-3 px-4 py-3.5">
          <Search size={17} className="shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar páginas y recursos…"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 rounded-md border border-border bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground select-none">
            Esc
          </kbd>
          <button
            onClick={onClose}
            className="ml-1 flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:text-foreground transition-colors sm:hidden"
          >
            <X size={15} />
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Results */}
        <div className="max-h-[320px] overflow-y-auto py-2">
          {filtered.length > 0 ? (
            filtered.map((entry) => {
              const Icon = entry.icon;
              return (
                <button
                  key={entry.href}
                  onClick={() => handleSelect(entry.href)}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 mx-1 text-left transition-colors hover:bg-muted focus:outline-none focus:bg-muted"
                  style={{ width: "calc(100% - 8px)" }}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <Icon size={15} />
                  </span>
                  <span className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold text-foreground leading-tight truncate">
                      {entry.title}
                    </span>
                    <span className="text-xs text-muted-foreground leading-snug truncate">
                      {entry.subtitle}
                    </span>
                  </span>
                </button>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-10 text-muted-foreground">
              <SearchX size={28} strokeWidth={1.5} />
              <p className="text-sm font-medium">Sin resultados para "{query}"</p>
              <p className="text-xs">Intenta con otro término</p>
            </div>
          )}
        </div>

        {/* Navigating bar */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-out",
            navigating ? "max-h-12 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="h-px bg-border" />
          <div className="flex items-center gap-2.5 px-4 py-3">
            <Loader2 size={14} className="animate-spin text-primary shrink-0" />
            <span className="flex-1 text-xs font-medium text-muted-foreground">
              Navegando…
            </span>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Cancelar"
            >
              <CircleStop size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
