import { useState } from "react";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import type { CmsSectionProps } from "@/components/organisms/PageBuilder";
import { ConfiguredPageMasthead } from "@/components/organisms/StaticPageFrame";
import { cmsSectionToMastheadContent } from "@/lib/pageMasthead";
import { CmsCtaButton } from "@/components/molecules/CmsCtaButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CTA_BUTTON_LAYOUT_CLASS } from "@/constants/ctaButtons";
import { filterCmsCtaItems } from "@/lib/cmsLinks";

export function HeroFormSection({ section }: CmsSectionProps) {
  const { showForm } = section;
  const [idValue, setIdValue] = useState("");
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";

  const ctaItems = filterCmsCtaItems(section.items);

  return (
    <ConfiguredPageMasthead preset="cms-product" {...cmsSectionToMastheadContent(section)}>
      {ctaItems.length > 0 && (
        <div className="flex flex-col md:flex-row flex-wrap gap-3 mt-2 w-full">
          {ctaItems.map((item) => (
            <CmsCtaButton key={item.sys.id} href={item.link}>
              {item.title}
            </CmsCtaButton>
          ))}
        </div>
      )}

      {showForm && (
        <div className="page-section-card rounded-[20px] p-6 md:p-7 flex flex-col gap-4 w-full max-w-[420px] mt-2">
          <div>
            <p className="m-0 text-[15px] font-semibold text-foreground">Abre tu cuenta hoy</p>
            <p className="m-0 mt-1 text-sm text-muted-foreground leading-relaxed">
              Ingresa tu cédula para comenzar el proceso
            </p>
          </div>
          <Input
            type="text"
            value={idValue}
            onChange={(e) => setIdValue(e.target.value)}
            placeholder="Ej. 001-1234567-8"
            className="h-12 rounded-xl"
          />
          <Button type="button" size="lg" className={`h-[52px] ${CTA_BUTTON_LAYOUT_CLASS}`}>
            Continuar
          </Button>
        </div>
      )}
    </ConfiguredPageMasthead>
  );
}
