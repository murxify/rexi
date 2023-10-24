'use client';

import { useQuery } from '@tanstack/react-query';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';

import { BadgeDollarSign, BadgeMinus, BadgePlus, Clock } from 'lucide-react';

import EmptyState from './empty-state';
import RevProBarChart from './revpro-bar-chart';
import OverviewCard from './overview-card';
import AvgCard from './avg-card';

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
  // let totalTips = 0;

  data.forEach((item) => {
    totalRevenue += item.revenue;
    totalProfits += item.profit;
    totalExpenses += item.expense;
    // totalTips += item.tips;
  });

  const avgData = [
    {
      title: 'Avg. Revenue',
      avgAmount: totalRevenue / data.length,
      Icon: BadgeDollarSign,
    },
    {
      title: 'Avg. Profit',
      avgAmount: totalProfits / data.length,
      Icon: BadgePlus,
    },
    {
      title: 'Avg. Expense',
      avgAmount: totalExpenses / data.length,
      Icon: BadgeMinus,
    },
    {
      title: 'Avg. Shift Duration',
      // TODO: Calculate average shift duration
      avgAmount: 8.7,
      Icon: Clock,
    },
  ];

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
        amount={totalProfits}
        title='Total Hours'
        Icon={Clock}
        data={data}
        dataKey='revenue'
      />
      <RevProBarChart data={data} />
      <AvgCard data={avgData} />
    </div>
  );
};

export default Overview;
