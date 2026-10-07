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
  /** All slides; used on stacked layouts to reserve the tallest slide's height */
  sizerSlides?: readonly Slide[];
}

const slideVariants = {
  enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
};

export function HeroSlideContent({ slide, dir, layoutTier = "full", sizerSlides = [] }: HeroSlideContentProps) {
  const t = THEME;
  const layout = getHeroLayout(layoutTier);
  const isStacked = layout.stackLayout;
  const equalColumns = "equalColumns" in layout && layout.equalColumns;
  const ctaFullWidth = layout.ctaFullWidth;

  const renderBody = (slide: Slide) => (
    <>
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
            {(() => {
              const primaryInternal = slide.ctaHref?.startsWith("/");
              return (
                <HeroCtaButton
                  {...(primaryInternal
                    ? { to: slide.ctaHref }
                    : {
                        href: slide.ctaHref || "#",
                        target: slide.ctaHref ? "_blank" : undefined,
                        rel: slide.ctaHref ? "noopener noreferrer" : undefined,
                      })}
                  fullWidth={ctaFullWidth}
                >
                  {slide.cta}
                </HeroCtaButton>
              );
            })()}
            {slide.ctaAlt && (
              <HeroCtaButton
                {...(slide.ctaAltHref?.startsWith("/")
                  ? { to: slide.ctaAltHref }
                  : { href: slide.ctaAltHref || "#" })}
                variant="secondary"
                fullWidth={ctaFullWidth}
              >
                {slide.ctaAlt}
              </HeroCtaButton>
            )}
          </div>
    </>
  );

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
        minHeight: isStacked ? "auto" : 0,
        padding: layout.contentPadding,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: isStacked ? undefined : "hidden",
        overflowX: isStacked ? "clip" : undefined,
        minWidth: 0,
      }}
    >
      <div style={{ display: "grid" }}>
        {/* Invisible copies of every slide reserve the tallest slide's height,
            so the stacked (mobile) card never jumps or clips between slides */}
        {isStacked &&
          sizerSlides.map((s) => (
            <div
              key={`sizer-${s.id}`}
              aria-hidden="true"
              style={{ gridArea: "1 / 1", visibility: "hidden", pointerEvents: "none", display: "flex", flexDirection: "column", gap: layout.contentGap }}
            >
              {renderBody(s)}
            </div>
          ))}
        <div style={{ gridArea: "1 / 1", minWidth: 0 }}>
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
              {renderBody(slide)}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
