import { motion, AnimatePresence } from "motion/react";
import type { Slide } from "@/data/heroSlides";
import { THEME, HERO_LAYOUT } from "@/data/heroSlides";
import { HeroEyebrow } from "@/components/atoms/HeroEyebrow";
import { HeroHeadline } from "@/components/atoms/HeroHeadline";
import { HeroCtaButton } from "@/components/atoms/HeroCtaButton";

interface HeroSlideContentProps {
  slide: Slide;
  dir:   number;
  isMobile?: boolean;
}

const slideVariants = {
  enter:  (d: number) => ({ x: d > 0 ?  60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (d: number) => ({ x: d > 0 ? -60 :  60, opacity: 0 }),
};

export function HeroSlideContent({ slide, dir, isMobile = false }: HeroSlideContentProps) {
  const t = THEME;
  const mobileCtaFullWidth = isMobile && slide.id === "hipoteca";

  return (
    <div
      style={{
        flex: isMobile ? 1 : "1 1 60%",
        minHeight: isMobile ? 0 : undefined,
        padding: isMobile ? HERO_LAYOUT.mobile.contentPadding : "20px 48px 32px 48px",
        display: "flex", flexDirection: "column", justifyContent: isMobile ? "center" : "center",
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
          style={{ display: "flex", flexDirection: "column", gap: isMobile ? HERO_LAYOUT.mobile.contentGap : 24 }}
        >
          <HeroEyebrow text={slide.eyebrow} />
          <HeroHeadline parts={slide.headline} isMobile={isMobile} />

          <p style={{ fontSize: 16, lineHeight: 1.65, color: t.bodyColor, margin: 0, maxWidth: 520 }}>
            {slide.body}
          </p>

          {/* CTA buttons */}
          <div style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            flexWrap: isMobile ? "nowrap" : "wrap",
            alignItems: isMobile ? (mobileCtaFullWidth ? "stretch" : "flex-start") : "center",
            gap: 10,
            marginTop: 4,
          }}>
            <HeroCtaButton
              href={slide.ctaHref || "#"}
              target={slide.ctaHref ? "_blank" : undefined}
              rel={slide.ctaHref ? "noopener noreferrer" : undefined}
              fullWidth={mobileCtaFullWidth}
            >
              {slide.cta}
            </HeroCtaButton>
            {slide.ctaAlt && (
              <HeroCtaButton
                href={slide.ctaAltHref || "#"}
                variant="secondary"
                fullWidth={mobileCtaFullWidth}
              >
                {slide.ctaAlt}
              </HeroCtaButton>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
