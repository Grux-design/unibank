import { motion, AnimatePresence } from "motion/react";
import type { Slide } from "@/data/heroSlides";

interface HeroPhotoFrameProps {
  slide: Slide;
}

export function HeroPhotoFrame({ slide }: HeroPhotoFrameProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id + "-img"}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
          style={{
            width: "100%",
            height: "100%",
            minHeight: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={slide.image}
            alt={slide.cardTitle}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center center",
              display: "block",
            }}
            loading="eager"
            decoding="async"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
