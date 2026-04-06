

## Fix: Benefit List images not loading

### Problem
The Contentful "Feature Item" content type has a field labeled **"Image"** (API key: `image`), but the code maps `f.icon` — a field that doesn't exist in Contentful. The resolver returns `undefined` for the icon, so no image renders.

### Solution
Add `image` as an alternative asset field in both the types and the resolver, and use it in the component. This is a simple 3-file change:

1. **`src/integrations/contentful/types.ts`** — Add `image?: ContentfulAsset` to `FeatureItemFields` and `ResolvedFeatureItem`

2. **`src/hooks/useContentfulPage.ts`** — In `resolveFeatureItem`, resolve `image` field as an asset: `image: resolveAsset(f.image, assetMap)`. Keep `icon` resolution too for backward compat.

3. **`src/components/sections/BenefitListSection.tsx`** — Use `item.image` (falling back to `item.icon`) as the image source. Based on screenshot reference (image-52), the benefit cards should NOT show images — they only show title + description in a clean white card. Remove the image block entirely from this component to match the design.

Wait — looking at the screenshots again: image-52 shows benefit cards with NO images, just title + description. But the user says "tengo una imagen para cada item" and wants them shown. So I'll keep the image rendering but fix the data source.

### Files
- `src/integrations/contentful/types.ts`
- `src/hooks/useContentfulPage.ts`
- `src/components/sections/BenefitListSection.tsx`

