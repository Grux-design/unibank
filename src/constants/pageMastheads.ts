import type { PageMastheadContent, PageMastheadKey } from "@/types/pageMasthead";

const HERO_CAJILLA =
  "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400";

/**
 * Central registry for static page mastheads.
 * To restyle all text-only pages: edit preset in pageMastheadPresets.ts + PageMastheadEditorial.
 * To change copy for one page: edit the entry here only.
 */
export const PAGE_MASTHEADS: Record<PageMastheadKey, PageMastheadContent> = {
  "junta-directiva": {
    preset: "text",
    eyebrow: "Gobierno Corporativo",
    title: "Junta Directiva",
    subtitle:
      "Liderazgo comprometido con la excelencia, la transparencia y la cercanía al cliente. Conoce a las personas que guían el rumbo de UniBank.",
  },
  sostenibilidad: {
    preset: "text",
    eyebrow: { icon: "leaf", label: "ESG" },
    title: "Sostenibilidad",
    subtitle:
      "Nuestro compromiso con el medio ambiente y la sociedad guía cada decisión que tomamos como grupo financiero.",
  },
  "estados-financieros": {
    preset: "text",
    eyebrow: { icon: "bar-chart", label: "Información financiera" },
    title: "Estados Financieros",
    subtitle:
      "Consulta y descarga nuestros informes financieros auditados, formularios regulatorios y reportes internos.",
  },
  "calificacion-riesgo": {
    preset: "text",
    eyebrow: { icon: "shield", label: "Pacific Credit Rating" },
    title: "Calificación de Riesgo",
    subtitle:
      "Una banca ágil, sólida y digital. Nuestra calificación refleja un perfil de negocio bueno para crecer, calidad de cartera saludable, alta liquidez respaldada por depósitos y capitalización adecuada y estable.",
  },
  "canal-denuncias": {
    preset: "text",
    eyebrow: { icon: "shield", label: "Ética y cumplimiento" },
    title: "Canal de Denuncias",
    subtitle:
      "Reporte situaciones que contravengan la ética, la legalidad o nuestras políticas internas. Su información será tratada de manera confidencial, objetiva e imparcial.",
  },
  tarifario: {
    preset: "text",
    eyebrow: "Transparencia",
    title: "Tarifario",
    subtitle: "Consulta nuestras tasas, comisiones y tarifas vigentes.",
  },
  "trabaja-con-nosotros": {
    preset: "text",
    eyebrow: { icon: "sparkles", label: "Carreras en UniBank" },
    title: "Construye el futuro de la banca con nosotros.",
    titleHtml: "Construye el futuro de la banca *con nosotros*.",
    subtitle:
      "¿Deseas formar parte del equipo UniBank? Llena los datos del formulario y serás añadido a nuestra base de datos de Recursos Humanos.",
  },
  blog: {
    preset: "text",
    eyebrow: { icon: "newspaper", label: "Sala de Prensa · Blog Unibank" },
    title: "Noticias y Blog",
    subtitle:
      "Mantente informado con las últimas noticias, consejos financieros y novedades de UniBank.",
  },
  sucursales: {
    preset: "text",
    eyebrow: { icon: "map-pin", label: "Canales de atención" },
    title: "Nuestras Sucursales",
    subtitle: "Visítanos en cualquiera de nuestras oficinas. Estamos aquí para atenderte.",
  },
  contact: {
    preset: "text",
    eyebrow: { icon: "mail", label: "Canales de atención" },
    title: "Contáctanos",
    subtitle:
      "¿Tienes alguna pregunta? Estamos aquí para ayudarte. Completa el formulario y te responderemos a la brevedad.",
  },
  legal: {
    preset: "text",
    eyebrow: "Legal",
    title: "",
  },
  "cumplimiento-normativo": {
    preset: "text",
    eyebrow: { icon: "shield", label: "Cumplimiento" },
    title: "Cumplimiento Normativo",
    subtitle:
      "Conoce el compromiso de UniBank con el cumplimiento normativo y la prevención del blanqueo de capitales y financiamiento del terrorismo.",
  },
  unilideres: {
    preset: "text",
    eyebrow: { icon: "sparkles", label: "Talento UniBank" },
    title: "UniLíderes",
    subtitle:
      "UniLíderes: el programa de liderazgo de UniBank que impulsa el desarrollo profesional y personal de nuestros colaboradores.",
  },
  "cajilla-seguridad": {
    preset: "product",
    eyebrow: { icon: "shield", label: "Servicio exclusivo" },
    title: "Cajillas de Seguridad",
    highlight: "Protege lo que más valoras",
    subtitle:
      "En UniBank entendemos que tus pertenencias más valiosas merecen el más alto nivel de protección. Por eso, ponemos a tu disposición nuestro servicio de Cajillas de Seguridad, diseñado para resguardar documentos importantes, joyas y objetos de valor con total confidencialidad y seguridad.",
    imageSrc: HERO_CAJILLA,
    imageAlt: "Bóveda de seguridad bancaria UniBank",
  },
  unitrust: {
    preset: "product",
    eyebrow: { icon: "sparkles", label: "Grupo UniBank · Fiduciaria" },
    title: "UniTrust",
    subtitle:
      "Socio estratégico para la gestión y planificación de su patrimonio personal y empresarial.",
  },
  unileasing: {
    preset: "product",
    eyebrow: { icon: "sparkles", label: "Grupo UniBank · Leasing" },
    title: "Uni Leasing",
    subtitle:
      "Adquiera los activos que su empresa necesita, con financiamiento flexible y atención personalizada.",
  },
};

/** Resolve registry entry by route slug segment when it matches a key */
export function getPageMastheadConfig(page: PageMastheadKey): PageMastheadContent {
  return PAGE_MASTHEADS[page];
}
