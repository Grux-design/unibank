import type { Slide } from "@/data/heroSlides";

interface HeroGlassCardProps {
  nextSlide: Slide;
}

export function HeroGlassCard({ nextSlide }: HeroGlassCardProps) {
  return (
    <div
      style={{
        boxSizing: "border-box",
        position: "absolute",
        right: 0,
        bottom: 0,
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        width: 294,
        height: 76,
        padding: "10px 12px",
        background: "rgba(255, 255, 255, 0.24)",
        opacity: 0.99,
        border: "1px solid rgba(255, 255, 255, 0.12)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        borderRadius: 12,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          width: "100%",
        }}
      >
        <div
          style={{
            width: 52,
            height: 44,
            flexShrink: 0,
            overflow: "hidden",
            borderRadius: 4,
          }}
        >
          <img
            src={nextSlide.image}
            alt={nextSlide.cardTitle}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: 2,
            flex: 1,
            minWidth: 0,
          }}
        >
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: 10,
              lineHeight: "16px",
              letterSpacing: "0.9px",
              textTransform: "uppercase",
              color: "#FF8136",
            }}
          >
            {nextSlide.cardTitle}
          </span>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: 13,
              lineHeight: "21px",
              color: "#1F1E1E",
            }}
          >
            {nextSlide.cardSub}
          </span>
        </div>
      </div>
    </div>
  );
}
