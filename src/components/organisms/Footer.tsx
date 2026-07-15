import { FooterBrandColumn } from "@/components/molecules/FooterBrandColumn";
import { FooterNavGrid } from "@/components/molecules/FooterNavGrid";
import { FooterAppsBar } from "@/components/molecules/FooterAppsBar";
import { FooterCreditsBar } from "@/components/molecules/FooterCreditsBar";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import footerBlob from "@/assets/footer-blob.png";

const BORDER = "#E7E4E1";

export function Footer() {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isCompact = bp === "compact";

  return (
    <footer role="contentinfo">
      {/* Section 1: Brand + Nav */}
      <div
        style={{
          background: "white",
          borderTop: `1px solid ${BORDER}`,
          padding: isMobile ? "40px 0 32px" : isCompact ? "48px 0 36px" : "56px 0 40px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="site-container"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile || isCompact ? "1fr" : "260px 1fr",
            gap: isMobile ? 32 : isCompact ? 48 : 64,
            position: "relative",
            zIndex: 1,
          }}
        >
          <FooterBrandColumn />
          <FooterNavGrid />
        </div>

        {/* Decorative blob – bottom right */}
        <img
          src={footerBlob}
          alt=""
          aria-hidden
          style={{
            position: "absolute",
            bottom: isMobile ? -40 : -20,
            right: isMobile ? -80 : -40,
            width: isMobile ? 200 : isCompact ? 260 : 320,
            height: "auto",
            pointerEvents: "none",
            opacity: isMobile ? 0.5 : 0.9,
            zIndex: 0,
          }}
        />
      </div>

      {/* Section 2: App stores + legal */}
      <div style={{ background: "white", borderTop: `1px solid ${BORDER}`, padding: isMobile ? "16px 0" : "20px 0" }}>
        <div className="site-container">
          <FooterAppsBar />
        </div>
      </div>

      {/* Section 3: Credits bar */}
      <FooterCreditsBar />
    </footer>
  );
}
