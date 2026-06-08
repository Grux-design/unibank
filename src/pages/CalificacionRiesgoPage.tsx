import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FileText, Search, X, Download, ShieldCheck } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ALL = "__all__";

interface RatingDoc {
  label: string;
  year: number;
  period: "Junio" | "Diciembre";
  url: string;
}

const documentos: RatingDoc[] = [
  {
    label: "Calificación de Riesgo - Junio 2025",
    year: 2025,
    period: "Junio",
    url: "https://www.unibank.com.pa/sites/default/files/attachment/pa_unibank-ff-em-202506_final.pdf",
  },
  {
    label: "Calificación de Riesgo - Diciembre 2024",
    year: 2024,
    period: "Diciembre",
    url: "https://www.unibank.com.pa/sites/default/files/attachment/unibank-ff-em-dic2024-fin.pdf",
  },
  {
    label: "Calificación de Riesgo - Junio 2024",
    year: 2024,
    period: "Junio",
    url: "https://www.unibank.com.pa/sites/default/files/attachment/unibank-ff-em-junio2024-pre.pdf",
  },
  {
    label: "Calificación de Riesgo - Diciembre 2023",
    year: 2023,
    period: "Diciembre",
    url: "https://www.unibank.com.pa/sites/default/files/attachment/pa-unibank-202312-ff.pdf",
  },
  {
    label: "Calificación de Riesgo - Junio 2023",
    year: 2023,
    period: "Junio",
    url: "https://www.unibank.com.pa/sites/default/files/attachment/pa-unibank-202306.pdf",
  },
  {
    label: "Calificación de Riesgo - Diciembre 2022",
    year: 2022,
    period: "Diciembre",
    url: "https://www.unibank.com.pa/sites/default/files/attachment/pa-unibank-ff-em-202212-fin_-_diciembre_2022.pdf",
  },
  {
    label: "Calificación de Riesgo - Junio 2022",
    year: 2022,
    period: "Junio",
    url: "https://www.unibank.com.pa/sites/default/files/attachment/pa-unibank-ff-em-202206-fin_-_junio_2022.pdf",
  },
];

function FilterField({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export default function CalificacionRiesgoPage() {
  const years = useMemo(
    () => [...new Set(documentos.map((d) => d.year))].sort((a, b) => b - a),
    [],
  );

  const [year, setYear] = useState<string>(ALL);
  const [period, setPeriod] = useState<string>(ALL);
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      documentos.filter(
        (d) =>
          (year === ALL || String(d.year) === year) &&
          (period === ALL || d.period === period) &&
          (search === "" || d.label.toLowerCase().includes(search.toLowerCase())),
      ),
    [year, period, search],
  );

  const active = year !== ALL || period !== ALL || search !== "";

  const clear = () => {
    setYear(ALL);
    setPeriod(ALL);
    setSearch("");
  };

  return (
    <>
      <Helmet>
        <title>Calificación de Riesgo | UniBank</title>
        <meta
          name="description"
          content="Calificación de Riesgo de UniBank otorgada por Pacific Credit Rating (PCR). Consulta y descarga los informes históricos."
        />
      </Helmet>

      {/* Hero */}
      <section className="bg-muted/30 py-20 md:py-28">
        <div className="container mx-auto px-6 max-w-6xl">
          <Badge variant="outline" className="mb-4 gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5" />
            Pacific Credit Rating
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Calificación de Riesgo
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl">
            Una banca ágil, sólida y digital. Nuestra calificación refleja un perfil de
            negocio bueno para crecer, calidad de cartera saludable, alta liquidez
            respaldada por depósitos y capitalización adecuada y estable.
          </p>

          {/* Rating highlight card */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-border bg-background p-6 flex items-center gap-5">
              <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <span className="text-4xl font-bold leading-none">A</span>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Calificación actual
                </p>
                <p className="text-lg font-semibold text-foreground">paA</p>
                <p className="text-sm text-muted-foreground">Perspectiva Estable</p>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-background p-6">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Calificadora
              </p>
              <p className="mt-2 text-lg font-semibold text-foreground">
                Pacific Credit Rating
              </p>
              <p className="text-sm text-muted-foreground mt-1">PCR · Panamá</p>
            </div>
            <div className="rounded-xl border border-border bg-background p-6">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Última actualización
              </p>
              <p className="mt-2 text-lg font-semibold text-foreground">30 de junio 2025</p>
              <p className="text-sm text-muted-foreground mt-1">
                {documentos.length} informes disponibles
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex items-baseline justify-between mb-2 flex-wrap gap-2">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
              Documentos Relacionados
            </h2>
            <span className="text-sm text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? "documento" : "documentos"}
            </span>
          </div>
          <p className="text-muted-foreground mb-6">
            Informes históricos de calificación de riesgo emitidos por PCR.
          </p>

          {/* Filters */}
          <div className="bg-muted/30 border border-border rounded-lg p-4 md:p-5 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-[180px_180px_1fr_auto] gap-4 items-end">
              <FilterField label="Año" htmlFor="cr-year">
                <Select value={year} onValueChange={setYear}>
                  <SelectTrigger id="cr-year">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ALL}>Todos los años</SelectItem>
                    {years.map((y) => (
                      <SelectItem key={y} value={String(y)}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FilterField>

              <FilterField label="Periodo" htmlFor="cr-period">
                <Select value={period} onValueChange={setPeriod}>
                  <SelectTrigger id="cr-period">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ALL}>Todos los periodos</SelectItem>
                    <SelectItem value="Junio">Junio</SelectItem>
                    <SelectItem value="Diciembre">Diciembre</SelectItem>
                  </SelectContent>
                </Select>
              </FilterField>

              <FilterField label="Buscar" htmlFor="cr-search">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="cr-search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar por nombre del documento…"
                    className="pl-9"
                  />
                </div>
              </FilterField>

              <Button
                variant="ghost"
                onClick={clear}
                disabled={!active}
                className="h-10"
              >
                <X className="h-4 w-4 mr-1" /> Limpiar
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-lg border border-border overflow-hidden bg-background">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="font-semibold text-foreground">Documento</TableHead>
                  <TableHead className="font-semibold text-foreground w-32">Periodo</TableHead>
                  <TableHead className="font-semibold text-foreground w-24">Año</TableHead>
                  <TableHead className="font-semibold text-foreground w-32 text-right">
                    Descargar
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((doc, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                      >
                        <FileText className="h-4 w-4 flex-shrink-0" />
                        <span>{doc.label}</span>
                      </a>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{doc.period}</TableCell>
                    <TableCell className="text-muted-foreground">{doc.year}</TableCell>
                    <TableCell className="text-right">
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Descargar ${doc.label}`}
                        className="inline-flex items-center justify-center h-8 w-8 rounded-md text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
                      >
                        <Download className="h-4 w-4" />
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-12">
                      No se encontraron documentos con los filtros aplicados.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
    </>
  );
}
