import Link from 'next/link';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { Database } from '@/lib/database.types';
import { getI18n } from '@/locales/server';

import { Button } from '@/components/ui/button';

import Logo from '@/components/logo';
import HeaderButtons from '@/components/header-buttons';

const Header = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const t = await getI18n();

  return (
    <header className='z-50 p-5'>
      <div className='flex items-center justify-between max-w-7xl mx-auto'>
        <Logo />
        <div className='flex items-center'>
          {!session && (
            <>
              <Button variant='ghost' className='sm:mr-2' asChild>
                <Link href='/login'>
                  {t('auth.login')} <span className='ml-2'>&rarr;</span>
                </Link>
              </Button>
              <Button size='sm' className='hidden sm:flex' asChild>
                <Link href='/signup'>{t('marketing.cta')}</Link>
              </Button>
            </>
          )}
          {session && (
            <>
              <Button size='sm' className='hidden sm:flex' asChild>
                <Link href='/dashboard'>{t('marketing.dashboard')}</Link>
              </Button>
            </>
          )}
          <HeaderButtons marketing />
        </div>
      </div>
    </header>
  );
};

export default Header;
