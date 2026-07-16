import type { Slide } from "@/data/heroSlides";
import { THEME, getHeroLayout, type HeroLayoutTier } from "@/data/heroSlides";
import { HeroProgressBar } from "@/components/atoms/HeroProgressBar";
import { HeroArrowButton } from "@/components/atoms/HeroArrowButton";

interface HeroControlsProps {
  current: number;
  total: number;
  slide: Slide;
  onPrev: () => void;
  onNext: () => void;
  layoutTier?: HeroLayoutTier;
}

export function HeroControls({
  current,
  total,
  slide,
  onPrev,
  onNext,
  layoutTier = "full",
}: HeroControlsProps) {
  const t = THEME;
  const layout = getHeroLayout(layoutTier);
  const isStacked = layout.stackLayout;
  const progressWidth = layoutTier === "mobile" ? 56 : layoutTier === "compact" ? 64 : 80;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isStacked ? "column" : "row",
        alignItems: isStacked ? "stretch" : "center",
        justifyContent: "space-between",
        gap: isStacked ? 12 : 0,
        flexShrink: 0,
        padding: layout.controlsPadding,
        minWidth: 0,
        position: "relative",
        zIndex: 3,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: isStacked ? 10 : 14,
          flexWrap: isStacked ? "wrap" : "nowrap",
          minWidth: 0,
          flex: isStacked ? undefined : 1,
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: t.mutedColor,
            fontVariantNumeric: "tabular-nums",
            fontFamily: "monospace",
            flexShrink: 0,
          }}
        >
          {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <HeroProgressBar animKey={current + "-bar"} width={progressWidth} />
        <span
          style={{
            fontSize: isStacked ? 11 : 12,
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: t.eyebrowColor,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            minWidth: 0,
          }}
        >
          {slide.tag}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          gap: 8,
          flexShrink: 0,
          alignSelf: isStacked ? "flex-end" : undefined,
        }}
      >
        <HeroArrowButton label="Anterior" onClick={onPrev} direction="left" />
        <HeroArrowButton label="Siguiente" onClick={onNext} direction="right" />
      </div>
    </div>
  );
}
