import invertisLogo from "@/assets/logos/invertis-securities.png";

const BORDER = "#E7E4E1";
const MUTED  = "#908E8D";

export function FooterInvertisBadge() {
  return (
    <a
      href="https://www.invertissecurities.com/"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex", alignItems: "center", gap: 10, marginTop: 8,
        textDecoration: "none",
      }}
    >
      <div style={{
        height: 40, padding: "6px 10px", borderRadius: 8,
        background: "white", border: `1px solid ${BORDER}`,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <img
          src={invertisLogo}
          alt="Invertis Securities"
          style={{ height: 24, width: "auto", display: "block" }}
        />
      </div>
      <p style={{
        fontFamily: "Inter, sans-serif", fontSize: 11, color: MUTED,
        lineHeight: 1.4, margin: 0, maxWidth: 200,
      }}>
        Miembro del grupo Invertis Securities
      </p>
    </a>
  );
}
