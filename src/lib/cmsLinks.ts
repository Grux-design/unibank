const UNIBANK_HOST = "unibank.com.pa";
const UNIBANK_HOST_SUFFIX = `.${UNIBANK_HOST}`;

/**
 * Trusted non-Unibank hosts used by CMS hero/banner CTAs
 * (e.g. "Contactar a un asesor" on product pages).
 */
const ALLOWED_EXTERNAL_HOSTS = new Set([
  "api.whatsapp.com",
  "wa.me",
  "whatsapp.com",
  "www.whatsapp.com",
]);

/** Internal paths that resolve to SPA 404 / LegalPage in production. */
const BLOCKED_INTERNAL_PATHS = new Set([
  "/login",
  "/cuenta-ahorros",
  "/cuenta-juridica",
  "/personas",
  "/empresas",
]);

function normalizePath(path: string): string {
  const withoutQuery = path.split(/[?#]/)[0];
  if (withoutQuery.length > 1 && withoutQuery.endsWith("/")) {
    return withoutQuery.slice(0, -1);
  }
  return withoutQuery;
}

function isUnibankHostname(hostname: string): boolean {
  const host = hostname.toLowerCase();
  return host === UNIBANK_HOST || host.endsWith(UNIBANK_HOST_SUFFIX);
}

function isAllowedExternalHostname(hostname: string): boolean {
  return ALLOWED_EXTERNAL_HOSTS.has(hostname.toLowerCase());
}

function isMainUnibankSiteHostname(hostname: string): boolean {
  const host = hostname.toLowerCase();
  return host === UNIBANK_HOST || host === `www.${UNIBANK_HOST}`;
}

export function isExternalCmsHref(href: string): boolean {
  return href.startsWith("http") || href.startsWith("mailto");
}

export function isAllowedCmsHref(href?: string | null): href is string {
  if (!href) return false;

  const trimmed = href.trim();
  if (!trimmed || trimmed === "#") return false;

  if (trimmed.startsWith("mailto:")) {
    return trimmed.toLowerCase().includes(`@${UNIBANK_HOST}`);
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    try {
      const url = new URL(trimmed);
      return isUnibankHostname(url.hostname) || isAllowedExternalHostname(url.hostname);
    } catch {
      return false;
    }
  }

  if (!trimmed.startsWith("/")) return false;

  const pathOnly = normalizePath(trimmed);
  return !BLOCKED_INTERNAL_PATHS.has(pathOnly);
}

/** Normalize CMS href for rendering; returns undefined when the link must be hidden. */
export function getCmsCtaHref(href?: string | null): string | undefined {
  if (!isAllowedCmsHref(href)) return undefined;

  const trimmed = href.trim();

  if (!trimmed.startsWith("http")) return trimmed;

  try {
    const url = new URL(trimmed);
    if (isMainUnibankSiteHostname(url.hostname)) {
      const internal = `${url.pathname}${url.search}${url.hash}`;
      if (!internal || internal === "/") return undefined;
      return isAllowedCmsHref(internal) ? internal : undefined;
    }
  } catch {
    return undefined;
  }

  return trimmed;
}

export function filterCmsCtaItems<T extends { link?: string }>(items?: T[]): T[] {
  return items?.filter((item) => getCmsCtaHref(item.link) !== undefined) ?? [];
}

export function findCmsCtaItem<T extends { link?: string }>(items?: T[]): T | undefined {
  return items?.find((item) => getCmsCtaHref(item.link) !== undefined);
}
