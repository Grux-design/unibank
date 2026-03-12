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
      background: t.glassBg, backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)", borderRadius: 16,
      padding: "14px 16px", minWidth: 190,
      border: `1px solid ${t.borderColor}`,
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
          <span style={{ fontSize: 13, fontWeight: 600, color: t.glassTitleColor, lineHeight: 1.2 }}>
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
