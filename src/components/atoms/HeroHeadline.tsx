import type { HeadlinePart } from "@/data/heroSlides";
import { THEME } from "@/data/heroSlides";

interface HeroHeadlineProps {
  parts: HeadlinePart[];
  isMobile?: boolean;
}

export function HeroHeadline({ parts, isMobile = false }: HeroHeadlineProps) {
  return (
    <h1
      style={{
        fontSize:   isMobile ? "clamp(2rem, 9vw, 2.5rem)" : "clamp(2.75rem, 5vw, 4.25rem)",
        fontWeight: 700,
        lineHeight: isMobile ? 1.1 : 1.08,
        margin:     0,
        color:      THEME.headlineColor,
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
