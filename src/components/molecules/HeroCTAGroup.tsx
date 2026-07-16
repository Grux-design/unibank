import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { NavPill } from "@/components/atoms/NavPill";

interface HeroCTAGroupProps {
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}

export function HeroCTAGroup({
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: HeroCTAGroupProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link
        to={primaryHref}
        className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        {primaryLabel}
        <ArrowRight size={16} />
      </Link>
      <Link
        to={secondaryHref}
        className="inline-flex items-center gap-2 rounded-xl border border-foreground/25 px-6 py-3 text-sm font-bold text-foreground hover:border-foreground/40 hover:bg-foreground/5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        {secondaryLabel}
      </Link>
    </div>
  );
}
