import type { Metadata } from 'next';

import PageSeo from '@/components/PageSeo';
import { buildNewsArticleMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return buildNewsArticleMetadata(params.slug);
}

export default function NewsArticleLayout({ children, params }: { children: React.ReactNode; params: { slug: string } }) {
  return <PageSeo newsSlug={params.slug}>{children}</PageSeo>;
}
