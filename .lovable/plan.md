## Goals
1. Play the splash screen on every Home page refresh (not just the first visit).
2. Increase splash duration from 1.8s to 3s.
3. Replace the slogan `"Tu banco. Tu confianza."` with `"¿Ganas de Crecer? Tienes a UniBank"`.

## Changes

### `src/pages/HomePage.tsx`
- Remove dependency on `useFirstVisit` for gating the splash. Always show splash on mount (skip only when `prefersReducedMotion`).
- Replace `shouldPlay` with `!prefersReduced` so it plays on every refresh.
- Bump the auto-dismiss timeout `1800` → `3000`.
- Drop the `markSeen()` call (no longer needed for per-refresh playback). `useFirstVisit` can stay imported for `EASE` only, or switch to a direct import.

### `src/components/effects/IntroSplash.tsx`
- Change `const PROMISE = "Tu banco. Tu confianza.";` → `const PROMISE = "¿Ganas de Crecer? Tienes a UniBank";`.
- If the splash has internal animation timings tuned to ~1.8s, leave them — the outer 3s window simply holds the final frame longer. (Will verify when implementing.)

## Notes
- `useFirstVisit` hook itself is left intact in `src/lib/motion.ts` in case other surfaces use it.
- No backend or routing changes.
