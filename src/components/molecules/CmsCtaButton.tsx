import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CTA_BUTTON_LAYOUT_CLASS } from "@/constants/ctaButtons";
import { ChevronRight } from "@/lib/icons";
import { getCmsCtaHref, isExternalCmsHref } from "@/lib/cmsLinks";

interface CmsCtaButtonProps {
  href?: string | null;
  children: React.ReactNode;
  className?: string;
}

export function CmsCtaButton({ href, children, className = "" }: CmsCtaButtonProps) {
  const resolvedHref = getCmsCtaHref(href);
  if (!resolvedHref) return null;

  const external = isExternalCmsHref(resolvedHref);
  const buttonClassName = [
    "h-[52px] px-8 text-[15px] group/btn",
    CTA_BUTTON_LAYOUT_CLASS,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Button asChild size="lg" className={buttonClassName}>
      {external ? (
        <a href={resolvedHref} target="_blank" rel="noopener noreferrer">
          {children}
          <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
        </a>
      ) : (
        <Link to={resolvedHref}>
          {children}
          <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
        </Link>
      )}
    </Button>
  );
}
