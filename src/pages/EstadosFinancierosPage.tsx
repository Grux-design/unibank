import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  auditados,
  regulatoria,
  internos,
  type InternalRow,
} from "@/data/estadosFinancieros";
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
  DocumentTag,
  DocumentTagsCell,
  EmptyResults,
  FilterBar,
  FilterPill,
  InternalYearGroup,
  SectionHeader,
  DOCUMENT_TABLE_HEAD_CLASS,
} from "@/components/molecules/documentLibraryUi";
import {
  PageSectionTabPanel,
  PageSectionTabs,
  type PageSectionTab,
} from "@/components/molecules/PageSectionTabs";
import { cn } from "@/lib/utils";

const ALL = "__all__";
const PERIODS = ["Marzo", "Junio", "Septiembre", "Diciembre"] as const;

const FINANCIAL_TABS = [
  { value: "auditados", label: "Estados Financieros Auditados" },
  { value: "regulatoria", label: "Información Regulatoria" },
  { value: "internos", label: "Estados Financieros Internos" },
] as const satisfies readonly PageSectionTab[];

type FinancialTab = (typeof FINANCIAL_TABS)[number]["value"];

function isFinancialTab(value: string): value is FinancialTab {
  return FINANCIAL_TABS.some((tab) => tab.value === value);
}

