export interface MenuItem {
  label: string;
  desc:  string;
  tag:   string | null;
  slug:  string;
}

export interface MenuCategory {
  name:         string;
  categorySlug: string;
  items:        MenuItem[];
}

export interface MenuSection {
  image:      string;
  featured:   { tag: string; label: string; desc: string; slug: string; categorySlug: string };
  categories: MenuCategory[];
}

export const personasData: MenuSection = {
  image: "https://images.unsplash.com/photo-1704088030734-96769c4593a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  featured: {
    tag:          "Lo más popular",
    label:        "Cuenta Naranja+",
    desc:         "Sin mantenimiento, sin comisiones. La cuenta que trabaja para ti.",
    slug:         "cuenta-naranja-plus-digital",
    categorySlug: "cuentas",
  },
  categories: [
    {
      name: "Cuentas",
      categorySlug: "cuentas",
      items: [
        { label: "Cuenta Naranja+",   desc: "Sin mantenimiento ni límites",    tag: "Popular", slug: "cuenta-naranja-plus-digital" },
        { label: "Cuenta de Ahorro",  desc: "Gana intereses mes a mes",         tag: null,      slug: "cuenta-de-ahorro" },
        { label: "Cuenta Corriente",  desc: "Flexibilidad para tus pagos",      tag: null,      slug: "cuenta-corriente" },
        { label: "Depósito a Plazo",  desc: "Rendimientos garantizados",        tag: null,      slug: "deposito-a-plazo-fijo" },
      ],
    },
    {
      name: "Crédito",
      categorySlug: "credito",
      items: [
        { label: "Préstamo de Auto",       desc: "Financia tu próximo vehículo",    tag: "Rápido", slug: "prestamo-de-auto-digital" },
        { label: "Crédito Hipotecario",    desc: "Compra la casa de tus sueños",    tag: null,     slug: "prestamo-de-vivienda" },
        { label: "Préstamo Personal",      desc: "Dinero cuando más lo necesitas",  tag: null,     slug: "prestamo-personal" },
      ],
    },
    {
      name: "Inversiones",
      categorySlug: "inversiones",
      items: [
        { label: "Invertis Global Income Fund", desc: "Portafolio diversificado global",     tag: "Exclusivo", slug: "invertis-global-income-fund" },
        { label: "Depósito a Plazo Fijo",       desc: "Tasas preferenciales aseguradas",     tag: null,        slug: "deposito-a-plazo-fijo" },
      ],
    },
    {
      name: "Tarjetas",
      categorySlug: "tarjetas",
      items: [
        { label: "Mastercard Black Débito", desc: "Acepta en más de 200 países", tag: null, slug: "mastercard-black-debito" },
        { label: "Tarjeta de Crédito",      desc: "Cashback en cada compra",     tag: null, slug: "tarjeta-de-credito" },
      ],
    },
    {
      name: "Canales Digitales",
      categorySlug: "canales-digitales",
      items: [
        { label: "Banca Móvil UniBank", desc: "Tu banco en el bolsillo",          tag: null, slug: "banca-movil-unibank" },
        { label: "ACH Xpress",          desc: "Transferencias al instante",       tag: null, slug: "ach-xpress" },
        { label: "Xpress Pagos",        desc: "Paga facturas en segundos",        tag: null, slug: "xpress-pagos" },
      ],
    },
  ],
};

export const empresasData: MenuSection = {
  image: "https://images.unsplash.com/photo-1758518727077-ffb66ffccced?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  featured: {
    tag:          "Nuevo",
    label:        "UniLeasing",
    desc:         "Equipa tu empresa sin inmovilizar capital. Aprobación en 48h.",
    slug:         "unileasing",
    categorySlug: "financiamiento",
  },
  categories: [
    {
      name: "Cuentas",
      categorySlug: "cuentas",
      items: [
        { label: "Cuenta Corriente Jurídica",    desc: "Operaciones sin restricciones", tag: null, slug: "cuenta-juridica-digital" },
        { label: "Cuenta de Ahorro Empresarial", desc: "Rentabiliza tu liquidez",        tag: null, slug: "cuenta-de-ahorro-empresarial" },
      ],
    },
    {
      name: "Financiamiento",
      categorySlug: "financiamiento",
      items: [
        { label: "Préstamo Comercial",     desc: "Capital para crecer rápido",     tag: null,   slug: "prestamo-comercial" },
        { label: "UniLeasing",             desc: "Equipa tu empresa sin comprar",  tag: "Nuevo", slug: "unileasing" },
        { label: "Líneas de Crédito",      desc: "Liquidez disponible siempre",    tag: null,   slug: "linea-de-credito" },
        { label: "Préstamo Agroindustrial",desc: "Apoyo al sector productivo",     tag: null,   slug: "prestamo-agroindustrial" },
      ],
    },
    {
      name: "Mercado de Capitales",
      categorySlug: "mercado-de-capitales",
      items: [
        { label: "Emisión de Valores",    desc: "Accede al mercado bursátil",         tag: null, slug: "emision-de-valores" },
        { label: "Portafolio Corporativo",desc: "Gestión institucional de activos",   tag: null, slug: "portafolio-corporativo" },
      ],
    },
    {
      name: "Gestión",
      categorySlug: "gestion",
      items: [
        { label: "Pago de Planilla",    desc: "Paga a tu equipo en un clic",       tag: null, slug: "pago-de-planilla" },
        { label: "Pagos Masivos ACH",   desc: "Miles de pagos simultáneos",        tag: null, slug: "pagos-masivos-ach" },
        { label: "Reportes Financieros",desc: "Visibilidad total de tu empresa",   tag: null, slug: "reportes-financieros" },
      ],
    },
    {
      name: "Canales Digitales",
      categorySlug: "canales-digitales",
      items: [
        { label: "Banca en Línea Empresarial", desc: "Control total desde el escritorio", tag: null, slug: "banca-en-linea-empresarial" },
        { label: "ACH Xpress",                 desc: "Transferencias inmediatas",          tag: null, slug: "ach-xpress" },
        { label: "Xpress Pagos",               desc: "Pagos masivos automatizados",        tag: null, slug: "xpress-pagos" },
      ],
    },
  ],
};

export const secondaryLinks = ["Sobre UniBank", "Tarifas y Tasas", "Sucursales"];
