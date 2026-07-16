import { useState, useEffect, useCallback, useRef } from "react";
import type { Lang } from "@/components/layout/SiteLayout";
import { slides, THEME, SLIDE_DURATION, getHeroLayout, HERO_LAYOUT } from "@/data/heroSlides";
import { HeroSlideContent } from "@/components/molecules/HeroSlideContent";
import { HeroPhotoFrame } from "@/components/molecules/HeroPhotoFrame";
import { HeroGlassCard } from "@/components/molecules/HeroGlassCard";
import { HeroControls } from "@/components/molecules/HeroControls";
import { useBreakpoint } from "@/hooks/useBreakpoint";

interface HeroCarouselProps {
  lang: Lang;
}

export function HeroCarousel({ lang: _lang }: HeroCarouselProps) {
  const layoutTier = useBreakpoint();
  const layout = getHeroLayout(layoutTier);
  const isStacked = layout.stackLayout;
  const equalColumns = "equalColumns" in layout && layout.equalColumns;

  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advance = useCallback((next: number, d: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setDir(d);
    setCurrent(next);
  }, []);

  useEffect(() => {
    timerRef.current = setTimeout(() => advance((current + 1) % slides.length, 1), SLIDE_DURATION);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, advance]);

  const goNext = () => advance((current + 1) % slides.length, 1);
  const goPrev = () => advance((current - 1 + slides.length) % slides.length, -1);

  const slide = slides[current];
  const nextSlide = slides[(current + 1) % slides.length];
  const t = THEME;

  return (
    <section
      className="site-container-hero"
      style={{
        background: "#FFFFFF",
        paddingTop: layout.sectionPaddingTop,
        paddingBottom: layout.sectionPaddingBottom,
        fontFamily: '"Inter", -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          width: "100%",
          background: t.cardBg,
          borderRadius: layout.cardBorderRadius,
          overflow: "hidden",
          position: "relative",
          height: layoutTier === "mobile" ? HERO_LAYOUT.mobile.cardHeight : layoutTier === "full" && "cardHeight" in layout && layout.cardHeight ? layout.cardHeight : undefined,
          minHeight: layoutTier === "mobile" ? HERO_LAYOUT.mobile.cardHeight : layout.cardMinHeight,
          display: isStacked || layoutTier === "full" ? "flex" : undefined,
          flexDirection: isStacked || layoutTier === "full" ? "column" : undefined,
          paddingTop: isStacked ? 0 : layoutTier === "full" ? 32 : 24,
          paddingInline: isStacked ? 0 : layoutTier === "compact" ? 28 : undefined,
          paddingRight: isStacked ? 0 : layoutTier === "full" ? 40 : undefined,
        }}
      >
        <div
          style={{
            display: layoutTier === "compact" ? "grid" : "flex",
            gridTemplateColumns: layoutTier === "compact" ? "1fr 1fr" : undefined,
            flexDirection: isStacked ? "column" : "row",
            alignItems: "stretch",
            flex: isStacked || layoutTier === "full" ? 1 : undefined,
            minHeight: isStacked || layoutTier === "full" ? 0 : layout.innerMinHeight,
            overflow: layoutTier === "full" ? "hidden" : undefined,
            gap: !isStacked ? layout.columnGap : 0,
          }}
        >
          {isStacked && (
            <div
              style={{
                position: "relative",
                width: "100%",
                flex: `0 0 ${HERO_LAYOUT.mobile.imageFlexBasis}`,
                minHeight: 0,
                overflow: "hidden",
                padding: `${HERO_LAYOUT.mobile.imagePaddingTop}px ${HERO_LAYOUT.mobile.imagePadding}px ${HERO_LAYOUT.mobile.imagePadding}px`,
                boxSizing: "border-box",
              }}
            >
              <HeroPhotoFrame slide={slide} layoutTier={layoutTier} />
            </div>
          )}

          <HeroSlideContent slide={slide} dir={dir} layoutTier={layoutTier} />

          {!isStacked && (
            <div
              style={{
                flex: equalColumns ? "1 1 0" : `0 0 ${"imageColumnWidth" in layout ? layout.imageColumnWidth : "40%"}`,
                width: equalColumns ? undefined : "imageColumnWidth" in layout ? layout.imageColumnWidth : undefined,
                position: "relative",
                height: "100%",
                minHeight: layout.imageMinHeight,
                overflow: "hidden",
                minWidth: 0,
                alignSelf: "stretch",
              }}
            >
              <HeroPhotoFrame slide={slide} layoutTier={layoutTier} />
            </div>
          )}
        </div>

        {layout.showGlassCard && (
          <HeroGlassCard nextSlide={nextSlide} layoutTier={layoutTier} />
        )}

        <HeroControls
          current={current}
          total={slides.length}
          slide={slide}
          onPrev={goPrev}
          onNext={goNext}
          layoutTier={layoutTier}
        />
      </div>
    </section>
  );
}
