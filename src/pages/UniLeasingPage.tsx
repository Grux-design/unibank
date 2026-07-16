import { Helmet } from "react-helmet-async";
import { useState } from "react";
import {
  Mail,
  Sparkles,
  Package,
  Sun,
  Car,
  Stethoscope,
  Monitor,
  Truck,
  CheckCircle2,
  Receipt,
  Wallet,
  ShieldOff,
  CalendarClock,
  Zap,
  Leaf,
  Lightbulb,
  Rocket,
  type Icon,
} from "@/lib/icons";

const MAIL_TO = "unileasing@unibank.com.pa";
const MAIL_SUBJECT = "Solicitud de información — Uni Leasing";
const MAIL_BODY = `Hola equipo de Uni Leasing,

Me interesa recibir información sobre las opciones de leasing que ofrecen para adquirir activos para mi empresa.

Datos de contacto:
Nombre:
Empresa:
Teléfono:
Correo:

Activo o equipo de interés:

Gracias.`;

const MAILTO_HREF = `mailto:${MAIL_TO}?subject=${encodeURIComponent(
  MAIL_SUBJECT,
)}&body=${encodeURIComponent(MAIL_BODY)}`;

interface Item {
  icon: Icon;
  title: string;
  body: string;
}

const acquisitions: Item[] = [
  {
    icon: Sun,
    title: "Paneles solares y movilidad eléctrica",
    body: "Paneles solares, autos eléctricos e híbridos para una operación más sostenible.",
  },
  {
    icon: Car,
    title: "Vehículos y equipo pesado",
    body: "Para uso particular, comercial y equipo pesado de cualquier industria.",
  },
  {
    icon: Stethoscope,
    title: "Equipos médicos, industriales y agropecuarios",
    body: "Soluciones especializadas para los sectores productivos del país.",
  },
  {
    icon: Monitor,
    title: "Tecnología y mobiliario de oficina",
    body: "Equipos electrónicos, tecnológicos y mobiliario para su lugar de trabajo.",
  },
  {
    icon: Truck,
    title: "Equipos Usados",
    body: "Activos previamente evaluados para su financiamiento mediante leasing, garantizando respaldo y viabilidad.",
  },
];

const advantages: Item[] = [
  {
    icon: Receipt,
    title: "Mensualidades deducibles de impuesto sobre la ISR.",
    body: "Beneficios fiscales que optimizan el flujo de caja de su empresa.",
  },
  {
    icon: Wallet,
    title: "Financiamiento hasta el 100%*",
    body: "Hasta el 100% del valor del equipo, sin comprometer su capital de trabajo.",
  },
  {
    icon: ShieldOff,
    title: "Letras exenta de FECI",
    body: "Estructura tributaria favorable para su empresa.",
  },
  {
    icon: CalendarClock,
    title: "Plazos Accesibles",
    body: "Plazos diseñados para ajustarse a la capacidad de pago y proyección de su negocio.",
  },
  {
    icon: Zap,
    title: "Atención rápida y personalizada",
    body: "Procesos ágiles con un asesor dedicado en cada paso.",
  },
];

