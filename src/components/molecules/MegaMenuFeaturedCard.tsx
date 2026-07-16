import { HeroCtaButton } from "@/components/atoms/HeroCtaButton";
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
        <picture>
          <source srcSet={data.image.replace(/\.(jpe?g|png)$/i, ".webp")} type="image/webp" />
          <img
            src={data.image}
            alt=""
            loading="lazy"
            decoding="async"
            width={800}
            height={600}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </picture>
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

        <div style={{ marginTop: 16 }}>
          <HeroCtaButton
            to={featuredHref}
            variant="secondary"
            fullWidth
            onClick={onClose}
          >
            {data.featured.ctaLabel}
          </HeroCtaButton>
        </div>
      </div>
    </div>
  );
}
