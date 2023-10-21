import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { Database } from '@/lib/database.types';

import { Toaster } from '@/components/ui/toaster';
import Header from './_components/header';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  return (
    <>
      <Header />
      <main className='container p-5'>{children}</main>
      <Toaster />
    </>
  );
};

export default DashboardLayout;
