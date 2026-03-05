import { Link } from "react-router-dom";

interface MenuItem {
  label: string;
  href: string;
}

interface MegaMenuColumnProps {
  heading: string;
  items: MenuItem[];
}

export function MegaMenuColumn({ heading, items }: MegaMenuColumnProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[11px] font-bold uppercase tracking-widest text-primary pb-1 border-b border-border">
        {heading}
      </p>
      <ul className="flex flex-col gap-1" role="list">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              to={item.href}
              className="block rounded-lg px-2 py-1.5 text-sm text-foreground/70 font-medium hover:bg-primary/5 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
