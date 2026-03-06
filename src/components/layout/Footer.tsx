import { useState } from "react";
import { Facebook, Instagram, Linkedin, Youtube, MessageCircle, MapPin } from "lucide-react";
import { Logo } from "@/components/atoms/Logo";

// ─── TOKENS ──────────────────────────────────────────────────
const BORDER     = "#E7E4E1";
const TEXT_DARK  = "#1C1917";
const TEXT_MUTED = "#908E8D";
const TEXT_LINK  = "#484746";
const ORANGE     = "#FF8136";
const BG_MAIN    = "#F2EFED";

// ─── DATA ────────────────────────────────────────────────────
const footerColumns = [
  {
    title: "Conócenos",
    links: [
      "Junta Directiva", "UniLíderes", "Sostenibilidad",
      "Estados Financieros", "Gestión de Riesgo Operativo",
      "Cumplimiento Normativo", "Manual de Gobierno Corporativo",
      "RSE – Responsabilidad Social",
    ],
  },
  {
    title: "Grupo UniBank",
    links: ["UniConnect", "UniTrust", "Univivir", "UniLeasing", "Grupo Invertis"],
  },
  {
    title: "Enlaces de Interés",
    links: [
      "Cajilla de Seguridad", "Tarifario", "Trabaja con nosotros",
      "Portal Inmobiliario", "Noticias", "Blog", "Canal de denuncias",
    ],
  },
  {
    title: "Canales de Atención",
    links: ["whatsapp", "sucursales"],
    isAttention: true,
  },
];

const socialIcons = [
  { icon: Facebook,  label: "Facebook"  },
  { icon: Instagram, label: "Instagram" },
  { icon: Linkedin,  label: "LinkedIn"  },
  { icon: Youtube,   label: "YouTube"   },
];

const legalLinks = [
  "Aviso de Privacidad",
  "Términos y Condiciones",
  "Política de Cookies",
];

// ─── SBP BADGE ───────────────────────────────────────────────
function SBPBadge() {
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
        fontFamily: "Inter, sans-serif", fontSize: 11, color: TEXT_MUTED,
        lineHeight: 1.4, margin: 0, maxWidth: 200,
      }}>
        Entidad regulada y supervisada por la Superintendencia de Bancos de Panamá
      </p>
    </div>
  );
}

