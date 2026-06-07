
## "Wow Effect" — Capa de elevación sobre la home actual

Mantiene intactos layout, copy, secciones y estructura. Añade una capa premium de interacciones, animaciones scroll-driven y atmósfera de fondo, inspirado en Stripe / Linear / Vercel.

### Principios

- **Cero cambios de copy o jerarquía.** Solo decoración + interacciones.
- **Performant first**: `transform`/`opacity` GPU-accelerated, `IntersectionObserver`, `prefers-reduced-motion` respetado.
- **Respeta marca**: el resplandor / acentos se anclan al orange `#ff8136` y al purple `#801fff` ya existentes — nada psicodélico.
- **Sin nuevas dependencias pesadas.** Usamos `framer-motion` (ya instalado) y SVG/CSS puros.

---

### 1. Atmósfera de fondo (capa global de la home)

Nuevo componente **`src/components/effects/AmbientBackground.tsx`** montado una sola vez en `HomePage.tsx`, `position: fixed`, `inset-0`, `pointer-events: none`, `z-index: -1`:

- Dos blobs orgánicos en gradiente radial (orange y purple, `opacity: 0.08`) que flotan lentamente con `transform: translate3d(...)` impulsado por scroll progress (parallax muy sutil, 12-20s loop). Implementado con `useScroll` + `useTransform` de framer-motion.
- Grid SVG minimalista (líneas finas `#000000 / 0.04`) con máscara radial que se desvanece hacia los bordes — da sensación de profundidad sin ruido visual.
- Una capa de **noise grain** (data-uri SVG turbulence, `opacity: 0.025`, `mix-blend-mode: overlay`) para evitar el banding de los gradientes y dar textura "filmica".
- Todo se desactiva automáticamente con `@media (prefers-reduced-motion: reduce)`.

### 2. Scroll-reveal universal

Nuevo hook **`src/hooks/useRevealOnScroll.ts`** + componente wrapper **`src/components/effects/Reveal.tsx`**:

- API: `<Reveal y={24} delay={0.05} once>{children}</Reveal>`.
- Usa `IntersectionObserver` con threshold 0.15. Una vez visible, anima `opacity 0→1` y `translateY 24px→0` en 600ms con easing `[0.22, 1, 0.36, 1]` (out-expo).
- Se aplica como wrapper **no destructivo** alrededor de cada bloque principal de la home:
  - Audience toggle
  - `<ProductsSection />` / `<BusinessSection />` (children individuales si exponen ítems iterables; si no, el bloque completo con stagger interno).
  - `<DigitalBanking />` (cada feature card con `delay = index * 0.08` para efecto cascada).
- Respeta `prefers-reduced-motion`: en ese caso, deja todo visible sin animar.

### 3. Cursor-aware glow + tilt sobre cards existentes

Nuevo componente wrapper **`src/components/effects/SpotlightCard.tsx`** (sin tocar las cards reales):

- Envuelve las cards de `ProductsSection`, `BusinessSection`, `DigitalBanking` mediante un *higher-order wrapper*. Si una card es un `<a>` o `<div>` ya estilizado, el wrapper le aplica un `position: relative` y monta:
  - Una capa `::before` con `radial-gradient(circle 240px at var(--mx) var(--my), rgba(255,129,54,0.18), transparent 60%)` que sigue al cursor (variables CSS actualizadas en `onMouseMove`).
  - Un borde de luz `::after` con gradient conic mask en `border` que se ilumina al hover (técnica Linear).
  - Tilt 3D sutil: `rotateX/rotateY` máximo ±4° con `transform-style: preserve-3d`, `perspective: 1000px`, lerp suave (no jitter).
- Damping y `transition: transform 0.4s cubic-bezier(0.2,0.8,0.2,1)` al salir el cursor.

Si modificar los componentes existentes resulta invasivo, se aplicará la técnica via un **selector global** en una hoja CSS nueva (`src/styles/wow.css`, importada en `main.tsx`) que detecta `[data-wow="card"]` y monta el efecto sin JS — y luego marcamos las cards existentes añadiendo solo el atributo `data-wow="card"` (un solo prop, no toca lógica). Preferimos esta vía para preservar la estructura.

