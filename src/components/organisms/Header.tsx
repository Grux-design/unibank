import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { LeftHeaderPill } from "@/components/molecules/LeftHeaderPill";
import { RightHeaderPill } from "@/components/molecules/RightHeaderPill";
import { MegaMenu } from "@/components/organisms/MegaMenu";
import type { Lang } from "@/components/layout/SiteLayout";

interface HeaderProps {
  lang: Lang;
  onToggleLang: () => void;
}

const CLOSE_DELAY = 450; // ms — generous so cursor can travel to the panel

export function Header({ lang, onToggleLang }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navLinks = [
    { label: { es: "Inicio", en: "Home" }, href: "/" },
    { label: { es: "Nosotros", en: "About" }, href: "/about" },
    { label: { es: "Servicios", en: "Services" }, href: "/services" },
    { label: { es: "Blog", en: "Blog" }, href: "/blog" },
    { label: { es: "Contacto", en: "Contact" }, href: "/contact" },
  ];

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const openMenu = () => {
    cancelClose();
    if (!menuOpen) {
      setMenuOpen(true);
      requestAnimationFrame(() => setMenuVisible(true));
    }
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => {
      setMenuVisible(false);
      // wait for CSS transition to finish before unmounting
      setTimeout(() => setMenuOpen(false), 200);
    }, CLOSE_DELAY);
  };

  return (
    <header className="relative sticky top-0 z-50 bg-transparent pt-4">
      {/* Main bar */}
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 sm:px-6">

        {/* LEFT GROUP — desktop LeftHeaderPill + mobile hamburger */}
        <div className="flex items-center">
          {/* Desktop pill */}
          <div className="hidden sm:block">
            <LeftHeaderPill
              menuOpen={menuOpen}
              lang={lang}
              onToggle={() => (menuOpen ? scheduleClose() : openMenu())}
              onMouseEnter={openMenu}
              onMouseLeave={scheduleClose}
            />
          </div>

          {/* Mobile hamburger + logo group */}
          <div className="flex items-center gap-3 rounded-2xl bg-background px-3 py-2 shadow-sm sm:hidden">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7E8E0] text-[#FF8136] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <Link
              to="/"
              className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
              aria-label="UniBank – Inicio"
            >
              <img src="/favicon.svg" alt="UniBank" style={{ height: 28, width: "auto" }} />
            </Link>
          </div>
        </div>

        {/* RIGHT GROUP */}
        <RightHeaderPill
          isMenuOpen={menuOpen}
          lang={lang}
          onLangChange={(code) => { if (code !== lang) onToggleLang(); }}
        />
      </div>

      {/* Mega menu — floating card, mouse events continue the hover chain */}
      {menuOpen && (
        <div
          id="mega-menu"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <MegaMenu lang={lang} visible={menuVisible} />
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
