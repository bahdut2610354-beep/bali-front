/** @type {import('next').NextConfig} */

/**
 * Security headers for every response (Beget audit: X-Frame-Options, X-Content-Type-Options, CSP, HSTS).
 * The CSP only restricts framing, plugins, <base> and mixed content, so Google Tag Manager,
 * Analytics, Ads, fonts and the API keep working without a script allow-list.
 */
const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()' },
  {
    key: 'Content-Security-Policy',
    value: "frame-ancestors 'self'; base-uri 'self'; object-src 'none'; form-action 'self' https:; upgrade-insecure-requests",
  },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  env: {
    // Date of the deployed build, used as dateModified for pages whose text ships with the code.
    NEXT_PUBLIC_BUILD_DATE: new Date().toISOString(),
  },
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 7,
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'http', hostname: '127.0.0.1' },
      { protocol: 'https', hostname: '**' },
    ],
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      {
        // Files from /public (logo, flags, OG image): cache for a week.
        source: '/:file((?!_next/).*\\.(?:png|jpg|jpeg|webp|avif|svg|ico|webmanifest))',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }],
      },
    ];
  },
};

module.exports = nextConfig;
