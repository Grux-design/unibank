export interface FinancialDoc {
  label: string;
  year: number;
  size: string;
  url: string;
}

export interface RegulatoryDoc extends FinancialDoc {
  period: "Marzo" | "Junio" | "Septiembre" | "Diciembre";
  entity: "UniBank" | "UniLeasing";
}

export interface InternalQuarter {
  label: string;
  size: string;
  url: string;
}

export interface InternalRow {
  year: number;
  marzo?: InternalQuarter;
  junio?: InternalQuarter;
  septiembre?: InternalQuarter;
  diciembre?: InternalQuarter;
}

const ph = "#";

export const auditados: FinancialDoc[] = [
  { label: "Estados Financieros - Diciembre 2025", year: 2025, size: "947.79 KB", url: ph },
  { label: "Estados Financieros - Diciembre 2025", year: 2025, size: "2.83 MB", url: ph },
  { label: "Estados Financieros - Diciembre 2025", year: 2025, size: "2.83 MB", url: ph },
  { label: "Estados Financieros Grupo UniBank - Diciembre 2025", year: 2025, size: "932.62 KB", url: ph },
  { label: "Estados Financieros - Diciembre 2024", year: 2024, size: "7.2 MB", url: ph },
  { label: "Estados Financieros Grupo UniBank - Diciembre 2024", year: 2024, size: "2.5 MB", url: ph },
  { label: "Estados Financieros - Diciembre 2023", year: 2023, size: "1.04 MB", url: ph },
  { label: "Estados Financieros Grupo UniBank - Diciembre 2023", year: 2023, size: "1.51 MB", url: ph },
  { label: "Estados Financieros - Diciembre 2022", year: 2022, size: "5.33 MB", url: ph },
  { label: "Estados Financieros Grupo UniBank - Diciembre 2022", year: 2022, size: "5.30 MB", url: ph },
  { label: "Estados Financieros Grupo UniBank - Diciembre 2021", year: 2021, size: "887.33 KB", url: ph },
  { label: "Estados Financieros - Diciembre 2021", year: 2021, size: "903.07 KB", url: ph },
  { label: "Estados Financieros - Diciembre 2020", year: 2020, size: "677.33 KB", url: ph },
  { label: "Estados Financieros Grupo UniBank - Diciembre 2020", year: 2020, size: "4.48 MB", url: ph },
  { label: "Estados Financieros - Diciembre 2019", year: 2019, size: "953.61 KB", url: ph },
  { label: "Estados Financieros Grupo UniBank - Diciembre 2019", year: 2019, size: "1003.36 KB", url: ph },
  { label: "Estados Financieros - Diciembre 2018", year: 2018, size: "3.61 MB", url: ph },
  { label: "Estados Financieros Uni B&T Holdings - Diciembre 2018", year: 2018, size: "3.7 MB", url: ph },
];

const r = (
  form: "INT-T" | "IN-A",
  period: RegulatoryDoc["period"],
  year: number,
  entity: RegulatoryDoc["entity"],
  size: string,
): RegulatoryDoc => ({
  label: `Formulario ${form} ${period} ${year} | ${entity}`,
  year,
  period,
  entity,
  size,
  url: ph,
});

