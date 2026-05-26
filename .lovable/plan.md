## Objetivo
Cuando alguien envíe el formulario en `/trabaja-con-nosotros`, además del flujo actual (subida del CV a storage + insert en `job_applications`), enviar un correo a **recursos.humanos@unibank.com.pa** con el contenido del formulario y el CV adjunto, usando la API de Resend.

## Cambios

### 1. Nueva Edge Function `send-job-application`
- Ruta: `supabase/functions/send-job-application/index.ts`
- Registrarla en `supabase/config.toml` con `verify_jwt = false` (formulario público).
- Recibe `{ name, phone, email, message, cvUrl, cvFileName, recaptchaToken }`.
- Valida reCAPTCHA v2 con `RECAPTCHA_SECRET_KEY` (mismo patrón que `send-email`).
- Valida campos con Zod (longitudes max).
- Descarga el CV desde `cvUrl` (fetch → ArrayBuffer → base64) para adjuntarlo.
- Envía email vía Resend:
  - `from`: `Unibank <noreply@unibank.com.pa>`
  - `to`: `recursos.humanos@unibank.com.pa`
  - `reply_to`: email del candidato (para responder directo).
  - `subject`: `[Trabaja con Nosotros] Nueva aplicación – {name}`
  - `html`: tabla con nombre, teléfono, email, mensaje y enlace al CV.
  - `attachments`: `[{ filename: cvFileName, content: <base64> }]`
- CORS headers en todas las respuestas.

### 2. Frontend `src/pages/TrabajaConNosotrosPage.tsx`
- Después del `insert` exitoso en `job_applications`, invocar `send-job-application` con los datos del formulario, `cv_url`, `cvFileName: file.name` y el `recaptchaToken`.
- Si el envío del email falla, no romper la UX: igual mostrar el toast de éxito (la aplicación ya está guardada), pero loguear el error en consola. Toast de éxito mantiene mensaje actual.

## No requiere
- Migraciones de DB.
- Secrets nuevos: `RESEND_API_KEY` y `RECAPTCHA_SECRET_KEY` ya están configurados.
- Cambios en `CanalDenunciasPage` ni `ContactPage`.

## Archivos
- ➕ `supabase/functions/send-job-application/index.ts`
- ✏️ `supabase/config.toml`
- ✏️ `src/pages/TrabajaConNosotrosPage.tsx`
