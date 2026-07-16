import type { Slide } from "@/data/heroSlides";
import { THEME, HERO_LAYOUT } from "@/data/heroSlides";
import { HeroProgressBar } from "@/components/atoms/HeroProgressBar";
import { HeroArrowButton }  from "@/components/atoms/HeroArrowButton";

interface HeroControlsProps {
  current:  number;
  total:    number;
  slide:    Slide;
  onPrev:   () => void;
  onNext:   () => void;
  isMobile?: boolean;
}

export function HeroControls({ current, total, slide, onPrev, onNext, isMobile = false }: HeroControlsProps) {
  const t = THEME;

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexShrink: isMobile ? 0 : undefined,
      padding: isMobile ? HERO_LAYOUT.mobile.controlsPadding : "16px 48px 24px 48px",
    }}>
      {/* Counter + progress dash + tag */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{
          fontSize: 13, fontWeight: 700, color: t.mutedColor,
          fontVariantNumeric: "tabular-nums", fontFamily: "monospace",
        }}>
          {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <HeroProgressBar animKey={current + "-bar"} width={80} />
        <span style={{
          fontSize: 12, fontWeight: 600, letterSpacing: "0.06em",
          textTransform: "uppercase", color: t.eyebrowColor,
        }}>
          {slide.tag}
        </span>
      </div>

      {/* Arrows */}
      <div style={{ display: "flex", gap: 8 }}>
        <HeroArrowButton
          label="Anterior"
          onClick={onPrev}
          path="M15.833 10H4.167M4.167 10L10 15.833M4.167 10L10 4.167"
        />
        <HeroArrowButton
          label="Siguiente"
          onClick={onNext}
          path="M4.167 10H15.833M15.833 10L10 4.167M15.833 10L10 15.833"
        />
      </div>
    </div>
  );
}