function SectionHeader({
  icon: Icon,
  eyebrow,
  title,
  description,
}: {
  icon: Icon;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8 md:mb-10 flex flex-col items-start gap-3">
      <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
        <Icon className="h-3.5 w-3.5" />
        {eyebrow}
      </span>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">{title}</h2>
      {description && (
        <p className="max-w-3xl text-sm md:text-base leading-relaxed text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

function PrimaryCTA({ label = "Solicite su financiamiento" }: { label?: string }) {
  return (
    <a
      href={MAILTO_HREF}
      className="inline-flex w-full max-w-sm sm:w-auto items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
    >
      {label}
    </a>
  );
}

function FeatureCard({ icon: Icon, title, body }: Item) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
      <div className="mb-4 md:mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold leading-snug text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

interface FlipCardItem {
  frontIcon: Icon;
  backIcon: Icon;
  label: string;
  backLabel: string;
}

const sustainabilityCards: FlipCardItem[] = [
  { frontIcon: Sun, backIcon: Sun, label: "Energía renovable", backLabel: "Paneles solares" },
  { frontIcon: Car, backIcon: Car, label: "Movilidad eléctrica", backLabel: "Auto híbrido" },
  { frontIcon: Leaf, backIcon: Lightbulb, label: "Proyectos verdes", backLabel: "Iluminarias LED" },
  { frontIcon: Zap, backIcon: Rocket, label: "Innovación", backLabel: "Tecnología limpia" },
];

function FlipCard({ frontIcon: Front, backIcon: Back, label, backLabel }: FlipCardItem) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="group h-32 [perspective:1000px]"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((value) => !value)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setFlipped((value) => !value);
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
    >
      <div
        className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <div className="absolute inset-0 flex flex-col items-start gap-3 rounded-2xl border border-border bg-card/80 p-5 backdrop-blur-sm [backface-visibility:hidden]">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Front className="h-5 w-5" />
          </div>
          <span className="text-sm font-semibold leading-snug text-foreground">{label}</span>
        </div>
        <div className="absolute inset-0 flex flex-col items-start justify-between rounded-2xl border border-primary/40 bg-primary p-5 text-primary-foreground [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <Back className="h-7 w-7" />
          <span className="text-sm font-semibold leading-snug">{backLabel}</span>
        </div>
      </div>
    </div>
  );
}

export default function UniLeasingPage() {
  return (
    <>
      <Helmet>
        <title>Uni Leasing | Grupo UniBank</title>
        <meta
          name="description"
          content="Uni Leasing del Grupo UniBank: financiamiento ágil para adquirir vehículos, equipos médicos, industriales, tecnológicos y soluciones sostenibles para su empresa."
        />
      </Helmet>

      <article className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border bg-background pt-20 pb-10 md:pt-28 md:pb-16 lg:pt-32 lg:pb-20">
          <div className="relative site-container">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Grupo UniBank · Leasing
            </span>
            <h1 className="mt-5 max-w-3xl text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight text-foreground">
              Uni Leasing
            </h1>
            <p className="mt-6 max-w-2xl text-base md:text-lg lg:text-xl leading-relaxed text-muted-foreground">
              Adquiera los activos que su empresa necesita, con financiamiento flexible y atención
              personalizada.
            </p>
            <div className="mt-8">
              <PrimaryCTA />
            </div>
          </div>
        </section>

        {/* ¿Qué puedo adquirir? */}
        <section className="py-12 md:py-20">
          <div className="site-container">
            <SectionHeader
              icon={Package}
              eyebrow="¿Qué puedo adquirir?"
              title="Activos que impulsan su empresa"
              description="Uni Leasing financia una amplia variedad de bienes para potenciar la operación y el crecimiento de su negocio."
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
              {acquisitions.map((item) => (
                <FeatureCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </section>

        {/* Ventajas */}
        <section className="border-t border-border bg-muted/30 py-12 md:py-20">
          <div className="site-container">
            <SectionHeader
              icon={CheckCircle2}
              eyebrow="Ventajas del Leasing"
              title="Beneficios pensados para su negocio"
              description="Optimice su flujo de caja y proteja su capital con una estructura financiera diseñada para empresas."
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
              {advantages.map((item) => (
                <FeatureCard key={item.title} {...item} />
              ))}
            </div>
            <p className="mt-6 md:mt-8 text-xs text-muted-foreground">
              *Sujeto a evaluación crediticia y a las condiciones del producto.
            </p>
          </div>
        </section>

        {/* Sostenibilidad */}
        <section className="py-12 md:py-20">
          <div className="site-container">
            <div className="mb-8 md:mb-10 flex flex-col items-start gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
                <Leaf className="h-3.5 w-3.5" />
                Sostenibilidad
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                Uni Leasing promoviendo la sostenibilidad
              </h2>
            </div>
            <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-border bg-orange-50 p-6 md:p-10 lg:p-14">
              <div className="relative grid grid-cols-1 gap-8 min-[1200px]:grid-cols-5 min-[1200px]:items-center min-[1200px]:gap-10">
                <div className="order-2 min-[1200px]:order-1 min-[1200px]:col-span-3">
                  <p className="text-sm md:text-base lg:text-lg leading-relaxed text-muted-foreground">
                    A través del financiamiento de paneles solares, autos eléctricos e híbridos y
                    préstamos para proyectos verdes, impulsamos el uso de fuentes de energía
                    renovables, fomentamos la competitividad de empresas verdes e invertimos en
                    innovación y desarrollo de proyectos sostenibles.
                  </p>
                </div>
                <div className="order-1 min-[1200px]:order-2 min-[1200px]:col-span-2">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {sustainabilityCards.map((card) => (
                      <FlipCard key={card.label} {...card} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="border-t border-border bg-orange-50 py-12 md:py-20">
          <div className="site-container text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
              <Mail className="h-3.5 w-3.5" />
              Hablemos
            </span>
            <h2 className="mt-5 text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              ¿Listo para impulsar el crecimiento de su empresa?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base leading-relaxed text-muted-foreground lg:text-lg">
              Nuestro equipo de Uni Leasing le brindará una propuesta a la medida de sus necesidades.
            </p>
            <div className="mt-8 flex justify-center">
              <PrimaryCTA label="Solicite su financiamiento" />
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
