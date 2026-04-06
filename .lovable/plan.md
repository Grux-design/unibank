

## Fix: Contentful API calls returning `undefined` credentials

### Root Cause

The `.env` file is auto-managed by Lovable Cloud and only contains Supabase variables. The Contentful secrets (`VITE_CONTENTFUL_SPACE_ID`, `VITE_CONTENTFUL_ACCESS_TOKEN`) exist in project secrets but are not injected into the client build, so `import.meta.env.VITE_CONTENTFUL_*` resolves to `undefined`.

### Solution: Proxy through a backend function

Move the Contentful API call to an edge function that reads secrets server-side using `Deno.env.get()`. The client calls the edge function instead of Contentful directly.

### Changes

**1. Create `supabase/functions/contentful-proxy/index.ts`**
- Reads `VITE_CONTENTFUL_SPACE_ID` and `VITE_CONTENTFUL_ACCESS_TOKEN` from `Deno.env`
- Accepts query params: `path`, `content_type`, `slug`, `include`
- Forwards the request to `cdn.contentful.com` and returns the JSON response
- Handles CORS headers

**2. Update `src/integrations/contentful/client.ts`**
- Replace direct Contentful CDN calls with calls to the edge function
- Use the Supabase URL from `import.meta.env.VITE_SUPABASE_URL` to build the function URL
- Remove references to `VITE_CONTENTFUL_SPACE_ID` and `VITE_CONTENTFUL_ACCESS_TOKEN`

### Technical Detail

```text
Before:  Browser → cdn.contentful.com (with undefined credentials)
After:   Browser → Edge Function → cdn.contentful.com (with server-side secrets)
```

The edge function URL pattern: `${VITE_SUPABASE_URL}/functions/v1/contentful-proxy`

No other files need to change — `useContentfulPage.ts` and all components continue to use `contentfulFetch()` as before.

