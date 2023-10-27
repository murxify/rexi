import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { Database } from '@/lib/database.types';

import WelcomeForm from '../../_components/welcome-form';

const WelcomePage = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) redirect('/login');

  const { data: contract } = await supabase.from('contracts').select().single();
  if (contract) redirect('/dashboard');

  return <WelcomeForm />;
};

export default WelcomePage;
