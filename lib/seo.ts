import { cache } from 'react';
import { getImageAlt, readSeoSettings } from './seoSettings';
import type { Metadata } from 'next';

import { API_BASE, MEDIA_BASE } from './api';
import type {
  ApiBootstrap,
  ApiNewsArticle,
  ApiScooter,
  ApiScooterDetail,
  Paginated,
} from './endpoints';
import { PAGE_SETTINGS_DEFINITION_MAP, buildPageSettings, joinPagePath, normalizePagePath, type ManagedPageKey } from './pageSettings';
import { resolveScooterImage, resolveScooterRouteId } from './displayScooter';
import type { Locale } from './i18n/dictionaries';
import { getRequestLocale } from './i18n/requestLocale';
import { HREFLANG_BY_LOCALE, OG_LOCALE_BY_LOCALE, ROUTE_LOCALES, localizePath } from './i18n/routing';

const DEFAULT_SITE_URL = 'https://bali.bike';
const SITE_NAME = 'TROPICAL BIKES';
const DEFAULT_OG_IMAGE = '/logo1.svg';
const SEO_REVALIDATE_SECONDS = 60;

const INDEXED_PAGE_KEYS = ['home', 'catalog', 'prices', 'how', 'locations', 'contacts', 'news'] as const;
const NOINDEX_PAGE_KEYS = ['booking', 'payment', 'login', 'register', 'profile'] as const;

const PAGE_DESCRIPTION_MAP: Record<ManagedPageKey, string> = {
  home: 'Premium scooter rental in Bali with island-wide delivery, transparent pricing, and 24/7 support.',
  catalog: 'Browse our Bali scooter fleet, compare models, and choose the right bike for your trip.',
  prices: 'See scooter rental prices in Bali, compare rates, and find the best option for your stay.',
  how: 'Learn how TROPICAL BIKES delivery, booking, payments, and support work before your ride starts.',
  locations: 'Explore delivery areas across Bali and see where your scooter can be brought to you.',
  contacts: 'Contact TROPICAL BIKES in Bali by WhatsApp, Telegram, support chat, or office address.',
  news: 'Travel updates, rental tips, and the latest TROPICAL BIKES news from Bali.',
  booking: 'Complete your scooter booking details and confirm your Bali rental.',
  payment: 'Review and complete payment for your Bali scooter rental booking.',
  login: 'Sign in to manage your scooter rental bookings and account details.',
  register: 'Create your TROPICAL BIKES account to book and manage scooter rentals in Bali.',
  profile: 'Manage your TROPICAL BIKES profile, bookings, and support conversations.',
};

type IndexedPageKey = (typeof INDEXED_PAGE_KEYS)[number];

