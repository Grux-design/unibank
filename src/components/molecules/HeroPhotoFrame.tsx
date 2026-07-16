import { motion, AnimatePresence } from "motion/react";
import type { Slide } from "@/data/heroSlides";
import { getHeroLayout, type HeroLayoutTier } from "@/data/heroSlides";

interface HeroPhotoFrameProps {
  slide: Slide;
  layoutTier?: HeroLayoutTier;
}

export function HeroPhotoFrame({ slide, layoutTier = "full" }: HeroPhotoFrameProps) {
  const layout = getHeroLayout(layoutTier);
  const isStacked = layout.stackLayout;
  const equalColumns = "equalColumns" in layout && layout.equalColumns;
  const isCompact = layoutTier === "compact";

  const imageScale = isStacked ? "118%" : isCompact ? "112%" : "108%";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: isStacked ? 0 : layout.imageMinHeight,
        overflow: "hidden",
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
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: isStacked ? "center" : "flex-start",
          }}
        >
          <img
            src={slide.image}
            alt={slide.cardTitle}
            style={{
              width: imageScale,
              height: imageScale,
              objectFit: "contain",
              objectPosition: isStacked ? "center center" : "left center",
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
