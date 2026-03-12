import { motion, AnimatePresence } from "motion/react";
import type { Slide } from "@/data/heroSlides";
import { THEME } from "@/data/heroSlides";
import { HeroEyebrow } from "@/components/atoms/HeroEyebrow";
import { HeroHeadline } from "@/components/atoms/HeroHeadline";

interface HeroSlideContentProps {
  slide: Slide;
  dir:   number;
}

const slideVariants = {
  enter:  (d: number) => ({ x: d > 0 ?  60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (d: number) => ({ x: d > 0 ? -60 :  60, opacity: 0 }),
};

export function HeroSlideContent({ slide, dir }: HeroSlideContentProps) {
  const t = THEME;

  return (
    <div
      style={{
        flex: "1 1 0",
        padding: "20px 48px 32px 48px",
        display: "flex", flexDirection: "column", justifyContent: "center",
        position: "relative", overflow: "hidden", minWidth: 0,
      }}
    >
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={slide.id}
          custom={dir}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          <HeroEyebrow text={slide.eyebrow} />
          <HeroHeadline parts={slide.headline} />

          <p style={{ fontSize: 15, lineHeight: 1.6, color: t.bodyColor, margin: 0, maxWidth: 380 }}>
            {slide.body}
          </p>

          {/* CTA buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 4 }}>
            <button
              style={{
                background: t.primaryBtnBg, color: t.primaryBtnColor,
                border: "none", borderRadius: 100, padding: "13px 26px",
                fontSize: 14, fontWeight: 600, cursor: "pointer",
                transition: "opacity 0.18s", fontFamily: "inherit",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = t.primaryBtnHoverOp; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
            >
              {slide.cta}
            </button>
            <button
              style={{
                background: t.secondaryBtnBg, color: t.secondaryBtnColor,
                border: `1.5px solid ${t.secondaryBtnBorder}`, borderRadius: 100,
                padding: "13px 26px", fontSize: 14, fontWeight: 600, cursor: "pointer",
                transition: "border-color 0.18s", fontFamily: "inherit",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = t.secondaryBtnHoverBorder; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = t.secondaryBtnBorder; }}
            >
              {slide.ctaAlt}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
