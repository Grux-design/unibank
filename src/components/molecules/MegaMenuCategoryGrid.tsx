import { ChevronRight } from "lucide-react";
import type { MenuSection } from "@/data/megaMenuData";
import { secondaryLinks } from "@/data/megaMenuData";

interface MegaMenuCategoryGridProps {
  data:       MenuSection;
  isPersonas: boolean;
  onClose:    () => void;
}

export function MegaMenuCategoryGrid({ data, isPersonas, onClose }: MegaMenuCategoryGridProps) {
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: "24px 16px",
      }}>
        {data.categories.map((cat) => (
          <div key={cat.name}>
            <p style={{
              fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600,
              letterSpacing: "0.07em", textTransform: "uppercase",
              color: "#908E8D", margin: "0 0 8px 0",
            }}>
              {cat.name}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {cat.items.map((item) => (
                <a
                  key={item.label}
                  href="#"
                  onClick={onClose}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "7px 8px", borderRadius: 9, textDecoration: "none",
                    background: "transparent", transition: "background 0.12s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = isPersonas ? "#FFF3EC" : "#F2EFED";
                    const arrow = e.currentTarget.querySelector(".arr") as HTMLElement | null;
                    if (arrow) arrow.style.opacity = "1";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "transparent";
                    const arrow = e.currentTarget.querySelector(".arr") as HTMLElement | null;
                    if (arrow) arrow.style.opacity = "0";
                  }}
                >
                  <span>
                    <span style={{ display: "block", fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500, color: "#1C1917", lineHeight: 1.3 }}>
                      {item.label}
                    </span>
                    {item.tag && (
                      <span style={{
                        display: "inline-block", marginTop: 2, padding: "1px 6px",
                        borderRadius: 99, background: "#FFF3EC", color: "#FF8136",
                        fontSize: 10, fontWeight: 600, fontFamily: "Inter, sans-serif",
                      }}>
                        {item.tag}
                      </span>
                    )}
                  </span>
                  <ChevronRight className="arr" size={13} color="#FF8136"
                    style={{ opacity: 0, transition: "opacity 0.12s", flexShrink: 0 }} />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer links */}
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
