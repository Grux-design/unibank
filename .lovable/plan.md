# Fix hero image: vertical centering + overflow

## Root cause

In `src/components/molecules/HeroPhotoFrame.tsx` the `<img>` has two leftover settings from the earlier "let it expand" pass:

1. `width: "110%"` and `height: "115%"` — the img element itself is larger than its column, so its bounding box overflows the carousel card (visible in the screenshot as the blue rect extending past the card's right edge and into the header above).
2. `objectPosition: "bottom center"` — even though the wrapper now uses `alignItems: center`, the image content inside the oversized img box is pinned to the bottom of that box. That's why the figure looks bottom-weighted instead of centered.

Switching `alignItems` to center earlier had no visible effect because the img itself was already filling (and exceeding) the wrapper.

## Fix

Edit only `src/components/molecules/HeroPhotoFrame.tsx`:

- `<img>` `width: "100%"`, `height: "100%"` — match the column, no overflow.
- `<img>` `objectPosition: "center center"` — let `object-fit: contain` center the figure inside its own box.
- Keep wrapper `alignItems: "center"` (already correct) and `overflow: "visible"` on the outer frame in case future slides want gentle bleed.
- Everything else (fade-in transition, AnimatePresence, key per slide) stays.

## Result

The figure sits centered both horizontally and vertically inside the right column of the hero card, the img bounding box no longer pokes out past the carousel, and the orange blob backdrop reads as designed.

## Files

- `src/components/molecules/HeroPhotoFrame.tsx`
