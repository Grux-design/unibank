
## Plan: Replace the left header pill with the new LeftHeaderPill component

### What's changing

The left group in `Header.tsx` (the white pill containing the Menu button + Logo) needs to be replaced with the new `LeftHeaderPill` design from the snippet. The key visual differences:

- **Closed state:** White pill (`#fff`, radius 16), button has `#F7E8E0` background with orange (`#FF8136`) icon/text, hover becomes `#FFDCC8`
- **Open state:** Transparent pill (radius 0), button becomes solid orange (`#FF8136`) with white icon/text
- **Animation:** Icon swap (Menu ↔ X) with rotation animation via `AnimatePresence` (±90° rotate + opacity)
- **Pill transition:** background + border-radius animate smoothly between states

### Architecture decision

The `LeftHeaderPill` snippet manages its own `menuOpen` state internally. But the current `Header.tsx` owns `menuOpen` to drive:
1. The `MegaMenu` visibility
2. The `RightHeaderPill`'s `isMenuOpen` prop (background change)
3. The hover-delay logic (`openMenu`, `scheduleClose`, `cancelClose`)

**Solution:** Extract `LeftHeaderPill` into its own file at `src/components/molecules/LeftHeaderPill.tsx`, but make it accept external `menuOpen` + callbacks as props (like `RightHeaderPill` does), instead of managing state internally. This keeps `Header.tsx` as the single source of truth for menu state.

Props interface:
```
interface LeftHeaderPillProps {
  menuOpen: boolean;
  lang: Lang;
  onMenuEnter: () => void;   // openMenu
  onMenuLeave: () => void;   // scheduleClose
  onMenuClick: () => void;   // toggle
  onMenuMouseEnter: () => void; // cancelClose (for pill wrapper)
}
```

Actually simpler — pass just what's needed:
- `menuOpen: boolean` — drives the visual state
- `onToggle: () => void` — called on button click  
- `onMouseEnter: () => void` — for hover open (passes `openMenu`)
- `onMouseLeave: () => void` — for hover leave (passes `scheduleClose`)
- `lang: Lang` — for "Menú" / "Menu" label

### Files to create/edit

1. **`src/components/molecules/LeftHeaderPill.tsx`** — new file with the adapted snippet:
   - Remove the internal `useState(false)` for menuOpen — receive it as prop
   - Replace the Logo placeholder SVG with `<Logo variant="full-color" height={36} />` from `@/components/atoms/Logo`
   - Replace `href="#"` on the logo anchor with `<Link to="/">` from react-router-dom
   - Keep the `AnimatePresence` icon animation exactly as specified
   - Keep the pill wrapper style transitions (background + borderRadius)
   - Remove the `PreviewBothStates`, `ClosedState`, `OpenState` preview functions
   - Keep the mobile hamburger button from the current Header (needs to remain for `sm:hidden` breakpoint) — OR handle mobile inside LeftHeaderPill with a prop

2. **`src/components/organisms/Header.tsx`** — replace the left group:
   - Remove `NavPill` import (no longer needed)
   - Import `LeftHeaderPill`
   - Replace the entire `{/* LEFT GROUP */}` div (lines 57–93) with `<LeftHeaderPill menuOpen={menuOpen} onToggle={...} onMouseEnter={openMenu} onMouseLeave={scheduleClose} lang={lang} />`
   - Keep mobile hamburger handling — add it inside LeftHeaderPill or keep it in Header as a separate element hidden on `sm:` and above

### Mobile handling

The current mobile hamburger is inside the left group. Options:
- **Keep it in Header.tsx** as a sibling to `LeftHeaderPill`, wrapped in `sm:hidden` — cleanest, no prop drilling
- The `LeftHeaderPill` renders on `hidden sm:flex` (desktop only)

Plan: wrap `<LeftHeaderPill>` in `hidden sm:block` and keep the mobile hamburger group separately. Actually simpler: put both in the left container div, `LeftHeaderPill` for `sm:block hidden` and the mobile button for `sm:hidden`.

### Summary of changes

```
src/components/molecules/LeftHeaderPill.tsx  ← NEW
src/components/organisms/Header.tsx          ← EDIT (replace left group, remove NavPill import)
```

The `NavPill` atom and its file remain (may be used elsewhere), but it won't be referenced from Header anymore.
