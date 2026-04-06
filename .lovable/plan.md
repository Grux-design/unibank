

## Create Legal Pages (Privacy, Terms, Cookies) with Contentful Content

### Summary
Create three legal pages that fetch content from Contentful using existing slugs, add routes, and link the footer legal links to them.

### What will be built
- A reusable `LegalPage` component with a clean legal-document aesthetic (narrow prose column, readable typography, proper heading hierarchy)
- Three routes: `/aviso-de-privacidad`, `/terminos-y-condiciones`, `/politica-de-cookies`
- Footer links updated to use React Router `Link` instead of `<a href="#">`

### Contentful Integration
The pages will reuse the existing `useContentfulPage` hook, fetching by slug. The `content` field from Contentful (likely Rich Text) will be rendered using `@contentful/rich-text-react-renderer`. The `PageFields` type and `fetchPage` function may need to resolve a top-level `content` field (Rich Text) in addition to `sections`.

### Files to change

1. **`src/integrations/contentful/types.ts`** — Add optional `content` field (Rich Text document) to `PageFields` and `ResolvedPage`.

2. **`src/hooks/useContentfulPage.ts`** — Pass through `raw.fields.content` into the resolved page object so legal pages can access it.

3. **`src/pages/LegalPage.tsx`** (new) — Reusable page component:
   - Takes slug from URL params
   - Fetches page via `useContentfulPage`
   - Renders title as `<h1>` and `content` field using `documentToReactComponents`
   - Legal styling: `max-w-3xl mx-auto`, `prose` classes, clean white background, generous padding
   - Loading skeleton and error state

4. **`src/App.tsx`** — Add three routes inside the `SiteLayout`:
   ```
   /aviso-de-privacidad → LegalPage
   /terminos-y-condiciones → LegalPage
   /politica-de-cookies → LegalPage
   ```

5. **`src/data/footerData.ts`** — Change `legalLinks` from `string[]` to `{ label: string; path: string }[]` with the corresponding routes.

6. **`src/components/molecules/FooterAppsBar.tsx`** — Replace `<a>` tags with React Router `<Link>` components using the new `legalLinks` structure.

### Styling approach
The legal page will use a minimal, professional document layout:
- White background, narrow content column (`max-w-3xl`)
- Tailwind `prose` for automatic typography on Rich Text output
- Top padding to clear the fixed header
- Page title in bold, large heading

