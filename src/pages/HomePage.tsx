import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useOutletContext } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { HeroCarousel } from "@/components/organisms/HeroCarousel";
import { AudienceToggle, type Audience } from "@/components/atoms/AudienceToggle";
import { ProductsSection } from "@/components/organisms/ProductsSection";
import { BusinessSection } from "@/components/organisms/BusinessSection";
import { DigitalBanking } from "@/components/organisms/DigitalBanking";
import { Reveal } from "@/components/effects/Reveal";
import { IntroSplash } from "@/components/effects/IntroSplash";
import { useFirstVisit, EASE } from "@/lib/motion";
import { dismissSplashBoot } from "@/lib/splashBoot";
import type { Lang } from "@/components/layout/SiteLayout";

export default function HomePage() {
  const { lang } = useOutletContext<{ lang: Lang }>();
  const [audience, setAudience] = useState<Audience>("personas");
  const prefersReduced = useReducedMotion();
  const { shouldPlay: _shouldPlay, markSeen: _markSeen } = useFirstVisit();

  // Splash plays on every refresh (skipped only when reduced motion is requested)
  const [splashOpen, setSplashOpen] = useState<boolean>(!prefersReduced);
  const playIntro = !prefersReduced;

  // Hero choreography starts as soon as the splash begins to exit
  const heroAnimate = !splashOpen;

  useEffect(() => {
    if (!playIntro) dismissSplashBoot();
  }, [playIntro]);

  // Auto-dismiss splash after 3s
  useEffect(() => {
    if (!splashOpen) return;
    const t = window.setTimeout(() => {
      setSplashOpen(false);
    }, 3000);
    return () => window.clearTimeout(t);
  }, [splashOpen]);

  useEffect(() => {
    if (!splashOpen) dismissSplashBoot();
  }, [splashOpen]);

  // Lock body scroll only while splash is visible; always restore on close/unmount
  useEffect(() => {
    if (!splashOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [splashOpen]);


  return (
    <>
      <Helmet>
        <title>Unibank – {lang === "es" ? "Tu Banco de Confianza en Panamá" : "Your Trusted Bank in Panama"}</title>
        <meta
          name="description"
          content={
            lang === "es"
              ? "Unibank ofrece soluciones bancarias personales y empresariales en Panamá. Cuentas, préstamos, tarjetas y más."
              : "Unibank offers personal and business banking solutions in Panama. Accounts, loans, cards and more."
          }
        />
        <link rel="canonical" href="https://unibank.com.pa/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://unibank.com.pa/" />
        <meta property="og:title" content="Unibank – Tu Banco de Confianza en Panamá" />
        <meta property="og:description" content="Unibank ofrece soluciones bancarias personales y empresariales en Panamá." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BankOrCreditUnion",
            name: "Unibank",
            url: "https://unibank.com.pa",
            areaServed: "PA",
            currenciesAccepted: "USD",
          })}
        </script>
      </Helmet>

      {/* First-visit cinematic splash */}
      <AnimatePresence
        onExitComplete={() => {
          document.body.style.overflow = "";
          dismissSplashBoot();
        }}
      >
        {splashOpen && <IntroSplash key="splash" />}
      </AnimatePresence>

      {/* Hero with choreographed entrance (only on first visit) */}
      <motion.div
        style={{ position: "relative", willChange: "transform, filter, opacity" }}
        initial={playIntro ? { opacity: 0, y: 28, scale: 0.97, filter: "blur(10px)" } : false}
        animate={
          heroAnimate
            ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
            : playIntro
              ? { opacity: 0, y: 28, scale: 0.97, filter: "blur(10px)" }
              : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
        }
        transition={{ duration: 1.0, ease: EASE.premium, delay: playIntro && !heroAnimate ? 0 : playIntro ? 0.15 : 0 }}
      >
        <HeroCarousel lang={lang} />
      </motion.div>

      {/* 1. Audience toggle */}
      <motion.div
        initial={playIntro ? { opacity: 0, y: 20 } : false}
        animate={heroAnimate ? { opacity: 1, y: 0 } : playIntro ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE.premium, delay: playIntro ? 0.55 : 0 }}
      >
        <Reveal y={20}>
          <div style={{ background: "transparent" }}>
            <AudienceToggle value={audience} onChange={setAudience} />
          </div>
        </Reveal>
      </motion.div>

      {/* 2. Content section — swaps based on toggle with cinematic transition */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={audience}
          initial={{ opacity: 0, y: 18, filter: "blur(6px)", scale: 0.985 }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
          exit={{ opacity: 0, y: -10, filter: "blur(6px)", scale: 0.99 }}
          transition={{ duration: 0.42, ease: EASE.cinematic }}
        >
          <Reveal y={32} amount={0.1}>
            {audience === "personas" ? <ProductsSection /> : <BusinessSection />}
          </Reveal>
        </motion.div>
      </AnimatePresence>

      {/* 3. Digital Banking — always visible */}
      <Reveal y={36} amount={0.1}>
        <DigitalBanking />
      </Reveal>
    </>
  );
}
