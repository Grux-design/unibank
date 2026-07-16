import logoFullColor from "@/assets/logos/logo-full-color.svg";
import logoPrimary from "@/assets/logos/logo-primary.svg";
import logoResponsive from "@/assets/logos/logo-responsive.svg";
import logoWhite from "@/assets/logos/logo-white.svg";

export type LogoVariant = "full-color" | "responsive" | "primary" | "white";

interface LogoProps {
  variant?: LogoVariant;
  height?: number;
  className?: string;
  /** Prioritize loading for above-the-fold placements (header). */
  priority?: boolean;
}

const srcMap: Record<LogoVariant, string> = {
  "full-color": logoFullColor,
  responsive: logoResponsive,
  primary: logoPrimary,
  white: logoWhite,
};

export function Logo({
  variant = "full-color",
  height = 40,
  className,
  priority = false,
}: LogoProps) {
  return (
    <img
      src={srcMap[variant]}
      alt="UniBank"
      className={className}
      style={{
        display: "block",
        height,
        width: "auto",
        maxWidth: "none",
        margin: 0,
        padding: 0,
      }}
      draggable={false}
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}
