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
      { label: "Nuestro Equipo", href: "/institucional/junta-directiva" },
      { label: "Sostenibilidad", href: "/institucional/sostenibilidad" },
      
      { label: "Gestión de Riesgo Operativo", href: "/documents/gestion-de-riesgo-operativo.pdf" },
      { label: "Cumplimiento Normativo", href: "/institucional/cumplimiento-normativo" },
      { label: "Manual de Gobierno Corporativo", href: "/documents/manual-de-gobierno-corporativo.pdf" },
      { label: "RSE – Responsabilidad Social", href: "/institucional/sostenibilidad" },
    ],
  },
  {
    title: "Grupo UniBank",
    links: [
      { label: "UniTrust", href: "/grupo/unitrust" }, { label: "Univivir", href: "https://www.univivir.com.pa/" },
      { label: "Uni Leasing", href: "/grupo/unileasing" },
    ],
  },
  {
    title: "Enlaces de Interés",
    links: [
      
      { label: "Tarifario", href: "/tarifario" },
      { label: "Trabaja con nosotros", href: "/trabaja-con-nosotros" },
      { label: "Portal Inmobiliario", href: "https://bienesenventa.unibank.com.pa/" },
      { label: "Noticias", href: "/blog" },
      { label: "Canal de denuncias", href: "/canal-de-denuncias" },
    ],
  },
  {
    title: "Canales de Atención",
    links: [
      { label: "whatsapp", href: "https://api.whatsapp.com/send?phone=50763280229&text=%C2%A1Hola!,%20Tengo%20una%20Consulta" },
      { label: "sucursales", href: "/sucursales" },
      { label: "contacto", href: "/contact" },
    ],
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
  { label: "Políticas de Privacidad y Seguridad", path: "/terminos-y-condiciones" },
  { label: "Política de Cookies",    path: "/politica-de-cookies" },
];
