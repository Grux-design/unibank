import { Helmet } from "react-helmet-async";
import { motion, useReducedMotion } from "motion/react";
import { BoltLightning, Sun, type Icon } from "@/lib/icons";
import { StaticPageFrame, StaticPageSection } from "@/components/organisms/StaticPageLayout";
import {
  SustainabilityLineArt,
  type SustainabilityVectorKind,
} from "@/components/illustrations/SustainabilityLineArt";
import { EASE } from "@/lib/motion";

const commitments = [
  {
    title: "Prácticas financieras responsables",
    desc: "Productos y decisiones alineadas al desarrollo sostenible del grupo.",
  },
  {
    title: "Inclusión social",
    desc: "Acceso, equidad y bienestar en las comunidades donde operamos.",
  },
  {
    title: "Medio ambiente",
    desc: "Conservación de recursos naturales para las generaciones presentes y futuras.",
  },
] as const;

const greenBondFocusAreas: {
  title: string;
  description: string;
  icon: Icon;
}[] = [
  {
    title: "Energías renovables",
    description: "Enfoque principal de inversión de los recursos captados.",
    icon: Sun,
  },
  {
    title: "Eficiencia energética",
    description: "Proyectos complementarios elegibles bajo el marco de referencia.",
    icon: BoltLightning,
  },
];

function GreenBondFocusItem({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: Icon;
}) {
  return (
    <li className="flex gap-4 rounded-[16px] bg-[var(--surface-subtle)] p-4 md:p-5">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-4" />
      </span>
      <div>
        <p className="text-sm font-medium text-foreground md:text-[15px]">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-pretty text-muted-foreground">{description}</p>
      </div>
    </li>
  );
}

const pillars: {
  kind: SustainabilityVectorKind;
  title: string;
  desc: string;
}[] = [
  {
    kind: "finance",
    title: "Finanzas sostenibles",
    desc: "Productos y prácticas alineadas al desarrollo sostenible.",
  },
  {
    kind: "inclusion",
    title: "Inclusión social",
    desc: "Acceso, equidad y bienestar en las comunidades donde operamos.",
  },
  {
    kind: "environment",
    title: "Medio ambiente",
    desc: "Conservación de recursos naturales en cada operación.",
  },
];

function SectionIntro({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-xl">
      <h2 className="type-content-section-headline text-balance text-foreground">{title}</h2>
      {description ? (
        <p className="mt-4 text-sm leading-relaxed text-pretty text-muted-foreground md:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function PillarCard({
  kind,
  title,
  desc,
}: {
  kind: SustainabilityVectorKind;
  title: string;
  desc: string;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.li
      className="group page-hover-primary-card page-section-card h-full overflow-hidden rounded-[24px] transition-[background-color,border-color] duration-300"
      whileHover={prefersReduced ? undefined : { y: -3 }}
      transition={{ duration: 0.35, ease: EASE.cinematic }}
    >
      <div className="flex h-full flex-col p-6 md:p-8">
        <SustainabilityLineArt kind={kind} />

        <div className="mt-6 flex flex-1 flex-col gap-2 md:mt-7">
          <h3 className="page-hover-primary-title type-item-title m-0 text-[clamp(20px,2vw,24px)] leading-snug text-foreground transition-colors duration-300">
            {title}
          </h3>
          <p className="page-hover-primary-body m-0 text-sm leading-relaxed text-pretty text-muted-foreground transition-colors duration-300 md:text-[15px]">
            {desc}
          </p>
        </div>
      </div>
    </motion.li>
  );
}

export default function SostenibilidadPage() {
  const prefersReduced = useReducedMotion();

  return (
    <>
      <Helmet>
        <title>Sostenibilidad | UniBank</title>
        <meta
          name="description"
          content="Conoce el compromiso de Grupo UniBank con la sostenibilidad: prácticas financieras responsables, inclusión social y los primeros Bonos Verdes de capital panameño."
        />
      </Helmet>

      <StaticPageFrame page="sostenibilidad">
        <StaticPageSection bandIndex={0} id="compromiso" surface="white">
          <div className="site-container flex flex-col gap-10 md:flex-row md:items-start md:gap-12 lg:gap-16">
            <div className="md:w-2/5 lg:w-[38%] md:sticky md:top-20 md:self-start lg:top-28">
              <h2 className="type-content-section-headline text-balance text-foreground">
                Decisiones responsables, impacto positivo
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-pretty text-muted-foreground md:text-base">
                En Grupo UniBank, la sostenibilidad guía cada decisión — equilibrando crecimiento
                económico con el bienestar social y la conservación del medio ambiente.
              </p>
            </div>

            <div className="min-w-0 flex-1">
              <ul className="page-section-card divide-y divide-[var(--surface-border)] overflow-hidden rounded-[24px]">
                {commitments.map(({ title, desc }) => (
                  <li key={title} className="p-6 md:p-8">
                    <h3 className="type-item-title text-base text-foreground md:text-lg">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-pretty text-muted-foreground md:text-[15px]">
                      {desc}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </StaticPageSection>

        <StaticPageSection bandIndex={1} id="pilares" surface="white">
          <div className="site-container flex flex-col gap-10 md:gap-12">
            <SectionIntro
              title="Tres pilares"
              description="Un enfoque integral que conecta finanzas, personas y planeta en cada operación del grupo."
            />

            <ul className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
              {pillars.map((pillar) => (
                <PillarCard key={pillar.kind} {...pillar} />
              ))}
            </ul>
          </div>
        </StaticPageSection>

        <StaticPageSection bandIndex={2} id="bonos-verdes" surface="white">
          <div className="site-container flex flex-col gap-10 md:gap-12">
            <SectionIntro
              title="Bonos Verdes"
              description="El primer grupo financiero de capital panameño en emitir Bonos Verdes registrados en la Bolsa Latinoamericana de Valores."
            />

            <div className="page-section-card overflow-hidden rounded-[24px]">
              <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:divide-x md:divide-[var(--surface-border)]">
                <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
                  <p className="type-stat-display text-foreground">1°</p>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-pretty text-muted-foreground">
                    Primer grupo financiero de capital panameño en emitir Bonos Verdes registrados en
                    la Bolsa Latinoamericana de Valores.
                  </p>
                  <p className="mt-6 text-sm leading-relaxed text-pretty text-muted-foreground md:text-[15px]">
                    Estos bonos nos permiten invertir de manera específica en proyectos alineados con
                    el desarrollo sostenible.
                  </p>
                </div>

                <div className="flex flex-col p-6 md:p-8 lg:p-10">
                  <p className="text-sm font-medium text-foreground">Áreas de inversión</p>
                  <ul className="mt-4 flex flex-col gap-3 md:mt-5 md:gap-4">
                    {greenBondFocusAreas.map(({ title, description, icon }) => (
                      <GreenBondFocusItem
                        key={title}
                        title={title}
                        description={description}
                        icon={icon}
                      />
                    ))}
                  </ul>
                  <p className="mt-6 border-t border-[var(--surface-border)] pt-5 text-xs text-muted-foreground md:mt-8 md:pt-6">
                    Emitido por Uni Leasing · Estructurado por Invertis Securities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </StaticPageSection>
      </StaticPageFrame>
    </>
  );
}
