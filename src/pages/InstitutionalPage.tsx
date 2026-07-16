import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { institutionalPages } from "@/data/institutionalPages";

export default function InstitutionalPage() {
  const { slug } = useParams<{ slug: string }>();
  const page = slug ? institutionalPages[slug] : undefined;

  if (!page) return <Navigate to="/" replace />;

  return (
    <>
      <Helmet>
        <title>{page.title} | UniBank</title>
        <meta name="description" content={page.metaDescription} />
      </Helmet>

      <section className="bg-muted/30 pt-20 pb-10 md:pt-28 md:pb-16 lg:pt-32">
        <div className="site-container">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            {page.title}
          </h1>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="site-container max-w-3xl space-y-8 md:space-y-10">
          {page.sections.map((s, i) => (
            <div key={i}>
              {s.heading && (
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground mb-3 md:mb-4">
                  {s.heading}
                </h2>
              )}
              <p
                className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed [&_strong]:font-semibold [&_strong]:text-foreground"
                dangerouslySetInnerHTML={{ __html: s.body }}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
