import Link from 'next/link';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { Database } from '@/lib/database.types';
import { getI18n } from '@/locales/server';

import { Button } from '@/components/ui/button';

const Hero = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const t = await getI18n();

  return (
    <div className='relative isolate px-6 lg:px-8 flex items-center h-full'>
      <div className='mx-auto max-w-2xl -mt-16'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold tracking-tight sm:text-6xl'>
            {t('marketing.title')}
          </h1>
          <p className='mt-6 text-lg leading-8 text-muted-foreground'>
            {t('marketing.description')}
          </p>
          <Button size='sm' asChild className='mt-8'>
            <Link href={`/${session ? 'dashboard' : 'signup'}`}>
              {session ? t('marketing.dashboard') : t('marketing.cta')}
              <span className='ml-2'>&rarr;</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
