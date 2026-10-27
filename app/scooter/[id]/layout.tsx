import type { Metadata } from 'next';

import { ScooterSeoProvider } from '@/components/ScooterSeoContext';
import { getRequestLocale } from '@/lib/i18n/requestLocale';
import { buildScooterJsonLd, buildScooterMetadata, serializeJsonLd } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return buildScooterMetadata(params.id);
}

export default async function ScooterDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const jsonLd = await buildScooterJsonLd(params.id, getRequestLocale());
  return (
    <>
      {jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      ) : null}
      <ScooterSeoProvider value={jsonLd ? { name: jsonLd.name, description: jsonLd.description } : null}>
        {children}
      </ScooterSeoProvider>
    </>
  );
}
