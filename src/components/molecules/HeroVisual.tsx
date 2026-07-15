import { HeroProductBadge } from "@/components/atoms/HeroProductBadge";
import { HeroStatCard } from "@/components/atoms/HeroStatCard";

interface HeroVisualProps {
  imageUrl: string;
  imageAlt: string;
  badgeLabel: string;
  badgeProduct: string;
  statOverline: string;
  statValue: string;
  statLabel: string;
  totalSlides: number;
  activeSlide: number;
}

export function HeroVisual({
  imageUrl,
  imageAlt,
  badgeLabel,
  badgeProduct,
  statOverline,
  statValue,
  statLabel,
  totalSlides,
  activeSlide,
}: HeroVisualProps) {
  return (
    <div className="relative flex-shrink-0 w-full max-w-sm lg:max-w-md xl:max-w-lg mx-auto lg:mx-0">
      {/* Main image */}
      <div className="relative overflow-hidden rounded-3xl aspect-[3/4] w-full shadow-xl">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="h-full w-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-secondary/20" />
      </div>

      {/* Product badge — top left */}
      <div className="absolute -top-3 left-4 z-10">
        <HeroProductBadge label={badgeLabel} product={badgeProduct} />
      </div>

      {/* Stat card — bottom right */}
      <div className="absolute -bottom-4 -right-4 z-10 md:-right-6">
        <HeroStatCard
          overline={statOverline}
          value={statValue}
          label={statLabel}
          totalDots={totalSlides}
          activeDot={activeSlide}
        />
      </div>
    </div>
  );
}
