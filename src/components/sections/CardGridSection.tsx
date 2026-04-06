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
        <h2 className="text-center text-3xl md:text-4xl font-bold text-foreground pt-12 md:pt-20 pb-0">
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
              <div className="bg-background h-full w-full rounded-[40px] p-8 md:p-10 flex flex-col">
                {item.title && (
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    {item.title}
                  </h3>
                )}
                <div className="flex flex-col md:flex-row gap-6 flex-1">
                  {iconUrl && (
                    <div className="md:w-2/5 rounded-2xl overflow-hidden flex-shrink-0">
                      <img
                        src={iconUrl}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-2xl"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="flex flex-col justify-center">
                    {item.description && (
                      <p className="text-muted-foreground text-base mb-4">
                        {item.description}
                      </p>
                    )}
                    <a
                      href="#"
                      className="text-primary font-medium hover:underline inline-flex items-center gap-1"
                    >
                      Más información <span>›</span>
                    </a>
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          );
        })}
      </ScrollStack>
    </section>
  );
}
