import sbpBadge from "@/assets/sbp-badge.png";

export function FooterSBPBadge() {
  return (
    <img
      src={sbpBadge}
      alt="Entidad regulada y supervisada por la Superintendencia de Bancos de Panamá"
      width={140}
      height={140}
      loading="lazy"
      decoding="async"
      draggable={false}
      style={{
        display: "block",
        width: 140,
        height: "auto",
        marginTop: 16,
      }}
    />
  );
}
