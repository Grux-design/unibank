import { Link } from "react-router-dom";
import { StoreBadge } from "@/components/atoms/StoreBadge";
import { legalLinks } from "@/data/footerData";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const ORANGE = "#FF8136";
const TEXT_LINK = "#484746";

export function FooterAppsBar() {
  const isMobile = useBreakpoint() === "mobile";

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "flex-start" : "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: isMobile ? 20 : 16,
      }}
    >
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <StoreBadge variant="app-store" />
        <StoreBadge variant="google-play" />
      </div>

      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 12 : 10, flexWrap: isMobile ? "nowrap" : "wrap", alignItems: isMobile ? "flex-start" : "center" }}>
        {legalLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              color: TEXT_LINK,
              textDecoration: "none",
              transition: "color 0.13s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = ORANGE;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = TEXT_LINK;
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
