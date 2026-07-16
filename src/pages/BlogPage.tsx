import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
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
  Mail,
} from "@/lib/icons";
import { useContentfulBlogList } from "@/hooks/useContentfulBlog";
import type { ResolvedBlog } from "@/integrations/contentful/types";

const PAGE_SIZE = 6;
const ALL = "Todos";

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

  // Posts available for the searchable/sortable grid (exclude the 3 featured)
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

      <article className="min-h-screen">
        {/* ── Hero ── */}
        <header className="bg-muted/30 border-b border-border pt-20 pb-10 md:pt-28 md:pb-16 lg:pt-32">
          <div className="site-container text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary bg-primary/10 rounded-full px-3 py-1">
              <Newspaper className="w-3.5 h-3.5" />
              Sala de Prensa · Blog Unibank
            </span>
            <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
              Noticias y Blog
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Mantente informado con las últimas noticias, consejos
                financieros y novedades de UniBank.
              </p>
              {!isLoading && posts.length > 0 && (
                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                  <span>
                    <strong className="text-foreground">{posts.length}</strong>{" "}
                    {posts.length === 1 ? "artículo" : "artículos"}
                  </span>
                  {lastUpdated && (
                    <>
                      <span className="hidden sm:inline">·</span>
                      <span>
                        Actualizado{" "}
                        <strong className="text-foreground">{lastUpdated}</strong>
                      </span>
                    </>
                  )}
                </div>
              )}
          </div>
        </header>

        {/* ── Loading state ── */}
        {isLoading && (
          <section className="bg-background py-16">
            <div className="site-container">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <Skeleton className="lg:col-span-3 aspect-[16/10] rounded-lg" />
                <div className="lg:col-span-2 space-y-6">
                  <Skeleton className="h-48 rounded-lg" />
                  <Skeleton className="h-48 rounded-lg" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Empty state ── */}
        {!isLoading && posts.length === 0 && (
          <section className="bg-background py-12 md:py-20">
            <div className="site-container">
              <div className="max-w-xl mx-auto text-center border border-dashed border-border rounded-2xl py-12 md:py-16 px-4 sm:px-6">
              <Newspaper className="w-12 h-12 mx-auto text-muted-foreground/60" />
              <h2 className="mt-4 text-xl font-semibold text-foreground">
                Aún no hay artículos publicados
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Vuelve pronto para descubrir nuestras novedades.
              </p>
              </div>
            </div>
          </section>
        )}

        {/* ── Featured editorial section ── */}
        {!isLoading && heroFeatured && (
          <section className="bg-background pt-12 md:pt-16">
            <div className="site-container">
              <div className="flex items-end justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Destacados
                </h2>
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  Lo más reciente
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Hero featured */}
                <Link
                  to={postHref(heroFeatured.slug)}
                  className="lg:col-span-3 group"
                >
                  <Card className="h-full border border-border/60 hover:border-primary/40 transition-all duration-300 overflow-hidden">
                    <div className="aspect-[16/10] overflow-hidden bg-muted">
                      {heroFeatured.thumbnail?.fields?.file?.url ? (
                        <img
                          src={heroFeatured.thumbnail.fields.file.url}
                          alt={heroFeatured.title}
                          loading="eager"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-primary/10" />
                      )}
                    </div>
                    <CardContent className="p-6 md:p-8">
                      {heroFeatured.category && (
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/15 border-0 uppercase tracking-wider text-[10px]">
                          {heroFeatured.category}
                        </Badge>
                      )}
                      <h3 className="mt-4 text-2xl md:text-3xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                        {heroFeatured.title}
                      </h3>
                      {heroFeatured.excerpt && (
                        <p className="mt-3 text-muted-foreground line-clamp-2">
                          {heroFeatured.excerpt}
                        </p>
                      )}
                      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                        {heroFeatured.author && (
                          <div className="flex items-center gap-2">
                            <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-[11px] font-semibold inline-flex items-center justify-center">
                              {authorInitials(heroFeatured.author)}
                            </span>
                            <span className="text-foreground/80 font-medium">
                              {heroFeatured.author}
                            </span>
                          </div>
                        )}
                        <span className="flex items-center gap-1">
                          <CalendarDays className="w-3.5 h-3.5" />
                          {formatDate(getPostDate(heroFeatured))}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {estimateReadTime(heroFeatured.body)}
                        </span>
                      </div>
                      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                        Leer artículo <ChevronRight className="w-4 h-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>

                {/* Side featured */}
                <div className="lg:col-span-2 grid grid-cols-1 gap-6">
                  {sideFeatured.map((p) => (
                    <Link key={p.sys.id} to={postHref(p.slug)} className="group">
                      <Card className="h-full border border-border/60 hover:border-primary/40 transition-all duration-300 overflow-hidden flex flex-col">
                        <div className="aspect-[16/9] overflow-hidden bg-muted">
                          {p.thumbnail?.fields?.file?.url ? (
                            <img
                              src={p.thumbnail.fields.file.url}
                              alt={p.title}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-primary/10" />
                          )}
                        </div>
                        <CardContent className="p-5 flex flex-col flex-1">
                          {p.category && (
                            <Badge className="bg-primary/10 text-primary hover:bg-primary/15 border-0 uppercase tracking-wider text-[10px] w-fit">
                              {p.category}
                            </Badge>
                          )}
                          <h3 className="mt-3 text-base md:text-lg font-bold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                            {p.title}
                          </h3>
                          {p.excerpt && (
                            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                              {p.excerpt}
                            </p>
                          )}
                          <div className="mt-auto pt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <CalendarDays className="w-3 h-3" />
                              {formatDate(getPostDate(p))}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {estimateReadTime(p.body)}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Filters & Grid (only when 4+ posts) ── */}
        {!isLoading && showAdvancedSections && (
          <>
            <div className="sticky top-20 z-30 bg-background/90 backdrop-blur-md border-y border-border mt-12">
              <div className="site-container py-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="relative flex-1 sm:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Buscar artículos, temas o autores..."
                      className="pl-9 pr-9 h-11 rounded-full bg-muted/40 border-transparent focus-visible:bg-background focus-visible:border-input"
                      aria-label="Buscar artículos"
                    />
                    {query && (
                      <button
                        type="button"
                        onClick={() => setQuery("")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted"
                        aria-label="Limpiar búsqueda"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto sm:ml-auto">
                    <span className="text-xs text-muted-foreground hidden md:inline">
                      <strong className="text-foreground">{filtered.length}</strong>{" "}
                      de {gridPool.length} artículos
                    </span>
                    <Select value={sort} onValueChange={(v) => setSort(v as typeof sort)}>
                      <SelectTrigger className="w-full sm:w-[170px] h-11 rounded-full" aria-label="Ordenar">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Más recientes</SelectItem>
                        <SelectItem value="old">Más antiguos</SelectItem>
                        <SelectItem value="az">A–Z</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {hasActiveFilters && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      <X className="w-3 h-3" /> Limpiar filtros
                    </button>
                  </div>
                )}
              </div>
            </div>

            <section id="blog-grid" className="bg-background py-12 md:py-16">
              <div className="site-container">
                {paginated.length === 0 ? (
                  <div className="text-center py-20 border border-dashed border-border rounded-2xl">
                    <Newspaper className="w-10 h-10 mx-auto text-muted-foreground/60" />
                    <h3 className="mt-4 text-lg font-semibold text-foreground">
                      No encontramos artículos
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Intenta con otra búsqueda o limpia los filtros.
                    </p>
                    <Button variant="outline" size="sm" onClick={clearFilters} className="mt-5">
                      Limpiar filtros
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginated.map((post) => (
                      <Link key={post.sys.id} to={postHref(post.slug)} className="group">
                        <Card className="h-full border border-border/60 hover:border-primary/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
                          <div className="aspect-[3/2] overflow-hidden bg-muted relative">
                            {post.thumbnail?.fields?.file?.url ? (
                              <img
                                src={post.thumbnail.fields.file.url}
                                alt={post.title}
                                loading="lazy"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full bg-primary/10" />
                            )}
                            {post.category && (
                              <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider text-primary bg-background/90 backdrop-blur-sm rounded-full px-2.5 py-1">
                                {post.category}
                              </span>
                            )}
                          </div>
                          <CardContent className="p-5 flex flex-col flex-1">
                            <h2 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                              {post.title}
                            </h2>
                            {post.excerpt && (
                              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                                {post.excerpt}
                              </p>
                            )}

                            <div className="mt-auto pt-4 border-t border-border/60 flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-[11px] font-semibold inline-flex items-center justify-center shrink-0">
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
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                )}

                {filtered.length > PAGE_SIZE && (
                  <div className="mt-12">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              goToPage(page - 1);
                            }}
                            className={page === 1 ? "pointer-events-none opacity-50" : undefined}
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
                            className={
                              page === totalPages ? "pointer-events-none opacity-50" : undefined
                            }
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

        {/* ── Newsletter CTA ── */}
        {!isLoading && posts.length > 0 && (
          <section className="bg-primary/5 border-t border-border mt-12 md:mt-16 lg:mt-24">
            <div className="site-container py-12 md:py-16 lg:py-20 grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 items-center">
              <div className="md:col-span-3">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  <Mail className="w-3.5 h-3.5" /> Newsletter
                </span>
                <h2 className="mt-3 text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                  Recibe nuestras novedades
                </h2>
                <p className="mt-2 text-sm md:text-base text-muted-foreground">
                  Artículos, análisis y noticias del sector financiero
                  directamente en tu correo. Sin spam.
                </p>
              </div>
              <form
                className="md:col-span-2 flex flex-col sm:flex-row gap-3 w-full"
                onSubmit={(e) => e.preventDefault()}
              >
                <Input
                  type="email"
                  required
                  placeholder="tu@correo.com"
                  aria-label="Correo electrónico"
                  className="flex-1 w-full"
                />
                <Button type="submit" className="w-full sm:w-auto shrink-0">
                  Suscribirme
                </Button>
              </form>
            </div>
          </section>
        )}
      </article>
    </>
  );
}
