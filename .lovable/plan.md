

## Plan: Build 4 new section components

### Overview

Create `FeatureBannerSection`, `CardGridSection`, `BenefitListSection`, and `FAQSection` components, register them in `PageBuilder`, and install the `lenis` dependency for the Card Grid scroll-stack effect.

All sections consume the existing `ResolvedSection` type — no Contentful schema or resolver changes needed. Each section reads `headline`, `subheadline`, `mainImage`, and `items[]` (each item has `title`, `description`, `icon`).

---

### 1. Install dependency

```
npm install lenis
```

Required for the ScrollStack (Card Grid) smooth-scroll pinning effect.

### 2. Create ScrollStack utility component

**`src/components/ui/ScrollStack.tsx`** + **`src/components/ui/ScrollStack.css`**

Port the ScrollStack + ScrollStackItem code from the reactbits library provided. This is a reusable scroll-pinning card stack with Lenis smooth scrolling.

### 3. Create section components

**`src/components/sections/FeatureBannerSection.tsx`**
- Full-width light gray background section
- Rounded card container with 50/50 image-left / text-right layout
- Renders `mainImage` on the left, `headline` + `subheadline` on the right
- CTA button "Conocer más" (non-functional placeholder)
- Based on reference image: rounded corners, shadow, clean typography

**`src/components/sections/CardGridSection.tsx`**
- Uses `ScrollStack` + `ScrollStackItem` with `useWindowScroll={true}`
- Section headline at top center
- Each `item` becomes a `ScrollStackItem` card containing: image (from `item.icon`), title, description, and a "Más información >" link
- Cards stack on scroll with pinning effect per the reactbits component

**`src/components/sections/BenefitListSection.tsx`**
- Light gray background, two-column layout on desktop
- Left column: large `headline` text
- Right column: vertical stack of white rounded cards, each with `item.icon` image on left and `title` + `description` text on right
- Clean card style matching the reference image

**`src/components/sections/FAQSection.tsx`**
- Light gray background, two-column layout
- Left column: `headline` + `subheadline` + optional CTA button
- Right column: accordion using existing shadcn `Accordion` component
- Each `item` becomes an accordion item: `item.title` = question, `item.description` = answer
- Expand/collapse with + / x icon

### 4. Register in PageBuilder

**`src/components/organisms/PageBuilder.tsx`**

Add 4 new entries to `SECTION_MAP`:
```
"Feature Banner": FeatureBannerSection
"Card Grid": CardGridSection
"Benefit List": BenefitListSection
"FAQ": FAQSection
```

### Files touched
- `package.json` (add `lenis`)
- `src/components/ui/ScrollStack.tsx` (new)
- `src/components/ui/ScrollStack.css` (new)
- `src/components/sections/FeatureBannerSection.tsx` (new)
- `src/components/sections/CardGridSection.tsx` (new)
- `src/components/sections/BenefitListSection.tsx` (new)
- `src/components/sections/FAQSection.tsx` (new)
- `src/components/organisms/PageBuilder.tsx` (edit)

