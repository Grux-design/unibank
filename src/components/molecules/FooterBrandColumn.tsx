import logoFooter from "@/assets/logos/logo-footer.svg";
import { FooterSBPBadge } from "@/components/atoms/FooterSBPBadge";

const TEXT_MUTED = "#908E8D";

export function FooterBrandColumn() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
      <img src={logoFooter} alt="UniBank" style={{ height: 28, width: "auto", display: "block" }} />
      <p style={{
        fontFamily: "Inter, sans-serif", fontSize: 14, color: TEXT_MUTED,
        lineHeight: 1.65, margin: 0,
      }}>
        Tu banco moderno en Panamá. Combinamos solidez financiera con agilidad digital para acompañarte en cada etapa de tu vida.
      </p>
      <FooterSBPBadge />
    </div>
  );
}
