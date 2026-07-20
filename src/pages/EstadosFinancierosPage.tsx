import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FileText, Search, X, Download } from "@/lib/icons";
import {
  auditados,
  regulatoria,
  internos,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { StaticPageFrame, StaticPageSection } from "@/components/organisms/StaticPageLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ALL = "__all__";

function DocLink({ doc }: { doc: { label: string; size: string; url: string } }) {
  return (
    <a
      href={doc.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 text-primary hover:underline font-medium"
    >
      <FileText className="h-4 w-4 flex-shrink-0" />
      <span>{doc.label}</span>
    </a>
  );
}

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

export default function EstadosFinancierosPage() {
  const auditYears = useMemo(
    () => [...new Set(auditados.map((d) => d.year))].sort((a, b) => b - a),
    [],
  );
  const regYears = useMemo(
    () => [...new Set(regulatoria.map((d) => d.year))].sort((a, b) => b - a),
    [],
  );

  // Auditados filters
  const [auditYear, setAuditYear] = useState<string>(ALL);
  const [auditSearch, setAuditSearch] = useState("");

  // Regulatoria filters
  const [regYear, setRegYear] = useState<string>(ALL);
  const [regEntity, setRegEntity] = useState<string>(ALL);
  const [regPeriod, setRegPeriod] = useState<string>(ALL);
  const [regForm, setRegForm] = useState<string>(ALL);
  const [regSearch, setRegSearch] = useState("");

  const filteredAudit = useMemo(
    () =>
      auditados.filter(
        (d) =>
          (auditYear === ALL || String(d.year) === auditYear) &&
          (auditSearch === "" ||
            d.label.toLowerCase().includes(auditSearch.toLowerCase())),
      ),
    [auditYear, auditSearch],
  );

  const filteredReg = useMemo(
    () =>
      regulatoria.filter(
        (d) =>
          (regYear === ALL || String(d.year) === regYear) &&
          (regEntity === ALL || d.entity === regEntity) &&
          (regPeriod === ALL || d.period === regPeriod) &&
          (regForm === ALL || d.label.includes(regForm)) &&
          (regSearch === "" ||
            d.label.toLowerCase().includes(regSearch.toLowerCase())),
      ),
    [regYear, regEntity, regPeriod, regForm, regSearch],
  );

  const clearAudit = () => {
    setAuditYear(ALL);
    setAuditSearch("");
  };

  const clearReg = () => {
    setRegYear(ALL);
    setRegEntity(ALL);
    setRegPeriod(ALL);
    setRegForm(ALL);
    setRegSearch("");
  };

  const auditActive = auditYear !== ALL || auditSearch !== "";
  const regActive =
    regYear !== ALL ||
    regEntity !== ALL ||
    regPeriod !== ALL ||
    regForm !== ALL ||
    regSearch !== "";

  const periods = ["Marzo", "Junio", "Septiembre", "Diciembre"];

  const renderQuarter = (q?: InternalQuarter) =>
    q ? <DocLink doc={q} /> : <span className="text-sm text-muted-foreground">—</span>;

  return (
    <>
      <Helmet>
        <title>Estados Financieros | UniBank</title>
        <meta
          name="description"
          content="Estados Financieros Auditados, Información Regulatoria y Estados Financieros Internos de UniBank y empresas del Grupo."
        />
      </Helmet>

      <StaticPageFrame page="estados-financieros">
      <StaticPageSection bandIndex={0}>
        <div className="site-container">
          <div className="flex items-baseline justify-between mb-2 flex-wrap gap-2">
            <h2 className="type-content-section-headline text-foreground">
              Estados Financieros Auditados
            </h2>
            <span className="text-sm text-muted-foreground">
              {filteredAudit.length} {filteredAudit.length === 1 ? "documento" : "documentos"}
            </span>
          </div>
          <p className="text-muted-foreground mb-6">
            Informes anuales auditados de UniBank y empresas del Grupo.
          </p>

          {/* Filters */}
          <div className="bg-muted/30 border border-border rounded-lg p-4 md:p-5 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_auto] gap-4 items-end">
              <FilterField label="Año" htmlFor="audit-year">
                <Select value={auditYear} onValueChange={setAuditYear}>
                  <SelectTrigger id="audit-year">
                    <SelectValue placeholder="Todos los años" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ALL}>Todos los años</SelectItem>
                    {auditYears.map((y) => (
                      <SelectItem key={y} value={String(y)}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FilterField>

              <FilterField label="Buscar" htmlFor="audit-search">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="audit-search"
                    value={auditSearch}
                    onChange={(e) => setAuditSearch(e.target.value)}
                    placeholder="Buscar por nombre del documento…"
                    className="pl-9"
                  />
                </div>
              </FilterField>

              <Button
                variant="ghost"
                onClick={clearAudit}
                disabled={!auditActive}
                className="h-10"
              >
                <X className="h-4 w-4 mr-1" /> Limpiar
              </Button>
            </div>
          </div>

          {/* Table — desktop */}
          <div className="hidden md:block rounded-lg border border-border overflow-hidden bg-background">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="font-semibold text-foreground">Documento</TableHead>
                  <TableHead className="font-semibold text-foreground w-24">Año</TableHead>
                  <TableHead className="font-semibold text-foreground w-32">Tamaño</TableHead>
                  <TableHead className="font-semibold text-foreground w-32 text-right">
                    Descargar
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAudit.map((doc, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <DocLink doc={doc} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">{doc.year}</TableCell>
                    <TableCell className="text-muted-foreground">PDF · {doc.size}</TableCell>
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
                {filteredAudit.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-12">
                      No se encontraron documentos con los filtros aplicados.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="md:hidden space-y-3">
            {filteredAudit.map((doc, i) => (
              <div key={i} className="rounded-lg border border-border p-4 bg-background">
                <DocLink doc={doc} />
                <div className="mt-3 flex items-center justify-between gap-3 text-sm text-muted-foreground">
                  <span>
                    {doc.year} · PDF · {doc.size}
                  </span>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Descargar ${doc.label}`}
                    className="inline-flex items-center justify-center h-8 w-8 rounded-md text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
            {filteredAudit.length === 0 && (
              <p className="text-center text-muted-foreground py-12">
                No se encontraron documentos con los filtros aplicados.
              </p>
            )}
          </div>
        </div>
      </StaticPageSection>

      <StaticPageSection bandIndex={1}>
        <div className="site-container">
          <div className="flex items-baseline justify-between mb-2 flex-wrap gap-2">
            <h2 className="type-content-section-headline text-foreground">
              Información Regulatoria
            </h2>
            <span className="text-sm text-muted-foreground">
              {filteredReg.length} {filteredReg.length === 1 ? "documento" : "documentos"}
            </span>
          </div>
          <p className="text-muted-foreground mb-6">
            Formularios INT-T e IN-A reportados a la Superintendencia de Bancos de Panamá.
          </p>

          {/* Filters */}
          <div className="bg-background border border-border rounded-lg p-4 md:p-5 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              <FilterField label="Año" htmlFor="reg-year">
                <Select value={regYear} onValueChange={setRegYear}>
                  <SelectTrigger id="reg-year">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ALL}>Todos</SelectItem>
                    {regYears.map((y) => (
                      <SelectItem key={y} value={String(y)}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FilterField>

              <FilterField label="Entidad" htmlFor="reg-entity">
                <Select value={regEntity} onValueChange={setRegEntity}>
                  <SelectTrigger id="reg-entity">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ALL}>Todas</SelectItem>
                    <SelectItem value="UniBank">UniBank</SelectItem>
                    <SelectItem value="UniLeasing">UniLeasing</SelectItem>
                  </SelectContent>
                </Select>
              </FilterField>

              <FilterField label="Periodo" htmlFor="reg-period">
                <Select value={regPeriod} onValueChange={setRegPeriod}>
                  <SelectTrigger id="reg-period">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ALL}>Todos</SelectItem>
                    {periods.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FilterField>

              <FilterField label="Formulario" htmlFor="reg-form">
                <Select value={regForm} onValueChange={setRegForm}>
                  <SelectTrigger id="reg-form">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ALL}>Todos</SelectItem>
                    <SelectItem value="INT-T">INT-T</SelectItem>
                    <SelectItem value="IN-A">IN-A</SelectItem>
                  </SelectContent>
                </Select>
              </FilterField>

              <FilterField label="Buscar" htmlFor="reg-search">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="reg-search"
                    value={regSearch}
                    onChange={(e) => setRegSearch(e.target.value)}
                    placeholder="Nombre…"
                    className="pl-9"
                  />
                </div>
              </FilterField>
            </div>

            {regActive && (
              <div className="flex items-center justify-end mt-4">
                <Button variant="ghost" size="sm" onClick={clearReg}>
                  <X className="h-4 w-4 mr-1" /> Limpiar filtros
                </Button>
              </div>
            )}
          </div>

          {/* Table — desktop */}
          <div className="hidden md:block rounded-lg border border-border overflow-hidden bg-background">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="font-semibold text-foreground">Documento</TableHead>
                  <TableHead className="font-semibold text-foreground w-28">Formulario</TableHead>
                  <TableHead className="font-semibold text-foreground w-28">Entidad</TableHead>
                  <TableHead className="font-semibold text-foreground w-28">Periodo</TableHead>
                  <TableHead className="font-semibold text-foreground w-20">Año</TableHead>
                  <TableHead className="font-semibold text-foreground w-28">Tamaño</TableHead>
                  <TableHead className="font-semibold text-foreground w-24 text-right">
                    Descargar
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReg.map((doc, i) => {
                  const form = doc.label.includes("IN-A") ? "IN-A" : "INT-T";
                  return (
                    <TableRow key={i}>
                      <TableCell>
                        <DocLink doc={doc} />
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono">
                          {form}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{doc.entity}</TableCell>
                      <TableCell className="text-muted-foreground">{doc.period}</TableCell>
                      <TableCell className="text-muted-foreground">{doc.year}</TableCell>
                      <TableCell className="text-muted-foreground">PDF · {doc.size}</TableCell>
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
                  );
                })}
                {filteredReg.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-12">
                      No se encontraron documentos con los filtros aplicados.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="md:hidden space-y-3">
            {filteredReg.map((doc, i) => {
              const form = doc.label.includes("IN-A") ? "IN-A" : "INT-T";
              return (
                <div key={i} className="rounded-lg border border-border p-4 bg-background space-y-3">
                  <DocLink doc={doc} />
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="outline" className="font-mono">
                      {form}
                    </Badge>
                    <span>{doc.entity}</span>
                    <span>·</span>
                    <span>{doc.period}</span>
                    <span>·</span>
                    <span>{doc.year}</span>
                    <span>·</span>
                    <span>PDF · {doc.size}</span>
                  </div>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary"
                  >
                    <Download className="h-4 w-4" />
                    Descargar
                  </a>
                </div>
              );
            })}
            {filteredReg.length === 0 && (
              <p className="text-center text-muted-foreground py-12">
                No se encontraron documentos con los filtros aplicados.
              </p>
            )}
          </div>
        </div>
      </StaticPageSection>

      <StaticPageSection bandIndex={2}>
        <div className="site-container">
          <h2 className="type-content-section-headline text-foreground mb-2">
            Estados Financieros Internos
          </h2>
          <p className="text-muted-foreground mb-8">
            Reportes trimestrales internos por año.
          </p>

          <div className="hidden md:block rounded-lg border border-border overflow-hidden bg-background">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="font-semibold text-foreground w-24">Año</TableHead>
                  <TableHead className="font-semibold text-foreground">Marzo</TableHead>
                  <TableHead className="font-semibold text-foreground">Junio</TableHead>
                  <TableHead className="font-semibold text-foreground">Septiembre</TableHead>
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

          <div className="md:hidden space-y-4">
            {internos.map((row) => (
              <div key={row.year} className="rounded-lg border border-border p-4 bg-background">
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
      </StaticPageSection>
      </StaticPageFrame>
    </>
  );
}
