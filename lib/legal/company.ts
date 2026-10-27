/** Legal entity that operates bali.bike (shown in the footer and on the legal pages). */
export const COMPANY = {
  name: 'PT ART TREADING GLOBAL',
  brand: 'TROPICAL BIKES',
  address: 'Jl. Sunset Road No. 39B, Seminyak, Kuta, Badung, Bali 80361, Indonesia',
  email: 'info@bali.bike',
  phone: '+62 813-5915-173',
  whatsapp: 'https://wa.me/628135915173',
  site: 'bali.bike',
} as const;

export type LegalDocKey = 'terms' | 'refund' | 'privacy';

export const LEGAL_PATHS: Record<LegalDocKey, string> = {
  terms: '/terms',
  refund: '/refund-policy',
  privacy: '/privacy',
};

/** Date the current versions of the legal pages take effect. */
export const LEGAL_UPDATED = '2026-10-27';
