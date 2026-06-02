## Objetivo

Generar un archivo `.xlsx` (entregable en `/mnt/documents/`) con todo el contenido editable que viene de Contentful para las páginas de producto de Personas y Empresas. El archivo debe permitir a marketing leer, comentar y proponer cambios de texto/imagen por producto sin tocar el CMS, y servirnos como referencia única para QA.

No se modifica código de la app — es una tarea de extracción de datos + generación de artefacto.

## Alcance de páginas

Tomadas de `src/data/megaMenuData.ts`. Cada slug corresponde a un `page` en Contentful resuelto por `useContentfulPage` (`ProductDetailPage.tsx`).

**Personas (10):** cuenta-de-ahorros, cuenta-corriente, deposito-a-plazo-fijo, prestamo-de-auto-digital, prestamo-de-vivienda, banca-movil-unibank, banca-en-linea, mastercard-black-debito, cajilla-de-seguridad, invertis-global-income-fund

**Empresas (9):** cuenta-juridica-digital, prestamo-comercial, unileasing, linea-de-credito, prestamo-agroindustrial, emision-de-valores, pago-de-planilla, mastercard-black-debito, banca-en-linea-empresarial, banca-movil

Los slugs con `href` externo (UniVivir, Invertis listado externo) no se incluyen porque no tienen entrada en el CMS — se anotará en una hoja aparte.

## Estructura del Excel

Un único workbook con estas hojas:

1. **`Índice`** — tabla maestra: Audiencia · Categoría · Producto · Slug · URL en sitio · Existe en CMS (sí/no) · # secciones · Última actualización (Contentful `updatedAt`) · Notas.

2. **`Personas - Contenido`** y **`Empresas - Contenido`** — una fila por **campo editable** para que marketing pueda editar la columna "Nuevo valor" y devolverlo. Columnas:

   | Columna | Descripción |
   |---|---|
   | Producto | Nombre humano (ej. "Cuenta de Ahorros") |
   | Slug | `cuenta-de-ahorros` |
   | Sección # | Orden en la página (1, 2, 3…) |
   | Tipo de sección | `Hero - Form`, `Feature Strip`, `Feature Banner`, `Card Grid`, `Benefit List`, `FAQ` |
   | Nombre interno | `internalName` del CMS (referencia para el equipo) |
   | Campo | `headline`, `subheadline`, `copy`, `mainImage`, `secondaryCta`, `item[1].title`, `item[1].description`, `item[1].icon`, `item[1].image`, `item[1].question`, `item[1].answer`, `item[1].link`… |
   | Tipo | texto / rich text / imagen / link / boolean |
   | Valor actual | Texto plano; rich text aplanado; URL absoluta para imágenes |
   | Preview imagen | Hipervínculo clicable a la imagen (cuando aplique) |
   | Nuevo valor (marketing) | Columna vacía con fondo amarillo para edición |
   | Notas QA | Columna vacía para comentarios |
   | Entry ID | ID de Contentful del entry (para trazabilidad) |

3. **`SEO`** — una fila por página: Producto · Slug · SEO Title · SEO Description · Canonical URL · Nuevo Title · Nueva Description.

4. **`Imágenes`** — catálogo plano de todas las imágenes referenciadas: Producto · Sección · Campo · URL · Dimensiones · Tamaño · Nombre de archivo · Reemplazo (URL nueva).

5. **`Leyenda`** — explicación de columnas, código de colores (amarillo = editable), instrucciones de devolución y enlaces externos no-CMS.

## Cómo se obtiene la data

Se ejecutará un script Node/TS de un solo uso (no se commitea al repo) que:

1. Para cada slug, llama al edge function `contentful-proxy` (mismo flujo que `useContentfulPage`) con `content_type=page`, `fields.slug=<slug>`, `include=3`.
2. Resuelve `sections[]` y `items[]` usando la misma lógica de `useContentfulPage.ts` (entry/asset maps).
3. Aplana cada sección a filas usando los tipos de `src/integrations/contentful/types.ts` (`SectionFields`, `FeatureItemFields`, `SeoMetadataFields`).
4. Para campos `copy` con rich text de Contentful, los serializa a texto plano (recorriendo nodos) para que sean legibles/editables en Excel.
5. Escribe el `.xlsx` con `exceljs` aplicando: encabezados en negrita, columna "Nuevo valor" con relleno amarillo, ancho de columna, freeze de la primera fila, hipervínculos en las URLs de imagen.

## Entregable

`/mnt/documents/unibank-cms-contenido-productos.xlsx`, expuesto en chat con `<presentation-artifact>` para descarga directa. Después del primer pase ejecuto un QA visual (convierto cada hoja a imagen y reviso layout, columnas, sin truncados) antes de entregarlo.

## Detalles técnicos

- Script en `/tmp/extract-cms.ts`, ejecutado con `bun`.
- Reutiliza tipos de `src/integrations/contentful/types.ts` para evitar duplicar shape.
- No instala dependencias en el proyecto; `exceljs` se instala en `/tmp` o se usa el script Python con `openpyxl` del skill XLSX si resulta más simple.
- Si algún slug no devuelve entrada en CMS, se registra en `Índice` con "Existe en CMS = no" y se omite de las hojas de contenido.

## Fuera de alcance

- Editar el CMS o crear flujo de re-import desde Excel (el archivo es de ida; marketing devuelve, alguien aplica los cambios).
- Páginas estáticas hechas a mano (CajillaSeguridadPage, UniLeasingPage, UniTrustPage, etc.) — esas no salen del CMS. Si las quieres incluidas, dímelo y agrego una hoja separada con su contenido hardcoded.
- Blog posts.
