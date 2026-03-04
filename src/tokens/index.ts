/**
 * Unibank Design Token TypeScript Interface
 *
 * Import anywhere in the codebase:
 *   import tokens from "@/tokens";
 *   import type { DesignToken, TokenKey } from "@/tokens";
 *
 * Usage example:
 *   const primary = tokens["color-brand-primary"].value; // "#ff8136"
 *
 * NOTE: For Tailwind/CSS usage, prefer the CSS custom properties defined in
 * index.css (e.g. `hsl(var(--primary))`). Use this module for programmatic
 * access, documentation generation, or storybook integration.
 */

import rawTokens from "./tokens.json";

export interface ColorToken {
  value: string;
  type: "color";
  rawSource: string;
  description: string;
  usage?: string[];
  pairedWith?: string[];
}

export interface GradientToken {
  value: string;
  type: "gradient";
  rawSource: string;
  description: string;
  usage?: string[];
  pairedWith?: string[];
}

export interface ShadowToken {
  value: string;
  type: "shadow";
  rawSource: string;
  description: string;
  usage?: string[];
  cssValue: string;
}

export interface TypographyValue {
  fontFamily: string;
  fontSize: string;
  fontWeight: number;
  letterSpacing: string;
  lineHeight: string;
  textTransform?: string;
  textDecoration?: string;
  fontStyle?: string;
}

export interface TypographyToken {
  value: TypographyValue;
  type: "typography";
  rawSource: string;
  description: string;
  usage?: string[];
}

export interface DimensionToken {
  value: string;
  type: "dimension";
  rawSource: string;
  description: string;
  usage?: string[];
}

export interface MetaToken {
  version: string;
  lastUpdated: string;
  description: string;
  fontStack: string;
  colorFormat: string;
  namingConvention: string;
}

export type DesignToken =
  | ColorToken
  | GradientToken
  | ShadowToken
  | TypographyToken
  | DimensionToken;

export type TokenKey = keyof typeof rawTokens;

/**
 * Full token map. Use dot-access or bracket-access with a TokenKey.
 *
 * @example
 * tokens["color-brand-primary"].value          // "#ff8136"
 * tokens["shadow-md"].cssValue                  // "0px 6px 10px 4px rgba(0,0,0,0.04)"
 * tokens["typography-headline-lg-semi"].value   // { fontSize: "48px", fontWeight: 600, ... }
 */
const tokens = rawTokens as Record<string, DesignToken> & { _meta: MetaToken };

export default tokens;

// ─── Convenience accessors ────────────────────────────────────────────────────

/** Returns all tokens of a given type */
export function getTokensByType<T extends DesignToken["type"]>(
  type: T
): Record<string, Extract<DesignToken, { type: T }>> {
  return Object.fromEntries(
    Object.entries(rawTokens)
      .filter(([, v]) => (v as DesignToken).type === type)
  ) as Record<string, Extract<DesignToken, { type: T }>>;
}

/** Returns all tokens whose key starts with a given prefix (e.g. "color-brand") */
export function getTokensByPrefix(prefix: string): Record<string, DesignToken> {
  return Object.fromEntries(
    Object.entries(rawTokens)
      .filter(([k]) => k.startsWith(prefix))
  ) as Record<string, DesignToken>;
}

/** Returns all color tokens */
export const colorTokens = getTokensByType("color");

/** Returns all typography tokens */
export const typographyTokens = getTokensByType("typography");

/** Returns all shadow tokens */
export const shadowTokens = getTokensByType("shadow");

/** Returns all gradient tokens */
export const gradientTokens = getTokensByType("gradient");
