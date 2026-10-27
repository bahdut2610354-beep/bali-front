import type { Locale } from './i18n/dictionaries';

export type ManagedPageKey =
  | 'home'
  | 'catalog'
  | 'prices'
  | 'how'
  | 'locations'
  | 'contacts'
  | 'news'
  | 'booking'
  | 'payment'
  | 'login'
  | 'register'
  | 'profile';

export type PageSettingValue = {
  path: string;
  title: string;
};

export type PageSettingDefinition = {
  key: ManagedPageKey;
  label: string;
  description: string;
  defaultPath: string;
  supportsChildren?: boolean;
  defaultTitles: Record<Locale, string>;
};

export type PageSettingsMap = Record<ManagedPageKey, PageSettingValue>;

export const PAGE_SETTINGS_DEFINITIONS: PageSettingDefinition[] = [
  {
    key: 'home',
    label: 'Home',
    description: 'Main landing page and brand homepage.',
    defaultPath: '/',
    defaultTitles: {
      en: 'TROPICAL BIKES · Premium scooter rental in Bali',
      ru: 'TROPICAL BIKES · Премиальная аренда скутеров на Бали',
      zh: 'TROPICAL BIKES · 巴厘岛高端摩托车租赁',
      id: 'TROPICAL BIKES · Sewa skuter premium di Bali',
      de: 'TROPICAL BIKES · Premium-Rollerverleih auf Bali',
      fr: 'TROPICAL BIKES · Location de scooters premium à Bali',
    },
  },
  {
    key: 'catalog',
    label: 'Catalog',
    description: 'Fleet list with filters and scooter cards.',
    defaultPath: '/catalog',
    defaultTitles: {
      en: 'Catalog · TROPICAL BIKES',
      ru: 'Каталог · TROPICAL BIKES',
      zh: '目录 · TROPICAL BIKES',
      id: 'Katalog · TROPICAL BIKES',
      de: 'Katalog · TROPICAL BIKES',
      fr: 'Catalogue · TROPICAL BIKES',
    },
  },
  {
    key: 'prices',
    label: 'Prices',
    description: 'Pricing overview and rate comparison page.',
    defaultPath: '/prices',
    defaultTitles: {
      en: 'Prices · TROPICAL BIKES',
      ru: 'Цены · TROPICAL BIKES',
      zh: '价格 · TROPICAL BIKES',
      id: 'Harga · TROPICAL BIKES',
      de: 'Preise · TROPICAL BIKES',
      fr: 'Tarifs · TROPICAL BIKES',
    },
  },
  {
    key: 'how',
    label: 'How It Works',
    description: 'Process, trust, delivery, and CTA page.',
    defaultPath: '/how-it-works',
    defaultTitles: {
      en: 'How It Works · TROPICAL BIKES',
      ru: 'Как это работает · TROPICAL BIKES',
      zh: '运作方式 · TROPICAL BIKES',
      id: 'Cara Kerja · TROPICAL BIKES',
      de: 'So funktioniert es · TROPICAL BIKES',
      fr: 'Comment ça marche · TROPICAL BIKES',
    },
  },
  {
    key: 'locations',
    label: 'Locations',
    description: 'Delivery zones and map page.',
    defaultPath: '/locations',
    defaultTitles: {
      en: 'Locations · TROPICAL BIKES',
      ru: 'Локации · TROPICAL BIKES',
      zh: '地点 · TROPICAL BIKES',
      id: 'Lokasi · TROPICAL BIKES',
      de: 'Standorte · TROPICAL BIKES',
      fr: 'Lieux · TROPICAL BIKES',
    },
  },
  {
    key: 'contacts',
    label: 'Contacts',
    description: 'Contact links, support chat, and office address page.',
    defaultPath: '/contacts',
    defaultTitles: {
      en: 'Contacts · TROPICAL BIKES',
      ru: 'Контакты · TROPICAL BIKES',
      zh: '联系方式 · TROPICAL BIKES',
      id: 'Kontak · TROPICAL BIKES',
      de: 'Kontakt · TROPICAL BIKES',
      fr: 'Contacts · TROPICAL BIKES',
    },
  },
  {
    key: 'news',
    label: 'News',
    description: 'News listing page. Article URLs inherit this base path.',
    defaultPath: '/news',
    supportsChildren: true,
    defaultTitles: {
      en: 'News & Updates · TROPICAL BIKES',
      ru: 'Новости и обновления · TROPICAL BIKES',
      zh: '新闻与动态 · TROPICAL BIKES',
      id: 'Berita & Update · TROPICAL BIKES',
      de: 'News & Updates · TROPICAL BIKES',
      fr: 'Actualités · TROPICAL BIKES',
    },
  },
  {
    key: 'booking',
    label: 'Booking',
    description: 'Booking checkout flow entry page.',
    defaultPath: '/booking',
    defaultTitles: {
      en: 'Booking · TROPICAL BIKES',
      ru: 'Бронирование · TROPICAL BIKES',
      zh: '预订 · TROPICAL BIKES',
      id: 'Pemesanan · TROPICAL BIKES',
      de: 'Buchung · TROPICAL BIKES',
      fr: 'Reservation · TROPICAL BIKES',
    },
  },
  {
    key: 'payment',
    label: 'Payment',
    description: 'Payment confirmation and checkout page.',
    defaultPath: '/payment',
    defaultTitles: {
      en: 'Payment · TROPICAL BIKES',
      ru: 'Оплата · TROPICAL BIKES',
      zh: '支付 · TROPICAL BIKES',
      id: 'Pembayaran · TROPICAL BIKES',
      de: 'Zahlung · TROPICAL BIKES',
      fr: 'Paiement · TROPICAL BIKES',
    },
  },
  {
    key: 'login',
    label: 'Login',
    description: 'Customer sign-in page.',
    defaultPath: '/login',
    defaultTitles: {
      en: 'Sign In · TROPICAL BIKES',
      ru: 'Вход · TROPICAL BIKES',
      zh: '登录 · TROPICAL BIKES',
      id: 'Masuk · TROPICAL BIKES',
      de: 'Anmelden · TROPICAL BIKES',
      fr: 'Connexion · TROPICAL BIKES',
    },
  },
  {
    key: 'register',
    label: 'Register',
    description: 'Customer account creation page.',
    defaultPath: '/register',
    defaultTitles: {
      en: 'Create Account · TROPICAL BIKES',
      ru: 'Регистрация · TROPICAL BIKES',
      zh: '注册 · TROPICAL BIKES',
      id: 'Daftar · TROPICAL BIKES',
      de: 'Registrieren · TROPICAL BIKES',
      fr: 'Creer un compte · TROPICAL BIKES',
    },
  },
  {
    key: 'profile',
    label: 'Profile',
    description: 'Customer profile and bookings page.',
    defaultPath: '/profile',
    defaultTitles: {
      en: 'Profile · TROPICAL BIKES',
      ru: 'Профиль · TROPICAL BIKES',
      zh: '个人资料 · TROPICAL BIKES',
      id: 'Profil · TROPICAL BIKES',
      de: 'Profil · TROPICAL BIKES',
      fr: 'Profil · TROPICAL BIKES',
    },
  },
];

