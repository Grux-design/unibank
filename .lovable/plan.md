

## Rediseñar FeaturedBanner (Cuenta Naranja+ Digital) con nuevo layout

### Resumen
Reemplazar el layout actual del `FeaturedBanner` en `ProductsSection.tsx` con el diseño de 3 columnas proporcionado: panel izquierdo (badge + título grande), imagen central anclada al fondo con overflow, y panel derecho (subtítulo + body + CTAs con botones cream/transparent).

### Cambios en `src/components/organisms/ProductsSection.tsx`

**1. Reescribir `FeaturedBanner`** con el nuevo layout:
- **Background**: Reemplazar los SVG de gradientes lineales por 3 blobs circulares (`circle` + `ellipse`) con opacidades para profundidad
- **Layout**: Cambiar de 2 columnas (content + image absoluta) a 3 columnas flex:
  - Col izquierda (`flex: 1`, padding 48px): badge pill con borde blanco semi-transparente + título grande (48px, bold, blanco, con line breaks)
  - Col central (300px fijo): imagen portrait posicionada `absolute bottom:0` con `height: 110%` para overflow hacia arriba
  - Col derecha (`flex: 1`, padding 48px): subtítulo (24px), body text, y 2 CTAs
- **CTAs**: Botón primario cream (`#F7E8E0`, texto naranja, con icono Plus) y botón secundario transparente con borde `rgba(247,232,224,0.7)` y hover a blanco
- **Height**: Fijo a 480px (desktop), auto en mobile

**2. Adaptar versión mobile**: En mobile, cambiar a layout vertical (1 columna) con imagen centrada y contenido apilado.

**3. Eliminar `OrangeHoverOverlay`** si ya no se usa en ningún otro lugar (verificar primero).

### Archivo a editar
- `src/components/organisms/ProductsSection.tsx`

