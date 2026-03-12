
## Plan: Replace HeroCarousel with HeroB

### What the new design is
A full-bleed orange gradient card with:
- Left: eyebrow tag, animated headline (with highlighted words), body copy, 2 CTA buttons
- Right: portrait photo inside organic blob shape, glass card showing next-slide preview with progress bar
- Bottom bar: slide counter, inline progress dash, segment tag, prev/next arrow buttons
- `AnimatePresence` + `motion` for slide transitions (already installed as `motion` package)
- Auto-advances every 6s via `setTimeout` (not `setInterval`)

### Key adaptations from the snippet

1. **TypeScript fix** — The snippet has a syntax error: `useRef | null>(null)` → fix to `useRef<ReturnType<typeof setTimeout> | null>(null)`

2. **Header overlap** — `SiteLayout` uses `-mt-20` on `<main>` so the hero card sits under the transparent header. The new `HeroB` must add `paddingTop: 80` (or similar) to the outer wrapper so content isn't clipped by the header. The snippet's `PAGE_BG` wrapper will be the outer `<section>` with `paddingTop: 80`.

3. **`lang` prop** — The snippet has no `lang` prop. The existing `HomePage.tsx` passes `lang` to `HeroCarousel`. We'll keep the `lang` prop on `HeroB` but keep slide data in Spanish (matching the snippet), so the prop is accepted but the component doesn't use it for now (consistent with the footer approach).

4. **`motion/react` import** — Already installed as `motion` package. `motion/react` is the correct subpath import per the existing `Header.tsx` usage. ✅

5. **`AnimatePresence`** — Used for slide transitions. The snippet renders each slide's content inside `AnimatePresence` with a direction-aware `x` animation.

6. **Inline SVG pattern** — The diagonal line pattern overlay is a small inline `<svg>` with a `<pattern>` element. Self-contained, no external assets.

7. **Next-slide thumbnail** — The glass card shows `nextSlide.image` as a small thumbnail. Already in slide data.

8. **Progress bar animation** — Uses a `motion.div` that animates `scaleX` from 0→1 over `SLIDE_DURATION` ms, keyed on `current` so it resets on each slide change.

### Files to change

1. **`src/components/organisms/HeroCarousel.tsx`** — Full replacement with `HeroB` implementation (rename export to `HeroCarousel` to avoid touching `HomePage.tsx`), OR create new file and update `HomePage.tsx`. 

   **Decision:** Replace `HeroCarousel.tsx` entirely, keeping the export name `HeroCarousel` and accepting `lang: Lang` prop (unused for now). This means zero changes to `HomePage.tsx`.

2. **No other files need changing.**

### Layout note
- The outer wrapper gets `paddingTop: 80` to clear the sticky header (which has height ~80px including its `pt-4`). The card itself fills the rest.
- The snippet's `PAGE_BG` is `#F8F7F6` — this will be the section background, consistent with the site's light cream base.

### What gets deleted
- Old `HeroCarousel` logic (slides with `{es, en}` keys, `HeroSlideContent`, `HeroVisual` imports, dot navigation, `setInterval`-based timer)
- The dependent molecules (`HeroSlideContent.tsx`, `HeroVisual.tsx`) and atoms (`HeroBreadcrumb.tsx`, `HeroProductBadge.tsx`, `HeroStatCard.tsx`) won't be deleted (they may be reused later), just no longer imported.
