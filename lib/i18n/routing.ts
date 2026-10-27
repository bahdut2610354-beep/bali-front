import type { Locale } from './dictionaries';

/** English lives at the unprefixed URLs; every other language gets its own URL prefix. */
export const DEFAULT_ROUTE_LOCALE: Locale = 'en';
export const ROUTE_LOCALES: Locale[] = ['en', 'ru', 'zh', 'id', 'de', 'fr'];
export const PREFIXED_ROUTE_LOCALES: Locale[] = ROUTE_LOCALES.filter((code) => code !== DEFAULT_ROUTE_LOCALE);

/** Header the middleware sets on rewritten requests so server code knows the URL language. */
export const ROUTE_LOCALE_HEADER = 'x-site-locale';

/** hreflang codes Google expects for each site language. */
export const HREFLANG_BY_LOCALE: Record<Locale, string> = {
  en: 'en',
  ru: 'ru',
  zh: 'zh-Hans',
  id: 'id',
  de: 'de',
  fr: 'fr',
};

export const OG_LOCALE_BY_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  ru: 'ru_RU',
  zh: 'zh_CN',
  id: 'id_ID',
  de: 'de_DE',
  fr: 'fr_FR',
};

export function isRouteLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (ROUTE_LOCALES as string[]).includes(value);
}

/** Returns the language prefix of a pathname (`/ru/catalog` → `ru`), or null for English URLs. */
export function getPathLocale(pathname: string): Locale | null {
  const segment = pathname.split('/')[1] || '';
  return (PREFIXED_ROUTE_LOCALES as string[]).includes(segment) ? (segment as Locale) : null;
}

/** Removes a language prefix: `/ru/catalog` → `/catalog`, `/ru` → `/`. */
export function stripLocalePrefix(pathname: string): string {
  const locale = getPathLocale(pathname);
  if (!locale) return pathname || '/';
  const rest = pathname.slice(locale.length + 1);
  return rest.startsWith('/') ? rest : `/${rest}`;
}

/** Adds the language prefix for a path: (`/catalog`, `ru`) → `/ru/catalog`, (`/`, `ru`) → `/ru`. */
export function localizePath(path: string, locale: Locale | null | undefined): string {
  const base = stripLocalePrefix(path.startsWith('/') ? path : `/${path}`);
  if (!locale || locale === DEFAULT_ROUTE_LOCALE) return base;
  return base === '/' ? `/${locale}` : `/${locale}${base}`;
}
