import type { CmsSectionProps } from "@/components/organisms/PageBuilder";
import { PAGE_SURFACE_CLASS } from "@/constants/pageSurfaces";
import { ProductSectionHeader } from "@/components/sections/ProductSectionHeader";
import { FeatureIconTile, resolveCmsAssetUrl } from "@/lib/benefitIcons";
import { Reveal } from "@/components/effects/Reveal";

export function CardGridSection({ section, surface = "white" }: CmsSectionProps) {
  const items = section.items ?? [];
  const sectionTitle = section.title || section.headline;
  const sectionCopy =
    typeof section.copy === "string"
      ? section.copy
      : section.subheadline && section.subheadline !== sectionTitle
        ? section.subheadline
        : undefined;

  return (
    <section className={`w-full ${PAGE_SURFACE_CLASS[surface]} py-12 md:py-20`}>
      <div className="site-container flex flex-col md:flex-row gap-8 md:gap-10 lg:gap-16 items-start">
        <Reveal y={20} duration={0.55} className="md:w-2/5 md:sticky md:top-20 lg:top-28 self-start">
          <ProductSectionHeader tag="Proceso" title={sectionTitle} align="left" className="mb-3 md:mb-4" />
          {sectionCopy && (
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{sectionCopy}</p>
          )}
        </Reveal>

        <ol className="md:w-3/5 min-w-0 w-full flex flex-col divide-y divide-[var(--surface-border)] list-none m-0 p-0">
          {items.map((item, index) => {
            const cmsIconUrl = resolveCmsAssetUrl(item.icon?.fields?.file?.url);
            const stepLabel = String(index + 1).padStart(2, "0");

            return (
              <li key={item.sys.id} className="py-8 md:py-10 page-hover-row">
                <Reveal y={16} duration={0.5} staggerIndex={index}>
                  <div className="group flex items-start gap-4 md:gap-6">
                  <FeatureIconTile
                    title={item.title}
                    description={item.description}
                    cmsIconUrl={cmsIconUrl}
                    size="lg"
                    variant="accent"
                    className="mt-0.5 shrink-0"
                    lift
                  />

                  <div className="min-w-0 flex-1 flex flex-col gap-2 md:gap-2.5 pt-0.5">
                    <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted-foreground/70 tabular-nums">
                      {stepLabel}
                    </span>
                    <h3 className="type-item-title text-[clamp(17px,1.8vw,22px)] leading-snug m-0">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-sm md:text-[15px] leading-[1.65] text-muted-foreground m-0 max-w-[44ch]">
                        {item.description}
                      </p>
                    )}
                  </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
