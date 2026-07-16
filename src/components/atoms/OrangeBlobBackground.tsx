import { SPLASH_TEXTURE_URL } from "@/lib/splashBoot";

interface OrangeBlobBackgroundProps {
  /** Fine-tune crop for portrait vs landscape (e.g. splash screens). */
  objectPosition?: string;
}

/** Official UniBank orange texture — shared across brand CTA surfaces. */
export function OrangeBlobBackground({ objectPosition = "center" }: OrangeBlobBackgroundProps) {
  return (
    <img
      src={SPLASH_TEXTURE_URL}
      alt=""
      aria-hidden
      decoding="async"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
