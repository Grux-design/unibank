import { useState } from "react";
import appStoreBadge from "@/assets/stores/app-store.svg";
import googlePlayBadge from "@/assets/stores/google-play.svg";

export type StoreBadgeVariant = "app-store" | "google-play";

const STORE_LINKS: Record<StoreBadgeVariant, string> = {
  "app-store": "https://apps.apple.com/pa/app/unibank-panam%C3%A1/id6738843747",
  "google-play": "https://play.google.com/store/apps/details?id=com.newtech.unibank&hl=es_PA",
};

const srcMap: Record<StoreBadgeVariant, string> = {
  "app-store": appStoreBadge,
  "google-play": googlePlayBadge,
};

const altMap: Record<StoreBadgeVariant, string> = {
  "app-store": "Download on the App Store",
  "google-play": "Get it on Google Play",
};

interface StoreBadgeProps {
  variant: StoreBadgeVariant;
  height?: number;
  className?: string;
}

export function StoreBadge({ variant, height = 40, className }: StoreBadgeProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={STORE_LINKS[variant]}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={altMap[variant]}
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-block",
        lineHeight: 0,
        borderRadius: 8,
        transition: "transform 0.18s ease, opacity 0.18s ease, box-shadow 0.18s ease",
        transform: hovered ? "translateY(-2px) scale(1.02)" : "translateY(0) scale(1)",
        opacity: hovered ? 1 : 0.94,
        boxShadow: hovered ? "0 6px 16px rgba(28, 25, 23, 0.14)" : "none",
      }}
    >
      <img
        src={srcMap[variant]}
        alt=""
        aria-hidden
        draggable={false}
        decoding="async"
        loading="lazy"
        style={{
          display: "block",
          height,
          width: "auto",
          maxWidth: "none",
          margin: 0,
          padding: 0,
        }}
      />
    </a>
  );
}
