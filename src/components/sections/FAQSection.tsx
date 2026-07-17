import type { ResolvedSection } from "@/integrations/contentful/types";
import { Button } from "@/components/ui/button";
import { Plus, X } from "@/lib/icons";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";

interface Props {
  section: ResolvedSection;
}

export function FAQSection({ section }: Props) {
  const items = section.items ?? [];
  const [openValue, setOpenValue] = useState<string | undefined>(undefined);

  return (
    <section className="w-full bg-muted py-12 md:py-20">
      <div className="site-container flex flex-col md:flex-row gap-8 md:gap-10 lg:gap-16">
        {/* Left column */}
        <div className="md:w-2/5">
          {section.title && (
            <h2 className="type-section-headline mb-3 md:mb-4 leading-tight">
              {section.title}
            </h2>
          )}
          {section.headline && (
            <p className="text-muted-foreground text-sm md:text-base mb-6 md:mb-8">
              {section.headline}
            </p>
          )}
        </div>

        {/* Right column: Accordion */}
        <div className="md:w-3/5 min-w-0">
          <Accordion
            type="single"
            collapsible
            className="space-y-3"
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
                if (typeof rawAnswer === 'object' && 'nodeType' in (rawAnswer as any)) {
                  return documentToReactComponents(rawAnswer as any);
                }
                return String(rawAnswer);
              };

              return (
                <AccordionItem
                  key={item.sys.id}
                  value={itemValue}
                  className="bg-background rounded-2xl border-0 px-4 md:px-6"
                >
                  <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:no-underline py-5 md:py-8 [&>svg]:hidden">
                    <span className="flex-1 text-base md:text-xl pr-3">{questionText}</span>
                    <span className="ml-4 flex-shrink-0">
                      {isOpen ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base md:text-lg leading-relaxed pb-4 md:pb-6">
                    {renderAnswer()}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
