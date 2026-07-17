import type { CmsSectionProps } from "@/components/organisms/PageBuilder";
import { PAGE_SURFACE_CLASS } from "@/constants/pageSurfaces";
import { cn } from "@/lib/utils";
import { Plus, X } from "@/lib/icons";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { ProductSectionHeader } from "@/components/sections/ProductSectionHeader";
import { Reveal } from "@/components/effects/Reveal";

export function FAQSection({ section, surface = "white" }: CmsSectionProps) {
  const items = section.items ?? [];
  const [openValue, setOpenValue] = useState<string | undefined>(undefined);

  return (
    <section className={`w-full ${PAGE_SURFACE_CLASS[surface]} py-12 md:py-20`}>
      <div className="site-container flex flex-col md:flex-row gap-8 md:gap-10 lg:gap-16 items-start">
        <Reveal y={20} duration={0.55} className="md:w-2/5 md:sticky md:top-20 lg:top-28 self-start">
          <ProductSectionHeader tag="FAQ" title={section.title} align="left" className="mb-3 md:mb-4" />
          {section.headline && (
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              {section.headline}
            </p>
          )}
        </Reveal>

        <Reveal y={20} duration={0.55} delay={0.06} className="md:w-3/5 min-w-0 w-full">
          <Accordion
            type="single"
            collapsible
            className="page-section-card rounded-[24px] md:rounded-[28px] overflow-hidden border border-border divide-y divide-border"
            value={openValue}
            onValueChange={setOpenValue}
          >
            {items.map((item, index) => {
              const questionText = item.question || item.title;
              const rawAnswer: unknown = item.answer || item.description;
              const itemValue = `faq-${index}`;
              const isOpen = openValue === itemValue;

              const renderAnswer = () => {
                if (!rawAnswer) return null;
                if (
                  typeof rawAnswer === "object" &&
                  rawAnswer !== null &&
                  "nodeType" in rawAnswer
                ) {
                  return documentToReactComponents(
                    rawAnswer as Parameters<typeof documentToReactComponents>[0],
                  );
                }
                return String(rawAnswer);
              };

              return (
                <AccordionItem
                  key={item.sys.id}
                  value={itemValue}
                  className="border-0 px-5 md:px-7 bg-transparent data-[state=open]:bg-primary/[0.03] transition-colors duration-300"
                >
                  <AccordionTrigger className="text-left faq-item-question hover:no-underline py-5 md:py-6 [&>svg]:hidden gap-4 group/trigger">
                    <span className="flex-1 pr-2 transition-colors duration-200 group-hover/trigger:text-foreground">
                      {questionText}
                    </span>
                    <span
                      className={cn(
                        "flex-shrink-0 w-9 h-9 rounded-full border inline-flex items-center justify-center transition-all duration-300",
                        isOpen
                          ? "bg-primary text-primary-foreground border-primary scale-105"
                          : "border-border bg-background text-primary group-hover/trigger:border-primary/40",
                      )}
                    >
                      <span
                        className={cn(
                          "inline-flex transition-transform duration-300",
                          isOpen ? "rotate-90 scale-95" : "rotate-0",
                        )}
                      >
                        {isOpen ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="faq-item-answer pb-5 md:pb-6 pt-0 [&_p]:m-0 [&_p+p]:mt-3">
                    {renderAnswer()}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
