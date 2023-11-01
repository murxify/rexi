import { I18nProviderClient } from '@/locales/client';

export default function LocaleLayout({
  params: { locale },
  children,
}: {
  params: { locale: string };
  children: React.ReactNode;
}) {
  return <I18nProviderClient locale={locale}>{children}</I18nProviderClient>;
}
