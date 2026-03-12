import { THEME } from "@/data/heroSlides";

interface HeroEyebrowProps { text: string }

export function HeroEyebrow({ text }: HeroEyebrowProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span
        style={{
          fontSize:       12,
          fontWeight:     600,
          letterSpacing:  "0.08em",
          textTransform:  "uppercase",
          color:          THEME.eyebrowColor,
          background:     "rgba(255,255,255,0.15)",
          borderRadius:   100,
          padding:        "4px 12px",
          backdropFilter: "blur(4px)",
        }}
      >
        {text}
      </span>
    </div>
  );
}
