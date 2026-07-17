interface ProductSectionHeaderProps {
  tag?: string;
  title?: string;
  align?: "left" | "center";
  className?: string;
}

export function ProductSectionHeader({
  tag,
  title,
  align = "left",
  className = "",
}: ProductSectionHeaderProps) {
  if (!tag && !title) return null;

  return (
    <div
      className={`mb-8 md:mb-10 ${align === "center" ? "text-center" : ""} ${className}`.trim()}
    >
      {tag && <span className="type-section-tag">{tag}</span>}
      {title && (
        <h2 className="type-content-section-headline text-foreground mt-3">{title}</h2>
      )}
    </div>
  );
}
