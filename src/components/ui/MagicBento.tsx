import React from "react";

interface MagicBentoGridProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function MagicBentoGrid({ children, style }: MagicBentoGridProps) {
  return (
    <div
      style={{
        display: "grid",
        gap: 8,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

interface MagicBentoCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function MagicBentoCard({ children, style }: MagicBentoCardProps) {
  return (
    <div
      style={{
        borderRadius: 32,
        overflow: "hidden",
        border: "1px solid #E7E4E1",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
