import { useState, useEffect, useCallback, useRef } from "react";
import type { Lang } from "@/components/layout/SiteLayout";
import { slides, THEME, SLIDE_DURATION } from "@/data/heroSlides";
import { HeroSlideContent } from "@/components/molecules/HeroSlideContent";
import { HeroPhotoFrame }   from "@/components/molecules/HeroPhotoFrame";
import { HeroGlassCard }    from "@/components/molecules/HeroGlassCard";
import { HeroControls }     from "@/components/molecules/HeroControls";
import { useIsMobile } from "@/hooks/useIsMobile";

interface HeroCarouselProps { lang: Lang }

export function HeroCarousel({ lang: _lang }: HeroCarouselProps) {
  const isMobile = useIsMobile();
  const [current, setCurrent] = useState(0);
  const [dir,     setDir]     = useState(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advance = useCallback((next: number, d: number) => { setDir(d); setCurrent(next); }, []);

  useEffect(() => {
    timerRef.current = setTimeout(() => advance((current + 1) % slides.length, 1), SLIDE_DURATION);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, advance]);

  const goNext = () => advance((current + 1) % slides.length,                  1);
  const goPrev = () => advance((current - 1 + slides.length) % slides.length, -1);

  const slide     = slides[current];
  const nextSlide = slides[(current + 1) % slides.length];
  const t         = THEME;

  return (
    <section className="site-container-hero" style={{
      background: "#FFFFFF",
      paddingTop: isMobile ? 72 : 96,
      paddingBottom: isMobile ? 24 : 32,
      fontFamily: '"Inter", -apple-system, sans-serif',
    }}>
      <div style={{
        width: "100%",
        background: t.cardBg,
        borderRadius: isMobile ? 28 : 36,
        overflow: "hidden",
        position: "relative",
        minHeight: isMobile ? undefined : 620,
        paddingTop: isMobile ? 0 : 32,
        paddingRight: isMobile ? 0 : 40,
      }}>
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "stretch" : "stretch",
          gap: 0,
          minHeight: isMobile ? undefined : 560,
        }}>
          {isMobile && (
            <div style={{
              position: "relative",
              width: "100%",
              minHeight: 280,
              flexShrink: 0,
            }}>
              <HeroPhotoFrame slide={slide} isMobile />
            </div>
          )}

          <HeroSlideContent slide={slide} dir={dir} isMobile={isMobile} />

          {!isMobile && (
            <div style={{
              flex: "0 0 40%",
              width: "clamp(260px, 40%, 640px)",
              position: "relative",
              height: "100%",
              overflow: "visible",
            }}>
              <HeroPhotoFrame slide={slide} />
              <HeroGlassCard nextSlide={nextSlide} />
            </div>
          )}
        </div>

        <HeroControls
          current={current}
          total={slides.length}
          slide={slide}
          onPrev={goPrev}
          onNext={goNext}
          isMobile={isMobile}
        />
      </div>
    </section>
  );
}
