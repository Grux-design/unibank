import { useState, useEffect, useCallback, useRef } from "react";
import type { Lang } from "@/components/layout/SiteLayout";
import { slides, THEME, SLIDE_DURATION } from "@/data/heroSlides";
import { HeroSlideContent } from "@/components/molecules/HeroSlideContent";
import { HeroPhotoFrame }   from "@/components/molecules/HeroPhotoFrame";
import { HeroGlassCard }    from "@/components/molecules/HeroGlassCard";
import { HeroControls }     from "@/components/molecules/HeroControls";

interface HeroCarouselProps { lang: Lang }

export function HeroCarousel({ lang: _lang }: HeroCarouselProps) {
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
    <section style={{
      background: "#FFFFFF",
      paddingTop: 80, paddingBottom: 32,
      paddingLeft: 24, paddingRight: 24,
      fontFamily: '"Inter", -apple-system, sans-serif',
    }}>
      <div style={{
        background: t.cardBg, borderRadius: 28, overflow: "hidden",
        position: "relative", maxWidth: "98vw", margin: "0 auto",
        minHeight: 540, paddingTop: 32, paddingRight: 48,
      }}>
        {/* Decorative concentric circles */}
        {t.hasPattern && (
          <svg aria-hidden="true" style={{ position: "absolute", top: "50%", right: "-5%", transform: "translateY(-50%)", width: 500, height: 500, opacity: 1, pointerEvents: "none" }}>
            {[200, 160, 120, 80, 40].map((r, i) => (
              <circle key={i} cx="250" cy="250" r={r} fill="none" stroke="rgba(255,129,54,0.10)" strokeWidth="1" />
            ))}
          </svg>
        )}

        {/* Two-column row */}
        <div style={{ display: "flex", flexDirection: "row", alignItems: "stretch", gap: 0, minHeight: 508 }}>
          <HeroSlideContent slide={slide} dir={dir} />

          {/* Right column: photo frame + glass card overlay */}
          <div style={{
            flex: "0 0 auto",
            width: "clamp(260px, 38%, 440px)",
            position: "relative",
            height: "100%",
          }}>
            <HeroPhotoFrame slide={slide} />
          </div>
        </div>

        <HeroControls
          current={current}
          total={slides.length}
          slide={slide}
          onPrev={goPrev}
          onNext={goNext}
        />
      </div>
    </section>
  );
}
