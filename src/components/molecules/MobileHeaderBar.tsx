import { Link } from "react-router-dom";
import { Menu, Search } from "@/lib/icons";
import { Logo } from "@/components/atoms/Logo";
import { HEADER_PILL, headerPillShellStyle } from "@/constants/headerPill";
import type { Lang } from "@/components/layout/SiteLayout";

interface MobileHeaderBarProps {
  lang: Lang;
  menuOpen: boolean;
  onOpenSearch: () => void;
  onOpenMenu: () => void;
}

export function MobileHeaderBar({
  lang,
  menuOpen,
  onOpenSearch,
  onOpenMenu,
}: MobileHeaderBarProps) {
  return (
    <>
      <div
        style={{
          ...headerPillShellStyle,
          paddingInline: HEADER_PILL.mobileLogoPaddingInline,
        }}
      >
        <Link
          to="/"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
          style={{
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
            height: HEADER_PILL.logoHeight,
            lineHeight: 0,
          }}
          aria-label="UniBank – Inicio"
        >
          <Logo variant="responsive" height={HEADER_PILL.logoHeight} priority />
        </Link>
      </div>

      <div
        style={{
          ...headerPillShellStyle,
          paddingInline: HEADER_PILL.mobileActionsPaddingInline,
          gap: 6,
        }}
      >
        <button
          type="button"
          onClick={onOpenSearch}
          aria-label={lang === "es" ? "Buscar" : "Search"}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 48,
            height: 48,
            borderRadius: 12,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <Search size={18} color="#484746" strokeWidth={2} />
        </button>

        <button
          type="button"
          onClick={onOpenMenu}
          aria-label={lang === "es" ? "Abrir menú" : "Open menu"}
          aria-expanded={menuOpen}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            height: 48,
            padding: "0 16px",
            borderRadius: 12,
            border: "none",
            background: "#FF8136",
            color: "#FFFFFF",
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: 14,
            lineHeight: "20px",
            cursor: "pointer",
            flexShrink: 0,
            whiteSpace: "nowrap",
          }}
        >
          <Menu size={18} color="#FFFFFF" strokeWidth={2} />
          {lang === "es" ? "Menú" : "Menu"}
        </button>
      </div>
    </>
  );
}
