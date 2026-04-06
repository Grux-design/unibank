import type { ResolvedSection } from "@/integrations/contentful/types";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  section: ResolvedSection;
}

export function FAQSection({ section }: Props) {
  const items = section.items ?? [];

  return (
    <section className="w-full bg-muted py-12 md:py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 md:gap-16">
        {/* Left column */}
        <div className="md:w-2/5">
          {section.headline && (
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              {section.headline}
            </h2>
          )}
          {section.subheadline && (
            <p className="text-muted-foreground text-base mb-8">
              {section.subheadline}
            </p>
          )}
          <Button size="lg" className="rounded-full px-8">
            Ver preguntas frecuentes
          </Button>
        </div>

        {/* Right column: Accordion */}
        <div className="md:w-3/5">
          <Accordion type="single" collapsible className="space-y-3">
            {items.map((item, index) => (
              <AccordionItem
                key={item.sys.id}
                value={`faq-${index}`}
                className="bg-background rounded-2xl border-0 px-6 shadow-sm"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:no-underline py-5">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
