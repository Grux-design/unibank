import { LayoutGrid } from "@/lib/icons";
import type { ResolvedSection } from "@/integrations/contentful/types";

interface Props {
  section: ResolvedSection;
}

export function FeatureStripSection({ section }: Props) {
  const { headline, items = [] } = section;

  return (
    <section
      className="bg-orange-50"
      style={{
        padding: "clamp(40px, 7vw, 88px) 0",
      }}
    >
      <div className="site-container">
        {/* Header */}
        {headline && (
          <h2
            className="text-center my-0 mb-6 md:mb-[24px] pb-6 md:pb-[24px] text-2xl md:text-4xl"
            style={{
              fontWeight: 800,
              letterSpacing: "-0.025em",
              color: "hsl(var(--foreground))",
            }}
          >
            {headline}
          </h2>
        )}

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {items.map((item) => {
            const iconSrc = item.icon?.fields?.file?.url;
            return (
              <div
                key={item.sys.id}
                className="flex flex-col gap-4 p-5 sm:p-7 md:p-8 bg-background rounded-[20px] md:rounded-[28px]"
              >
                {/* Icon — bare, no background wrapper */}
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

                {/* Text */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "clamp(20px, 2vw, 26px)",
                      fontWeight: 800,
                      color: "hsl(var(--foreground))",
                      lineHeight: 1.2,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {item.title}
                  </p>
                  {item.description && (
                    <p
                      style={{
                        margin: 0,
                        fontSize: 15,
                        lineHeight: 1.6,
                        color: "hsl(var(--muted-foreground))",
                      }}
                    >
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
