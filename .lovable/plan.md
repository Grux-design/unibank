
## Página "Estados Financieros"

Nueva ruta `/institucional/estados-financieros` con 3 secciones tal como el screenshot, filtro por año, URLs externas vacías (a completar después).

### Archivos

**`src/data/estadosFinancieros.ts`** (nuevo)
Estructura de datos tipada con 3 colecciones. Cada documento: `{ label, year, month?, size, url }`. `url: "#"` placeholder hasta que el usuario provea los enlaces.

- **`auditados`** — 18 entradas extraídas del screenshot:
  - 2025: Estados Financieros – Diciembre 2025 (947.79 KB), Estados Financieros – Diciembre 2025 (2.83 MB), Estados Financieros – Diciembre 2025 (2.83 MB), Estados Financieros Grupo UniBank – Diciembre 2025 (932.62 KB)
  - 2024: Estados Financieros – Diciembre 2024 (7.2 MB), Estados Financieros Grupo UniBank – Diciembre 2024 (2.5 MB)
  - 2023: Estados Financieros – Diciembre 2023 (1.04 MB), Estados Financieros Grupo UniBank – Diciembre 2023 (1.51 MB)
  - 2022: Estados Financieros – Diciembre 2022 (5.33 MB), Estados Financieros Grupo UniBank – Diciembre 2022 (5.30 MB)
  - 2021: Estados Financieros Grupo UniBank – Diciembre 2021 (887.33 KB), Estados Financieros – Diciembre 2021 (903.07 KB)
  - 2020: Estados Financieros – Diciembre 2020 (677.33 KB), Estados Financieros Grupo UniBank – Diciembre 2020 (4.48 MB)
  - 2019: Estados Financieros – Diciembre 2019 (953.61 KB), Estados Financieros Grupo UniBank – Diciembre 2019 (1003.36 KB)
  - 2018: Estados Financieros – Diciembre 2018 (3.61 MB), Estados Financieros Uni B&T Holdings – Diciembre 2018 (3.7 MB)

- **`regulatoria`** — Formularios INT-T / IN-A, etiquetados UniBank o UniLeasing, por periodo (Marzo / Junio / Septiembre / Diciembre) desde 2020 a 2025, ~50 entradas según screenshot. Campos: `label`, `year`, `period`, `entity` ("UniBank" | "UniLeasing"), `size`, `url`.

- **`internos`** — Tabla por año con columnas Marzo/Junio/Septiembre (y eventualmente Diciembre vacío), años 2020–2025 visibles en screenshot. Estructura: `{ year, marzo?, junio?, septiembre?, diciembre? }` donde cada entrada es `{ label, size, url }`.

**`src/pages/EstadosFinancierosPage.tsx`** (nuevo)
- Hero corto reusando el patrón de `InstitutionalPage` (título grande sobre fondo `bg-muted/30`, breadcrumb arriba).
- Filtro por año: chips/pills horizontales scrollables ("Todos", "2025", "2024"…) con estado local. Estilo siguiendo design tokens existentes (orange primary).
- **Sección 1 "Estados Financieros Auditados"** — grid 2-col en desktop, lista cada item con icono PDF, label en `text-primary`, tamaño debajo en muted, abre en nueva pestaña.
- **Sección 2 "Información Regulatoria"** — misma lista de PDFs, filtrable por año y opcionalmente por entidad (UniBank / UniLeasing) con segmento secundario.
- **Sección 3 "Estados Financieros Internos"** — tabla responsive (columnas Marzo/Junio/Septiembre/Diciembre, filas por año) usando `@/components/ui/table`. En mobile colapsa a tarjetas por año.
- Helmet con title/meta description SEO.
- Cada link: `<a href={url} target="_blank" rel="noopener noreferrer">` con icono PDF de `lucide-react` (`FileText`).
- Reutiliza tokens semánticos (`bg-background`, `text-foreground`, `text-primary`, `border-border`).

**`src/App.tsx`**
Añadir ruta antes de la genérica `/institucional/:slug`:
```tsx
<Route path="/institucional/estados-financieros" element={<EstadosFinancierosPage />} />
```

**`src/data/footerData.ts`**
Reañadir el link "Estados Financieros" en la columna "Conócenos" apuntando a `/institucional/estados-financieros` (sustituye al item removido anteriormente).

### Fuera de alcance
- URLs reales de cada PDF (placeholders `#` por ahora, se actualizarán cuando el usuario provea).
- Traducción EN.
- Integración con CMS — los datos viven en `src/data/`.

### Notas técnicas
- Filtro de año derivado dinámicamente de los datos (`[...new Set(items.map(i => i.year))].sort(desc)`).
- Diciembre como columna opcional en Internos para futura expansión sin romper el tipo.
- Sin cambios de business logic ni backend.
