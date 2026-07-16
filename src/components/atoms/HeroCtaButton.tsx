import type { CSSProperties, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { CTA_BUTTON_COLORS, CTA_BUTTON_SIZE } from "@/constants/ctaButtons";

type HeroCtaVariant = "primary" | "secondary";

interface HeroCtaButtonProps {
  children: string;
  variant?: HeroCtaVariant;
  href?: string;
  to?: string;
  target?: string;
  rel?: string;
  fullWidth?: boolean;
  onClick?: () => void;
}

const palette = {
  primary: CTA_BUTTON_COLORS.primary,
  secondary: CTA_BUTTON_COLORS.lightSolid,
};

const baseStyle: CSSProperties = {
  boxSizing: "border-box",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: `${CTA_BUTTON_SIZE.height}px`,
  minHeight: `${CTA_BUTTON_SIZE.minHeight}px`,
  maxHeight: `${CTA_BUTTON_SIZE.height}px`,
  padding: `0 ${CTA_BUTTON_SIZE.paddingX}px`,
  fontSize: CTA_BUTTON_SIZE.fontSize,
  fontWeight: CTA_BUTTON_SIZE.fontWeight,
  lineHeight: CTA_BUTTON_SIZE.lineHeight,
  fontFamily: "Inter, sans-serif",
  borderRadius: CTA_BUTTON_SIZE.borderRadius,
  textDecoration: "none",
  cursor: "pointer",
  whiteSpace: "nowrap",
  border: "none",
  flexShrink: 0,
  transition: "background 0.18s ease",
};

type InteractiveEl = HTMLAnchorElement;

export function HeroCtaButton({
  children,
  variant = "primary",
  href,
  to,
  target,
  rel,
  fullWidth = false,
  onClick,
}: HeroCtaButtonProps) {
  const colors = palette[variant];

  const style: CSSProperties = {
    ...baseStyle,
    background: colors.bg,
    color: colors.color,
    width: fullWidth ? "100%" : undefined,
  };

  const setBg = (el: InteractiveEl, bg: string) => {
    el.style.background = bg;
  };

  const handleMouseEnter = (e: MouseEvent<InteractiveEl>) => {
    setBg(e.currentTarget, colors.bgHover);
  };

  const handleMouseLeave = (e: MouseEvent<InteractiveEl>) => {
    setBg(e.currentTarget, colors.bg);
  };

  const handleMouseDown = (e: MouseEvent<InteractiveEl>) => {
    setBg(e.currentTarget, colors.bgActive);
  };

  const handleMouseUp = (e: MouseEvent<InteractiveEl>) => {
    setBg(e.currentTarget, colors.bgHover);
  };

  const handlers = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onClick,
  };

  const label = (
    <span style={{ display: "block", lineHeight: CTA_BUTTON_SIZE.lineHeight }}>
      {children}
    </span>
  );

  if (to) {
    return (
      <Link to={to} style={style} {...handlers}>
        {label}
      </Link>
    );
  }

  return (
    <a href={href ?? "#"} target={target} rel={rel} style={style} {...handlers}>
      {label}
    </a>
  );
}
