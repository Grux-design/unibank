import { Facebook, Instagram, Linkedin, Youtube, type LucideIcon } from "lucide-react";

export interface FooterColumn {
  title:       string;
  links:       string[];
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

export const socialIcons: SocialIconEntry[] = [
  { icon: Facebook,  label: "Facebook",  href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Linkedin,  label: "LinkedIn",  href: "#" },
  { icon: Youtube,   label: "YouTube",   href: "#" },
];

export const legalLinks: string[] = [
  "Aviso de Privacidad",
  "Términos y Condiciones",
  "Política de Cookies",
];
