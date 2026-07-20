import { cn } from "@/lib/utils";

/** Consistent corner radius — never change between states. */
export const FIELD_CONTROL_RADIUS = "rounded-[12px]";

/** 1.5px border in all states to avoid layout shift on focus. */
export const FIELD_CONTROL_BORDER =
  "border-[1.5px] border-[var(--surface-border)]";

/** Shared surface + transition for text fields, selects, and wrappers. */
export const FIELD_CONTROL_BASE = cn(
  "field-control w-full bg-[var(--surface-subtle)] text-foreground shadow-none ring-0 ring-offset-0 transition-[border-color,outline-color] placeholder:font-normal placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
  FIELD_CONTROL_RADIUS,
  FIELD_CONTROL_BORDER,
);

/** Open state border — complements field-controls.css */
export const FIELD_CONTROL_OPEN = "data-[state=open]:border-primary";

/** Standard text input — use via `<Input />` default styling. */
export const FIELD_INPUT_CLASS = cn(
  FIELD_CONTROL_BASE,
  "flex h-12 overflow-hidden px-3 py-3 text-sm",
);

/** Select trigger — use via `<SelectTrigger />` default styling. */
export const FIELD_SELECT_TRIGGER_CLASS = cn(
  FIELD_INPUT_CLASS,
  FIELD_CONTROL_OPEN,
  "inline-flex items-center justify-between [&>span[data-placeholder]]:font-normal [&>span[data-placeholder]]:!text-muted-foreground",
);

export const FIELD_SELECT_VALUE_CLASS =
  "data-[placeholder]:font-normal data-[placeholder]:!text-muted-foreground";

/** Date/time/popover field triggers styled as inputs. */
export const FIELD_DATE_TRIGGER_CLASS = cn(
  FIELD_INPUT_CLASS,
  FIELD_CONTROL_OPEN,
  "inline-flex items-center text-sm font-normal hover:bg-[var(--surface-subtle)] hover:text-foreground active:bg-[var(--surface-subtle)]",
);

export const FIELD_EMPTY_LABEL_CLASS = "font-normal text-muted-foreground";

/** Textarea inside a bordered wrapper — border/focus live on the wrapper only. */
export const FIELD_TEXTAREA_INSET_CLASS =
  "field-control-inner min-h-[160px] w-full resize-none border-0 bg-transparent px-3 py-3 text-sm text-foreground shadow-none outline-none ring-0 focus:outline-none focus-visible:outline-none focus-visible:ring-0";

/** Wrapper shell for inset textareas. */
export const FIELD_TEXTAREA_WRAPPER_CLASS = cn(
  FIELD_CONTROL_BASE,
  "overflow-hidden",
);

/** Standalone textarea with its own border/focus — use via `<Textarea />` default styling. */
export const FIELD_TEXTAREA_STANDALONE_CLASS = cn(
  FIELD_CONTROL_BASE,
  "min-h-[160px] resize-none px-3 py-3 text-sm",
);

/** @deprecated Use FIELD_TEXTAREA_INSET_CLASS */
export const FIELD_TEXTAREA_CLASS = FIELD_TEXTAREA_INSET_CLASS;

export const FIELD_SELECT_CONTENT_CLASS =
  "rounded-[12px] border border-[var(--surface-border)] bg-[var(--surface-page)] shadow-none data-[side=bottom]:translate-y-0 data-[side=top]:translate-y-0";

export const FIELD_SLOT_CLASS = cn(
  FIELD_CONTROL_BASE,
  "min-h-12 px-3 py-3",
);

export const FORM_ITEM_CLASS = "space-y-3";

export const FORM_FIELDS_STACK_CLASS = "space-y-6";

export const FORM_BODY_CLASS = "text-sm leading-relaxed text-muted-foreground";
