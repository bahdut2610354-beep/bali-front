'use client';

import Link from 'next/link';
import { Fragment } from 'react';

import { useLocale } from '@/lib/i18n/LocaleProvider';
import { LEGAL_PATHS, getLegalContent, type LegalDocKey } from '@/lib/legal';

/** "By paying you agree to the Terms, Refund Policy and Privacy Policy" with links. */
export default function LegalConsentLine() {
  const { locale, localizeHref } = useLocale();
  const { ui } = getLegalContent(locale);
  const parts = ui.consent.split(/(\{terms\}|\{refund\}|\{privacy\})/);

  return (
    <p style={{ marginTop: 14, fontSize: 12, lineHeight: 1.6, color: 'rgba(0,0,0,0.6)', maxWidth: 520 }}>
      {parts.map((part, index) => {
        const match = part.match(/^\{(terms|refund|privacy)\}$/);
        if (!match) return <Fragment key={index}>{part}</Fragment>;
        const key = match[1] as LegalDocKey;
        return (
          <Link key={index} href={localizeHref(LEGAL_PATHS[key])} target="_blank" style={{ color: 'inherit', textDecoration: 'underline' }}>
            {ui.consentNames[key]}
          </Link>
        );
      })}
    </p>
  );
}
