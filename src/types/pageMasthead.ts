import type { ReactNode } from "react";

/** Icons available for masthead eyebrow pills — resolved in lib/pageMasthead */
export type PageMastheadIconKey =
  | "shield"
  | "leaf"
  | "bar-chart"
  | "sparkles"
  | "newspaper"
  | "map-pin"
  | "mail";

export interface PageMastheadEyebrow {
  icon?: PageMastheadIconKey;
  label: string;
}

/** Visual / layout preset. Change defaults here to restyle all pages using that preset. */
export type PageMastheadPreset = "text" | "product" | "cms-product";

export interface PageMastheadContent {
  preset?: PageMastheadPreset;
  eyebrow?: string | PageMastheadEyebrow;
  title: string;
  titleHtml?: string;
  subtitle?: string;
  highlight?: string;
  imageSrc?: string;
  imageAlt?: string;
  align?: "left" | "center";
}

/** Registry keys for static UniBank pages */
export type PageMastheadKey =
  | "junta-directiva"
  | "sostenibilidad"
  | "estados-financieros"
  | "calificacion-riesgo"
  | "canal-denuncias"
  | "tarifario"
  | "trabaja-con-nosotros"
  | "blog"
  | "sucursales"
  | "contact"
  | "legal"
  | "cumplimiento-normativo"
  | "unilideres"
  | "cajilla-seguridad"
  | "unitrust"
  | "unileasing";

export type PageMastheadOverrides = Partial<PageMastheadContent>;

export interface ConfiguredPageMastheadProps extends PageMastheadOverrides {
  /** Lookup static copy + preset from the central registry */
  page?: PageMastheadKey;
  /** Fallback preset when `page` is omitted (e.g. CMS, legal overrides) */
  preset?: PageMastheadPreset;
  children?: ReactNode;
  className?: string;
}
