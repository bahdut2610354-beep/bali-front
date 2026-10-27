import type { Metadata } from 'next';

import LegalPage from '@/components/LegalPage';
import { buildLegalMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export function generateMetadata(): Metadata {
  return buildLegalMetadata('privacy');
}

export default function Page() {
  return <LegalPage docKey="privacy" />;
}
