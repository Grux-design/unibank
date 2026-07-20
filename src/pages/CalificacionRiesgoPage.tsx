import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StaticPageFrame, StaticPageSection } from "@/components/organisms/StaticPageLayout";
import {
  DocumentMetaCell,
  DocumentMobileCard,
  DocumentTableRow,
  EmptyResults,
  FilterBar,
  FilterPill,
  SectionHeader,
  DOCUMENT_TABLE_HEAD_CLASS,
} from "@/components/molecules/documentLibraryUi";
import { cn } from "@/lib/utils";

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

export default function CalificacionRiesgoPage() {
  const years = useMemo(
    () => [...new Set(documentos.map((d) => d.year))].sort((a, b) => b - a),
    [],
  );

  const [year, setYear] = useState<string>(ALL);
  const [period, setPeriod] = useState<string>(ALL);

  const filtered = useMemo(
    () =>
      documentos.filter(
        (d) =>
          (year === ALL || String(d.year) === year) &&
          (period === ALL || d.period === period),
      ),
    [year, period],
  );

  const active = year !== ALL || period !== ALL;

  const clear = () => {
    setYear(ALL);
    setPeriod(ALL);
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

      <StaticPageFrame page="calificacion-riesgo">
        <StaticPageSection bandIndex={0} surface="white">
          <div className="site-container flex flex-col gap-10 md:gap-12">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
              <div className="page-section-card flex items-center gap-4 rounded-[24px] p-5 md:gap-5 md:p-6">
                <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <span className="text-4xl font-bold leading-none">A</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Calificación actual</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">paA</p>
                  <p className="text-sm text-muted-foreground">Perspectiva Estable</p>
                </div>
              </div>

              <div className="page-section-card rounded-[24px] p-5 md:p-6">
                <p className="text-sm text-muted-foreground">Calificadora</p>
                <p className="mt-1 text-lg font-semibold text-foreground">Pacific Credit Rating</p>
                <p className="mt-1 text-sm text-muted-foreground">PCR · Panamá</p>
              </div>

              <div className="page-section-card rounded-[24px] p-5 md:p-6">
                <p className="text-sm text-muted-foreground">Última actualización</p>
                <p className="mt-1 text-lg font-semibold text-foreground">30 de junio 2025</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {documentos.length} informes disponibles
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-10 md:gap-12">
              <SectionHeader
                title="Documentos relacionados"
                description="Informes históricos de calificación de riesgo emitidos por PCR."
                count={filtered.length}
              />

              <FilterBar active={active} onClear={clear}>
                <FilterPill
                  label="Año"
                  value={year}
                  displayValue={year === ALL ? undefined : year}
                  onValueChange={setYear}
                  options={[
                    { value: ALL, label: "Todos los años" },
                    ...years.map((y) => ({ value: String(y), label: String(y) })),
                  ]}
                />
                <FilterPill
                  label="Periodo"
                  value={period}
                  displayValue={period === ALL ? undefined : period}
                  onValueChange={setPeriod}
                  options={[
                    { value: ALL, label: "Todos los periodos" },
                    { value: "Junio", label: "Junio" },
                    { value: "Diciembre", label: "Diciembre" },
                  ]}
                />
              </FilterBar>

              <div className="page-section-card hidden overflow-hidden rounded-[24px] md:block">
                <Table>
                  <TableHeader>
                    <TableRow className="border-[var(--surface-border)] bg-[var(--surface-subtle)] hover:bg-[var(--surface-subtle)]">
                      <TableHead className={cn(DOCUMENT_TABLE_HEAD_CLASS, "font-semibold text-foreground")}>Documento</TableHead>
                      <TableHead className={cn(DOCUMENT_TABLE_HEAD_CLASS, "w-32 font-semibold text-foreground")}>Periodo</TableHead>
                      <TableHead className={cn(DOCUMENT_TABLE_HEAD_CLASS, "w-24 font-semibold text-foreground")}>Año</TableHead>
                      <TableHead className={cn(DOCUMENT_TABLE_HEAD_CLASS, "w-10")} aria-hidden />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((doc, i) => (
                      <DocumentTableRow
                        key={i}
                        href={doc.url}
                        label={doc.label}
                        meta={
                          <>
                            <DocumentMetaCell>{doc.period}</DocumentMetaCell>
                            <DocumentMetaCell>{doc.year}</DocumentMetaCell>
                          </>
                        }
                      />
                    ))}
                    {filtered.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4}>
                          <EmptyResults message="No se encontraron documentos con los filtros aplicados." />
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="space-y-4 md:hidden">
                {filtered.map((doc, i) => (
                  <DocumentMobileCard
                    key={i}
                    href={doc.url}
                    label={doc.label}
                    meta={`${doc.period} · ${doc.year}`}
                  />
                ))}
                {filtered.length === 0 && (
                  <EmptyResults message="No se encontraron documentos con los filtros aplicados." />
                )}
              </div>
            </div>
          </div>
        </StaticPageSection>
      </StaticPageFrame>
    </>
  );
}
