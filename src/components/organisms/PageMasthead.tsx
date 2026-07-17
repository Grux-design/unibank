import type { ReactNode } from "react";
import { THEME } from "@/data/heroSlides";
import { AuthorityLineDecor } from "@/components/atoms/AuthorityLineDecor";

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
 * Without `imageSrc`: corner line decor (FormasLinealesGris) on all alignments.
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
  const showCornerDecor = !hasMedia;

  return (
    <section className={`page-masthead-shell ${className ?? ""}`.trim()}>
      <div className="site-container">
        <div
          className={`page-masthead-card${showCornerDecor ? " page-masthead-card--decorated" : ""}`}
        >
          {showCornerDecor && (
            <>
              <div className="page-masthead-decor page-masthead-decor--bl" aria-hidden>
                <AuthorityLineDecor variant="bottom-left" width={420} height={420} />
              </div>
              <div className="page-masthead-decor page-masthead-decor--tr" aria-hidden>
                <AuthorityLineDecor variant="top-right" width={360} height={360} />
              </div>
            </>
          )}

          <div
            className={`page-masthead-grid${hasMedia ? " page-masthead-grid--media-right" : ""}`}
          >
            <div
              className="page-masthead-copy"
              style={{
                alignItems: centered ? "center" : "flex-start",
                textAlign: centered ? "center" : "left",
                maxWidth: centered && !hasMedia ? 446 : undefined,
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
                  style={{
                    maxWidth: centered ? 347 : showCornerDecor ? 640 : 322,
                  }}
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
