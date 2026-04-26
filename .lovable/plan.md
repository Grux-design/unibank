## Goal

Replace the hardcoded blog data with live Contentful content, and add a Medium-style detail page at `/:segment/blog/:slug` with a hero banner, Rich Text rendering (including embedded images), and SEO derived from the post itself.

---

## 1. Extend Contentful types & hook

**File: `src/integrations/contentful/types.ts`**

Add Blog field types and resolved type:

```ts
export interface BlogFields {
  title: string;
  slug: string;
  excerpt?: string;
  thumbnail?: ContentfulLink | ContentfulAsset;
  content?: unknown; // Rich Text document
  category?: string;
  author?: string;
  publishedDate?: string;
}

export interface ResolvedBlog {
  sys: ContentfulSys;
  title: string;
  slug: string;
  excerpt?: string;
  thumbnail?: ContentfulAsset;
  content?: unknown;
  category?: string;
  author?: string;
  publishedDate?: string;
}
```

**New file: `src/hooks/useContentfulBlog.ts`**

Two hooks built on the existing `contentfulFetch` proxy (which already supports `content_type` and `slug` params):

- `useContentfulBlogList()` → fetches `content_type=blog`, resolves thumbnail assets via `includes.Asset`, returns `ResolvedBlog[]` sorted by `publishedDate` desc.
- `useContentfulBlogPost(slug)` → fetches a single entry by slug with `include=4` so embedded asset references inside the Rich Text `content` are resolved. Returns `{ post, assetMap, entryMap }` so the Rich Text renderer can look up embedded images.

Both use React Query with a 5-min `staleTime`, mirroring `useContentfulPage`.

---

## 2. Rewrite `/blog` index page

**File: `src/pages/BlogPage.tsx`** (full refactor)

- Drop the hardcoded `posts` array.
- Use `useContentfulBlogList()`; show skeleton placeholders while loading; show a friendly empty state if nothing returns.
- Keep the existing hero header design (title, subtitle, stats), but compute counts from live data.
- **Destacados section**: show the 3 most recent posts as the editorial layout (1 large + 2 stacked side cards). Use the post's `thumbnail` URL as the card image and `excerpt` for the summary text.
- Each card becomes a `<Link to={\`/${segment}/blog/${post.slug}\`}>` wrapping the full card area.
- **Segment resolution**: derive `segment` from the current URL via `useLocation()` — if the user navigated from `/empresas/...` use `empresas`, otherwise default to `personas`. (Header context isn't passed via URL on `/blog` itself, so default = `personas`.)
- **Conditional sections**: if `posts.length < 4`, render only the hero + Destacados — hide the search bar, sort dropdown, category pills, paginated grid, and the "Más artículos" section. Newsletter CTA stays at the bottom either way.
- When `posts.length >= 4`, keep all the existing filter/sort/pagination logic, but rewire it to operate on the Contentful data.

---

## 3. New blog detail page

**New file: `src/pages/BlogPostPage.tsx`**

Medium-inspired reading layout:

- **Hero banner**: full-bleed `thumbnail` image (16:9, ~520px tall on desktop) with a subtle dark gradient overlay, title and meta (category badge, author, date, read time estimate) overlaid at the bottom on a contained max-width.
- **Article body**: centered `max-w-2xl` (~720px) for comfortable reading. Generous vertical rhythm, large serif-friendly typography via Tailwind `prose`-style classes (using existing `text-foreground` / `text-muted-foreground` tokens — no new colors).
- **Rich Text rendering**: use `@contentful/rich-text-react-renderer` (already installed) with a custom `options` object:
  - Headings (`H2`, `H3`) → styled `<h2>/<h3>` with proper margin and weight.
  - Paragraphs → `text-lg leading-relaxed text-foreground/90 mb-6`.
  - Lists, blockquotes, hr, hyperlinks → tasteful styled variants.
  - **`BLOCKS.EMBEDDED_ASSET`**: look up the asset id in the `assetMap` from the hook, resolve the URL (handle `//` prefix), and render a responsive `<figure><img/><figcaption/></figure>` with the asset's title/description as caption.
  - **`INLINES.HYPERLINK`** → underlined primary-colored links.
- **Footer of article**: back-to-blog link + a small "Compartir" row (visual only, native `navigator.share` if available, else copy-link fallback — no backend).
- **Loading state**: skeleton hero + skeleton paragraphs.
- **Not-found state**: friendly message with a button back to `/blog`.

**SEO**: `<Helmet>` with `<title>{post.title} – UniBank</title>`, `<meta name="description" content={post.excerpt}/>`, canonical `/${segment}/blog/${slug}`, plus `og:title`, `og:description`, `og:image` (thumbnail).

---

## 4. Routing

**File: `src/App.tsx`**

Add two routes (so both segments work):

```tsx
<Route path="/personas/blog/:slug" element={<BlogPostPage />} />
<Route path="/empresas/blog/:slug" element={<BlogPostPage />} />
```

(Using explicit segments rather than `/:segment/blog/:slug` to avoid clashing with the existing catch-all `/:slug` legal-page route.)

---

## 5. No backend changes needed

The existing `contentful-proxy` edge function already accepts `content_type` and `slug` query params and supports `include` depth, so it covers both the list and detail fetches. No edge-function or DB migration work required.

---

## Files touched

- ✏️ `src/integrations/contentful/types.ts` — add Blog types
- ➕ `src/hooks/useContentfulBlog.ts` — new list + detail hooks
- ✏️ `src/pages/BlogPage.tsx` — full refactor, conditional UI when < 4 posts
- ➕ `src/pages/BlogPostPage.tsx` — new Medium-style detail page
- ✏️ `src/App.tsx` — register the two new routes

## Out of scope

- Pagination from Contentful (we'll fetch all blog entries client-side; can be added later if the volume grows).
- Multi-language switching for blog content (uses Contentful's default locale).
- Comments, likes, or any persistence — purely read-only.
