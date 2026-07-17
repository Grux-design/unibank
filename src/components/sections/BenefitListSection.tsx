import type { CmsSectionProps } from "@/components/organisms/PageBuilder";
import { PAGE_SURFACE_CLASS } from "@/constants/pageSurfaces";
import { BenefitIconTile } from "@/lib/benefitIcons";

export function BenefitListSection({ section, surface = "white" }: CmsSectionProps) {
  const items = section.items ?? [];

  return (
    <section className={`w-full ${PAGE_SURFACE_CLASS[surface]} py-12 md:py-20`}>
      <div className="site-container flex flex-col md:flex-row gap-8 md:gap-10 lg:gap-16">
        <div className="md:w-2/5 flex items-start pt-0 md:pt-4">
          {section.title && (
            <h2 className="type-content-section-headline leading-tight">
              {section.title}
            </h2>
          )}
        </div>

        <div className="md:w-3/5 flex flex-col gap-3 md:gap-4">
          {items.map((item) => (
            <div
              key={item.sys.id}
              className="page-section-card rounded-2xl flex flex-row items-start gap-4 sm:gap-5 w-full p-5 md:px-6 md:py-6"
            >
              <BenefitIconTile title={item.title} />
              <div className="min-w-0">
                <h3 className="type-item-title mb-1">{item.title}</h3>
                {item.description && (
                  <p className="text-muted-foreground text-base md:text-lg">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
