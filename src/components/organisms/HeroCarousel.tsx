import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HeroSlideContent } from "@/components/molecules/HeroSlideContent";
import { HeroVisual } from "@/components/molecules/HeroVisual";
import type { Lang } from "@/components/layout/SiteLayout";

interface Slide {
  segment: { es: string; en: string };
  product: { es: string; en: string };
  headline: { es: string; en: string };
  body: { es: string; en: string };
  primaryLabel: { es: string; en: string };
  primaryHref: string;
  secondaryLabel: { es: string; en: string };
  secondaryHref: string;
  imageUrl: string;
  imageAlt: { es: string; en: string };
  badgeLabel: { es: string; en: string };
  statOverline: { es: string; en: string };
  statValue: string;
  statLabel: { es: string; en: string };
}

const slides: Slide[] = [
  {
    segment: { es: "Personas", en: "Personal" },
    product: { es: "Cuenta de Ahorros", en: "Savings Account" },
    headline: {
      es: "Tus ahorros, trabajando para ti desde el primer día.",
      en: "Your savings, working for you from day one.",
    },
    body: {
      es: "Abre tu cuenta de ahorros sin costo de mantenimiento y empieza a crecer con la mejor tasa del mercado.",
      en: "Open your savings account with no maintenance fee and start growing with the best market rate.",
    },
    primaryLabel: { es: "Abre tu cuenta", en: "Open account" },
    primaryHref: "/cuentas/ahorros",
    secondaryLabel: { es: "Ver beneficios", en: "See benefits" },
    secondaryHref: "/cuentas/ahorros#beneficios",
    imageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80&fit=crop",
    imageAlt: { es: "Mujer usando banca en línea desde su computadora", en: "Woman using online banking on her laptop" },
    badgeLabel: { es: "Producto destacado", en: "Featured product" },
    statOverline: { es: "Tasa anual efectiva", en: "Effective annual rate" },
    statValue: "4.5%",
    statLabel: { es: "TEA garantizada", en: "Guaranteed TEA" },
  },
  {
    segment: { es: "Empresas", en: "Business" },
    product: { es: "UniLeasing", en: "UniLeasing" },
    headline: {
      es: "La maquinaria que tu negocio necesita, cuando la necesita.",
      en: "The equipment your business needs, when it needs it.",
    },
    body: {
      es: "Financia el 100% de tus activos productivos con cuotas fijas y beneficios fiscales inmediatos.",
      en: "Finance 100% of your productive assets with fixed installments and immediate tax benefits.",
    },
    primaryLabel: { es: "Solicitar ahora", en: "Apply now" },
    primaryHref: "/empresas/leasing",
    secondaryLabel: { es: "Calcular cuota", en: "Calculate installment" },
    secondaryHref: "/empresas/leasing#calculadora",
    imageUrl:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80&fit=crop",
    imageAlt: { es: "Maquinaria industrial en operación", en: "Industrial machinery in operation" },
    badgeLabel: { es: "Producto destacado", en: "Featured product" },
    statOverline: { es: "Financiamiento", en: "Financing" },
    statValue: "100%",
    statLabel: { es: "Del valor del activo", en: "Of asset value" },
  },
  {
    segment: { es: "Empresas", en: "Business" },
    product: { es: "Cuenta Corriente", en: "Checking Account" },
    headline: {
      es: "El control total de tu empresa, en tiempo real.",
      en: "Total control of your business, in real time.",
    },
    body: {
      es: "Administra pagos, nóminas y transferencias desde una plataforma empresarial diseñada para crecer contigo.",
      en: "Manage payments, payroll and transfers from a business platform designed to grow with you.",
    },
    primaryLabel: { es: "Abre tu cuenta", en: "Open account" },
    primaryHref: "/empresas/cuenta-corriente",
    secondaryLabel: { es: "Conocer más", en: "Learn more" },
    secondaryHref: "/empresas/cuenta-corriente#detalles",
    imageUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80&fit=crop",
    imageAlt: { es: "Equipo empresarial revisando reportes financieros", en: "Business team reviewing financial reports" },
    badgeLabel: { es: "Producto destacado", en: "Featured product" },
    statOverline: { es: "Disponible", en: "Available" },
    statValue: "24/7",
    statLabel: { es: "Banca digital", en: "Digital banking" },
  },
  {
    segment: { es: "Personas", en: "Personal" },
    product: { es: "Crédito Hipotecario", en: "Mortgage" },
    headline: {
      es: "El hogar que siempre soñaste, con el financiamiento que mereces.",
      en: "The home you always dreamed of, with the financing you deserve.",
    },
    body: {
      es: "Plazos de hasta 30 años, tasas competitivas y un proceso de aprobación ágil para que entres pronto.",
      en: "Terms of up to 30 years, competitive rates and an agile approval process so you move in soon.",
    },
    primaryLabel: { es: "Simular préstamo", en: "Simulate loan" },
    primaryHref: "/credito/hipotecario",
    secondaryLabel: { es: "Hablar con un asesor", en: "Talk to an advisor" },
    secondaryHref: "/contact",
    imageUrl:
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&q=80&fit=crop",
    imageAlt: { es: "Familia feliz frente a su nuevo hogar", en: "Happy family in front of their new home" },
    badgeLabel: { es: "Producto destacado", en: "Featured product" },
    statOverline: { es: "Plazo máximo", en: "Maximum term" },
    statValue: "30",
    statLabel: { es: "Años de financiamiento", en: "Years of financing" },
  },
];

