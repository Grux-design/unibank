export interface MenuItem {
  label: string;
  desc:  string;
  tag:   string | null;
}

export interface MenuCategory {
  name:  string;
  items: MenuItem[];
}

export interface MenuSection {
  image:      string;
  featured:   { tag: string; label: string; desc: string };
  categories: MenuCategory[];
}

export const personasData: MenuSection = {
  image: "https://images.unsplash.com/photo-1704088030734-96769c4593a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  featured: {
    tag:   "Lo más popular",
    label: "Cuenta Naranja+",
    desc:  "Sin mantenimiento, sin comisiones. La cuenta que trabaja para ti.",
  },
  categories: [
    {
      name: "Cuentas",
      items: [
        { label: "Cuenta Naranja+",   desc: "Sin mantenimiento ni límites",    tag: "Popular" },
        { label: "Cuenta de Ahorro",  desc: "Gana intereses mes a mes",         tag: null },
        { label: "Cuenta Corriente",  desc: "Flexibilidad para tus pagos",      tag: null },
        { label: "Depósito a Plazo",  desc: "Rendimientos garantizados",        tag: null },
      ],
    },
    {
      name: "Crédito",
      items: [
        { label: "Préstamo de Auto",       desc: "Financia tu próximo vehículo",    tag: "Rápido" },
        { label: "Crédito Hipotecario",    desc: "Compra la casa de tus sueños",    tag: null },
        { label: "Préstamo Personal",      desc: "Dinero cuando más lo necesitas",  tag: null },
      ],
    },
    {
      name: "Inversiones",
      items: [
        { label: "Invertis Global Income Fund", desc: "Portafolio diversificado global",     tag: "Exclusivo" },
        { label: "Depósito a Plazo Fijo",       desc: "Tasas preferenciales aseguradas",     tag: null },
      ],
    },
    {
      name: "Tarjetas",
      items: [
        { label: "Mastercard Black Débito", desc: "Acepta en más de 200 países", tag: null },
        { label: "Tarjeta de Crédito",      desc: "Cashback en cada compra",     tag: null },
      ],
    },
    {
      name: "Canales Digitales",
      items: [
        { label: "Banca Móvil UniBank", desc: "Tu banco en el bolsillo",          tag: null },
        { label: "ACH Xpress",          desc: "Transferencias al instante",       tag: null },
        { label: "Xpress Pagos",        desc: "Paga facturas en segundos",        tag: null },
      ],
    },
  ],
};

export const empresasData: MenuSection = {
  image: "https://images.unsplash.com/photo-1758518727077-ffb66ffccced?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  featured: {
    tag:   "Nuevo",
    label: "UniLeasing",
    desc:  "Equipa tu empresa sin inmovilizar capital. Aprobación en 48h.",
  },
  categories: [
    {
      name: "Cuentas",
      items: [
        { label: "Cuenta Corriente Jurídica",    desc: "Operaciones sin restricciones", tag: null },
        { label: "Cuenta de Ahorro Empresarial", desc: "Rentabiliza tu liquidez",        tag: null },
      ],
    },
    {
      name: "Financiamiento",
      items: [
        { label: "Préstamo Comercial",     desc: "Capital para crecer rápido",     tag: null },
        { label: "UniLeasing",             desc: "Equipa tu empresa sin comprar",  tag: "Nuevo" },
        { label: "Líneas de Crédito",      desc: "Liquidez disponible siempre",    tag: null },
        { label: "Préstamo Agroindustrial",desc: "Apoyo al sector productivo",     tag: null },
      ],
    },
    {
      name: "Mercado de Capitales",
      items: [
        { label: "Emisión de Valores",    desc: "Accede al mercado bursátil",         tag: null },
        { label: "Portafolio Corporativo",desc: "Gestión institucional de activos",   tag: null },
      ],
    },
    {
      name: "Gestión",
      items: [
        { label: "Pago de Planilla",    desc: "Paga a tu equipo en un clic",       tag: null },
        { label: "Pagos Masivos ACH",   desc: "Miles de pagos simultáneos",        tag: null },
        { label: "Reportes Financieros",desc: "Visibilidad total de tu empresa",   tag: null },
      ],
    },
    {
      name: "Canales Digitales",
      items: [
        { label: "Banca en Línea Empresarial", desc: "Control total desde el escritorio", tag: null },
        { label: "ACH Xpress",                 desc: "Transferencias inmediatas",          tag: null },
        { label: "Xpress Pagos",               desc: "Pagos masivos automatizados",        tag: null },
      ],
    },
  ],
};

export const secondaryLinks = ["Sobre UniBank", "Tarifas y Tasas", "Sucursales"];
