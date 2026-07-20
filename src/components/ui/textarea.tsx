import * as React from "react";

import { FIELD_TEXTAREA_STANDALONE_CLASS } from "@/constants/formFields";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  const isInset = className?.includes("field-control-inner");

  return (
    <textarea
      className={cn(!isInset && FIELD_TEXTAREA_STANDALONE_CLASS, className)}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
