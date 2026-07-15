import { socialIcons } from "@/data/footerData";
import { FooterSocialIcon } from "@/components/atoms/FooterSocialIcon";

const ORANGE = "#FF8136";

export function FooterCreditsBar() {
  return (
    <div style={{
      background: `linear-gradient(135deg, #E8621A 0%, ${ORANGE} 50%, #FFAC70 100%)`,
      padding: "18px 0",
      position: "relative", overflow: "hidden",
    }}>
      {/* Abstract shapes */}
      <svg aria-hidden="true" style={{ position: "absolute", top: 0, right: 0, opacity: 0.12, pointerEvents: "none" }}
        width="300" height="80" viewBox="0 0 300 80">
        <circle cx="260" cy="40" r="60" fill="white" />
        <circle cx="300" cy="10" r="40" fill="white" />
      </svg>

      <div className="site-container" style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between", flexWrap: "wrap", gap: 12,
        position: "relative",
      }}>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.85)", margin: 0 }}>
          © {new Date().getFullYear()} UniBank, S.A. Todos los derechos reservados.
        </p>
        <div style={{ display: "flex", gap: 8 }}>
          {socialIcons.map((s) => (
            <FooterSocialIcon key={s.label} icon={s.icon} label={s.label} href={s.href} />
          ))}
        </div>
      </div>
    </div>
  );
}
