import { Link } from "react-router-dom";
import type { MenuSection } from "@/data/megaMenuData";
import { secondaryLinks } from "@/data/megaMenuData";

interface MegaMenuCategoryGridProps {
  data:       MenuSection;
  isPersonas: boolean;
  onClose:    () => void;
}

export function MegaMenuCategoryGrid({ data, isPersonas, onClose }: MegaMenuCategoryGridProps) {
  const segment = isPersonas ? "personas" : "empresas";
  const leftCats = data.categories.filter((_, i) => i % 2 === 0);
  const rightCats = data.categories.filter((_, i) => i % 2 === 1);

  const renderCategory = (cat: typeof data.categories[number]) => (
    <div key={cat.name} style={{ marginBottom: 16 }}>
      <p style={{
        fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 700,
        letterSpacing: "0.08em", textTransform: "uppercase",
        color: "#FF8136", margin: "0 0 10px 0",
      }}>
        {cat.name}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {cat.items.map((item) => {
          const linkStyle: React.CSSProperties = {
            display: "block",
            padding: "5px 0",
            textDecoration: "none",
            fontFamily: "Inter, sans-serif",
            fontSize: 14,
            fontWeight: 400,
            color: "#1C1917",
            transition: "color 0.12s",
          };
          const onEnter = (e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = "#FF8136"; };
          const onLeave = (e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = "#1C1917"; };

          if (item.href) {
            return (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                onClick={onClose} style={linkStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>
                {item.label}
              </a>
            );
          }
          return (
            <Link key={item.label} to={`/${segment}/${cat.categorySlug}/${item.slug}`}
              onClick={onClose} style={linkStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: "flex", gap: 48 }}>
        <div style={{ flex: 1 }}>{leftCats.map(renderCategory)}</div>
        <div style={{ flex: 1 }}>{rightCats.map(renderCategory)}</div>
      </div>

      <div style={{ display: "flex", gap: 4, marginTop: 20, paddingTop: 16, borderTop: "1px solid #E8E4E0" }}>
        {secondaryLinks.map((link) => (
          <Link
            key={link.label}
            to={link.href}
            onClick={onClose}
            style={{
              fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 500,
              color: "#484746", textDecoration: "none",
              padding: "6px 10px", borderRadius: 8,
              transition: "background 0.12s, color 0.12s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#F2EFED"; e.currentTarget.style.color = "#1C1917"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#484746"; }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
