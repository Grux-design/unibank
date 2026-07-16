import textureUniBank from "@/assets/textureUniBank.svg";

/** Official UniBank orange texture — shared across brand CTA surfaces. */
export function OrangeBlobBackground() {
  return (
    <img
      src={textureUniBank}
      alt=""
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
