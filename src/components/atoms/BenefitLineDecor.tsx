import textureLinesOrange from "@/assets/texturelinesLOrange.svg";
import textureLinesGray from "@/assets/texturelinesGray.svg";

interface BenefitLineDecorProps {
  variant: "bottom-left" | "top-right";
  width: number;
  height: number;
  tone?: "orange" | "gray";
}

export function BenefitLineDecor({
  variant,
  width,
  height,
  tone = "orange",
}: BenefitLineDecorProps) {
  const isTopRight = variant === "top-right";
  const src = tone === "gray" ? textureLinesGray : textureLinesOrange;

  return (
    <img
      src={src}
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
