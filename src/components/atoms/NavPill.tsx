import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type NavPillVariant = "outline" | "filled" | "ghost";

interface NavPillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: NavPillVariant;
  asChild?: boolean;
}

export const NavPill = forwardRef<HTMLButtonElement, NavPillProps>(
  ({ variant = "outline", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          {
            outline:
              "border border-foreground/20 bg-transparent text-foreground hover:border-foreground/40 hover:bg-foreground/5",
            filled:
              "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
            ghost:
              "border border-foreground/15 bg-transparent text-foreground hover:bg-foreground/5",
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
