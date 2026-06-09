## Goal
Make the floating header span up to 98vw (matching the hero carousel's max width) instead of the current `max-w-screen-xl` (1280px) cap.

## Change
In `src/components/organisms/Header.tsx`, line 82, replace the Tailwind `max-w-screen-xl` utility on the main bar wrapper with an inline `maxWidth: "98vw"`:

```tsx
<div
  className="mx-auto flex items-center justify-between px-4 sm:px-6"
  style={{ maxWidth: "98vw", width: "100%" }}
>
```

That's it — single line change. The mega menu and mobile drawer remain unaffected (they already render outside this inner wrapper).

## Notes
- 98vw matches the hero card's `maxWidth: "98vw"` exactly, so the header pills will align horizontally with the hero card edges on desktop.
- No changes to LeftHeaderPill / RightHeaderPill internals needed.
