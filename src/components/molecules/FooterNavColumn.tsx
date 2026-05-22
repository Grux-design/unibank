import { MessageCircle, MapPin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import type { FooterColumn } from "@/data/footerData";

const ORANGE    = "#FF8136";
const TEXT_DARK = "#1C1917";
const TEXT_LINK = "#484746";

interface FooterNavColumnProps {
  column: FooterColumn;
}

export function FooterNavColumn({ column }: FooterNavColumnProps) {
  return (
    <div>
      <h3 style={{
        fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600,
        color: TEXT_DARK, textTransform: "uppercase", letterSpacing: "0.08em",
        margin: "0 0 14px",
      }}>
        {column.title}
      </h3>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
        {column.links.map((link) => {
          const href = link.href ?? "#";
          const isExternal = href.startsWith("http");
          const isInternal = href.startsWith("/");
          if (column.isAttention && link.label === "whatsapp") return (
            <li key={link.label}>
              <a href={link.href ?? "#"} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 7, fontFamily: "Inter, sans-serif", fontSize: 14, color: TEXT_LINK, textDecoration: "none", transition: "color 0.13s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = ORANGE; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = TEXT_LINK; }}
              >
                <MessageCircle size={15} /> WhatsApp
              </a>
            </li>
          );
          if (column.isAttention && link.label === "sucursales") return (
            <li key={link.label}>
              <Link to={link.href ?? "/sucursales"} style={{ display: "flex", alignItems: "center", gap: 7, fontFamily: "Inter, sans-serif", fontSize: 14, color: TEXT_LINK, textDecoration: "none", transition: "color 0.13s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = ORANGE; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = TEXT_LINK; }}
              >
                <MapPin size={15} /> Sucursales
              </Link>
            </li>
          );
          if (column.isAttention && link.label === "contacto") return (
            <li key={link.label}>
              <Link to={link.href ?? "/contact"} style={{ display: "flex", alignItems: "center", gap: 7, fontFamily: "Inter, sans-serif", fontSize: 14, color: TEXT_LINK, textDecoration: "none", transition: "color 0.13s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = ORANGE; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = TEXT_LINK; }}
              >
                <Mail size={15} /> Contacto
              </Link>
            </li>
          );

          const isPdf = href.toLowerCase().endsWith(".pdf");

          if (isInternal && !isPdf) {
            return (
              <li key={link.label}>
                <Link
                  to={href}
                  style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: TEXT_LINK, textDecoration: "none", transition: "color 0.13s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = ORANGE; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = TEXT_LINK; }}
                >
                  {link.label}
                </Link>
              </li>
            );
          }

          return (
            <li key={link.label}>
              <a
                href={href}
                {...(isExternal || isPdf ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: TEXT_LINK, textDecoration: "none", transition: "color 0.13s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = ORANGE; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = TEXT_LINK; }}
              >
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
