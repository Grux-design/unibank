
## The real problem

Looking at the screenshot and the code carefully:

The card wrapper (line 174-184) has `overflow: "hidden"` and `borderRadius: 28`. This is what clips the right column.

The right column outer div (lines 334-342) has `position: "relative"` but the **card parent** has `overflow: hidden` — so **nothing can escape the card boundary**, no matter what z-index or positioning you give the right column children.

The issue in the screenshot: the photo and blobs are being cut off on the **right side and top** because the right column's inner div (`minHeight: 540`, line 344) has `height: "100%"` but the flex row `minHeight` is only 480 (line 207) — and the card itself is `minHeight: 540`. The flex row doesn't stretch to the card's full height, so the inner div calculates `100%` of a shorter container.

Additionally, the photo container uses `left: "50%"` + `transform: translateX(-50%)` + `width: "88%"` — that centers the photo inside the right column. But visually from the screenshot, the photo should fill to the **right edge** of the card and the rounded corners should only appear on the top-left of the photo frame. The photo is being squeezed/centered instead of right-anchored.

## The correct approach (matching the screenshot exactly)

Looking at the screenshot:
- The photo fills from roughly the center of the card to the **right edge**, flush with the card's right boundary
- The rounded rectangle frame has a rounded top-left corner only (the top-right, bottom-left, bottom-right are either flush with the card or straight)
- The photo bleeds to the bottom of the content area (above the controls row)
- The glass card sits in the bottom-right corner, **inside** the photo frame

**Key fix**: Instead of centering the photo with `left: 50%` + `translateX(-50%)`, **anchor it to the right** with `right: 0, left: 0` so it fills the entire right column. The rounded corners on the photo frame only need to apply to the top edges since the card itself clips bottom-right with its own `borderRadius: 28`.

Also the **flex row `minHeight` must match the card `minHeight`** so height percentages resolve correctly.

The user's own explanation confirms: "parent must have `position: relative` and `overflow: hidden` together" — so the right column's inner div IS the correct scoping container. The issue is the photo is being horizontally centered at 88% width instead of filling the full column.

## Changes to make

All in `HeroCarousel.tsx`:

**1. Fix flex row `minHeight` (line 207):** Change `minHeight: 480` → `minHeight: 540` so it matches the card, making `height: "100%"` on children resolve to the full card height.

**2. Right column outer div (lines 334-342):** Remove `display: flex` and `alignItems: stretch` — these aren't needed since the inner div uses absolute children. Keep `flex: "0 0 auto"`, `width`, `position: "relative"`. 

**3. Inner right div (line 344):** Keep as-is (`position: relative`, `width: 100%`, `height: 100%`, `minHeight: 540`, `overflow: hidden`). This is the correct clipping boundary per the user's explanation.

**4. Photo container (lines 383-392):** Change from centered approach to full-fill:
- Remove `left: "50%"` and `transform: "translateX(-50%)"`
- Change to `left: 0, right: 0, top: 0, bottom: 0` (or `width: "100%"`)
- Keep `borderRadius: "20px 20px 0 0"` and `overflow: "hidden"`

**5. Main blob (lines 362-372):** Same — change from centered with `left: "50%"` + `translateX(-50%)` to `left: 0, right: 0, top: 0, bottom: 0` filling full column.

**6. Accent circle (lines 346-357):** Keep as-is (decorative, gets clipped by the inner div's `overflow: hidden`).

**7. Glass card (lines 405-418):** Already at `right: 16, bottom: 24` — fine. No change needed.

This approach is clean: the inner right div has `overflow: hidden` as its own clipping boundary (per the user's explanation), and all absolute children position relative to it. The photo fills the entire column from edge to edge, matching the screenshot.
