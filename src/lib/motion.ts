import { useEffect, useState } from "react";

export const EASE = {
  premium: [0.16, 1, 0.3, 1] as [number, number, number, number],
  cinematic: [0.22, 1, 0.36, 1] as [number, number, number, number],
  softInOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
};

const STORAGE_KEY = "unibank_has_seen_intro";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * useFirstVisit — returns whether the intro should play on this load.
 * Decision is made synchronously on first render (pre-paint) to avoid flash.
 */
export function useFirstVisit(): {
  shouldPlay: boolean;
  markSeen: () => void;
} {
  const [shouldPlay] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    if (prefersReducedMotion()) return false;
    try {
      return !window.localStorage.getItem(STORAGE_KEY);
    } catch {
      return false;
    }
  });

  const markSeen = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    if (!shouldPlay) return;
    // Lock scroll while intro is on screen
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [shouldPlay]);

  return { shouldPlay, markSeen };
}
