
## Floating Header — Pixel-Perfect Redesign

### What changes

**Header shell** (`Header.tsx`):
- Remove `border-b`, `bg-background/95`, `backdrop-blur-sm` → replace with `bg-transparent`
- Layout becomes `justify-between` with two explicit groups: `left-group` and `right-group`
- No center logo — logo moves into the **left group**, right after the Menu pill
- Remove language toggle (Globe button) — not present in the reference

**Left group** (Menu pill + Logo):
- Menu pill: warm peach fill `bg-[#fdf0e8]` (matches the cream tint from image), no border, rounded-xl (not full-pill), padding `px-4 py-2.5`, hamburger icon + "Menú" text in medium gray `text-[#726f6e]`
- Logo: `Logo variant="full-color"` immediately after, height 36, no wrapper background
- Gap between the two: `gap-3`

**Right group** (NavActions):
- Search: pill shape `bg-[#f2f0ef]` (light warm gray), `h-10 px-3`, just the search icon centered — matches the square-ish pill in image 2
- "Banca en Línea 🔒": pill `bg-[#f2f0ef]` (same gray bg), no border, `px-5 py-2.5`, lock icon + text
- "Abre tu cuenta +": orange filled pill `bg-[#ff8136]`, white text, `+` on the right end, wider padding, slightly bolder

**NavPill atom** — add a new `"tinted"` variant: `bg-[#f2f0ef] text-foreground hover:bg-[#e8e5e3]` for the gray pills.

**Exact sizing from image:**
- All pills same height ~40px
- Menu pill: `px-4 py-2.5` with `gap-2.5`, text `text-sm font-medium`
- Right pills: equal height, consistent `py-2.5`

### Files to edit

1. **`src/components/atoms/NavPill.tsx`** — add `tinted` variant (warm gray bg, no border)
2. **`src/components/molecules/NavActions.tsx`** — search button → tinted pill; "Banca en Línea" → tinted pill; layout tweaks
3. **`src/components/organisms/Header.tsx`** — remove bg/border, split into left/right groups, move logo into left group, remove Globe language toggle from header bar
