import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/effects/Reveal";
import { StaticPageSection } from "@/components/organisms/StaticPageLayout";
import { ProductSectionHeader } from "@/components/sections/ProductSectionHeader";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface SizeOption {
  label: string;
  widthIn: number;
  heightIn: number;
  depthIn: number;
  description: string;
}

interface PageSizeOptionsProps {
  bandIndex?: number;
  eyebrow: string;
  title: string;
  description?: string;
  options: SizeOption[];
  className?: string;
  paddingClassName?: string;
}

function formatDimensions({ widthIn, heightIn, depthIn }: SizeOption) {
  return `${widthIn}" × ${heightIn}" × ${depthIn}"`;
}

function BoxSilhouette({
  widthIn,
  heightIn,
  depthIn,
}: Pick<SizeOption, "widthIn" | "heightIn" | "depthIn">) {
  const maxFace = 108;
  const faceScale = maxFace / Math.max(widthIn, heightIn);
  const faceW = Math.round(widthIn * faceScale);
  const faceH = Math.round(heightIn * faceScale);
  const depthW = Math.round(Math.min((depthIn / Math.max(widthIn, heightIn)) * faceW * 0.38, 32));

  return (
    <div className="flex h-[min(168px,32vw)] items-end justify-center pb-1" aria-hidden>
      <div className="flex items-end transition-transform duration-500 ease-out group-hover:scale-[1.05] motion-reduce:transform-none">
        <div
          className="relative rounded-[5px] border-2 border-primary/30 bg-white transition-colors duration-300 group-hover:border-primary"
          style={{ width: faceW, height: faceH }}
        >
          <span className="absolute left-1/2 top-[42%] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/45 transition-colors duration-300 group-hover:bg-primary" />
          <span className="absolute left-1/2 top-[58%] h-3 w-0.5 -translate-x-1/2 rounded-full bg-primary/30 transition-colors duration-300 group-hover:bg-primary/70" />
        </div>
        <div
          className="rounded-r-[4px] border-2 border-l-0 border-primary/20 bg-[#FBF4F0] transition-colors duration-300 group-hover:border-primary/35"
          style={{ width: depthW, height: Math.round(faceH * 0.94), marginBottom: 1 }}
        />
      </div>
    </div>
  );
}

function SizeOptionCard({
  option,
  index,
}: {
  option: SizeOption;
  index: number;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <Reveal y={20} duration={0.55} staggerIndex={index}>
      <motion.article
        className={cn(
          "group page-hover-cell flex h-full flex-col rounded-[24px] border border-border bg-[#FAF8F6] p-6 md:p-8",
          "transition-[border-color,background-color] duration-300",
        )}
        whileHover={prefersReduced ? undefined : { y: -3 }}
        transition={{ duration: 0.35, ease: EASE.cinematic }}
      >
        <BoxSilhouette
          widthIn={option.widthIn}
          heightIn={option.heightIn}
          depthIn={option.depthIn}
        />

        <div className="mt-6 flex flex-1 flex-col gap-3 md:mt-7 md:gap-3.5">
          <p className="m-0 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
            {option.label}
          </p>
          <h3 className="type-item-title m-0 text-[clamp(22px,2.2vw,28px)] leading-none tracking-tight text-foreground">
            {formatDimensions(option)}
          </h3>
          <p className="m-0 text-sm md:text-[15px] leading-[1.65] text-muted-foreground">
            {option.description}
          </p>
        </div>
      </motion.article>
    </Reveal>
  );
}

/**
 * Two-column size picker — proportional box silhouettes for physical offerings (e.g. safety deposit boxes).
 */
export function PageSizeOptions({
  bandIndex = 0,
  eyebrow,
  title,
  description,
  options,
  className,
  paddingClassName = "pt-10 md:pt-12 lg:pt-14 pb-10 md:pb-12 lg:pb-14",
}: PageSizeOptionsProps) {
  if (!options.length) return null;

  return (
    <StaticPageSection bandIndex={bandIndex} paddingClassName={paddingClassName} className={className}>
      <div className="site-container">
        <Reveal y={20} duration={0.55}>
          <ProductSectionHeader
            tag={eyebrow}
            title={title}
            align="center"
            className="mb-3 md:mb-4"
          />
          {description && (
            <p className="mx-auto mb-10 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground md:mb-12 md:text-base">
              {description}
            </p>
          )}
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:gap-8">
          {options.map((option, index) => (
            <SizeOptionCard key={option.label} option={option} index={index} />
          ))}
        </div>
      </div>
    </StaticPageSection>
  );
}
