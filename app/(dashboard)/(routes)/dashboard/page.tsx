import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import Overview from '../../_components/overview';
import DashboardHeader from '../../_components/dashboard-header';

const DashboardPage = () => {
  return (
    <>
      <DashboardHeader />

      <Tabs defaultValue='overview'>
        <TabsList>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='reports'>Reports</TabsTrigger>
        </TabsList>
        <TabsContent value='overview'>
          <Overview />
        </TabsContent>
        <TabsContent value='reports'>A list of all reports</TabsContent>
      </Tabs>
    </>
  );
};

export default DashboardPage;
