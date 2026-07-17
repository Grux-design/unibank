import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface MarqueeHoverTextProps {
  text: string;
  active: boolean;
  className?: string;
}

const REPEAT = 4;

export function MarqueeHoverText({ text, active, className }: MarqueeHoverTextProps) {
  const prefersReduced = useReducedMotion();
  const segment = `${text} / `;

  if (!active || prefersReduced) {
    return <span className={cn("whitespace-nowrap", className)}>{text}</span>;
  }

  const copies = Array.from({ length: REPEAT }, (_, index) => (
    <span key={index} className={cn("shrink-0 pr-[0.35em]", className)}>
      {segment}
    </span>
  ));

  return (
    <div className="w-full overflow-hidden" aria-hidden>
      <div className="flex w-max animate-marquee-hover motion-reduce:animate-none">
        <div className="flex shrink-0">{copies}</div>
        <div className="flex shrink-0">{copies}</div>
      </div>
    </div>
  );
}
