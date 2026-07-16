import type { ReactNode } from "react";
import {
  Home, Users, Briefcase, FileText, Phone, PiggyBank, Building2, Card, Smartphone,
} from "@/lib/icons";

export interface SearchPage {
  icon: ReactNode;
  label: string;
  desc: string;
  href: string;
}

export const searchPages: SearchPage[] = [
  { icon: <Home size={18} color="#484746" strokeWidth={1.8} />, label: "Inicio", desc: "Página principal", href: "/" },
  { icon: <Users size={18} color="#484746" strokeWidth={1.8} />, label: "Nosotros", desc: "Quiénes somos", href: "/about" },
  { icon: <Briefcase size={18} color="#484746" strokeWidth={1.8} />, label: "Servicios", desc: "Productos y soluciones", href: "/services" },
  { icon: <FileText size={18} color="#484746" strokeWidth={1.8} />, label: "Blog", desc: "Artículos y noticias", href: "/blog" },
  { icon: <Phone size={18} color="#484746" strokeWidth={1.8} />, label: "Contacto", desc: "Escríbenos o llámanos", href: "/contact" },
  { icon: <PiggyBank size={18} color="#484746" strokeWidth={1.8} />, label: "Cuenta de Ahorros", desc: "Para personas naturales", href: "/cuenta-ahorros" },
  { icon: <Building2 size={18} color="#484746" strokeWidth={1.8} />, label: "Cuenta Jurídica", desc: "Para empresas y negocios", href: "/cuenta-juridica" },
  { icon: <Card size={18} color="#484746" strokeWidth={1.8} />, label: "Tarjetas", desc: "Débito y crédito", href: "/tarjetas" },
  { icon: <Smartphone size={18} color="#484746" strokeWidth={1.8} />, label: "Banca Móvil", desc: "Tu banco en el bolsillo", href: "/banca-movil" },
];
