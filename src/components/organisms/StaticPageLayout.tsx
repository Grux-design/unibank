import { PageMasthead } from "@/components/organisms/PageMasthead";
import { ConfiguredPageMasthead, StaticPageFrame } from "@/components/organisms/StaticPageFrame";
import { getContentSectionSurface, PAGE_SURFACE_CLASS } from "@/constants/pageSurfaces";
import type { PageSurface } from "@/constants/pageSurfaces";
import type { ReactNode } from "react";

interface StaticPageShellProps {
  children: ReactNode;
  /** Band index after masthead — 0 = first content section */
  bandIndex?: number;
  /** Overrides surface derived from bandIndex */
  surface?: PageSurface;
  /** Tailwind padding classes for the section shell */
  paddingClassName?: string;
  className?: string;
  id?: string;
}

/** Wraps static page body sections with alternating surface bands */
export function StaticPageSection({
  children,
  bandIndex = 0,
  surface,
  paddingClassName = "py-12 md:py-20",
  className,
  id,
}: StaticPageShellProps) {
  const resolvedSurface: PageSurface = surface ?? getContentSectionSurface(bandIndex);
  return (
    <section
      id={id}
      className={`${PAGE_SURFACE_CLASS[resolvedSurface]} ${paddingClassName} ${className ?? ""}`.trim()}
    >
      {children}
    </section>
  );
}

interface SimplePageHeroProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  children?: ReactNode;
}

export function SimplePageHero({ eyebrow, title, subtitle, align, children }: SimplePageHeroProps) {
  return (
    <PageMasthead eyebrow={eyebrow} title={title} subtitle={subtitle} align={align}>
      {children}
    </PageMasthead>
  );
}

export { PageMasthead, ConfiguredPageMasthead, StaticPageFrame };
