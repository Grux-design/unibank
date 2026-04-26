## Crear la página "UniTrust" y enlazarla desde el footer

### Resumen
Se creará una nueva página dedicada `/grupo/unitrust` con un diseño top-notch siguiendo el mismo lenguaje visual de la página de Junta Directiva (hero con gradiente, eyebrow pill, badges de iconos, cards con hover, brand naranja `#FF8136`, Inter). Se actualizará el item "UniTrust" del footer en la columna "Grupo UniBank" para que apunte a esta nueva ruta.

### Archivos a crear/editar

#### 1. `src/pages/UniTrustPage.tsx` (NUEVO)

Estructura visual:

- **Helmet (SEO)**: Título "UniTrust | Grupo UniBank" y descripción sobre socio estratégico fiduciario.

- **Hero section** (mismo patrón de JuntaDirectivaPage):
  - Fondo `bg-gradient-to-br from-muted/40 via-background to-background` con dos blurs decorativos en primary.
  - Eyebrow pill: "Grupo UniBank · Fiduciaria".
  - H1: **"UniTrust"** en grande.
  - Subtítulo: *"Socio estratégico para la gestión y planificación de su patrimonio personal y empresarial."*
  - **CTA principal mejorado** (copywriting refinado): **"Solicite su asesoría fiduciaria"** (alternativas: "Hablemos de su patrimonio", "Inicie su asesoría personalizada"). Usaremos **"Solicite su asesoría fiduciaria"**.
    - El botón usa `<a href="mailto:...">` con:
      - `to`: `unitrust@unibank.com.pa`
      - `subject`: `Solicitud de asesoría — UniTrust`
      - `body` pre-llenado: *"Hola equipo de UniTrust,\n\nMe interesa recibir asesoría sobre los servicios fiduciarios que ofrecen. Por favor contáctenme para conversar sobre las siguientes necesidades:\n\n[Describa brevemente su caso]\n\nDatos de contacto:\nNombre:\nTeléfono:\nCorreo:\n\nGracias."*
    - Botón estilizado con `bg-primary text-primary-foreground`, ícono `Mail` o `ArrowRight` de lucide.

- **Sección "¿Qué es UniTrust?"**:
  - Layout de 2 columnas (texto + card visual con icono `ShieldCheck` o `Landmark`).
  - Eyebrow pill + heading + párrafo descriptivo del contenido provisto.

- **Sección "Nuestro Compromiso"**:
  - Eyebrow + título.
  - Grid de 4 cards (sm:grid-cols-2 lg:grid-cols-4) con iconos de lucide, una por cada compromiso:
    1. *Confianza e imparcialidad* — `Handshake`
    2. *Estructuras a la medida* — `Wrench` o `Settings2`
    3. *Eficiencia operativa* — `Zap`
    4. *Atención y confidencialidad* — `Lock`
  - Cada card con border, hover lift, icono en bg-primary/10.

- **Sección "Productos UniTrust"** (con fondo `bg-muted/30` para separar):
  - Eyebrow "Productos" + título "Soluciones para salvaguardar su patrimonio".
  - Grid de 6 productos (sm:grid-cols-2 lg:grid-cols-3), cada uno como card con icono y nombre:
    1. Fideicomiso de Garantía — `Shield`
    2. Fideicomiso de Administración — `Briefcase`
    3. Fideicomiso de Inversión — `TrendingUp`
    4. Fideicomiso de Desarrollo Inmobiliario — `Building2`
    5. Fideicomiso Protección Patrimonial — `ShieldCheck`
    6. Escrow — `KeyRound`
  - Cada card con hover (lift + border primary), icono en círculo bg-primary/10.

- **CTA final (banner)**:
  - Sección con fondo `bg-primary/5` o gradiente sutil.
  - Título: "¿Listo para proteger y planificar su patrimonio?"
  - Botón mailto duplicado con el mismo `mailto:` enriquecido.

#### 2. `src/App.tsx`
- Importar `UniTrustPage`.
- Agregar ruta `<Route path="/grupo/unitrust" element={<UniTrustPage />} />` antes de las rutas dinámicas `/:slug`.

#### 3. `src/data/footerData.ts`
- En la columna "Grupo UniBank", actualizar el item `{ label: "UniTrust" }` para que sea `{ label: "UniTrust", href: "/grupo/unitrust" }`.

### Notas de diseño
- Reutilizar exactamente el patrón visual de `JuntaDirectivaPage` (hero con blurs, eyebrow pills, section headers, cards redondeadas con hover lift).
- 100% Tailwind con tokens semánticos (`primary`, `muted`, `border`, `card`, `foreground`).
- Sin nuevas dependencias — solo iconos de `lucide-react` ya disponibles.
- El `mailto` se construirá con `encodeURIComponent` para subject y body para preservar saltos de línea.