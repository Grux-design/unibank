import type { PageSurface } from "@/constants/pageSurfaces";
import { getContentSectionSurface, PAGE_SURFACE_CLASS } from "@/constants/pageSurfaces";
import type { ResolvedSection } from "@/integrations/contentful/types";
import { HeroFormSection } from "@/components/sections/HeroFormSection";
import { FeatureStripSection } from "@/components/sections/FeatureStripSection";
import { FeatureBannerSection } from "@/components/sections/FeatureBannerSection";
import { CardGridSection } from "@/components/sections/CardGridSection";
import { BenefitListSection } from "@/components/sections/BenefitListSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { UnknownSection } from "@/components/sections/UnknownSection";

export interface CmsSectionProps {
  section: ResolvedSection;
  surface?: PageSurface;
}

type SectionComponent = React.ComponentType<CmsSectionProps>;

const SECTION_MAP: Record<string, SectionComponent> = {
  "Hero - Form": HeroFormSection,
  "Feature Strip": FeatureStripSection,
  "Feature Banner": FeatureBannerSection,
  "Card Grid": CardGridSection,
  "Benefit List": BenefitListSection,
  "FAQ": FAQSection,
};

interface Props {
  sections: ResolvedSection[];
}

export function PageBuilder({ sections }: Props) {
  let contentBandIndex = 0;

  return (
    <>
      {sections.map((section) => {
        const Comp: SectionComponent = SECTION_MAP[section.type] ?? UnknownSection;
        const isHero = section.type === "Hero - Form";
        const surface = isHero ? undefined : getContentSectionSurface(contentBandIndex++);

        return (
          <Comp
            key={section.sys.id}
            section={section}
            surface={surface}
          />
        );
      })}
    </>
  );
}

export { PAGE_SURFACE_CLASS, getContentSectionSurface };
