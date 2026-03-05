import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Users, Building2, ArrowRight, ChevronRight } from "lucide-react";

type Tab = "personas" | "empresas";

interface MegaMenuProps {
  onClose: () => void;
}

// ─── MENU DATA ──────────────────────────────────────────────
const personasData = {
  image:
    "https://images.unsplash.com/photo-1704088030734-96769c4593a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  featured: {
    tag: "Lo más popular",
    label: "Cuenta Naranja+",
    desc: "Sin mantenimiento, sin comisiones. La cuenta que trabaja para ti.",
  },
  categories: [
    {
      name: "Cuentas",
      items: [
        { label: "Cuenta Naranja+", desc: "Sin mantenimiento ni límites", tag: "Popular" },
        { label: "Cuenta de Ahorro", desc: "Gana intereses mes a mes", tag: null },
        { label: "Cuenta Corriente", desc: "Flexibilidad para tus pagos", tag: null },
        { label: "Depósito a Plazo", desc: "Rendimientos garantizados", tag: null },
      ],
    },
    {
      name: "Crédito",
      items: [
        { label: "Préstamo de Auto", desc: "Financia tu próximo vehículo", tag: "Rápido" },
        { label: "Crédito Hipotecario", desc: "Compra la casa de tus sueños", tag: null },
        { label: "Préstamo Personal", desc: "Dinero cuando más lo necesitas", tag: null },
      ],
    },
    {
      name: "Inversiones",
      items: [
        { label: "Invertis Global Income Fund", desc: "Portafolio diversificado global", tag: "Exclusivo" },
        { label: "Depósito a Plazo Fijo", desc: "Tasas preferenciales aseguradas", tag: null },
      ],
    },
    {
      name: "Tarjetas",
      items: [
        { label: "Mastercard Black Débito", desc: "Acepta en más de 200 países", tag: null },
        { label: "Tarjeta de Crédito", desc: "Cashback en cada compra", tag: null },
      ],
    },
    {
      name: "Canales Digitales",
      items: [
        { label: "Banca Móvil UniBank", desc: "Tu banco en el bolsillo", tag: null },
        { label: "ACH Xpress", desc: "Transferencias al instante", tag: null },
        { label: "Xpress Pagos", desc: "Paga facturas en segundos", tag: null },
      ],
    },
  ],
};

const empresasData = {
  image:
    "https://images.unsplash.com/photo-1758518727077-ffb66ffccced?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  featured: {
    tag: "Nuevo",
    label: "UniLeasing",
    desc: "Equipa tu empresa sin inmovilizar capital. Aprobación en 48h.",
  },
  categories: [
    {
      name: "Cuentas",
      items: [
        { label: "Cuenta Corriente Jurídica", desc: "Operaciones sin restricciones", tag: null },
        { label: "Cuenta de Ahorro Empresarial", desc: "Rentabiliza tu liquidez", tag: null },
      ],
    },
    {
      name: "Financiamiento",
      items: [
        { label: "Préstamo Comercial", desc: "Capital para crecer rápido", tag: null },
        { label: "UniLeasing", desc: "Equipa tu empresa sin comprar", tag: "Nuevo" },
        { label: "Líneas de Crédito", desc: "Liquidez disponible siempre", tag: null },
        { label: "Préstamo Agroindustrial", desc: "Apoyo al sector productivo", tag: null },
      ],
    },
    {
      name: "Mercado de Capitales",
      items: [
        { label: "Emisión de Valores", desc: "Accede al mercado bursátil", tag: null },
        { label: "Portafolio Corporativo", desc: "Gestión institucional de activos", tag: null },
      ],
    },
    {
      name: "Gestión",
      items: [
        { label: "Pago de Planilla", desc: "Paga a tu equipo en un clic", tag: null },
        { label: "Pagos Masivos ACH", desc: "Miles de pagos simultáneos", tag: null },
        { label: "Reportes Financieros", desc: "Visibilidad total de tu empresa", tag: null },
      ],
    },
    {
      name: "Canales Digitales",
      items: [
        { label: "Banca en Línea Empresarial", desc: "Control total desde el escritorio", tag: null },
        { label: "ACH Xpress", desc: "Transferencias inmediatas", tag: null },
        { label: "Xpress Pagos", desc: "Pagos masivos automatizados", tag: null },
      ],
    },
  ],
};

const secondaryLinks = ["Sobre UniBank", "Tarifas y Tasas", "Sucursales"];

