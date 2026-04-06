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
  const categoryColor = isPersonas ? "#FF8136" : "#726F6E";

  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px 48px" }}>
        {data.categories.map((cat) => (
          <div key={cat.name}>
            <p style={{
              fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 700,
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: categoryColor, margin: "0 0 10px 0",
            }}>
              {cat.name}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {cat.items.map((item) => (
                <Link
                  key={item.label}
                  to={`/${segment}/${cat.categorySlug}/${item.slug}`}
                  onClick={onClose}
                  style={{
                    display: "block",
                    padding: "7px 0",
                    textDecoration: "none",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 14,
                    fontWeight: 400,
                    color: "#1C1917",
                    transition: "color 0.12s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#FF8136"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "#1C1917"; }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 4, marginTop: 20, paddingTop: 16, borderTop: "1px solid #E8E4E0" }}>
        {secondaryLinks.map((link) => (
          <a
            key={link}
            href="#"
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
            {link}
          </a>
        ))}
      </div>
    </div>
  );
}
