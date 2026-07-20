import type { ReactNode } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { institutionalPages } from "@/data/institutionalPages";
import { StaticPageFrame, StaticPageSection } from "@/components/organisms/StaticPageLayout";
import type { PageMastheadKey } from "@/types/pageMasthead";

const INSTITUTIONAL_MASTHEAD_PAGES = new Set<PageMastheadKey>([
  "cumplimiento-normativo",
  "unilideres",
]);

export default function InstitutionalPage() {
  const { slug } = useParams<{ slug: string }>();
  const page = slug ? institutionalPages[slug] : undefined;

  if (!page) return <Navigate to="/" replace />;

  const mastheadPage =
    slug && INSTITUTIONAL_MASTHEAD_PAGES.has(slug as PageMastheadKey)
      ? (slug as PageMastheadKey)
      : undefined;

  return (
    <>
      <Helmet>
        <title>{page.title} | UniBank</title>
        <meta name="description" content={page.metaDescription} />
      </Helmet>

      <StaticPageFrame
        page={mastheadPage}
        title={page.title}
        subtitle={page.metaDescription}
      >
        <StaticPageSection bandIndex={0}>
          <div className="site-container max-w-3xl space-y-8 md:space-y-10">
            {page.sections.map((s, i) => (
              <div key={i}>
                {s.heading && (
                  <h2 className="type-content-section-headline text-foreground mb-3 md:mb-4">
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
        </StaticPageSection>
      </StaticPageFrame>
    </>
  );
}
