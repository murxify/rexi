import Image from 'next/image';
// import { redirect } from 'next/navigation';
// import { cookies } from 'next/headers';
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

// import { Database } from '@/lib/database.types';

import { ModeToggle } from '@/components/mode-toggle';

import Logo from '@/components/logo';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  // const cookieStore = cookies();
  // const supabase = createServerComponentClient<Database>({
  //   cookies: () => cookieStore,
  // });

  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  // if (session) redirect('/dashboard');

  return (
    <main className='grid lg:grid-cols-2 h-screen'>
      {/* Left section */}
      <section className='hidden lg:block relative'>
        <div className='p-5 flex justify-between items-center absolute top-0 inset-x-0 z-50'>
          <Logo />
          <ModeToggle />
        </div>
        <div className='absolute inset-0'>
          <Image
            src='/taxi.jpg'
            fill
            alt='Yellow taxi toy'
            className='object-cover rounded-r-3xl shadow-2xl'
          />
        </div>
      </section>
      {/* Right section */}
      <section className='relative'>
        <div className='p-5 lg:hidden flex justify-between items-center absolute top-0 inset-x-0 z-50'>
          <Logo />
          <ModeToggle />
        </div>
        {children}
      </section>
    </main>
  );
};

export default AuthLayout;