export function MegaMenu({ onClose }: MegaMenuProps) {
  const [activeTab, setActiveTab] = useState<Tab>("personas");
  const data = activeTab === "personas" ? personasData : empresasData;
  const isPersonas = activeTab === "personas";

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: "100%",
        zIndex: 40,
        background: "#ffffff",
        borderTop: "1px solid #E0DDD9",
        borderBottom: "1px solid #E0DDD9",
        boxShadow: "0 8px 32px -4px rgba(28,25,23,0.12)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Tab row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid #E0DDD9",
          }}
        >
          {(["personas", "empresas"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "18px 0",
                marginRight: 28,
                fontFamily: "Inter, sans-serif",
                fontSize: "0.9375rem",
                fontWeight: activeTab === tab ? 600 : 400,
                color: activeTab === tab ? "#1C1917" : "#908E8D",
                borderBottom: `2px solid ${activeTab === tab ? "#FF8136" : "transparent"}`,
                marginBottom: -1,
                transition: "color 0.14s",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {tab === "personas" ? <Users size={15} /> : <Building2 size={15} />}
              {tab === "personas" ? "Personas" : "Empresas"}
            </button>
          ))}

          <a
            href="#"
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: "#908E8D",
              textDecoration: "none",
              padding: "18px 0",
              transition: "color 0.14s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#1C1917"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#908E8D"; }}
          >
            Ver todo <ChevronRight size={13} />
          </a>
        </div>

        {/* Body */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: isPersonas ? -10 : 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isPersonas ? 10 : -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{ display: "flex", gap: 0, padding: "24px 0" }}
          >
            {/* Left: categories grid */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                  gap: "24px 16px",
                }}
              >
                {data.categories.map((cat) => (
                  <div key={cat.name}>
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: "0.07em",
                        textTransform: "uppercase",
                        color: "#908E8D",
                        marginBottom: 8,
                        margin: "0 0 8px 0",
                      }}
                    >
                      {cat.name}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      {cat.items.map((item) => (
                        <a
                          key={item.label}
                          href="#"
                          onClick={onClose}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "7px 8px",
                            borderRadius: 9,
                            textDecoration: "none",
                            background: "transparent",
                            transition: "background 0.12s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = isPersonas ? "#FFF3EC" : "#F2EFED";
                            const arrow = e.currentTarget.querySelector(".arr") as HTMLElement | null;
                            if (arrow) arrow.style.opacity = "1";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            const arrow = e.currentTarget.querySelector(".arr") as HTMLElement | null;
                            if (arrow) arrow.style.opacity = "0";
                          }}
                        >
                          <span>
                            <span
                              style={{
                                display: "block",
                                fontFamily: "Inter, sans-serif",
                                fontSize: 13,
                                fontWeight: 500,
                                color: "#1C1917",
                                lineHeight: 1.3,
                              }}
                            >
                              {item.label}
                            </span>
                            {item.tag && (
                              <span
                                style={{
                                  display: "inline-block",
                                  marginTop: 2,
                                  padding: "1px 6px",
                                  borderRadius: 99,
                                  background: "#FFF3EC",
                                  color: "#FF8136",
                                  fontSize: 10,
                                  fontWeight: 600,
                                  fontFamily: "Inter, sans-serif",
                                }}
                              >
                                {item.tag}
                              </span>
                            )}
                          </span>
                          <ChevronRight
                            className="arr"
                            size={13}
                            color="#FF8136"
                            style={{ opacity: 0, transition: "opacity 0.12s", flexShrink: 0 }}
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer links */}
              <div
                style={{
                  display: "flex",
                  gap: 4,
                  marginTop: 20,
                  paddingTop: 16,
                  borderTop: "1px solid #E8E4E0",
                }}
              >
                {secondaryLinks.map((link) => (
                  <a
                    key={link}
                    href="#"
                    onClick={onClose}
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 12,
                      fontWeight: 500,
                      color: "#484746",
                      textDecoration: "none",
                      padding: "6px 10px",
                      borderRadius: 8,
                      transition: "background 0.12s, color 0.12s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#F2EFED"; e.currentTarget.style.color = "#1C1917"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#484746"; }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Right: featured card */}
            <div
              style={{
                width: 240,
                flexShrink: 0,
                marginLeft: 24,
                borderRadius: 16,
                overflow: "hidden",
                position: "relative",
                minHeight: 280,
              }}
            >
              <img
                src={data.image}
                alt=""
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(28,25,23,0.88) 0%, rgba(28,25,23,0.45) 55%, transparent 100%)",
                }}
              />
              <div
                style={{
                  position: "relative",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: 20,
                  gap: 8,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "2px 8px",
                    borderRadius: 99,
                    background: "rgba(255,129,54,0.9)",
                    color: "#fff",
                    fontSize: 10,
                    fontWeight: 700,
                    fontFamily: "Inter, sans-serif",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    width: "fit-content",
                  }}
                >
                  {data.featured.tag}
                </span>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#fff",
                    lineHeight: 1.3,
                    margin: 0,
                  }}
                >
                  {data.featured.label}
                </p>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 12,
                    color: "rgba(255,255,255,0.8)",
                    lineHeight: 1.45,
                    margin: 0,
                  }}
                >
                  {data.featured.desc}
                </p>
                <a
                  href="#"
                  onClick={onClose}
                  style={{
                    marginTop: 4,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 14px",
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.15)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    color: "#fff",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 12,
                    fontWeight: 600,
                    textDecoration: "none",
                    backdropFilter: "blur(4px)",
                    transition: "background 0.14s",
                    width: "fit-content",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.25)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
                >
                  Conocer más <ArrowRight size={11} />
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
