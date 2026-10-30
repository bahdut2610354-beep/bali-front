import type { Metadata } from 'next';

import LegalPage from '@/components/LegalPage';
import PageSeo from '@/components/PageSeo';
import { buildLegalMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export function generateMetadata(): Metadata {
  return buildLegalMetadata('privacy');
}

export default function Page() {
  return (
    <PageSeo legal="privacy">
      <LegalPage docKey="privacy" />
    </PageSeo>
  );
}
