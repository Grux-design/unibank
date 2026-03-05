interface HeroBreadcrumbProps {
  segment: string;
  product: string;
}

export function HeroBreadcrumb({ segment, product }: HeroBreadcrumbProps) {
  return (
    <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest">
      <span className="rounded-full border border-primary/40 px-3 py-1 text-primary">
        {segment}
      </span>
      <span className="text-foreground/40">/</span>
      <span className="text-foreground/60">{product}</span>
    </div>
  );
}
