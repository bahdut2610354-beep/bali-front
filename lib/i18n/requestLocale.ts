import { headers } from 'next/headers';

import type { Locale } from './dictionaries';
import { isRouteLocale, ROUTE_LOCALE_HEADER } from './routing';

/** Server-only: the language of the current URL (`/ru/...` → `ru`), or null for English URLs. */
export function getRequestRouteLocale(): Locale | null {
  try {
    const value = headers().get(ROUTE_LOCALE_HEADER);
    return isRouteLocale(value) && value !== 'en' ? value : null;
  } catch {
    return null;
  }
}

export function getRequestLocale(): Locale {
  return getRequestRouteLocale() || 'en';
}
