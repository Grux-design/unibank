import type { ResolvedSection } from "@/integrations/contentful/types";
import { HeroFormSection } from "@/components/sections/HeroFormSection";
import { FeatureStripSection } from "@/components/sections/FeatureStripSection";
import { FeatureBannerSection } from "@/components/sections/FeatureBannerSection";
import { CardGridSection } from "@/components/sections/CardGridSection";
import { BenefitListSection } from "@/components/sections/BenefitListSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { UnknownSection } from "@/components/sections/UnknownSection";

type SectionComponent = React.ComponentType<{ section: ResolvedSection }>;

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
  return (
    <>
      {sections.map((section) => {
        const Comp: SectionComponent = SECTION_MAP[section.type] ?? UnknownSection;
        return <Comp key={section.sys.id} section={section} />;
      })}
    </>
  );
}
