import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useOutletContext } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { HeroCarousel } from "@/components/organisms/HeroCarousel";
import { AudienceToggle, type Audience } from "@/components/atoms/AudienceToggle";
import { ProductsSection } from "@/components/organisms/ProductsSection";
import { BusinessSection } from "@/components/organisms/BusinessSection";
import { DigitalBanking } from "@/components/organisms/DigitalBanking";
import { AmbientBackground } from "@/components/effects/AmbientBackground";
import { Reveal } from "@/components/effects/Reveal";
import type { Lang } from "@/components/layout/SiteLayout";

export default function HomePage() {
  const { lang } = useOutletContext<{ lang: Lang }>();
  const [audience, setAudience] = useState<Audience>("personas");

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

      {/* Ambient atmospheric backdrop */}
      <AmbientBackground />

      {/* Hero with floating particles overlay */}
      <div style={{ position: "relative" }}>
        <HeroCarousel lang={lang} />
        <div className="wow-hero-particles" aria-hidden>
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>

      {/* Soft seam fade into the next section */}
      <div className="wow-hero-fade" aria-hidden />

      {/* 1. Audience toggle */}
      <Reveal y={20}>
        <div style={{ background: "transparent" }}>
          <AudienceToggle value={audience} onChange={setAudience} />
        </div>
      </Reveal>

      {/* 2. Content section — swaps based on toggle with cinematic transition */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={audience}
          initial={{ opacity: 0, y: 18, filter: "blur(6px)", scale: 0.985 }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
          exit={{ opacity: 0, y: -10, filter: "blur(6px)", scale: 0.99 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
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
