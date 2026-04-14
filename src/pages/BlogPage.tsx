import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
}

const posts: BlogPost[] = [
  {
    id: "1",
    title: "UniBank lanza nueva Cuenta Digital con apertura 100% en línea",
    excerpt: "Descubre cómo abrir tu cuenta desde la comodidad de tu hogar en minutos, sin papeleo ni filas.",
    date: "2026-04-10",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
    category: "Productos",
  },
  {
    id: "2",
    title: "5 consejos para mejorar tus finanzas personales en 2026",
    excerpt: "Aprende estrategias prácticas para ahorrar, invertir y proteger tu patrimonio este año.",
    date: "2026-04-05",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
    category: "Educación Financiera",
  },
  {
    id: "3",
    title: "UniBank recibe reconocimiento por innovación digital en Panamá",
    excerpt: "La Superintendencia de Bancos destaca a UniBank por sus avances en banca digital y experiencia del cliente.",
    date: "2026-03-28",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
    category: "Noticias",
  },
  {
    id: "4",
    title: "¿Qué es el leasing y cómo puede ayudar a tu empresa?",
    excerpt: "Conoce los beneficios del leasing financiero y operativo para impulsar el crecimiento de tu negocio.",
    date: "2026-03-20",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
    category: "Empresas",
  },
  {
    id: "5",
    title: "Invertis Global Income Fund: diversifica tu portafolio",
    excerpt: "Una opción de inversión diversificada con exposición a mercados globales y rendimientos competitivos.",
    date: "2026-03-15",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
    category: "Inversiones",
  },
  {
    id: "6",
    title: "UniBank inaugura nueva sucursal en David, Chiriquí",
    excerpt: "Expandimos nuestra presencia en el interior del país para estar más cerca de ti.",
    date: "2026-03-08",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
    category: "Noticias",
  },
];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("es-PA", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title>Noticias y Blog – UniBank</title>
        <meta name="description" content="Noticias, artículos y novedades financieras de UniBank Panamá." />
        <link rel="canonical" href="https://unibank.com.pa/blog" />
      </Helmet>

      <article className="min-h-screen">
        <div className="bg-muted/30 border-b border-border">
          <div className="max-w-4xl mx-auto px-6 py-20 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Noticias y Blog
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Mantente informado con las últimas noticias, consejos financieros y novedades de UniBank.
            </p>
          </div>
        </div>

        <section className="bg-background py-16 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="group border border-border/60 hover:border-primary/40 transition-colors duration-300 overflow-hidden cursor-pointer"
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-5">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    {post.category}
                  </span>
                  <h2 className="text-lg font-bold text-foreground mt-2 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarDays className="w-3.5 h-3.5" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </article>
    </>
  );
}
