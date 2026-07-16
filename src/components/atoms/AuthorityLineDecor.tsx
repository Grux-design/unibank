import formasLinealesGris from "@/assets/FormasLinealesGris.svg";

interface AuthorityLineDecorProps {
  variant: "bottom-left" | "top-right";
  width: number;
  height: number;
}

export function AuthorityLineDecor({ variant, width, height }: AuthorityLineDecorProps) {
  return (
    <img
      src={formasLinealesGris}
      alt=""
      aria-hidden
      style={{
        display: "block",
        width,
        height,
        objectFit: "fill",
        transform: variant === "top-right" ? "scale(-1, -1)" : undefined,
      }}
    />
  );
}
