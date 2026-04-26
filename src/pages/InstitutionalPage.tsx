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

      <section className="bg-muted/30 py-20 md:py-28">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            {page.title}
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-3xl space-y-10">
          {page.sections.map((s, i) => (
            <div key={i}>
              {s.heading && (
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                  {s.heading}
                </h2>
              )}
              <p
                className="text-base md:text-lg text-muted-foreground leading-relaxed [&_strong]:font-semibold [&_strong]:text-foreground"
                dangerouslySetInnerHTML={{ __html: s.body }}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
