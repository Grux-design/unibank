import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { institutionalPages } from "@/data/institutionalPages";

export default function InstitutionalPage() {
  const { slug } = useParams<{ slug: string }>();
  const page = slug ? institutionalPages[slug] : undefined;

  if (!page) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{page.title} | UniBank</title>
        <meta name="description" content={page.metaDescription} />
      </Helmet>

      <article className="min-h-screen">
        <div className="bg-muted/30 border-b border-border">
          <div className="max-w-4xl mx-auto px-6 py-20 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              {page.title}
            </h1>
          </div>
        </div>

        <div className="bg-background">
          <div className="max-w-3xl mx-auto px-6 py-16 space-y-8">
            {page.sections.map((section, i) => (
              <div key={i}>
                {section.heading && (
                  <h2 className="text-2xl font-semibold mb-3 text-foreground">
                    {section.heading}
                  </h2>
                )}
                <p className="leading-relaxed text-muted-foreground">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
