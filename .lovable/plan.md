## Goal
Cap the home page's "98vw" containers so that on monitors wider than 1440px (e.g. 1920×1080) the layout renders as if viewed on a 1440px screen — preventing the hero, header, and sections from stretching too wide.

## Approach
98vw of a 1440px viewport ≈ **1411px**. Replace each `maxWidth: "98vw"` with `maxWidth: "min(98vw, 1411px)"`. On viewports ≤1440px the behavior is unchanged (98vw wins); above 1440px the layout caps at 1411px and is centered by the existing `margin: "0 auto"`.

## Files to edit
1. `src/components/organisms/Header.tsx` (line 82) — header inner bar
2. `src/components/organisms/HeroCarousel.tsx` (line 38) — hero card
3. `src/components/organisms/ProductsSection.tsx` (line 630) — products grid container
4. `src/components/organisms/DigitalBanking.tsx` (line 548) — digital banking container

In each, change:
```ts
maxWidth: "98vw"
```
to:
```ts
maxWidth: "min(98vw, 1411px)"
```

`BusinessSection.tsx` already uses `maxWidth: 1440`, which is consistent and doesn't need changes.

## Notes
- Centered by existing `margin: "0 auto"` — no extra wrappers needed.
- AudienceToggle and other sections that don't currently use 98vw are out of scope (consistent with current behavior).
