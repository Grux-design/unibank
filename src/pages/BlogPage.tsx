import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { StaticPageFrame } from "@/components/organisms/StaticPageLayout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  CalendarDays,
  Clock,
  Search,
  ChevronRight,
  Newspaper,
  X,
} from "@/lib/icons";
import { useContentfulBlogList } from "@/hooks/useContentfulBlog";
import type { ResolvedBlog } from "@/integrations/contentful/types";

const PAGE_SIZE = 6;

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

function getPostDate(p: ResolvedBlog) {
  return p.publishedDate || p.sys.createdAt;
}

function estimateReadTime(content: unknown): string {
  if (!content) return "3 min";
  const text = JSON.stringify(content).replace(/[^a-zA-ZÀ-ÿ ]/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min lectura`;
}

function thumbnailUrl(post: ResolvedBlog): string | null {
  const raw = post.thumbnail?.fields?.file?.url;
  if (!raw) return null;
  return raw.startsWith("//") ? `https:${raw}` : raw;
}

function CategoryTag({ label }: { label: string }) {
  return (
    <span className="type-section-tag text-[10px] px-2.5 py-0.5 bg-background/95 backdrop-blur-sm">
      {label}
    </span>
  );
}

function PostMeta({
  post,
  compact = false,
}: {
  post: ResolvedBlog;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground ${
        compact ? "text-[11px]" : "text-xs"
      }`}
    >
      {post.author && (
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full bg-primary/10 text-primary font-semibold inline-flex items-center justify-center shrink-0 ${
              compact ? "w-6 h-6 text-[10px]" : "w-7 h-7 text-[11px]"
            }`}
          >
            {authorInitials(post.author)}
          </span>
          <span className="text-foreground/80 font-medium">{post.author}</span>
        </div>
      )}
      <span className="flex items-center gap-1">
        <CalendarDays className={compact ? "w-3 h-3" : "w-3.5 h-3.5"} />
        {formatDate(getPostDate(post))}
      </span>
      <span className="flex items-center gap-1">
        <Clock className={compact ? "w-3 h-3" : "w-3.5 h-3.5"} />
        {estimateReadTime(post.body)}
      </span>
    </div>
  );
}

function ReadLink({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all duration-300 ${className}`}
    >
      Leer artículo
      <ChevronRight className="w-4 h-4" />
    </span>
  );
}

