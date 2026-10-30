import { NextResponse, type NextRequest } from 'next/server';

import { getPathLocale, ROUTE_LOCALE_HEADER, stripLocalePrefix } from './lib/i18n/routing';

/** Header with the language-free path, so server components (breadcrumbs, JSON-LD) know the current page. */
const ROUTE_PATH_HEADER = 'x-site-path';

/** Pages with personal data: never cached by the browser or a proxy. */
const PRIVATE_PATHS = ['/profile', '/booking', '/payment', '/login', '/register'];

/** Public pages are the same for every visitor, so browsers may reuse them for 10 minutes. */
const PUBLIC_PAGE_MAX_AGE = 600;

function isPrivatePath(path: string) {
  return PRIVATE_PATHS.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

/**
 * Cache-Control and Last-Modified for HTML pages (Beget audit). Pages are rendered on request
 * from API data that the server re-reads every few minutes, so Last-Modified is the start of
 * the current 10-minute cache window rather than one fixed date.
 */
function withCacheHeaders(response: NextResponse, path: string) {
  if (isPrivatePath(path)) {
    response.headers.set('Cache-Control', 'private, no-store');
    return response;
  }
  const windowMs = PUBLIC_PAGE_MAX_AGE * 1000;
  const lastModified = new Date(Math.floor(Date.now() / windowMs) * windowMs);
  response.headers.set('Cache-Control', `public, max-age=${PUBLIC_PAGE_MAX_AGE}, stale-while-revalidate=60`);
  response.headers.set('Last-Modified', lastModified.toUTCString());
  return response;
}

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
  const path = locale ? stripLocalePrefix(pathname) : pathname;
  const headers = new Headers(request.headers);
  headers.set(ROUTE_PATH_HEADER, path);

  // Next.js data requests for client-side navigation are not HTML pages.
  const isRscRequest = request.headers.get('rsc') === '1' || request.nextUrl.searchParams.has('_rsc');

  if (!locale) {
    const response = NextResponse.next({ request: { headers } });
    return isRscRequest ? response : withCacheHeaders(response, path);
  }

  const url = request.nextUrl.clone();
  url.pathname = path;
  headers.set(ROUTE_LOCALE_HEADER, locale);
  const response = NextResponse.rewrite(url, { request: { headers } });
  return isRscRequest ? response : withCacheHeaders(response, path);
}

export const config = {
  // Skip Next internals, the admin panel and any file with an extension (images, sitemap.xml, scripts…).
  matcher: ['/((?!_next/|api/|admin|.*\\.[a-zA-Z0-9]+$).*)'],
};