export const regulatoria: RegulatoryDoc[] = [
  // 2025
  r("INT-T", "Diciembre", 2025, "UniLeasing", "4.63 MB"),
  r("IN-A", "Diciembre", 2025, "UniBank", "2.51 MB"),
  r("IN-A", "Diciembre", 2025, "UniLeasing", "2.23 MB"),
  r("INT-T", "Diciembre", 2025, "UniBank", "15.85 MB"),
  r("INT-T", "Septiembre", 2025, "UniLeasing", "1.85 MB"),
  r("INT-T", "Junio", 2025, "UniBank", "7.36 MB"),
  r("INT-T", "Junio", 2025, "UniLeasing", "1.6 MB"),
  r("INT-T", "Marzo", 2025, "UniBank", "15.33 MB"),
  // 2024
  r("INT-T", "Diciembre", 2024, "UniBank", "13.69 MB"),
  r("INT-T", "Diciembre", 2024, "UniLeasing", "1.13 MB"),
  r("IN-A", "Diciembre", 2024, "UniBank", "2.78 MB"),
  r("INT-T", "Septiembre", 2024, "UniLeasing", "896.03 KB"),
  r("INT-T", "Septiembre", 2024, "UniBank", "2.44 MB"),
  r("INT-T", "Junio", 2024, "UniBank", "9.37 MB"),
  r("INT-T", "Marzo", 2024, "UniLeasing", "7.88 MB"),
  r("INT-T", "Marzo", 2024, "UniBank", "9.08 MB"),
  // 2023
  r("INT-T", "Diciembre", 2023, "UniLeasing", "820.24 KB"),
  r("INT-T", "Diciembre", 2023, "UniBank", "2.61 MB"),
  r("IN-A", "Diciembre", 2023, "UniBank", "7.38 MB"),
  r("INT-T", "Septiembre", 2023, "UniLeasing", "809.74 KB"),
  r("INT-T", "Septiembre", 2023, "UniBank", "523.04 KB"),
  r("INT-T", "Junio", 2023, "UniLeasing", "803.6 KB"),
  r("INT-T", "Junio", 2023, "UniBank", "2.34 MB"),
  r("INT-T", "Marzo", 2023, "UniLeasing", "686.92 KB"),
  r("INT-T", "Marzo", 2023, "UniBank", "2.59 MB"),
  // 2022
  r("INT-T", "Diciembre", 2022, "UniLeasing", "720.33 KB"),
  r("IN-A", "Diciembre", 2022, "UniLeasing", "7.77 MB"),
  r("IN-A", "Diciembre", 2022, "UniBank", "8.34 MB"),
  r("INT-T", "Septiembre", 2022, "UniLeasing", "751.79 KB"),
  r("INT-T", "Septiembre", 2022, "UniBank", "5.69 MB"),
  r("INT-T", "Junio", 2022, "UniLeasing", "856.41 KB"),
  r("INT-T", "Junio", 2022, "UniBank", "2.37 MB"),
  r("INT-T", "Septiembre", 2022, "UniBank", "2.37 MB"),
  r("INT-T", "Marzo", 2022, "UniLeasing", "847.26 KB"),
  r("INT-T", "Marzo", 2022, "UniBank", "5.68 MB"),
  // 2021
  r("INT-T", "Diciembre", 2021, "UniLeasing", "6.48 MB"),
  r("IN-A", "Diciembre", 2021, "UniLeasing", "3.98 MB"),
  r("INT-T", "Septiembre", 2021, "UniLeasing", "1.92 MB"),
  r("INT-T", "Septiembre", 2021, "UniBank", "3.02 MB"),
  r("INT-T", "Junio", 2021, "UniLeasing", "1.74 MB"),
  r("INT-T", "Marzo", 2021, "UniBank", "3.03 MB"),
  r("INT-T", "Marzo", 2021, "UniLeasing", "1021.59 KB"),
  // 2020
  r("INT-T", "Diciembre", 2020, "UniBank", "4.2 MB"),
  r("INT-T", "Diciembre", 2020, "UniLeasing", "2.23 MB"),
  r("IN-A", "Diciembre", 2020, "UniBank", "3.01 MB"),
  r("IN-A", "Diciembre", 2020, "UniLeasing", "7.52 MB"),
  r("INT-T", "Septiembre", 2020, "UniBank", "3.47 MB"),
  r("INT-T", "Septiembre", 2020, "UniLeasing", "1.6 MB"),
  r("INT-T", "Junio", 2020, "UniBank", "2.64 MB"),
  r("INT-T", "Junio", 2020, "UniLeasing", "983.38 KB"),
  r("INT-T", "Marzo", 2020, "UniBank", "2.45 MB"),
  r("INT-T", "Marzo", 2020, "UniLeasing", "865.75 KB"),
];

export const internos: InternalRow[] = [
  {
    year: 2025,
    marzo: { label: "Estados Financieros Internos - Marzo 2025", size: "1.97 MB", url: ph },
    junio: { label: "Estados Financieros Internos - Junio 2025", size: "1.22 MB", url: ph },
    septiembre: { label: "Estados Financieros Internos - Septiembre 2025", size: "1.61 MB", url: ph },
  },
  {
    year: 2024,
    marzo: { label: "Estados Financieros Internos - Marzo 2024", size: "15.41 MB", url: ph },
    junio: { label: "Estados Financieros Internos - Junio 2024", size: "545 KB", url: ph },
    septiembre: { label: "Estados Financieros Internos - Septiembre 2024", size: "1.56 MB", url: ph },
  },
  {
    year: 2023,
    marzo: { label: "Estados Financieros Internos - Marzo 2023", size: "4.37 MB", url: ph },
    junio: { label: "Estados Financieros Internos - Junio 2023", size: "1.83 MB", url: ph },
    septiembre: { label: "Estados Financieros Internos - Septiembre 2023", size: "2.55 MB", url: ph },
  },
  {
    year: 2022,
    marzo: { label: "Estados Financieros Internos - Marzo 2022", size: "2.50 MB", url: ph },
    junio: { label: "Estados Financieros Internos - Junio 2022", size: "5.86 MB", url: ph },
    septiembre: { label: "Estados Financieros Internos - Septiembre 2022", size: "1.57 MB", url: ph },
  },
  {
    year: 2021,
    marzo: { label: "Estados Financieros Internos - Marzo 2021", size: "2.88 MB", url: ph },
    junio: { label: "Estados Financieros Internos - Junio 2021", size: "2.88 MB", url: ph },
    septiembre: { label: "Estados Financieros Internos - Septiembre 2021", size: "2.97 MB", url: ph },
  },
  { year: 2020 },
];
