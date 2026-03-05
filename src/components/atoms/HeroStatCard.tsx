interface HeroStatCardProps {
  overline: string;
  value: string;
  label: string;
  totalDots?: number;
  activeDot?: number;
}

export function HeroStatCard({
  overline,
  value,
  label,
  totalDots = 4,
  activeDot = 0,
}: HeroStatCardProps) {
  return (
    <div className="rounded-2xl bg-background px-5 py-4 shadow-lg min-w-[180px]">
      <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-1">
        {overline}
      </p>
      <p className="text-2xl font-black text-primary leading-none mb-0.5">{value}</p>
      <p className="text-xs text-foreground/60 mb-3">{label}</p>
      <div className="flex gap-1.5">
        {Array.from({ length: totalDots }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeDot ? "w-5 bg-primary" : "w-1.5 bg-foreground/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
