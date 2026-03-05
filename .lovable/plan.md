
## Plan: Replace Right Header Pill with the new RightHeaderPill component

### What's happening

The user wants to replace the current right group in the header (which renders `NavActions`) with a new self-contained `RightHeaderPill` component built with `motion/react` (Framer Motion). The new component has 4 sub-widgets: LanguageWidget, SearchWidget, BancaEnLineaWidget, and AbreCuentaWidget — all with richer animations and a distinct visual identity.

### Key decisions

1. **`motion` package** — The snippet uses `motion/react` (the modern Framer Motion package). This is NOT in `package.json` yet. It needs to be installed as `motion`.

2. **`lang` / `onToggleLang` props** — The current `NavActions` receives these from `Header`. The new `RightHeaderPill` manages its own language state internally. To keep the parent `SiteLayout` in sync (so translated pages still work), we need to thread the `lang` state out. Two options:
   - **Option A (simple):** Let `RightHeaderPill` manage lang internally and pass `onLangChange` callback up. Header passes it to SiteLayout.
   - **Option B (simplest, least disruption):** Keep `lang` + `onToggleLang` props on `RightHeaderPill` — the widget accepts an external `lang` + setter and controls its display accordingly. This keeps SiteLayout's language state working.

   I'll go with **Option B** — add optional `lang` / `onLangChange` props to `RightHeaderPill` so it integrates cleanly without breaking the rest of the app.

3. **`isMenuOpen` prop** — The component accepts `isMenuOpen` to make its background transparent when the mega menu is open. Wire this from `Header`'s `menuOpen` state.

4. **Search navigation** — The new `SearchWidget` uses `href="#"` placeholders. Swap these for real `react-router-dom` `useNavigate` calls matching the existing `siteIndex` in `SearchOverlay.tsx`.

5. **`BancaEnLineaWidget` links** — Wire the Personas/Empresas options to `/login` (matching current behavior).

6. **`AbreCuentaWidget` links** — Wire to `/cuenta-ahorros` and `/cuenta-juridica`.

7. **Remove `NavActions.tsx`** — It gets fully replaced. The `LangSwitcher`, `SearchOverlay` components remain in the codebase (used elsewhere or kept for now).

8. **Right group wrapper in `Header.tsx`** — Replace the `<div className="flex items-center rounded-2xl bg-background px-3 py-2 shadow-sm">` wrapper and `<NavActions>` with `<RightHeaderPill>` directly. The pill manages its own background/border-radius via `isMenuOpen`.

9. **Header height adjustment** — `RightHeaderPill` has `height: 66px` internally. The current right group uses `py-2` making it ~52px. The outer `h-16` (64px) bar may need to become `h-[74px]` or we remove the fixed height and let content dictate it so the 66px pill fits with room.

### Files to create/edit

1. **Install `motion` package** — add to dependencies
2. **`src/components/molecules/RightHeaderPill.tsx`** — new file with the full snippet, adapted:
   - Add `lang` / `onLangChange` props (optional) to `LanguageWidget` and root `RightHeaderPill`
   - Replace `href="#"` with real routes using `useNavigate`
   - `BancaEnLineaWidget` → links to `/login`
   - `AbreCuentaWidget` → links to `/cuenta-ahorros` and `/cuenta-juridica`
3. **`src/components/organisms/Header.tsx`** — replace right group:
   - Remove `NavActions` import
   - Import `RightHeaderPill`
   - Replace the right `<div>` wrapper + `<NavActions>` with `<RightHeaderPill isMenuOpen={menuOpen} lang={lang} onLangChange={onToggleLang} />`
   - Remove fixed `h-16` from the inner bar or bump it to fit the 66px pill
4. **`src/components/layout/SiteLayout.tsx`** — no changes needed (Header still accepts `lang`/`onToggleLang` and passes them down)

### Layout note on header height

Current: `<div className="mx-auto flex h-16 ...">` (64px). The pill is 66px. Change `h-16` → remove fixed height (just `flex items-center`) so the bar grows naturally to fit both groups. The `pt-4` on the header wrapper remains, `- mt-20` in `SiteLayout` should stay correct since the visual height is similar.
