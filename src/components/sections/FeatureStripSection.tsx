import type { CmsSectionProps } from "@/components/organisms/PageBuilder";
import { PAGE_SURFACE_CLASS } from "@/constants/pageSurfaces";
import { FeatureIconTile, resolveCmsAssetUrl } from "@/lib/benefitIcons";
import { ProductSectionHeader } from "@/components/sections/ProductSectionHeader";
import { Reveal } from "@/components/effects/Reveal";
import { cn } from "@/lib/utils";

function getFeatureStripGridClass(count: number): string {
  switch (count) {
    case 0:
    case 1:
      return "grid-cols-1";
    case 2:
      return "grid-cols-1 sm:grid-cols-2";
    case 3:
      return "grid-cols-1 sm:grid-cols-3";
    default:
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
  }
}

function getFeatureStripDivideClass(count: number): string {
  if (count <= 1) return "";
  if (count >= 4) return "divide-y sm:divide-y lg:divide-y-0 divide-x divide-border";
  return "divide-y sm:divide-y-0 divide-x divide-border";
}

export function FeatureStripSection({ section, surface = "white" }: CmsSectionProps) {
  const { headline, items = [] } = section;
  const itemCount = items.length;

  return (
    <section className={`${PAGE_SURFACE_CLASS[surface]} py-12 md:py-20`}>
      <div className="site-container">
        <Reveal y={20} duration={0.55}>
          <ProductSectionHeader
            tag={headline ? undefined : "Características"}
            title={headline}
            align="center"
          />
        </Reveal>

        <Reveal y={16} duration={0.5} delay={0.05}>
          <div className="page-section-card rounded-[20px] md:rounded-[24px] overflow-hidden border border-border w-full">
            <div
              className={cn(
                "grid w-full",
                getFeatureStripGridClass(itemCount),
                getFeatureStripDivideClass(itemCount),
              )}
            >
              {items.map((item, index) => (
                <Reveal
                  key={item.sys.id}
                  y={14}
                  duration={0.45}
                  staggerIndex={index}
                  amount={0.08}
                  className="group page-hover-cell p-6 lg:p-9 flex flex-col gap-4 min-w-0 w-full"
                >
                  <FeatureIconTile
                    title={item.title}
                    description={item.description}
                    cmsIconUrl={resolveCmsAssetUrl(item.icon?.fields?.file?.url)}
                    size="md"
                    lift
                  />
                  <div className="flex flex-col gap-2">
                    <p className="feature-strip-item-title">{item.title}</p>
                    {item.description && (
                      <p className="feature-strip-item-body">{item.description}</p>
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
