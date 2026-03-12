import { motion, AnimatePresence } from "motion/react";
import type { Slide } from "@/data/heroSlides";
import { THEME } from "@/data/heroSlides";

interface HeroPhotoFrameProps {
  slide: Slide;
}

export function HeroPhotoFrame({ slide }: HeroPhotoFrameProps) {
  const t = THEME;

  return (
    <div style={{ flex: "0 0 auto", width: "clamp(260px, 38%, 440px)", position: "relative", height: "100%" }}>
      <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 508, overflow: "hidden" }}>

        {/* Accent circle */}
        <div style={{
          position: "absolute", bottom: "5%", right: "-8%",
          width: "38%", aspectRatio: "1", borderRadius: "50%",
          background: t.blobAccent, pointerEvents: "none", zIndex: 0,
        }} />

        {/* Main blob */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          borderRadius: 48, background: t.blobFill,
          pointerEvents: "none", zIndex: 1,
        }} />

        {/* Photo */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id + "-img"}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            style={{
              position: "absolute", bottom: 0,
              left: "11%", right: "11%",
              height: 480, borderRadius: 28,
              overflow: "hidden", zIndex: 2,
            }}
          >
            <img
              src={slide.image}
              alt={slide.cardTitle}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 15%" }}
              loading="eager"
              decoding="async"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
