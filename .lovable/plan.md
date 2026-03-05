
The fix is simple. The main bar `<div>` currently uses `h-16` with `items-center`, which pushes the two pill groups to the vertical center of the 64px header bar — but there's no top padding/margin separating the bar itself from the top of the viewport.

The solution: add `pt-4` (16px) to the `<header>` element and reduce the inner bar height so the overall layout stays balanced. Specifically:

- Change `<header className="relative sticky top-0 z-50 bg-transparent">` → add `pt-4` to it
- The inner `div` with `h-16` can stay as-is or drop `h-16` since the padding will create the offset naturally

This gives exactly 16px of breathing room between the viewport top and the two white pill containers, matching the screenshot provided.

**Single file change:** `src/components/organisms/Header.tsx` line 52 — add `pt-4` to the `<header>` className.
