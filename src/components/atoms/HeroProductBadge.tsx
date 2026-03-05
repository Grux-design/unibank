interface HeroProductBadgeProps {
  label: string;
  product: string;
}

export function HeroProductBadge({ label, product }: HeroProductBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-secondary/90 backdrop-blur-sm px-4 py-2 text-secondary-foreground shadow-lg">
      <span className="text-[10px] font-bold uppercase tracking-widest text-secondary-foreground/60">
        {label}
      </span>
      <span className="text-secondary-foreground/30 text-xs">/</span>
      <span className="text-sm font-semibold">{product}</span>
    </div>
  );
}
