import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { LeftHeaderPill } from "@/components/molecules/LeftHeaderPill";
import { RightHeaderPill } from "@/components/molecules/RightHeaderPill";
import { MegaMenu } from "@/components/organisms/MegaMenu";
import type { Lang } from "@/components/layout/SiteLayout";

interface HeaderProps {
  lang: Lang;
  onToggleLang: () => void;
}

const CLOSE_DELAY = 450;

export function Header({ lang, onToggleLang }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const navLinks = [
    { label: { es: "Inicio", en: "Home" }, href: "/" },
    { label: { es: "Nosotros", en: "About" }, href: "/about" },
    { label: { es: "Servicios", en: "Services" }, href: "/services" },
    { label: { es: "Blog", en: "Blog" }, href: "/blog" },
    { label: { es: "Contacto", en: "Contact" }, href: "/contact" },
  ];

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on scroll
  useEffect(() => {
    const handler = () => setMenuOpen(false);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const openMenu = () => {
    cancelClose();
    setMenuOpen(true);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => {
      setMenuOpen(false);
    }, CLOSE_DELAY);
  };

  return (
    <>
      <header
        ref={headerRef}
        className="relative sticky top-0 z-50 pt-4"
        style={{
          background: menuOpen ? "#ffffff" : "transparent",
          borderBottom: menuOpen ? "1px solid #E0DDD9" : "1px solid transparent",
          transition: "background 0.2s ease, border-color 0.2s ease",
        }}
      >
        {/* Main bar */}
        <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 sm:px-6">

          {/* LEFT GROUP — desktop LeftHeaderPill + mobile hamburger */}
          <div className="flex items-center">
            {/* Desktop pill */}
            <div className="hidden sm:block">
              <LeftHeaderPill
                menuOpen={menuOpen}
                lang={lang}
                onToggle={() => (menuOpen ? setMenuOpen(false) : openMenu())}
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

        {/* Mega menu — full-width, anchored below the bar */}
        <div
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <AnimatePresence>
            {menuOpen && (
              <MegaMenu onClose={() => setMenuOpen(false)} />
            )}
          </AnimatePresence>
        </div>

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

      {/* Backdrop — dims page behind the mega menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMenuOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 30,
              background: "rgba(28,25,23,0.25)",
              top: 82,
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

