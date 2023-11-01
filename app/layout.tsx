import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { getCurrentLocale } from '@/locales/server';

import { ThemeProvider } from '@/components/providers/theme-provider';
import QueryClientProvider from '@/components/providers/query-client-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'REXI | Profit Calculator for Taxi Drivers',
  description:
    'Rexi takes care of calculations so you can focus on what matters.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = getCurrentLocale();

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
            {children}
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
