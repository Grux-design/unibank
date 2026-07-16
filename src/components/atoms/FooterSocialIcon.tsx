import type { Icon } from "@/lib/icons";

const ORANGE = "#FF8136";

interface FooterSocialIconProps {
  icon:  Icon;
  label: string;
  href:  string;
}

export function FooterSocialIcon({ icon: Icon, label, href }: FooterSocialIconProps) {
  return (
    <a
      href={href}
      aria-label={label}
      style={{
        width: 34, height: 34, borderRadius: 8,
        background: "#F7E8E0",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: ORANGE, textDecoration: "none",
        transition: "background 0.14s",
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "white"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#F7E8E0"; }}
    >
      <Icon size={15} />
    </a>
  );
}
