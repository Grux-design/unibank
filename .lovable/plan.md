
## Product Detail Page — Contentful Page Builder at `/personas/cuentas/:slug`

### Overview

Build a dynamic page builder that fetches a `Page` entry from Contentful by slug, iterates over its `sections` array, and renders a component per `type`. Two section renderers: `HeroForm` and `FeatureStrip`. Unrecognized types show a `UnknownSection` fallback. SEO is driven by `seoMetadata`.

---

### Contentful integration note

The project already has `src/integrations/contentful/client.ts` with a `contentfulFetch` function calling the Delivery API directly via `VITE_CONTENTFUL_SPACE_ID` + `VITE_CONTENTFUL_ACCESS_TOKEN`. No connector or edge function needed — client-side fetch is already the pattern. The existing `ContentfulEntry`, `ContentfulCollection`, and `ContentfulAsset` types in `types.ts` will be extended.

---

### New files

```
src/
  integrations/contentful/
    types.ts              ← EXTEND: add PageFields, SectionFields, FeatureItemFields, SeoMetadataFields

  hooks/
    useContentfulPage.ts  ← react-query hook: fetches Page by slug, resolves includes

  pages/
    ProductDetailPage.tsx ← route component: slug param → hook → PageBuilder → Helmet SEO

  components/
    organisms/
      PageBuilder.tsx     ← maps sections[] → component by type, renders fallback

    sections/             ← NEW folder per atomic design
      HeroFormSection.tsx ← type = "Hero - Form": internalName + headline + image + optional form
      FeatureStripSection.tsx ← type = "Feature Strip": horizontal grid of FeatureItem cards
      UnknownSection.tsx  ← fallback for unrecognized type (dev-only visible block)
```

---

### File-by-file plan

**`src/integrations/contentful/types.ts`** — add:
```ts
SeoMetadataFields { title, description, canonicalUrl? }
FeatureItemFields  { title, description, icon?: ContentfulAsset }
SectionFields      { type: string; internalName?: string; headline?: string; mainImage?: { sys: Link }; showForm?: boolean; items?: { sys: Link }[] }
PageFields         { title: string; slug: string; sections?: { sys: Link }[]; seoMetadata?: { sys: Link } }
```

**`src/hooks/useContentfulPage.ts`** — `useQuery` that:
1. Calls `contentfulFetch('/entries', { content_type: 'page', 'fields.slug': slug, include: '3' })`
2. Resolves linked entries and assets from `includes.Entry[]` and `includes.Asset[]` using a lookup map
3. Returns `{ page, sections, seoMeta, isLoading, error }`

**`src/components/sections/HeroFormSection.tsx`**:
- Left column: small eyebrow pill using `SectionTag` with `internalName`, then `<h1>` `headline` using existing `--uni-dark` / `--fun-orange` brand tokens
- Right column: `mainImage` from Contentful asset (resolves `https:` prefixed URL) in a rounded frame matching the existing card aesthetic (`borderRadius: 28`, `overflow: hidden`)
- If `showForm === true`: a white card with an ID input + orange "Continuar" button (reuses `BtnPrimary` from `atoms.tsx`), styled with `border: 1px solid var(--uni-border)`
- Fully responsive: stacks column on mobile (image above content, form below)

**`src/components/sections/FeatureStripSection.tsx`**:
- Maps over `items[]` (resolved `FeatureItem` entries)
- Each card: icon image (from Contentful asset) or Lucide fallback, title, description
- Layout: `grid-cols-2 md:grid-cols-4` with `gap-4`, rounded cards (`borderRadius: 20`) with `border: 1px solid var(--uni-border)` and padding
- Matches the clean banking aesthetic from the existing `ProductsSection`

**`src/components/sections/UnknownSection.tsx`**:
- Orange-bordered dashed box, only visible when `import.meta.env.DEV` is true
- Shows the unrecognized `type` string so devs know what to implement

**`src/components/organisms/PageBuilder.tsx`**:
```tsx
const SECTION_MAP: Record<string, React.ComponentType<{section: ResolvedSection}>> = {
  "Hero - Form":     HeroFormSection,
  "Feature Strip":   FeatureStripSection,
};

sections.map(s => {
  const Comp = SECTION_MAP[s.type] ?? UnknownSection;
  return <Comp key={s.sys.id} section={s} />;
})
```

**`src/pages/ProductDetailPage.tsx`**:
- `useParams<{ slug: string }>()`
- Calls `useContentfulPage(slug)`
- Loading state: skeleton shimmer using existing Tailwind `animate-pulse`
- Error state: simple centered message + back link
- `<Helmet>` sets `<title>` and `<meta name="description">` from `seoMeta` fields
- Renders `<PageBuilder sections={sections} />`

**`src/App.tsx`** — add route inside `<SiteLayout>`:
```tsx
<Route path="/personas/cuentas/:slug" element={<ProductDetailPage />} />
```

---

### Responsive behavior

| Element | Mobile | Desktop |
|---|---|---|
| Hero: columns | stacked (image top, content bottom) | side-by-side 50/50 |
| Hero: image | `height: 260px`, full width | `height: 100%`, right half |
| Feature strip | `grid-cols-2` | `grid-cols-4` |
| Form card | full width below content | inlined right side |

---

### Technical notes

- Asset URL resolution: Contentful returns `//images.ctfassets.net/...` — prefix with `https:` when rendering `<img>` src
- The `include: '3'` param tells Contentful to include 3 levels of linked entries/assets in `includes`, avoiding N+1 fetches
- All linked entries/assets are resolved client-side via a `Map<id, entry/asset>` built from `includes`
- No changes to the existing `contentfulFetch` client or Supabase integration
