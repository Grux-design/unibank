import { motion } from "motion/react";
import { THEME, SLIDE_DURATION } from "@/data/heroSlides";

interface HeroProgressBarProps {
  /** Key to reset animation on slide change */
  animKey: string | number;
  width?: number | string;
  height?: number;
  trackColor?: string;
  fillColor?: string;
  borderRadius?: number;
}

export function HeroProgressBar({
  animKey,
  width = "100%",
  height = 3,
  trackColor = THEME.progressTrack,
  fillColor = THEME.progressFill,
  borderRadius = 100,
}: HeroProgressBarProps) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        background: trackColor,
        overflow: "hidden",
      }}
    >
      <motion.div
        key={animKey}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
        style={{
          height: "100%",
          background: fillColor,
          transformOrigin: "left center",
        }}
      />
    </div>
  );
}
