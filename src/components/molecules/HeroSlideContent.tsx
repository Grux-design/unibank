import { motion, AnimatePresence } from "motion/react";
import type { Slide } from "@/data/heroSlides";
import { THEME, getHeroLayout, type HeroLayoutTier } from "@/data/heroSlides";
import { HeroEyebrow } from "@/components/atoms/HeroEyebrow";
import { HeroHeadline } from "@/components/atoms/HeroHeadline";
import { HeroCtaButton } from "@/components/atoms/HeroCtaButton";

interface HeroSlideContentProps {
  slide: Slide;
  dir: number;
  layoutTier?: HeroLayoutTier;
}

const slideVariants = {
  enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
};

export function HeroSlideContent({ slide, dir, layoutTier = "full" }: HeroSlideContentProps) {
  const t = THEME;
  const layout = getHeroLayout(layoutTier);
  const isStacked = layout.stackLayout;
  const equalColumns = "equalColumns" in layout && layout.equalColumns;
  const ctaFullWidth = layout.ctaFullWidth && (layoutTier !== "mobile" || slide.id === "hipoteca");

  return (
    <div
      style={{
        flex: isStacked
          ? 1
          : equalColumns
            ? "1 1 0"
            : "contentFlex" in layout
              ? layout.contentFlex
              : "1 1 60%",
        minHeight: isStacked ? 0 : undefined,
        padding: layout.contentPadding,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        minWidth: 0,
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
          style={{ display: "flex", flexDirection: "column", gap: layout.contentGap }}
        >
          <HeroEyebrow text={slide.eyebrow} />
          <HeroHeadline parts={slide.headline} layoutTier={layoutTier} />

          <p
            style={{
              fontSize: isStacked ? "clamp(14px, 3.8vw, 16px)" : "clamp(15px, 1.5vw, 16px)",
              lineHeight: 1.65,
              color: t.bodyColor,
              margin: 0,
              maxWidth: 520,
              whiteSpace: "normal",
            }}
          >
            {slide.body}
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: ctaFullWidth ? "column" : "row",
              flexWrap: ctaFullWidth ? "nowrap" : "wrap",
              alignItems: ctaFullWidth ? "stretch" : "flex-start",
              gap: 10,
              marginTop: 4,
              width: ctaFullWidth ? "100%" : undefined,
            }}
          >
            <HeroCtaButton
              href={slide.ctaHref || "#"}
              target={slide.ctaHref ? "_blank" : undefined}
              rel={slide.ctaHref ? "noopener noreferrer" : undefined}
              fullWidth={ctaFullWidth}
            >
              {slide.cta}
            </HeroCtaButton>
            {slide.ctaAlt && (
              <HeroCtaButton
                href={slide.ctaAltHref || "#"}
                variant="secondary"
                fullWidth={ctaFullWidth}
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
