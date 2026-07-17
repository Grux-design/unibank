import { useState } from "react";
import { Link } from "react-router-dom";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import type { ResolvedSection } from "@/integrations/contentful/types";

interface Props {
  section: ResolvedSection;
}

export function HeroFormSection({ section }: Props) {
  const { title, headline, subheadline, mainImage, showForm } = section;
  const [idValue, setIdValue] = useState("");
  const bp = useBreakpoint();
  const isStacked = bp !== "full";
  const isMobile = bp === "mobile";

  const imgSrc = mainImage?.fields?.file?.url;

  return (
    <section
      style={{
        background: "hsl(var(--background))",
        padding: isStacked
          ? isMobile
            ? "80px 0 40px"
            : "clamp(96px, 10vw, 120px) 0 48px"
          : "clamp(96px, 10vw, 120px) 0 clamp(48px, 8vw, 96px)",
      }}
    >
      <div className="site-container">
        {/* ── Hero grid ── */}
        <div className="grid grid-cols-1 min-[1200px]:grid-cols-2 gap-8 min-[1200px]:gap-10 items-center">
          {/* Image first when stacked (mobile + compact) */}
          {imgSrc && (
            <div
              className="order-1 min-[1200px]:order-2"
              style={{
                borderRadius: isStacked ? 20 : 28,
                overflow: "hidden",
                minHeight: isStacked ? 280 : 480,
                height: "100%",
                background: "hsl(var(--muted))",
              }}
            >
              <img
                src={imgSrc}
                alt={mainImage?.fields?.title ?? headline ?? ""}
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: isStacked ? 280 : 480,
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          )}

          {/* Text second on mobile, left column on desktop */}
          <div className="order-2 min-[1200px]:order-1" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {title && (
              <p className="type-eyebrow">
                {title}
              </p>
            )}

            {headline && (
              <h1
                className="type-page-title text-foreground"
                dangerouslySetInnerHTML={{
                  __html: headline.replace(
                    /\*(.*?)\*/g,
                    `<span style="color:hsl(var(--primary))">$1</span>`
                  ),
                }}
              />
            )}

            {subheadline && (
              <p className="type-lead max-w-[520px]">
                {subheadline}
              </p>
            )}

            {section.items && section.items.length > 0 && (
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
                {section.items.map((item) => {
                  if (!item.link) return null;
                  const isExternal = item.link.startsWith("http") || item.link.startsWith("mailto");
                  const buttonStyle: React.CSSProperties = {
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 52,
                    padding: "0 32px",
                    borderRadius: 12,
                    background: "hsl(var(--primary))",
                    color: "hsl(var(--primary-foreground))",
                    fontSize: 15,
                    fontWeight: 600,
                    textDecoration: "none",
                    cursor: "pointer",
                    transition: "background 0.18s, transform 0.18s, box-shadow 0.18s",
                    boxShadow: "0 4px 12px rgba(255, 129, 54, 0.2)",
                    width: isMobile ? "100%" : "fit-content",
                  };

                  const onEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.background = "hsl(var(--primary-hover))";
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow = "0 6px 16px rgba(255, 129, 54, 0.35)";
                  };

                  const onLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.background = "hsl(var(--primary))";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(255, 129, 54, 0.2)";
                  };

                  if (isExternal) {
                    return (
                      <a
                        key={item.sys.id}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={buttonStyle}
                        onMouseEnter={onEnter}
                        onMouseLeave={onLeave}
                      >
                        {item.title}
                      </a>
                    );
                  }

                  return (
                    <Link
                      key={item.sys.id}
                      to={item.link}
                      style={buttonStyle}
                      onMouseEnter={onEnter}
                      onMouseLeave={onLeave}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            )}

            {showForm && (
              <div
                style={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 20,
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  maxWidth: isStacked ? "100%" : 420,
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: 15,
                    fontWeight: 600,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Abre tu cuenta hoy
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    color: "hsl(var(--muted-foreground))",
                    lineHeight: 1.5,
                  }}
                >
                  Ingresa tu cédula para comenzar el proceso
                </p>
                <input
                  type="text"
                  value={idValue}
                  onChange={(e) => setIdValue(e.target.value)}
                  placeholder="Ej. 001-1234567-8"
                  style={{
                    height: 48,
                    borderRadius: 12,
                    border: "1px solid hsl(var(--border))",
                    padding: "0 16px",
                    fontSize: 15,
                    color: "hsl(var(--foreground))",
                    background: "hsl(var(--background))",
                    outline: "none",
                    width: "100%",
                    boxSizing: "border-box",
                    transition: "border-color 0.18s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "hsl(var(--primary))")}
                  onBlur={(e) => (e.target.style.borderColor = "hsl(var(--border))")}
                />
                <button
                  style={{
                    height: 52,
                    borderRadius: 12,
                    background: "hsl(var(--primary))",
                    color: "hsl(var(--primary-foreground))",
                    border: "none",
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "background 0.18s",
                    width: "100%",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.background = "hsl(var(--primary-hover))")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.background = "hsl(var(--primary))")
                  }
                >
                  Continuar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
