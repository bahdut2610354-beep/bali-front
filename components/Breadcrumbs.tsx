'use client';

import Link from 'next/link';

import { usePageSeo } from '@/components/PageSeoContext';

const DATE_LOCALE: Record<string, string> = { en: 'en-GB', ru: 'ru-RU', zh: 'zh-CN', id: 'id-ID', de: 'de-DE', fr: 'fr-FR' };

function formatDate(value: string, locale: string) {
  try {
    return new Date(value).toLocaleDateString(DATE_LOCALE[locale] || 'en-GB', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
  } catch {
    return value.slice(0, 10);
  }
}

/** Breadcrumb trail and last-update date of the page, shown at the top of the footer. */
export default function Breadcrumbs({ locale }: { locale: string }) {
  const info = usePageSeo();
  if (!info || (!info.crumbs.length && !info.updated)) return null;
  const { crumbs, updated, updatedLabel, navLabel } = info;

  return (
    <div className="br-breadcrumbs">
      {crumbs.length > 1 ? (
        <nav aria-label={navLabel || 'Breadcrumb'}>
          <ol>
            {crumbs.map((crumb, index) => {
              const isLast = index === crumbs.length - 1;
              return (
                <li key={`${crumb.href}-${index}`}>
                  {isLast ? (
                    <span aria-current="page">{crumb.name}</span>
                  ) : (
                    <Link href={crumb.href}>{crumb.name}</Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      ) : <span />}
      {updated ? (
        <p className="br-breadcrumbs-updated">
          {updatedLabel || 'Page updated'}: <time dateTime={updated.slice(0, 10)}>{formatDate(updated, locale)}</time>
        </p>
      ) : null}
    </div>
  );
}
