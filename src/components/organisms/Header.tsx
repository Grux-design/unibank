import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/atoms/Logo";
import { NavPill } from "@/components/atoms/NavPill";
import { NavActions } from "@/components/molecules/NavActions";
import { MegaMenu } from "@/components/organisms/MegaMenu";
import type { Lang } from "@/components/layout/SiteLayout";

interface HeaderProps {
  lang: Lang;
  onToggleLang: () => void;
}

export function Header({ lang, onToggleLang }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: { es: "Inicio", en: "Home" }, href: "/" },
    { label: { es: "Nosotros", en: "About" }, href: "/about" },
    { label: { es: "Servicios", en: "Services" }, href: "/services" },
    { label: { es: "Blog", en: "Blog" }, href: "/blog" },
    { label: { es: "Contacto", en: "Contact" }, href: "/contact" },
  ];

  return (
    <header className="relative sticky top-0 z-50 bg-transparent">
      {/* Main bar */}
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6">

        {/* LEFT GROUP: white container */}
        <div className="flex items-center gap-3 rounded-2xl bg-background px-3 py-2 shadow-sm">
          {/* Desktop menu pill */}
          <NavPill
            variant="menu"
            onClick={() => { setMenuOpen((o) => !o); setMobileOpen(false); }}
            aria-expanded={menuOpen}
            aria-controls="mega-menu"
            className="hidden sm:inline-flex"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
            {lang === "es" ? "Menú" : "Menu"}
          </NavPill>

          {/* Mobile hamburger */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(30_60%_95%)] text-[hsl(20_5%_44%)] sm:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={() => { setMobileOpen((o) => !o); setMenuOpen(false); }}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
            aria-label="UniBank – Inicio"
          >
            <Logo variant="full-color" height={36} />
          </Link>
        </div>

        {/* RIGHT GROUP: search + CTAs */}
        <NavActions lang={lang} />
      </div>

      {/* Mega menu overlay (desktop) */}
      {menuOpen && (
        <div id="mega-menu">
          <MegaMenu lang={lang} onClose={() => setMenuOpen(false)} />
        </div>
      )}

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 pb-6 pt-4 sm:hidden">
          <nav aria-label="Mobile navigation">
            <ul className="flex flex-col gap-1" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl px-4 py-3 text-sm font-semibold text-foreground hover:bg-primary/5 hover:text-primary transition-colors"
                  >
                    {link.label[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
