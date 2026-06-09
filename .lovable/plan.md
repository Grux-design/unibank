# Replace hero slide images 2, 3, 4

Upload the three new images as CDN assets and wire them into the matching slides in `src/data/heroSlides.ts`.

## Mapping
- `uni-hero-2.png` → slide `naranja` (Cuenta de Ahorros, slide 2)
- `uni-hero-3.png` → slide `leasing` (Uni Leasing, slide 3)
- `uni-hero-4.png` → slide `hipoteca` (Crédito Hipotecario, slide 4)

## Steps
1. Upload all three via `lovable-assets create` from `/mnt/user-uploads/` and write the `.asset.json` pointers under `src/assets/`.
2. Import them in `src/data/heroSlides.ts` next to the existing `uniHero1` import and swap each slide's `image` field to the new asset URL.

No styling or layout changes — `HeroPhotoFrame` already centers and contains the figure correctly.
