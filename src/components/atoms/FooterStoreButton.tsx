import { useState } from "react";

const ORANGE    = "#FF8136";
const TEXT_LINK = "#484746";
const BORDER    = "#E7E4E1";

interface FooterStoreButtonProps {
  label:   string;
  icon:    React.ReactNode;
  variant: "dark" | "light";
  href?:   string;
}

export function FooterStoreButton({ label, icon, variant, href = "#" }: FooterStoreButtonProps) {
  const [hovered, setHovered] = useState(false);

  const isDark = variant === "dark";

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        height: 40, padding: "0 18px", borderRadius: 10,
        background: isDark
          ? (hovered ? ORANGE : TEXT_LINK)
          : (hovered ? ORANGE : "white"),
        color: isDark
          ? (hovered ? "#1C1917" : "white")
          : (hovered ? "white" : TEXT_LINK),
        border: isDark ? "none" : `1px solid ${hovered ? ORANGE : BORDER}`,
        fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 13,
        textDecoration: "none",
        transition: "background 0.14s, color 0.14s, border-color 0.14s",
        whiteSpace: "nowrap",
      }}
    >
      {icon}
      {label}
    </a>
  );
}
