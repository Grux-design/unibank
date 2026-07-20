import type { ReactNode } from "react";
import { THEME } from "@/data/heroSlides";
import { BenefitLineDecor } from "@/components/atoms/BenefitLineDecor";
import { Reveal } from "@/components/effects/Reveal";
import type { PageMastheadProps } from "@/components/organisms/PageMastheadClassic";

/**
 * Editorial internal-page masthead — open warm band, typography-first, no card shell.
 */
export function PageMastheadEditorial({
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
    <section className={`page-masthead-editorial ${className ?? ""}`.trim()}>
      <div
        className={`page-masthead-editorial-band${hasMedia ? "" : " page-masthead-editorial-band--no-media"}`}
      >
        <div className="site-container relative z-[1]">
          <Reveal y={20} duration={0.55} amount={0.15}>
            <div
              className={`page-masthead-editorial-grid${
                hasMedia
                  ? " page-masthead-editorial-grid--media"
                  : " page-masthead-editorial-grid--no-media"
              }`}
            >
              <div
                className={`page-masthead-editorial-grid-texture${
                  hasMedia ? "" : " page-masthead-editorial-grid-texture--gray"
                }`}
                aria-hidden
              >
                <BenefitLineDecor
                  variant="bottom-left"
                  width={683}
                  height={683}
                  tone={hasMedia ? "orange" : "gray"}
                />
              </div>

              <div
                className={`page-masthead-editorial-copy${centered ? " page-masthead-editorial-copy--center" : ""}`}
              >
                {eyebrow && (
                  <div className="page-masthead-editorial-eyebrow">
                    <div className="type-eyebrow">{eyebrow}</div>
                    <span className="page-masthead-editorial-rule" aria-hidden />
                  </div>
                )}

                {titleHtml ? (
                  <h1
                    className="type-page-title text-foreground page-masthead-editorial-title"
                    dangerouslySetInnerHTML={{
                      __html: titleHtml.replace(
                        /\*(.*?)\*/g,
                        `<span style="color:${THEME.highlightColor}">$1</span>`,
                      ),
                    }}
                  />
                ) : title ? (
                  <h1 className="type-page-title text-foreground page-masthead-editorial-title">
                    {title}
                  </h1>
                ) : null}

                {highlight && (
                  <p className="type-content-section-headline text-primary m-0">{highlight}</p>
                )}

                {subtitle && (
                  <p className="type-lead page-masthead-editorial-lead">{subtitle}</p>
                )}

                {children}
              </div>

              {hasMedia && (
                <div className="page-masthead-editorial-media-col">
                  <div className="page-masthead-editorial-media-frame">
                    <div className="page-masthead-editorial-media">
                      <img src={imageSrc} alt={imageAlt ?? ""} loading="eager" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
