import { Helmet } from "react-helmet-async";
import { useOutletContext } from "react-router-dom";
import type { Lang } from "@/components/layout/SiteLayout";

export default function ServicesPage() {
  const { lang } = useOutletContext<{ lang: Lang }>();
  return (
    <>
      <Helmet>
        <title>{lang === "es" ? "Servicios – Unibank" : "Services – Unibank"}</title>
        <meta name="description" content={lang === "es" ? "Descubre los productos y servicios financieros de Unibank." : "Discover Unibank's financial products and services."} />
        <link rel="canonical" href="https://unibank.com.pa/services" />
      </Helmet>
      <div className="stub-page">
        <h1>{lang === "es" ? "Servicios" : "Services"}</h1>
        <p>{lang === "es" ? "Esta página está en construcción." : "This page is under construction."}</p>
      </div>
    </>
  );
}
