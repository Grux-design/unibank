import { Helmet } from "react-helmet-async";
import { Target, Eye, Crown, Briefcase } from "@/lib/icons";
import { StaticPageFrame, StaticPageSection } from "@/components/organisms/StaticPageLayout";

interface Person {
  name: string;
  role: string;
  avatar?: string;
  label?: string;
}

interface BoardGroup {
  title: string;
  people: Person[];
}

const boardGroups: BoardGroup[] = [
  {
    title: "Presidencia y mesa directiva",
    people: [
      { name: "Sion Cohen", role: "Director – Presidente" },
      { name: "Ezra Ofer Benzion", role: "Director – Secretario" },
      { name: "Danny Yohoros", role: "Director – Tesorero" },
    ],
  },
  {
    title: "Directores",
    people: [
      { name: "José R. Mena", role: "Director" },
      { name: "Henry Attie", role: "Director" },
      { name: "Fernando Barría", role: "Director Independiente" },
      { name: "Digna González de Martínez", role: "Directora Independiente" },
    ],
  },
  {
    title: "Directores suplentes",
    people: [
      { name: "Mordechai Ashkenazi", role: "Director Suplente" },
      { name: "Moisés J. Azrak", role: "Director Suplente" },
      { name: "David Btesh", role: "Director Suplente" },
    ],
  },
];

const gerenteGeneral: Person = {
  name: "John Rozo Uribe",
  role: "Gerente General",
  avatar: "/images/leadership/john.jpg",
  label: "Gerente General",
};

const vicepresidentes: Person[] = [
  {
    name: "Mariela Arze",
    role: "VP de Tesorería, Instituciones y Alianzas Estratégicas",
    avatar: "/images/leadership/mariela.jpg",
  },
  {
    name: "Jazmín Pérez",
    role: "VP de Personas, Pasivos y Gestión Patrimonial",
    avatar: "/images/leadership/jazmin.jpg",
  },
  {
    name: "Alexis Aizpurúa",
    role: "VP de Crecimiento de Negocios",
    avatar: "/images/leadership/alexis.jpg",
  },
  { name: "Maricel de González", role: "VP de Finanzas", avatar: "/images/leadership/maricel.jpg" },
  {
    name: "Abdiel Blanco",
    role: "VP de Asesoría Legal y Gobierno Corporativo",
    avatar: "/images/leadership/abdiel.jpg",
  },
  { name: "Gustavo Valderrama", role: "VP de Riesgos", avatar: "/images/leadership/gustavo.jpg" },
  {
    name: "Roberto Alcedo",
    role: "VP de Tecnología y Operaciones",
    avatar: "/images/leadership/roberto.jpg",
  },
  { name: "Giniva Santamaría", role: "VP de Cumplimiento", avatar: "/images/leadership/giniva.jpg" },
  { name: "Jahir Cervantes", role: "VP de Auditoría", avatar: "/images/leadership/jahir.jpg" },
];

const PAGE_NAV = [
  { id: "proposito", label: "Propósito" },
  { id: "junta-directiva", label: "Junta Directiva" },
  { id: "equipo-gerencial", label: "Equipo Gerencial" },
] as const;

const leadershipTeam = [gerenteGeneral, ...vicepresidentes];

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function PageNav() {
  return (
    <nav aria-label="Secciones de la página" className="flex flex-wrap gap-2">
      {PAGE_NAV.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className="type-section-tag transition-colors hover:border-primary/40 hover:text-foreground"
        >
          {label}
        </a>
      ))}
    </nav>
  );
}

