import { NextResponse, type NextRequest } from 'next/server';

import { getPathLocale, ROUTE_LOCALE_HEADER, stripLocalePrefix } from './lib/i18n/routing';

/**
 * Language URLs: `/ru/catalog` is served by the same page as `/catalog`, with the
 * language passed on in a request header so the server renders it in Russian.
 * `/en/...` is redirected to the unprefixed English URL so each page has one address.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || '/';
    return NextResponse.redirect(url, 308);
  }

  const locale = getPathLocale(pathname);
  if (!locale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = stripLocalePrefix(pathname);

  const headers = new Headers(request.headers);
  headers.set(ROUTE_LOCALE_HEADER, locale);
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  // Skip Next internals, the admin panel and any file with an extension (images, sitemap.xml, scripts…).
  matcher: ['/((?!_next/|api/|admin|.*\\.[a-zA-Z0-9]+$).*)'],
};
