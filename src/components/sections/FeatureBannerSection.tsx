import { Link } from "react-router-dom";
import type { CmsSectionProps } from "@/components/organisms/PageBuilder";
import { PAGE_SURFACE_CLASS } from "@/constants/pageSurfaces";
import { Button } from "@/components/ui/button";
import { CTA_BUTTON_LAYOUT_CLASS } from "@/constants/ctaButtons";
import { ChevronRight } from "@/lib/icons";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";
import { Reveal } from "@/components/effects/Reveal";

function isRichText(val: unknown): val is Document {
  return !!val && typeof val === "object" && (val as Document).nodeType === "document";
}

function isExternalHref(href: string) {
  return href.startsWith("http") || href.startsWith("mailto");
}

export function FeatureBannerSection({ section, surface = "white" }: CmsSectionProps) {
  const imageUrl = section.mainImage?.fields?.file?.url || null;

  const copyContent = (() => {
    if (isRichText(section.copy)) return documentToReactComponents(section.copy);
    if (typeof section.copy === "string") return section.copy;
    if (section.headline) return section.headline;
    return null;
  })();

  const ctaItem = section.items?.find((item) => item.link);
  const ctaHref = ctaItem?.link;
  const ctaLabel = ctaItem?.title || section.secondaryCta || "Conocer más";

  const ctaButton = ctaHref ? (
    <Button asChild size="lg" className={`h-[52px] px-8 group/btn ${CTA_BUTTON_LAYOUT_CLASS}`}>
      {isExternalHref(ctaHref) ? (
        <a href={ctaHref} target="_blank" rel="noopener noreferrer">
          {ctaLabel}
          <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
        </a>
      ) : (
        <Link to={ctaHref}>
          {ctaLabel}
          <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
        </Link>
      )}
    </Button>
  ) : null;

  return (
    <section className={`w-full ${PAGE_SURFACE_CLASS[surface]} py-12 md:py-20`}>
      <div className="site-container">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-14 items-center">
          {imageUrl && (
            <Reveal y={24} duration={0.6} className="order-2 md:order-1">
              <div className="group relative overflow-hidden rounded-[24px] md:rounded-[28px] aspect-[4/3] md:aspect-[5/4] bg-muted">
                <img
                  src={imageUrl}
                  alt={section.title || ""}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />
              </div>
            </Reveal>
          )}

          <Reveal y={24} duration={0.6} delay={0.08} className="order-1 md:order-2 min-w-0">
            <div className="flex flex-col items-stretch md:items-start justify-center">
            {section.internalName && (
              <span className="type-section-tag w-fit mb-4">{section.internalName}</span>
            )}
            {section.title && (
              <h2 className="type-content-section-headline mb-4 md:mb-5">{section.title}</h2>
            )}
            {copyContent && (
              <div className="text-muted-foreground text-base md:text-lg mb-6 md:mb-8 leading-relaxed [&_p]:m-0 [&_p+p]:mt-4">
                {copyContent}
              </div>
            )}
            {ctaButton}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
