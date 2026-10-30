import { headers } from 'next/headers';
import type { ReactNode } from 'react';

import { PageSeoProvider, type Crumb } from '@/components/PageSeoContext';
import type { Locale } from '@/lib/i18n/dictionaries';
import { getRequestLocale } from '@/lib/i18n/requestLocale';
import { localizePath } from '@/lib/i18n/routing';
import { LEGAL_PATHS, LEGAL_UPDATED, getLegalContent, type LegalDocKey } from '@/lib/legal';
import { resolveScooterRouteId } from '@/lib/displayScooter';
import { joinPagePath, type ManagedPageKey } from '@/lib/pageSettings';
import {
  SITE_NAME,
  getBuildDate,
  getNewsArticleForSeo,
  getScooterForSeo,
  getSeoPageSettings,
  getSiteUrl,
  serializeJsonLd,
  toAbsoluteUrl,
} from '@/lib/seo';

type CrumbPageKey = Extract<ManagedPageKey, 'home' | 'catalog' | 'prices' | 'how' | 'locations' | 'contacts' | 'news'>;

/** Short page names for breadcrumbs in every site language. */
const CRUMB_LABELS: Record<Locale, Record<CrumbPageKey, string>> = {
  en: { home: 'Home', catalog: 'Catalog', prices: 'Prices', how: 'How it works', locations: 'Locations', contacts: 'Contacts', news: 'News' },
  ru: { home: 'Главная', catalog: 'Каталог', prices: 'Цены', how: 'Как это работает', locations: 'Локации', contacts: 'Контакты', news: 'Новости' },
  zh: { home: '首页', catalog: '车型', prices: '价格', how: '如何使用', locations: '地点', contacts: '联系方式', news: '新闻' },
  id: { home: 'Beranda', catalog: 'Katalog', prices: 'Harga', how: 'Cara kerja', locations: 'Lokasi', contacts: 'Kontak', news: 'Berita' },
  de: { home: 'Startseite', catalog: 'Katalog', prices: 'Preise', how: 'So funktioniert’s', locations: 'Standorte', contacts: 'Kontakt', news: 'News' },
  fr: { home: 'Accueil', catalog: 'Catalogue', prices: 'Tarifs', how: 'Comment ça marche', locations: 'Zones', contacts: 'Contacts', news: 'Actualités' },
};

const UPDATED_LABEL: Record<Locale, string> = {
  en: 'Page updated', ru: 'Страница обновлена', zh: '页面更新于', id: 'Halaman diperbarui', de: 'Seite aktualisiert', fr: 'Page mise à jour',
};

const NAV_LABEL: Record<Locale, string> = {
  en: 'Breadcrumb', ru: 'Навигационная цепочка', zh: '导航路径', id: 'Navigasi', de: 'Brotkrümelnavigation', fr: 'Fil d’Ariane',
};

type PageSeoProps = {
  children: ReactNode;
  /** A managed section page: catalog, prices, how, locations, contacts or news. */
  page?: CrumbPageKey;
  legal?: LegalDocKey;
  scooterId?: string;
  newsSlug?: string;
};

/** Language-free path of the current request, set by the middleware. */
function readRequestPath(): string | null {
  try {
    return headers().get('x-site-path');
  } catch {
    return null;
  }
}

type ResolvedPage = { crumbs: Crumb[]; updated: string; published?: string; type: 'WebPage' | 'Article' | 'ItemPage' | 'CollectionPage' | 'ContactPage' };

