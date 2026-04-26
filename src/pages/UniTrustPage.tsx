import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  Mail,
  Landmark,
  Sparkles,
  Handshake,
  Settings2,
  Zap,
  Lock,
  Shield,
  Briefcase,
  TrendingUp,
  Building2,
  ShieldCheck,
  KeyRound,
  type LucideIcon,
} from "lucide-react";

const MAIL_TO = "unitrust@unibank.com.pa";
const MAIL_SUBJECT = "Solicitud de asesoría — UniTrust";
const MAIL_BODY = `Hola equipo de UniTrust,

Me interesa recibir asesoría sobre los servicios fiduciarios que ofrecen. Por favor contáctenme para conversar sobre las siguientes necesidades:

[Describa brevemente su caso]

Datos de contacto:
Nombre:
Teléfono:
Correo:

Gracias.`;

const MAILTO_HREF = `mailto:${MAIL_TO}?subject=${encodeURIComponent(
  MAIL_SUBJECT,
)}&body=${encodeURIComponent(MAIL_BODY)}`;

interface Commitment {
  icon: LucideIcon;
  title: string;
  body: string;
}

const commitments: Commitment[] = [
  {
    icon: Handshake,
    title: "Confianza e imparcialidad",
    body: "Generamos confianza administrando bienes con imparcialidad y total transparencia.",
  },
  {
    icon: Settings2,
    title: "Estructuras a la medida",
    body: "Diseñamos estructuras fiduciarias adaptadas a las necesidades de cada cliente.",
  },
  {
    icon: Zap,
    title: "Eficiencia operativa",
    body: "Procesos ágiles de estructuración y administración, con respuestas oportunas.",
  },
  {
    icon: Lock,
    title: "Atención y confidencialidad",
    body: "Atención personalizada y confidencialidad asegurando la lealtad de nuestros clientes.",
  },
];

interface Product {
  icon: LucideIcon;
  name: string;
  body: string;
}

const products: Product[] = [
  {
    icon: Shield,
    name: "Fideicomiso de Garantía",
    body: "Respalda obligaciones financieras con un vehículo seguro y transparente.",
  },
  {
    icon: Briefcase,
    name: "Fideicomiso de Administración",
    body: "Gestión profesional de bienes y activos bajo lineamientos claros.",
  },
  {
    icon: TrendingUp,
    name: "Fideicomiso de Inversión",
    body: "Estructuras dedicadas a la administración eficiente de inversiones.",
  },
  {
    icon: Building2,
    name: "Fideicomiso de Desarrollo Inmobiliario",
    body: "Soporte fiduciario para proyectos inmobiliarios de cualquier escala.",
  },
  {
    icon: ShieldCheck,
    name: "Fideicomiso Protección Patrimonial",
    body: "Salvaguarda y planificación patrimonial para personas y familias.",
  },
  {
    icon: KeyRound,
    name: "Escrow",
    body: "Custodia de fondos y documentos bajo condiciones predefinidas.",
  },
];

function SectionHeader({
  icon: Icon,
  eyebrow,
  title,
  description,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10 flex flex-col items-start gap-3">
      <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
        <Icon className="h-3.5 w-3.5" />
        {eyebrow}
      </span>
      <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">{title}</h2>
      {description && (
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

function PrimaryCTA({ label = "Solicite su asesoría fiduciaria" }: { label?: string }) {
  return (
    <a
      href={MAILTO_HREF}
      className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
    >
      <Mail className="h-4 w-4" />
      {label}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

export default function UniTrustPage() {
  return (
    <>
      <Helmet>
        <title>UniTrust | Grupo UniBank</title>
        <meta
          name="description"
          content="UniTrust, empresa fiduciaria del Grupo UniBank: socio estratégico para la gestión, administración y protección de su patrimonio personal y empresarial."
        />
      </Helmet>

      <article className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-muted/40 via-background to-background">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
          />
          <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Grupo UniBank · Fiduciaria
            </span>
            <h1 className="mt-5 max-w-3xl text-5xl font-extrabold leading-tight tracking-tight text-foreground md:text-7xl">
              UniTrust
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Socio estratégico para la gestión y planificación de su patrimonio personal y
              empresarial.
            </p>
            <div className="mt-8">
              <PrimaryCTA />
            </div>
          </div>
        </section>

        {/* ¿Qué es UniTrust? */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-10 md:grid-cols-5 md:items-center">
            <div className="md:col-span-3">
              <SectionHeader
                icon={Landmark}
                eyebrow="Sobre nosotros"
                title="¿Qué es UniTrust?"
              />
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                Empresa fiduciaria subsidiaria del Grupo UniBank, que ofrece una amplia gama de
                productos y servicios orientados a la gestión y protección de patrimonio personal y
                empresarial, administración de activos y garantías para sus financiamientos,
                brindándoles siempre asesoría personalizada, ágil y efectiva.
              </p>
            </div>
            <div className="md:col-span-2">
              <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-10 transition-all hover:border-primary/40 hover:shadow-lg">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-2xl"
                />
                <div className="relative">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <ShieldCheck className="h-7 w-7" />
                  </div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                    Fiduciaria del Grupo UniBank
                  </h3>
                  <p className="mt-3 text-lg font-medium leading-relaxed text-foreground">
                    Asesoría personalizada, ágil y efectiva para proteger lo que más importa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nuestro Compromiso */}
        <section className="border-t border-border bg-muted/30">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <SectionHeader
              icon={Handshake}
              eyebrow="Nuestro Compromiso"
              title="Principios que guían nuestro servicio"
              description="Generar confianza, eficiencia y estructuras a la medida para nuestros clientes."
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {commitments.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="group relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-semibold leading-snug text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Productos */}
        <section>
          <div className="mx-auto max-w-6xl px-6 py-20">
            <SectionHeader
              icon={Briefcase}
              eyebrow="Productos"
              title="Soluciones para salvaguardar su patrimonio"
              description="En UniTrust contamos con productos que le permitirán proteger y administrar su patrimonio de la mejor manera."
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map(({ icon: Icon, name, body }) => (
                <div
                  key={name}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold leading-snug text-foreground">{name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="border-t border-border bg-gradient-to-br from-primary/10 via-primary/5 to-background">
          <div className="mx-auto max-w-5xl px-6 py-20 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
              <Mail className="h-3.5 w-3.5" />
              Hablemos
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              ¿Listo para proteger y planificar su patrimonio?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Nuestro equipo de UniTrust le brindará asesoría personalizada, ágil y confidencial
              según sus objetivos.
            </p>
            <div className="mt-8 flex justify-center">
              <PrimaryCTA label="Solicite su asesoría fiduciaria" />
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
