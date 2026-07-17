import { motion, useReducedMotion } from "motion/react";
import { ReactNode } from "react";
import { EASE } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  y?: number;
  delay?: number;
  duration?: number;
  amount?: number;
  staggerIndex?: number;
  className?: string;
}

const STAGGER_STEP = 0.07;

/**
 * Reveal — fades + lifts children into view once.
 * Respects prefers-reduced-motion.
 */
export function Reveal({
  children,
  y = 28,
  delay = 0,
  duration = 0.7,
  amount = 0.15,
  staggerIndex = 0,
  className,
}: RevealProps) {
  const prefersReduced = useReducedMotion();
  const totalDelay = delay + staggerIndex * STAGGER_STEP;

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration,
        delay: totalDelay,
        ease: EASE.cinematic,
      }}
    >
      {children}
    </motion.div>
  );
}
