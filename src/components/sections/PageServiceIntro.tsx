import type { ReactNode } from "react";
import { Reveal } from "@/components/effects/Reveal";
import { StaticPageSection } from "@/components/organisms/StaticPageLayout";
import { FeatureIconTile } from "@/lib/benefitIcons";
import { cn } from "@/lib/utils";

export interface ServiceIntroPillar {
  title: string;
  description: string;
}

interface PageServiceIntroProps {
  bandIndex?: number;
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  imageSrc: string;
  imageAlt: string;
  pillars: ServiceIntroPillar[];
  className?: string;
  paddingClassName?: string;
}

/**
 * Editorial service explainer — headline block + portrait media + pillar stack.
 * Distinct from CMS FeatureBanner (50/50 image copy).
 */
export function PageServiceIntro({
  bandIndex = 0,
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  pillars,
  className,
  paddingClassName = "pt-12 md:pt-16 lg:pt-20 pb-10 md:pb-12 lg:pb-14",
}: PageServiceIntroProps) {
  return (
    <StaticPageSection
      bandIndex={bandIndex}
      surface="white"
      paddingClassName={paddingClassName}
      className={className}
    >
      <div className="site-container">
        <Reveal y={20} duration={0.55}>
          <div className="flex max-w-[680px] flex-col gap-3 md:gap-4">
            <span className="type-section-tag">{eyebrow}</span>
            <h2 className="type-content-section-headline m-0">{title}</h2>
            <div className="text-muted-foreground text-base md:text-[17px] leading-[1.65] [&_p]:m-0">
              {description}
            </div>
          </div>
        </Reveal>

        <div className="mt-12 md:mt-14 lg:mt-16 grid grid-cols-1 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] gap-10 md:gap-12 lg:gap-14 xl:gap-20 items-start">
          <Reveal y={24} duration={0.6} className="w-full lg:sticky lg:top-24 lg:self-start">
            <div className="group relative mx-auto aspect-[4/3] md:aspect-[5/4] max-w-[520px] overflow-hidden rounded-[24px] md:rounded-[28px] bg-muted lg:mx-0 lg:max-w-none">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
          </Reveal>

          <ul className="m-0 flex min-w-0 w-full list-none flex-col p-0 lg:pt-2">
            {pillars.map((pillar, index) => (
              <li
                key={pillar.title}
                className={cn(index > 0 && "border-t border-border/70")}
              >
                <Reveal y={16} duration={0.5} staggerIndex={index}>
                  <div className="group page-hover-row -mx-3 flex items-start gap-4 rounded-2xl px-3 py-7 md:gap-5 md:py-8 md:-mx-4 md:px-4">
                    <FeatureIconTile
                      title={pillar.title}
                      description={pillar.description}
                      size="md"
                      variant="accent"
                      lift
                      className="mt-0.5 shrink-0"
                    />
                    <div className="flex min-w-0 flex-1 flex-col gap-2 pt-0.5 md:gap-2.5">
                      <h3 className="type-item-title m-0 text-[clamp(17px,1.6vw,20px)] leading-snug text-foreground">
                        {pillar.title}
                      </h3>
                      <p className="m-0 max-w-[42ch] text-sm md:text-[15px] leading-[1.65] text-muted-foreground">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </StaticPageSection>
  );
}