async function resolvePage(props: PageSeoProps, locale: Locale): Promise<ResolvedPage | null> {
  const labels = CRUMB_LABELS[locale] || CRUMB_LABELS.en;
  const pageSettings = await getSeoPageSettings();
  const href = (path: string) => localizePath(path, locale);
  const home: Crumb = { name: labels.home, href: href(pageSettings.home.path) };
  const section = (key: CrumbPageKey): Crumb => ({ name: labels[key], href: href(pageSettings[key].path) });
  const buildDate = getBuildDate();

  if (props.legal) {
    const doc = getLegalContent(locale).docs[props.legal];
    return { crumbs: [home, { name: doc.title, href: href(LEGAL_PATHS[props.legal]) }], updated: LEGAL_UPDATED, type: 'WebPage' };
  }

  if (props.scooterId) {
    const catalog = section('catalog');
    try {
      const scooter = await getScooterForSeo(props.scooterId, locale);
      const updated = (scooter as { updated_at?: string }).updated_at || buildDate;
      const routeId = resolveScooterRouteId(scooter.slug || scooter.id, scooter.title) || String(scooter.slug || scooter.id || props.scooterId);
      return { crumbs: [home, catalog, { name: scooter.title, href: href(`/scooter/${routeId}`) }], updated, type: 'ItemPage' };
    } catch {
      // API unavailable: skip page data rather than describe the wrong page.
      return null;
    }
  }

  if (props.newsSlug) {
    const news = section('news');
    try {
      const article = await getNewsArticleForSeo(props.newsSlug, locale);
      const updated = (article as { updated_at?: string }).updated_at || article.published_at || buildDate;
      return {
        crumbs: [home, news, { name: article.title, href: href(joinPagePath(pageSettings.news.path, article.slug || props.newsSlug)) }],
        updated,
        published: article.published_at,
        type: 'Article',
      };
    } catch {
      // API unavailable: skip page data rather than describe the wrong page.
      return null;
    }
  }

  if (props.page && props.page !== 'home') {
    // A section layout also wraps its child pages (news → article); those add their own data.
    const requestPath = readRequestPath();
    if (requestPath && requestPath !== pageSettings[props.page].path) return null;
    const type = props.page === 'contacts' ? 'ContactPage' : props.page === 'catalog' || props.page === 'news' ? 'CollectionPage' : 'WebPage';
    return { crumbs: [home, section(props.page)], updated: buildDate, type };
  }

  if (props.page === 'home') {
    const requestPath = readRequestPath();
    if (requestPath && requestPath !== pageSettings.home.path) return null;
    return { crumbs: [home], updated: buildDate, type: 'WebPage' };
  }

  return { crumbs: [], updated: buildDate, type: 'WebPage' };
}

/**
 * Wraps a route: adds BreadcrumbList + WebPage/Article JSON-LD (with author, publisher and
 * dateModified) and passes the breadcrumbs to the footer, which shows them to visitors.
 */
export default async function PageSeo(props: PageSeoProps) {
  const locale = getRequestLocale();
  const resolved = await resolvePage(props, locale);
  if (!resolved) return <>{props.children}</>;
  const { crumbs, updated, published, type } = resolved;
  const siteUrl = getSiteUrl();
  const organization = { '@id': `${siteUrl}/#business` };
  const current = crumbs[crumbs.length - 1];
  const url = current ? toAbsoluteUrl(current.href) : undefined;

  const graph: Record<string, unknown>[] = [];
  if (crumbs.length > 1) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: toAbsoluteUrl(crumb.href),
      })),
    });
  }
  if (url) {
    graph.push({
      '@type': type,
      '@id': `${url}#webpage`,
      url,
      name: type === 'Article' ? undefined : current?.name,
      headline: type === 'Article' ? current?.name : undefined,
      inLanguage: locale,
      isPartOf: { '@id': `${siteUrl}/#website` },
      author: { '@type': 'Organization', name: SITE_NAME, url: siteUrl },
      publisher: organization,
      datePublished: published,
      dateModified: updated,
    });
  }

  return (
    <>
      {graph.length ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd({ '@context': 'https://schema.org', '@graph': graph }) }}
        />
      ) : null}
      <PageSeoProvider value={{ crumbs, updated, updatedLabel: UPDATED_LABEL[locale], navLabel: NAV_LABEL[locale] }}>
        {props.children}
      </PageSeoProvider>
    </>
  );
}
