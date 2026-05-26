## Correcciones a la página Uni Leasing

### 1. Renombrar "UniLeasing" → "Uni Leasing" (con espacio)
Reemplazo global de la marca visible al usuario en:
- `src/pages/UniLeasingPage.tsx` (hero H1, sección sostenibilidad, CTA final, meta title/description, eyebrow, asunto del email)
- `src/data/megaMenuData.ts`, `src/data/heroSlides.ts`, `src/data/footerData.ts`
- `src/components/organisms/BusinessSection.tsx` (card label "UniLeasing")
- Otras páginas donde aparezca el texto visible ("UniLeasing")

Nota: se mantienen sin cambio los identificadores internos (rutas `/grupo/unileasing`, nombre del componente `UniLeasingPage`, email `unileasing@unibank.com.pa`, claves `id: "unileasing"`).

### 2. Hero
- Eyebrow: cambiar `Grupo UniBank · Leasing` → `Leasing`.
- H1: `Uni Leasing`.

### 3. Sección "¿Qué puedo adquirir?" — tarjeta "Vehículos y equipos usados"
- Título: `Equipos Usados`
- Subtítulo: `Activos previamente evaluados para su financiamiento mediante leasing, garantizando respaldo y viabilidad.`

### 4. Sección "Beneficios pensados para su negocio"
- Cajón 1 título: `Mensualidades deducibles de impuesto sobre la ISR.`
- Cajón 3 título: `Letras exenta de FECI`
- Cajón 4: título `Plazos Accesibles`, subtítulo `Plazos diseñados para ajustarse a la capacidad de pago y proyección de su negocio.` (icono cambia de `Lock` a algo más acorde, p. ej. `CalendarClock`).

### 5. Sección Sostenibilidad — separar título del cuadro
- Mover el H2 `Uni Leasing promoviendo la sostenibilidad` **fuera** del cuadro con gradiente, como divisor de la página.
- Mantener el subtítulo dentro del cuadro junto con los 4 íconos (Energía renovable, Movilidad eléctrica, Proyectos verdes, Innovación).

### 6. Animación "flip" en los íconos de Sostenibilidad
Al hacer hover sobre cada tarjeta de los 4 íconos, se voltea como una moneda (efecto 3D flip) revelando una imagen temática del concepto:
- Energía renovable → panel solar
- Movilidad eléctrica → auto híbrido
- Proyectos verdes → iluminarias LED
- Innovación → ícono/imagen alternativa

Implementación con utilidades Tailwind (`perspective`, `transform-style: preserve-3d`, `backface-visibility`) y transición CSS; sin librerías nuevas. Imágenes generadas o íconos secundarios de lucide.

### 7. CTA final
- Sustituir `Nuestro equipo de UniLeasing…` → `Nuestro equipo de Uni Leasing…`.

### Archivos a editar
- `src/pages/UniLeasingPage.tsx` (principal)
- `src/data/megaMenuData.ts`, `src/data/heroSlides.ts`, `src/data/footerData.ts`
- `src/components/organisms/BusinessSection.tsx`
- Cualquier otra ocurrencia visible de `UniLeasing` detectada por búsqueda
