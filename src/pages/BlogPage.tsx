import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  ArrowRight,
  Newspaper,
  X,
  Mail,
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
  author: string;
  authorRole: string;
  readTime: string;
  featured?: boolean;
  tags: string[];
}

const posts: BlogPost[] = [
  {
    id: "1",
    title: "UniBank lanza nueva Cuenta Digital con apertura 100% en línea",
    excerpt:
      "Descubre cómo abrir tu cuenta desde la comodidad de tu hogar en minutos, sin papeleo ni filas, con verificación biométrica y activación inmediata.",
    date: "2026-04-22",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop",
    category: "Productos",
    author: "María Pérez",
    authorRole: "Editora Financiera",
    readTime: "4 min lectura",
    featured: true,
    tags: ["Digital", "Cuentas", "Innovación"],
  },
  {
    id: "2",
    title: "5 consejos para mejorar tus finanzas personales en 2026",
    excerpt:
      "Aprende estrategias prácticas para ahorrar, invertir y proteger tu patrimonio este año.",
    date: "2026-04-18",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
    category: "Educación Financiera",
    author: "Carlos Mendoza",
    authorRole: "Asesor de Inversiones",
    readTime: "6 min lectura",
    featured: true,
    tags: ["Ahorro", "Presupuesto"],
  },
  {
    id: "3",
    title: "UniBank recibe reconocimiento por innovación digital en Panamá",
    excerpt:
      "La Superintendencia de Bancos destaca a UniBank por sus avances en banca digital y experiencia del cliente.",
    date: "2026-04-12",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    category: "Noticias",
    author: "Equipo UniBank",
    authorRole: "Comunicaciones",
    readTime: "3 min lectura",
    featured: true,
    tags: ["Premios", "Innovación"],
  },
  {
    id: "4",
    title: "¿Qué es el leasing y cómo puede ayudar a tu empresa?",
    excerpt:
      "Conoce los beneficios del leasing financiero y operativo para impulsar el crecimiento de tu negocio.",
    date: "2026-04-05",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    category: "Empresas",
    author: "Luis Fernández",
    authorRole: "Banca Empresarial",
    readTime: "5 min lectura",
    tags: ["Leasing", "PyMES"],
  },
  {
    id: "5",
    title: "Invertis Global Income Fund: diversifica tu portafolio",
    excerpt:
      "Una opción de inversión diversificada con exposición a mercados globales y rendimientos competitivos.",
    date: "2026-03-28",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop",
    category: "Inversiones",
    author: "Andrea Castillo",
    authorRole: "Wealth Management",
    readTime: "7 min lectura",
    tags: ["Fondos", "Global"],
  },
  {
    id: "6",
    title: "UniBank inaugura nueva oficina en Costa del Este",
    excerpt:
      "Expandimos nuestra presencia para estar más cerca de ti, con tecnología de última generación.",
    date: "2026-03-20",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    category: "Noticias",
    author: "Equipo UniBank",
    authorRole: "Comunicaciones",
    readTime: "3 min lectura",
    tags: ["Oficinas"],
  },
  {
    id: "7",
    title: "Financiamiento verde: paneles solares para tu hogar y empresa",
    excerpt:
      "Impulsa tu transición energética con UniLeasing y accede a beneficios fiscales exclusivos.",
    date: "2026-03-14",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop",
    category: "Sostenibilidad",
    author: "Sofía Ramírez",
    authorRole: "Banca Sostenible",
    readTime: "5 min lectura",
    tags: ["Verde", "UniLeasing"],
  },
  {
    id: "8",
    title: "Cómo proteger tu patrimonio con un fideicomiso",
    excerpt:
      "UniTrust te explica los tipos de fideicomiso y cuándo conviene utilizarlos.",
    date: "2026-03-08",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop",
    category: "Educación Financiera",
    author: "Roberto Quintero",
    authorRole: "UniTrust",
    readTime: "8 min lectura",
    tags: ["Fideicomiso", "Patrimonio"],
  },
  {
    id: "9",
    title: "Tarjetas Visa Infinite: beneficios premium para nuestros clientes",
    excerpt:
      "Acceso a salones VIP, seguros de viaje, concierge 24/7 y experiencias exclusivas.",
    date: "2026-03-02",
    image: "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=800&h=600&fit=crop",
    category: "Productos",
    author: "Patricia Ortega",
    authorRole: "Banca Personal",
    readTime: "4 min lectura",
    tags: ["Tarjetas", "Premium"],
  },
  {
    id: "10",
    title: "Educación financiera para jóvenes profesionales",
    excerpt:
      "Cinco hábitos que todo recién graduado debería adoptar desde su primer salario.",
    date: "2026-02-25",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop",
    category: "Educación Financiera",
    author: "María Pérez",
    authorRole: "Editora Financiera",
    readTime: "6 min lectura",
    tags: ["Jóvenes", "Hábitos"],
  },
  {
    id: "11",
    title: "Banca empresarial: soluciones de capital de trabajo",
    excerpt:
      "Líneas de crédito flexibles para mantener el flujo operativo de tu negocio.",
    date: "2026-02-18",
    image: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=800&h=600&fit=crop",
    category: "Empresas",
    author: "Luis Fernández",
    authorRole: "Banca Empresarial",
    readTime: "5 min lectura",
    tags: ["Crédito", "Empresas"],
  },
  {
    id: "12",
    title: "Mercado de capitales: oportunidades en bonos corporativos",
    excerpt:
      "Análisis de Invertis Securities sobre las emisiones más atractivas del trimestre.",
    date: "2026-02-10",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&h=600&fit=crop",
    category: "Inversiones",
    author: "Andrea Castillo",
    authorRole: "Wealth Management",
    readTime: "7 min lectura",
    tags: ["Bonos", "Mercados"],
  },
  {
    id: "13",
    title: "UniBank renueva su app móvil con experiencia más rápida",
    excerpt:
      "Nueva interfaz, autenticación biométrica mejorada y pagos instantáneos en un solo toque.",
    date: "2026-02-04",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
    category: "Productos",
    author: "Equipo UniBank",
    authorRole: "Producto Digital",
    readTime: "4 min lectura",
    tags: ["App", "Digital"],
  },
  {
    id: "14",
    title: "Movilidad eléctrica: financia tu próximo vehículo híbrido",
    excerpt:
      "Tasas preferenciales y plazos extendidos para autos eléctricos e híbridos a través de UniLeasing.",
    date: "2026-01-28",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=600&fit=crop",
    category: "Sostenibilidad",
    author: "Sofía Ramírez",
    authorRole: "Banca Sostenible",
    readTime: "5 min lectura",
    tags: ["Verde", "Vehículos"],
  },
];

