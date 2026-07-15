import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe } from "@/lib/icons";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: { es: "Inicio", en: "Home" }, href: "/" },
  { label: { es: "Nosotros", en: "About" }, href: "/about" },
  { label: { es: "Servicios", en: "Services" }, href: "/services" },
  { label: { es: "Blog", en: "Blog" }, href: "/blog" },
  { label: { es: "Contacto", en: "Contact" }, href: "/contact" },
];

type Lang = "es" | "en";

interface NavbarProps {
  lang: Lang;
  onToggleLang: () => void;
}

export function Navbar({ lang, onToggleLang }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="navbar-root">
      <nav className="navbar-inner" aria-label="Primary navigation">
        {/* Logo */}
        <Link to="/" className="navbar-logo" aria-label="Unibank – Inicio">
          <span className="navbar-logo-text">UNI<span className="navbar-logo-accent">BANK</span></span>
        </Link>

        {/* Desktop links */}
        <ul className="navbar-links" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className={`navbar-link ${location.pathname === link.href ? "navbar-link--active" : ""}`}
              >
                {link.label[lang]}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="navbar-actions">
          <button
            onClick={onToggleLang}
            className="navbar-lang"
            aria-label="Toggle language"
          >
            <Globe size={15} />
            <span>{lang === "es" ? "EN" : "ES"}</span>
          </button>
          <Button variant="outline" size="sm" className="navbar-btn-outline" asChild>
            <Link to="/login">{lang === "es" ? "Banca en Línea" : "Online Banking"}</Link>
          </Button>
          <Button size="sm" className="navbar-btn-primary" asChild>
            <Link to="/contact">{lang === "es" ? "Contáctanos" : "Contact Us"}</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="navbar-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="navbar-mobile">
          <ul role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={`navbar-mobile-link ${location.pathname === link.href ? "navbar-link--active" : ""}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label[lang]}
                </Link>
              </li>
            ))}
          </ul>
          <div className="navbar-mobile-actions">
            <button onClick={onToggleLang} className="navbar-lang">
              <Globe size={15} />
              <span>{lang === "es" ? "EN" : "ES"}</span>
            </button>
            <Button variant="outline" size="sm" className="navbar-btn-outline w-full" asChild>
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                {lang === "es" ? "Banca en Línea" : "Online Banking"}
              </Link>
            </Button>
            <Button size="sm" className="navbar-btn-primary w-full" asChild>
              <Link to="/contact" onClick={() => setMobileOpen(false)}>
                {lang === "es" ? "Contáctanos" : "Contact Us"}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
