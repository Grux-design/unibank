import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "@/lib/icons";
import type { MenuSection } from "@/data/megaMenuData";
import { secondaryLinks } from "@/data/megaMenuData";

interface MobileMegaMenuListProps {
  data: MenuSection;
  isPersonas: boolean;
  onClose: () => void;
}

const linkRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "14px 0",
  textDecoration: "none",
  fontFamily: "Inter, sans-serif",
  fontSize: 15,
  fontWeight: 500,
  color: "#1C1917",
};

const categoryCaptionStyle: CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#FF8136",
  margin: "0 0 10px 0",
};

export function MobileMegaMenuList({ data, isPersonas, onClose }: MobileMegaMenuListProps) {
  const segment = isPersonas ? "personas" : "empresas";

  return (
    <div className="site-container-nav" style={{ paddingBottom: 24 }}>
      {data.categories.map((cat, catIndex) => (
        <div
          key={cat.name}
          style={{
            paddingTop: catIndex > 0 ? 20 : 0,
            borderTop: catIndex > 0 ? "1px solid #E8E4E0" : undefined,
          }}
        >
          <p style={categoryCaptionStyle}>
            {cat.name}
          </p>
          {cat.items.map((item) => {
            const content = (
              <>
                <span>{item.label}</span>
                <ChevronRight size={16} color="#C4C0BC" strokeWidth={2} />
              </>
            );

            if (item.href) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  style={linkRowStyle}
                >
                  {content}
                </a>
              );
            }
            if (item.to) {
              return (
                <Link key={item.label} to={item.to} onClick={onClose} style={linkRowStyle}>
                  {content}
                </Link>
              );
            }
            return (
              <Link
                key={item.label}
                to={`/${segment}/${cat.categorySlug}/${item.slug}`}
                onClick={onClose}
                style={linkRowStyle}
              >
                {content}
              </Link>
            );
          })}
        </div>
      ))}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          marginTop: 24,
          paddingTop: 20,
          borderTop: "1px solid #E8E4E0",
        }}
      >
        {secondaryLinks.map((link) => (
          <Link
            key={link.label}
            to={link.href}
            onClick={onClose}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: "#484746",
              textDecoration: "none",
              padding: "8px 12px",
              borderRadius: 8,
              background: "#F2EFED",
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
