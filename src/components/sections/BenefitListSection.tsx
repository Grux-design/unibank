import type { CmsSectionProps } from "@/components/organisms/PageBuilder";
import { BenefitSectionTextures } from "@/components/atoms/BenefitSectionTextures";
import { FeatureIconTile, resolveCmsAssetUrl } from "@/lib/benefitIcons";
import { Reveal } from "@/components/effects/Reveal";

export function BenefitListSection({ section }: CmsSectionProps) {
  const items = section.items ?? [];
  const sectionLabel = section.title ?? "Beneficios";

  if (!items.length) return null;

  return (
    <section
      className="page-surface-accent benefit-section-band w-full pt-10 pb-10 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14"
      aria-label={sectionLabel}
    >
      <BenefitSectionTextures />
      <div className="site-container relative z-[1]">
        <Reveal y={22} duration={0.6}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 md:gap-y-0">
            {items.map((item, index) => (
              <Reveal
                key={item.sys.id}
                y={14}
                duration={0.45}
                staggerIndex={index}
                amount={0.12}
                className="group page-hover-cell flex flex-col items-center text-center gap-3.5 p-5 md:p-6 lg:p-8 rounded-2xl"
              >
                <FeatureIconTile
                  title={item.title}
                  description={item.description}
                  cmsIconUrl={resolveCmsAssetUrl(item.icon?.fields?.file?.url)}
                  size="lg"
                  variant="accent"
                  lift
                />
                <div className="flex flex-col gap-2 max-w-[28ch]">
                  <h3 className="type-item-title m-0 text-foreground">{item.title}</h3>
                  {item.description && (
                    <p className="m-0 text-sm md:text-[15px] leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
