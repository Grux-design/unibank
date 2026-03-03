import { Helmet } from "react-helmet-async";
import { useOutletContext } from "react-router-dom";
import type { Lang } from "@/components/layout/SiteLayout";

export default function AboutPage() {
  const { lang } = useOutletContext<{ lang: Lang }>();
  return (
    <>
      <Helmet>
        <title>{lang === "es" ? "Nosotros – Unibank" : "About Us – Unibank"}</title>
        <meta name="description" content={lang === "es" ? "Conoce la historia y misión de Unibank." : "Learn about Unibank's history and mission."} />
        <link rel="canonical" href="https://unibank.com.pa/about" />
      </Helmet>
      <div className="stub-page">
        <h1>{lang === "es" ? "Nosotros" : "About Us"}</h1>
        <p>{lang === "es" ? "Esta página está en construcción." : "This page is under construction."}</p>
      </div>
    </>
  );
}
