import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronLeft } from "@/lib/icons";
import { useContentfulPage } from "@/hooks/useContentfulPage";
import { PageBuilder } from "@/components/organisms/PageBuilder";
import { ProductTutorialBanner } from "@/components/sections/ProductTutorialBanner";

/* ── Loading Skeleton ──────────────────────────────────────── */
function PageSkeleton() {
  return (
    <div
      style={{
        padding: "clamp(48px, 8vw, 96px) 16px",
        width: "100%",
      }}
    >
      {/* Hero skeleton */}
      <div
        className="grid gap-10 md:grid-cols-2"
        style={{ marginBottom: 64 }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            className="animate-pulse"
            style={{
              height: 28,
              width: 120,
              borderRadius: 99,
              background: "hsl(var(--muted))",
            }}
          />
          <div
            className="animate-pulse"
            style={{
              height: 56,
              width: "80%",
              borderRadius: 12,
              background: "hsl(var(--muted))",
            }}
          />
          <div
            className="animate-pulse"
            style={{
              height: 56,
              width: "60%",
              borderRadius: 12,
              background: "hsl(var(--muted))",
            }}
          />
          <div
            className="animate-pulse"
            style={{
              height: 180,
              borderRadius: 20,
              background: "hsl(var(--muted))",
              marginTop: 8,
            }}
          />
        </div>
        <div
          className="animate-pulse"
          style={{
            borderRadius: 28,
            background: "hsl(var(--muted))",
            aspectRatio: "4/3",
          }}
        />
      </div>

      {/* Feature strip skeleton */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="animate-pulse"
            style={{
              height: 160,
              borderRadius: 20,
              background: "hsl(var(--muted))",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Error State ───────────────────────────────────────────── */
function PageError({ message }: { message: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        padding: "clamp(64px, 10vw, 120px) 24px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "hsl(var(--muted))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
        }}
      >
        😕
      </div>
      <p
        style={{
          margin: 0,
          fontSize: "clamp(20px, 2.5vw, 28px)",
          fontWeight: 700,
          color: "hsl(var(--foreground))",
        }}
      >
        Página no encontrada
      </p>
      <p
        style={{
          margin: 0,
          fontSize: 15,
          color: "hsl(var(--muted-foreground))",
          maxWidth: 380,
        }}
      >
        {message}
      </p>
      <Link
        to="/personas"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          color: "hsl(var(--primary))",
          fontSize: 14,
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        <ChevronLeft size={14} />
        Volver a Personas
      </Link>
    </div>
  );
}

/* ── Main Page Component ───────────────────────────────────── */
export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isPending, isFetching, isError, error } = useContentfulPage(slug);

  const pageTitle = data?.seoMeta?.title ?? data?.title ?? "Producto";
  const pageDescription = data?.seoMeta?.description ?? "";
  const canonicalUrl = data?.seoMeta?.canonicalUrl;
  const showSkeleton = !slug || isPending || (isFetching && !data);

  return (
    <>
      <Helmet>
        <title>{pageTitle} | Unibank</title>
        {pageDescription && (
          <meta name="description" content={pageDescription} />
        )}
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        {pageDescription && (
          <meta property="og:description" content={pageDescription} />
        )}
        <meta property="og:type" content="website" />
      </Helmet>

      {showSkeleton && <PageSkeleton />}

      {!showSkeleton && isError && (
        <PageError
          message={
            error instanceof Error
              ? error.message
              : "No pudimos cargar esta página."
          }
        />
      )}

      {!showSkeleton && !isError && data && (
        <article className="pb-16 md:pb-24 lg:pb-28">
          {data.sections.length > 0 && (
            <PageBuilder sections={[data.sections[0]]} />
          )}
          <ProductTutorialBanner slug={slug} />
          {data.sections.length > 1 && (
            <PageBuilder sections={data.sections.slice(1)} />
          )}
        </article>
      )}

      {!showSkeleton && !isError && !data && slug && (
        <PageError message="No pudimos cargar el contenido de esta página." />
      )}
    </>
  );
}
