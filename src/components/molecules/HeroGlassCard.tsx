import type { Slide } from "@/data/heroSlides";
import { THEME } from "@/data/heroSlides";
import { HeroProgressBar } from "@/components/atoms/HeroProgressBar";

interface HeroGlassCardProps {
  nextSlide:   Slide;
  currentKey:  number;
}

export function HeroGlassCard({ nextSlide, currentKey }: HeroGlassCardProps) {
  const t = THEME;

  return (
    <div style={{
      position: "absolute", bottom: 24, right: 16, zIndex: 10,
      background: t.glassBg, borderRadius: 16,
      padding: "14px 16px", minWidth: 190,
      border: `1px solid ${t.borderColor}`,
      boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
    }}>
      {/* Thumbnail + text */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <div style={{ width: 40, height: 40, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
          <img
            src={nextSlide.image}
            alt={nextSlide.cardTitle}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: t.glassTitleColor, lineHeight: 1.2, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            {nextSlide.cardTitle}
          </span>
          <span style={{ fontSize: 12, fontWeight: 500, color: t.glassSubColor, opacity: 0.72 }}>
            {nextSlide.cardSub}
          </span>
        </div>
      </div>

      <HeroProgressBar animKey={currentKey} />
    </div>
  );
}
