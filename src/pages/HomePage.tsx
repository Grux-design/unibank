import { Helmet } from "react-helmet-async";
import { useOutletContext } from "react-router-dom";
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
        <meta
          property="og:description"
          content="Unibank ofrece soluciones bancarias personales y empresariales en Panamá."
        />
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

      {/* ─── HERO WIREFRAME ─────────────────────────── */}
      <section className="hero-wf" aria-label="Hero section placeholder">
        <span className="hero-wf-label">
          {lang === "es" ? "Sección Hero" : "Hero Section"}
        </span>
        <div className="wf-block hero-wf-headline">
          {lang === "es" ? "Titular Principal" : "Main Headline"}
        </div>
        <div className="wf-block hero-wf-sub">
          {lang === "es" ? "Subtítulo / descripción" : "Subtitle / description"}
        </div>
        <div className="hero-wf-btns">
          <div className="wf-block hero-wf-btn">CTA Primary</div>
          <div className="wf-block hero-wf-btn">CTA Secondary</div>
        </div>
        <div className="wf-block hero-wf-img">
          {lang === "es" ? "Imagen / Visual Hero" : "Hero Image / Visual"}
        </div>
      </section>
    </>
  );
}
