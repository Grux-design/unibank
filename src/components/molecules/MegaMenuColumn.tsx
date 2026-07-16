import { Link } from "react-router-dom";
import type { Icon } from "@/lib/icons";

interface MenuItem {
  label: string;
  description: string;
  href: string;
  Icon: Icon;
}

interface MegaMenuColumnProps {
  heading: string;
  items: MenuItem[];
}

export function MegaMenuColumn({ heading, items }: MegaMenuColumnProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground px-2 pb-1">
        {heading}
      </p>
      <ul className="flex flex-col gap-0.5" role="list">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              to={item.href}
              className="group flex items-start gap-3 rounded-xl px-2 py-2 hover:bg-primary/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                <item.Icon size={14} className="text-primary" strokeWidth={2} />
              </span>
              <span className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                  {item.label}
                </span>
                <span className="text-xs text-muted-foreground leading-snug mt-0.5 line-clamp-1">
                  {item.description}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
