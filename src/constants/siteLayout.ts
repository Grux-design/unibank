import type { CSSProperties } from "react";

/** Nav/header gutters — 24px desktop, 16px mobile (Figma site) */
export const SITE_GUTTER_NAV = 24;
export const SITE_GUTTER_HERO = 16;

export const siteGutterPaddingStyle: CSSProperties = {
  paddingLeft: "var(--site-gutter)",
  paddingRight: "var(--site-gutter)",
};

export const siteNavPaddingStyle: CSSProperties = {
  paddingLeft: "var(--site-gutter-nav)",
  paddingRight: "var(--site-gutter-nav)",
};

export const siteHeroPaddingStyle: CSSProperties = {
  paddingLeft: "var(--site-gutter-hero)",
  paddingRight: "var(--site-gutter-hero)",
};

/** Matches .site-container in index.css */
export const siteContainerStyle: CSSProperties = {
  boxSizing: "border-box",
  width: "100%",
  maxWidth: "var(--site-max-width)",
  margin: "0 auto",
  paddingLeft: "var(--site-gutter)",
  paddingRight: "var(--site-gutter)",
};
