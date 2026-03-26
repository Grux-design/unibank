import { useState } from "react";
import type { ResolvedSection } from "@/integrations/contentful/types";
import { SectionTag } from "@/components/ui/atoms";

interface Props {
  section: ResolvedSection;
}

export function HeroFormSection({ section }: Props) {
  const { title, headline, subheadline, mainImage, showForm } = section;
  const [idValue, setIdValue] = useState("");

  const imgSrc = mainImage?.fields?.file?.url;

  return (
    <section
      style={{
        background: "hsl(var(--background))",
        padding: "clamp(48px, 8vw, 96px) clamp(16px, 3.9vw, 72px)",
      }}
    >
      <div
        className="grid md:grid-cols-2 gap-10 items-center"
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        {/* ── Left: Content + optional form ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {internalName && (
            <p
              style={{
                margin: 0,
                fontSize: "clamp(13px, 1.2vw, 15px)",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "hsl(var(--primary))",
              }}
            >
              {internalName}
            </p>
          )}

          {headline && (
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(30px, 4.5vw, 56px)",
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
                color: "hsl(var(--foreground))",
              }}
              dangerouslySetInnerHTML={{
                __html: headline.replace(
                  /\*(.*?)\*/g,
                  `<span style="color:hsl(var(--primary))">$1</span>`
                ),
              }}
            />
          )}

          {subheadline && (
            <p
              style={{
                margin: 0,
                fontSize: "clamp(15px, 1.5vw, 18px)",
                lineHeight: 1.65,
                color: "hsl(var(--muted-foreground))",
                maxWidth: 520,
              }}
            >
              {subheadline}
            </p>
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
                maxWidth: 420,
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
                  borderRadius: 16,
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

        {/* ── Right: Image ── */}
        {imgSrc && (
          <div
            style={{
              borderRadius: 28,
              overflow: "hidden",
              minHeight: 480,
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
                minHeight: 480,
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
