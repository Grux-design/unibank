import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export interface PageSectionTab {
  value: string;
  label: string;
}

interface PageSectionTabsProps {
  value: string;
  onValueChange: (value: string) => void;
  tabs: PageSectionTab[];
  ariaLabel: string;
  children: React.ReactNode;
  className?: string;
}

export function PageSectionTabs({
  value,
  onValueChange,
  tabs,
  ariaLabel,
  children,
  className,
}: PageSectionTabsProps) {
  return (
    <Tabs value={value} onValueChange={onValueChange} className={cn("w-full", className)}>
      <TabsList
        aria-label={ariaLabel}
        className="mb-10 inline-flex h-auto w-fit max-w-full flex-wrap gap-2 rounded-[16px] border border-[var(--surface-border)] bg-background p-2 md:mb-12"
      >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="min-h-10 w-auto shrink-0 rounded-[12px] px-4 py-2.5 text-sm font-medium leading-snug text-muted-foreground transition-colors data-[state=active]:bg-[var(--surface-subtle)] data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  );
}

export { TabsContent as PageSectionTabPanel };
