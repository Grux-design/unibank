import { Link } from "react-router-dom";
import { FooterStoreButton } from "@/components/atoms/FooterStoreButton";
import { legalLinks } from "@/data/footerData";

const ORANGE    = "#FF8136";
const TEXT_LINK = "#484746";
const BORDER    = "#E7E4E1";

const appleIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const playIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3.18 23.76c.33.19.72.2 1.08.03l12.35-6.96-2.76-2.76-10.67 9.69zM.5 1.73C.19 2.08 0 2.6 0 3.28v17.45c0 .67.19 1.19.51 1.54l.08.08 9.77-9.77v-.23L.58 1.65.5 1.73zM20.49 10.37l-2.75-1.55-3.09 3.09 3.09 3.09 2.77-1.56c.79-.45.79-1.62-.02-2.07zM4.26.21L16.61 7.17l-2.76 2.76L3.18.24C3.54.07 3.93.07 4.26.21z" />
  </svg>
);

export function FooterAppsBar() {
  return (
    <div style={{
      maxWidth: 1200, margin: "0 auto",
      display: "flex", alignItems: "center",
      justifyContent: "space-between", flexWrap: "wrap", gap: 16,
    }}>
      <div style={{ display: "flex", gap: 10 }}>
        <FooterStoreButton label="App Store"   icon={appleIcon} variant="dark"  href="https://apps.apple.com/us/app/unibank-panam%C3%A1/id6738843747" />
        <FooterStoreButton label="Google Play" icon={playIcon}  variant="light" href="https://play.google.com/store/apps/details?id=com.newtech.unibank&pcampaignid=web_share" />
      </div>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {legalLinks.map((link) => (
          <Link key={link.path} to={link.path} style={{
            fontFamily: "Inter, sans-serif", fontSize: 13,
            color: TEXT_LINK, textDecoration: "none", transition: "color 0.13s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = ORANGE; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = TEXT_LINK; }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
