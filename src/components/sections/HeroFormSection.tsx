import { useState } from "react";
import { Link } from "react-router-dom";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import type { CmsSectionProps } from "@/components/organisms/PageBuilder";
import { PageMasthead } from "@/components/organisms/PageMasthead";

export function HeroFormSection({ section }: CmsSectionProps) {
  const { title, headline, subheadline, mainImage, showForm } = section;
  const [idValue, setIdValue] = useState("");
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";

  const imgSrc = mainImage?.fields?.file?.url;

  return (
    <PageMasthead
      eyebrow={title}
      title={headline ?? ""}
      titleHtml={headline}
      subtitle={subheadline}
      imageSrc={imgSrc}
      imageAlt={mainImage?.fields?.title ?? headline ?? ""}
    >
      {section.items && section.items.length > 0 && (
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 4 }}>
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
              transition: "background 0.18s, transform 0.18s",
              width: isMobile ? "100%" : "fit-content",
            };

            const onEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.background = "hsl(var(--primary-hover))";
              e.currentTarget.style.transform = "translateY(-1px)";
            };

            const onLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.background = "hsl(var(--primary))";
              e.currentTarget.style.transform = "translateY(0)";
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
          className="page-section-card"
          style={{
            borderRadius: 20,
            padding: "28px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            maxWidth: isMobile ? "100%" : 420,
            width: "100%",
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
              background: "var(--surface-page)",
              outline: "none",
              width: "100%",
              boxSizing: "border-box",
              transition: "border-color 0.18s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "hsl(var(--primary))")}
            onBlur={(e) => (e.target.style.borderColor = "hsl(var(--border))")}
          />
          <button
            type="button"
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
    </PageMasthead>
  );
}
