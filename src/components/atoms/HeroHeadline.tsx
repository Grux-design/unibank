import type { HeadlinePart } from "@/data/heroSlides";
import { THEME } from "@/data/heroSlides";
import type { HeroLayoutTier } from "@/data/heroSlides";

interface HeroHeadlineProps {
  parts: HeadlinePart[];
  layoutTier?: HeroLayoutTier;
  /** @deprecated use layoutTier */
  isMobile?: boolean;
}

export function HeroHeadline({ parts, layoutTier, isMobile }: HeroHeadlineProps) {
  const stacked = layoutTier ? layoutTier === "mobile" : !!isMobile;

  return (
    <h1
      style={{
        fontSize: stacked
          ? "clamp(2rem, 9vw, 2.5rem)"
          : layoutTier === "compact"
            ? "clamp(2.25rem, 4.5vw, 3.25rem)"
            : "clamp(2.75rem, 5vw, 4.25rem)",
        fontWeight: 700,
        lineHeight: stacked ? 1.1 : 1.08,
        margin: 0,
        color: THEME.headlineColor,
        whiteSpace: "normal",
      }}
    >
      {parts.map((part, i) => (
        <span
          key={i}
          style={{ color: part.highlight ? THEME.highlightColor : THEME.headlineColor }}
        >
          {part.text}
        </span>
      ))}
    </h1>
  );
}