### 4. Botones premium

Nuevo CSS utility class **`.wow-button`** en `src/styles/wow.css`:

- Shimmer sweep diagonal en hover (gradient blanco translúcido 8% que cruza el botón en 700ms, técnica Stripe).
- Lift sutil: `translateY(-1px)` + sombra orange `0 8px 24px -8px rgba(255,129,54,0.4)`.
- Press feedback: `scale(0.985)` con `transition-duration: 80ms` en `:active`.
- Aplicado añadiendo la clase a botones primarios existentes en hero CTAs y banca digital — sin reemplazar componentes.

### 5. Hero — refuerzo de profundidad

Sobre `HeroCarousel` (sin tocarlo):

- Capa overlay en `HomePage.tsx` justo después del hero con un **gradient fade** vertical (de transparente a `bg-background`) en los últimos 80px — funde el hero con el resto de la página y elimina el corte duro.
- Pequeñas **partículas flotantes** (5-7 puntos SVG con `<circle>` animados verticalmente vía CSS keyframes, `opacity: 0.4`, `filter: blur(0.5px)`) confinadas al hero, ancladas absolutamente, `pointer-events: none`. Sutil, no carnavalesco.

### 6. Audience toggle — interacción premium

Sin cambiar su lógica, añadir vía CSS en `wow.css`:

- Sombra suave al pill activo con leve glow orange.
- Indicador subrayado con `layoutId` de framer-motion para una transición fluida entre opciones (el toggle ya usa motion según el patrón del proyecto; si no, se añade un único `motion.div` decorativo absoluto).

### 7. Transición entre Personas / Empresas

Mejorar la `AnimatePresence` existente:

- Sustituir `y: 14` por una combinación `opacity + scale 0.985 + blur(4px)→blur(0)` (350ms). Se siente cinematográfico sin desplazar layout.
- Sin cambios en el toggle ni en las secciones internas.

### 8. Digital Banking — reveal escalonado

Wrappear los items dentro de `DigitalBanking` con `<Reveal>` con `delay` incremental. Si renderiza una lista, basta con un único cambio en el map.

---

### Archivos nuevos

- `src/components/effects/AmbientBackground.tsx`
- `src/components/effects/Reveal.tsx`
- `src/hooks/useRevealOnScroll.ts`
- `src/styles/wow.css` (importado en `src/main.tsx`)

### Archivos modificados (mínimo, solo decorativo)

- `src/pages/HomePage.tsx` — montar `<AmbientBackground />`, envolver bloques con `<Reveal>`, ajustar la transición de `AnimatePresence`, añadir overlay de fade post-hero.
- `src/components/organisms/DigitalBanking.tsx` — envolver el `.map` de features con `<Reveal>` con delay incremental, añadir `data-wow="card"` a cada card.
- `src/components/organisms/ProductsSection.tsx` y `BusinessSection.tsx` — añadir `data-wow="card"` a las cards y `className="wow-button"` a CTAs primarios. Sin cambios estructurales.
- `src/components/organisms/HeroCarousel.tsx` (o el slide content) — añadir `className="wow-button"` a los CTAs principales del hero. Cero cambios en copy/layout.

### Notas técnicas

- `framer-motion` ya está en dependencies (usado en `HomePage`).
- Todos los efectos están envueltos en `@media (prefers-reduced-motion: reduce)` con fallback estático.
- Performance: efectos basados en `transform`/`opacity`; `will-change` solo durante hover; sin re-renders innecesarios.
- Z-index map: `AmbientBackground = -1`, contenido = 0, header flotante = 50 (ya existente).

### Fuera de alcance

- No cambia copy, jerarquía, secciones, rutas, ni componentes shared (header, footer, mega menu).
- No modifica datos del CMS ni backend.
- No agrega librerías nuevas.
