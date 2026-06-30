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

const BASE = "https://www.unibank.com.pa/sites/default/files/financial_statements";

export const auditados: FinancialDoc[] = [
  { label: "Estados Financieros - Diciembre 2025", year: 2025, size: "947.79 KB", url: `${BASE}/eeff_unibank_y_subsidiarias_2025.pdf` },
  { label: "Estados Financieros - Diciembre 2025", year: 2025, size: "2.83 MB", url: `${BASE}/eeff_unibank_y_subsidiarias_2025.pdf` },
  { label: "Estados Financieros - Diciembre 2025", year: 2025, size: "2.83 MB", url: `${BASE}/eeff_unibank_y_subsidiarias_2025.pdf` },
  { label: "Estados Financieros Grupo UniBank - Diciembre 2025", year: 2025, size: "932.62 KB", url: `${BASE}/grupo_unibank_subs_2025.pdf` },
  { label: "Estados Financieros - Diciembre 2024", year: 2024, size: "7.2 MB", url: `${BASE}/eeff_unibank_y_subsidarias_2024.pdf` },
  { label: "Estados Financieros Grupo UniBank - Diciembre 2024", year: 2024, size: "2.5 MB", url: `${BASE}/grupo_unibank_y_subsidarias_diciembre_2024.pdf` },
  { label: "Estados Financieros - Diciembre 2023", year: 2023, size: "1.04 MB", url: `${BASE}/unibank_y_subsidiarias_diciembre_2023_final_emision_3.pdf` },
  { label: "Estados Financieros Grupo UniBank - Diciembre 2023", year: 2023, size: "1.51 MB", url: `${BASE}/grupo_unibank_subsidiarias_-_dic_2023.pdf` },
  { label: "Estados Financieros - Diciembre 2022", year: 2022, size: "5.33 MB", url: `${BASE}/estados_financieros_unibank_s.a._y_subsidiarias_2022_auditados.pdf` },
  { label: "Estados Financieros Grupo UniBank - Diciembre 2022", year: 2022, size: "5.30 MB", url: `${BASE}/estados_financieros_grupo_unibank_y_subsidiaras_2022_auditados.pdf` },
  { label: "Estados Financieros Grupo UniBank - Diciembre 2021", year: 2021, size: "887.33 KB", url: `${BASE}/estados_financieros_grupo_unibank_y_subsidiaras_2022_auditados.pdf` },
  { label: "Estados Financieros - Diciembre 2021", year: 2021, size: "903.07 KB", url: `${BASE}/estados_financieros_unibank_-_diciembre_2021.pdf` },
];

const r = (
  form: "INT-T" | "IN-A",
  period: RegulatoryDoc["period"],
  year: number,
  entity: RegulatoryDoc["entity"],
  size: string,
  url: string,
): RegulatoryDoc => ({
  label: `Formulario ${form} ${period} ${year} | ${entity}`,
  year,
  period,
  entity,
  size,
  url,
});

