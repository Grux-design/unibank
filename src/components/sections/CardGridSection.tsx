import type { ResolvedSection } from "@/integrations/contentful/types";

interface Props {
  section: ResolvedSection;
}

export function CardGridSection({ section }: Props) {
  const items = section.items ?? [];

  return (
    <section className="w-full bg-muted py-12 md:py-20">
      <div className="site-container">
        {(section.title || section.headline) && (
          <h2 className="type-section-headline text-center mb-6 md:mb-8">
            {section.title || section.headline}
          </h2>
        )}
        {items.map((item, index) => {
          const imageUrl = (() => {
            const img = item.image ?? item.icon;
            if (!img?.fields?.file?.url) return null;
            const url = img.fields.file.url;
            return url.startsWith("//") ? `https:${url}` : url;
          })();

          return (
            <div
              key={item.sys.id}
              className="relative md:sticky bg-background rounded-[20px]"
              style={{ top: 80 + index * 56, zIndex: index + 1 }}
            >
              {index > 0 && (
                <div className="mx-4 md:mx-8 border-t border-border" />
              )}

              <div className="p-5 md:p-8 lg:p-10">
                <h3 className="type-card-title">
                  {item.title}
                </h3>

                <div className="flex flex-col md:flex-row gap-5 md:gap-8 mt-5 md:mt-8">
                  {imageUrl && (
                    <div className="w-full md:w-[424px] md:flex-shrink-0 rounded-xl overflow-hidden aspect-[2/1] md:h-[212px] md:aspect-auto">
                      <img
                        src={imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div className="flex-1 flex flex-col items-start justify-start min-w-0">
                    {item.description && (
                      <p className="text-foreground text-base md:text-lg lg:text-xl font-medium mb-3 md:mb-4">
                        {item.description}
                      </p>
                    )}
                    {item.link && (
                      <a
                        href={item.link}
                        className="text-primary font-medium hover:underline inline-flex items-center gap-1 text-sm md:text-base"
                      >
                        Más información <span>›</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
