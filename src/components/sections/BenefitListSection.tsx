import type { ResolvedSection } from "@/integrations/contentful/types";

interface Props {
  section: ResolvedSection;
}

export function BenefitListSection({ section }: Props) {
  const items = section.items ?? [];

  return (
    <section className="w-full bg-muted py-[80px] px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 md:gap-16">
        {/* Left: Title */}
        <div className="md:w-2/5 flex items-start pt-4">
          {section.title && (
            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
              {section.title}
            </h2>
          )}
        </div>

        {/* Right: Benefit cards */}
        <div className="md:w-3/5 flex flex-col gap-4">
          {items.map((item) => {
            const iconUrl = item.icon?.fields?.file?.url
              ? `https:${item.icon.fields.file.url}`
              : null;

            return (
              <div
                key={item.sys.id}
                className="bg-background rounded-2xl p-5 flex items-center gap-5"
              >
                {iconUrl && (
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={iconUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-muted-foreground text-sm">
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
