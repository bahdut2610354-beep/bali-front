import type { Metadata } from 'next';

import LegalPage from '@/components/LegalPage';
import PageSeo from '@/components/PageSeo';
import { buildLegalMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export function generateMetadata(): Metadata {
  return buildLegalMetadata('refund');
}

export default function Page() {
  return (
    <PageSeo legal="refund">
      <LegalPage docKey="refund" />
    </PageSeo>
  );
}
