
## Fix Hero Layout (Horizontal) + Redesign Benefits Grid

### What's wrong

**Hero**: `gridTemplateColumns: "1fr"` is always 1 column. The `md:grid-cols-2` class works but `order: -1` on the image forces it on top on mobile — which is correct — but on desktop the columns are too narrow and the image has a fixed `aspectRatio: "4/3"` instead of filling height. The intent matches the reference (Nubank screenshot): left = tag + large headline + subheadline + form card; right = tall rounded image that fills the row height.

**Feature Strip**: Compact small cards in a 4-column grid. The reference shows large generous cards with just an icon at top-left, a big bold title, and description underneath — more spacious, white background, large border-radius (~24px), 3-col desktop layout.

---

### Changes — 2 files only

**`src/components/sections/HeroFormSection.tsx`**

- Remove `order: -1` / `md:order-none` hack
- Set `gridTemplateColumns` to `"1fr 1fr"` on desktop via a Tailwind class override or inline media-query approach. The cleanest way: keep `className="md:grid-cols-2"` but remove the inline `gridTemplateColumns: "1fr"` override so Tailwind takes over properly
- Image: remove `aspectRatio: "4/3"`, set `minHeight: 480` so it fills the grid row height, use `objectFit: "cover"` on the full container height
- On mobile (default): single column, image on top (natural DOM order: image first in JSX, content second — Tailwind reverses for desktop)
- Move image div **before** content div in JSX (so it's on bottom in mobile, and since `md:grid-cols-2` renders left-to-right, add `md:order-last` to the image)

Actually: content left, image right in desktop → keep content first in JSX, image second. On mobile they stack: content then image. That's fine (matches reference where form is visible before scrolling).

**`src/components/sections/FeatureStripSection.tsx`**

Match the reference (image-38): 
- Section background: light warm gray `hsl(var(--muted))` or `#F6F4F2` 
- Section header: large centered `<h2>` only (no `SectionTag` pill needed if no internalName — keep it optional)
- Cards: white background, `borderRadius: 28px`, `padding: 32px 28px`, `border: none` (just shadow or clean white on gray bg), generous vertical spacing
- Icon: top-left, rendered as `<img>` if available or Lucide fallback, **no colored background wrapper** — just the bare icon, size `~40px`
- Title: `fontSize: clamp(20px, 2vw, 26px)`, `fontWeight: 800`, large and prominent
- Description: `fontSize: 15px`, muted color, `lineHeight: 1.6`
- Grid: `grid-cols-1 md:grid-cols-3` (3 columns desktop like the reference, wraps naturally to next row for 4+ items)
- Gap: `20px`
- Remove hover transform effect — keep it clean and static like the reference

### Summary of changes

| File | Change |
|---|---|
| `HeroFormSection.tsx` | Fix layout to true 50/50 horizontal; image fills height, no order hack; mobile stacks content-over-image |
| `FeatureStripSection.tsx` | New card design: larger, white cards on gray bg, bare icon, bigger title, 3-col grid |
