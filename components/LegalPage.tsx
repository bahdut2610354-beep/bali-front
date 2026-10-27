import Link from 'next/link';

import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { getRequestLocale } from '@/lib/i18n/requestLocale';
import { localizePath } from '@/lib/i18n/routing';
import { COMPANY, LEGAL_DOC_KEYS, LEGAL_PATHS, fillCompany, formatLegalDate, getLegalContent, type LegalDocKey } from '@/lib/legal';

/** Server-rendered legal page (Terms, Cancellation & Refund, Privacy) in the URL language. */
export default function LegalPage({ docKey }: { docKey: LegalDocKey }) {
  const locale = getRequestLocale();
  const content = getLegalContent(locale);
  const doc = content.docs[docKey];
  const sub = 'rgba(0,0,0,0.62)';
  const border = 'rgba(0,0,0,0.1)';
  const companyRows: [string, string][] = [
    [content.ui.companyLabels.name, `${COMPANY.name} (${COMPANY.brand})`],
    [content.ui.companyLabels.address, COMPANY.address],
    [content.ui.companyLabels.email, COMPANY.email],
    [content.ui.companyLabels.phone, COMPANY.phone],
  ];

  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff', color: '#000', fontFamily: 'var(--br-body)' }}>
      <SiteHeader />
      <main className="br-section br-legal" style={{ padding: '120px 48px 80px', flex: 1 }}>
        <article style={{ maxWidth: 820, margin: '0 auto' }}>
          <h1 className="br-display" style={{ fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 1.05, margin: 0 }}>{doc.title}</h1>
          <div className="br-mono" style={{ marginTop: 16, fontSize: 12, color: sub, letterSpacing: '0.08em' }}>
            {content.ui.updated}: {formatLegalDate(locale)}
          </div>

          {doc.sections.map((section) => (
            <section key={section.h} style={{ marginTop: 40 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 12px' }}>{section.h}</h2>
              {section.p.map((paragraph, index) => (
                <p key={index} style={{ fontSize: 16, lineHeight: 1.7, color: 'rgba(0,0,0,0.82)', margin: '0 0 12px' }}>{fillCompany(paragraph)}</p>
              ))}
            </section>
          ))}

          <section id="company" style={{ marginTop: 48, padding: 24, border: `1px solid ${border}`, borderRadius: 16, background: '#FAFAF7' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 14px' }}>{content.ui.company}</h2>
            <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: 'minmax(120px, 200px) 1fr', gap: '8px 16px', fontSize: 15 }}>
              {companyRows.map(([label, value]) => (
                <div key={label} style={{ display: 'contents' }}>
                  <dt style={{ color: sub }}>{label}</dt>
                  <dd style={{ margin: 0 }}>{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <nav style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <span className="br-mono" style={{ fontSize: 11, color: sub, letterSpacing: '0.12em' }}>{content.ui.related.toUpperCase()}</span>
            {LEGAL_DOC_KEYS.filter((key) => key !== docKey).map((key) => (
              <Link key={key} href={localizePath(LEGAL_PATHS[key], locale)} style={{ color: '#000', fontSize: 15, textDecoration: 'underline' }}>
                {content.docs[key].title}
              </Link>
            ))}
          </nav>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
