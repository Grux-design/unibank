
## The Problem

The header is `sticky` and takes up space in the document flow. The `<main>` uses `-mt-16` to pull content up behind it. But after adding `pt-4` to the header, the total height of the header grew from 64px (`h-16`) to 64px + 16px = 80px — yet `-mt-16` (−64px) is still being used. This leaves a 16px gap of white space that isn't covered by the hero.

**Fix:** Change `-mt-16` to `-mt-20` in `SiteLayout.tsx` so the negative margin exactly cancels the full header height (h-16 + pt-4 = 80px = 5rem = `mt-20`).

**Single file change:** `src/components/layout/SiteLayout.tsx` line 14 — change `-mt-16` → `-mt-20`.
