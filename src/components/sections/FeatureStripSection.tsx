import { LayoutGrid } from "lucide-react";
import type { ResolvedSection } from "@/integrations/contentful/types";
import { SectionTag } from "@/components/ui/atoms";

interface Props {
  section: ResolvedSection;
}

export function FeatureStripSection({ section }: Props) {
  const { internalName, headline, items = [] } = section;

  return (
    <section
      style={{
        background: "hsl(var(--card))",
        padding: "clamp(40px, 6vw, 80px) clamp(16px, 3.9vw, 72px)",
        borderTop: "1px solid hsl(var(--border))",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        {(internalName || headline) && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
              marginBottom: 40,
              textAlign: "center",
            }}
          >
            {internalName && <SectionTag>{internalName}</SectionTag>}
            {headline && (
              <h2
                style={{
                  margin: 0,
                  fontSize: "clamp(24px, 3vw, 36px)",
                  fontWeight: 800,
                  letterSpacing: "-0.025em",
                  color: "hsl(var(--foreground))",
                }}
              >
                {headline}
              </h2>
            )}
          </div>
        )}

        {/* Feature grid */}
        <div
          style={{
            display: "grid",
            gap: 16,
          }}
          className="grid-cols-2 md:grid-cols-4"
        >
          {items.map((item) => {
            const iconSrc = item.icon?.fields?.file?.url;
            return (
              <div
                key={item.sys.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  padding: "24px 20px",
                  background: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 20,
                  transition: "box-shadow 0.22s, transform 0.22s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.boxShadow =
                    "0 8px 24px hsl(var(--primary) / 0.12)";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.boxShadow = "none";
                  el.style.transform = "translateY(0)";
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: "hsl(var(--primary) / 0.10)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {iconSrc ? (
                    <img
                      src={iconSrc}
                      alt={item.icon?.fields?.title ?? item.title}
                      style={{ width: 28, height: 28, objectFit: "contain" }}
                    />
                  ) : (
                    <LayoutGrid
                      size={24}
                      style={{ color: "hsl(var(--primary))" }}
                    />
                  )}
                </div>

                {/* Text */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 15,
                      fontWeight: 700,
                      color: "hsl(var(--foreground))",
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </p>
                  {item.description && (
                    <p
                      style={{
                        margin: 0,
                        fontSize: 13,
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
