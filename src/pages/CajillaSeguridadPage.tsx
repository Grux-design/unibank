import { Helmet } from "react-helmet-async";
import {
  ChevronRight,
  ShieldCheck,
  Lock,
  DoorOpen,
  UserCheck,
  Landmark,
  Check,
  Box,
  KeyRound,
  Eye,
  Sparkles,
  Mail,
} from "@/lib/icons";
import { Button } from "@/components/ui/button";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400";
const VAULT_IMAGE =
  "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Máxima seguridad",
    desc: "Bóveda protegida mediante monitoreo permanente con cámaras especializadas.",
  },
  {
    icon: Lock,
    title: "Confidencialidad total",
    desc: "Acceso privado y controlado en cada visita a tu cajilla.",
  },
  {
    icon: DoorOpen,
    title: "Sala exclusiva",
    desc: "Espacio diseñado para que accedas a tu cajilla con comodidad y discreción.",
  },
  {
    icon: UserCheck,
    title: "Atención personalizada",
    desc: "Acompañamiento de personal capacitado durante el uso del servicio.",
  },
  {
    icon: Landmark,
    title: "Respaldo bancario",
    desc: "Tus pertenencias resguardadas por una institución sólida y confiable.",
  },
];

const sizes = [
  { dims: "5\" × 10\" × 24\"", label: "Tamaño estándar", desc: "Ideal para documentos importantes, escrituras, joyería esencial y artículos de valor compactos." },
  { dims: "10\" × 10\" × 24\"", label: "Tamaño amplio", desc: "Mayor capacidad para colecciones, documentos voluminosos y objetos de valor de mayor tamaño." },
];

