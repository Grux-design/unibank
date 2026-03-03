import { Helmet } from "react-helmet-async";
import { useOutletContext } from "react-router-dom";
import type { Lang } from "@/components/layout/SiteLayout";

export default function BlogPage() {
  const { lang } = useOutletContext<{ lang: Lang }>();
  return (
    <>
      <Helmet>
        <title>{lang === "es" ? "Blog – Unibank" : "Blog – Unibank"}</title>
        <meta name="description" content={lang === "es" ? "Noticias y artículos financieros de Unibank." : "Financial news and articles from Unibank."} />
        <link rel="canonical" href="https://unibank.com.pa/blog" />
      </Helmet>
      <div className="stub-page">
        <h1>Blog</h1>
        <p>{lang === "es" ? "Esta página está en construcción." : "This page is under construction."}</p>
      </div>
    </>
  );
}
