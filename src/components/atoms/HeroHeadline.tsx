import type { HeadlinePart } from "@/data/heroSlides";
import { THEME } from "@/data/heroSlides";

interface HeroHeadlineProps { parts: HeadlinePart[] }

export function HeroHeadline({ parts }: HeroHeadlineProps) {
  return (
    <h1
      style={{
        fontSize:   "clamp(2.75rem, 5vw, 4.25rem)",
        fontWeight: 700,
        lineHeight: 1.08,
        margin:     0,
        color:      THEME.headlineColor,
        whiteSpace: "pre-line",
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
