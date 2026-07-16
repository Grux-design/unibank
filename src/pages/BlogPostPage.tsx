import { Link, useLocation, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { documentToReactComponents, type Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS, type Document } from "@contentful/rich-text-types";
import { ChevronLeft, CalendarDays, Clock, Share2 } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useContentfulBlogPost } from "@/hooks/useContentfulBlog";
import type { ContentfulAsset } from "@/integrations/contentful/types";
import { useState } from "react";

function formatDate(d?: string) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("es-PA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function authorInitials(name?: string) {
  if (!name) return "U";
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

function estimateReadTime(doc: unknown): string {
  if (!doc) return "3 min lectura";
  const text = JSON.stringify(doc).replace(/[^a-zA-ZÀ-ÿ ]/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min lectura`;
}

function buildRichTextOptions(assetMap: Map<string, ContentfulAsset>): Options {
  return {
    renderMark: {
      [MARKS.BOLD]: (text) => <strong className="font-semibold text-foreground">{text}</strong>,
      [MARKS.ITALIC]: (text) => <em className="italic">{text}</em>,
      [MARKS.UNDERLINE]: (text) => <u>{text}</u>,
      [MARKS.CODE]: (text) => (
        <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">{text}</code>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node, children) => (
        <p className="text-base md:text-lg leading-relaxed text-foreground/90 mb-6">{children}</p>
      ),
      [BLOCKS.HEADING_1]: (_n, c) => (
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mt-12 mb-5 tracking-tight">{c}</h1>
      ),
      [BLOCKS.HEADING_2]: (_n, c) => (
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-12 mb-4 tracking-tight">{c}</h2>
      ),
      [BLOCKS.HEADING_3]: (_n, c) => (
        <h3 className="text-xl md:text-2xl font-bold text-foreground mt-10 mb-3">{c}</h3>
      ),
      [BLOCKS.HEADING_4]: (_n, c) => (
        <h4 className="text-lg md:text-xl font-semibold text-foreground mt-8 mb-2">{c}</h4>
      ),
      [BLOCKS.UL_LIST]: (_n, c) => (
        <ul className="list-disc pl-6 mb-6 space-y-2 text-base md:text-lg text-foreground/90">{c}</ul>
      ),
      [BLOCKS.OL_LIST]: (_n, c) => (
        <ol className="list-decimal pl-6 mb-6 space-y-2 text-base md:text-lg text-foreground/90">{c}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (_n, c) => <li className="leading-relaxed">{c}</li>,
      [BLOCKS.QUOTE]: (_n, c) => (
        <blockquote className="border-l-4 border-primary pl-4 md:pl-6 my-8 italic text-lg md:text-xl text-foreground/80">
          {c}
        </blockquote>
      ),
      [BLOCKS.HR]: () => <hr className="my-12 border-border" />,
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const id = (node.data?.target as { sys?: { id?: string } })?.sys?.id;
        const asset = id ? assetMap.get(id) : undefined;
        const file = asset?.fields?.file;
        if (!file?.url) return null;
        const url = file.url.startsWith("//") ? `https:${file.url}` : file.url;
        const isImage = file.contentType?.startsWith("image/");
        if (!isImage) return null;
        const caption = asset?.fields?.description || asset?.fields?.title;
        return (
          <figure className="my-8 md:my-10 -mx-0 sm:-mx-2 md:-mx-8">
            <img
              src={url}
              alt={asset?.fields?.title || ""}
              loading="lazy"
              className="w-full rounded-xl shadow-md"
            />
            {caption && (
              <figcaption className="mt-3 text-center text-sm text-muted-foreground italic">
                {caption}
              </figcaption>
            )}
          </figure>
        );
      },
      [INLINES.HYPERLINK]: (node, children) => (
        <a
          href={node.data.uri as string}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
        >
          {children}
        </a>
      ),
    },
  };
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const { data, isLoading, isError } = useContentfulBlogPost(slug);
  const [copied, setCopied] = useState(false);

  const backHref = `/blog`;
  const currentSegment = location.pathname.startsWith("/empresas") ? "empresas" : "personas";

  const handleShare = async () => {
    if (typeof navigator === "undefined") return;
    const shareData = {
      title: data?.post.title,
      text: data?.post.excerpt,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* user cancelled */
    }
  };

  if (isLoading) {
    return (
      <article className="min-h-screen">
        <Skeleton className="w-full h-[320px] md:h-[420px] lg:h-[520px]" />
        <div className="site-container max-w-2xl py-12 md:py-16 space-y-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full mt-8" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      </article>
    );
  }

  if (isError || !data?.post) {
    return (
      <article className="min-h-screen flex items-center justify-center py-20">
        <div className="site-container max-w-md text-center">
          <h1 className="text-2xl font-bold text-foreground">Artículo no encontrado</h1>
          <p className="mt-2 text-muted-foreground">
            El artículo que buscas no existe o fue removido.
          </p>
          <Button asChild className="mt-6">
            <Link to={backHref}>
              <ChevronLeft className="w-4 h-4 mr-2" /> Volver al blog
            </Link>
          </Button>
        </div>
      </article>
    );
  }

  const { post, assetMap } = data;
  const heroUrl = post.thumbnail?.fields?.file?.url;
  const readTime = estimateReadTime(post.body);
  const dateStr = formatDate(post.publishedDate || post.sys.createdAt);
  const options = buildRichTextOptions(assetMap);

  return (
    <>
      <Helmet>
        <title>{post.title} – UniBank</title>
        {post.excerpt && <meta name="description" content={post.excerpt} />}
        <link
          rel="canonical"
          href={`https://unibank.com.pa/${currentSegment}/blog/${post.slug}`}
        />
        <meta property="og:title" content={post.title} />
        {post.excerpt && <meta property="og:description" content={post.excerpt} />}
        {heroUrl && <meta property="og:image" content={heroUrl} />}
        <meta property="og:type" content="article" />
      </Helmet>

      <article className="min-h-screen bg-background">
        {/* Hero */}
        <header className="relative w-full h-[320px] sm:h-[380px] md:h-[480px] lg:h-[520px] bg-muted overflow-hidden">
          {heroUrl ? (
            <img
              src={heroUrl}
              alt={post.title}
              loading="eager"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-primary/10" />
          )}
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative h-full site-container max-w-3xl pb-10 md:pb-16 flex flex-col justify-end">
            <Link
              to={backHref}
              className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-white mb-4 md:mb-6 w-fit"
            >
              <ChevronLeft className="w-4 h-4" /> Volver al blog
            </Link>
            {post.category && (
              <Badge className="bg-primary text-primary-foreground hover:bg-primary border-0 uppercase tracking-wider text-[10px] w-fit mb-4">
                {post.category}
              </Badge>
            )}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-3 md:mt-4 text-base md:text-lg text-white/85 max-w-2xl line-clamp-2">
                {post.excerpt}
              </p>
            )}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/80">
              {post.author && (
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-white/15 backdrop-blur text-white text-xs font-semibold inline-flex items-center justify-center">
                    {authorInitials(post.author)}
                  </span>
                  <span className="font-medium text-white">{post.author}</span>
                </div>
              )}
              {dateStr && (
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="w-4 h-4" /> {dateStr}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {readTime}
              </span>
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="site-container max-w-2xl py-12 md:py-16 lg:py-20">
          <div className="article-body">
            {post.body
              ? documentToReactComponents(post.body as Document, options)
              : (
                <p className="text-base md:text-lg text-muted-foreground">
                  Este artículo aún no tiene contenido.
                </p>
              )}
          </div>

          {/* Footer */}
          <div className="mt-12 md:mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link to={backHref}>
                <ChevronLeft className="w-4 h-4 mr-2" /> Más artículos
              </Link>
            </Button>
            <Button variant="ghost" onClick={handleShare} className="w-full sm:w-auto">
              <Share2 className="w-4 h-4 mr-2" />
              {copied ? "¡Enlace copiado!" : "Compartir"}
            </Button>
          </div>
        </div>
      </article>
    </>
  );
}
