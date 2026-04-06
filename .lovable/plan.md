

## Plan: Fix all 4 section components

### Root issues
1. **Shadows** need removal from all 4 sections
2. **Feature Banner**: uses `headline`/`subheadline` but should use `title` (headline) and `headline` (copy); missing `secondaryCta` field in types/resolver
3. **Card Grid**: needs white bg without shadow, layout mismatch vs reference, glitch from `will-change`/`transform-style` in CSS; missing `link` field on items
4. **Benefit List**: uses `headline` but should use `title`; icon images not showing (already coded but may be data issue); needs `py-[80px]`
5. **FAQ**: uses `headline` as title but should use `title` as title and `headline` as description; FAQ items use `question`/`answer` fields in Contentful (not `title`/`description`) so resolver doesn't pick them up

### Changes

**1. `src/integrations/contentful/types.ts`**
- Add `secondaryCta?: string` to `SectionFields` and `ResolvedSection`
- Add `question?: string`, `answer?: string`, `link?: string` to `FeatureItemFields` and `ResolvedFeatureItem`

**2. `src/hooks/useContentfulPage.ts`**
- In `resolveFeatureItem`: map `question`, `answer`, and `link` from entry fields
- In `resolveSection`: map `secondaryCta` from section fields

**3. `src/components/sections/FeatureBannerSection.tsx`**
- Remove `shadow-lg`
- Show `section.title` as the heading, `section.headline` as the body copy
- Use `section.secondaryCta` as button label (fallback "Conocer más")
- Padding `py-[80px]`

**4. `src/components/sections/CardGridSection.tsx`**
- Match reference: title above image, image left, description + link CTA right
- Remove shadow from cards
- Use `item.link` for the CTA text/href
- Padding `py-[80px]`

**5. `src/components/ui/ScrollStack.css`**
- Remove `box-shadow` from `.scroll-stack-card`
- Remove `transform-style: preserve-3d` (causes flicker)
- Remove redundant `will-change` and `transform` from CSS (JS handles it)

**6. `src/components/sections/BenefitListSection.tsx`**
- Use `section.title` as the section heading (not `headline`)
- Remove `shadow-sm` from cards
- Padding `py-[80px]`
- Icon images already coded — should work once `icon` is resolved (no code change needed for that)

**7. `src/components/sections/FAQSection.tsx`**
- Use `section.title` as heading, `section.headline` as description text
- Remove `shadow-sm` from accordion items
- Render `item.question` as accordion trigger (fallback to `item.title`)
- Render `item.answer` as accordion content (fallback to `item.description`)
- Ensure accordion trigger shows `+` icon on the right
- Padding `py-[80px]`

### Files touched
- `src/integrations/contentful/types.ts`
- `src/hooks/useContentfulPage.ts`
- `src/components/ui/ScrollStack.css`
- `src/components/sections/FeatureBannerSection.tsx`
- `src/components/sections/CardGridSection.tsx`
- `src/components/sections/BenefitListSection.tsx`
- `src/components/sections/FAQSection.tsx`