function getTabFromHash(): FinancialTab {
  const hash = window.location.hash.replace(/^#/, "");
  return isFinancialTab(hash) ? hash : "auditados";
}

function getRegForm(label: string) {
  return label.includes("IN-A") ? "IN-A" : "INT-T";
}

function getAuditScope(label: string): "unibank" | "grupo" {
  return label.includes("Grupo UniBank") ? "grupo" : "unibank";
}

const INTERNAL_QUARTERS = [
  { key: "marzo" as const, label: "Marzo" },
  { key: "junio" as const, label: "Junio" },
  { key: "septiembre" as const, label: "Septiembre" },
];

function getInternalQuarters(row: InternalRow) {
  return INTERNAL_QUARTERS.flatMap(({ key, label }) => {
    const doc = row[key];
    if (!doc) return [];
    return [{ period: label, href: doc.url }];
  });
}

function countInternalDocs(rows: InternalRow[]) {
  return rows.reduce((total, row) => total + getInternalQuarters(row).length, 0);
}

function RegulatoriaTags({
  label,
  entity,
  period,
  year,
}: {
  label: string;
  entity: string;
  period: string;
  year: number;
}) {
  return (
    <>
      <DocumentTag className="font-mono">{getRegForm(label)}</DocumentTag>
      <DocumentTag>{entity}</DocumentTag>
      <DocumentTag>{period}</DocumentTag>
      <DocumentTag>{year}</DocumentTag>
    </>
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

  const [tab, setTab] = useState<FinancialTab>(getTabFromHash);

  const [auditYear, setAuditYear] = useState<string>(ALL);
  const [auditScope, setAuditScope] = useState<string>(ALL);

  const [regYear, setRegYear] = useState<string>(ALL);
  const [regEntity, setRegEntity] = useState<string>(ALL);
  const [regPeriod, setRegPeriod] = useState<string>(ALL);
  const [regForm, setRegForm] = useState<string>(ALL);

  const [internalYear, setInternalYear] = useState<string>(ALL);

  const internalYears = useMemo(
    () => internos.map((row) => row.year).sort((a, b) => b - a),
    [],
  );

  useEffect(() => {
    const syncFromHash = () => setTab(getTabFromHash());
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const handleTabChange = (value: string) => {
    if (!isFinancialTab(value)) return;
    setTab(value);
    window.history.replaceState(null, "", `#${value}`);
  };

  const filteredAudit = useMemo(
    () =>
      auditados.filter(
        (d) =>
          (auditYear === ALL || String(d.year) === auditYear) &&
          (auditScope === ALL || getAuditScope(d.label) === auditScope),
      ),
    [auditYear, auditScope],
  );

  const filteredReg = useMemo(
    () =>
      regulatoria.filter(
        (d) =>
          (regYear === ALL || String(d.year) === regYear) &&
          (regEntity === ALL || d.entity === regEntity) &&
          (regPeriod === ALL || d.period === regPeriod) &&
          (regForm === ALL || getRegForm(d.label) === regForm),
      ),
    [regYear, regEntity, regPeriod, regForm],
  );

  const auditActive = auditYear !== ALL || auditScope !== ALL;
  const regActive =
    regYear !== ALL || regEntity !== ALL || regPeriod !== ALL || regForm !== ALL;

  const filteredInternos = useMemo(
    () =>
      internalYear === ALL
        ? internos
        : internos.filter((row) => String(row.year) === internalYear),
    [internalYear],
  );

  const internalDocCount = useMemo(
    () => countInternalDocs(filteredInternos),
    [filteredInternos],
  );

  const internalActive = internalYear !== ALL;

  const clearAudit = () => {
    setAuditYear(ALL);
    setAuditScope(ALL);
  };

  const clearReg = () => {
    setRegYear(ALL);
    setRegEntity(ALL);
    setRegPeriod(ALL);
    setRegForm(ALL);
  };

  const clearInternal = () => {
    setInternalYear(ALL);
  };

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
        <StaticPageSection bandIndex={0} surface="white">
          <div className="site-container">
            <PageSectionTabs
              value={tab}
              onValueChange={handleTabChange}
              tabs={[...FINANCIAL_TABS]}
              ariaLabel="Secciones de estados financieros"
            >
              <PageSectionTabPanel value="auditados" className="mt-0 flex flex-col gap-10 md:gap-12">
                <SectionHeader
                  title="Estados Financieros Auditados"
                  description="Informes anuales auditados de UniBank y empresas del Grupo."
                  count={filteredAudit.length}
                />

                <FilterBar active={auditActive} onClear={clearAudit}>
                  <FilterPill
                    label="Año"
                    value={auditYear}
                    displayValue={auditYear === ALL ? undefined : auditYear}
                    onValueChange={setAuditYear}
                    options={[
                      { value: ALL, label: "Todos los años" },
                      ...auditYears.map((y) => ({ value: String(y), label: String(y) })),
                    ]}
                  />
                  <FilterPill
                    label="Alcance"
                    value={auditScope}
                    displayValue={
                      auditScope === ALL
                        ? undefined
                        : auditScope === "unibank"
                          ? "UniBank y subsidiarias"
                          : "Grupo UniBank"
                    }
                    onValueChange={setAuditScope}
                    options={[
                      { value: ALL, label: "Todos" },
                      { value: "unibank", label: "UniBank y subsidiarias" },
                      { value: "grupo", label: "Grupo UniBank" },
                    ]}
                  />
                </FilterBar>

                <div className="page-section-card hidden overflow-hidden rounded-[24px] md:block">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-[var(--surface-border)] bg-[var(--surface-subtle)] hover:bg-[var(--surface-subtle)]">
                        <TableHead className={cn(DOCUMENT_TABLE_HEAD_CLASS, "font-semibold text-foreground")}>Documento</TableHead>
                        <TableHead className={cn(DOCUMENT_TABLE_HEAD_CLASS, "w-24 font-semibold text-foreground")}>Año</TableHead>
                        <TableHead className={cn(DOCUMENT_TABLE_HEAD_CLASS, "w-10")} aria-hidden />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAudit.map((doc, i) => (
                        <DocumentTableRow
                          key={i}
                          href={doc.url}
                          label={doc.label}
                          meta={<DocumentMetaCell>{doc.year}</DocumentMetaCell>}
                        />
                      ))}
                      {filteredAudit.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={3}>
                            <EmptyResults message="No se encontraron documentos con los filtros aplicados." />
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                <div className="space-y-4 md:hidden">
                  {filteredAudit.map((doc, i) => (
                    <DocumentMobileCard
                      key={i}
                      href={doc.url}
                      label={doc.label}
                      meta={String(doc.year)}
                    />
                  ))}
                  {filteredAudit.length === 0 && (
                    <EmptyResults message="No se encontraron documentos con los filtros aplicados." />
                  )}
                </div>
              </PageSectionTabPanel>

              <PageSectionTabPanel value="regulatoria" className="mt-0 flex flex-col gap-10 md:gap-12">
                <SectionHeader
                  title="Información Regulatoria"
                  description="Formularios INT-T e IN-A reportados a la Superintendencia de Bancos de Panamá."
                  count={filteredReg.length}
                />

                <FilterBar active={regActive} onClear={clearReg}>
                  <FilterPill
                    label="Año"
                    value={regYear}
                    displayValue={regYear === ALL ? undefined : regYear}
                    onValueChange={setRegYear}
                    options={[
                      { value: ALL, label: "Todos" },
                      ...regYears.map((y) => ({ value: String(y), label: String(y) })),
                    ]}
                  />
                  <FilterPill
                    label="Entidad"
                    value={regEntity}
                    displayValue={regEntity === ALL ? undefined : regEntity}
                    onValueChange={setRegEntity}
                    options={[
                      { value: ALL, label: "Todas" },
                      { value: "UniBank", label: "UniBank" },
                      { value: "UniLeasing", label: "UniLeasing" },
                    ]}
                  />
                  <FilterPill
                    label="Periodo"
                    value={regPeriod}
                    displayValue={regPeriod === ALL ? undefined : regPeriod}
                    onValueChange={setRegPeriod}
                    options={[
                      { value: ALL, label: "Todos" },
                      ...PERIODS.map((p) => ({ value: p, label: p })),
                    ]}
                  />
                  <FilterPill
                    label="Formulario"
                    value={regForm}
                    displayValue={regForm === ALL ? undefined : regForm}
                    onValueChange={setRegForm}
                    options={[
                      { value: ALL, label: "Todos" },
                      { value: "INT-T", label: "INT-T" },
                      { value: "IN-A", label: "IN-A" },
                    ]}
                  />
                </FilterBar>

                <div className="page-section-card hidden overflow-hidden rounded-[24px] md:block">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-[var(--surface-border)] bg-[var(--surface-subtle)] hover:bg-[var(--surface-subtle)]">
                        <TableHead className={cn(DOCUMENT_TABLE_HEAD_CLASS, "font-semibold text-foreground")}>Documento</TableHead>
                        <TableHead className={cn(DOCUMENT_TABLE_HEAD_CLASS, "font-semibold text-foreground")} aria-hidden />
                        <TableHead className={cn(DOCUMENT_TABLE_HEAD_CLASS, "w-10")} aria-hidden />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReg.map((doc, i) => (
                        <DocumentTableRow
                          key={i}
                          href={doc.url}
                          label={doc.label}
                          meta={
                            <DocumentTagsCell>
                              <RegulatoriaTags
                                label={doc.label}
                                entity={doc.entity}
                                period={doc.period}
                                year={doc.year}
                              />
                            </DocumentTagsCell>
                          }
                        />
                      ))}
                      {filteredReg.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={3}>
                            <EmptyResults message="No se encontraron documentos con los filtros aplicados." />
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                <div className="space-y-4 md:hidden">
                  {filteredReg.map((doc, i) => (
                    <DocumentMobileCard
                      key={i}
                      href={doc.url}
                      label={doc.label}
                      meta={
                        <span className="flex flex-wrap gap-1.5">
                          <RegulatoriaTags
                            label={doc.label}
                            entity={doc.entity}
                            period={doc.period}
                            year={doc.year}
                          />
                        </span>
                      }
                    />
                  ))}
                  {filteredReg.length === 0 && (
                    <EmptyResults message="No se encontraron documentos con los filtros aplicados." />
                  )}
                </div>
              </PageSectionTabPanel>

              <PageSectionTabPanel value="internos" className="mt-0 flex flex-col gap-10 md:gap-12">
                <SectionHeader
                  title="Estados Financieros Internos"
                  description="Informes trimestrales al cierre de marzo, junio y septiembre de cada ejercicio."
                  count={internalDocCount}
                />

                <FilterBar active={internalActive} onClear={clearInternal}>
                  <FilterPill
                    label="Año"
                    value={internalYear}
                    displayValue={internalYear === ALL ? undefined : internalYear}
                    onValueChange={setInternalYear}
                    options={[
                      { value: ALL, label: "Todos los años" },
                      ...internalYears.map((y) => ({ value: String(y), label: String(y) })),
                    ]}
                  />
                </FilterBar>

                <div className="flex flex-col gap-5 md:gap-6">
                  {filteredInternos.map((row) => (
                    <InternalYearGroup
                      key={row.year}
                      year={row.year}
                      quarters={getInternalQuarters(row)}
                    />
                  ))}
                  {internalDocCount === 0 && (
                    <EmptyResults message="No hay informes disponibles para el año seleccionado." />
                  )}
                </div>
              </PageSectionTabPanel>
            </PageSectionTabs>
          </div>
        </StaticPageSection>
      </StaticPageFrame>
    </>
  );
}
