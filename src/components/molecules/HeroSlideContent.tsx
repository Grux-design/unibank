import { HeroBreadcrumb } from "@/components/atoms/HeroBreadcrumb";
import { HeroCTAGroup } from "@/components/molecules/HeroCTAGroup";

interface HeroSlideContentProps {
  segment: string;
  product: string;
  headline: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}

export function HeroSlideContent({
  segment,
  product,
  headline,
  body,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: HeroSlideContentProps) {
  return (
    <div className="flex flex-col gap-5 max-w-lg">
      <HeroBreadcrumb segment={segment} product={product} />

      <h1 className="text-3xl font-black leading-tight tracking-tight text-foreground sm:text-4xl xl:text-5xl">
        {headline}
      </h1>

      <p className="text-base text-foreground/60 leading-relaxed max-w-md">{body}</p>

      <HeroCTAGroup
        primaryLabel={primaryLabel}
        primaryHref={primaryHref}
        secondaryLabel={secondaryLabel}
        secondaryHref={secondaryHref}
      />
    </div>
  );
}
