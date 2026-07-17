import textureLinesOrange from "@/assets/texturelinesLOrange.svg";

interface BenefitLineDecorProps {
  variant: "bottom-left" | "top-right";
  width: number;
  height: number;
}

export function BenefitLineDecor({ variant, width, height }: BenefitLineDecorProps) {
  return (
    <img
      src={textureLinesOrange}
      alt=""
      aria-hidden
      className="block h-full w-full object-fill"
      style={{
        transform: variant === "top-right" ? "scale(-1, -1)" : undefined,
      }}
      width={width}
      height={height}
    />
  );
}
