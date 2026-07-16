import { Helmet } from "react-helmet-async";
import { Target, Eye, Crown, Users2, Briefcase } from "lucide-react";
import abdielAvatar from "@/assets/leadership/abdiel.jpg.asset.json";
import alexisAvatar from "@/assets/leadership/alexis.jpg.asset.json";
import ginivaAvatar from "@/assets/leadership/giniva.jpg.asset.json";
import gustavoAvatar from "@/assets/leadership/gustavo.jpg.asset.json";
import jahirAvatar from "@/assets/leadership/jahir.jpg.asset.json";
import jazminAvatar from "@/assets/leadership/jazmin.jpg.asset.json";
import johnAvatar from "@/assets/leadership/john.jpg.asset.json";
import maricelAvatar from "@/assets/leadership/maricel.jpg.asset.json";
import marielaAvatar from "@/assets/leadership/mariela.jpg.asset.json";
import robertoAvatar from "@/assets/leadership/roberto.jpg.asset.json";



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
  { name: "John Rozo Uribe", role: "Gerente General", highlight: true, avatar: johnAvatar.url },
  { name: "Mariela Arze", role: "VP de Tesorería, Instituciones y Alianzas Estratégicas", avatar: marielaAvatar.url },
  { name: "Jazmín Pérez", role: "VP de Personas, Pasivos y Gestión Patrimonial", avatar: jazminAvatar.url },
  { name: "Alexis Aizpurúa", role: "VP de Crecimiento de Negocios", avatar: alexisAvatar.url },
  { name: "Maricel de González", role: "VP de Finanzas", avatar: maricelAvatar.url },
  { name: "Abdiel Blanco", role: "VP de Asesoría Legal y Gobierno Corporativo", avatar: abdielAvatar.url },
  { name: "Gustavo Valderrama", role: "VP de Riesgos", avatar: gustavoAvatar.url },
  { name: "Roberto Alcedo", role: "VP de Tecnología y Operaciones", avatar: robertoAvatar.url },
  { name: "Giniva Santamaría", role: "VP de Cumplimiento", avatar: ginivaAvatar.url },
  { name: "Jahir Cervantes", role: "VP de Auditoría", avatar: jahirAvatar.url },
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
      className={`group relative rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        accent ? "border-primary/30 bg-primary/5" : "border-border hover:border-primary/40"
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full text-base font-semibold tracking-wide transition-colors ${
            accent
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground group-hover:bg-primary group-hover:text-primary-foreground"
          }`}
        >
          {person.avatar ? (
            <img
              src={person.avatar}
              alt=""
              width={56}
              height={56}
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              className="h-full w-full select-none object-cover pointer-events-none"
              style={{ WebkitUserSelect: "none", WebkitTouchCallout: "none" }}
            />
          ) : (
            getInitials(person.name)
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold leading-snug text-foreground">{person.name}</h3>
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
    <div className="mb-10 flex flex-col items-start gap-3">
      <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
        <Icon className="h-3.5 w-3.5" />
        {eyebrow}
      </span>
      <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">{title}</h2>
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
          <div className="relative site-container py-24 md:py-32">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
              Gobierno Corporativo
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-6xl">
              Junta Directiva
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Liderazgo comprometido con la excelencia, la transparencia y la cercanía al cliente.
              Conoce a las personas que guían el rumbo de UniBank.
            </p>
          </div>
        </section>

        {/* Misión & Visión */}
        <section className="site-container py-20">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-10 transition-all hover:border-primary/40 hover:shadow-lg">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">Misión</h3>
              <p className="mt-4 text-xl font-medium leading-relaxed text-foreground">
                “Lograr la preferencia de los clientes por nuestra oferta moderna, ágil y profesional
                de servicios bancarios.”
              </p>
            </div>
            <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-10 transition-all hover:border-primary/40 hover:shadow-lg">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">Visión</h3>
              <p className="mt-4 text-xl font-medium leading-relaxed text-foreground">
                “Ser el banco de referencia en Panamá por su profesionalidad y cercanía al cliente.”
              </p>
            </div>
          </div>
        </section>

        {/* Directores Principales */}
        <section className="border-t border-border bg-muted/30">
          <div className="site-container py-20">
            <SectionHeader icon={Crown} eyebrow="Directores Principales" title="Nuestra Junta Directiva" />
            <p className="mb-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Profesionales de amplia trayectoria que guían la estrategia institucional de UniBank
              con visión de largo plazo.
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {principales.map((p) => (
                <PersonCard key={p.name} person={p} accent={p.highlight} />
              ))}
            </div>
          </div>
        </section>

        {/* Directores Suplentes */}
        <section>
          <div className="site-container py-20">
            <SectionHeader icon={Users2} eyebrow="Directores Suplentes" title="Suplentes" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {suplentes.map((p) => (
                <PersonCard key={p.name} person={p} />
              ))}
            </div>
          </div>
        </section>

        {/* Equipo Gerencial */}
        <section className="border-t border-border bg-muted/30">
          <div className="site-container py-20">
            <SectionHeader icon={Briefcase} eyebrow="UniLíderes" title="Equipo Gerencial" />
            <p className="mb-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
              UniLíderes está conformado por un equipo gerencial diverso y experimentado que impulsa
              día a día la operación, la innovación y el crecimiento del banco.
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {lideres.map((p) => (
                <PersonCard key={p.name} person={p} accent={p.highlight} />
              ))}
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
