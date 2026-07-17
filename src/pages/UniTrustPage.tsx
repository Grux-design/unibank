import { Helmet } from "react-helmet-async";
import {
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
  type Icon,
} from "@/lib/icons";
import { PageMasthead, StaticPageSection } from "@/components/organisms/StaticPageLayout";

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
  icon: Icon;
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
  icon: Icon;
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
  icon: Icon;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8 md:mb-10 flex flex-col items-start gap-3">
      <span className="type-section-tag gap-2">
        <Icon className="h-3.5 w-3.5" />
        {eyebrow}
      </span>
      <h2 className="type-content-section-headline text-foreground">{title}</h2>
      {description && (
        <p className="max-w-3xl text-sm md:text-base leading-relaxed text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

function PrimaryCTA({ label = "Solicite su asesoría fiduciaria" }: { label?: string }) {
  return (
    <a
      href={MAILTO_HREF}
      className="inline-flex w-full max-w-sm sm:w-auto items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5"
    >
      {label}
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
        <PageMasthead
          eyebrow={
            <>
              <Sparkles className="h-3.5 w-3.5" />
              Grupo UniBank · Fiduciaria
            </>
          }
          title="UniTrust"
          subtitle="Socio estratégico para la gestión y planificación de su patrimonio personal y empresarial."
        >
          <PrimaryCTA />
        </PageMasthead>

        <StaticPageSection bandIndex={0}>
          <div className="site-container">
            <div className="grid grid-cols-1 gap-8 min-[1200px]:grid-cols-5 min-[1200px]:items-center min-[1200px]:gap-10">
              <div className="order-2 min-[1200px]:order-1 min-[1200px]:col-span-3">
                <SectionHeader
                  icon={Landmark}
                  eyebrow="Sobre nosotros"
                  title="¿Qué es UniTrust?"
                />
                <p className="text-sm md:text-base lg:text-lg leading-relaxed text-muted-foreground">
                  Empresa fiduciaria subsidiaria del Grupo UniBank, que ofrece una amplia gama de
                  productos y servicios orientados a la gestión y protección de patrimonio personal y
                  empresarial, administración de activos y garantías para sus financiamientos,
                  brindándoles siempre asesoría personalizada, ágil y efectiva.
                </p>
              </div>
              <div className="order-1 min-[1200px]:order-2 min-[1200px]:col-span-2">
                <div className="group page-section-card relative overflow-hidden rounded-2xl md:rounded-3xl p-6 md:p-10 transition-all hover:border-primary/40 hover:shadow-lg">
                  <div className="relative">
                    <div className="mb-5 md:mb-6 inline-flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <ShieldCheck className="h-6 w-6 md:h-7 md:w-7" />
                    </div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                      Fiduciaria del Grupo UniBank
                    </h3>
                    <p className="mt-3 text-base md:text-lg font-medium leading-relaxed text-foreground">
                      Asesoría personalizada, ágil y efectiva para proteger lo que más importa.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </StaticPageSection>

        <StaticPageSection bandIndex={1}>
          <div className="site-container">
            <SectionHeader
              icon={Handshake}
              eyebrow="Nuestro Compromiso"
              title="Principios que guían nuestro servicio"
              description="Generar confianza, eficiencia y estructuras a la medida para nuestros clientes."
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
              {commitments.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="group page-section-card relative rounded-2xl p-5 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="mb-4 md:mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="type-item-title-sm text-foreground leading-snug">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </StaticPageSection>

        <StaticPageSection bandIndex={2}>
          <div className="site-container">
            <SectionHeader
              icon={Briefcase}
              eyebrow="Productos"
              title="Soluciones para salvaguardar su patrimonio"
              description="En UniTrust contamos con productos que le permitirán proteger y administrar su patrimonio de la mejor manera."
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
              {products.map(({ icon: Icon, name, body }) => (
                <div
                  key={name}
                  className="group page-section-card relative overflow-hidden rounded-2xl p-5 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="mb-4 md:mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="type-item-title-sm leading-snug text-foreground">{name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </StaticPageSection>

        <StaticPageSection bandIndex={3}>
          <div className="site-container text-center">
            <span className="type-section-tag gap-2">
              <Mail className="h-3.5 w-3.5" />
              Hablemos
            </span>
            <h2 className="mt-5 type-content-section-headline text-foreground">
              ¿Listo para proteger y planificar su patrimonio?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base leading-relaxed text-muted-foreground lg:text-lg">
              Nuestro equipo de UniTrust le brindará asesoría personalizada, ágil y confidencial
              según sus objetivos.
            </p>
            <div className="mt-8 flex justify-center">
              <PrimaryCTA label="Solicite su asesoría fiduciaria" />
            </div>
          </div>
        </StaticPageSection>
      </article>
    </>
  );
}
