import { ArrowRight } from "lucide-react";
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

  return (
    <div style={{
      width: 240, flexShrink: 0, marginLeft: 24,
      borderRadius: 16, overflow: "hidden",
      position: "relative", minHeight: 280,
    }}>
      <img src={data.image} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(28,25,23,0.88) 0%, rgba(28,25,23,0.45) 55%, transparent 100%)",
      }} />
      <div style={{
        position: "relative", height: "100%",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: 20, gap: 8,
      }}>
        <span style={{
          display: "inline-block", padding: "2px 8px", borderRadius: 99,
          background: "rgba(255,129,54,0.9)", color: "#fff",
          fontSize: 10, fontWeight: 700, fontFamily: "Inter, sans-serif",
          letterSpacing: "0.06em", textTransform: "uppercase", width: "fit-content",
        }}>
          {data.featured.tag}
        </span>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 700, color: "#fff", lineHeight: 1.3, margin: 0 }}>
          {data.featured.label}
        </p>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.8)", lineHeight: 1.45, margin: 0 }}>
          {data.featured.desc}
        </p>
        <Link
          to={featuredHref}
          onClick={onClose}
          style={{
            marginTop: 4, display: "inline-flex", alignItems: "center", gap: 6,
            padding: "8px 14px", borderRadius: 10,
            background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)",
            color: "#fff", fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600,
            textDecoration: "none", backdropFilter: "blur(4px)",
            transition: "background 0.14s", width: "fit-content",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.25)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
        >
          Conocer más <ArrowRight size={11} />
        </Link>
      </div>
    </div>
  );
}
