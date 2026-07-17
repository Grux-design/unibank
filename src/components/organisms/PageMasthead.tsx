import type { ReactNode } from "react";
import { THEME } from "@/data/heroSlides";

export interface PageMastheadProps {
  /** Contentful `title` / eyebrow label */
  eyebrow?: ReactNode;
  /** h1 — string or HTML (Contentful *accent* markers) */
  title: ReactNode;
  titleHtml?: string;
  subtitle?: ReactNode;
  /** Accent line between title and body (product taglines) */
  highlight?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  children?: ReactNode;
  /** Centered variant for form / legal pages */
  align?: "left" | "center";
  className?: string;
}

/**
 * Internal-page masthead — beige card matching the homepage hero shell.
 * Contentful fields map 1:1 via HeroFormSection.
 *
 * Without `imageSrc`: single-column text masthead (Junta Directiva, Sostenibilidad, etc.).
 * Use `children` for CTAs or stat cards instead of a hero photo — see CalificacionRiesgoPage.
 */
export function PageMasthead({
  eyebrow,
  title,
  titleHtml,
  subtitle,
  highlight,
  imageSrc,
  imageAlt,
  children,
  align = "left",
  className,
}: PageMastheadProps) {
  const centered = align === "center";
  const hasMedia = Boolean(imageSrc);

  return (
    <section className={`page-masthead-shell ${className ?? ""}`.trim()}>
      <div className="site-container">
        <div className="page-masthead-card">
          <div
            className={`page-masthead-grid${hasMedia ? " page-masthead-grid--media-right" : ""}`}
          >
            <div
              className="page-masthead-copy"
              style={{
                alignItems: centered ? "center" : "flex-start",
                textAlign: centered ? "center" : "left",
                maxWidth: centered && !hasMedia ? 720 : undefined,
                marginInline: centered && !hasMedia ? "auto" : undefined,
              }}
            >
              {eyebrow && <div className="type-eyebrow">{eyebrow}</div>}

              {titleHtml ? (
                <h1
                  className="type-page-title text-foreground"
                  dangerouslySetInnerHTML={{
                    __html: titleHtml.replace(
                      /\*(.*?)\*/g,
                      `<span style="color:${THEME.highlightColor}">$1</span>`
                    ),
                  }}
                />
              ) : title ? (
                <h1 className="type-page-title text-foreground">{title}</h1>
              ) : null}

              {highlight && (
                <p className="type-content-section-headline text-primary m-0">{highlight}</p>
              )}

              {subtitle && (
                <p
                  className="type-lead"
                  style={{ maxWidth: centered ? 560 : 520 }}
                >
                  {subtitle}
                </p>
              )}

              {children}
            </div>

            {hasMedia && (
              <div className="page-masthead-media">
                <img src={imageSrc} alt={imageAlt ?? ""} loading="eager" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
