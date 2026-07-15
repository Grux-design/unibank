import type { ResolvedSection } from "@/integrations/contentful/types";

interface Props {
  section: ResolvedSection;
}

export function BenefitListSection({ section }: Props) {
  const items = section.items ?? [];

  return (
    <section className="w-full bg-muted py-12 md:py-20">
      <div className="site-container flex flex-col md:flex-row gap-8 md:gap-10 lg:gap-16">
        {/* Left: Title */}
        <div className="md:w-2/5 flex items-start pt-0 md:pt-4">
          {section.title && (
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
              {section.title}
            </h2>
          )}
        </div>

        {/* Right: Benefit cards */}
        <div className="md:w-3/5 flex flex-col gap-3 md:gap-4">
          {items.map((item) => {
            const asset = item.image || item.icon;
            const rawUrl = asset?.fields?.file?.url;
            const iconUrl = rawUrl
              ? (rawUrl.startsWith("//") ? `https:${rawUrl}` : rawUrl)
              : null;

            return (
              <div
                key={item.sys.id}
                className="bg-background rounded-2xl flex flex-col sm:flex-row items-start gap-4 sm:gap-5 w-full p-5 md:px-6 md:py-6"
              >
                {iconUrl && (
                  <div className="rounded-xl overflow-hidden flex-shrink-0 w-full max-w-[140px] sm:w-[120px] md:w-[164px] aspect-[164/212] sm:aspect-auto sm:h-[180px] md:h-[212px]">
                    <img
                      src={iconUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="min-w-0">
                  <h3 className="font-bold text-foreground mb-1 text-xl md:text-2xl">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-muted-foreground text-base md:text-lg">
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