export default function CajillaSeguridadPage() {
  return (
    <>
      <Helmet>
        <title>Cajilla de Seguridad | Unibank</title>
        <meta
          name="description"
          content="Resguarda tus documentos, joyas y objetos de valor en las Cajillas de Seguridad de UniBank. Bóveda protegida, sala exclusiva y atención personalizada."
        />
        <meta property="og:title" content="Cajilla de Seguridad | Unibank" />
        <meta
          property="og:description"
          content="Protege lo que más valoras con el servicio de Cajillas de Seguridad de UniBank."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="bg-background pt-20 pb-10 md:pt-28 md:pb-16 lg:pt-32">
        <div className="site-container">
          <div className="grid grid-cols-1 gap-8 min-[1200px]:grid-cols-2 min-[1200px]:items-center min-[1200px]:gap-12">
            <div className="order-2 min-[1200px]:order-1">
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                style={{ background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary))" }}
              >
                <ShieldCheck size={14} />
                Servicio exclusivo
              </span>
              <h1
                className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground"
                style={{ letterSpacing: "-0.025em", lineHeight: 1.05 }}
              >
                Cajillas de Seguridad
              </h1>
              <p className="mt-5 text-xl sm:text-2xl md:text-3xl font-semibold text-primary" style={{ letterSpacing: "-0.015em" }}>
                Protege lo que más valoras
              </p>
              <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                En UniBank entendemos que tus pertenencias más valiosas merecen el más alto nivel de
                protección. Por eso, ponemos a tu disposición nuestro servicio de Cajillas de Seguridad,
                diseñado para resguardar documentos importantes, joyas y objetos de valor con total
                confidencialidad y seguridad.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#contacto" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto px-7 h-12 text-base font-semibold">
                    Solicitar información
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
            <div className="relative order-1 min-[1200px]:order-2">
              <div
                className="overflow-hidden rounded-[20px] md:rounded-[28px] shadow-xl"
                style={{ aspectRatio: "4 / 3" }}
              >
                <img
                  src={HERO_IMAGE}
                  alt="Bóveda de seguridad bancaria UniBank"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ¿Qué es? ────────────────────────────────────────── */}
      <section className="bg-background py-12 md:py-20">
        <div className="site-container grid gap-10 md:gap-16 md:grid-cols-12 items-center">
          <div className="md:col-span-5 relative">
            <div
              className="absolute -top-6 -left-6 w-32 h-32 rounded-full hidden md:block"
              style={{ background: "hsl(var(--primary) / 0.08)" }}
              aria-hidden
            />
            <div
              className="absolute -bottom-8 -right-4 w-24 h-24 rounded-3xl rotate-12 hidden md:block"
              style={{ background: "hsl(var(--primary) / 0.12)" }}
              aria-hidden
            />
            <div
              className="relative overflow-hidden rounded-[20px] md:rounded-[28px] shadow-xl"
              style={{ aspectRatio: "4 / 5" }}
            >
              <img
                src="https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900"
                alt="Llave dorada de cajilla de seguridad bancaria"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 flex items-center gap-3 bg-background/95 backdrop-blur rounded-2xl p-4 shadow-lg">
                <div
                  className="flex items-center justify-center rounded-xl flex-shrink-0"
                  style={{
                    width: 44,
                    height: 44,
                    background: "hsl(var(--primary))",
                    color: "hsl(var(--primary-foreground))",
                  }}
                >
                  <KeyRound size={22} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider font-semibold text-primary">
                    Acceso exclusivo
                  </p>
                  <p className="text-sm font-semibold text-foreground leading-tight">
                    Solo tú y tu llave
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{ background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary))" }}
            >
              <Sparkles size={14} />
              El servicio
            </span>
            <h2
              className="mt-5 text-2xl sm:text-3xl md:text-5xl font-extrabold text-foreground leading-[1.05]"
              style={{ letterSpacing: "-0.03em" }}
            >
              ¿Qué es una <span className="text-primary">Cajilla de Seguridad</span>?
            </h2>
            <p className="mt-6 text-base md:text-xl text-muted-foreground leading-relaxed">
              Un servicio de arrendamiento que te permite guardar tus bienes más preciados dentro de una
              bóveda bancaria altamente protegida, con acceso{" "}
              <span className="font-semibold text-foreground">exclusivo y controlado</span> para tu
              tranquilidad.
            </p>

            <div className="mt-8 md:mt-10 grid grid-cols-3 gap-3 md:gap-6">
              {[
                { icon: ShieldCheck, label: "Bóveda blindada", value: "24/7" },
                { icon: Eye, label: "Monitoreo permanente", value: "100%" },
                { icon: Lock, label: "Acceso privado", value: "Solo tú" },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-border bg-background p-3 sm:p-4 md:p-5 hover:border-primary/40 transition-colors"
                >
                  <Icon size={20} className="text-primary mb-2 md:mb-3 md:w-[22px] md:h-[22px]" strokeWidth={2} />
                  <p className="text-lg sm:text-xl md:text-3xl font-extrabold text-foreground leading-none" style={{ letterSpacing: "-0.02em" }}>
                    {value}
                  </p>
                  <p className="mt-1.5 md:mt-2 text-[10px] sm:text-xs md:text-sm text-muted-foreground leading-snug">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Beneficios ──────────────────────────────────────── */}
      <section className="bg-orange-50 py-12 md:py-20">
        <div className="site-container">
          <div className="text-center mb-8 md:mb-12">
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground"
              style={{ letterSpacing: "-0.025em" }}
            >
              Beneficios del servicio
            </h2>
            <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              Diseñado para brindarte tranquilidad absoluta sobre tus bienes más importantes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex flex-col gap-4 p-5 sm:p-6 md:p-8 bg-background rounded-[20px] md:rounded-[28px] hover:shadow-lg transition-shadow"
              >
                <div
                  className="flex items-center justify-center rounded-2xl"
                  style={{
                    width: 56,
                    height: 56,
                    background: "hsl(var(--primary) / 0.1)",
                    color: "hsl(var(--primary))",
                  }}
                >
                  <Icon size={28} strokeWidth={2} />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-foreground">{title}</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tamaños disponibles ─────────────────────────────── */}
      <section className="bg-muted py-12 md:py-20">
        <div className="site-container flex flex-col md:flex-row gap-8 md:gap-16 items-start">
          <div className="md:w-2/5 md:sticky md:top-28">
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground leading-tight"
              style={{ letterSpacing: "-0.025em" }}
            >
              Tamaños disponibles
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">
              UniBank ofrece diferentes tamaños de cajillas para adaptarse a tus necesidades.
            </p>
            <div className="mt-8 overflow-hidden rounded-[24px] shadow-md hidden md:block">
              <img
                src={VAULT_IMAGE}
                alt="Cajillas de seguridad UniBank"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="md:w-3/5 flex flex-col gap-4 md:gap-5 w-full">
            {sizes.map((s) => (
              <div
                key={s.dims}
                className="bg-background rounded-2xl p-5 md:p-7 flex flex-col sm:flex-row items-start gap-4 sm:gap-5 w-full"
              >
                <div
                  className="flex items-center justify-center rounded-xl flex-shrink-0"
                  style={{
                    width: 72,
                    height: 72,
                    background: "hsl(var(--primary) / 0.08)",
                    color: "hsl(var(--primary))",
                  }}
                >
                  <Box size={32} strokeWidth={1.75} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider font-semibold text-primary mb-1">
                    {s.label}
                  </p>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">{s.dims}</h3>
                  <p className="text-sm md:text-base text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Requisitos ──────────────────────────────────────── */}
      <section className="bg-background py-12 md:py-20">
        <div className="site-container">
          <div className="text-center mb-8 md:mb-10">
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground"
              style={{ letterSpacing: "-0.025em" }}
            >
              Requisitos
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              "Mantener una cuenta activa en UniBank.",
              "El arrendamiento de la cajilla es a título personal.",
            ].map((req) => (
              <div
                key={req}
                className="flex items-start gap-4 p-5 md:p-6 rounded-2xl border border-border bg-background"
              >
                <div
                  className="flex items-center justify-center rounded-full flex-shrink-0"
                  style={{
                    width: 36,
                    height: 36,
                    background: "hsl(var(--primary))",
                    color: "hsl(var(--primary-foreground))",
                  }}
                >
                  <Check size={18} strokeWidth={3} />
                </div>
                <p className="text-foreground text-sm md:text-base font-medium leading-relaxed pt-1">{req}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA final ───────────────────────────────────────── */}
      <section id="contacto" className="border-t border-border bg-orange-50 py-12 md:py-20">
        <div className="site-container text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
            <Mail className="h-3.5 w-3.5" />
            Hablemos
          </span>
          <h2 className="mt-5 text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            ¿Listo para resguardar lo que más valoras?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base leading-relaxed text-muted-foreground lg:text-lg">
            Solicita este exclusivo servicio a través de tu Gerente de Relación o visitando
            nuestra Casa Matriz en Avenida Balboa, planta baja del edificio Grand Bay Tower.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="https://api.whatsapp.com/send?phone=50763280229&text=%C2%A1Hola!,%20Tengo%20una%20Consulta%20sobre%20Cajillas%20de%20Seguridad"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full max-w-sm sm:w-auto items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Solicitar información
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
