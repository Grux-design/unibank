import { FooterBrandColumn } from "@/components/molecules/FooterBrandColumn";
import { FooterNavGrid }     from "@/components/molecules/FooterNavGrid";
import { FooterAppsBar }     from "@/components/molecules/FooterAppsBar";
import { FooterCreditsBar }  from "@/components/molecules/FooterCreditsBar";
import footerBlob from "@/assets/footer-blob.png";

const BORDER = "#E7E4E1";

export function Footer() {
  return (
    <footer role="contentinfo" style={{ position: "relative", overflow: "hidden" }}>
      {/* Section 1: Brand + Nav */}
      <div style={{ background: "white", borderTop: `1px solid ${BORDER}`, padding: "56px 32px 40px" }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "grid", gridTemplateColumns: "260px 1fr", gap: 64,
        }}>
          <FooterBrandColumn />
          <FooterNavGrid />
        </div>
      </div>

      {/* Section 2: App stores + legal */}
      <div style={{ background: "white", borderTop: `1px solid ${BORDER}`, padding: "20px 32px" }}>
        <FooterAppsBar />
      </div>

      {/* Section 3: Credits bar */}
      <FooterCreditsBar />

      {/* Decorative blob – bottom right */}
      <img
        src={footerBlob}
        alt=""
        aria-hidden
        style={{
          position: "absolute",
          bottom: -20,
          right: -40,
          width: 320,
          height: "auto",
          pointerEvents: "none",
          opacity: 0.9,
        }}
      />
    </footer>
  );
}
