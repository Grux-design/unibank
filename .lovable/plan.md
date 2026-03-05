
## Plan: Contentful CMS Connection

The user wants to establish a Contentful connection — no pages or components yet, just the integration layer.

Since the Content Delivery API token is a **public/client-side key** (it's read-only and safe to expose), it can be stored in the codebase via `.env`. However, the Content Preview API token should be kept secret (it exposes unpublished content).

### What will be done

1. **Store tokens securely in `.env`**:
   - `VITE_CONTENTFUL_SPACE_ID=bsxwchto8q9z` — public, safe for client-side
   - `VITE_CONTENTFUL_ACCESS_TOKEN=hPb7E44kegBR2V5fG1Hj147ph7zIWTY7EiLQYronG60` — Content Delivery token (read-only, safe to expose)
   - Store the Preview token as a Lovable Cloud secret (`CONTENTFUL_PREVIEW_TOKEN`) so it's only accessible from edge functions

2. **Create `src/integrations/contentful/client.ts`**:
   - Export a configured Contentful client using the Delivery API
   - Use `fetch` directly (no extra SDK needed) or a lightweight wrapper
   - Exports `CONTENTFUL_SPACE_ID` and `CONTENTFUL_BASE_URL` constants for reuse

3. **Create `src/integrations/contentful/types.ts`**:
   - Define base TypeScript types: `ContentfulEntry<T>`, `ContentfulAsset`, `ContentfulCollection<T>`
   - These will be extended later as content models are defined in Contentful

### What will NOT be done
- No pages, components, or data-fetching hooks yet
- No edge function for preview (can be added when preview mode is needed)
- No content model-specific types (will be defined when CMS structure is decided)

### Files to create/edit
- `src/integrations/contentful/client.ts` — Contentful fetch client
- `src/integrations/contentful/types.ts` — Base types
- `.env` — Add `VITE_CONTENTFUL_SPACE_ID` and `VITE_CONTENTFUL_ACCESS_TOKEN`

The Preview API token will be stored as a secret (`CONTENTFUL_PREVIEW_TOKEN`) via the secrets tool so it's available for future edge functions but never exposed to the browser.
