'use client';

import { useQuery } from '@tanstack/react-query';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { Database } from '@/lib/database.types';
import { getShiftDuration, getHourlyRate } from '@/lib/utils';
import { useScopedI18n } from '@/locales/client';

import {
  BadgeDollarSign,
  BadgeMinus,
  BadgePlus,
  Timer,
  Watch,
} from 'lucide-react';

import EmptyState from '../empty-state';
import RevProBarChart from './revpro-bar-chart';
import OverviewCard from './overview-card';
import AvgCard from './avg-card';

const Overview = () => {
  const supabase = createClientComponentClient<Database>();
  const t = useScopedI18n('dashboard.overView');

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
  let totalDuration = 0;

  data.forEach((item) => {
    totalRevenue += item.revenue;
    totalProfits += item.profit;
    totalExpenses += item.expense;
    totalDuration += item.shift_duration;
  });

  const avgData = [
    {
      title: t('avgRevenue'),
      value: totalRevenue / data.length,
      Icon: BadgeDollarSign,
    },
    {
      title: t('avgProfit'),
      value: totalProfits / data.length,
      Icon: BadgePlus,
    },
    {
      title: t('avgExpense'),
      value: totalExpenses / data.length,
      Icon: BadgeMinus,
    },
    {
      title: t('avgHourlyRate'),
      value: getHourlyRate(totalDuration, totalProfits),
      Icon: Watch,
    },
    {
      title: t('avgShiftLength'),
      value: getShiftDuration(totalDuration / data.length),
      Icon: Timer,
    },
  ];

  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6 py-2'>
      <OverviewCard
        value={totalRevenue}
        title={t('totalRevenue')}
        Icon={BadgeDollarSign}
        data={data}
        dataKey='revenue'
      />
      <OverviewCard
        value={totalProfits}
        title={t('totalProfits')}
        Icon={BadgePlus}
        data={data}
        dataKey='profit'
      />
      <OverviewCard
        value={totalExpenses}
        title={t('totalExpenses')}
        Icon={BadgeMinus}
        data={data}
        dataKey='expense'
      />
      <OverviewCard
        value={getShiftDuration(totalDuration)}
        title={t('totalHours')}
        Icon={Timer}
        data={data}
        dataKey='shift_duration'
      />
      <RevProBarChart data={data} />
      <AvgCard data={avgData} />
    </div>
  );
};

export default Overview;
