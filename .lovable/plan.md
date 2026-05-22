# Plan: reCAPTCHA en todos los formularios

## ⚠️ Antes de empezar — Seguridad de la Clave Secreta
Compartiste la **clave secreta** (`6Lf3svcsAAAAAIMal8Ibd0Vw890yu0AIGWmhIYfn`) en el chat. Aunque la guardaremos como secret en Lovable Cloud (nunca en el código), **recomiendo regenerarla en la consola de Google reCAPTCHA** porque ya quedó expuesta en el historial. La clave del sitio (`6Lf3sv...RwHY`) es pública y no hay problema.

## Formularios detectados
1. **`src/pages/ContactPage.tsx`** → envía vía Edge Function `send-email`.
2. **`src/pages/CanalDenunciasPage.tsx`** → escribe directo a tabla `complaints` + storage `complaint-files`. Hoy tiene un captcha matemático casero que reemplazaremos.
3. **`src/pages/TrabajaConNosotrosPage.tsx`** → escribe directo a tabla `job_applications` + storage `cv-files`.

## Enfoque
Usaremos **reCAPTCHA v3** (invisible, basado en score) por mejor UX: el usuario no ve el "I'm not a robot". Cada submit obtiene un token de Google que se verifica server-side en una Edge Function antes de procesar el formulario.

> Si prefieres **v2 ("No soy un robot" con checkbox visible)**, dime y lo cambio — las llaves de Google son específicas por tipo, así que tendrías que generar unas nuevas v2.

## Pasos

### 1. Configuración
- Guardar `RECAPTCHA_SECRET_KEY` como secret en Lovable Cloud (te pediré el valor con el flujo seguro).
- Site key pública (`6Lf3sv...RwHY`) la pondremos en una constante en `src/lib/recaptcha.ts` (es pública por diseño).

### 2. Nueva Edge Function `verify-recaptcha`
- `supabase/functions/verify-recaptcha/index.ts`
- Recibe `{ token, action }` → llama a `https://www.google.com/recaptcha/api/siteverify` con la secret key → devuelve `{ success, score }`.
- Umbral: `score >= 0.5` se acepta.
- Configurada con `verify_jwt = false` en `supabase/config.toml` (formularios públicos).

### 3. Helper frontend `src/lib/recaptcha.ts`
- Carga dinámica del script `https://www.google.com/recaptcha/api.js?render=SITE_KEY` una sola vez.
- Función `getRecaptchaToken(action: string): Promise<string>` que ejecuta `grecaptcha.execute(...)`.

### 4. Integración por formulario
- **ContactPage**: antes del `supabase.functions.invoke("send-email", ...)`, obtener token con `action: "contact"` y pasarlo en el body. La función `send-email` se actualiza para verificar el token internamente (llamando a la lógica de `verify-recaptcha`, o invocándola) antes de mandar el email.
- **CanalDenunciasPage**: eliminar el captcha matemático actual (`captcha_answer`, `refreshCaptcha`, validación manual). Antes del upload/insert, obtener token con `action: "complaint"` e invocar `verify-recaptcha`. Si falla, mostrar toast y abortar.
- **TrabajaConNosotrosPage**: igual que arriba con `action: "job_application"`.

### 5. Badge de Google
reCAPTCHA v3 requiere mostrar el badge o un aviso de texto. El badge flotante se carga automáticamente con el script — lo dejamos visible en las páginas con formulario. (Alternativa: ocultarlo con CSS y añadir el texto "Este sitio está protegido por reCAPTCHA…" cerca del botón submit; lo añadiré como microcopy debajo de cada botón de envío para no romper los términos de uso de Google.)

### 6. UX / estados
- Si `getRecaptchaToken` falla (red, bloqueador), toast de error y permitir reintento.
- Loading state existente (`sending`) cubre la latencia extra de la verificación.

## Archivos a crear / modificar
- ➕ `supabase/functions/verify-recaptcha/index.ts`
- ➕ `src/lib/recaptcha.ts`
- ✏️ `supabase/config.toml` (registrar la nueva función sin JWT)
- ✏️ `supabase/functions/send-email/index.ts` (validar token antes de enviar)
- ✏️ `src/pages/ContactPage.tsx`
- ✏️ `src/pages/CanalDenunciasPage.tsx` (también remover captcha matemático)
- ✏️ `src/pages/TrabajaConNosotrosPage.tsx`

## Confirmaciones que necesito
1. ¿v3 invisible (recomendado) o cambiamos a v2 checkbox?
2. ¿OK con eliminar el captcha matemático actual del Canal de Denuncias?
3. ¿Regenerarás la clave secreta en Google antes de que la guarde como secret? (recomendado)
