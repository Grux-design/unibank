import { motion, useReducedMotion } from "motion/react";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  y?: number;
  delay?: number;
  duration?: number;
  amount?: number;
  className?: string;
}

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
  className,
}: RevealProps) {
  const prefersReduced = useReducedMotion();

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
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
