import Link from 'next/link';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { Database } from '@/lib/database.types';

import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';

import Logo from '@/components/logo';

const Header = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <header className='z-50 p-5'>
      <div className='flex items-center justify-between max-w-7xl mx-auto'>
        <Logo />
        <div className='flex items-center'>
          {!session && (
            <>
              <Button variant='ghost' className='sm:mr-2' asChild>
                <Link href='/login'>
                  Log in <span className='ml-2'>&rarr;</span>
                </Link>
              </Button>
              <Button size='sm' className='hidden sm:flex' asChild>
                <Link href='/signup'>Get started</Link>
              </Button>
            </>
          )}
          {session && (
            <>
              <Button size='sm' className='hidden sm:flex' asChild>
                <Link href='/dashboard'>Dashboard</Link>
              </Button>
            </>
          )}
          <span className='w-[1px] h-8 bg-muted-foreground/20 dark:bg-muted mr-2 sm:mx-2 hidden sm:block' />
          <Button variant='ghost' size='icon' asChild>
            <a href='https://github.com/murxify/rexi' target='_blank'>
              <span className='sr-only'>github</span>
              <Github className='h-[1.2rem] w-[1.2rem]' />
            </a>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
