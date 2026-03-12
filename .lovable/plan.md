
## What needs to change

The developer spec is precise. The current implementation diverges from it in two ways:

### Problem 1 — Card padding controls the gaps, not absolute offsets on the photo

**Current:** The hero card has no explicit `paddingTop`/`paddingRight`. The two-column flex row has `minHeight: 540`. The right column inner div uses `top: 12, right: 12` insets on the photo/blob to fake the gap.

**Required (per spec):**
- Card `paddingTop: 32` — this pushes the right column down 32px from the card edge, creating the top gap
- Card `paddingRight: 48` — this pushes the right column 48px from the right card edge
- Photo uses `left: 50%, translateX(-50%), width: 68%` centered within the right column — the remaining 16% on the right side shows the orange gradient through
- Photo `bottom: 0, height: 100%` — sits flush at the bottom, full height → top rounded corners are visible

**The card's `padding` is the only mechanism for gaps — no `top: 12 / right: 12` on the photo.**

### Problem 2 — Bottom border-radius on image not visible

The photo container currently has `borderRadius: "20px 20px 0 0"` — only top corners. But looking at the screenshot, the image has rounded corners on **all four sides** (`borderRadius: 28` all around), visible because there's orange gradient showing around the photo (from the card padding + centering). The bottom-right corner is visible since the card's own `borderRadius: 28` and `overflow: hidden` clip the card edge, but the photo itself is inset from the card edges — so the photo's bottom corners should also be rounded.

### Exact changes to `HeroCarousel.tsx`

**1. Hero card div (line 174-184):**
- Add `paddingTop: 32` and `paddingRight: 48`
- Keep `overflow: "hidden"`, `borderRadius: 28`, `minHeight: 540`

**2. Two-column row (line 201-208):**
- Remove `minHeight: 540` — the card's `minHeight: 540` already handles this; the row should just `height: "100%"` or let it be set by the card

**3. Right column outer div (line 334-339):**
- Keep `flex: "0 0 auto"`, `width: "clamp(260px, 38%, 440px)"`, `position: "relative"`
- The column now starts 32px below card top (from card paddingTop) and ends 48px before card right (from card paddingRight) — automatically

**4. Inner right div (line 341):**
- `height: "100%"`, remove `minHeight: 540` (already handled by card)
- Keep `overflow: "hidden"`, `position: "relative"`, `width: "100%"`

**5. Main blob (lines 358-370):**
- Change to `left: 0, right: 0, top: 0, bottom: 0` (full-fill, no insets — the card padding handles the outer gaps)
- `borderRadius: 28` all corners (matches photo)

**6. Photo container (lines 373-399):**
- `bottom: 0, height: "100%"` — anchored flush at bottom, full height so top corners are visible
- `left: "50%"`, `transform: "translateX(-50%)"`, `width: "68%"` — centered, 68% wide per spec
- `borderRadius: 28` — all four corners rounded (currently only top two are rounded, which is why bottom is invisible)
- `overflow: "hidden"` — keeps the img clipped to the rounded frame

**7. Glass card (line 402-415):**
- `right: 16, bottom: 24` — already correct, keep as-is

### Why this fixes both issues

- **Top gap:** card `paddingTop: 32` → right column starts 32px below card top → photo frame's `top` is 0 relative to the column (not to the card), so 32px gap is naturally created
- **Right gap:** card `paddingRight: 48` → right column ends 48px before card right → photo at `width: 68%` centered adds another ~16% of right column width as right breathing room
- **Bottom border-radius visible:** photo gets `borderRadius: 28` on all corners; since it's inset from card edges (via padding + 68% width), the bottom corners are visible over the orange gradient background
