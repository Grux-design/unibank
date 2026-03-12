import { motion } from "motion/react";
import { THEME, SLIDE_DURATION } from "@/data/heroSlides";

interface HeroProgressBarProps {
  /** Key to reset animation on slide change */
  animKey: string | number;
  width?:  number | string;
}

export function HeroProgressBar({ animKey, width = "100%" }: HeroProgressBarProps) {
  return (
    <div
      style={{
        width,
        height:       3,
        borderRadius: 100,
        background:   THEME.progressTrack,
        overflow:     "hidden",
      }}
    >
      <motion.div
        key={animKey}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
        style={{
          height:          "100%",
          background:      THEME.progressFill,
          transformOrigin: "left center",
        }}
      />
    </div>
  );
}