function BlogThumbnail({
  post,
  aspectClass,
  eager = false,
}: {
  post: ResolvedBlog;
  aspectClass: string;
  eager?: boolean;
}) {
  const src = thumbnailUrl(post);
  return (
    <div className={`overflow-hidden bg-muted relative ${aspectClass}`}>
      {src ? (
        <img
          src={src}
          alt={post.title}
          loading={eager ? "eager" : "lazy"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <div className="w-full h-full bg-primary/10 flex items-center justify-center">
          <Newspaper className="w-10 h-10 text-primary/35" />
        </div>
      )}
    </div>
  );
}

export default function BlogPage() {
  const { data: posts = [], isLoading } = useContentfulBlogList();
  const location = useLocation();

  const segment = location.pathname.startsWith("/empresas") ? "empresas" : "personas";

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"recent" | "old" | "az">("recent");
  const [page, setPage] = useState(1);

  const featured = useMemo(() => posts.slice(0, 3), [posts]);
  const heroFeatured = featured[0];
  const sideFeatured = featured.slice(1, 3);
  const featuredIds = useMemo(() => new Set(featured.map((p) => p.sys.id)), [featured]);

  const lastUpdated = useMemo(() => {
    if (!posts.length) return "";
    return formatDate(getPostDate(posts[0]));
  }, [posts]);

  const gridPool = useMemo(
    () => posts.filter((p) => !featuredIds.has(p.sys.id)),
    [posts, featuredIds],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = gridPool.filter((p) => {
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        (p.excerpt?.toLowerCase().includes(q) ?? false) ||
        (p.author?.toLowerCase().includes(q) ?? false) ||
        (p.category?.toLowerCase().includes(q) ?? false)
      );
    });
    list = [...list].sort((a, b) => {
      if (sort === "az") return a.title.localeCompare(b.title);
      const ad = new Date(getPostDate(a)).getTime();
      const bd = new Date(getPostDate(b)).getTime();
      return sort === "recent" ? bd - ad : ad - bd;
    });
    return list;
  }, [gridPool, query, sort]);

  useEffect(() => {
    setPage(1);
  }, [query, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const goToPage = (p: number) => {
    const next = Math.min(Math.max(1, p), totalPages);
    setPage(next);
    const grid = document.getElementById("blog-grid");
    if (grid) grid.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const clearFilters = () => {
    setQuery("");
    setSort("recent");
  };

  const hasActiveFilters = query !== "" || sort !== "recent";
  const showAdvancedSections = posts.length >= 4;
  const postHref = (slug: string) => `/${segment}/blog/${slug}`;

  return (
    <>
      <Helmet>
        <title>Noticias y Blog – UniBank</title>
        <meta
          name="description"
          content="Sala de prensa, artículos, educación financiera y novedades de UniBank Panamá."
        />
        <link rel="canonical" href="https://unibank.com.pa/blog" />
      </Helmet>

      <StaticPageFrame page="blog" articleClassName="min-h-screen pb-16 md:pb-24 lg:pb-28 bg-background">
        {isLoading && (
          <section className="page-surface-white py-12 md:py-16">
            <div className="site-container space-y-6">
              <Skeleton className="h-8 w-48 rounded-lg" />
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <Skeleton className="lg:col-span-3 aspect-[16/10] rounded-[28px]" />
                <div className="lg:col-span-2 space-y-6">
                  <Skeleton className="h-52 rounded-[24px]" />
                  <Skeleton className="h-52 rounded-[24px]" />
                </div>
              </div>
            </div>
          </section>
        )}

        {!isLoading && posts.length === 0 && (
          <section className="page-surface-white py-12 md:py-20">
            <div className="site-container">
              <div className="page-section-card max-w-xl mx-auto text-center rounded-[28px] py-14 md:py-16 px-6">
                <div className="mx-auto w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Newspaper className="w-7 h-7 text-primary/70" />
                </div>
                <h2 className="mt-5 type-card-title text-foreground">
                  Aún no hay artículos publicados
                </h2>
                <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
                  Vuelve pronto para descubrir nuestras novedades.
                </p>
              </div>
            </div>
          </section>
        )}

        {!isLoading && heroFeatured && (
          <section className="page-surface-white pt-10 md:pt-14 pb-12 md:pb-16">
            <div className="site-container">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
                <div>
                  <span className="type-section-tag mb-3">Editorial</span>
                  <h2 className="type-content-section-headline text-foreground mt-3">
                    Destacados
                  </h2>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="type-section-tag text-[10px] px-3 py-1">
                    <strong className="text-foreground">{posts.length}</strong>
                    &nbsp;{posts.length === 1 ? "artículo" : "artículos"}
                  </span>
                  {lastUpdated && (
                    <span className="type-section-tag text-[10px] px-3 py-1">
                      Actualizado&nbsp;
                      <strong className="text-foreground">{lastUpdated}</strong>
                    </span>
                  )}
                  <span className="text-xs uppercase tracking-[0.12em] text-muted-foreground font-medium">
                    Lo más reciente
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                <Link
                  to={postHref(heroFeatured.slug)}
                  className="lg:col-span-7 group"
                >
                  <article className="page-section-card h-full rounded-[28px] overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40">
                    <BlogThumbnail
                      post={heroFeatured}
                      aspectClass="aspect-[16/10]"
                      eager
                    />
                    <div className="p-6 md:p-8">
                      {heroFeatured.category && (
                        <CategoryTag label={heroFeatured.category} />
                      )}
                      <h3 className="mt-4 type-content-section-headline text-foreground leading-tight group-hover:text-primary transition-colors">
                        {heroFeatured.title}
                      </h3>
                      {heroFeatured.excerpt && (
                        <p className="mt-3 text-base text-muted-foreground line-clamp-2 leading-relaxed">
                          {heroFeatured.excerpt}
                        </p>
                      )}
                      <div className="mt-6 pt-6 border-t border-border/60">
                        <PostMeta post={heroFeatured} />
                        <ReadLink className="mt-5" />
                      </div>
                    </div>
                  </article>
                </Link>

                <div className="lg:col-span-5 flex flex-col gap-6">
                  {sideFeatured.map((p) => (
                    <Link key={p.sys.id} to={postHref(p.slug)} className="group flex-1">
                      <article className="page-section-card h-full rounded-[24px] overflow-hidden flex flex-col sm:flex-row transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40">
                        <BlogThumbnail
                          post={p}
                          aspectClass="sm:w-[42%] shrink-0 aspect-[16/10] sm:aspect-auto sm:min-h-[180px]"
                        />
                        <div className="p-5 flex flex-col flex-1 min-w-0">
                          {p.category && <CategoryTag label={p.category} />}
                          <h3 className="mt-3 type-item-title-sm text-foreground leading-snug group-hover:text-primary transition-colors">
                            {p.title}
                          </h3>
                          {p.excerpt && (
                            <p className="mt-2 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                              {p.excerpt}
                            </p>
                          )}
                          <div className="mt-auto pt-4">
                            <PostMeta post={p} compact />
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {!isLoading && showAdvancedSections && (
          <>
            <div className="sticky top-20 z-30 px-4 sm:px-0">
              <div className="site-container">
                <div className="page-section-card rounded-2xl md:rounded-full border border-border/80 px-4 py-3 md:px-5 md:py-3.5 bg-[color-mix(in_srgb,var(--surface-warm)_92%,transparent)]">
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <div className="relative flex-1 md:max-w-md">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Buscar artículos, temas o autores..."
                        className="pl-10 pr-10 h-11 rounded-full bg-background/80 border-border/60 focus-visible:bg-background"
                        aria-label="Buscar artículos"
                      />
                      {query && (
                        <button
                          type="button"
                          onClick={() => setQuery("")}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted"
                          aria-label="Limpiar búsqueda"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:ml-auto">
                      <span className="text-xs text-muted-foreground hidden lg:inline whitespace-nowrap">
                        <strong className="text-foreground">{filtered.length}</strong> de{" "}
                        {gridPool.length} en archivo
                      </span>
                      <Select value={sort} onValueChange={(v) => setSort(v as typeof sort)}>
                        <SelectTrigger
                          className="w-full sm:w-[180px] h-11 rounded-full bg-background/80 border-border/60"
                          aria-label="Ordenar"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recent">Más recientes</SelectItem>
                          <SelectItem value="old">Más antiguos</SelectItem>
                          <SelectItem value="az">A–Z</SelectItem>
                        </SelectContent>
                      </Select>
                      {hasActiveFilters && (
                        <button
                          type="button"
                          onClick={clearFilters}
                          className="inline-flex items-center justify-center gap-1 text-xs font-medium text-primary hover:underline whitespace-nowrap"
                        >
                          <X className="w-3 h-3" />
                          Limpiar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <section id="blog-grid" className="page-surface-warm py-12 md:py-16 mt-8 md:mt-10">
              <div className="site-container">
                <div className="mb-8">
                  <span className="type-section-tag">Archivo</span>
                  <h2 className="mt-3 type-content-section-headline text-foreground">
                    Todos los artículos
                  </h2>
                </div>

                {paginated.length === 0 ? (
                  <div className="page-section-card text-center rounded-[28px] py-16 px-6">
                    <Newspaper className="w-10 h-10 mx-auto text-muted-foreground/60" />
                    <h3 className="mt-4 type-item-title-sm text-foreground">
                      No encontramos artículos
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Intenta con otra búsqueda o limpia los filtros.
                    </p>
                    <Button variant="outline" size="sm" onClick={clearFilters} className="mt-5 rounded-full">
                      Limpiar filtros
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {paginated.map((post) => (
                      <Link key={post.sys.id} to={postHref(post.slug)} className="group">
                        <article className="page-section-card h-full rounded-[24px] overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40">
                          <div className="relative">
                            <BlogThumbnail post={post} aspectClass="aspect-[3/2]" />
                            {post.category && (
                              <div className="absolute top-3 left-3">
                                <CategoryTag label={post.category} />
                              </div>
                            )}
                          </div>
                          <div className="p-5 md:p-6 flex flex-col flex-1">
                            <h2 className="type-card-title text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">
                              {post.title}
                            </h2>
                            {post.excerpt && (
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-5 leading-relaxed">
                                {post.excerpt}
                              </p>
                            )}
                            <div className="mt-auto pt-4 border-t border-border/60 flex items-center justify-between gap-3">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary text-[11px] font-semibold inline-flex items-center justify-center shrink-0">
                                  {authorInitials(post.author)}
                                </span>
                                <div className="min-w-0">
                                  <p className="text-xs font-medium text-foreground truncate">
                                    {post.author || "UniBank"}
                                  </p>
                                  <p className="text-[10px] text-muted-foreground truncate">
                                    {formatDate(getPostDate(post))}
                                  </p>
                                </div>
                              </div>
                              <span className="flex items-center gap-1 text-[11px] text-muted-foreground shrink-0">
                                <Clock className="w-3 h-3" />
                                {estimateReadTime(post.body)}
                              </span>
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                )}

                {filtered.length > PAGE_SIZE && (
                  <div className="mt-14 flex justify-center">
                    <Pagination>
                      <PaginationContent className="gap-1">
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              goToPage(page - 1);
                            }}
                            className={`rounded-full ${page === 1 ? "pointer-events-none opacity-50" : ""}`}
                          />
                        </PaginationItem>
                        {Array.from({ length: totalPages }).map((_, i) => {
                          const n = i + 1;
                          const show = n === 1 || n === totalPages || Math.abs(n - page) <= 1;
                          const showEllipsisBefore = n === page - 2 && page - 2 > 1;
                          const showEllipsisAfter = n === page + 2 && page + 2 < totalPages;
                          if (showEllipsisBefore || showEllipsisAfter) {
                            return (
                              <PaginationItem key={`e-${n}`}>
                                <PaginationEllipsis />
                              </PaginationItem>
                            );
                          }
                          if (!show) return null;
                          return (
                            <PaginationItem key={n}>
                              <PaginationLink
                                href="#"
                                isActive={n === page}
                                onClick={(e) => {
                                  e.preventDefault();
                                  goToPage(n);
                                }}
                                className="rounded-full min-w-9"
                              >
                                {n}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        })}
                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              goToPage(page + 1);
                            }}
                            className={`rounded-full ${
                              page === totalPages ? "pointer-events-none opacity-50" : ""
                            }`}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </StaticPageFrame>
    </>
  );
}
