import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Slide } from "@/data/heroSlides";
import { THEME } from "@/data/heroSlides";
import textureAsset from "@/assets/texture-1.svg.asset.json";

interface HeroPhotoFrameProps {
  slide: Slide;
}

export function HeroPhotoFrame({ slide }: HeroPhotoFrameProps) {
  const t = THEME;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { setLoaded(false); }, [slide.image]);

  return (
    <div style={{
      position: "relative", width: "100%", height: "100%", minHeight: 508, overflow: "visible",
      backgroundImage: `url(${textureAsset.url})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "contain",
    }}>

      {/* Accent circle */}
      <div style={{
        position: "absolute", bottom: "5%", right: "-8%",
        width: "38%", aspectRatio: "1", borderRadius: "50%",
        background: t.blobAccent, pointerEvents: "none", zIndex: 0,
      }} />

      {/* Main blob */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        borderRadius: 48, background: "transparent",
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
            background: t.blobAccent,
          }}
        >
          <img
            src={slide.image}
            alt={slide.cardTitle}
            onLoad={() => setLoaded(true)}
            style={{
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center 15%",
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
