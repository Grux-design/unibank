import { useState } from "react";
import { Link } from "react-router-dom";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import type { CmsSectionProps } from "@/components/organisms/PageBuilder";
import { PageMasthead } from "@/components/organisms/PageMasthead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CTA_BUTTON_LAYOUT_CLASS } from "@/constants/ctaButtons";
import { ChevronRight } from "@/lib/icons";

function isExternalHref(href: string) {
  return href.startsWith("http") || href.startsWith("mailto");
}

export function HeroFormSection({ section }: CmsSectionProps) {
  const { title, headline, subheadline, mainImage, showForm } = section;
  const [idValue, setIdValue] = useState("");
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";

  const imgSrc = mainImage?.fields?.file?.url;
  const ctaItems = section.items?.filter((item) => item.link) ?? [];

  return (
    <PageMasthead
      eyebrow={title}
      title={headline ?? ""}
      titleHtml={headline}
      subtitle={subheadline}
      imageSrc={imgSrc}
      imageAlt={mainImage?.fields?.title ?? headline ?? ""}
    >
      {ctaItems.length > 0 && (
        <div className="flex flex-col md:flex-row flex-wrap gap-3 mt-2 w-full">
          {ctaItems.map((item) => {
            const external = isExternalHref(item.link!);
            return (
              <Button
                key={item.sys.id}
                asChild
                size="lg"
                className={`h-[52px] px-8 text-[15px] group/btn ${CTA_BUTTON_LAYOUT_CLASS}`}
              >
                {external ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.title}
                    <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                  </a>
                ) : (
                  <Link to={item.link!}>
                    {item.title}
                    <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                  </Link>
                )}
              </Button>
            );
          })}
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
    </PageMasthead>
  );
}