/** Search-result descriptions for the other site languages (English is PAGE_DESCRIPTION_MAP). */
const LOCALIZED_PAGE_DESCRIPTIONS: Record<Exclude<Locale, 'en'>, Record<IndexedPageKey, string>> = {
  ru: {
    home: 'Аренда скутеров на Бали от TROPICAL BIKES: доставка по всему острову, честные цены без скрытых платежей и поддержка 24/7.',
    catalog: 'Каталог скутеров TROPICAL BIKES на Бали: Honda PCX, Yamaha NMAX, XMAX, Fazzio и другие. Сравните модели и забронируйте онлайн.',
    prices: 'Цены на аренду скутеров на Бали: посуточно, на неделю и на месяц. Прозрачные тарифы TROPICAL BIKES без скрытых платежей.',
    how: 'Как арендовать скутер на Бали в TROPICAL BIKES: бронирование, доставка, оплата и поддержка — всё по шагам.',
    locations: 'Районы доставки скутеров по Бали: Чангу, Семиньяк, Кута, Убуд и Букит (Нуса-Дуа). Привезём скутер туда, где вы живёте.',
    contacts: 'Контакты TROPICAL BIKES на Бали: WhatsApp, Telegram, чат поддержки и адрес офиса в Семиньяке.',
    news: 'Новости TROPICAL BIKES, советы по аренде скутеров и поездкам по Бали.',
  },
  zh: {
    home: 'TROPICAL BIKES 巴厘岛摩托车租赁：全岛送车上门，价格透明无隐藏费用，24/7 客服支持。',
    catalog: '浏览 TROPICAL BIKES 巴厘岛摩托车车队：Honda PCX、Yamaha NMAX、XMAX、Fazzio 等，在线比较并预订。',
    prices: '巴厘岛摩托车租赁价格：按天、按周、按月计费。TROPICAL BIKES 价格透明，无隐藏费用。',
    how: '了解在 TROPICAL BIKES 租摩托车的流程：预订、送车、付款和客服支持。',
    locations: '巴厘岛送车区域：长谷、水明漾、库塔、乌布和布基特（努沙杜瓦），我们把摩托车送到您的住处。',
    contacts: '联系 TROPICAL BIKES：WhatsApp、Telegram、在线客服及水明漾办公室地址。',
    news: 'TROPICAL BIKES 最新动态、巴厘岛摩托车租赁与出行小贴士。',
  },
  id: {
    home: 'Sewa skuter di Bali bersama TROPICAL BIKES: antar ke seluruh pulau, harga transparan tanpa biaya tersembunyi, dan dukungan 24/7.',
    catalog: 'Lihat armada skuter TROPICAL BIKES di Bali: Honda PCX, Yamaha NMAX, XMAX, Fazzio, dan lainnya. Bandingkan dan pesan online.',
    prices: 'Harga sewa skuter di Bali: harian, mingguan, dan bulanan. Tarif TROPICAL BIKES transparan tanpa biaya tersembunyi.',
    how: 'Cara sewa skuter di TROPICAL BIKES: pemesanan, pengantaran, pembayaran, dan dukungan langkah demi langkah.',
    locations: 'Area pengantaran skuter di Bali: Canggu, Seminyak, Kuta, Ubud, dan Bukit (Nusa Dua). Kami antar ke tempat Anda menginap.',
    contacts: 'Hubungi TROPICAL BIKES di Bali lewat WhatsApp, Telegram, chat support, atau kunjungi kantor kami di Seminyak.',
    news: 'Berita TROPICAL BIKES serta tips sewa skuter dan berkendara di Bali.',
  },
  de: {
    home: 'Rollerverleih auf Bali mit TROPICAL BIKES: Lieferung auf der ganzen Insel, transparente Preise ohne versteckte Kosten und 24/7-Support.',
    catalog: 'Die Rollerflotte von TROPICAL BIKES auf Bali: Honda PCX, Yamaha NMAX, XMAX, Fazzio und mehr. Modelle vergleichen und online buchen.',
    prices: 'Preise für den Rollerverleih auf Bali: pro Tag, Woche oder Monat. Transparente Tarife von TROPICAL BIKES ohne versteckte Kosten.',
    how: 'So funktioniert der Rollerverleih bei TROPICAL BIKES: Buchung, Lieferung, Bezahlung und Support Schritt für Schritt.',
    locations: 'Liefergebiete auf Bali: Canggu, Seminyak, Kuta, Ubud und Bukit (Nusa Dua). Wir bringen den Roller zu deiner Unterkunft.',
    contacts: 'Kontakt zu TROPICAL BIKES auf Bali: WhatsApp, Telegram, Support-Chat und Büroadresse in Seminyak.',
    news: 'Neuigkeiten von TROPICAL BIKES sowie Tipps zum Rollerverleih und Fahren auf Bali.',
  },
  fr: {
    home: 'Location de scooters à Bali avec TROPICAL BIKES : livraison sur toute l’île, prix transparents sans frais cachés et assistance 24h/24.',
    catalog: 'La flotte de scooters TROPICAL BIKES à Bali : Honda PCX, Yamaha NMAX, XMAX, Fazzio et plus. Comparez et réservez en ligne.',
    prices: 'Prix de location de scooters à Bali : à la journée, à la semaine ou au mois. Tarifs TROPICAL BIKES transparents, sans frais cachés.',
    how: 'Comment louer un scooter chez TROPICAL BIKES : réservation, livraison, paiement et assistance, étape par étape.',
    locations: 'Zones de livraison à Bali : Canggu, Seminyak, Kuta, Ubud et Bukit (Nusa Dua). Nous livrons le scooter là où vous logez.',
    contacts: 'Contactez TROPICAL BIKES à Bali par WhatsApp, Telegram, chat d’assistance ou à notre bureau de Seminyak.',
    news: 'Actualités TROPICAL BIKES et conseils pour louer un scooter et rouler à Bali.',
  },
};

