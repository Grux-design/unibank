import logoFullColor from "@/assets/logos/logo-full-color.svg";
import logoPrimary from "@/assets/logos/logo-primary.svg";
import logoWhite from "@/assets/logos/logo-white.svg";

type LogoVariant = "full-color" | "primary" | "white";

interface LogoProps {
  variant?: LogoVariant;
  height?: number;
  className?: string;
}

const srcMap: Record<LogoVariant, string> = {
  "full-color": logoFullColor,
  primary: logoPrimary,
  white: logoWhite,
};

export function Logo({ variant = "full-color", height = 40, className }: LogoProps) {
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
    />
  );
}
