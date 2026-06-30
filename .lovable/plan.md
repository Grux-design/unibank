
## Goal

Update `src/data/estadosFinancieros.ts` so each document points to the real PDF URL from the spreadsheet, and remove the records marked for deletion. No UI changes.

## Changes in `src/data/estadosFinancieros.ts`

### 1) `auditados` — set `url` and remove records

Keep & link:
- Dic 2025 — UniBank 947.79 KB → `eeff_unibank_y_subsidiarias_2025.pdf`
- Dic 2025 — UniBank 2.83 MB (x2) → same `eeff_unibank_y_subsidiarias_2025.pdf`
- Dic 2025 — Grupo UniBank 932.62 KB → `grupo_unibank_subs_2025.pdf`
- Dic 2024 — UniBank → `eeff_unibank_y_subsidarias_2024.pdf`
- Dic 2024 — Grupo UniBank → `grupo_unibank_y_subsidarias_diciembre_2024.pdf`
- Dic 2023 — UniBank → `unibank_y_subsidiarias_diciembre_2023_final_emision_3.pdf`
- Dic 2023 — Grupo UniBank → `grupo_unibank_subsidiarias_-_dic_2023.pdf`
- Dic 2022 — UniBank → `estados_financieros_unibank_s.a._y_subsidiarias_2022_auditados.pdf`
- Dic 2022 — Grupo UniBank → `estados_financieros_grupo_unibank_y_subsidiaras_2022_auditados.pdf`
- Dic 2021 — Grupo UniBank → (spreadsheet reuses the 2022 Grupo PDF URL — I'll use it as given; flagging that this looks like a copy/paste in the source file)
- Dic 2021 — UniBank → `estados_financieros_unibank_-_diciembre_2021.pdf`

Delete (marked "NO publicarlos / Eliminarlo"):
- Dic 2020 — UniBank
- Dic 2020 — Grupo UniBank
- Dic 2019 — UniBank
- Dic 2019 — Grupo UniBank
- Dic 2018 — UniBank
- Dic 2018 — Uni B&T Holdings

### 2) `regulatoria` — set `url`, add 2026 entries, remove records

Add (new, not present in current data):
- Marzo 2026 — INT-T UniLeasing → `int-2909-unileasing-mar2026-final.pdf` (no size in sheet — leave size blank `""`)
- Marzo 2026 — INT-T UniBank → `int_unibank_mar2026.pdf` (no size — `""`)

Link existing 2023–2025 rows to their URLs (full mapping from spreadsheet). Notable:
- Sep 2023 — INT-T UniBank: spreadsheet says "Do not add any link" → keep entry with `url: "#"`.

Delete all 2020, 2021, 2022 regulatory entries (every row marked "NO publicarlos / Eliminarlo"): all 18 rows from years 2022/2021/2020 currently in the file.

### 3) `internos` — set `url` quarter-by-quarter, remove records

Keep & link (2023, 2024, 2025) using the URLs from the sheet.

Delete (NO publicarlos):
- 2022 (Marzo, Junio, Septiembre) — drop the whole 2022 row
- 2021 (Marzo, Junio, Septiembre) — drop the whole 2021 row
- The empty `2020` placeholder row stays removed (already had no quarters)

Result: `internos` will contain only 2023, 2024, 2025 rows.

## Out of scope

- No component, layout, or styling changes.
- No new translations or text changes.
- The "Marzo 2026" regulatory rows will appear automatically in the existing table (they have no size; the UI already renders the size column as text so a blank string is fine).

## Verification

After editing, I'll re-read the file and run the type check to make sure the shape (`FinancialDoc`, `RegulatoryDoc`, `InternalRow`) stays valid.
