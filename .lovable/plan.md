

## Rediseñar colores del Hero Carousel

### Resumen
Cambiar el hero de un estilo "naranja vibrante con texto blanco" a un estilo "fondo neutro claro con texto oscuro y acentos naranja", tal como se ve en el screenshot.

### Cambios en el screenshot vs. actual

| Elemento | Actual | Screenshot |
|---|---|---|
| Section background | `#F8F7F6` (light grey) | `#FFFFFF` (blanco) |
| Card container | Gradient naranja | `#F2EFED` (beige claro, sólido) |
| Diagonal pattern | Líneas blancas | Círculos concéntricos naranja suave (decorativo) |
| Eyebrow text | Blanco sobre pill translúcido | Texto gris oscuro `#726F6E`, sin pill/badge |
| Headline | Blanco | Oscuro `#1F1E1E` |
| Highlight words | Blanco con opacidad | Naranja `#FF8136` |
| Body text | Blanco con opacidad | Gris `#726F6E` |
| Primary CTA | Botón negro | Botón naranja `#FF8136` con texto blanco, pill shape |
| Secondary CTA | Botón blanco | Borde gris `#E7E4E1`, texto oscuro, pill shape |
| Arrow buttons | Translúcidos blancos | Borde gris claro, fondo blanco/transparente |
| Progress bar | Track blanco translúcido, fill blanco | Track gris `#E7E4E1`, fill naranja `#FF8136` |
| Counter/tag text | Blanco con opacidad | Gris `#908E8D` |
| Glass card | Fondo oscuro translúcido | Fondo blanco sólido, borde gris, título naranja uppercase |
| Blob/decorative | Blanco translúcido | Círculos concéntricos naranja suave `rgba(255,129,54,0.12)` |

### Archivos a editar

**1. `src/data/heroSlides.ts`** — Actualizar todos los tokens del objeto `THEME`:
- `cardBg`: `"#F2EFED"` (sólido, sin gradiente)
- `hasPattern`: `true` (pero cambiar el patrón a círculos)
- `eyebrowColor`: `"#726F6E"`
- `headlineColor`: `"#1F1E1E"`
- `highlightColor`: `"#FF8136"`
- `bodyColor`: `"#726F6E"`
- `mutedColor`: `"#908E8D"`
- `borderColor`: `"#E7E4E1"`
- `primaryBtnBg`: `"#FF8136"`
- `primaryBtnColor`: `"#FFFFFF"`
- `primaryBtnHoverOp`: `"0.88"` → hover a `#CE4D00`
- `secondaryBtnBg`: `"#FFFFFF"`
- `secondaryBtnColor`: `"#1F1E1E"`
- `secondaryBtnBorder`: `"#E7E4E1"`
- `secondaryBtnHoverBorder`: `"#CAC6C3"`
- `arrowBtnBg`: `"transparent"`
- `arrowBtnBorder`: `"#E7E4E1"`
- `arrowBtnHoverBg`: `"#F2EFED"`
- `arrowIconStroke`: `"#726F6E"`
- `progressTrack`: `"#E7E4E1"`
- `progressFill`: `"#FF8136"`
- `glassBg`: `"#FFFFFF"`
- `glassTitleColor`: `"#FF8136"`
- `glassSubColor`: `"#1F1E1E"`
- `blobFill`: `"rgba(255,129,54,0.08)"`
- `blobAccent`: `"rgba(255,129,54,0.05)"`

**2. `src/components/organisms/HeroCarousel.tsx`** — Cambiar:
- Section `background` de `#F8F7F6` → `#FFFFFF`
- Reemplazar el SVG de líneas diagonales por círculos concéntricos naranja suave (decorativo, posicionado a la derecha)

**3. `src/components/atoms/HeroEyebrow.tsx`** — Quitar el pill/badge (`background`, `borderRadius`, `padding`, `backdropFilter`), dejar solo texto plano con el color del token

**4. `src/components/molecules/HeroGlassCard.tsx`** — Quitar `backdropFilter`/blur, agregar `boxShadow` sutil. Hacer el título uppercase con `letterSpacing`

**5. `src/components/molecules/HeroSlideContent.tsx`** — Cambiar hover del primary button para usar color `#CE4D00` en lugar de opacity

**6. `src/components/molecules/HeroPhotoFrame.tsx`** — Los blobs ya usan tokens de THEME, se actualizan automáticamente. Opcionalmente reemplazar los blobs por arcos/círculos concéntricos naranja como en el screenshot

**7. `src/data/heroSlides.ts`** — Actualizar slide data: el primer slide en el screenshot dice "El préstamo digital para tu próximo auto." con highlight en "próximo auto." Actualizar los `headline` parts para reflejar esto