// ─── COMPONENT ───────────────────────────────────────────────
export function Footer() {
  const [appStoreHovered,   setAppStoreHovered]   = useState(false);
  const [googlePlayHovered, setGooglePlayHovered] = useState(false);

  return (
    <footer role="contentinfo">

      {/* ── SECTION 1: Main ── */}
      <div style={{
        background: "white",
        borderTop: `1px solid ${BORDER}`,
        padding: "56px 32px 40px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Decorative background SVG */}
        <svg
          aria-hidden="true"
          style={{ position: "absolute", bottom: 0, right: 0, opacity: 0.04, pointerEvents: "none" }}
          width="420" height="320" viewBox="0 0 420 320"
        >
          <circle cx="350" cy="280" r="200" fill={ORANGE} />
          <circle cx="400" cy="100" r="120" fill={TEXT_DARK} />
        </svg>

        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "260px 1fr",
          gap: 64,
          position: "relative",
        }}>
          {/* Left column — logo + description + badge + social */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Logo variant="primary" height={36} />

            <p style={{
              fontFamily: "Inter, sans-serif", fontSize: 14, color: TEXT_MUTED,
              lineHeight: 1.65, margin: 0,
            }}>
              Tu banco moderno en Panamá. Combinamos solidez financiera con agilidad digital para acompañarte en cada etapa de tu vida.
            </p>

            <SBPBadge />

            {/* Social icons */}
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              {socialIcons.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  style={{
                    width: 36, height: 36, borderRadius: 9,
                    background: BG_MAIN, border: `1px solid ${BORDER}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: TEXT_LINK, textDecoration: "none",
                    transition: "background 0.14s, border-color 0.14s, color 0.14s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = ORANGE;
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = ORANGE;
                    (e.currentTarget as HTMLAnchorElement).style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = BG_MAIN;
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = BORDER;
                    (e.currentTarget as HTMLAnchorElement).style.color = TEXT_LINK;
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Right — 4 link columns */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 32,
          }}>
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 style={{
                  fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600,
                  color: TEXT_DARK, textTransform: "uppercase", letterSpacing: "0.08em",
                  margin: "0 0 14px",
                }}>
                  {col.title}
                </h3>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {col.links.map((link) => {
                    if (col.isAttention && link === "whatsapp") return (
                      <li key={link}>
                        <a href="#" style={{
                          display: "flex", alignItems: "center", gap: 7,
                          fontFamily: "Inter, sans-serif", fontSize: 14,
                          color: TEXT_LINK, textDecoration: "none",
                          transition: "color 0.13s",
                        }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = ORANGE; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = TEXT_LINK; }}
                        >
                          <MessageCircle size={15} />
                          WhatsApp
                        </a>
                      </li>
                    );
                    if (col.isAttention && link === "sucursales") return (
                      <li key={link}>
                        <a href="#" style={{
                          display: "flex", alignItems: "center", gap: 7,
                          fontFamily: "Inter, sans-serif", fontSize: 14,
                          color: TEXT_LINK, textDecoration: "none",
                          transition: "color 0.13s",
                        }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = ORANGE; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = TEXT_LINK; }}
                        >
                          <MapPin size={15} />
                          Sucursales
                        </a>
                      </li>
                    );
                    return (
                      <li key={link}>
                        <a href="#" style={{
                          fontFamily: "Inter, sans-serif", fontSize: 14,
                          color: TEXT_LINK, textDecoration: "none",
                          transition: "color 0.13s",
                        }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = ORANGE; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = TEXT_LINK; }}
                        >
                          {link}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION 2: App Stores + Legal ── */}
      <div style={{
        background: "white",
        borderTop: `1px solid ${BORDER}`,
        padding: "20px 32px",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", flexWrap: "wrap", gap: 16,
        }}>
          {/* Store buttons */}
          <div style={{ display: "flex", gap: 10 }}>
            <a
              href="#"
              onMouseEnter={() => setAppStoreHovered(true)}
              onMouseLeave={() => setAppStoreHovered(false)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                height: 40, padding: "0 18px", borderRadius: 10,
                background: appStoreHovered ? ORANGE : TEXT_LINK,
                color: appStoreHovered ? TEXT_DARK : "white",
                fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 13,
                textDecoration: "none", transition: "background 0.14s, color 0.14s",
                whiteSpace: "nowrap",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              App Store
            </a>
            <a
              href="#"
              onMouseEnter={() => setGooglePlayHovered(true)}
              onMouseLeave={() => setGooglePlayHovered(false)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                height: 40, padding: "0 18px", borderRadius: 10,
                background: googlePlayHovered ? ORANGE : "white",
                color: googlePlayHovered ? "white" : TEXT_LINK,
                border: `1px solid ${googlePlayHovered ? ORANGE : BORDER}`,
                fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 13,
                textDecoration: "none", transition: "background 0.14s, color 0.14s, border-color 0.14s",
                whiteSpace: "nowrap",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23.76c.33.19.72.2 1.08.03l12.35-6.96-2.76-2.76-10.67 9.69zM.5 1.73C.19 2.08 0 2.6 0 3.28v17.45c0 .67.19 1.19.51 1.54l.08.08 9.77-9.77v-.23L.58 1.65.5 1.73zM20.49 10.37l-2.75-1.55-3.09 3.09 3.09 3.09 2.77-1.56c.79-.45.79-1.62-.02-2.07zM4.26.21L16.61 7.17l-2.76 2.76L3.18.24C3.54.07 3.93.07 4.26.21z"/>
              </svg>
              Google Play
            </a>
          </div>

          {/* Legal links */}
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {legalLinks.map((link) => (
              <a key={link} href="#" style={{
                fontFamily: "Inter, sans-serif", fontSize: 13,
                color: TEXT_LINK, textDecoration: "none",
                transition: "color 0.13s",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = ORANGE; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = TEXT_LINK; }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION 3: Credits bar — orange gradient ── */}
      <div style={{
        background: `linear-gradient(135deg, #E8621A 0%, ${ORANGE} 50%, #FFAC70 100%)`,
        padding: "18px 32px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Abstract shapes */}
        <svg
          aria-hidden="true"
          style={{ position: "absolute", top: 0, right: 0, opacity: 0.12, pointerEvents: "none" }}
          width="300" height="80" viewBox="0 0 300 80"
        >
          <circle cx="260" cy="40" r="60" fill="white" />
          <circle cx="300" cy="10" r="40" fill="white" />
        </svg>

        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", flexWrap: "wrap", gap: 12,
          position: "relative",
        }}>
          <p style={{
            fontFamily: "Inter, sans-serif", fontSize: 13,
            color: "rgba(255,255,255,0.85)", margin: 0,
          }}>
            © {new Date().getFullYear()} UniBank, S.A. Todos los derechos reservados.
          </p>

          {/* Social icons */}
          <div style={{ display: "flex", gap: 8 }}>
            {socialIcons.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                style={{
                  width: 34, height: 34, borderRadius: 8,
                  background: "#F7E8E0",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: ORANGE, textDecoration: "none",
                  transition: "background 0.14s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "white"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#F7E8E0"; }}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}
