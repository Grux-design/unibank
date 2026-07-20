import { cn } from "@/lib/utils";

/** Shared input/select styling — matches Canal de Denuncias and contact forms. */
export const FIELD_INPUT_CLASS =
  "h-12 px-3 py-3 text-sm rounded-[12px] border border-[var(--surface-border)] bg-[var(--surface-subtle)] text-foreground outline-none shadow-none ring-0 ring-offset-0 overflow-hidden placeholder:font-normal placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0";

export const FIELD_SELECT_TRIGGER_CLASS = cn(
  FIELD_INPUT_CLASS,
  "data-[state=open]:rounded-[12px] data-[state=closed]:rounded-[12px]",
);

export const FIELD_SELECT_VALUE_CLASS =
  "data-[placeholder]:font-normal data-[placeholder]:!text-muted-foreground";

export const FORM_ITEM_CLASS = "space-y-3";