export const regulatoria: RegulatoryDoc[] = [
  // 2026
  r("INT-T", "Marzo", 2026, "UniLeasing", "", `${BASE}/int-2909-unileasing-mar2026-final.pdf`),
  r("INT-T", "Marzo", 2026, "UniBank", "", `${BASE}/int_unibank_mar2026.pdf`),
  // 2025
  r("INT-T", "Diciembre", 2025, "UniLeasing", "4.63 MB", `${BASE}/formulario_int_-_unileasing_-_31_dic_2025.pdf`),
  r("IN-A", "Diciembre", 2025, "UniBank", "2.51 MB", `${BASE}/formulario_in-a_diciembre_2025_unibank.pdf`),
  r("IN-A", "Diciembre", 2025, "UniLeasing", "2.23 MB", `${BASE}/in-a-2909-unileasing-dic25-final.pdf`),
  r("INT-T", "Diciembre", 2025, "UniBank", "15.85 MB", `${BASE}/estados_financieros_y_int_unibank_y_subs_dic2025_c.pdf`),
  r("INT-T", "Septiembre", 2025, "UniLeasing", "1.85 MB", `${BASE}/int-2909-unileasing-sept2025-final.pdf`),
  r("INT-T", "Junio", 2025, "UniBank", "7.36 MB", `${BASE}/int-2776-unibank-jun-25.pdf`),
  r("INT-T", "Junio", 2025, "UniLeasing", "1.6 MB", `${BASE}/int-2909-unileasing-jun2025-final.pdf`),
  r("INT-T", "Marzo", 2025, "UniBank", "15.33 MB", `${BASE}/int-2776-unibank-mar-2025.pdf`),
  // 2024
  r("INT-T", "Diciembre", 2024, "UniBank", "13.69 MB", `${BASE}/int-2776-unibank-dic-24.pdf`),
  r("INT-T", "Diciembre", 2024, "UniLeasing", "1.13 MB", `${BASE}/int-2909-unileasing-dic2024-final.pdf`),
  r("IN-A", "Diciembre", 2024, "UniBank", "2.78 MB", `${BASE}/formulario_in-a_diciembre_2024_unibank.pdf`),
  r("INT-T", "Septiembre", 2024, "UniLeasing", "896.03 KB", `${BASE}/int-2909-unileasing-sept2024-final_0.pdf`),
  r("INT-T", "Septiembre", 2024, "UniBank", "2.44 MB", `${BASE}/int-2776-unibank-sep-24.pdf`),
  r("INT-T", "Junio", 2024, "UniBank", "9.37 MB", `${BASE}/int-2776-unibank-jun-24.pdf`),
  r("INT-T", "Marzo", 2024, "UniLeasing", "7.88 MB", `${BASE}/int-2909-unileasing-mar2024-final.pdf`),
  r("INT-T", "Marzo", 2024, "UniBank", "9.08 MB", `${BASE}/int-2776-unibank-mar-24.pdf`),
  // 2023
  r("INT-T", "Diciembre", 2023, "UniLeasing", "820.24 KB", `${BASE}/int-2909-unileasing-dic2023-final_0.pdf`),
  r("INT-T", "Diciembre", 2023, "UniBank", "2.61 MB", `${BASE}/formulario_int-t_diciembre_2023_unibank_smv.pdf`),
  r("IN-A", "Diciembre", 2023, "UniBank", "7.38 MB", `${BASE}/formulario_in-a_diciembre_2023_unibank.pdf`),
  r("INT-T", "Septiembre", 2023, "UniLeasing", "809.74 KB", `${BASE}/int-2909-unileasing-sept-final_0.pdf`),
  r("INT-T", "Septiembre", 2023, "UniBank", "523.04 KB", "#"),
  r("INT-T", "Junio", 2023, "UniLeasing", "803.6 KB", `${BASE}/int-2909-unileasing-jun-final_0.pdf`),
  r("INT-T", "Junio", 2023, "UniBank", "2.34 MB", `${BASE}/formulario_int-t_junio_2023_unibank.pdf`),
  r("INT-T", "Marzo", 2023, "UniLeasing", "686.92 KB", `${BASE}/formulario_int-2909_-_unileasing_marzo_2023.pdf`),
  r("INT-T", "Marzo", 2023, "UniBank", "2.59 MB", `${BASE}/formulario_int-t_marzo_2023_unibank.pdf`),
];

export const internos: InternalRow[] = [
  {
    year: 2025,
    marzo: { label: "Estados Financieros Internos - Marzo 2025", size: "1.97 MB", url: `${BASE}/estado_financiero_interino_-_marzo_2025_-_unibank_s_a_y_subs.pdf` },
    junio: { label: "Estados Financieros Internos - Junio 2025", size: "1.22 MB", url: `${BASE}/unibank_y_subsidiarias_interino_-_junio_2025_2.pdf` },
    septiembre: { label: "Estados Financieros Internos - Septiembre 2025", size: "1.61 MB", url: `${BASE}/unibank_subs_interinos_-_septiembre_2025.pdf` },
  },
  {
    year: 2024,
    marzo: { label: "Estados Financieros Internos - Marzo 2024", size: "15.41 MB", url: `${BASE}/estados_financieros_interinos_-_marzo_2024_unibank_y_sub.pdf` },
    junio: { label: "Estados Financieros Internos - Junio 2024", size: "545 KB", url: `${BASE}/estados_financieros_interinos_-_unibank_s.a._y_sub_junio_2024_2.pdf` },
    septiembre: { label: "Estados Financieros Internos - Septiembre 2024", size: "1.56 MB", url: `${BASE}/unibank_y_subsidiarias_-_interino_-_septiembre_2024.pdf` },
  },
  {
    year: 2023,
    marzo: { label: "Estados Financieros Internos - Marzo 2023", size: "4.37 MB", url: `${BASE}/estados_financieros_interinos_-_marzo_2023.pdf` },
    junio: { label: "Estados Financieros Internos - Junio 2023", size: "1.83 MB", url: `${BASE}/20230630_-_unibank_s.a._y_sub_-_interino_-_junio_2023.pdf` },
    septiembre: { label: "Estados Financieros Internos - Septiembre 2023", size: "2.55 MB", url: `${BASE}/estados_financieros_-interinos_-sep_2023.pdf` },
  },
];
