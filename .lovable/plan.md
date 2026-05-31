## Cambio

Igualar el ancho del contenedor de `ProductsSection` y `DigitalBanking` al del Hero (`98vw`).

### Archivos a editar

- `src/components/organisms/ProductsSection.tsx` (línea 596): cambiar `maxWidth: 1440` → `maxWidth: "98vw"`.
- `src/components/organisms/DigitalBanking.tsx` (línea 560): cambiar `maxWidth: 1440` → `maxWidth: "98vw"`.

No se tocan otros `maxWidth` (línea 235 de ProductsSection es de una imagen; línea 217 de DigitalBanking es de un párrafo).
