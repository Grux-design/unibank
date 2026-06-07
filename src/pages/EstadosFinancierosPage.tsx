import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FileText } from "lucide-react";
import {
  auditados,
  regulatoria,
  internos,
  type FinancialDoc,
  type RegulatoryDoc,
  type InternalQuarter,
} from "@/data/estadosFinancieros";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type EntityFilter = "Todos" | "UniBank" | "UniLeasing";

function DocLink({ doc }: { doc: { label: string; size: string; url: string } }) {
  return (
    <a
      href={doc.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-3 py-2.5"
    >
      <FileText className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
      <div className="flex flex-col">
        <span className="text-primary group-hover:underline font-medium leading-snug">
          {doc.label}
        </span>
        <span className="text-xs text-muted-foreground mt-0.5">PDF · {doc.size}</span>
      </div>
    </a>
  );
}

function YearChips({
  years,
  selected,
  onSelect,
}: {
  years: number[];
  selected: number | "Todos";
  onSelect: (y: number | "Todos") => void;
}) {
  const opts: (number | "Todos")[] = ["Todos", ...years];
  return (
    <div className="flex flex-wrap gap-2">
      {opts.map((y) => {
        const active = y === selected;
        return (
          <button
            key={y}
            onClick={() => onSelect(y)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
              active
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-foreground border-border hover:border-primary"
            }`}
          >
            {y}
          </button>
        );
      })}
    </div>
  );
}

export default function EstadosFinancierosPage() {
  const auditYears = useMemo(
    () => [...new Set(auditados.map((d) => d.year))].sort((a, b) => b - a),
    [],
  );
  const regYears = useMemo(
    () => [...new Set(regulatoria.map((d) => d.year))].sort((a, b) => b - a),
    [],
  );

  const [auditYear, setAuditYear] = useState<number | "Todos">("Todos");
  const [regYear, setRegYear] = useState<number | "Todos">("Todos");
  const [regEntity, setRegEntity] = useState<EntityFilter>("Todos");

  const filteredAudit: FinancialDoc[] = useMemo(
    () => auditados.filter((d) => auditYear === "Todos" || d.year === auditYear),
    [auditYear],
  );

  const filteredReg: RegulatoryDoc[] = useMemo(
    () =>
      regulatoria.filter(
        (d) =>
          (regYear === "Todos" || d.year === regYear) &&
          (regEntity === "Todos" || d.entity === regEntity),
      ),
    [regYear, regEntity],
  );

  const renderQuarter = (q?: InternalQuarter) =>
    q ? (
      <DocLink doc={q} />
    ) : (
      <span className="text-sm text-muted-foreground">—</span>
    );

  return (
    <>
      <Helmet>
        <title>Estados Financieros | UniBank</title>
        <meta
          name="description"
          content="Estados Financieros Auditados, Información Regulatoria y Estados Financieros Internos de UniBank y empresas del Grupo."
        />
      </Helmet>

      <section className="bg-muted/30 py-20 md:py-28">
        <div className="container mx-auto px-6 max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Estados Financieros
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl">
            Consulta y descarga nuestros informes financieros auditados, formularios regulatorios y reportes internos.
          </p>
        </div>
      </section>

      {/* Auditados */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
              Estados Financieros Auditados
            </h2>
            <YearChips years={auditYears} selected={auditYear} onSelect={setAuditYear} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 divide-y md:divide-y-0 divide-border border-t border-border">
            {filteredAudit.map((doc, i) => (
              <div key={i} className="border-b border-border md:border-b">
                <DocLink doc={doc} />
              </div>
            ))}
          </div>
          {filteredAudit.length === 0 && (
            <p className="text-muted-foreground py-8">No hay documentos para el año seleccionado.</p>
          )}
        </div>
      </section>

      {/* Regulatoria */}
      <section className="py-16 md:py-20 bg-muted/20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col gap-6 mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
              Información Regulatoria
            </h2>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <YearChips years={regYears} selected={regYear} onSelect={setRegYear} />
              <div className="flex gap-2">
                {(["Todos", "UniBank", "UniLeasing"] as EntityFilter[]).map((e) => {
                  const active = regEntity === e;
                  return (
                    <button
                      key={e}
                      onClick={() => setRegEntity(e)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                        active
                          ? "bg-foreground text-background border-foreground"
                          : "bg-background text-foreground border-border hover:border-foreground"
                      }`}
                    >
                      {e}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 border-t border-border">
            {filteredReg.map((doc, i) => (
              <div key={i} className="border-b border-border">
                <DocLink doc={doc} />
              </div>
            ))}
          </div>
          {filteredReg.length === 0 && (
            <p className="text-muted-foreground py-8">No hay documentos para los filtros seleccionados.</p>
          )}
        </div>
      </section>

      {/* Internos */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8">
            Estados Financieros Internos
          </h2>

          {/* Desktop table */}
          <div className="hidden md:block rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-24">Año</TableHead>
                  <TableHead>Marzo</TableHead>
                  <TableHead>Junio</TableHead>
                  <TableHead>Septiembre</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {internos.map((row) => (
                  <TableRow key={row.year}>
                    <TableCell className="font-semibold align-top">{row.year}</TableCell>
                    <TableCell className="align-top">{renderQuarter(row.marzo)}</TableCell>
                    <TableCell className="align-top">{renderQuarter(row.junio)}</TableCell>
                    <TableCell className="align-top">{renderQuarter(row.septiembre)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-6">
            {internos.map((row) => (
              <div key={row.year} className="rounded-lg border border-border p-4">
                <h3 className="font-semibold text-lg text-foreground mb-3">{row.year}</h3>
                <div className="space-y-2">
                  {row.marzo && <DocLink doc={row.marzo} />}
                  {row.junio && <DocLink doc={row.junio} />}
                  {row.septiembre && <DocLink doc={row.septiembre} />}
                  {!row.marzo && !row.junio && !row.septiembre && (
                    <span className="text-sm text-muted-foreground">Sin documentos disponibles.</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
