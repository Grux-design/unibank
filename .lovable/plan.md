## Update `Canal de Denuncias` form

Rebuild the form on `src/pages/CanalDenunciasPage.tsx` with the exact field set you provided, plus Google reCAPTCHA v2 verification.

### 1. Updated dropdown options (Spanish, exact)

- **Relación**: Empleado, Accionista, Proveedor, Cliente, Miembro de la Junta Directiva, Estudiante, Otro
- **Lugar donde ocurrieron los hechos**: Casa Matriz, Costa del Este, Oficinas, Otra
- **Empresa relacionada**: UniBank, UniTrust, UniLeasing, Invertis Securities
- **Motivo de denuncia** (full list):
  - Incumplimiento al Código de Ética
  - Corrupción, Soborno y Cohecho
  - Conflictos de interés / actividades fuera del Grupo
  - Prevención de Blanqueo de Capitales y Financiamiento del Terrorismo, Financiamiento de Armas de Destrucción Masiva / Evasión Fiscal
  - Competencia Desleal
  - Privacidad / Seguridad de la Información / Confidencialidad
  - Fraude
  - Ciberseguridad
  - Desigualdad de oportunidades
  - Discriminación
  - Acoso Sexual o por razón de sexo
  - Acoso laboral
  - Represalias
  - Maltrato Físico o Psicológico
  - Falsificación de Información (Interna o Externa)
  - Otro
- **¿Cómo conoce los hechos?** *(new field)*: Me sucedió a mí, Lo he visto, Lo he escuchado, Me lo han dicho, Vi un documento, Otro

### 2. New / restructured fields

- Add **`knowledge_source`** field (¿Cómo conoce los hechos?), required.
- Replace single `<input type="date">` and `<input type="time">` with **separated selects**:
  - **Día**: Mes (Ene–Dic) + Día (1–31) + Año (2024–2028)
  - **Hora**: Hora (1–12) + Minuto (00–59) + AM/PM
  - Combine internally into ISO `incident_date` (date) and `incident_time` (`HH:mm` 24h) before insert (keeps DB schema unchanged).
- Update **file upload** copy & accept list to: `jpg, jpeg, png, pdf, doc, docx, ppt, pptx, mov, mp3, zip, m4a, mp4`, max **20 MB** with client-side size validation.
- Update **acceptance text** to the full legal paragraph you provided, including the link `https://www.unibank.com.pa/es/politicas-de-privacidad-y-seguridad` (rendered as anchor).
- Keep optional Nombre / Teléfono / Email exactly as listed.

### 3. Google reCAPTCHA v2 integration

- Install `react-google-recaptcha` and its types.
- Add a `<ReCAPTCHA>` widget above the submit button. Submit is disabled until a token exists.
- Store the **Site Key** as a public env var `VITE_RECAPTCHA_SITE_KEY` (publishable, safe in frontend).
- **Server-side verification** via a new Supabase Edge Function `verify-recaptcha`:
  - Reads `RECAPTCHA_SECRET_KEY` from secrets.
  - Calls `https://www.google.com/recaptcha/api/siteverify` with the token.
  - Returns `{ success: boolean }`. Includes CORS headers; `verify_jwt = false` so the public form can call it.
- Client flow on submit: call `verify-recaptcha` → if not success, block insert and show toast → otherwise upload file + insert into `complaints` as today.
- I will request both secrets via `add_secret` (you'll get them free at https://www.google.com/recaptcha/admin/create — register domain `unibank.com.pa` + `lovable.app`):
  - `VITE_RECAPTCHA_SITE_KEY`
  - `RECAPTCHA_SECRET_KEY`

### 4. DB / Storage

No schema changes needed. Existing `complaints` table columns map cleanly:
- `incident_date` ← composed `YYYY-MM-DD`
- `incident_time` ← composed `HH:mm`
- All other columns unchanged. File still uploads to `complaint-files` bucket.

### 5. Validation (Zod)

Tighten schema to require the new fields (`knowledge_source`, day/month/year, hour/minute/period) and the captcha token. Keep Nombre/Teléfono/Email optional. Add `.max()` limits to all free-text fields (defense in depth, since client-only validation).

### Files affected
- `src/pages/CanalDenunciasPage.tsx` — full form rewrite
- `supabase/functions/verify-recaptcha/index.ts` — new edge function
- `supabase/config.toml` — register the new function with `verify_jwt = false`
- `package.json` — add `react-google-recaptcha`
- Secrets: `VITE_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY` (requested after approval)
