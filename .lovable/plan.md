## Correcciones en home → tab Empresas (`BusinessSection.tsx`)

### 1. Subtítulo del hero
Reemplazar el `body` actual:
> "Crédito comercial, planilla empresarial y valores – soluciones financieras adaptadas a cada etapa y sector de tu empresa."

Por:
> "Crédito comercial, planilla empresarial, Leasing, bonos verdes y soluciones financieras adaptadas a cada etapa y sector de tu negocio."

Línea 310 del componente.

### 2. Reemplazar la card "Servicios de Planilla" por UniLeasing
En el array `services` (líneas 34–42), sustituir el item `planilla` por:
- `id`: `"unileasing"`
- `icon`: `Truck` (de lucide-react)
- `label` (cintillo crema): `"UniLeasing"`
- `title`: `"Impulsa tu negocio."`
- `body`: `"Crece y Evoluciona con nuestro Leasing para adquirir la flota que necesites."`
- `cta`: `"Más información"`
- `href`: `"/grupo/unileasing"`
- `image`: nueva imagen relacionada a flota/vehículos comerciales (Unsplash, mismo patrón que el resto)

Actualizar referencias `hovered === "planilla"` → `"unileasing"` y `wPlanilla` → `wUnileasing` (líneas 227, 268) para mantener la lógica de hover-expand.

### 3. Hacer que el CTA navegue
Actualmente `CtaLink` es un `<span>` sin enlace. Cambiarlo para que acepte un `href` opcional y, cuando exista, renderice un `<Link>` de `react-router-dom` (manteniendo estilos y animación). Las otras dos cards seguirán funcionando igual (sin `href`, mismo span).

## Archivos
- ✏️ `src/components/organisms/BusinessSection.tsx`

## Fuera de alcance
- Las otras dos cards (Préstamos Comerciales, Emisión de Valores) no se tocan.
- No se modifica la pestaña Personas ni la página de UniLeasing.
