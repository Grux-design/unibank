import type { CmsSectionProps } from "@/components/organisms/PageBuilder";
import { BenefitLineDecor } from "@/components/atoms/BenefitLineDecor";
import { FeatureIconTile, resolveCmsAssetUrl } from "@/lib/benefitIcons";
import { Reveal } from "@/components/effects/Reveal";

export function BenefitListSection({ section }: CmsSectionProps) {
  const items = section.items ?? [];
  const sectionLabel = section.title ?? "Beneficios";

  if (!items.length) return null;

  return (
    <section
      className="w-full page-surface-white -mt-2 md:-mt-4 pt-0 pb-10 md:pb-14 lg:pb-16"
      aria-label={sectionLabel}
    >
      <div className="site-container">
        <Reveal y={22} duration={0.6}>
          <div className="relative isolate overflow-hidden rounded-[24px] md:rounded-[28px] bg-[#FBF4F0] px-5 py-8 md:px-8 md:py-10 lg:px-10 lg:py-11">
            <div
              className="pointer-events-none absolute z-0 w-[clamp(200px,30vw,380px)] h-[clamp(200px,30vw,380px)] left-[clamp(-220px,-18vw,-160px)] bottom-[clamp(-130px,-11vw,-80px)]"
              aria-hidden
            >
              <BenefitLineDecor variant="bottom-left" width={380} height={380} />
            </div>
            <div
              className="pointer-events-none absolute z-0 w-[clamp(180px,26vw,340px)] h-[clamp(180px,26vw,340px)] right-[clamp(-200px,-16vw,-140px)] top-[clamp(-170px,-14vw,-100px)]"
              aria-hidden
            >
              <BenefitLineDecor variant="top-right" width={340} height={340} />
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 md:gap-y-0">
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
