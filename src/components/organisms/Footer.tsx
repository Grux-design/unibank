import { FooterBrandColumn } from "@/components/molecules/FooterBrandColumn";
import { FooterNavGrid }     from "@/components/molecules/FooterNavGrid";
import { FooterAppsBar }     from "@/components/molecules/FooterAppsBar";
import { FooterCreditsBar }  from "@/components/molecules/FooterCreditsBar";

const BORDER = "#E7E4E1";

export function Footer() {
  return (
    <footer role="contentinfo">
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
    </footer>
  );
}
