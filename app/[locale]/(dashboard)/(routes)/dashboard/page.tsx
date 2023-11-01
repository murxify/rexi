import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { Database } from '@/lib/database.types';
import { getScopedI18n } from '@/locales/server';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import Overview from '../../_components/overview/overview';
import DashboardHeader from '../../_components/dashboard-header';
import Reports from '../../_components/reports/reports';

const DashboardPage = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });
  const t = await getScopedI18n('dashboard');

  const { data: contract } = await supabase.from('contracts').select().single();
  if (!contract) redirect('/welcome');

  return (
    <>
      <DashboardHeader />

      <Tabs defaultValue='overview'>
        <TabsList>
          <TabsTrigger value='overview'>{t('overView.title')}</TabsTrigger>
          <TabsTrigger value='reports'>{t('reports.title')}</TabsTrigger>
        </TabsList>
        <TabsContent value='overview'>
          <Overview />
        </TabsContent>
        <TabsContent value='reports'>
          <Reports />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default DashboardPage;
