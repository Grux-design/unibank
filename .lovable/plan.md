

## Rediseñar Mega Menu según screenshots

### Resumen
Replicar al 100% el diseño del mega menu de los screenshots: layout simplificado de 2 columnas, categorías reorganizadas, items sin descripciones ni tags, pill toggle en lugar de tabs con underline, y featured card con estilos diferenciados por segmento.

### Cambios principales

**1. `src/data/megaMenuData.ts`** — Reestructurar datos completamente:

*Personas:*
- CUENTAS: Cuenta Naranja+ Digital, Cuenta de Ahorro, Cuenta Corriente, Depósito a Plazo Fijo
- CRÉDITO: Préstamo de Auto Digital, Préstamo de Vivienda
- CANALES DIGITALES: Banca Móvil, Banca en Línea
- INVERSIONES Y TARJETAS: Invertis Global Income Fund, Mastercard Black Débito
- Featured: "Cuenta Naranja+ Digital", tag "Lo más popular", CTA "Abrir cuenta"
- Eliminar: ACH Xpress, Xpress Pagos, Préstamo Personal, Tarjeta de Crédito

*Empresas:*
- CUENTAS: Cuenta Jurídica Digital
- FINANCIAMIENTO: Préstamo Comercial, UniLeasing, Líneas de Crédito, Préstamo Agroindustrial
- OTROS SERVICIOS: Emisión de Valores, Pago de Planilla, Mastercard Black Débito
- CANALES DIGITALES: Banca en Línea Empresarial, Banca Móvil
- Featured: "UniLeasing", tag "Nuevo", CTA "Conocer más"
- Eliminar: Cuenta de Ahorro Empresarial, Pagos Masivos ACH, Reportes Financieros, Portafolio Corporativo, ACH Xpress, Xpress Pagos

Agregar campo `ctaLabel` al tipo `featured` para diferenciar el texto del botón.

**2. `src/components/molecules/MegaMenuTabBar.tsx`** — Reemplazar tabs con underline por pill toggle (estilo AudienceToggle):
- Contenedor con borde redondeado, padding interno
- Pill naranja animada detrás del tab activo
- Sin iconos (Users/Building2), sin link "Ver todo"
- Texto blanco en activo, oscuro en inactivo

**3. `src/components/molecules/MegaMenuCategoryGrid.tsx`** — Simplificar:
- Grid de exactamente 2 columnas (`grid-template-columns: 1fr 1fr`)
- Nombres de categoría en naranja `#FF8136` para Personas, gris oscuro `#726F6E` para Empresas
- Items: solo texto del label, sin descripciones, sin tags, sin chevron arrows
- Mantener hover sutil en items
- Mantener secondary links al fondo

**4. `src/components/molecules/MegaMenuFeaturedCard.tsx`** — Rediseñar:
- Personas: fondo naranja `#FF8136`, imagen con borde/marco naranja
- Empresas: fondo oscuro `#1C1917`, imagen sin marco especial
- Tag: texto uppercase sin pill background
- CTA: botón pill con fondo rosa claro `rgba(255,255,255,0.2)` / `#FFE8DA` y texto naranja `#FF8136`
- Texto del CTA dinámico desde data (`ctaLabel`)

**5. `src/components/organisms/MegaMenu.tsx`** — Agregar divisor vertical (`1px solid #E8E4E0`) entre el grid y la featured card.

### Archivos a editar
- `src/data/megaMenuData.ts`
- `src/components/molecules/MegaMenuTabBar.tsx`
- `src/components/molecules/MegaMenuCategoryGrid.tsx`
- `src/components/molecules/MegaMenuFeaturedCard.tsx`
- `src/components/organisms/MegaMenu.tsx`

