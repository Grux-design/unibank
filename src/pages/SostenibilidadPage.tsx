import { Helmet } from "react-helmet-async";
import { Leaf, Sprout, Recycle, Users, ChevronRight, BadgeCheck } from "@/lib/icons";
import { PageMasthead, StaticPageSection } from "@/components/organisms/StaticPageLayout";

const pillars = [
  {
    icon: Sprout,
    title: "Finanzas sostenibles",
    desc: "Productos y prácticas alineadas al desarrollo sostenible.",
  },
  {
    icon: Users,
    title: "Inclusión social",
    desc: "Acceso, equidad y bienestar en las comunidades donde operamos.",
  },
  {
    icon: Recycle,
    title: "Medio ambiente",
    desc: "Conservación de recursos naturales en cada operación.",
  },
] as const;

export default function SostenibilidadPage() {
  return (
    <>
      <Helmet>
        <title>Sostenibilidad | UniBank</title>
        <meta
          name="description"
          content="Conoce el compromiso de Grupo UniBank con la sostenibilidad: prácticas financieras responsables, inclusión social y los primeros Bonos Verdes de capital panameño."
        />
      </Helmet>

      <article className="min-h-screen bg-background">
        <PageMasthead
          eyebrow={
            <>
              <Leaf className="h-3.5 w-3.5" />
              ESG
            </>
          }
          title="Sostenibilidad"
          subtitle="Nuestro compromiso con el medio ambiente y la sociedad guía cada decisión que tomamos como grupo financiero."
        >
          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {pillars.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="page-section-card flex flex-col gap-2 rounded-xl p-4 sm:p-5"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="type-item-title-sm text-foreground">{title}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </PageMasthead>

        <StaticPageSection bandIndex={0}>
          <div className="site-container">
          <div className="mb-8 md:mb-10">
            <span className="type-section-tag gap-2">
              Nuestro compromiso
            </span>
            <h2 className="mt-4 type-content-section-headline text-foreground">
              Decisiones responsables, impacto positivo
            </h2>
          </div>
          <p className="text-sm md:text-base lg:text-lg leading-relaxed text-muted-foreground">
            En Grupo UniBank, creemos firmemente en la importancia de la sostenibilidad como norte
            en todas nuestras acciones. Reconocemos que el futuro de nuestro planeta depende de
            decisiones responsables y conscientes. Por eso, nos comprometemos a promover prácticas
            financieras sostenibles, fomentar la inclusión social y respetar el medio ambiente en
            todas nuestras operaciones. Nuestro enfoque en la sostenibilidad nos impulsa a buscar
            soluciones innovadoras que equilibren el crecimiento económico con la conservación de
            los recursos naturales, generando así un impacto positivo tanto para nuestras
            comunidades como para las futuras generaciones.
          </p>

          {/* Pillars */}
          <div className="mt-10 md:mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            {pillars.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group page-section-card rounded-2xl p-5 md:p-6 transition-all hover:-translate-y-1 hover:border-primary/40"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="type-card-title text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
          </div>
        </StaticPageSection>

        <StaticPageSection bandIndex={1}>
          <div className="site-container">
            <div className="grid grid-cols-1 gap-8 min-[1200px]:grid-cols-2 min-[1200px]:items-center min-[1200px]:gap-10">
              <div className="order-2 min-[1200px]:order-1">
                <span className="type-section-tag gap-2">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  Hito histórico
                </span>
                <h2 className="mt-4 type-content-section-headline text-foreground">
                  Bonos Verdes
                </h2>
                <p className="mt-5 text-sm md:text-base lg:text-lg leading-relaxed text-muted-foreground">
                  Reconocemos la gran importancia de los bonos verdes en nuestra estrategia
                  financiera, siendo el{" "}
                  <span className="font-semibold text-foreground">
                    primer grupo financiero de capital panameño
                  </span>{" "}
                  en emitir una serie de Bonos Verdes en el mercado y registrado en la Bolsa
                  Latinoamericana de Valores. Estos bonos nos permiten invertir de manera específica
                  en proyectos alineados con el desarrollo sostenible, bajo un enfoque en energías
                  renovables y eficiencia energética.
                </p>

                <a
                  href="https://www.flipsnack.com/unibankpanama/marco-de-referencia-bono-verde-unileasing/full-view.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex w-full max-w-sm sm:w-auto items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-95"
                >
                  Conoce nuestro Marco de Referencia
                  <ChevronRight className="h-4 w-4" />
                </a>
                <p className="mt-3 text-xs text-muted-foreground">
                  Emitido por Uni Leasing · Estructurado por Invertis Securities
                </p>
              </div>

              {/* Decorative stat card */}
              <div className="order-1 min-[1200px]:order-2 relative">
                <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-border bg-card p-6 md:p-10">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Leaf className="h-6 w-6" />
                    </div>
                    <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      Bonos Verdes
                    </div>
                  </div>
                  <div className="mt-8">
                    <div className="type-stat-display text-foreground">1°</div>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                      Primer grupo financiero de capital panameño en emitir Bonos Verdes
                      registrados en la Bolsa Latinoamericana de Valores.
                    </p>
                  </div>
                  <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Enfoque
                      </div>
                      <div className="mt-1 text-sm font-medium text-foreground">
                        Energías renovables
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Y
                      </div>
                      <div className="mt-1 text-sm font-medium text-foreground">
                        Eficiencia energética
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </StaticPageSection>
      </article>
    </>
  );
}
