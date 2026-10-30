import type { Metadata } from 'next';

import PageSeo from '@/components/PageSeo';
import { buildManagedPageMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return buildManagedPageMetadata('catalog');
}

export default function CatalogLayout({ children }: { children: React.ReactNode }) {
  return <PageSeo page="catalog">{children}</PageSeo>;
}