function BlockIntro({
  icon: Icon,
  eyebrow,
  title,
  description,
}: {
  icon: React.ElementType;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <span className="type-section-tag gap-2">
        <Icon className="size-3.5" />
        {eyebrow}
      </span>
      <h2 className="mt-4 type-content-section-headline text-balance text-foreground">{title}</h2>
      {description ? (
        <p className="mt-4 text-sm leading-relaxed text-pretty text-muted-foreground md:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function InitialsBadge({ person }: { person: Person }) {
  return (
    <div className="board-member-avatar flex size-11 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-foreground transition-colors duration-300">
      {getInitials(person.name)}
    </div>
  );
}

function BoardMemberCard({ person }: { person: Person }) {
  return (
    <li className="board-member-card group page-section-card overflow-hidden rounded-2xl transition-colors duration-300">
      <div className="flex h-[5.25rem] items-center gap-4 px-4 sm:h-[5.5rem] sm:gap-5 sm:px-5">
        <InitialsBadge person={person} />
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
          <span className="board-member-name truncate text-sm font-medium text-foreground transition-colors duration-300 md:text-[15px]">
            {person.name}
          </span>
          <span className="board-member-role truncate text-sm text-muted-foreground transition-colors duration-300">
            {person.role}
          </span>
        </div>
      </div>
    </li>
  );
}

function BoardSection() {
  return (
    <div className="flex flex-col gap-10 md:gap-12">
      {boardGroups.map((group, index) => (
        <section key={group.title} aria-labelledby={`board-group-${index}`}>
          <h3 id={`board-group-${index}`} className="type-section-tag mb-4 md:mb-5">
            {group.title}
          </h3>
          <ul className="flex flex-col gap-3 md:gap-4">
            {group.people.map((person) => (
              <BoardMemberCard key={person.name} person={person} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function LeadershipPortrait({ person }: { person: Person }) {
  return (
    <article className="page-section-card flex h-full flex-col overflow-hidden rounded-2xl">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        {person.label ? (
          <span className="absolute left-3 top-3 z-[1] rounded-md bg-primary px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-primary-foreground">
            {person.label}
          </span>
        ) : null}
        {person.avatar ? (
          <img
            src={person.avatar}
            alt={person.name}
            width={400}
            height={500}
            draggable={false}
            onContextMenu={(event) => event.preventDefault()}
            onDragStart={(event) => event.preventDefault()}
            className="size-full select-none object-cover object-top pointer-events-none"
            style={{ WebkitUserSelect: "none", WebkitTouchCallout: "none" }}
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col border-t border-[var(--surface-border)] p-4 md:p-5">
        <h3 className="type-item-title-sm text-foreground">{person.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-pretty text-muted-foreground">{person.role}</p>
      </div>
    </article>
  );
}

export default function JuntaDirectivaPage() {
  return (
    <>
      <Helmet>
        <title>Junta Directiva | UniBank</title>
        <meta
          name="description"
          content="Conoce a la Junta Directiva y el Equipo Gerencial de UniBank: líderes comprometidos con la excelencia, la cercanía al cliente y el buen gobierno corporativo."
        />
      </Helmet>

      <StaticPageFrame page="junta-directiva">
        <StaticPageSection bandIndex={0} id="proposito" surface="white">
          <div className="site-container flex flex-col gap-10 md:gap-12">
            <PageNav />

            <div className="max-w-3xl">
              <p className="text-sm leading-relaxed text-pretty text-muted-foreground md:text-base">
                UniBank cuenta con una estructura de gobierno corporativo clara: una Junta Directiva
                que define la estrategia institucional y un equipo gerencial que ejecuta la
                operación con excelencia, cercanía y transparencia.
              </p>
            </div>

            <div className="page-section-card overflow-hidden rounded-2xl">
              <div className="grid divide-y divide-[var(--surface-border)] md:grid-cols-2 md:divide-x md:divide-y-0">
                <div className="p-6 md:p-8">
                  <div className="mb-5 inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Target className="size-5" />
                  </div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                    Misión
                  </h3>
                  <p className="mt-4 text-base font-medium leading-relaxed text-pretty text-foreground md:text-lg">
                    “Lograr la preferencia de los clientes por nuestra oferta moderna, ágil y
                    profesional de servicios bancarios.”
                  </p>
                </div>
                <div className="p-6 md:p-8">
                  <div className="mb-5 inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Eye className="size-5" />
                  </div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                    Visión
                  </h3>
                  <p className="mt-4 text-base font-medium leading-relaxed text-pretty text-foreground md:text-lg">
                    “Ser el banco de referencia en Panamá por su profesionalidad y cercanía al
                    cliente.”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </StaticPageSection>

        <StaticPageSection bandIndex={1} id="junta-directiva" surface="white">
          <div className="site-container flex flex-col gap-10 md:flex-row md:items-start md:gap-12 lg:gap-16">
            <div className="md:w-2/5 lg:w-[38%] md:sticky md:top-20 md:self-start lg:top-28">
              <BlockIntro
                icon={Crown}
                eyebrow="Gobierno corporativo"
                title="Junta Directiva"
                description="Profesionales de amplia trayectoria que guían la estrategia institucional de UniBank con visión de largo plazo y los más altos estándares de gobernanza."
              />
            </div>
            <div className="min-w-0 flex-1">
              <BoardSection />
            </div>
          </div>
        </StaticPageSection>

        <StaticPageSection bandIndex={2} id="equipo-gerencial" surface="white">
          <div className="site-container flex flex-col gap-10 md:gap-12">
            <BlockIntro
              icon={Briefcase}
              eyebrow="UniLíderes"
              title="Equipo Gerencial"
              description="Un equipo diverso y experimentado que impulsa la operación, la innovación y el crecimiento del banco."
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              {leadershipTeam.map((person) => (
                <LeadershipPortrait key={person.name} person={person} />
              ))}
            </div>
          </div>
        </StaticPageSection>
      </StaticPageFrame>
    </>
  );
}
