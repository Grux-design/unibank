

## Add 3 Home Sections: Audience Toggle + Products/Business + Digital Banking

### Overview
Three sections sit between the hero and the footer. The code is fully specified in the uploaded file. The main work is:
1. Creating missing CSS variables and shared UI primitives the sections depend on
2. Creating the three section components following atomic design structure
3. Wiring them into `HomePage.tsx`

---

### What's missing that must be created first

**CSS variables** (add to `src/index.css` `:root`):
```
--fun-orange: #ff8136
--uni-dark: #1f1e1e
--uni-dark-soft: #726f6e
--uni-muted: #908e8d
--btn-height: 52px
--btn-border-radius: 16px
--btn-font-size: 0.9375rem
--btn-font-weight: 600
```

**Shared UI primitives** — referenced via `./ui/atoms` and `./ui/MagicBento` (don't exist yet):
- `src/components/ui/atoms.tsx` — exports `SectionTag`, `SectionHeading`, `LinkArrow`, `BtnPrimary`
- `src/components/ui/MagicBento.tsx` — exports `MagicBentoGrid`, `MagicBentoCard`

**Hook alias** — sections import from `../hooks/useIsMobile` (camelCase) but the file is `use-mobile.tsx`. Need to create `src/hooks/useIsMobile.ts` re-exporting from `use-mobile.tsx`.

**Portrait image** — the `FeaturedBanner` uses a `portraitImg` that was a Figma asset. Replace with an Unsplash URL (woman with clipboard, smiling) matching the screenshot.

---

### New files to create

Following atomic design:

```
src/
  hooks/
    useIsMobile.ts               ← re-export shim for useIsMobile

  components/
    ui/
      atoms.tsx                  ← SectionTag, SectionHeading, LinkArrow, BtnPrimary
      MagicBento.tsx             ← MagicBentoGrid, MagicBentoCard

    atoms/
      AudienceToggle.tsx         ← Personas/Empresas pill segmented control (Section 1)

    organisms/
      ProductsSection.tsx        ← Bento grid for Personas (Section 2a)
      BusinessSection.tsx        ← MagicBento grid for Empresas (Section 2b)
      DigitalBanking.tsx         ← Sticky-scroll + CTA (Section 3)
```

---

### File-by-file plan

**`src/index.css`** — add 8 CSS custom properties to `:root`

**`src/hooks/useIsMobile.ts`** — `export { useIsMobile } from "./use-mobile"`

**`src/components/ui/atoms.tsx`**:
- `SectionTag` — small orange pill badge with a dot
- `SectionHeading` — centered tag + large headline + optional body + optional CTA, accepts `px` and `mb` spacing props
- `LinkArrow` — orange text + arrow, hover shifts right
- `BtnPrimary` — orange pill anchor/button component (used in DigitalBanking feature rows)

**`src/components/ui/MagicBento.tsx`**:
- `MagicBentoGrid` — CSS grid wrapper with `border-radius: 32px` cards, rounded corners, `1px solid #E7E4E1` borders, gap `8px`, accepts `style` and `children`
- `MagicBentoCard` — individual grid cell with `border-radius: 32px`, `overflow: hidden`, `border: 1px solid #E7E4E1`, accepts `style`

**`src/components/atoms/AudienceToggle.tsx`** — exact code from Section 1 of the spec (spring animation pill, `--fun-orange` active fill)

**`src/components/organisms/ProductsSection.tsx`** — exact code from Section 2: Personas:
- `FeaturedBanner` (orange bento card with SVG pattern + portrait photo + dual CTAs)
- `MastercardCard` (product image card)
- `SmallProductCard` (Invertis, Vivienda)
- `AutoLoanCard` (2-col split)
- `BentoDesktopGrid` (hover-expand 4-col × 2-row layout)
- Portrait image: use Unsplash woman-with-folder URL matching the screenshot

**`src/components/organisms/BusinessSection.tsx`** — exact code from Section 2: Empresas:
- `LargeCard` (full-width split horizontal with image + hover arrow)
- `SmallCard` (image top + content)
- Grid: 1 large (full-width) + 2 small

**`src/components/organisms/DigitalBanking.tsx`** — exact code from Section 3:
- `FeatureRow` (accordion row with icon, title, AnimatePresence expand)
- `MobileFeatureCarousel` (swipe + dot nav)
- `StickyScrollFeatures` (scroll-driven active index on desktop)
- Authority quote block
- Orange CTA split banner (phone + WhatsApp)

**`src/pages/HomePage.tsx`** — add state + the 3 sections:
```tsx
const [audience, setAudience] = useState<Audience>("personas");

// After HeroCarousel:
<AudienceToggle value={audience} onChange={setAudience} />
<AnimatePresence mode="wait" initial={false}>
  <motion.div key={audience} ...transition>
    {audience === "personas" ? <ProductsSection /> : <BusinessSection />}
  </motion.div>
</AnimatePresence>
<motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} ...>
  <DigitalBanking />
</motion.div>
```

---

### Responsive behavior (as specified)
- **Products bento**: mobile → vertical stack with `borderRadius: 32`, desktop → 4-col × 2-row with hover-expand `±20px`
- **Business grid**: mobile → `1fr`, desktop → `1fr 1fr` with large card full-width
- **Digital Banking features**: mobile → swipeable carousel + dot nav + touch swipe; desktop → sticky-scroll (5× viewport height container)
- All sections use `isMobile ? "16px" : "clamp(16px, 3.9vw, 72px)"` for horizontal padding