const SCOOTER_TITLE_TEMPLATES: Record<Locale, (name: string) => string> = {
  en: (name) => `${name} rental in Bali · ${SITE_NAME}`,
  ru: (name) => `Аренда ${name} на Бали · ${SITE_NAME}`,
  zh: (name) => `巴厘岛 ${name} 租赁 · ${SITE_NAME}`,
  id: (name) => `Sewa ${name} di Bali · ${SITE_NAME}`,
  de: (name) => `${name} mieten auf Bali · ${SITE_NAME}`,
  fr: (name) => `Location ${name} à Bali · ${SITE_NAME}`,
};

const SCOOTER_DESCRIPTION_TEMPLATES: Record<Locale, (name: string) => string> = {
  en: (name) => `Rent the ${name} in Bali with delivery, transparent pricing, and quick online booking.`,
  ru: (name) => `Аренда ${name} на Бали с доставкой, прозрачными ценами и быстрым онлайн-бронированием.`,
  zh: (name) => `在巴厘岛租赁 ${name}，送车上门，价格透明，在线快速预订。`,
  id: (name) => `Sewa ${name} di Bali dengan pengantaran, harga transparan, dan pemesanan online yang cepat.`,
  de: (name) => `Miete den ${name} auf Bali – mit Lieferung, transparenten Preisen und schneller Online-Buchung.`,
  fr: (name) => `Louez le ${name} à Bali avec livraison, prix transparents et réservation en ligne rapide.`,
};

function getPageDescription(pageKey: ManagedPageKey, locale: Locale): string {
  if (locale !== 'en') {
    const localized = LOCALIZED_PAGE_DESCRIPTIONS[locale]?.[pageKey as IndexedPageKey];
    if (localized) return localized;
  }
  return PAGE_DESCRIPTION_MAP[pageKey];
}

/** Canonical URL for the current language plus hreflang links to every language version. */
function buildAlternates(path: string, locale: Locale): NonNullable<Metadata['alternates']> {
  const languages: Record<string, string> = {};
  for (const code of ROUTE_LOCALES) {
    languages[HREFLANG_BY_LOCALE[code]] = toAbsoluteUrl(localizePath(path, code));
  }
  languages['x-default'] = toAbsoluteUrl(localizePath(path, 'en'));
  return { canonical: toAbsoluteUrl(localizePath(path, locale)), languages };
}

function localizedOpenGraphLocale(locale: Locale) {
  return {
    locale: OG_LOCALE_BY_LOCALE[locale],
    alternateLocale: ROUTE_LOCALES.filter((code) => code !== locale).map((code) => OG_LOCALE_BY_LOCALE[code]),
  };
}

type SeoImage = {
  url: string;
  alt?: string;
};

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, '');
}

function normalizeSiteUrl(value?: string) {
  const raw = (value || DEFAULT_SITE_URL).trim();
  if (!raw) return DEFAULT_SITE_URL;
  return trimTrailingSlash(raw);
}

function collapseWhitespace(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

export function getSiteUrl() {
  return normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
}

export function toAbsoluteUrl(path = '/') {
  const normalizedPath = normalizePagePath(path, '/');
  return new URL(normalizedPath, `${getSiteUrl()}/`).toString();
}

export function toAbsoluteMediaUrl(path?: string | null) {
  if (!path) return undefined;
  if (/^https?:\/\//i.test(path)) return path;
  const base = trimTrailingSlash(MEDIA_BASE || getSiteUrl());
  return `${base}${path.startsWith('/') ? '' : '/'}${path}`;
}

export function createSeoDescription(value?: string | null, fallback?: string) {
  const normalized = collapseWhitespace(String(value || fallback || '').replace(/<[^>]*>/g, ' '));
  if (!normalized) return fallback || '';
  if (normalized.length <= 160) return normalized;
  return `${normalized.slice(0, 157).trimEnd()}...`;
}

function buildApiUrl(path: string, query?: Record<string, string | number | undefined>) {
  const url = new URL(path.startsWith('http') ? path : `${API_BASE}${path}`);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, String(value));
      }
    }
  }
  return url.toString();
}

