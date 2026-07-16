import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { LeftHeaderPill } from "@/components/molecules/LeftHeaderPill";
import { RightHeaderPill } from "@/components/molecules/RightHeaderPill";
import { MegaMenu } from "@/components/organisms/MegaMenu";
import { MobileMenuOverlay } from "@/components/organisms/MobileMenuOverlay";
import { MobileSearchOverlay } from "@/components/organisms/MobileSearchOverlay";
import { MobileHeaderBar } from "@/components/molecules/MobileHeaderBar";
import type { Lang } from "@/components/layout/SiteLayout";
import { useHeaderLayout } from "@/hooks/useHeaderLayout";

type MobilePanel = "menu" | "search" | null;

interface HeaderProps {
  lang: Lang;
  onToggleLang: () => void;
}

export function Header({ lang, onToggleLang }: HeaderProps) {
  const layout = useHeaderLayout();
  const isMobile = layout === "mobile";
  const prefersReduced = useReducedMotion();

  const [menuOpen, setMenuOpen] = useState(false);
  const [menuChromeOpen, setMenuChromeOpen] = useState(false);
  const [mobilePanel, setMobilePanel] = useState<MobilePanel>(null);
  const headerRef = useRef<HTMLElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const openMenu = useCallback(() => {
    setMenuOpen(true);
    setMenuChromeOpen(true);
  }, []);
  const toggleMenu = useCallback(() => {
    if (menuOpen) closeMenu();
    else openMenu();
  }, [menuOpen, closeMenu, openMenu]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [closeMenu]);

  useEffect(() => {
    const handler = () => closeMenu();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [closeMenu]);

  useEffect(() => {
    document.body.style.overflow = mobilePanel ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobilePanel]);

  useEffect(() => {
    if (!isMobile) setMobilePanel(null);
  }, [isMobile]);

  const openMobilePanel = (panel: MobilePanel) => setMobilePanel(panel);
  const closeMobilePanel = () => setMobilePanel(null);

  const handleLangChange = (code: Lang) => {
    if (code !== lang) onToggleLang();
  };

  return (
    <>
      <header
        ref={headerRef}
        className="relative sticky top-0 z-50"
        style={{
          paddingTop: isMobile ? "max(10px, env(safe-area-inset-top, 0px))" : 10,
          background: menuChromeOpen && !isMobile ? "#ffffff" : "transparent",
          borderBottom: "1px solid transparent",
          boxShadow: menuChromeOpen && !isMobile ? "none" : undefined,
          transition: "background 0.2s ease, border-color 0.2s ease",
        }}
      >
        <div className="site-container-nav flex items-center justify-between gap-3">
          {isMobile ? (
            <MobileHeaderBar
              lang={lang}
              menuOpen={mobilePanel === "menu"}
              onOpenSearch={() => openMobilePanel(mobilePanel === "search" ? null : "search")}
              onOpenMenu={() => openMobilePanel(mobilePanel === "menu" ? null : "menu")}
            />
          ) : (
            <>
              <div className="flex min-w-0 flex-shrink items-center">
                <LeftHeaderPill
                  menuOpen={menuOpen}
                  lang={lang}
                  layout={layout}
                  onToggle={toggleMenu}
                />
              </div>
              <RightHeaderPill
                isMenuOpen={menuOpen}
                lang={lang}
                layout={layout}
                onLangChange={handleLangChange}
              />
            </>
          )}
        </div>

        {!isMobile && (
          <AnimatePresence onExitComplete={() => setMenuChromeOpen(false)}>
            {menuOpen && <MegaMenu onClose={closeMenu} />}
          </AnimatePresence>
        )}
      </header>

      <AnimatePresence>
        {menuOpen && !isMobile && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: prefersReduced
                ? { duration: 0.15 }
                : { duration: 0.2, ease: [0.32, 0.72, 0, 1] },
            }}
            exit={{
              opacity: 0,
              transition: prefersReduced
                ? { duration: 0.12 }
                : { duration: 0.14, ease: [0.4, 0, 1, 1] },
            }}
            onClick={closeMenu}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 30,
              background: "rgba(28,25,23,0.25)",
              top: 76,
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobile && mobilePanel === "menu" && (
          <MobileMenuOverlay
            key="mobile-menu"
            lang={lang}
            onClose={closeMobilePanel}
            onLangChange={handleLangChange}
          />
        )}
        {isMobile && mobilePanel === "search" && (
          <MobileSearchOverlay
            key="mobile-search"
            lang={lang}
            onClose={closeMobilePanel}
          />
        )}
      </AnimatePresence>
    </>
  );
}
