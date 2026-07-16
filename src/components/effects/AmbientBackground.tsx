import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/**
 * AmbientBackground — fixed atmospheric layer behind the entire page.
 * Two slow-drifting brand blobs + film grain.
 * GPU-accelerated, pointer-events: none, respects prefers-reduced-motion.
 */
export function AmbientBackground() {
  const { scrollYProgress } = useScroll();
  const prefersReduced = useReducedMotion();

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 240]);
  const x1 = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -90]);

  if (prefersReduced) return null;

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        overflow: "hidden",
        background: "transparent",
      }}
    >
      {/* Orange blob */}
      <motion.div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-12%",
          width: 720,
          height: 720,
          borderRadius: "50%",
          background: "rgba(255,129,54,0.18)",
          filter: "blur(20px)",
          willChange: "transform",
          x: x1,
          y: y1,
        }}
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Purple blob */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "-15%",
          right: "-10%",
          width: 820,
          height: 820,
          borderRadius: "50%",
          background: "rgba(128,31,255,0.14)",
          filter: "blur(20px)",
          willChange: "transform",
          x: x2,
          y: y2,
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Film grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.04,
          mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}
