import { LayoutGrid } from "@/lib/icons";
import type { CmsSectionProps } from "@/components/organisms/PageBuilder";
import { PAGE_SURFACE_CLASS } from "@/constants/pageSurfaces";

export function FeatureStripSection({ section, surface = "white" }: CmsSectionProps) {
  const { headline, items = [] } = section;

  return (
    <section
      className={`${PAGE_SURFACE_CLASS[surface]} py-12 md:py-20`}
    >
      <div className="site-container">
        {headline && (
          <h2 className="type-content-section-headline text-center my-0 mb-6 md:mb-8">
            {headline}
          </h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {items.map((item) => {
            const iconSrc = item.icon?.fields?.file?.url;
            return (
              <div
                key={item.sys.id}
                className="page-section-card flex flex-col gap-4 p-5 sm:p-7 md:p-8 rounded-[20px] md:rounded-[28px]"
              >
                <div style={{ flexShrink: 0 }}>
                  {iconSrc ? (
                    <img
                      src={iconSrc}
                      alt={item.icon?.fields?.title ?? item.title}
                      style={{ width: 40, height: 40, objectFit: "contain" }}
                    />
                  ) : (
                    <LayoutGrid
                      size={40}
                      style={{ color: "hsl(var(--primary))" }}
                    />
                  )}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <p className="type-item-title">{item.title}</p>
                  {item.description && (
                    <p className="m-0 text-[15px] leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
