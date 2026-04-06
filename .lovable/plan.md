

## Fix Card Grid: Add Section Title & Match Container Width

### Issues
1. The section's `title` field (e.g. from Contentful) is not rendered — only `headline` is checked, but the Card Grid uses the `title` field.
2. The card container uses `max-w-[1080px]` while the rest of the page sections use `max-w-6xl` (1152px). Need to match.

### Changes — `src/components/sections/CardGridSection.tsx`

1. **Render section title**: Add `section.title` as fallback alongside `section.headline`:
   ```tsx
   {(section.title || section.headline) && (
     <h2 className="...">{section.title || section.headline}</h2>
   )}
   ```
   Move the heading inside the `max-w` container so it aligns with the cards.

2. **Match container width**: Change `max-w-[1080px]` to `max-w-6xl` and add `px-4 md:px-8` to match other sections (FeatureBanner, BenefitList).

### Single file changed
- `src/components/sections/CardGridSection.tsx`

