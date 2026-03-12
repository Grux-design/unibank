const ORANGE  = "#FF8136";
const BORDER  = "#E7E4E1";
const MUTED   = "#908E8D";

export function FooterSBPBadge() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 16 }}>
      <div style={{
        width: 40, height: 40, borderRadius: 8,
        background: "white", border: `1px solid ${BORDER}`,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="3" fill={ORANGE} opacity="0.15" />
          <path d="M7 12h10M7 8h10M7 16h6" stroke={ORANGE} strokeWidth="1.5" strokeLinecap="round" />
          <text x="12" y="14" textAnchor="middle" fontSize="5" fontWeight="700" fill={ORANGE}>SBP</text>
        </svg>
      </div>
      <p style={{
        fontFamily: "Inter, sans-serif", fontSize: 11, color: MUTED,
        lineHeight: 1.4, margin: 0, maxWidth: 200,
      }}>
        Entidad regulada y supervisada por la Superintendencia de Bancos de Panamá
      </p>
    </div>
  );
}
