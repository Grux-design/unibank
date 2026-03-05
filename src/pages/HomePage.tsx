import { Helmet } from "react-helmet-async";
import { useOutletContext } from "react-router-dom";
import { HeroCarousel } from "@/components/organisms/HeroCarousel";
import type { Lang } from "@/components/layout/SiteLayout";

export default function HomePage() {
  const { lang } = useOutletContext<{ lang: Lang }>();

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
    </>
  );
}
