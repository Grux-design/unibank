const PURPLE = "#801FFF";
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
        width: 40, height: 40, borderRadius: 8,
        background: "white", border: `1px solid ${BORDER}`,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="3" fill={PURPLE} opacity="0.15" />
          <text x="12" y="15" textAnchor="middle" fontSize="7" fontWeight="700" fill={PURPLE}>IS</text>
        </svg>
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
