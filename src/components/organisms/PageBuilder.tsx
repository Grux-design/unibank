import type { ResolvedSection } from "@/integrations/contentful/types";
import { HeroFormSection } from "@/components/sections/HeroFormSection";
import { FeatureStripSection } from "@/components/sections/FeatureStripSection";
import { UnknownSection } from "@/components/sections/UnknownSection";

type SectionComponent = React.ComponentType<{ section: ResolvedSection }>;

const SECTION_MAP: Record<string, SectionComponent> = {
  "Hero - Form": HeroFormSection,
  "Feature Strip": FeatureStripSection,
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
