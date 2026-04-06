export interface MenuItem {
  label: string;
  slug:  string;
}

export interface MenuCategory {
  name:         string;
  categorySlug: string;
  items:        MenuItem[];
}

export interface MenuSection {
  image:      string;
  featured:   { tag: string; label: string; desc: string; slug: string; categorySlug: string; ctaLabel: string };
  categories: MenuCategory[];
}

export const personasData: MenuSection = {
  image: "https://images.unsplash.com/photo-1704088030734-96769c4593a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  featured: {
    tag:          "Lo más popular",
    label:        "Cuenta Naranja+ Digital",
    desc:         "Sin mantenimiento, sin comisiones. La cuenta que trabaja para ti.",
    slug:         "cuenta-naranja-plus-digital",
    categorySlug: "cuentas",
    ctaLabel:     "Abrir cuenta",
  },
  categories: [
    {
      name: "Cuentas",
      categorySlug: "cuentas",
      items: [
        { label: "Cuenta Naranja+ Digital", slug: "cuenta-naranja-plus-digital" },
        { label: "Cuenta de Ahorro",        slug: "cuenta-de-ahorro" },
        { label: "Cuenta Corriente",        slug: "cuenta-corriente" },
        { label: "Depósito a Plazo Fijo",   slug: "deposito-a-plazo-fijo" },
      ],
    },
    {
      name: "Crédito",
      categorySlug: "credito",
      items: [
        { label: "Préstamo de Auto Digital", slug: "prestamo-de-auto-digital" },
        { label: "Préstamo de Vivienda",     slug: "prestamo-de-vivienda" },
      ],
    },
    {
      name: "Canales Digitales",
      categorySlug: "canales-digitales",
      items: [
        { label: "Banca Móvil",    slug: "banca-movil-unibank" },
        { label: "Banca en Línea", slug: "banca-en-linea" },
      ],
    },
    {
      name: "Inversiones y Tarjetas",
      categorySlug: "inversiones",
      items: [
        { label: "Invertis Global Income Fund", slug: "invertis-global-income-fund" },
        { label: "Mastercard Black Débito",     slug: "mastercard-black-debito" },
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
    ctaLabel:     "Conocer más",
  },
  categories: [
    {
      name: "Cuentas",
      categorySlug: "cuentas",
      items: [
        { label: "Cuenta Jurídica Digital", slug: "cuenta-juridica-digital" },
      ],
    },
    {
      name: "Financiamiento",
      categorySlug: "financiamiento",
      items: [
        { label: "Préstamo Comercial",      slug: "prestamo-comercial" },
        { label: "UniLeasing",              slug: "unileasing" },
        { label: "Líneas de Crédito",       slug: "linea-de-credito" },
        { label: "Préstamo Agroindustrial", slug: "prestamo-agroindustrial" },
      ],
    },
    {
      name: "Otros Servicios",
      categorySlug: "otros-servicios",
      items: [
        { label: "Emisión de Valores",      slug: "emision-de-valores" },
        { label: "Pago de Planilla",        slug: "pago-de-planilla" },
        { label: "Mastercard Black Débito", slug: "mastercard-black-debito" },
      ],
    },
    {
      name: "Canales Digitales",
      categorySlug: "canales-digitales",
      items: [
        { label: "Banca en Línea Empresarial", slug: "banca-en-linea-empresarial" },
        { label: "Banca Móvil",                slug: "banca-movil" },
      ],
    },
  ],
};

export const secondaryLinks = ["Sobre UniBank", "Tarifas y Tasas", "Sucursales"];
