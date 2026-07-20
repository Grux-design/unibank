import { useState, type ReactNode } from "react";
import { Check, ChevronDown, ChevronRight, FileText } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export const DOCUMENT_TABLE_HEAD_CLASS =
  "h-auto px-5 py-4.5 md:px-6 md:py-5 align-middle";
export const DOCUMENT_TABLE_CELL_CLASS = "px-5 py-5 md:px-6 md:py-6 align-middle";

export type FilterOption = {
  value: string;
  label: string;
};

export function FilterPill({
  label,
  value,
  displayValue,
  onValueChange,
  options,
}: {
  label: string;
  value: string;
  displayValue?: string;
  onValueChange: (value: string) => void;
  options: FilterOption[];
}) {
  const [open, setOpen] = useState(false);
  const isActive = displayValue !== undefined;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            isActive
              ? "border-foreground/15 bg-[var(--surface-subtle)] text-foreground"
              : "border-[var(--surface-border)] bg-background text-muted-foreground hover:bg-[var(--surface-subtle)] hover:text-foreground",
          )}
        >
          {isActive ? (
            <>
              <span className="text-muted-foreground">{label}:</span>
              <span className="font-medium">{displayValue}</span>
            </>
          ) : (
            <span>{label}</span>
          )}
          <ChevronDown className="size-3.5 shrink-0 opacity-60" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={6}
        className="w-auto min-w-[11rem] rounded-xl border-[var(--surface-border)] p-1 shadow-none"
      >
        <ul role="listbox" aria-label={label} className="flex flex-col gap-0.5">
          {options.map((option) => {
            const selected = value === option.value;
            return (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onValueChange(option.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                    selected
                      ? "bg-[var(--surface-subtle)] font-medium text-foreground"
                      : "text-foreground hover:bg-[var(--surface-subtle)]",
                  )}
                >
                  <Check
                    className={cn("size-4 shrink-0", selected ? "opacity-100" : "opacity-0")}
                    aria-hidden
                  />
                  <span>{option.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
}

export function FilterBar({
  active,
  onClear,
  children,
}: {
  active: boolean;
  onClear: () => void;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {children}
      {active ? (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="h-9 rounded-full px-3 text-muted-foreground"
        >
          Limpiar
        </Button>
      ) : null}
    </div>
  );
}

export function DocumentTag({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-[var(--surface-border)] bg-[var(--surface-subtle)] px-2 py-0.5 text-xs text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function DocumentTagsCell({ children }: { children: ReactNode }) {
  return (
    <DocumentMetaCell>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </DocumentMetaCell>
  );
}

export function SectionHeader({
  title,
  description,
  count,
}: {
  title: string;
  description: string;
  count: number;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-5">
      <div className="max-w-2xl">
        <h2 className="type-content-section-headline text-balance text-foreground">{title}</h2>
        <p className="mt-3.5 text-sm leading-relaxed text-pretty text-muted-foreground md:mt-4 md:text-base">
          {description}
        </p>
      </div>
      <p className="shrink-0 text-sm text-muted-foreground">
        {count} {count === 1 ? "documento" : "documentos"}
      </p>
    </div>
  );
}

export function EmptyResults({ message }: { message: string }) {
  return <p className="px-5 py-14 text-center text-sm text-muted-foreground md:px-6 md:py-16">{message}</p>;
}

function openDocument(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export function DocumentTableRow({
  href,
  label,
  meta,
}: {
  href: string;
  label: string;
  meta?: ReactNode;
}) {
  return (
    <TableRow
      className="group cursor-pointer border-[var(--surface-border)] transition-colors hover:bg-[var(--surface-subtle)]"
      onClick={() => openDocument(href)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openDocument(href);
        }
      }}
      tabIndex={0}
      role="link"
      aria-label={`Abrir ${label}`}
    >
      <TableCell className={cn(DOCUMENT_TABLE_CELL_CLASS, "font-medium text-foreground")}>
        <span className="inline-flex items-start gap-3 text-sm md:text-[15px]">
          <span className="mt-0.5 shrink-0 text-primary">
            <FileText className="size-4" />
          </span>
          <span className="text-pretty">{label}</span>
        </span>
      </TableCell>
      {meta}
      <TableCell className={cn(DOCUMENT_TABLE_CELL_CLASS, "w-10 text-right")}>
        <span className="ml-auto shrink-0 text-muted-foreground/60 transition-colors group-hover:text-muted-foreground">
          <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </TableCell>
    </TableRow>
  );
}

export function DocumentMetaCell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <TableCell className={cn(DOCUMENT_TABLE_CELL_CLASS, "text-sm text-muted-foreground", className)}>
      {children}
    </TableCell>
  );
}

export function DocumentMobileCard({
  href,
  label,
  meta,
}: {
  href: string;
  label: string;
  meta?: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="page-section-card group flex items-start gap-4 rounded-[24px] p-5 transition-colors hover:bg-[var(--surface-subtle)] md:p-6"
    >
      <span className="mt-0.5 shrink-0 text-primary">
        <FileText className="size-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-pretty text-foreground md:text-[15px]">
          {label}
        </span>
        {meta ? (
          <span className="mt-1.5 block text-sm text-muted-foreground md:mt-2">{meta}</span>
        ) : null}
      </span>
      <span className="mt-0.5 shrink-0 text-muted-foreground/60 transition-colors group-hover:text-muted-foreground">
        <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </a>
  );
}

export function InternalYearGroup({
  year,
  quarters,
}: {
  year: number;
  quarters: { period: string; href: string }[];
}) {
  return (
    <section className="page-section-card overflow-hidden rounded-[24px]">
      <div className="border-b border-[var(--surface-border)] bg-[var(--surface-subtle)] px-5 py-4 md:px-6 md:py-4.5">
        <h3 className="text-base font-semibold text-foreground">{year}</h3>
      </div>
      <ul className="divide-y divide-[var(--surface-border)]">
        {quarters.map(({ period, href }) => (
          <li key={period}>
            <InternalQuarterRow href={href} period={period} year={year} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function InternalQuarterRow({
  href,
  period,
  year,
}: {
  href: string;
  period: string;
  year: number;
}) {
  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => openDocument(href)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openDocument(href);
        }
      }}
      className="group flex cursor-pointer items-center gap-4 px-5 py-5 transition-colors hover:bg-[var(--surface-subtle)] md:px-6 md:py-6"
      aria-label={`Abrir estados financieros internos de ${period} ${year}`}
    >
      <span className="shrink-0 text-primary">
        <FileText className="size-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-foreground">{period}</span>
        <span className="mt-1 block text-xs text-muted-foreground">
          Cierre trimestral · {year}
        </span>
      </span>
      <span className="shrink-0 text-muted-foreground/60 transition-colors group-hover:text-muted-foreground">
        <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </div>
  );
}
