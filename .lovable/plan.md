

## Alinear el ancho del hero carousel con el header

El header usa `max-w-screen-xl` (1280px) con padding horizontal `px-4 sm:px-6` (16px / 24px). El hero carousel tiene `maxWidth: 1200` con `paddingLeft/Right: 16px` en la sección exterior.

### Cambio

**Archivo: `src/components/organisms/HeroCarousel.tsx`**

- Cambiar `maxWidth: 1200` del container interno (el card beige) a `maxWidth: 1280` para igualar el `max-w-screen-xl` del header.
- Ajustar el padding horizontal de la sección exterior para usar los mismos valores que el header: `paddingLeft: 24, paddingRight: 24` (equivalente a `sm:px-6`).

Esto hará que los bordes del card beige del hero se alineen visualmente con los bordes de los pills del header.

