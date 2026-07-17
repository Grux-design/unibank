import type { CmsSectionProps } from "@/components/organisms/PageBuilder";
import { PAGE_SURFACE_CLASS } from "@/constants/pageSurfaces";
import { Button } from "@/components/ui/button";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";

function isRichText(val: unknown): val is Document {
  return !!val && typeof val === "object" && (val as Document).nodeType === "document";
}

export function FeatureBannerSection({ section, surface = "white" }: CmsSectionProps) {
  const imageUrl = section.mainImage?.fields?.file?.url || null;

  const copyContent = (() => {
    if (isRichText(section.copy)) return documentToReactComponents(section.copy);
    if (typeof section.copy === "string") return section.copy;
    if (section.headline) return section.headline;
    return null;
  })();

  return (
    <section className={`w-full ${PAGE_SURFACE_CLASS[surface]} py-12 md:py-20`}>
      <div className="site-container">
        <div className="page-section-card rounded-2xl md:rounded-3xl overflow-hidden flex flex-col md:flex-row p-5 sm:p-8 md:p-16 gap-6 md:gap-12">
          {imageUrl && (
            <div className="md:w-1/2 relative min-h-[200px] sm:min-h-[260px] md:min-h-[320px] rounded-xl md:rounded-2xl overflow-hidden">
              <img
                src={imageUrl}
                alt={section.title || ""}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          )}

          <div className="md:w-1/2 flex flex-col justify-center">
            {section.title && (
              <h2 className="type-content-section-headline mb-3 md:mb-4">
                {section.title}
              </h2>
            )}
            {copyContent && (
              <div className="text-muted-foreground text-base md:text-lg mb-6 md:mb-8">
                {copyContent}
              </div>
            )}
            <div>
              <Button size="lg" className="px-8">
                {section.secondaryCta || "Conocer más"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
