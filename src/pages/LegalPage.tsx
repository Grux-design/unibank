import { useParams } from "react-router-dom";
import { useContentfulPage } from "@/hooks/useContentfulPage";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import type { Document } from "@contentful/rich-text-types";
import { Skeleton } from "@/components/ui/skeleton";
import { Helmet } from "react-helmet-async";
import { TerminosContent } from "@/components/legal/TerminosContent";

const SLUG_MAP: Record<string, string> = {
  "aviso-de-privacidad": "aviso-de-privacidad-unibank",
  "terminos-y-condiciones": "terminos-y-condiciones-unibank",
  "politica-de-cookies": "politica-de-cookies-unibank",
};

const richTextOptions = {
  renderNode: {
    [BLOCKS.HEADING_1]: (_node: unknown, children: React.ReactNode) => (
      <h1 className="type-prose-h1 mt-10 mb-4">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (_node: unknown, children: React.ReactNode) => (
      <h2 className="type-prose-h2">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_node: unknown, children: React.ReactNode) => (
      <h3 className="type-prose-h3">{children}</h3>
    ),
    [BLOCKS.PARAGRAPH]: (_node: unknown, children: React.ReactNode) => (
      <p className="mb-4 text-sm md:text-base leading-relaxed text-muted-foreground">{children}</p>
    ),
    [BLOCKS.UL_LIST]: (_node: unknown, children: React.ReactNode) => (
      <ul className="list-disc pl-6 mb-4 space-y-1 text-muted-foreground">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_node: unknown, children: React.ReactNode) => (
      <ol className="list-decimal pl-6 mb-4 space-y-1 text-muted-foreground">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_node: unknown, children: React.ReactNode) => (
      <li>{children}</li>
    ),
    [INLINES.HYPERLINK]: (node: unknown, children: React.ReactNode) => {
      const uri = (node as { data: { uri: string } }).data.uri;
      return (
        <a
          href={uri}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline hover:text-primary/80"
        >
          {children}
        </a>
      );
    },
  },
};

export default function LegalPage() {
  const { slug } = useParams<{ slug: string }>();
  const contentfulSlug = slug ? SLUG_MAP[slug] : undefined;
  const { data: page, isLoading, error } = useContentfulPage(contentfulSlug);

  if (isLoading) {
    return (
      <div className="site-container max-w-3xl py-12 md:py-20">
        <Skeleton className="h-10 w-2/3 mb-8" />
        <Skeleton className="h-4 w-full mb-3" />
        <Skeleton className="h-4 w-full mb-3" />
        <Skeleton className="h-4 w-5/6 mb-3" />
        <Skeleton className="h-4 w-full mb-3" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="site-container max-w-3xl py-12 md:py-20 text-center">
        <h1 className="type-page-title mb-4">Página no encontrada</h1>
        <p className="text-muted-foreground">No pudimos cargar esta página. Intenta de nuevo más tarde.</p>
      </div>
    );
  }

  const content = page.content as Document | undefined;
  const isTerminos = slug === "terminos-y-condiciones";
  const displayTitle = isTerminos ? "Políticas de Privacidad y Seguridad" : page.title;

  return (
    <>
      <Helmet>
        <title>{isTerminos ? displayTitle : (page.seoMeta?.title ?? page.title)} | UniBank</title>
        {page.seoMeta?.description && (
          <meta name="description" content={page.seoMeta.description} />
        )}
      </Helmet>

      <article className="min-h-screen">
        {/* Title hero section */}
        <div className="bg-muted/30 border-b border-border pt-20 pb-10 md:pt-28 md:pb-16 lg:pt-32">
          <div className="site-container text-center">
            <h1 className="type-page-title text-foreground">
              {displayTitle}
            </h1>
          </div>
        </div>

        {/* Content section */}
        {content && !isTerminos && (
          <div className="bg-background py-12 md:py-20">
            <div className="site-container max-w-3xl">
              <div className="prose prose-neutral max-w-none">
                {documentToReactComponents(content, richTextOptions)}
              </div>
            </div>
          </div>
        )}

        {isTerminos && (
          <div className="bg-background">
            <TerminosContent />
          </div>
        )}
      </article>
    </>
  );
}
