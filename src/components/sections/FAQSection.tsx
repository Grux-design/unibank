import type { ResolvedSection } from "@/integrations/contentful/types";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
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
    <section className="w-full bg-muted py-[80px]">
      <div className="site-container flex flex-col md:flex-row gap-10 md:gap-16">
        {/* Left column */}
        <div className="md:w-2/5">
          {section.title && (
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              {section.title}
            </h2>
          )}
          {section.headline && (
            <p className="text-muted-foreground text-base mb-8">
              {section.headline}
            </p>
          )}
        </div>

        {/* Right column: Accordion */}
        <div className="md:w-3/5">
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
                  className="bg-background rounded-2xl border-0 px-6"
                >
                  <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:no-underline py-[32px] [&>svg]:hidden">
                    <span className="flex-1 text-xl">{questionText}</span>
                    <span className="ml-4 flex-shrink-0">
                      {isOpen ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-lg leading-relaxed">
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
