'use client';

import { useQuery } from '@tanstack/react-query';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { Database } from '@/lib/database.types';
import { getShiftDuration } from '@/app/(dashboard)/_utils/get-shift-duration';

import { BadgeDollarSign, BadgeMinus, BadgePlus, Clock } from 'lucide-react';

import EmptyState from '../empty-state';
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
  let totalHours = 0;

  data.forEach((item) => {
    totalRevenue += item.revenue;
    totalProfits += item.profit;
    totalExpenses += item.expense;
    totalHours += item.shift_duration;
  });

  const avgData = [
    {
      title: 'Avg. Revenue',
      value: totalRevenue / data.length,
      Icon: BadgeDollarSign,
    },
    {
      title: 'Avg. Profit',
      value: totalProfits / data.length,
      Icon: BadgePlus,
    },
    {
      title: 'Avg. Expense',
      value: totalExpenses / data.length,
      Icon: BadgeMinus,
    },
    {
      title: 'Avg. Shift Duration',
      value: getShiftDuration(totalHours / data.length),
      Icon: Clock,
    },
  ];

  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6 py-2'>
      <OverviewCard
        value={totalRevenue}
        title='Total Revenue'
        Icon={BadgeDollarSign}
        data={data}
        dataKey='revenue'
      />
      <OverviewCard
        value={totalProfits}
        title='Total Profits'
        Icon={BadgePlus}
        data={data}
        dataKey='profit'
      />
      <OverviewCard
        value={totalExpenses}
        title='Total Expenses'
        Icon={BadgeMinus}
        data={data}
        dataKey='expense'
      />
      <OverviewCard
        value={getShiftDuration(totalHours)}
        title='Total Hours'
        Icon={Clock}
        data={data}
        dataKey='shift_duration'
      />
      <RevProBarChart data={data} />
      <AvgCard data={avgData} />
    </div>
  );
};

export default Overview;