export const PAGE_SETTINGS_DEFINITION_MAP = PAGE_SETTINGS_DEFINITIONS.reduce((acc, item) => {
  acc[item.key] = item;
  return acc;
}, {} as Record<ManagedPageKey, PageSettingDefinition>);

export function normalizePagePath(value?: string | null, fallback = '/'): string {
  const raw = String(value || '').trim();
  if (!raw) return fallback;
  let next = raw.startsWith('/') ? raw : `/${raw}`;
  next = next.replace(/\/{2,}/g, '/');
  if (next.length > 1) {
    next = next.replace(/\/+$/, '');
  }
  return next || fallback;
}

export function buildPageSettings(locale: Locale, overrides?: Partial<Record<ManagedPageKey, Partial<PageSettingValue>>>): PageSettingsMap {
  return PAGE_SETTINGS_DEFINITIONS.reduce((acc, page) => {
    const override = overrides?.[page.key];
    acc[page.key] = {
      path: normalizePagePath(override?.path, page.defaultPath),
      title: (override?.title || '').trim() || page.defaultTitles[locale],
    };
    return acc;
  }, {} as PageSettingsMap);
}

export function joinPagePath(basePath: string, child?: string | null): string {
  const base = normalizePagePath(basePath);
  const segment = String(child || '').trim().replace(/^\/+|\/+$/g, '');
  if (!segment) return base;
  return base === '/' ? `/${segment}` : `${base}/${segment}`;
}

export function matchesStaticPagePath(pathname: string, pagePath: string): boolean {
  const normalizedPathname = normalizePagePath(pathname);
  const normalizedPagePath = normalizePagePath(pagePath);
  return normalizedPathname === normalizedPagePath;
}
