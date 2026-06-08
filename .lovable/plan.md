
# Fix: scroll stays locked after intro splash on first load

## Root cause

Two bugs in the intro flow:

1. **Scroll lock never released.** `useFirstVisit` in `src/lib/motion.ts` sets `document.body.style.overflow = "hidden"` inside a `useEffect` keyed on `shouldPlay`. But `shouldPlay` is computed once via `useState` initializer and never changes, so the cleanup only fires when `HomePage` unmounts (i.e. navigation away). The splash closes after 1.8s but the body remains `overflow: hidden` until a full reload.
2. **Side effect during render.** `HomePage` schedules the `setTimeout` that closes the splash directly in the render body. This works by accident but is fragile under StrictMode double-invocation and can also race with the cleanup.

## Fix

- Remove the body-overflow logic from `useFirstVisit`. The hook becomes pure state (read localStorage, expose `markSeen`).
- In `HomePage`, drive the scroll lock from a `useEffect` keyed on `splashOpen`: lock on open, restore the previous value on close (and on unmount as a safety net).
- Move the auto-dismiss `setTimeout` into a `useEffect` that runs once when `splashOpen` is initially true; clear it on cleanup.
- Also restore overflow inside the splash's `onAnimationComplete` / `AnimatePresence` `onExitComplete` as a belt-and-suspenders guarantee, so any early bail-out still unlocks the page.

## Files

- Edit `src/lib/motion.ts` — drop the overflow side effect from `useFirstVisit`.
- Edit `src/pages/HomePage.tsx` — proper `useEffect` for scroll lock and splash timer; pass `onExitComplete` from `AnimatePresence` to unlock as a fallback.

No visual or timing changes to the intro itself.
