import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { Database } from '@/lib/database.types';
import { getScopedI18n } from '@/locales/server';

import { Button } from '@/components/ui/button';
import { SiGmail } from 'react-icons/si';
import { BiLogoMicrosoft } from 'react-icons/bi';

const ThankYouPage = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });
  const t = await getScopedI18n('thankYou');

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) redirect('/dashboard');

  return (
    <div className='h-full flex flex-col justify-center items-center text-center gap-6 px-5'>
      <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl'>
        {t('title')}
      </h1>
      <h3 className='text-2xl font-semibold tracking-tight text-muted-foreground'>
        {t('description')}
      </h3>
      <div className='gap-x-2 flex items-center'>
        <Button>
          <SiGmail className='w-6 h-6 mr-2' />
          <a href='https://www.gmail.com' target='_blank'>
            {t('openGmail')}
          </a>
        </Button>
        <Button>
          <BiLogoMicrosoft className='w-6 h-6 mr-2' />
          <a href='https://www.outlook.com' target='_blank'>
            {t('openOutlook')}
          </a>
        </Button>
      </div>
    </div>
  );
};

export default ThankYouPage;
