import { motion } from "motion/react";
import { EASE } from "@/lib/motion";

interface IntroSplashProps {
  onExitComplete?: () => void;
}

/**
 * IntroSplash — first-load cinematic overlay.
 * Animates ~1.7s, then exits with a clip-path wipe.
 * Parent controls mount/unmount via AnimatePresence.
 */
export function IntroSplash({ onExitComplete: _ }: IntroSplashProps) {
  const PROMISE = "Tu banco. Tu confianza.";
  const words = PROMISE.split(" ");

  return (
    <motion.div
      role="status"
      aria-label="Cargando Unibank"
      initial={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
      animate={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
      exit={{
        clipPath: "inset(0 0 100% 0)",
        scale: 1.06,
        opacity: 0,
        transition: { duration: 0.85, ease: EASE.premium, opacity: { delay: 0.45, duration: 0.4 } },
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background:
          "radial-gradient(60% 60% at 50% 50%, rgba(255,129,54,0.18) 0%, rgba(10,10,15,1) 70%), #0A0A0F",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        willChange: "transform, opacity, clip-path",
      }}
    >
      {/* Film grain */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.06,
          mixBlendMode: "overlay",
          pointerEvents: "none",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />

      {/* Logo path-draw */}
      <motion.svg
        width="84"
        height="84"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: EASE.premium }}
        style={{
          filter: "drop-shadow(0 0 24px rgba(255,129,54,0.55))",
        }}
      >
        <motion.path
          d="M25.2006 13.5002C23.7649 13.5002 22.6008 14.6643 22.6008 16.1V23.8995C22.6008 25.4474 22.1825 26.8958 21.4584 28.145C20.5368 29.7292 19.1102 30.9892 17.4011 31.7007C16.4017 32.119 15.3046 32.3489 14.1513 32.3489C13.7748 32.3489 13.4 32.3235 13.0325 32.2747C14.3487 33.1093 15.8224 33.7176 17.3993 34.0399C18.2412 34.21 19.1102 34.2988 20.0009 34.2988C20.8917 34.2988 21.7589 34.21 22.5989 34.0399C28.5336 32.8341 33 27.5892 33 21.2996C33 16.9908 29.5077 13.5002 25.1988 13.5002"
          stroke="#FF8136"
          strokeWidth="1.2"
          fill="#FF8136"
          initial={{ pathLength: 0, fillOpacity: 0 }}
          animate={{ pathLength: 1, fillOpacity: 1 }}
          transition={{
            pathLength: { duration: 1.0, ease: EASE.cinematic },
            fillOpacity: { duration: 0.5, delay: 0.8, ease: EASE.premium },
          }}
        />
        <motion.path
          d="M19.3745 26.4835C18.1452 25.1076 17.3993 23.2917 17.3993 21.3002V8.30105C17.3993 7.12244 16.6172 6.1285 15.5418 5.80805C15.4711 5.78632 15.3969 5.77003 15.3227 5.75374C15.1543 5.71934 14.9805 5.70123 14.8013 5.70123C10.4924 5.70123 7 9.19361 7 13.5007V23.9C7 26.4038 8.29086 28.6108 10.2407 29.8872C11.3632 30.6222 12.7048 31.0513 14.1495 31.0513C15.3209 31.0513 16.4234 30.7689 17.3993 30.2692C18.6467 29.6319 19.6823 28.6398 20.3703 27.4249C20.01 27.1407 19.6768 26.8257 19.3745 26.4817"
          stroke="#FF8136"
          strokeWidth="1.2"
          fill="#FF8136"
          initial={{ pathLength: 0, fillOpacity: 0 }}
          animate={{ pathLength: 1, fillOpacity: 1 }}
          transition={{
            pathLength: { duration: 1.0, delay: 0.15, ease: EASE.cinematic },
            fillOpacity: { duration: 0.5, delay: 0.95, ease: EASE.premium },
          }}
        />
      </motion.svg>

      {/* Brand promise — per-word reveal */}
      <div
        style={{
          display: "flex",
          gap: "0.4em",
          flexWrap: "wrap",
          justifyContent: "center",
          fontFamily: '"Inter", -apple-system, sans-serif',
          fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)",
          fontWeight: 500,
          letterSpacing: "-0.01em",
          color: "rgba(255,255,255,0.92)",
        }}
      >
        {words.map((w, i) => (
          <motion.span
            key={i}
            initial={{ y: 24, opacity: 0, filter: "blur(8px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{
              duration: 0.7,
              delay: 0.7 + i * 0.12,
              ease: EASE.premium,
            }}
            style={{ display: "inline-block", willChange: "transform, filter, opacity" }}
          >
            {w}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