interface HeroCarouselProps {
  lang: Lang;
}

export function HeroCarousel({ lang }: HeroCarouselProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReduced = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const total = slides.length;

  const goTo = useCallback(
    (index: number) => {
      setActive(((index % total) + total) % total);
    },
    [total]
  );

  const prev = () => goTo(active - 1);
  const next = () => goTo(active + 1);

  // Auto-advance
  useEffect(() => {
    if (paused || prefersReduced.current) return;
    const id = setInterval(() => goTo(active + 1), 5000);
    return () => clearInterval(id);
  }, [active, paused, goTo]);

  const slide = slides[active];

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, hsl(30 80% 97%) 0%, hsl(22 80% 93%) 100%)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label={lang === "es" ? "Productos destacados" : "Featured products"}
    >
      {/* Slide container */}
      <div
        className="mx-auto flex max-w-screen-xl flex-col items-center gap-10 px-4 py-12 sm:px-6 lg:flex-row lg:gap-16 lg:py-20 xl:py-24"
        aria-live="polite"
        aria-atomic="true"
      >
        {/* Content — left */}
        <div className="flex-1 pt-4 lg:pt-0">
          <HeroSlideContent
            segment={slide.segment[lang]}
            product={slide.product[lang]}
            headline={slide.headline[lang]}
            body={slide.body[lang]}
            primaryLabel={slide.primaryLabel[lang]}
            primaryHref={slide.primaryHref}
            secondaryLabel={slide.secondaryLabel[lang]}
            secondaryHref={slide.secondaryHref}
          />

          {/* Controls row */}
          <div className="mt-10 flex items-center gap-5">
            {/* Prev/Next */}
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 bg-background/80 text-foreground hover:border-primary hover:text-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={lang === "es" ? "Anterior" : "Previous"}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 bg-background/80 text-foreground hover:border-primary hover:text-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={lang === "es" ? "Siguiente" : "Next"}
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Dots */}
            <div className="flex gap-2" role="tablist" aria-label={lang === "es" ? "Diapositivas" : "Slides"}>
              {slides.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`${lang === "es" ? "Diapositiva" : "Slide"} ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    i === active ? "w-6 bg-primary" : "w-2 bg-foreground/25 hover:bg-foreground/40"
                  }`}
                />
              ))}
            </div>

            {/* Counter */}
            <span className="ml-auto font-mono text-xs font-semibold text-foreground/40 tabular-nums">
              {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Visual — right */}
        <div className="w-full flex-shrink-0 lg:w-auto">
          <HeroVisual
            imageUrl={slide.imageUrl}
            imageAlt={slide.imageAlt[lang]}
            badgeLabel={slide.badgeLabel[lang]}
            badgeProduct={slide.product[lang]}
            statOverline={slide.statOverline[lang]}
            statValue={slide.statValue}
            statLabel={slide.statLabel[lang]}
            totalSlides={total}
            activeSlide={active}
          />
        </div>
      </div>
    </section>
  );
}
