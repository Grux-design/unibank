
# Cinematic Splash Screen + Hero Entrance Animation

A premium, one-time intro sequence that plays only on a user's first visit, followed by a choreographed hero reveal. Skipped automatically on return visits and when `prefers-reduced-motion` is set.

## 1. First-load gating

- Storage key: `unibank_has_seen_intro` in `localStorage`.
- On mount of `HomePage`, synchronously read the key before paint (to prevent flash):
  - If key exists → no splash, hero renders in its current static state.
  - If missing → render splash overlay, then set the key once the sequence completes.
- Also short-circuit when `window.matchMedia('(prefers-reduced-motion: reduce)').matches` is true.
- SSR-safe guard with `typeof window !== "undefined"`.

## 2. Splash screen component

New file: `src/components/effects/IntroSplash.tsx`

Visual design (~1.7s total):
- Full-viewport fixed overlay, `z-index: 9999`, near-black `#0A0A0F` background with a subtle radial gradient glow in brand orange `hsl(20 100% 56%)` and a faint film-grain layer (reuses the wow.css aesthetic).
- Centerpiece: the Unibank logo symbol drawn as an SVG with `stroke-dasharray` / `stroke-dashoffset` path-drawing animation (~900ms), then a soft orange glow pulse (`filter: drop-shadow`) as it fills.
- Below the mark: a typographic reveal of the brand promise ("Tu banco. Tu confianza.") using a clip-path mask sweep + blur-to-sharp filter transition, staggered per word.
- All easing on the custom premium curve `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out feel).

Exit transition (~700ms):
- Whole overlay scales from `1 → 1.06` while a top-to-bottom clip-path wipe (`inset(0 0 100% 0)`) reveals the page underneath.
- Simultaneously fades opacity `1 → 0` in the last 250ms.
- Uses Framer Motion `AnimatePresence` with `mode="wait"` so the hero entrance only kicks off after the splash unmount completes.

## 3. Coordinated hero entrance

New file: `src/components/effects/HeroIntroChoreography.tsx` (a context/provider + wrapper) — OR simpler: extend `HomePage` with an `introPlaying` boolean passed to a new `IntroOrchestrator` that staggers children via Framer Motion `variants`.

Sequence (starts the instant splash begins exiting, total ~1.4s):
1. Hero card container: scale `0.96 → 1`, y `24 → 0`, blur `8px → 0`, 800ms.
2. Eyebrow text: clip-path reveal left→right, 400ms, delay 120ms.
3. Headline: per-word stagger (split on spaces in a lightweight wrapper), each word lifts y `18 → 0`, blur `6px → 0`, opacity, 60ms stagger.
4. Body paragraph: fade + y `12 → 0`, 500ms, delay 380ms.
5. CTA buttons: spring entrance (`type: "spring", stiffness: 240, damping: 22`), staggered 80ms apart, delay 520ms.
6. Hero photo / glass card: scale `0.92 → 1` + y `30 → 0` + blur `10px → 0`, 1000ms, delay 200ms — "booting dashboard" feel.
7. Floating particles already in `wow.css` get an extra opacity boost during the first 1.5s via a one-shot CSS class.

Implementation approach: introduce a single `motion.div` wrapper inside `HeroCarousel`'s right/left columns that receives `variants` keyed off an `intro` prop. To avoid restructuring `HeroSlideContent`/`HeroPhotoFrame`, the orchestration overlay lives in `HomePage` and animates the *outer* hero container (scale/blur) while a sibling layer animates the headline/body/CTAs via absolutely-positioned mirrors is overkill — instead we pass a one-time `playIntro` boolean down into `HeroCarousel` → `HeroSlideContent` and switch its existing `AnimatePresence` variants to a richer "intro" variant for the very first render only.

Minimal-impact integration:
- `HomePage` owns `playIntro` state.
- Pass `playIntro` to `HeroCarousel` and a new wrapper around `ProductsSection`/`BusinessSection` so the rest of the page also receives a softer stagger.
- After ~2.2s total, set `playIntro = false` so subsequent slide changes use the normal transitions.

## 4. Easing & timing tokens

Centralize in `src/styles/wow.css` (CSS custom properties) and a tiny `src/lib/motion.ts`:
- `--ease-premium: cubic-bezier(0.16, 1, 0.3, 1)` (expo-out)
- `--ease-soft-in-out: cubic-bezier(0.65, 0, 0.35, 1)`
- `--ease-cinematic: cubic-bezier(0.22, 1, 0.36, 1)`
Used by both the splash and hero choreography for a consistent "expensive" feel.

## 5. Accessibility & performance

- `prefers-reduced-motion: reduce` → splash never mounts, hero renders statically.
- Splash overlay uses `role="status"` + `aria-label="Cargando Unibank"`, hidden from AT after exit.
- Body gets `overflow: hidden` only while splash is visible to prevent scroll-induced layout shifts, restored on exit.
- All animations are transform/opacity/filter only — no width/height/top/left transitions — so no CLS.
- Logo SVG is inlined (no network wait), splash mounts synchronously on first paint.
- Particles and ambient background remain GPU-accelerated; no new heavy work added.

## Files

- New: `src/components/effects/IntroSplash.tsx`
- New: `src/lib/motion.ts` (easing constants + small `useFirstVisit` hook)
- Edited: `src/styles/wow.css` (easing vars, splash keyframes, intro-only particle boost class)
- Edited: `src/pages/HomePage.tsx` (gate logic, `AnimatePresence` for splash, pass `playIntro` to hero)
- Edited: `src/components/organisms/HeroCarousel.tsx` (accept `playIntro`, richer entrance variants for first render)
- Edited: `src/components/molecules/HeroSlideContent.tsx` (intro variants for eyebrow/headline/body/CTAs with stagger + blur)
- Edited: `src/components/molecules/HeroPhotoFrame.tsx` (intro scale/blur entrance)

No backend, routing, copy, CMS, or layout changes. Effects are additive and disappear after the first visit.
