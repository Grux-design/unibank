

## Construir 5 nuevas páginas y enlazarlas desde el footer

### Resumen

Se crearán 5 páginas nuevas, cada una con un diseño diferente según su naturaleza, todas siguiendo el branding de UniBank (naranja #FF8136, Inter, estilo moderno y limpio). Se actualizarán los links del footer para apuntar a cada una.

### Páginas a crear

#### 1. Sucursales (`/sucursales`)
Página con tarjetas de oficinas en un grid moderno. Cada tarjeta incluye nombre, dirección, teléfono, horario, y botones de acción (Llamar, Ver Mapa). Datos hardcoded de las oficinas reales (Avenida Balboa, Costa del Este, etc. - se extraerán del sitio actual). Diseño: hero con título + grid de cards con iconografía (MapPin, Phone, Clock).

**Archivo:** `src/pages/SucursalesPage.tsx`

#### 2. Canal de Denuncias (`/canal-de-denuncias`)
Formulario extenso similar al de la imagen de referencia. Campos: Relación, Lugar, Empresa, Anonimato (Sí/No), Nombre, Teléfono, Email, Motivo, Descripción, Fecha, Hora, Archivo adjunto, Aceptación legal. Usará `react-hook-form` + `zod` como el ContactPage existente. El envío se guardará en una tabla de Lovable Cloud.

**Archivo:** `src/pages/CanalDenunciasPage.tsx`
**Base de datos:** Tabla `complaints` para almacenar las denuncias.

#### 3. Noticias/Blog (`/blog`)
Reemplazar el stub actual de BlogPage con una página de listado de artículos con diseño de cards en grid. Por ahora con contenido placeholder (6-8 artículos ficticios). Hero con título "Noticias y Blog", grid de cards con imagen, fecha, título, extracto, y botón "Leer más".

**Archivo:** `src/pages/BlogPage.tsx` (reescribir)

#### 4. Trabaja con Nosotros (`/trabaja-con-nosotros`)
Formulario de aplicación de empleo. Campos: Nombre, Teléfono, Email, Mensaje/Carta de presentación, Archivo adjunto (CV). Similar a la imagen de referencia pero con diseño moderno. Se guardará en tabla de Lovable Cloud.

**Archivo:** `src/pages/TrabajaConNosotrosPage.tsx`
**Base de datos:** Tabla `job_applications` para almacenar las aplicaciones.

#### 5. Tarifario (`/tarifario`)
Página simple que embebe el PDF del tarifario en un iframe/viewer, con un botón prominente de descarga directa al PDF. No requiere formulario ni base de datos.

**Archivo:** `src/pages/TarifarioPage.tsx`

### Cambios en archivos existentes

**`src/App.tsx`** - Agregar 4 nuevas rutas (`/sucursales`, `/canal-de-denuncias`, `/trabaja-con-nosotros`, `/tarifario`) antes de `/:slug`. La ruta `/blog` ya existe.

**`src/data/footerData.ts`** - Actualizar hrefs:
- "sucursales" → `/sucursales`
- "Canal de denuncias" → `/canal-de-denuncias`
- "Noticias" y "Blog" → `/blog`
- "Trabaja con nosotros" → `/trabaja-con-nosotros`
- "Tarifario" → `/tarifario`

### Base de datos (migraciones)

Se crearán dos tablas con RLS:
- **`complaints`**: campos para todos los datos del formulario de denuncias, con RLS que permite insert anónimo (público) y select solo para admins.
- **`job_applications`**: nombre, teléfono, email, mensaje, archivo CV, con RLS similar.

Se usará Lovable Cloud Storage para los archivos adjuntos de ambos formularios.

### Notas de diseño
- Todas las páginas usan el hero con fondo `bg-muted/30` y título grande, consistente con las institucionales.
- Formularios usan los componentes shadcn/ui existentes (Form, Input, Textarea, Button, Select).
- Cards de sucursales y blog usan bordes redondeados, sombras suaves, hover con transición naranja.
- Tipografía Inter, color primario naranja #FF8136 para CTAs y acentos.