const PAGE_SIZE = 6;
const ALL = "Todos";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("es-PA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function authorInitials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function BlogPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(ALL);
  const [sort, setSort] = useState<"recent" | "old" | "az">("recent");
  const [page, setPage] = useState(1);

  // Categories derived from posts
  const categories = useMemo(() => {
    const set = new Set(posts.map((p) => p.category));
    return [ALL, ...Array.from(set)];
  }, []);

  // Featured posts (always shown, not affected by filters)
  const featured = useMemo(() => posts.filter((p) => p.featured), []);
  const heroFeatured = featured[0];
  const sideFeatured = featured.slice(1, 3);

  const lastUpdated = useMemo(() => {
    const sorted = [...posts].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    return formatDate(sorted[0].date);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = posts.filter((p) => {
      const matchesQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      const matchesCat = category === ALL || p.category === category;
      return matchesQ && matchesCat;
    });
    list = list.sort((a, b) => {
      if (sort === "az") return a.title.localeCompare(b.title);
      const ad = new Date(a.date).getTime();
      const bd = new Date(b.date).getTime();
      return sort === "recent" ? bd - ad : ad - bd;
    });
    return list;
  }, [query, category, sort]);

  useEffect(() => {
    setPage(1);
  }, [query, category, sort]);

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
    setCategory(ALL);
    setSort("recent");
  };

  const hasActiveFilters = query !== "" || category !== ALL || sort !== "recent";

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
        <header className="bg-muted/30 border-b border-border">
          <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
            <div className="flex flex-col items-center text-center">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary bg-primary/10 rounded-full px-3 py-1">
                <Newspaper className="w-3.5 h-3.5" />
                Sala de Prensa · Blog Unibank
              </span>
              <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
                Noticias y Blog
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
                Mantente informado con las últimas noticias, consejos
                financieros y novedades de UniBank.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span>
                  <strong className="text-foreground">{posts.length}</strong>{" "}
                  artículos
                </span>
                <span className="hidden sm:inline">·</span>
                <span>
                  <strong className="text-foreground">
                    {categories.length - 1}
                  </strong>{" "}
                  categorías
                </span>
                <span className="hidden sm:inline">·</span>
                <span>
                  Actualizado{" "}
                  <strong className="text-foreground">{lastUpdated}</strong>
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* ── Featured editorial section ── */}
        {heroFeatured && (
          <section className="bg-background pt-12 md:pt-16 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-end justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Destacados
                </h2>
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  Lo más leído
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Hero featured */}
                <Card className="lg:col-span-3 group border border-border/60 hover:border-primary/40 transition-all duration-300 overflow-hidden cursor-pointer">
                  <div className="aspect-[16/10] overflow-hidden bg-muted">
                    <img
                      src={heroFeatured.image}
                      alt={heroFeatured.title}
                      loading="eager"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6 md:p-8">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/15 border-0 uppercase tracking-wider text-[10px]">
                      {heroFeatured.category}
                    </Badge>
                    <h3 className="mt-4 text-2xl md:text-3xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                      {heroFeatured.title}
                    </h3>
                    <p className="mt-3 text-muted-foreground line-clamp-2">
                      {heroFeatured.excerpt}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-[11px] font-semibold inline-flex items-center justify-center">
                          {authorInitials(heroFeatured.author)}
                        </span>
                        <span className="text-foreground/80 font-medium">
                          {heroFeatured.author}
                        </span>
                      </div>
                      <span className="flex items-center gap-1">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {formatDate(heroFeatured.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {heroFeatured.readTime}
                      </span>
                    </div>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                      Leer artículo <ArrowRight className="w-4 h-4" />
                    </span>
                  </CardContent>
                </Card>

                {/* Side featured */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                  {sideFeatured.map((p) => (
                    <Card
                      key={p.id}
                      className="group border border-border/60 hover:border-primary/40 transition-all duration-300 overflow-hidden cursor-pointer flex-1"
                    >
                      <div className="flex h-full">
                        <div className="w-1/3 min-w-[120px] overflow-hidden bg-muted">
                          <img
                            src={p.image}
                            alt={p.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <CardContent className="flex-1 p-5">
                          <Badge className="bg-primary/10 text-primary hover:bg-primary/15 border-0 uppercase tracking-wider text-[10px]">
                            {p.category}
                          </Badge>
                          <h3 className="mt-2 text-base md:text-lg font-bold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                            {p.title}
                          </h3>
                          <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <CalendarDays className="w-3 h-3" />
                              {formatDate(p.date)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {p.readTime}
                            </span>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Sticky toolbar ── */}
        <div className="sticky top-20 z-30 bg-background/90 backdrop-blur-md border-y border-border mt-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 space-y-3">
            {/* Row 1 — Search (left) + Sort & result count (right) */}
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

              <div className="flex items-center justify-between sm:justify-end gap-3 sm:ml-auto">
                <span className="text-xs text-muted-foreground hidden md:inline">
                  <strong className="text-foreground">{filtered.length}</strong>{" "}
                  de {posts.length} artículos
                </span>
                <Select
                  value={sort}
                  onValueChange={(v) => setSort(v as typeof sort)}
                >
                  <SelectTrigger
                    className="w-[170px] h-11 rounded-full"
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
              </div>
            </div>

            {/* Row 2 — Category pills with fade edges, hidden scrollbar */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hidden md:inline shrink-0">
                Categorías
              </span>
              <div className="relative flex-1 min-w-0">
                <div className="no-scrollbar overflow-x-auto">
                  <div className="flex items-center gap-2 min-w-max py-1">
                    {categories.map((c) => {
                      const active = c === category;
                      return (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setCategory(c)}
                          className={
                            "shrink-0 inline-flex items-center h-8 px-4 rounded-full text-xs font-medium transition-colors border " +
                            (active
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background text-muted-foreground border-border hover:text-foreground hover:border-foreground/30")
                          }
                        >
                          {c}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {/* Fade edges */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-background to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-background to-transparent" />
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="shrink-0 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  <X className="w-3 h-3" /> Limpiar
                </button>
              )}
            </div>

            {/* Mobile-only result count */}
            <p className="text-xs text-muted-foreground md:hidden">
              <strong className="text-foreground">{filtered.length}</strong> de{" "}
              {posts.length} artículos
            </p>
          </div>
        </div>

        {/* ── Grid ── */}
        <section
          id="blog-grid"
          className="bg-background py-12 md:py-16 px-4 sm:px-6"
        >
          <div className="max-w-6xl mx-auto">
            {paginated.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-border rounded-2xl">
                <Newspaper className="w-10 h-10 mx-auto text-muted-foreground/60" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  No encontramos artículos
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Intenta con otra búsqueda o limpia los filtros.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="mt-5"
                >
                  Limpiar filtros
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginated.map((post) => (
                  <Card
                    key={post.id}
                    className="group border border-border/60 hover:border-primary/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer flex flex-col"
                  >
                    <div className="aspect-[3/2] overflow-hidden bg-muted relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider text-primary bg-background/90 backdrop-blur-sm rounded-full px-2.5 py-1">
                        {post.category}
                      </span>
                    </div>
                    <CardContent className="p-5 flex flex-col flex-1">
                      <h2 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>

                      <div className="mt-auto pt-4 border-t border-border/60 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-[11px] font-semibold inline-flex items-center justify-center shrink-0">
                            {authorInitials(post.author)}
                          </span>
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-foreground truncate">
                              {post.author}
                            </p>
                            <p className="text-[10px] text-muted-foreground truncate">
                              {formatDate(post.date)}
                            </p>
                          </div>
                        </div>
                        <span className="flex items-center gap-1 text-[11px] text-muted-foreground shrink-0">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Pagination */}
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
                        className={
                          page === 1
                            ? "pointer-events-none opacity-50"
                            : undefined
                        }
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }).map((_, i) => {
                      const n = i + 1;
                      const show =
                        n === 1 ||
                        n === totalPages ||
                        Math.abs(n - page) <= 1;
                      const showEllipsisBefore =
                        n === page - 2 && page - 2 > 1;
                      const showEllipsisAfter =
                        n === page + 2 && page + 2 < totalPages;
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
                          page === totalPages
                            ? "pointer-events-none opacity-50"
                            : undefined
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </section>

        {/* ── Newsletter CTA ── */}
        <section className="bg-primary/5 border-t border-border">
          <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-3">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                <Mail className="w-3.5 h-3.5" /> Newsletter
              </span>
              <h2 className="mt-3 text-2xl md:text-3xl font-bold text-foreground">
                Recibe nuestras novedades
              </h2>
              <p className="mt-2 text-muted-foreground">
                Artículos, análisis y noticias del sector financiero
                directamente en tu correo. Sin spam.
              </p>
            </div>
            <form
              className="md:col-span-2 flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                required
                placeholder="tu@correo.com"
                aria-label="Correo electrónico"
                className="flex-1"
              />
              <Button type="submit">Suscribirme</Button>
            </form>
          </div>
        </section>
      </article>
    </>
  );
}
