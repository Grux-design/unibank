
## Plan: Replace Footer with new design

### What's changing

The current `Footer` is a simple 3-column links + bottom bar using Tailwind class names. The new design is a rich 3-section footer with:

1. **Section 1 (Main):** Left column with logo + description + SBP regulatory badge + social icons, and right area with 4 link columns ("Conócenos", "Grupo UniBank", "Enlaces de Interés", "Canales de Atención"). Decorative SVG shapes in background.
2. **Section 2 (App Stores + Legal):** App Store and Google Play styled buttons, plus legal links row.
3. **Section 3 (Credits bar):** Orange gradient bottom bar with copyright text and social icon row. Abstract SVG shapes background.

### Key decisions

1. **`lang` prop removed** — The new snippet has no `lang` prop. All text is hardcoded in Spanish. `SiteLayout.tsx` passes `lang` to Footer — we'll remove that prop and the `lang` param from `Footer`. The `SiteLayout.tsx` call will change from `<Footer lang={lang} />` to `<Footer />`.

2. **Logo** — Replace the `YourLogo` placeholder with `<Logo variant="primary" height={36} />` from `@/components/atoms/Logo`. For the dark/orange credits bar at the bottom, there's no logo shown (just copyright text), so no white variant needed.

3. **SBPBadge** — Keep it, it's correct for UniBank Panama. The badge uses an inline SVG with orange elements matching the brand.

4. **Social links** — The snippet has `href="#"` placeholders. Keep them as `href="#"` for now (user can wire real URLs later).

5. **WhatsApp icon in "Canales de Atención"** — The snippet references an inline phone SVG. We'll use `lucide-react`'s `MessageCircle` icon (closest to WhatsApp) and `MapPin` for Sucursales.

6. **App Store / Google Play buttons** — The snippet simplifies them to styled `<a>` tags. We'll use styled buttons with the text labels and a clean pill design (no official SVG badges needed).

7. **Inline styles vs Tailwind** — The new component uses 100% inline styles (matching the RightHeaderPill/LeftHeaderPill pattern already established). We keep this approach for consistency.

8. **Old CSS classes** — `footer-root`, `footer-inner`, `footer-brand`, `footer-bottom`, etc. are only used inside the old `Footer.tsx` — they can be removed once the file is replaced. No cleanup needed in `index.css` for now (they'll simply be unused).

### Files to edit

1. **`src/components/layout/Footer.tsx`** — Full replacement with the new component, adapted:
   - Import `Logo` from `@/components/atoms/Logo`
   - Import `MessageCircle`, `MapPin` from `lucide-react` for attention channel icons
   - Remove `lang` prop
   - Replace logo placeholder with `<Logo variant="primary" height={36} />`
   - Keep `SBPBadge` inline
   - Add proper `role="contentinfo"` on the `<footer>` element

2. **`src/components/layout/SiteLayout.tsx`** — line 17: change `<Footer lang={lang} />` → `<Footer />`

### Layout note

The footer is rendered after `<main>` inside a `flex min-h-screen flex-col` wrapper, so it sits naturally at the bottom. No `-mt` adjustments needed — the footer is not affected by the header's negative margin trick.
