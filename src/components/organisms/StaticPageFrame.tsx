import type { ReactNode } from "react";
import { PageMasthead } from "@/components/organisms/PageMasthead";
import { resolvePageMastheadContent, toPageMastheadProps } from "@/lib/pageMasthead";
import type { ConfiguredPageMastheadProps } from "@/types/pageMasthead";

/**
 * Renders PageMasthead from the central registry (`pageMastheads.ts`) + optional overrides.
 *
 * @example
 * // Static page — copy lives in registry
 * <ConfiguredPageMasthead page="junta-directiva" />
 *
 * @example
 * // i18n / dynamic overrides
 * <ConfiguredPageMasthead page="contact" title={t.h1} subtitle={t.sub} />
 *
 * @example
 * // Product page with masthead CTA slot
 * <ConfiguredPageMasthead page="unitrust">{cta}</ConfiguredPageMasthead>
 */
export function ConfiguredPageMasthead({
  page,
  preset,
  children,
  className,
  ...overrides
}: ConfiguredPageMastheadProps) {
  const content = resolvePageMastheadContent({ page, preset, ...overrides });
  const props = toPageMastheadProps(content);

  return (
    <PageMasthead {...props} className={className}>
      {children}
    </PageMasthead>
  );
}

interface StaticPageFrameProps extends ConfiguredPageMastheadProps {
  children: ReactNode;
  articleClassName?: string;
  /** Optional CTAs or widgets rendered inside the masthead */
  mastheadSlot?: ReactNode;
}

/**
 * Standard static page shell: `<article>` + configured masthead + body sections.
 */
export function StaticPageFrame({
  children,
  articleClassName = "min-h-screen bg-background",
  mastheadSlot,
  ...mastheadProps
}: StaticPageFrameProps) {
  return (
    <article className={articleClassName}>
      <ConfiguredPageMasthead {...mastheadProps}>{mastheadSlot}</ConfiguredPageMasthead>
      {children}
    </article>
  );
}
