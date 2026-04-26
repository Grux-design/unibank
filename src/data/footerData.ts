import { Facebook, Instagram, Linkedin, Youtube, type LucideIcon } from "lucide-react";

export interface FooterLink {
  label: string;
  href?: string;
}

export interface FooterColumn {
  title:       string;
  links:       FooterLink[];
  isAttention?: boolean;
}

export interface SocialIconEntry {
  icon:  LucideIcon;
  label: string;
  href:  string;
}

export const footerColumns: FooterColumn[] = [
  {
    title: "Conócenos",
    links: [
      { label: "Junta Directiva", href: "/institucional/junta-directiva" },
      { label: "UniLíderes", href: "/institucional/unilideres" },
      { label: "Sostenibilidad", href: "/institucional/sostenibilidad" },
      { label: "Estados Financieros" },
      { label: "Gestión de Riesgo Operativo", href: "/documents/gestion-de-riesgo-operativo.pdf" },
      { label: "Cumplimiento Normativo", href: "/institucional/cumplimiento-normativo" },
      { label: "Manual de Gobierno Corporativo", href: "/documents/manual-de-gobierno-corporativo.pdf" },
      { label: "RSE – Responsabilidad Social" },
    ],
  },
  {
    title: "Grupo UniBank",
    links: [
      { label: "UniConnect" }, { label: "UniTrust", href: "/grupo/unitrust" }, { label: "Univivir", href: "https://www.univivir.com.pa/" },
      { label: "UniLeasing", href: "/grupo/unileasing" }, { label: "Grupo Invertis", href: "https://www.invertissecurities.com/" },
    ],
  },
  {
    title: "Enlaces de Interés",
    links: [
      { label: "Cajilla de Seguridad" },
      { label: "Tarifario", href: "/tarifario" },
      { label: "Trabaja con nosotros", href: "/trabaja-con-nosotros" },
      { label: "Portal Inmobiliario", href: "https://bienesenventa.unibank.com.pa/" },
      { label: "Noticias", href: "/blog" },
      { label: "Blog", href: "/blog" },
      { label: "Canal de denuncias", href: "/canal-de-denuncias" },
    ],
  },
  {
    title: "Canales de Atención",
    links: [{ label: "whatsapp", href: "https://api.whatsapp.com/send?phone=50763280229&text=%C2%A1Hola!,%20Tengo%20una%20Consulta" }, { label: "sucursales", href: "/sucursales" }],
    isAttention: true,
  },
];

export const socialIcons: SocialIconEntry[] = [
  { icon: Facebook,  label: "Facebook",  href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Linkedin,  label: "LinkedIn",  href: "#" },
  { icon: Youtube,   label: "YouTube",   href: "#" },
];

export const legalLinks = [
  { label: "Aviso de Privacidad",    path: "/aviso-de-privacidad" },
  { label: "Términos y Condiciones", path: "/terminos-y-condiciones" },
  { label: "Política de Cookies",    path: "/politica-de-cookies" },
];
