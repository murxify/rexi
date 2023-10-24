'use client';

import { useQuery } from '@tanstack/react-query';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';

import { cn } from '@/lib/utils';
import { BadgeDollarSign, BadgeMinus, BadgePlus, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';

import EmptyState from './empty-state';
import RevProBarChart from './revpro-bar-chart';
import OverviewCard from './overview-card';

const Overview = () => {
  const supabase = createClientComponentClient<Database>();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['profits'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profits')
        .select()
        .order('date', { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (data.length === 0) {
    return <EmptyState />;
  }

  let totalRevenue = 0;
  let totalProfits = 0;
  let totalExpenses = 0;
  let totalTips = 0;
  let avgRevenue = 0;
  let avgProfits = 0;
  let avgExpenses = 0;
  data.forEach((profit) => {
    totalRevenue += profit.revenue;
    totalProfits += profit.profit;
    totalExpenses += profit.expense;
    totalTips += profit.tips;
  });
  avgRevenue = totalRevenue / data.length;
  avgProfits = totalProfits / data.length;
  avgExpenses = totalExpenses / data.length;

  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6 py-2'>
      <OverviewCard
        amount={totalRevenue}
        title='Total Revenue'
        Icon={BadgeDollarSign}
        data={data}
        dataKey='revenue'
      />
      <OverviewCard
        amount={totalProfits}
        title='Total Profits'
        Icon={BadgePlus}
        data={data}
        dataKey='profit'
      />
      <OverviewCard
        amount={totalExpenses}
        title='Total Expenses'
        Icon={BadgeMinus}
        data={data}
        dataKey='expense'
      />
      <OverviewCard
        amount={avgRevenue}
        title='Total Hours'
        Icon={Clock}
        data={data}
        dataKey='revenue'
      />
      <Card
        className={cn(
          'sm:col-span-2 p-2',
          data.length >= 20 && 'lg:col-span-3'
        )}
      >
        <RevProBarChart data={data} />
      </Card>
      <Card className='p-2 col-span-1'>Pie Chart</Card>
    </div>
  );
};

export default Overview;
