import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { OrangeBlobBackground } from "@/components/atoms/OrangeBlobBackground";
import { cn } from "@/lib/utils";

const BRAND_ORANGE = "#FF8136";

interface OrangePrefooterBannerProps {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
}

/**
 * Orange CTA prefooter — same layout as home Digital Banking.
 * Texture uses a scaled cover layer so splash curves stay visible without a CSS background patch.
 */
export function OrangePrefooterBanner({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: OrangePrefooterBannerProps) {
  return (
    <section id={id} className={cn("py-12 md:py-16 scroll-mt-24", className)}>
      <div className="site-container">
        <div
          className="relative overflow-hidden rounded-[24px] md:rounded-[32px] flex flex-col min-h-[min(420px,68vh)] md:min-h-[min(480px,68vh)]"
          style={{ backgroundColor: BRAND_ORANGE }}
        >
          <div
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
            aria-hidden
          >
            <div className="absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2">
              <OrangeBlobBackground objectPosition="center right" />
            </div>
          </div>

          <div className="relative z-[1] flex flex-col items-center justify-center flex-1 w-full text-center gap-6 md:gap-8 px-7 py-14 md:px-20 md:py-[72px] box-border mx-auto max-w-[820px]">
            {eyebrow && (
              <span className="inline-flex items-center w-fit px-3 py-1 rounded-full border border-white/50 bg-transparent text-[11px] md:text-xs font-semibold tracking-[0.08em] uppercase text-white">
                {eyebrow}
              </span>
            )}
            <h2 className="m-0 text-[clamp(1.75rem,1.2rem+2vw,3rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-white">
              {title}
            </h2>
            {description && (
              <div className="m-0 text-sm md:text-base text-white leading-relaxed max-w-[640px] [&_p]:m-0 [&_p]:text-white">
                {description}
              </div>
            )}
            {children && (
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-3 w-full md:w-auto mt-1">
                {children}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const ORANGE_PREFOOTER_BTN_CLASS =
  "inline-flex items-center justify-center gap-2 box-border no-underline h-[52px] min-h-[52px] px-[26px] rounded-xl w-full md:w-auto text-sm font-semibold leading-[21px] whitespace-nowrap transition-colors duration-200 bg-white text-[#1F1E1E] hover:bg-[#F7E8E0] active:bg-[#F0D4C4]";

interface OrangePrefooterButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  to?: string;
  href?: string;
}

export function OrangePrefooterButton({ to, href, children, icon, className }: OrangePrefooterButtonProps) {
  const classes = cn(ORANGE_PREFOOTER_BTN_CLASS, className);

  if (to) {
    return (
      <Link to={to} className={classes}>
        {icon}
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes}>
      {icon}
      {children}
    </a>
  );
}
