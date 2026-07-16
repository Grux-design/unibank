import { LayoutGrid } from "lucide-react";
import type { ResolvedSection } from "@/integrations/contentful/types";

interface Props {
  section: ResolvedSection;
}

export function FeatureStripSection({ section }: Props) {
  const { headline, items = [] } = section;

  return (
    <section
      className="bg-orange-50 px-[80px] py-[80px]"
      style={{
        padding: "clamp(48px, 7vw, 88px) 16px",
      }}
    >
      <div style={{ width: "100%" }}>
        {/* Header */}
        {headline && (
          <h2
            className="text-center my-0 mb-[24px] pb-[24px] text-4xl"
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
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: 20 }}
        >
          {items.map((item) => {
            const iconSrc = item.icon?.fields?.file?.url;
            return (
              <div
                key={item.sys.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  padding: "32px 28px",
                  background: "hsl(var(--background))",
                  borderRadius: 28,
                }}
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
