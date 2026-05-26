import { Helmet } from "react-helmet-async";
import { Leaf, Sprout, Recycle, Users, ArrowUpRight, BadgeCheck } from "lucide-react";

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
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-muted/40 via-background to-background">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
          />
          <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
              <Leaf className="h-3.5 w-3.5" />
              ESG
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-6xl">
              Sostenibilidad
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Nuestro compromiso con el medio ambiente y la sociedad guía cada decisión que tomamos
              como grupo financiero.
            </p>
          </div>
        </section>

        {/* Compromiso */}
        <section className="mx-auto max-w-5xl px-6 py-20">
          <div className="mb-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
              Nuestro compromiso
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Decisiones responsables, impacto positivo
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-muted-foreground">
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
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Sprout,
                title: "Finanzas sostenibles",
                desc: "Promovemos productos y prácticas financieras alineadas al desarrollo sostenible.",
              },
              {
                icon: Users,
                title: "Inclusión social",
                desc: "Fomentamos el acceso, la equidad y el bienestar en las comunidades donde operamos.",
              },
              {
                icon: Recycle,
                title: "Respeto al medio ambiente",
                desc: "Buscamos reducir nuestra huella e impulsar la conservación de recursos naturales.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bonos Verdes */}
        <section className="border-t border-border bg-muted/30">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  Hito histórico
                </span>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  Bonos Verdes
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
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
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md hover:opacity-95"
                >
                  Conoce nuestro Marco de Referencia
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <p className="mt-3 text-xs text-muted-foreground">
                  Emitido por Uni Leasing · Estructurado por Invertis Securities
                </p>
              </div>

              {/* Decorative stat card */}
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-2xl" />
                <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Leaf className="h-6 w-6" />
                    </div>
                    <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      Bonos Verdes
                    </div>
                  </div>
                  <div className="mt-8">
                    <div className="text-6xl font-extrabold tracking-tight text-foreground">1°</div>
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
        </section>
      </article>
    </>
  );
}
