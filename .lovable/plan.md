
## Full Atomic Design Refactor — Header, Hero, Footer

### Current state vs. target

| File | Current lines | Target lines |
|---|---|---|
| `HeroCarousel.tsx` | 590 | ~80 |
| `RightHeaderPill.tsx` | 561 | ~50 (shell only) |
| `MegaMenu.tsx` | 453 | ~80 |
| `Footer.tsx` | 316 | ~70 |
| `Header.tsx` | 181 | ~80 |

---

### New files to create

```text
src/
  data/
    heroSlides.ts              ← Slide[] types + slides[] array + THEME + SLIDE_DURATION
    footerData.ts              ← footerColumns[], socialIcons[], legalLinks[]
    megaMenuData.ts            ← personasData, empresasData, secondaryLinks

  components/
    atoms/
      HeroEyebrow.tsx          ← frosted pill for slide eyebrow text
      HeroHeadline.tsx         ← <h1> mapping HeadlinePart[]
      HeroProgressBar.tsx      ← animated motion progress fill (reused in 2 places)
      HeroArrowButton.tsx      ← circular prev/next button
      FooterSBPBadge.tsx       ← SBP regulatory badge
      FooterSocialIcon.tsx     ← single social icon link
      FooterStoreButton.tsx    ← App Store / Google Play pill button

    molecules/
      HeroSlideContent.tsx     ← (REPLACE existing) eyebrow + headline + body + CTAs
      HeroPhotoFrame.tsx       ← accent circle + blob + AnimatePresence photo
      HeroGlassCard.tsx        ← glass next-slide preview card
      HeroControls.tsx         ← counter + progress dash + tag + arrows
      FooterBrandColumn.tsx    ← logo + description + SBPBadge
      FooterNavColumn.tsx      ← single nav column (title + links)
      FooterNavGrid.tsx        ← 4 FooterNavColumn instances
      FooterAppsBar.tsx        ← App Store + Google Play + legal links row
      FooterCreditsBar.tsx     ← orange gradient bar: copyright + social icons
      MegaMenuTabBar.tsx       ← Personas/Empresas tab row + "Ver todo" link
      MegaMenuCategoryGrid.tsx ← product categories grid + footer links
      MegaMenuFeaturedCard.tsx ← right-side photo/featured card

    organisms/
      HeroCarousel.tsx         ← REPLACE: state + timer + card shell + columns
      Header.tsx               ← keep mostly as-is (~181 lines, already clean)
      MegaMenu.tsx             ← REPLACE: thin shell composing tab + grid + card
      Footer.tsx               ← REPLACE: thin shell composing 3 sections

  widgets/ (new folder — for RightHeaderPill sub-components)
    LanguageWidget.tsx         ← extracted from RightHeaderPill
    SearchWidget.tsx           ← extracted from RightHeaderPill
    BancaEnLineaWidget.tsx     ← extracted from RightHeaderPill
    AbreCuentaWidget.tsx       ← extracted from RightHeaderPill
```

`RightHeaderPill.tsx` becomes a ~35-line shell that imports and renders the 4 widgets.

---

### What stays untouched

- `Header.tsx` — already 181 lines, well-structured, no changes needed
- `LeftHeaderPill.tsx` — 118 lines, already atomic-friendly
- `Logo.tsx`, `NavPill.tsx`, existing atoms — unchanged

---

### Approximate final line counts

| File | ~Lines |
|---|---|
| `data/heroSlides.ts` | 65 |
| `data/footerData.ts` | 35 |
| `data/megaMenuData.ts` | 80 |
| `atoms/HeroEyebrow.tsx` | 18 |
| `atoms/HeroHeadline.tsx` | 22 |
| `atoms/HeroProgressBar.tsx` | 18 |
| `atoms/HeroArrowButton.tsx` | 32 |
| `atoms/FooterSBPBadge.tsx` | 28 |
| `atoms/FooterSocialIcon.tsx` | 22 |
| `atoms/FooterStoreButton.tsx` | 30 |
| `molecules/HeroSlideContent.tsx` | 60 |
| `molecules/HeroPhotoFrame.tsx` | 55 |
| `molecules/HeroGlassCard.tsx` | 50 |
| `molecules/HeroControls.tsx` | 50 |
| `molecules/FooterBrandColumn.tsx` | 30 |
| `molecules/FooterNavColumn.tsx` | 35 |
| `molecules/FooterNavGrid.tsx` | 20 |
| `molecules/FooterAppsBar.tsx` | 40 |
| `molecules/FooterCreditsBar.tsx` | 40 |
| `molecules/MegaMenuTabBar.tsx` | 45 |
| `molecules/MegaMenuCategoryGrid.tsx` | 80 |
| `molecules/MegaMenuFeaturedCard.tsx` | 55 |
| `organisms/HeroCarousel.tsx` | 80 |
| `organisms/MegaMenu.tsx` | 50 |
| `organisms/Footer.tsx` (moved from layout/) | 50 |
| `widgets/LanguageWidget.tsx` | 85 |
| `widgets/SearchWidget.tsx` | 110 |
| `widgets/BancaEnLineaWidget.tsx` | 90 |
| `widgets/AbreCuentaWidget.tsx` | 85 |
| `molecules/RightHeaderPill.tsx` | 35 |

**Zero visual changes** — pure structural refactor.

---

### Technical notes

- `THEME` constant and `SLIDE_DURATION` move to `data/heroSlides.ts` and are imported where needed (by molecules that need individual tokens)
- `FooterNavColumn` handles both regular links and the special "attention" links (WhatsApp/Sucursales) via an `isAttention` prop — same logic, extracted cleanly
- `MegaMenu.tsx` tab state (`useState<Tab>`) stays in `MegaMenu.tsx` since it controls which data panel renders — it's truly organism-level state
- `Footer.tsx` moves from `src/components/layout/` to `src/components/organisms/` for consistency, with the import in `SiteLayout.tsx` updated
