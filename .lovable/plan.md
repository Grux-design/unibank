## Goal

Transform `/blog` from a static 6-card grid into an editorial, interactive news hub that feels alive and on-brand (Unibank orange `#ff8136`, near-black, Inter, full-width minimalist).

---

## 1. Expand the dataset (`src/pages/BlogPage.tsx`)

Grow the `BlogPost` mock array from 6 → ~14 posts so filters/sort/pagination feel meaningful. Each post gains:
- `author` (name + role, e.g. *"María Pérez · Editora Financiera"*)
- `readTime` (e.g. `"4 min lectura"`)
- `featured: boolean` (1 hero post + 2 secondary featured)
- `tags: string[]` (for richer filtering beyond the single category)

Categories used: **Productos, Educación Financiera, Noticias, Empresas, Inversiones, Sostenibilidad**.

---

## 2. New page structure

### a) Hero band (replaces current plain title block)
- Keep the existing `bg-muted/30` band but add a small orange eyebrow chip ("Sala de Prensa · Blog Unibank"), the headline, and a one-line subhead.
- Below the heading, a horizontal **stat strip**: `{posts.length} artículos · {categories.length} categorías · Actualizado {fecha más reciente}`.

### b) Featured section (new)
A 2-column editorial layout right under the hero:
- **Left (60%)**: large featured post card — full image, category chip, title (text-3xl), excerpt, author + date + read time row.
- **Right (40%)**: stack of 2 secondary featured posts in a horizontal mini-card style (image left, text right).

### c) Sticky filter/search toolbar
A `sticky top-20 z-30` toolbar with backdrop blur:
- **Search input** (left, with `Search` icon from lucide) — filters by title/excerpt live.
- **Category pills** (center, horizontally scrollable on mobile) — "Todos" + each category. Active pill uses `bg-primary text-primary-foreground`. Built with shadcn `Button` (variant ghost/default).
- **Sort `Select`** (right, shadcn): "Más recientes", "Más antiguos", "A–Z".
- **Result count** small text under the bar: `"Mostrando X de Y artículos"`.

### d) Main grid
- Same `Card` primitive but 3 columns on `lg`, 2 on `md`, 1 on mobile.
- Add **author row** (small avatar circle with initial + name) and **read time** badge to each card.
- Hover: lift (`-translate-y-1`), stronger border, image zoom (already exists).
- **Empty state** when filters yield 0 results: centered icon + "No encontramos artículos…" + "Limpiar filtros" button.

### e) Pagination
- 6 posts per page using shadcn `Pagination` component (already in the project).
- Resets to page 1 whenever search/category/sort changes.
- Smooth scroll back to top of grid on page change.

### f) Newsletter CTA strip (bottom, before footer)
A full-width `bg-primary/5` band with: headline "Recibe nuestras novedades", short copy, email input + "Suscribirme" button (UI-only, no backend wiring — visual completeness only).

---

## 3. State & logic (all client-side, no backend changes)

Inside `BlogPage.tsx` with `useState` + `useMemo`:
- `query: string`, `category: string` (default `"Todos"`), `sort: "recent" | "old" | "az"`, `page: number`.
- Memoized `filtered` → search match (case-insensitive on title + excerpt) → category filter → sort.
- Memoized `paginated` → slice for current page (`PAGE_SIZE = 6`).
- `useEffect` to reset `page` to 1 whenever `query`, `category`, or `sort` changes.

---

## 4. Components reused (no new files needed)

- `@/components/ui/card` — already used.
- `@/components/ui/button` — pills, clear filters, newsletter submit.
- `@/components/ui/input` — search + newsletter email.
- `@/components/ui/select` — sort dropdown.
- `@/components/ui/badge` — category chip + read-time badge.
- `@/components/ui/pagination` — page navigation.
- `lucide-react` icons: `Search`, `CalendarDays`, `Clock`, `User`, `ArrowRight`, `Newspaper`, `X`.

No new dependencies. Single file edited: **`src/pages/BlogPage.tsx`**.

---

## 5. Visual & accessibility polish

- All interactive elements get focus-visible rings (inherits from existing button/input primitives).
- Sticky toolbar uses `bg-background/80 backdrop-blur` so it stays legible above the grid.
- Featured card uses an `aspect-[16/10]` image; secondary featured uses `aspect-square` thumbnails (96px).
- `loading="lazy"` on all non-featured images; featured hero image preloaded (`loading="eager"`).
- Helmet title/description updated to reflect richer content; canonical unchanged.

---

## Out of scope (can follow in a later step)

- Real article detail pages (`/blog/:slug`) — cards stay non-navigating but visually clickable, matching current behavior.
- Wiring the blog to Contentful — keeping mock data so this iteration ships immediately.
- Newsletter form submission backend.
