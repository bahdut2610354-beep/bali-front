import type { Locale } from '@/lib/i18n/dictionaries';

import { COMPANY, LEGAL_PATHS, LEGAL_UPDATED, type LegalDocKey } from './company';
import de from './content/de';
import en from './content/en';
import fr from './content/fr';
import id from './content/id';
import ru from './content/ru';
import zh from './content/zh';
import type { LegalLocaleContent } from './types';

export { COMPANY, LEGAL_PATHS, LEGAL_UPDATED };
export type { LegalDocKey };

const CONTENT: Record<Locale, LegalLocaleContent> = { en, ru, zh, id, de, fr };

export const LEGAL_DOC_KEYS: LegalDocKey[] = ['terms', 'refund', 'privacy'];

export function getLegalContent(locale: Locale | null | undefined): LegalLocaleContent {
  return CONTENT[locale || 'en'] || en;
}

/** Replaces {company}, {address}, {email}, {phone}, {site} with the company details. */
export function fillCompany(text: string): string {
  return text
    .replace(/\{company\}/g, COMPANY.name)
    .replace(/\{address\}/g, COMPANY.address)
    .replace(/\{email\}/g, COMPANY.email)
    .replace(/\{phone\}/g, COMPANY.phone)
    .replace(/\{site\}/g, COMPANY.site);
}

const DATE_LOCALE: Record<Locale, string> = { en: 'en-GB', ru: 'ru-RU', zh: 'zh-CN', id: 'id-ID', de: 'de-DE', fr: 'fr-FR' };

export function formatLegalDate(locale: Locale): string {
  return new Date(`${LEGAL_UPDATED}T00:00:00Z`).toLocaleDateString(DATE_LOCALE[locale] || 'en-GB', {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
  });
}
