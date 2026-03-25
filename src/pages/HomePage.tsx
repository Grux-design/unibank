import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useOutletContext } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { HeroCarousel } from "@/components/organisms/HeroCarousel";
import { AudienceToggle, type Audience } from "@/components/atoms/AudienceToggle";
import { ProductsSection } from "@/components/organisms/ProductsSection";
import { BusinessSection } from "@/components/organisms/BusinessSection";
import { DigitalBanking } from "@/components/organisms/DigitalBanking";
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

      <HeroCarousel lang={lang} />

      {/* 1. Audience toggle */}
      <div style={{ background: "#ffffff" }}>
        <AudienceToggle value={audience} onChange={setAudience} />
      </div>

      {/* 2. Content section — swaps based on toggle */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={audience}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {audience === "personas" ? <ProductsSection /> : <BusinessSection />}
        </motion.div>
      </AnimatePresence>

      {/* 3. Digital Banking — always visible */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <DigitalBanking />
      </motion.div>
    </>
  );
}
