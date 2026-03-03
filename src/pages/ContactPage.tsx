import { Helmet } from "react-helmet-async";
import { useOutletContext } from "react-router-dom";
import type { Lang } from "@/components/layout/SiteLayout";

export default function ContactPage() {
  const { lang } = useOutletContext<{ lang: Lang }>();
  return (
    <>
      <Helmet>
        <title>{lang === "es" ? "Contacto – Unibank" : "Contact – Unibank"}</title>
        <meta name="description" content={lang === "es" ? "Comunícate con Unibank. Estamos aquí para ayudarte." : "Get in touch with Unibank. We're here to help."} />
        <link rel="canonical" href="https://unibank.com.pa/contact" />
      </Helmet>
      <div className="stub-page">
        <h1>{lang === "es" ? "Contacto" : "Contact"}</h1>
        <p>{lang === "es" ? "Esta página está en construcción." : "This page is under construction."}</p>
      </div>
    </>
  );
}
