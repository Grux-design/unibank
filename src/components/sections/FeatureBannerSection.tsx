import type { ResolvedSection } from "@/integrations/contentful/types";
import { Button } from "@/components/ui/button";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";

interface Props {
  section: ResolvedSection;
}

function isRichText(val: unknown): val is Document {
  return !!val && typeof val === "object" && (val as any).nodeType === "document";
}

export function FeatureBannerSection({ section }: Props) {
  const imageUrl = section.mainImage?.fields?.file?.url || null;

  const copyContent = (() => {
    if (isRichText(section.copy)) return documentToReactComponents(section.copy);
    if (typeof section.copy === "string") return section.copy;
    if (section.headline) return section.headline;
    return null;
  })();

  return (
    <section className="w-full bg-muted py-12 md:py-20">
      <div className="site-container">
        <div className="bg-background rounded-2xl md:rounded-3xl overflow-hidden flex flex-col md:flex-row p-5 sm:p-8 md:p-16 gap-6 md:gap-12">
          {/* Image */}
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

          {/* Text */}
          <div className="md:w-1/2 flex flex-col justify-center">
            {section.title && (
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
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
