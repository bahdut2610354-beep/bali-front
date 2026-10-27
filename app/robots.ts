import type { MetadataRoute } from 'next';

import { getSiteUrl } from '@/lib/seo';
import { PREFIXED_ROUTE_LOCALES } from '@/lib/i18n/routing';

const PRIVATE_PATHS = ['/profile', '/booking', '/payment', '/login', '/register'];

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          ...PRIVATE_PATHS,
          ...PREFIXED_ROUTE_LOCALES.flatMap((locale) => PRIVATE_PATHS.map((path) => `/${locale}${path}`)),
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}

