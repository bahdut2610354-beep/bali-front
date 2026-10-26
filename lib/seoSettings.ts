/** Shared contract for the admin editor, server metadata and rendered images. */
export type SeoPageOverride = { title?: string; description?: string };
export type SeoSettings = {
  pages: Record<string, SeoPageOverride>;
  imageAlts: Record<string, string>;
};

export function readSeoSettings(overrides: unknown): SeoSettings {
  const seo = (overrides as { seo?: Partial<SeoSettings> } | null)?.seo;
  return { pages: seo?.pages || {}, imageAlts: seo?.imageAlts || {} };
}

// Keep the origin for external assets: two hosts may serve different images at the same path.
export function seoImageKey(src: string): string {
  const value = src.trim();
  try {
    const url = new URL(value, 'https://relative.invalid');
    return url.origin === 'https://relative.invalid' ? url.pathname : `${url.origin}${url.pathname}`;
  } catch {
    return value;
  }
}

export function getImageAlt(alts: Record<string, string>, src: string, fallback = ''): string {
  return alts[seoImageKey(src)] ?? fallback;
}
