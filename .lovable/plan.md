

## Unify Business Section Cards with Personas Card Styles

### Problem
The Personas tab (`ProductsSection`) and Empresas tab (`BusinessSection`) use completely different card components and layouts:

**Personas cards** have:
- `SmallProductCard`: image top, `CategoryTag` pill, `CtaLink` with animated arrow (`ArrowRight`), subtle fade-in animation
- `AutoLoanCard`: horizontal split with rate callout box, orange CTA button
- `FeaturedBanner`: orange gradient with SVG pattern, portrait overlay
- `MastercardCard`: dark image with gradient overlay
- Interactive hover-expand width animations on the entire grid

**Empresas cards** have:
- `LargeCard`: horizontal split (image left, white content right), `ArrowUpRight` CTA icon
- `SmallCard`: vertical image+content, `ArrowUpRight` CTA icon
- Static `MagicBentoGrid` layout (no hover-expand)
- Different font sizes, padding values, and CTA styling

### Plan
Refactor `BusinessSection` to reuse the same card sub-components and visual patterns from `ProductsSection`:

1. **Extract shared card primitives** from `ProductsSection` — specifically `CategoryTag`, `CtaLink`, and `SmallProductCard` — and use them in `BusinessSection` as well.

2. **Restyle `BusinessSection` cards**:
   - **LargeCard** → adopt the same `CategoryTag` pill (orange bg tint instead of inline icon), use `CtaLink` (with `ArrowRight`) instead of a raw `<a>` with `ArrowUpRight`, match font sizes and padding from ProductsSection's `AutoLoanCard`.
   - **SmallCard** → replace with the same `SmallProductCard` pattern: same `CategoryTag`, `CtaLink`, identical padding (`20px 20px 24px`), font sizes (title: 16px, body: 13px), and no image hover scale.

3. **Align CTA style**: Both sections use `CtaLink` with `ArrowRight` icon and the same hover translateX animation.

### Files to change

- **`src/components/organisms/BusinessSection.tsx`** — Rewrite `LargeCard` and `SmallCard` to match the visual style of their Personas counterparts (same tag pill, CTA link component, typography, spacing). Import and reuse `ArrowRight` instead of `ArrowUpRight`.

