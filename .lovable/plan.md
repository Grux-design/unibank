## Cambios

**1. `src/data/megaMenuData.ts`** — Mega Menú Personas
- Featured card: label "Cuenta Naranja+ Digital" → "Cuenta de Ahorros"; slug `cuenta-naranja-plus-digital` → `cuenta-de-ahorros`.
- Categoría "Cuentas": renombrar primer item igual y **eliminar** la fila existente "Cuenta de Ahorro" (slug `cuenta-de-ahorro`).

**2. `src/data/heroSlides.ts`**
- Slide id `naranja`: `cardTitle` "Cuenta Naranja+" → "Cuenta de Ahorros".

**3. `src/components/organisms/ProductsSection.tsx`**
- Texto visible "Cuenta Naranja + Digital" (≈línea 207) → "Cuenta de Ahorros".
- Atributos `alt` de las dos imágenes (líneas ≈225 y ≈336) → "Cuenta de Ahorros".

## Fuera de alcance
- `SearchWidget`, `AbreCuentaWidget`, `SearchOverlay` ya muestran "Cuenta de Ahorros" hacia la ruta legacy `/cuenta-ahorros` — no se tocan.
- Contentful: marketing/CMS deberá actualizar el slug de la entrada a `cuenta-de-ahorros` para que `/personas/cuentas/cuenta-de-ahorros` cargue el contenido.
