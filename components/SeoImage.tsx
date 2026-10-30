'use client';

import { createContext, useContext, useState, type ImgHTMLAttributes, type ReactNode } from 'react';
import { getImageAlt, type SeoSettings } from '@/lib/seoSettings';

const SeoContext = createContext<SeoSettings>({ pages: {}, imageAlts: {} });

export function SeoProvider({ settings, children }: { settings: SeoSettings; children: ReactNode }) {
  return <SeoContext.Provider value={settings}>{children}</SeoContext.Provider>;
}

export function useSeoSettings() {
  // Use the same server snapshot as the metadata. A cached locale bootstrap
  // in sessionStorage must not replace freshly saved SEO values after hydration.
  return useContext(SeoContext);
}

/** Widths the Next image optimizer is allowed to produce (subset of its default sizes). */
const WEBP_WIDTHS = [384, 640, 1080, 1920];
const DEFAULT_SIZES = '(max-width: 768px) 100vw, 50vw';

/** JPEG/PNG from this site or the media server; SVG, WebP, AVIF, data: and blob: are served as is. */
function canConvertToWebp(src: string) {
  if (!src || /^(data|blob):/i.test(src)) return false;
  if (!src.startsWith('/') && !/^https?:\/\//i.test(src)) return false;
  if (src.startsWith('/_next/')) return false;
  const path = src.split(/[?#]/)[0].toLowerCase();
  return /\.(jpe?g|png)$/.test(path);
}

function webpSrcSet(src: string) {
  return WEBP_WIDTHS.map((width) => `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=80 ${width}w`).join(', ');
}

/**
 * Image with admin-managed alt text. Loads lazily by default (pass `loading="eager"` for the
 * first screen) and offers a WebP version through `<picture>`, falling back to the original file.
 */
export default function SeoImage({ src = '', alt = '', loading, decoding, sizes, onError, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const { imageAlts } = useSeoSettings();
  const [webpFailed, setWebpFailed] = useState(false);
  const img = (
    <img
      {...props}
      src={src}
      alt={getImageAlt(imageAlts, src, alt)}
      loading={loading || 'lazy'}
      decoding={decoding || 'async'}
      onError={(event) => {
        if (!webpFailed && canConvertToWebp(src)) setWebpFailed(true);
        onError?.(event);
      }}
    />
  );

  if (webpFailed || !canConvertToWebp(src)) return img;

  return (
    <picture style={{ display: 'contents' }}>
      <source type="image/webp" srcSet={webpSrcSet(src)} sizes={sizes || DEFAULT_SIZES} />
      {img}
    </picture>
  );
}
