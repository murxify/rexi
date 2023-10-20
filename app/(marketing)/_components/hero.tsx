import Link from 'next/link';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { Database } from '@/lib/database.types';

import { Button } from '@/components/ui/button';

const Hero = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className='relative isolate px-6 pt-14 lg:px-8'>
      <div className='mx-auto max-w-2xl pt-20 sm:pt-48 lg:pt-56'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold tracking-tight sm:text-6xl'>
            The Revenue Calculator Taxi Drivers Need
          </h1>
          <p className='mt-6 text-lg leading-8 text-muted-foreground'>
            REXI takes care of calculations so you can focus on what matters.
          </p>
          <div className='mt-8'>
            {!session && (
              <Button size='sm' asChild>
                <Link href='/signup'>
                  Get started<span className='ml-2'>&rarr;</span>
                </Link>
              </Button>
            )}
            {session && (
              <Button size='sm' asChild>
                <Link href='/dashboard'>
                  Dashboard<span className='ml-2'>&rarr;</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
