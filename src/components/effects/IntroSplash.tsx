import { useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { IsotipoSplashMark } from "@/components/effects/IsotipoSplashMark";
import { SPLASH_TEXTURE_URL, dismissSplashBoot } from "@/lib/splashBoot";
import { EASE } from "@/lib/motion";

const BRAND_ORANGE = "#FF8136";

interface IntroSplashProps {
  onExitComplete?: () => void;
}

/**
 * IntroSplash — first-load overlay with official UniBank texture + animated isotipo.
 * Portaled to document.body so it covers the full layout before paint.
 */
export function IntroSplash({ onExitComplete: _ }: IntroSplashProps) {
  useLayoutEffect(() => {
    dismissSplashBoot();
  }, []);

  return createPortal(
    <motion.div
      role="status"
      aria-label="Cargando Unibank"
      className="intro-splash"
      initial={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
      animate={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
      exit={{
        clipPath: "inset(0 0 100% 0)",
        scale: 1.02,
        opacity: 0,
        transition: {
          duration: 0.85,
          ease: EASE.premium,
          opacity: { delay: 0.45, duration: 0.4 },
        },
      }}
      style={{
        backgroundColor: BRAND_ORANGE,
        backgroundImage: `url(${SPLASH_TEXTURE_URL})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        willChange: "transform, opacity, clip-path",
      }}
    >
      <div className="intro-splash__brand">
        <IsotipoSplashMark />

        <motion.span
          className="intro-splash__wordmark"
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{
            duration: 0.65,
            delay: 0.92,
            ease: EASE.premium,
          }}
          style={{ willChange: "filter, opacity" }}
        >
          UniBank
        </motion.span>
      </div>
    </motion.div>,
    document.body,
  );
}
