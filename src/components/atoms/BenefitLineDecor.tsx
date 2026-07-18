import textureLinesOrange from "@/assets/texturelinesLOrange.svg";

interface BenefitLineDecorProps {
  variant: "bottom-left" | "top-right";
  width: number;
  height: number;
}

export function BenefitLineDecor({ variant, width, height }: BenefitLineDecorProps) {
  const isTopRight = variant === "top-right";

  return (
    <img
      src={textureLinesOrange}
      alt=""
      aria-hidden
      className="block h-full w-full object-fill"
      style={{
        transform: isTopRight ? "scale(-1, -1)" : undefined,
        transformOrigin: isTopRight ? "top right" : "bottom left",
      }}
      width={width}
      height={height}
    />
  );
}
