import { Link } from "react-router-dom";

type Lang = "es" | "en";

interface FooterProps {
  lang: Lang;
}

const footerLinks = {
  company: {
    title: { es: "Empresa", en: "Company" },
    links: [
      { label: { es: "Nosotros", en: "About Us" }, href: "/about" },
      { label: { es: "Blog", en: "Blog" }, href: "/blog" },
      { label: { es: "Contacto", en: "Contact" }, href: "/contact" },
    ],
  },
  products: {
    title: { es: "Productos", en: "Products" },
    links: [
      { label: { es: "Cuentas", en: "Accounts" }, href: "/services#accounts" },
      { label: { es: "Préstamos", en: "Loans" }, href: "/services#loans" },
      { label: { es: "Tarjetas", en: "Cards" }, href: "/services#cards" },
    ],
  },
  legal: {
    title: { es: "Legal", en: "Legal" },
    links: [
      { label: { es: "Privacidad", en: "Privacy Policy" }, href: "/privacy" },
      { label: { es: "Términos", en: "Terms of Service" }, href: "/terms" },
    ],
  },
};

export function Footer({ lang }: FooterProps) {
  return (
    <footer className="footer-root" role="contentinfo">
      <div className="footer-inner">
        {/* Brand */}
        <div className="footer-brand">
          <Link to="/" className="navbar-logo-text footer-logo">
            UNI<span className="navbar-logo-accent">BANK</span>
          </Link>
          <p className="footer-tagline">
            {lang === "es"
              ? "Tu banco de confianza en Panamá."
              : "Your trusted bank in Panama."}
          </p>
          <p className="footer-reg">
            {lang === "es"
              ? "Regulado por la Superintendencia de Bancos de Panamá."
              : "Regulated by the Superintendency of Banks of Panama."}
          </p>
        </div>

        {/* Links */}
        <div className="footer-links-grid">
          {Object.values(footerLinks).map((section) => (
            <div key={section.title.en}>
              <h3 className="footer-section-title">{section.title[lang]}</h3>
              <ul role="list" className="footer-link-list">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="footer-link">
                      {link.label[lang]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Unibank, S.A. {lang === "es" ? "Todos los derechos reservados." : "All rights reserved."}</p>
      </div>
    </footer>
  );
}
