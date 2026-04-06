

## Fix Feature Banner: Missing "Copy" Field and Broken Image

### Problem
1. **Copy field not showing**: Contentful's "Feature Banner" section has a `copy` field (visible in the CMS screenshot), but the codebase never reads it — it's missing from `SectionFields`, `ResolvedSection`, and the resolver in `useContentfulPage.ts`. The component currently displays `section.headline` as the description, but the actual text lives in the `copy` field.
2. **Main Image not showing**: The `resolveAsset` function in `useContentfulPage.ts` already normalizes URLs by prepending `https:`. Then `FeatureBannerSection` prepends `https:` again, resulting in `https:https://images.ctfassets...` — a broken URL.

### Plan

**Step 1 — Add `copy` to Contentful types**
- In `src/integrations/contentful/types.ts`: add `copy?: string` to both `SectionFields` and `ResolvedSection`.

**Step 2 — Resolve `copy` in the hook**
- In `src/hooks/useContentfulPage.ts`, inside `resolveSection`, read `f.copy` and pass it through to the resolved section object.

**Step 3 — Fix FeatureBannerSection**
- Remove the redundant `https:` prefix on line 10 — use `section.mainImage.fields.file.url` directly since it's already normalized.
- Display `section.copy` (falling back to `section.headline`) as the description paragraph below the title.

### Files Changed
- `src/integrations/contentful/types.ts`
- `src/hooks/useContentfulPage.ts`
- `src/components/sections/FeatureBannerSection.tsx`

