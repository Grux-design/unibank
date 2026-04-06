import { THEME } from "@/data/heroSlides";

interface HeroEyebrowProps { text: string }

export function HeroEyebrow({ text }: HeroEyebrowProps) {
  return (
    <span
      style={{
        fontSize:       12,
        fontWeight:     600,
        letterSpacing:  "0.08em",
        textTransform:  "uppercase",
        color:          THEME.eyebrowColor,
      }}
    >
      {text}
    </span>
  );
}
