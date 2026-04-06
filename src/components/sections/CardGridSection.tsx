import type { ResolvedSection } from "@/integrations/contentful/types";

interface Props {
  section: ResolvedSection;
}

export function CardGridSection({ section }: Props) {
  const items = section.items ?? [];

  return (
    <section className="w-full bg-muted py-[80px] px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {(section.title || section.headline) && (
          <h2 className="text-center text-3xl md:text-4xl font-bold text-foreground mb-8">
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
              className="sticky bg-background rounded-[20px]"
              style={{ top: `${80 + index * 56}px`, zIndex: index + 1 }}
            >
              {/* Thin top border except for first card */}
              {index > 0 && (
                <div className="mx-8 border-t border-border" />
              )}

              <div className="p-8 md:p-10">
                {/* Title — always visible */}
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  {item.title}
                </h3>

                {/* Expanded content: image + description */}
                <div className="flex flex-col md:flex-row gap-8 mt-8">
                  {imageUrl && (
                    <div className="md:w-[55%] flex-shrink-0 rounded-xl overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover aspect-[4/3]"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div className="flex-1 flex flex-col justify-center">
                    {item.description && (
                      <p className="text-foreground text-lg md:text-xl font-medium mb-4">
                        {item.description}
                      </p>
                    )}
                    {item.link && (
                      <a
                        href={item.link}
                        className="text-primary font-medium hover:underline inline-flex items-center gap-1 text-base"
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