async function fetchApiJson<T>(path: string, options?: { lang?: string; query?: Record<string, string | number | undefined> }) {
  const response = await fetch(buildApiUrl(path, options?.query), {
    headers: {
      Accept: 'application/json',
      ...(options?.lang ? { 'Accept-Language': options.lang } : {}),
    },
    next: { revalidate: SEO_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`SEO API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const getSeoBootstrap = cache(async () => {
  try {
    return await fetchApiJson<ApiBootstrap>('/public/bootstrap/', { lang: 'en' });
  } catch {
    return null;
  }
});

export const getSeoPageSettings = cache(async () => {
  const bootstrap = await getSeoBootstrap();
  return buildPageSettings('en', bootstrap?.pageSettings);
});

export const getSeoSettings = cache(async () => {
  const bootstrap = await getSeoBootstrap();
  return readSeoSettings(bootstrap?.dictionaryOverrides);
});

export const getNewsArticleForSeo = cache(async (slug: string, locale: Locale = 'en') => {
  return fetchApiJson<ApiNewsArticle>(`/news/${slug}/`, {
    lang: locale,
    query: { lang: locale },
  });
});

export const getScooterForSeo = cache(async (idOrSlug: string, locale: Locale = 'en') => {
  return fetchApiJson<ApiScooterDetail>(`/scooters/${idOrSlug}/`, {
    lang: locale,
    query: { lang: locale },
  });
});

export const getSitemapNewsArticles = cache(async () => {
  const response = await fetchApiJson<Paginated<ApiNewsArticle> | ApiNewsArticle[]>('/news/', {
    lang: 'en',
    query: { page: 1, page_size: 500, lang: 'en' },
  });
  return Array.isArray(response) ? response : response.results || [];
});

export const getSitemapScooters = cache(async () => {
  const response = await fetchApiJson<Paginated<ApiScooter> | ApiScooter[]>('/scooters/', {
    lang: 'en',
    query: { page: 1, page_size: 500 },
  });
  return Array.isArray(response) ? response : response.results || [];
});

function defaultImages(title: string, alts: Record<string, string> = {}): SeoImage[] {
  return [{ url: toAbsoluteUrl(DEFAULT_OG_IMAGE), alt: getImageAlt(alts, DEFAULT_OG_IMAGE, title) }];
}

function buildRobots(index: boolean): NonNullable<Metadata['robots']> {
  if (!index) {
    return {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
        'max-image-preview': 'none',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    };
  }

  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  };
}

export function shouldIndexManagedPage(pageKey: ManagedPageKey) {
  return INDEXED_PAGE_KEYS.includes(pageKey as (typeof INDEXED_PAGE_KEYS)[number]);
}

export async function buildManagedPageMetadata(
  pageKey: ManagedPageKey,
  options?: {
    canonicalPath?: string;
    title?: string;
    description?: string;
    images?: SeoImage[];
    index?: boolean;
  }
): Promise<Metadata> {
  const locale = getRequestLocale();
  const pageSettings = await getSeoPageSettings();
  const definition = PAGE_SETTINGS_DEFINITION_MAP[pageKey];
  const canonicalPath = normalizePagePath(options?.canonicalPath, pageSettings[pageKey].path);
  const seo = await getSeoSettings();
  // Admin SEO overrides are written in English, so they only apply to the English pages.
  const override = locale === 'en' ? seo.pages[pageKey] : undefined;
  const title = options?.title || override?.title?.trim()
    || (locale === 'en' ? pageSettings[pageKey].title : definition.defaultTitles[locale] || pageSettings[pageKey].title);
  const description = override?.description?.trim()
    || createSeoDescription(options?.description, getPageDescription(pageKey, locale) || definition.description);
  const images = (options?.images?.length ? options.images : defaultImages(title, seo.imageAlts)).map(image => ({ ...image, alt: getImageAlt(seo.imageAlts, image.url, image.alt || title) }));
  const index = options?.index ?? shouldIndexManagedPage(pageKey);

  return {
    title,
    description,
    alternates: buildAlternates(canonicalPath, locale),
    openGraph: {
      title,
      description,
      url: toAbsoluteUrl(localizePath(canonicalPath, locale)),
      siteName: SITE_NAME,
      type: 'website',
      ...localizedOpenGraphLocale(locale),
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images.map((image) => (typeof image === 'string' ? image : image.url)),
    },
    robots: buildRobots(index),
  };
}

export async function buildNewsArticleMetadata(slug: string, canonicalPath?: string): Promise<Metadata> {
  const locale = getRequestLocale();
  const pageSettings = await getSeoPageSettings();

  try {
    const article = await getNewsArticleForSeo(slug, locale);
    const path = normalizePagePath(canonicalPath, joinPagePath(pageSettings.news.path, article.slug || slug));
    const seo = await getSeoSettings();
    const override = locale === 'en' ? seo.pages[`news_${article.id}`] : undefined;
    const title = override?.title?.trim() || `${article.title} · ${SITE_NAME}`;
    const description = override?.description?.trim() || createSeoDescription(article.description, getPageDescription('news', locale));
    const image = toAbsoluteMediaUrl(article.image);
    const images = image ? [{ url: image, alt: getImageAlt(seo.imageAlts, image, article.title) }] : defaultImages(title, seo.imageAlts);

    return {
      title,
      description,
      alternates: buildAlternates(path, locale),
      openGraph: {
        title,
        description,
        url: toAbsoluteUrl(localizePath(path, locale)),
        siteName: SITE_NAME,
        type: 'article',
        ...localizedOpenGraphLocale(locale),
        publishedTime: article.published_at,
        images,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: images.map((item) => item.url),
      },
      robots: buildRobots(true),
    };
  } catch {
    return buildManagedPageMetadata('news', {
      canonicalPath: canonicalPath || joinPagePath(pageSettings.news.path, slug),
      title: `News Article · ${SITE_NAME}`,
      description: PAGE_DESCRIPTION_MAP.news,
      index: false,
    });
  }
}

export async function buildScooterMetadata(idOrSlug: string): Promise<Metadata> {
  const locale = getRequestLocale();
  try {
    const scooter = await getScooterForSeo(idOrSlug, locale);
    const routeId = resolveScooterRouteId(scooter.slug || scooter.id, scooter.title) || String(scooter.slug || scooter.id || idOrSlug);
    const path = `/scooter/${routeId}`;
    const seo = await getSeoSettings();
    const override = locale === 'en' ? seo.pages[`scooter_${scooter.id}`] : undefined;
    const title = override?.title?.trim() || SCOOTER_TITLE_TEMPLATES[locale](scooter.title);
    const description = override?.description?.trim() || createSeoDescription(
      scooter.full_description || scooter.short_description,
      SCOOTER_DESCRIPTION_TEMPLATES[locale](scooter.title)
    );
    const image = toAbsoluteMediaUrl(scooter.main_image) || resolveScooterImage(scooter.slug || scooter.id, scooter.title);
    const images = image ? [{ url: /^https?:\/\//i.test(image) ? image : toAbsoluteUrl(image), alt: getImageAlt(seo.imageAlts, image, scooter.title) }] : defaultImages(title, seo.imageAlts);

    return {
      title,
      description,
      alternates: buildAlternates(path, locale),
      openGraph: {
        title,
        description,
        url: toAbsoluteUrl(localizePath(path, locale)),
        siteName: SITE_NAME,
        type: 'website',
        ...localizedOpenGraphLocale(locale),
        images,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: images.map((item) => item.url),
      },
      robots: buildRobots(true),
    };
  } catch {
    return {
      title: `Scooter Rental · ${SITE_NAME}`,
      description: PAGE_DESCRIPTION_MAP.catalog,
      alternates: {
        canonical: localizePath(`/scooter/${idOrSlug}`, locale),
      },
      robots: buildRobots(false),
    };
  }
}

export async function getSitemapStaticEntries() {
  const pageSettings = await getSeoPageSettings();
  const now = new Date();

  return INDEXED_PAGE_KEYS.flatMap((pageKey) => {
    const definition = PAGE_SETTINGS_DEFINITION_MAP[pageKey];
    return ROUTE_LOCALES.map((locale) => ({
      url: toAbsoluteUrl(localizePath(pageSettings[pageKey].path, locale)),
      lastModified: now,
      changeFrequency: pageKey === 'news' ? 'daily' : 'weekly',
      priority: definition.key === 'home' ? 1 : definition.key === 'catalog' ? 0.9 : 0.8,
    } as const));
  });
}

export async function getNewsBasePath() {
  const pageSettings = await getSeoPageSettings();
  return pageSettings.news.path;
}

export { NOINDEX_PAGE_KEYS, SITE_NAME };

type SiteSettingsOverrides = {
  addresses?: Partial<Record<'businessName' | 'street' | 'district' | 'postalCode' | 'country', string>>;
  socialLinks?: Partial<Record<string, string>>;
};

function phoneFromWhatsApp(link?: string): string | undefined {
  const digits = String(link || '').match(/wa\.me\/(\d{8,15})/)?.[1];
  return digits ? `+${digits}` : undefined;
}

/** schema.org data about the business (shown by Google next to search results). Built from the admin site settings. */
export async function buildBusinessJsonLd(locale: Locale = 'en') {
  const bootstrap = await getSeoBootstrap();
  const settings = ((bootstrap?.dictionaryOverrides as { settings?: SiteSettingsOverrides } | undefined)?.settings) || {};
  const address = settings.addresses || {};
  const social = settings.socialLinks || {};
  const siteUrl = getSiteUrl();
  const sameAs = ['instagram', 'facebook', 'tiktok', 'youtube', 'telegram']
    .map((key) => social[key]?.trim())
    .filter((value): value is string => Boolean(value));
  const district = String(address.district || '').split(',')[0].trim();

  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRental',
    '@id': `${siteUrl}/#business`,
    name: address.businessName?.trim() || SITE_NAME,
    url: toAbsoluteUrl(localizePath('/', locale)),
    logo: toAbsoluteUrl('/logo-tropical-bikes.png'),
    image: toAbsoluteUrl('/logo-tropical-bikes.png'),
    description: getPageDescription('home', locale),
    telephone: phoneFromWhatsApp(social.whatsapp),
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street?.trim() || undefined,
      addressLocality: district ? district.charAt(0) + district.slice(1).toLowerCase() : undefined,
      addressRegion: 'Bali',
      postalCode: address.postalCode?.trim() || undefined,
      addressCountry: 'ID',
    },
    areaServed: { '@type': 'AdministrativeArea', name: 'Bali' },
    currenciesAccepted: 'IDR',
    availableLanguage: ['en', 'ru', 'id', 'zh', 'de', 'fr'],
    sameAs: sameAs.length ? sameAs : undefined,
  };
}

/** schema.org Product + Offer for a scooter page: name, photo and daily price in IDR. */
export async function buildScooterJsonLd(idOrSlug: string, locale: Locale = 'en') {
  try {
    const scooter = await getScooterForSeo(idOrSlug, locale);
    const routeId = resolveScooterRouteId(scooter.slug || scooter.id, scooter.title) || String(scooter.slug || scooter.id || idOrSlug);
    const url = toAbsoluteUrl(localizePath(`/scooter/${routeId}`, locale));
    const image = toAbsoluteMediaUrl(scooter.main_image) || resolveScooterImage(scooter.slug || scooter.id, scooter.title);
    const priceIdr = Number(scooter.price_per_day_idr ?? scooter.base_price_idr ?? 0);
    const brand = String(scooter.title || '').trim().split(/\s+/)[0];
    const description = createSeoDescription(
      scooter.full_description || scooter.short_description,
      SCOOTER_DESCRIPTION_TEMPLATES[locale](scooter.title)
    );

    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: scooter.title,
      description,
      url,
      image: image ? [/^https?:\/\//i.test(image) ? image : toAbsoluteUrl(image)] : undefined,
      brand: brand ? { '@type': 'Brand', name: brand } : undefined,
      category: 'Scooter rental',
      offers: priceIdr > 0 ? {
        '@type': 'Offer',
        url,
        priceCurrency: 'IDR',
        price: Math.round(priceIdr),
        availability: scooter.is_available === false ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
        seller: { '@id': `${getSiteUrl()}/#business` },
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: Math.round(priceIdr),
          priceCurrency: 'IDR',
          unitCode: 'DAY',
        },
      } : undefined,
    };
  } catch {
    return null;
  }
}

/** Safe `<script type="application/ld+json">` body. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
