import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Slide } from "@/data/heroSlides";

interface HeroPhotoFrameProps {
  slide: Slide;
}

export function HeroPhotoFrame({ slide }: HeroPhotoFrameProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { setLoaded(false); }, [slide.image]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 508, overflow: "visible" }}>
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
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <img
            src={slide.image}
            alt={slide.cardTitle}
            onLoad={() => setLoaded(true)}
            style={{
              width: "110%",
              height: "115%",
              objectFit: "contain",
              objectPosition: "bottom center",
              opacity: loaded ? 1 : 0,
              transition: "opacity 600ms ease",
            }}
            loading="lazy"
            decoding="async"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
