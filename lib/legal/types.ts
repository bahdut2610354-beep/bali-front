import type { LegalDocKey } from './company';

export type LegalSection = { h: string; p: string[] };

export type LegalDoc = {
  title: string;
  /** Short name used in links (footer, consent line, "see also"). */
  short: string;
  description: string;
  sections: LegalSection[];
};

export type LegalLocaleContent = {
  ui: {
    updated: string;
    company: string;
    related: string;
    /** Sentence under the pay button; {terms}, {refund}, {privacy} become links. */
    consent: string;
    /** Link texts inside the consent sentence (grammatical case may differ from `short`). */
    consentNames: Record<LegalDocKey, string>;
    footerLegal: string;
    companyLabels: { name: string; address: string; email: string; phone: string };
  };
  docs: Record<LegalDocKey, LegalDoc>;
};
