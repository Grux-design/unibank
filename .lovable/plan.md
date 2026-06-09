# Free the hero image from its container

The new image already includes its own orange blob backdrop and transparent edges, so the rounded photo card in `HeroPhotoFrame` is fighting it — clipping the bottom, hiding the blob, and making the subject feel cramped.

## Change

Edit `src/components/molecules/HeroPhotoFrame.tsx`:

- Remove the inner photo frame styling: no `borderRadius`, no `overflow: hidden`, no orange `background` fill, no `left: 11% / right: 11%` inset, no fixed `height: 480`.
- Let the `motion.div` fill the right column edge-to-edge and allow the image to overflow naturally (image can extend slightly past the hero card bottom for a "popping out" feel).
- Drop the two decorative accent shapes (`blobAccent` circle + transparent blob) since the new image already carries the orange blob composition.
- Set `<img>` to `object-fit: contain`, `object-position: bottom center`, full width/height of the column, so the figure scales without cropping the head or hands.
- Keep the existing fade-in `AnimatePresence` transition and the per-slide `key` so slide changes still cross-fade.
- Allow the parent column to overflow visible: in `HeroCarousel.tsx`, the right column wrapper stays as-is, but the hero card's `overflow: hidden` already on the outer card keeps things tidy — we just stop clipping inside the frame.

## Result

The figure with the orange blob backdrop sits flush against the bottom of the hero card, scales naturally to the column, no rounded crop box, no double-background. Other slides (auto, leasing, hipoteca) still render fine because `object-fit: contain` works for any source; if they look too small later we can reintroduce a per-slide fit override, but no other slide changes are needed in this step.

## Files

- `src/components/molecules/HeroPhotoFrame.tsx` — strip the framed container, let the image expand.
