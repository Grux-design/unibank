## Correcciones al Canal de Denuncias

### 1. Subtítulo del hero
Reemplazar el párrafo actual del hero (línea ~239) por el texto completo nuevo, con tres párrafos:
- "Bienvenido al Canal de Denuncias de Grupo UniBank. Por este canal usted podrá como Colaborador, Proveedor, Accionista, Miembros de Junta Directiva, Cliente, Estudiante/Practicante, comunidades afectadas y otras partes interesadas."
- "A través de este canal, usted puede reportar acciones que contravengan la ética, la legalidad o nuestras políticas internas, así como riesgos e impactos ambientales y sociales relacionados con operaciones o proyectos financiados por Grupo UniBank."
- "Su información será tratada de manera confidencial, objetiva e imparcial, garantizando la posibilidad de presentar denuncias anónimas y sin represalias."

### 2. Empresa "UniVivir"
Agregar `"UniVivir"` al array `companies` (línea 29) → `["UniBank", "UniTrust", "UniLeasing", "Invertis Securities", "UniVivir"]`.

### 3. Texto contextual al elegir "Corrupción, Soborno y Cohecho"
Al seleccionar este motivo, mostrar un panel informativo debajo del Select con las tres secciones del documento (Corrupción, Soborno, Cohecho), cada una con su descripción, ejemplos (lista con bullets) y la nota legal. Estilo: tarjeta con fondo `bg-muted/40`, borde sutil, ícono de info, tipografía pequeña.

### 4. Texto contextual al elegir "Prevención de Blanqueo de Capitales…"
Al seleccionar este motivo, mostrar un panel similar al anterior con el texto:
> "Para conocer más sobre las Señales de Alerta contra el Blanqueo de Capitales, Financiamiento del Terrorismo y el Financiamiento de la Proliferación de Armas de Destrucción Masiva ver el siguiente documento: Catálogo de Señales."

Con un enlace al PDF: `https://www.uaf.gob.pa/tmp/file/487/Catalogo-de-Senales-de-Alerta.pdf` (target="_blank", rel="noopener").

Implementación de #3 y #4: extraer un componente local `ReasonInfoPanel` que reciba el valor seleccionado y renderice el panel correspondiente (o nada). Animación sutil de entrada.

### 5. Envío de denuncias por correo (Resend)
Hoy el formulario sólo inserta en `complaints`. Añadir envío de email a los destinatarios:
- giniva.santamaria@unibank.com.pa
- ileana.bundy@unibank.com.pa
- jahir.cervantes@unibank.com.pa

(El cuarto correo del documento es duplicado de jahir.cervantes; se omite la repetición.)

**Nueva Edge Function `send-complaint`** (`supabase/functions/send-complaint/index.ts`):
- Registrarla en `supabase/config.toml` con `verify_jwt = false`.
- Recibe `{ relationship, location, company, isAnonymous, name, phone, email, reason, knowledgeSource, description, incidentDate, incidentTime, fileUrl, fileName, recaptchaToken }`.
- Valida reCAPTCHA v2 con `RECAPTCHA_SECRET_KEY` (mismo patrón que las otras).
- Si hay archivo adjunto, lo descarga desde `fileUrl` y lo adjunta al correo (si supera 10 MB, sólo enlace).
- Envía vía Resend desde `Unibank <noreply@unibank.com.pa>` a los 3 correos (campo `to`), con `reply_to` del denunciante cuando no sea anónimo.
- `subject`: `[Canal de Denuncias] {reason} – {empresa}`.
- HTML con tabla completa de todos los campos (incluyendo aviso de "Denuncia anónima" cuando aplique) y el enlace al archivo si existe.

**Frontend (`CanalDenunciasPage.tsx`)**:
- Tras `insert` exitoso, invocar `send-complaint` con los datos del formulario, `fileUrl`, `fileName: file?.name` y `recaptchaToken`.
- Si el envío de correo falla, no romper la UX: la denuncia ya quedó guardada; se loguea el error en consola y se mantiene el toast de éxito.

## Archivos
- ✏️ `src/pages/CanalDenunciasPage.tsx` (subtítulo, companies, panel de motivo, llamada al edge function)
- ➕ `supabase/functions/send-complaint/index.ts`
- ✏️ `supabase/config.toml`

## No requiere
- Migraciones ni cambios de DB / RLS.
- Secrets nuevos: `RESEND_API_KEY` y `RECAPTCHA_SECRET_KEY` ya están configurados.
