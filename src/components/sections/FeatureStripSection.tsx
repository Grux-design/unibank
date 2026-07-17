import type { CmsSectionProps } from "@/components/organisms/PageBuilder";
import { PAGE_SURFACE_CLASS } from "@/constants/pageSurfaces";
import { FeatureIconTile, resolveCmsAssetUrl } from "@/lib/benefitIcons";
import { ProductSectionHeader } from "@/components/sections/ProductSectionHeader";
import { Reveal } from "@/components/effects/Reveal";

export function FeatureStripSection({ section, surface = "white" }: CmsSectionProps) {
  const { headline, items = [] } = section;

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
      </div>

      {/* Mobile: carrusel full-bleed con gutter al inicio y al final del scroll */}
      <Reveal y={16} duration={0.5} delay={0.05} className="md:hidden">
        <div
          className="overflow-x-auto snap-x snap-mandatory pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollPaddingInline: "var(--site-gutter)" }}
        >
          <div
            className="flex w-max gap-4"
            style={{
              paddingInlineStart: "var(--site-gutter)",
              paddingInlineEnd: "var(--site-gutter)",
            }}
          >
            {items.map((item, index) => (
              <Reveal
                key={item.sys.id}
                y={12}
                duration={0.45}
                staggerIndex={index}
                amount={0.1}
                className="snap-start shrink-0"
              >
                <div className="w-[min(calc(100vw-2*var(--site-gutter)-1rem),320px)] page-section-card page-touch-card rounded-[20px] p-6 flex flex-col gap-4">
                  <FeatureIconTile
                    title={item.title}
                    description={item.description}
                    cmsIconUrl={resolveCmsAssetUrl(item.icon?.fields?.file?.url)}
                    size="sm"
                  />
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

      <div className="site-container hidden md:block">
        <Reveal y={20} duration={0.55} delay={0.05}>
          <div className="page-section-card rounded-[24px] overflow-hidden border border-border">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x divide-border">
              {items.map((item, index) => (
                <Reveal
                  key={item.sys.id}
                  y={14}
                  duration={0.45}
                  staggerIndex={index}
                  amount={0.08}
                  className="group page-hover-cell p-6 lg:p-9 flex flex-col gap-4"
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
