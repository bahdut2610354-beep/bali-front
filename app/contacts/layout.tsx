import type { Metadata } from 'next';

import PageSeo from '@/components/PageSeo';
import { buildManagedPageMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return buildManagedPageMetadata('contacts');
}

export default function ContactsLayout({ children }: { children: React.ReactNode }) {
  return <PageSeo page="contacts">{children}</PageSeo>;
}
