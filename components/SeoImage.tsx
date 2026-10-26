'use client';

import { createContext, useContext, type ImgHTMLAttributes, type ReactNode } from 'react';
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

export default function SeoImage({ src = '', alt = '', ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const { imageAlts } = useSeoSettings();
  return <img {...props} src={src} alt={getImageAlt(imageAlts, src, alt)} />;
}
