
## Plan: Header + Hero — Production Build (Atomic Design)

### Logo assets to copy
User uploaded 9 SVG logo variants. I'll use these 3:
- `Tipo_Brand_Frame_Color_Full_color_Formato_Horizontal_Tag_line_False.svg` → `src/assets/logos/logo-full-color.svg` (white bg, orange+gray mark) — **used in header on light bg**
- `Tipo_Brand_Frame_Color_Primary_Formato_Horizontal_Tag_line_False.svg` → `src/assets/logos/logo-primary.svg` (orange pill bg, white mark) — **used in mega menu dark overlay**
- `Tipo_UniBank_Color_Primary_Formato_Simbolo_Tag_line_True.svg` → `src/assets/logos/logo-symbol.svg` (symbol-only, orange) — **used as favicon**

### Atomic Component Tree

```
src/components/
├── atoms/
│   ├── Logo.tsx                — renders correct SVG variant via prop
│   ├── NavPill.tsx             — pill button atom (outlined / filled / ghost)
│   ├── HeroBreadcrumb.tsx      — "Personas · Cuenta de Ahorros"
│   ├── HeroStatCard.tsx        — floating white card: overline + big stat + dots
│   └── HeroProductBadge.tsx    — dark rounded pill "Producto destacado / Name"
│
├── molecules/
│   ├── NavActions.tsx          — search + "Banca en Línea" + "Abre tu cuenta" + dropdown
│   ├── MegaMenuColumn.tsx      — one column: label + list of links
│   ├── HeroCTAGroup.tsx        — primary + secondary CTA buttons
│   ├── HeroVisual.tsx          — image + badge + stat card
│   └── HeroSlideContent.tsx    — breadcrumb + headline + body + CTAGroup
│
└── organisms/
    ├── Header.tsx              — sticky header: hamburger pill + logo + nav actions
    ├── MegaMenu.tsx            — full-width overlay: Personas/Empresas tabs + columns
    └── HeroCarousel.tsx        — 4-slide carousel with dots, arrows, counter
```

### Header anatomy (from screenshots)
- `position: sticky; top:0; z-index:50; background: white`
- Left: pill `[ ☰ Menú ]` → triggers MegaMenu overlay
- Center: UniBank logo (full color variant)
- Right: `🔍` icon | `[ 🔒 Banca en Línea ]` outlined pill | `[ Abre tu cuenta + ]` orange filled pill
- "Abre tu cuenta" has a dropdown panel with 2 choices
- Mobile: only logo + hamburger + orange CTA visible, collapses rest

### MegaMenu anatomy
- Full-width white overlay below header (not a modal)
- Tabs: `Personas` / `Empresas` (left)
- Columns: Cuentas | Crédito | Tarjetas | Canales Digitales | Inversiones
- Right column: featured product card with image + orange accent
- Secondary row: Sobre UniBank · Tarifas · Sucursales
- Close `✕` button top right

### Hero Carousel
- Background: `linear-gradient(160deg, #fdf5ee 0%, #fde8d8 100%)` (grad-light)
- Left content column: breadcrumb → headline → body → 2 CTAs
- Right column: tall rounded image with 2 floating elements (badge + stat card)
- Bottom left: `← 01 / 04 →` + dot nav
- Auto-advance every 5s, pauses on hover, respects `prefers-reduced-motion`
- 4 slides:

| # | Segment | Product | Headline | Stat |
|---|---|---|---|---|
| 1 | Personas | Cuenta de Ahorros | "Tus ahorros, trabajando para ti desde el primer día." | 4.5% TEA |
| 2 | Empresas | UniLeasing | "La maquinaria que tu negocio necesita, cuando la necesita." | 100% Financiamiento |
| 3 | Empresas | Cuenta Corriente | "El control total de tu empresa, en tiempo real." | 24/7 Digital |
| 4 | Personas | Crédito Hipotecario | "El hogar que siempre soñaste, con el financiamiento que mereces." | Hasta 30 años |

Images: Unsplash photos (woman at laptop, construction, city skyline, family home).

### CSS / token alignment
- Update `--primary` in `index.css` from `#F75C00` → `#ff8136` (HSL: `20 100% 60%`)
- Remove all wireframe styles (`.navbar-root`, `.hero-wf-*`, etc.) — they'll be dead code
- New CSS lives in component-scoped classes inside `index.css` under a `/* PRODUCTION */` block or directly as Tailwind utilities

### Accessibility (WCAG AA)
- `#ff8136` on white: 3.1:1 — used only for large text/decorative; pairing orange with dark `#0f0f0f` text on cream passes
- White text on `#ff8136` button: 3.1:1 — passes AA for UI components (3:1 threshold)
- All interactive: visible focus rings, `aria-label`, `aria-expanded`, `aria-current`
- Carousel: `aria-live="polite"`, pause on focus/hover

### Files to create
- `src/assets/logos/logo-full-color.svg` (copy from uploads)
- `src/assets/logos/logo-primary.svg` (copy from uploads)
- `src/assets/logos/logo-symbol.svg` (copy from uploads)
- `src/components/atoms/Logo.tsx`
- `src/components/atoms/NavPill.tsx`
- `src/components/atoms/HeroBreadcrumb.tsx`
- `src/components/atoms/HeroStatCard.tsx`
- `src/components/atoms/HeroProductBadge.tsx`
- `src/components/molecules/NavActions.tsx`
- `src/components/molecules/MegaMenuColumn.tsx`
- `src/components/molecules/HeroCTAGroup.tsx`
- `src/components/molecules/HeroVisual.tsx`
- `src/components/molecules/HeroSlideContent.tsx`
- `src/components/organisms/Header.tsx`
- `src/components/organisms/MegaMenu.tsx`
- `src/components/organisms/HeroCarousel.tsx`

### Files to edit
- `src/components/layout/SiteLayout.tsx` — swap `<Navbar>` → `<Header>`
- `src/pages/HomePage.tsx` — replace wireframe `<section>` with `<HeroCarousel>`
- `src/index.css` — update `--primary` HSL value; remove wireframe navbar/hero CSS blocks; add production component styles
