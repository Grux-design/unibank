import { THEME } from "@/data/heroSlides";

interface HeroEyebrowProps { text: string }

export function HeroEyebrow({ text }: HeroEyebrowProps) {
  return (
    <span
      style={{
        fontSize:       14,
        fontWeight:     500,
        letterSpacing:  "0.01em",
        color:          THEME.eyebrowColor,
      }}
    >
      {text}
    </span>
  );
}
