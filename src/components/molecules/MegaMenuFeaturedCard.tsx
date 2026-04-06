import { Link } from "react-router-dom";
import type { MenuSection } from "@/data/megaMenuData";

interface MegaMenuFeaturedCardProps {
  data:       MenuSection;
  isPersonas: boolean;
  onClose:    () => void;
}

export function MegaMenuFeaturedCard({ data, isPersonas, onClose }: MegaMenuFeaturedCardProps) {
  const segment = isPersonas ? "personas" : "empresas";
  const featuredHref = `/${segment}/${data.featured.categorySlug}/${data.featured.slug}`;

  const cardBg = isPersonas ? "#FF8136" : "#1C1917";
  const tagColor = isPersonas ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.5)";
  const imgBorder = isPersonas ? "3px solid rgba(255,255,255,0.35)" : "none";

  return (
    <div style={{
      width: 240, flexShrink: 0,
      borderRadius: 20, overflow: "hidden",
      background: cardBg,
      display: "flex", flexDirection: "column",
      padding: 16,
    }}>
      {/* Image */}
      <div style={{
        borderRadius: 14, overflow: "hidden",
        border: imgBorder,
        aspectRatio: "4/3",
      }}>
        <img
          src={data.image}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", paddingTop: 16 }}>
        <span style={{
          fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 700,
          letterSpacing: "0.08em", textTransform: "uppercase",
          color: tagColor, marginBottom: 4,
        }}>
          {data.featured.tag}
        </span>
        <p style={{
          fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 700,
          color: "#fff", lineHeight: 1.3, margin: "0 0 4px 0",
        }}>
          {data.featured.label}
        </p>
        <p style={{
          fontFamily: "Inter, sans-serif", fontSize: 12,
          color: "rgba(255,255,255,0.7)", lineHeight: 1.45, margin: 0,
        }}>
          {data.featured.desc}
        </p>

        <div style={{ flex: 1 }} />

        <Link
          to={featuredHref}
          onClick={onClose}
          style={{
            marginTop: 16, display: "block", textAlign: "center",
            padding: "12px 14px", borderRadius: 999,
            background: "#FFE8DA",
            color: "#FF8136", fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600,
            textDecoration: "none",
            transition: "background 0.14s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#FFD9C4"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#FFE8DA"; }}
        >
          {data.featured.ctaLabel}
        </Link>
      </div>
    </div>
  );
}
