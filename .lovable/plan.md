
## Two targeted changes to HeroCarousel.tsx

### 1. Remove `overflow: "hidden"` from the hero card (line 178)
The card wrapper has `overflow: "hidden"` which clips the right-column photo, blobs, and glass card that extend beyond the card's bounds. The reference screenshot shows the image fully visible inside a tall rounded rectangle.

Fix: Remove `overflow: "hidden"` from the card div (line 178). To keep the diagonal pattern overlay contained, the SVG already uses `position: absolute, inset: 0` so it won't escape. The left column already has `overflow: "hidden"` (line 219) which handles the slide animation clipping.

However — since `borderRadius: 28` on the card relies on `overflow: hidden` to clip child backgrounds, we need to keep the gradient and pattern contained. The left side is fine. The right side just needs to visually overflow.

Better approach: Keep `overflow: "hidden"` on the card but change the right column to use `overflow: "visible"` AND add `position: "relative"` with a `zIndex` so the content can visually escape the card. Actually the right column already has `overflow: "visible"` (line 339) — the problem is the parent card clips it.

**Real fix:** Change the card wrapper `overflow` from `"hidden"` to `"clip"` — this clips the card background/gradient but... no, `overflow: clip` would still clip children.

**Correct approach:** Keep card as a flex row. Add a wrapper div inside the card that handles only the left side background, and let the right column sit outside the overflow clip. Or better: set `overflow: "visible"` on the card and use a pseudo-approach for the rounded corners background only.

Actually the simplest approach matching the screenshot: The reference shows the photo inside a **white rounded rectangle** that is the full height of the card — not overflowing at all. The photo IS inside the card bounds. The issue is the right column's `minHeight: 480` vs the card's `minHeight: 540` — the inner relative div has `minHeight: 480` but the photo uses `height: "90%"` of that, meaning `432px`. The photo IS contained — the glass card at `right: -20` overflows.

So the actual clip issue is: card `overflow: hidden` clips the glass card at `right: -20`. Fix: change glass card `right: -20` to `right: 16` or `right: 24` so it stays within bounds.

Also the right column inner div should stretch the full card height. Currently `minHeight: 480` but the card is `minHeight: 540`. Set it to `height: "100%"` with a guaranteed minimum.

**Summary of right-column fixes:**
- Right outer div: change `alignItems: "flex-end"` → `alignItems: "stretch"` and add `height: "100%"`  
- Inner relative div: change `minHeight: 480` → `height: "100%"`, `minHeight: 540`
- Photo: change `height: "90%"` → `height: "100%"`, remove blob border-radius to show full rectangular image like the reference (the reference screenshot shows a clean tall rounded-rect container, not organic blobs)
- Main blob: change `height: "92%"` → `height: "100%"`
- Glass card: change `right: -20` → `right: 16`

Looking at the reference screenshot again: it shows a clean white/light-gray rounded rectangle containing the photo, full height of the card. The decorative circle blobs are just subtle behind it. The organic rounded-top blob shape needs to be more rectangular like the reference — `borderRadius: "24px 24px 0 0"` or similar.

### 2. Remove `borderTop` from controls row (line 496)
Change `borderTop: \`1px solid ${t.borderColor}\`` → remove it (or set to `"none"`).

### Files to change
- `src/components/organisms/HeroCarousel.tsx` only

### Specific line changes
1. **Line 178**: remove `overflow: "hidden"` (keep card clipping via borderRadius without overflow hidden — we'll use `overflow: "clip"` to allow positioned children to overflow while still clipping the background)

   Actually: set `overflow: "visible"` on the card, and wrap the gradient background as an absolute inset div with `borderRadius: 28` and `overflow: "hidden"` so the gradient/pattern stays rounded. Then the photo/glass card can overflow freely.

   Simplest clean approach: Keep `overflow: "hidden"` on card, but fix the glass card position to stay inside (`right: 16` not `-20`), and fix the right column to be full height.

2. **Lines 334-344** (right column): 
   - `alignItems: "stretch"` 
   - Remove `overflow: "visible"` (default)

3. **Line 344** (inner relative div):
   - `height: "100%"` instead of just width/height  
   - `minHeight: 540`

4. **Lines 360-372** (main blob):
   - `height: "100%"` (full height of column)
   - `top: 0, bottom: 0` (span full height)
   - `borderRadius: "24px 24px 0 0"` to match reference's rounded-top rectangle

5. **Lines 376-401** (photo):
   - `top: 0, height: "100%"` to fill full height
   - `borderRadius: "20px 20px 0 0"` to show full photo in rectangle

6. **Line 408**: `right: -20` → `right: 16`

7. **Line 496**: Remove `borderTop`
