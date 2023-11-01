import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';

import { ThemeProvider } from '@/components/providers/theme-provider';
import QueryClientProvider from '@/components/providers/query-client-provider';
import { I18nProviderClient } from '@/locales/client';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'REXI | Profit Calculator for Taxi Drivers',
  description:
    'Rexi takes care of calculations so you can focus on what matters.',
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <QueryClientProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <I18nProviderClient locale={locale}>{children}</I18nProviderClient>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
