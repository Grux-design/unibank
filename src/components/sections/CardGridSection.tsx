import type { ResolvedSection } from "@/integrations/contentful/types";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";

interface Props {
  section: ResolvedSection;
}

export function CardGridSection({ section }: Props) {
  const items = section.items ?? [];

  return (
    <section className="w-full bg-muted">
      {section.headline && (
        <h2 className="text-center text-3xl md:text-4xl font-bold text-foreground pt-[80px] pb-0">
          {section.headline}
        </h2>
      )}

      <ScrollStack useWindowScroll>
        {items.map((item) => {
          const iconUrl = item.icon?.fields?.file?.url
            ? `https:${item.icon.fields.file.url}`
            : null;

          return (
            <ScrollStackItem key={item.sys.id}>
              <div className="bg-background h-full w-full rounded-[40px] p-8 md:p-10 flex flex-col md:flex-row">
                {/* Left: image with title overlay */}
                {iconUrl && (
                  <div className="md:w-2/5 relative rounded-2xl overflow-hidden flex-shrink-0 min-h-[200px]">
                    <img
                      src={iconUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {item.title && (
                      <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white drop-shadow-lg">
                        {item.title}
                      </h3>
                    )}
                  </div>
                )}
                {/* Right: description + CTA */}
                <div className="flex-1 flex flex-col justify-center md:pl-8 pt-6 md:pt-0">
                  {item.description && (
                    <p className="text-muted-foreground text-base mb-4">
                      {item.description}
                    </p>
                  )}
                  {item.link && (
                    <a
                      href={item.link}
                      className="text-primary font-medium hover:underline inline-flex items-center gap-1"
                    >
                      Más información <span>›</span>
                    </a>
                  )}
                </div>
              </div>
            </ScrollStackItem>
          );
        })}
      </ScrollStack>
    </section>
  );
}
