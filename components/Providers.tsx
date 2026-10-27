'use client';
import { LocaleProvider } from '@/lib/i18n/LocaleProvider';
import { AuthProvider } from '@/lib/i18n/AuthProvider';
import { CurrencyProvider } from '@/lib/i18n/CurrencyProvider';
import type { Locale } from '@/lib/i18n/dictionaries';

export default function Providers({ children, routeLocale = null }: { children: React.ReactNode; routeLocale?: Locale | null }) {
  return (
    <LocaleProvider routeLocale={routeLocale}>
      <AuthProvider>
        <CurrencyProvider>
          {children}
        </CurrencyProvider>
      </AuthProvider>
    </LocaleProvider>
  );
}
