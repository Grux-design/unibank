import { useState, useRef, useEffect } from "react";
import { Globe, Check, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface LangSwitcherProps {
  lang: "es" | "en";
  onToggleLang: () => void;
}

const languages = [
  { code: "es" as const, label: "Español" },
  { code: "en" as const, label: "English" },
];

export function LangSwitcher({ lang, onToggleLang }: LangSwitcherProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (code: "es" | "en") => {
    if (code !== lang) onToggleLang();
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      {/* Trigger pill */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className={cn(
          "flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 h-10",
          "text-sm font-medium text-foreground/70 hover:text-foreground transition-colors",
          open && "text-foreground"
        )}
      >
        <Globe size={15} className="shrink-0" />
        <span className="uppercase font-semibold text-xs tracking-wide">{lang}</span>
        {open
          ? <ChevronUp size={13} className="shrink-0 text-foreground/40" />
          : <ChevronDown size={13} className="shrink-0 text-foreground/40" />
        }
      </button>

      {/* Dropdown */}
      <div
        className={cn(
          "absolute left-0 top-full mt-1.5 z-50 w-36 overflow-hidden rounded-2xl",
          "bg-background border border-border shadow-[0_8px_24px_-4px_hsl(var(--foreground)/0.10)]",
          "transition-all duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] origin-top-left",
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        <div className="p-1.5 flex flex-col gap-0.5">
          {languages.map(l => (
            <button
              key={l.code}
              onClick={() => handleSelect(l.code)}
              className={cn(
                "flex items-center justify-between w-full rounded-xl px-3 py-2.5 text-sm font-medium text-left transition-colors",
                l.code === lang
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              )}
            >
              {l.label}
              {l.code === lang && <Check size={14} strokeWidth={2.5} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
