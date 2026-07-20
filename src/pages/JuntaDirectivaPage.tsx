import { Helmet } from "react-helmet-async";
import { Target, Eye, Crown, Users2, Briefcase } from "@/lib/icons";
import { StaticPageFrame, StaticPageSection } from "@/components/organisms/StaticPageLayout";
import { cn } from "@/lib/utils";

interface Person {
  name: string;
  role: string;
  highlight?: boolean;
  avatar?: string;
}

const principales: Person[] = [
  { name: "Sion Cohen", role: "Director – Presidente", highlight: true },
  { name: "Ezra Ofer Benzion", role: "Director – Secretario" },
  { name: "Danny Yohoros", role: "Director – Tesorero" },
  { name: "José R. Mena", role: "Director" },
  { name: "Henry Attie", role: "Director" },
  { name: "Fernando Barría", role: "Director Independiente" },
  { name: "Digna González de Martínez", role: "Directora Independiente" },
];

const suplentes: Person[] = [
  { name: "Mordechai Ashkenazi", role: "Director Suplente" },
  { name: "Moisés J. Azrak", role: "Director Suplente" },
  { name: "David Btesh", role: "Director Suplente" },
];

const lideres: Person[] = [
  { name: "John Rozo Uribe", role: "Gerente General", highlight: true, avatar: "/images/leadership/john.jpg" },
  { name: "Mariela Arze", role: "VP de Tesorería, Instituciones y Alianzas Estratégicas", avatar: "/images/leadership/mariela.jpg" },
  { name: "Jazmín Pérez", role: "VP de Personas, Pasivos y Gestión Patrimonial", avatar: "/images/leadership/jazmin.jpg" },
  { name: "Alexis Aizpurúa", role: "VP de Crecimiento de Negocios", avatar: "/images/leadership/alexis.jpg" },
  { name: "Maricel de González", role: "VP de Finanzas", avatar: "/images/leadership/maricel.jpg" },
  { name: "Abdiel Blanco", role: "VP de Asesoría Legal y Gobierno Corporativo", avatar: "/images/leadership/abdiel.jpg" },
  { name: "Gustavo Valderrama", role: "VP de Riesgos", avatar: "/images/leadership/gustavo.jpg" },
  { name: "Roberto Alcedo", role: "VP de Tecnología y Operaciones", avatar: "/images/leadership/roberto.jpg" },
  { name: "Giniva Santamaría", role: "VP de Cumplimiento", avatar: "/images/leadership/giniva.jpg" },
  { name: "Jahir Cervantes", role: "VP de Auditoría", avatar: "/images/leadership/jahir.jpg" },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function PersonCard({ person, accent = false }: { person: Person; accent?: boolean }) {
  return (
    <div
      className={cn(
        "page-section-card page-hover-cell relative rounded-2xl p-5 md:p-6",
        accent && "border-primary/25",
      )}
    >
      {accent && (
        <span
          className="absolute bottom-5 left-0 top-5 w-1 rounded-r-full bg-primary"
          aria-hidden
        />
      )}
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full text-base font-semibold tracking-wide",
            accent
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground",
            person.avatar && accent && "ring-2 ring-primary/20 ring-offset-2 ring-offset-[var(--surface-page)]",
          )}
        >
          {person.avatar ? (
            <img
              src={person.avatar}
              alt={person.name}
              width={56}
              height={56}
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              className="h-full w-full select-none object-cover object-top pointer-events-none"
              style={{ WebkitUserSelect: "none", WebkitTouchCallout: "none" }}
            />
          ) : (
            getInitials(person.name)
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="type-item-title-sm text-foreground leading-snug">{person.name}</h3>
          <p className="mt-1 text-sm leading-snug text-muted-foreground">{person.role}</p>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({
  icon: Icon,
  eyebrow,
  title,
}: {
  icon: React.ElementType;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-8 md:mb-10 flex flex-col items-start gap-3">
      <span className="type-section-tag gap-2">
        <Icon className="h-3.5 w-3.5" />
        {eyebrow}
      </span>
      <h2 className="type-content-section-headline text-foreground">{title}</h2>
    </div>
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
        <StaticPageSection bandIndex={0}>
          <div className="site-container">
          <div className="grid gap-4 md:gap-6 md:grid-cols-2">
            <div className="page-section-card page-hover-cell rounded-2xl p-6 md:rounded-3xl md:p-10">
              <div className="mb-6 inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Target className="size-6" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">Misión</h3>
              <p className="mt-4 text-base md:text-lg lg:text-xl font-medium leading-relaxed text-foreground">
                “Lograr la preferencia de los clientes por nuestra oferta moderna, ágil y profesional
                de servicios bancarios.”
              </p>
            </div>
            <div className="page-section-card page-hover-cell rounded-2xl p-6 md:rounded-3xl md:p-10">
              <div className="mb-6 inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Eye className="size-6" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">Visión</h3>
              <p className="mt-4 text-base md:text-lg lg:text-xl font-medium leading-relaxed text-foreground">
                “Ser el banco de referencia en Panamá por su profesionalidad y cercanía al cliente.”
              </p>
            </div>
          </div>
          </div>
        </StaticPageSection>

        <StaticPageSection bandIndex={1}>
          <div className="site-container">
            <SectionHeader icon={Crown} eyebrow="Directores Principales" title="Nuestra Junta Directiva" />
            <p className="mb-8 md:mb-10 max-w-3xl text-sm md:text-base leading-relaxed text-muted-foreground">
              Profesionales de amplia trayectoria que guían la estrategia institucional de UniBank
              con visión de largo plazo.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
              {principales.map((p) => (
                <PersonCard key={p.name} person={p} accent={p.highlight} />
              ))}
            </div>
          </div>
        </StaticPageSection>

        <StaticPageSection bandIndex={2}>
          <div className="site-container">
            <SectionHeader icon={Users2} eyebrow="Directores Suplentes" title="Suplentes" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
              {suplentes.map((p) => (
                <PersonCard key={p.name} person={p} />
              ))}
            </div>
          </div>
        </StaticPageSection>

        <StaticPageSection bandIndex={3}>
          <div className="site-container">
            <SectionHeader icon={Briefcase} eyebrow="UniLíderes" title="Equipo Gerencial" />
            <p className="mb-8 md:mb-10 max-w-3xl text-sm md:text-base leading-relaxed text-muted-foreground">
              UniLíderes está conformado por un equipo gerencial diverso y experimentado que impulsa
              día a día la operación, la innovación y el crecimiento del banco.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
              {lideres.map((p) => (
                <PersonCard key={p.name} person={p} accent={p.highlight} />
              ))}
            </div>
          </div>
        </StaticPageSection>
      </StaticPageFrame>
    </>
  );
}
