import type { Metadata } from 'next';

import PageSeo from '@/components/PageSeo';
import { buildManagedPageMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return buildManagedPageMetadata('how');
}

export default function HowItWorksLayout({ children }: { children: React.ReactNode }) {
  return <PageSeo page="how">{children}</PageSeo>;
}
