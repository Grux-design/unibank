

## Revamp Card Grid: Custom Scroll-Stacking Cards

### What We're Building
Replace the current Lenis-based ScrollStack with a custom, from-scratch scroll-driven stacking card component. Based on the reference screenshots, the interaction is:

1. Cards are white rounded containers on a gray background, stacked vertically with **no gap**
2. Each card has a **title at the top**, then a **50/50 image + description** layout below
3. As you scroll, each card "pins" at the top and the next card slides up and overlaps it — creating a stacking effect
4. The image field to use is `item.image` (not `item.icon`) based on the Contentful "Feature Item" content type screenshot

### Technical Plan

**Step 1 — Delete ScrollStack files**
- Remove `src/components/ui/ScrollStack.tsx` and `src/components/ui/ScrollStack.css`
- Remove `lenis` from `package.json`

**Step 2 — Build new `CardGridSection.tsx` with inline scroll-stack logic**
- Use `position: sticky` for the stacking effect — each card gets `sticky top` with a small incremental offset so cards stack behind the next one
- No external library needed; pure CSS `position: sticky` + a small offset per card
- Layout per card (matching reference):
  - White rounded card (`rounded-[20px]`) with ~40px padding
  - Bold title (`text-2xl font-bold`) at the top
  - Below: flex row with image on the left (~55% width, `rounded-xl`, `object-cover`) and description + "Mas informacion" link on the right
- No vertical gap between cards (no margin between them)
- Use `item.image` for the photo (falling back to `item.icon`) — the Contentful screenshot shows an "Image" field on Feature Items
- Section headline rendered above the stack

**Step 3 — Ensure image URL handling is correct**
- The resolver already normalizes URLs with `https:` prefix — do not double-prefix

### Files Changed
- `src/components/ui/ScrollStack.tsx` — deleted
- `src/components/ui/ScrollStack.css` — deleted
- `src/components/sections/CardGridSection.tsx` — rewritten with sticky-card layout
- `package.json` — remove `lenis` dependency

