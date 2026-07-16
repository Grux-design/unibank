export interface MenuItem {
  label: string;
  slug:  string;
  href?: string;
  to?:   string;
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
  image: "/megamenu-personas-piggy.jpg",
  featured: {
    tag:          "Lo más popular",
    label:        "Cuenta de Ahorros",
    desc:         "Sin mantenimiento, sin comisiones. La cuenta que trabaja para ti.",
    slug:         "cuenta-de-ahorros",
    categorySlug: "cuentas",
    ctaLabel:     "Abrir cuenta",
  },
  categories: [
    {
      name: "Cuentas",
      categorySlug: "cuentas",
      items: [
        { label: "Cuenta de Ahorros",       slug: "cuenta-de-ahorros" },
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
      name: "Valores Agregados",
      categorySlug: "otros-servicios",
      items: [
        { label: "Invertis Global Income Fund", slug: "invertis-global-income-fund", href: "https://www.invertissecurities.com/es/invertis-global-income-fund" },
        { label: "Mastercard Black Débito",     slug: "mastercard-black-debito" },
        { label: "Cajilla de Seguridad",        slug: "cajilla-de-seguridad" },
        { label: "UniVivir Seguros",            slug: "univivir-seguros", href: "https://www.univivir.com.pa/" },
      ],
    },
  ],
};

export const empresasData: MenuSection = {
  image: "/megamenu-empresas-solar.jpg",
  featured: {
    tag:          "Nuevo",
    label:        "Leasing",
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
        { label: "Mi Negocio",         slug: "mi-negocio" },
        { label: "Cuenta de Ahorros",  slug: "cuenta-de-ahorros" },
        { label: "Cuenta Corriente",   slug: "cuenta-corriente" },
      ],
    },
    {
      name: "Financiamiento",
      categorySlug: "financiamiento",
      items: [
        { label: "Préstamo Comercial",      slug: "prestamo-comercial" },
        { label: "Leasing",                 slug: "unileasing" },
        { label: "Líneas de Crédito",       slug: "linea-de-credito" },
        { label: "Préstamo Agroindustrial", slug: "prestamo-agroindustrial" },
      ],
    },
    {
      name: "Otros Servicios",
      categorySlug: "otros-servicios",
      items: [
        { label: "Emisión de Valores",      slug: "emision-de-valores" },
        { label: "Planilla",                slug: "pago-de-planilla" },
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

export const secondaryLinks: { label: string; href: string }[] = [
  { label: "Tarifas y Tasas", href: "/tarifario" },
  { label: "Sucursales", href: "/sucursales" },
];
