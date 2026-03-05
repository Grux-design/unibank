import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type NavPillVariant = "outline" | "filled" | "ghost" | "tinted" | "menu";

interface NavPillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: NavPillVariant;
}

export const NavPill = forwardRef<HTMLButtonElement, NavPillProps>(
  ({ variant = "outline", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          {
            outline:
              "border border-foreground/20 bg-transparent text-foreground hover:border-foreground/40 hover:bg-foreground/5",
            filled:
              "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm font-semibold",
            ghost:
              "border border-foreground/15 bg-transparent text-foreground hover:bg-foreground/5",
            tinted:
              "bg-[hsl(30_20%_94%)] text-foreground hover:bg-[hsl(30_15%_90%)]",
            menu:
              "bg-[hsl(30_60%_95%)] text-[hsl(20_5%_44%)] hover:bg-[hsl(30_50%_92%)] gap-2.5",
          }[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

NavPill.displayName = "NavPill";
