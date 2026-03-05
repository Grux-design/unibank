import { useState, useEffect, useRef, useCallback, RefObject } from "react";
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
  lang?: "es" | "en";
  triggerRef: RefObject<HTMLButtonElement>;
}

export function SearchOverlay({ open, onClose, lang = "es", triggerRef }: SearchOverlayProps) {
  const [query, setQuery]           = useState("");
  const [navigating, setNavigating] = useState(false);
  const [mounted, setMounted]       = useState(false);
  const [visible, setVisible]       = useState(false);
  const [pos, setPos]               = useState({ top: 0, left: 0 });

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  /* Capture button position on open */
  useEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPos({ top: rect.bottom + 8, left: rect.left });
    }
  }, [open, triggerRef]);

  /* Mount → tick → visible */
  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setVisible(false);
      setTimeout(() => {
        setMounted(false);
        setQuery("");
        setNavigating(false);
      }, 300);
    }
  }, [open]);

  /* Esc key */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const filtered = query.trim()
    ? siteIndex.filter(e =>
        e.title.toLowerCase().includes(query.toLowerCase()) ||
        e.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    : siteIndex;

  const handleSelect = useCallback((href: string) => {
    setNavigating(true);
    setTimeout(() => {
      navigate(href);
      onClose();
    }, 700);
  }, [navigate, onClose]);

  if (!mounted) return null;

  return (
    /* Backdrop */
    <div
      className={cn(
        "fixed inset-0 z-[60] transition-colors duration-300",
        visible ? "bg-background/50" : "bg-transparent"
      )}
      onClick={onClose}
    >
      {/* Card — positioned from the button's bounding rect, grows from top-left (origin-top-left) */}
      <div
        style={{ top: pos.top, left: pos.left }}
        className={cn(
          "absolute w-[420px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl",
          "bg-background border border-border shadow-[0_8px_32px_-4px_hsl(var(--foreground)/0.12)]",
          "transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] origin-top-left",
          visible ? "opacity-100 scale-100" : "opacity-0 scale-[0.4]"
        )}
        onClick={e => e.stopPropagation()}
      >
        {/* Input row */}
        <div className="flex items-center gap-3 px-4 py-3.5">
          <Search size={16} className="shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={lang === "es" ? "Buscar páginas y recursos…" : "Search pages & resources…"}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center rounded-md border border-border bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground select-none">
            Esc
          </kbd>
          <button
            onClick={onClose}
            className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Results */}
        <div className="max-h-[360px] overflow-y-auto py-2 px-2">
          {filtered.length > 0 ? (
            filtered.map(entry => {
              const Icon = entry.icon;
              return (
                <button
                  key={entry.href}
                  onClick={() => handleSelect(entry.href)}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-muted focus:outline-none focus:bg-muted"
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
              <SearchX size={26} strokeWidth={1.5} />
              <p className="text-sm font-medium">
                {lang === "es" ? `Sin resultados para "${query}"` : `No results for "${query}"`}
              </p>
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
              {lang === "es" ? "Navegando…" : "Navigating…"}
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
