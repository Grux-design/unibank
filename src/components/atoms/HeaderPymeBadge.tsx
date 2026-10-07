import { Link } from "react-router-dom";
import { ChevronRight } from "@/lib/icons";
import type { Lang } from "@/components/layout/SiteLayout";

interface HeaderPymeBadgeProps {
  lang: Lang;
  compact?: boolean;
  variant?: "default" | "menu";
  onNavigate?: () => void;
}

export function HeaderPymeBadge({
  lang,
  compact = false,
  variant = "default",
  onNavigate,
}: HeaderPymeBadgeProps) {
  const isMenu = variant === "menu";

  const colors = {
    bg: "#FBDC9D",
    bgHover: "#F7D392",
    border: "#E8C270",
    accent: "#9A6612",
    text: "#2E2318",
  };

  return (
    <Link
      to="/empresas/cuentas/cuenta-juridica-digital"
      onClick={onNavigate}
      style={{
        display: "flex",
        alignItems: "center",
        gap: isMenu ? 10 : compact ? 6 : 8,
        width: isMenu ? "100%" : "fit-content",
        height: isMenu ? 48 : compact ? 32 : 40,
        padding: isMenu ? "0 14px" : compact ? "0 8px 0 6px" : "0 12px 0 8px",
        borderRadius: isMenu ? 12 : compact ? 8 : 10,
        background: colors.bg,
        border: `0.5px solid ${colors.border}`,
        textDecoration: "none",
        flexShrink: compact ? 1 : 0,
        minWidth: 0,
        transition: "background 0.15s ease",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = colors.bg; }}
    >
      <span
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 600,
          fontSize: isMenu ? 10 : compact ? 9 : 10,
          lineHeight: 1,
          letterSpacing: 0.4,
          textTransform: "uppercase",
          color: "#FFFFFF",
          background: colors.accent,
          padding: isMenu ? "4px 6px" : compact ? "3px 5px" : "4px 6px",
          borderRadius: 6,
          flexShrink: 0,
        }}
      >
        {lang === "es" ? "Nuevo" : "New"}
      </span>
      <span
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: isMenu ? 600 : 500,
          fontSize: isMenu ? 14 : compact ? 11 : 13,
          lineHeight: "20px",
          color: colors.text,
          flex: isMenu ? 1 : undefined,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        PYME
      </span>
      {isMenu && (
        <ChevronRight size={16} color={colors.accent} strokeWidth={2.25} style={{ flexShrink: 0 }} />
      )}
    </Link>
  );
}
