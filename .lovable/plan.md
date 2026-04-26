## Goal

Create a high-quality static **Cajilla de Seguridad** page that visually matches existing Personas product pages (Contentful-driven), and wire it to the menu link under **Personas → Otros Servicios → Cajilla de Seguridad** (URL: `/personas/otros-servicios/cajilla-de-seguridad`).

Since other Personas products render through `ProductDetailPage` (Contentful), this slug has no CMS entry. Instead of asking the editor to create one, we'll add a **static override route** that renders before the dynamic `/personas/:category/:slug` pattern, mimicking the same look & feel (breadcrumbs, hero with image, feature strip, benefit cards, requirements, contact form CTA).

## Implementation

### 1. New page: `src/pages/CajillaSeguridadPage.tsx`

A self-contained page reproducing the same visual rhythm used by Contentful sections (`HeroFormSection`, `FeatureStripSection`, `BenefitListSection`):

- **Helmet SEO**: title, description, OG tags.
- **Breadcrumbs**: Inicio › Personas › Otros Servicios › Cajilla de Seguridad (matching `HeroFormSection` style).
- **Hero (2-col grid)**:
  - Left: eyebrow pill ("Servicio exclusivo"), big headline *"Cajillas de Seguridad"*, subheadline *"Protege lo que más valoras"*, intro paragraph, primary CTA button ("Solicitar información") that scrolls to the form section.
  - Right: large rounded image (Unsplash vault/safe-deposit imagery, e.g. `photo-1633158829585-23ba8f7c8caf` or similar high-quality bank-vault photo).
- **"¿Qué es una Cajilla de Seguridad?"** intro section (centered text block on light background).
- **Beneficios — Feature strip** (orange-50 bg, mirrors `FeatureStripSection`): 5 cards using Lucide icons:
  - `ShieldCheck` — Máxima seguridad
  - `Lock` — Confidencialidad total
  - `DoorOpen` — Sala exclusiva
  - `UserCheck` — Atención personalizada
  - `Landmark` — Tranquilidad y respaldo bancario
- **Tamaños disponibles** (split image + cards layout, mirrors `BenefitListSection`): two size cards (5"x10"x24" and 10"x10"x24") with subtle illustrations or icons.
- **Requisitos** (muted background, simple bullet list with check icons): "Mantener al menos una cuenta activa en UniBank" and "El arrendamiento es a título personal".
- **¿Dónde adquirir el servicio?**: two icon cards — Gerente de Relación / Casa Matriz Avenida Balboa.
- **CTA / Contact form section** (id `contacto`):
  - Headline *"¿Interesado en este servicio?"* + supporting copy.
  - Lightweight form (Nombre, Email, Teléfono, Mensaje opcional) using existing `Input`, `Textarea`, `Button` UI primitives.
  - On submit: calls the existing `send-email` Supabase Edge Function (already wired in the project per memory) with subject `"Solicitud — Cajilla de Seguridad"`. Shows toast on success/error via `sonner`.

All spacing, radii, and color tokens match existing sections (`hsl(var(--background))`, `bg-orange-50`, `bg-muted`, `rounded-[28px]`, `clamp()` paddings).

### 2. Routing: `src/App.tsx`

Add a static route **before** the dynamic Personas route so it takes precedence:

```tsx
<Route
  path="/personas/otros-servicios/cajilla-de-seguridad"
  element={<CajillaSeguridadPage />}
/>
<Route path="/personas/:category/:slug" element={<ProductDetailPage />} />
```

Import the new page at the top.

### 3. Menu wiring (no change required)

`src/data/megaMenuData.ts` already contains `{ label: "Cajilla de Seguridad", slug: "cajilla-de-seguridad" }` under the `otros-servicios` category in `personasData`. The mega menu builds the URL as `/personas/otros-servicios/cajilla-de-seguridad`, which now resolves to the new static page.

### 4. Files touched

- **Created**: `src/pages/CajillaSeguridadPage.tsx`
- **Edited**: `src/App.tsx` (import + new route above dynamic one)

No DB changes, no Contentful changes, no edge function changes (reuse existing `send-email`).