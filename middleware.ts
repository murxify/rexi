import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { createI18nMiddleware } from 'next-international/middleware';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';
import type { Database } from '@/lib/database.types';

const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'sv'],
  defaultLocale: 'en',
});

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  await supabase.auth.getSession();
  // return res;
  return I18nMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)'],
};
