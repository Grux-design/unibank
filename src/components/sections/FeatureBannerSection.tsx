import type { ResolvedSection } from "@/integrations/contentful/types";
import { Button } from "@/components/ui/button";

interface Props {
  section: ResolvedSection;
}

export function FeatureBannerSection({ section }: Props) {
  const imageUrl = section.mainImage?.fields?.file?.url
    ? `https:${section.mainImage.fields.file.url}`
    : null;

  return (
    <section className="w-full bg-muted py-[80px] px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-background rounded-3xl overflow-hidden flex flex-col md:flex-row">
          {/* Image */}
          {imageUrl && (
            <div className="md:w-1/2 relative min-h-[260px] md:min-h-[360px]">
              <img
                src={imageUrl}
                alt={section.title || ""}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          )}

          {/* Text */}
          <div className="md:w-1/2 flex flex-col justify-center p-8 md:p-12">
            {section.title && (
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {section.title}
              </h2>
            )}
            {section.headline && (
              <p className="text-muted-foreground text-lg mb-8">
                {section.headline}
              </p>
            )}
            <div>
              <Button size="lg" className="rounded-full px-8">
                {section.secondaryCta || "Conocer más"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
