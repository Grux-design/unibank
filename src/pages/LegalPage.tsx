import { useParams } from "react-router-dom";
import { useContentfulPage } from "@/hooks/useContentfulPage";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import type { Document } from "@contentful/rich-text-types";
import { Skeleton } from "@/components/ui/skeleton";
import { Helmet } from "react-helmet-async";

const SLUG_MAP: Record<string, string> = {
  "aviso-de-privacidad": "aviso-de-privacidad-unibank",
  "terminos-y-condiciones": "terminos-y-condiciones-unibank",
  "politica-de-cookies": "politica-de-cookies-unibank",
};

const richTextOptions = {
  renderNode: {
    [BLOCKS.HEADING_1]: (_node: unknown, children: React.ReactNode) => (
      <h1 className="text-3xl font-bold mt-10 mb-4">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (_node: unknown, children: React.ReactNode) => (
      <h2 className="text-2xl font-semibold mt-8 mb-3">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_node: unknown, children: React.ReactNode) => (
      <h3 className="text-xl font-semibold mt-6 mb-2">{children}</h3>
    ),
    [BLOCKS.PARAGRAPH]: (_node: unknown, children: React.ReactNode) => (
      <p className="mb-4 leading-relaxed text-muted-foreground">{children}</p>
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
    [INLINES.HYPERLINK]: (node: { data: { uri: string } }, children: React.ReactNode) => (
      <a
        href={node.data.uri}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline hover:text-primary/80"
      >
        {children}
      </a>
    ),
  },
};

export default function LegalPage() {
  const { slug } = useParams<{ slug: string }>();
  const contentfulSlug = slug ? SLUG_MAP[slug] : undefined;
  const { data: page, isLoading, error } = useContentfulPage(contentfulSlug);

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24">
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
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Página no encontrada</h1>
        <p className="text-muted-foreground">No pudimos cargar esta página. Intenta de nuevo más tarde.</p>
      </div>
    );
  }

  const content = page.content as Document | undefined;

  return (
    <>
      <Helmet>
        <title>{page.seoMeta?.title ?? page.title} | UniBank</title>
        {page.seoMeta?.description && (
          <meta name="description" content={page.seoMeta.description} />
        )}
      </Helmet>

      <article className="bg-background min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-24">
          <h1 className="text-4xl font-extrabold tracking-tight mb-8 text-foreground">
            {page.title}
          </h1>

          {content && (
            <div className="prose prose-neutral max-w-none">
              {documentToReactComponents(content, richTextOptions)}
            </div>
          )}
        </div>
      </article>
    </>
  );
}
