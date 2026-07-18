import { BenefitLineDecor } from "@/components/atoms/BenefitLineDecor";

/** Full-bleed corner textures for accent benefit bands */
export function BenefitSectionTextures() {
  return (
    <>
      <div className="benefit-section-texture benefit-section-texture--bl" aria-hidden>
        <BenefitLineDecor variant="bottom-left" width={400} height={400} />
      </div>
      <div className="benefit-section-texture benefit-section-texture--tr" aria-hidden>
        <BenefitLineDecor variant="top-right" width={400} height={400} />
      </div>
    </>
  );
}
