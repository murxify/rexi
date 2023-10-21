'use client';

import { useQuery } from '@tanstack/react-query';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';

import {
  AlignCenterHorizontal,
  BadgeDollarSign,
  BadgeMinus,
  BadgePlus,
} from 'lucide-react';
import OverviewCard from './overview-card';

const Overview = () => {
  const supabase = createClientComponentClient<Database>();

  const {
    isPending,
    isError,
    data: profits,
    error,
  } = useQuery({
    queryKey: ['profits'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profits')
        .select('expense,profit,revenue, date');

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

  if (profits.length === 0) {
    return <span>Start adding revenue...</span>;
  }

  let totalRevenue = 0;
  let totalProfits = 0;
  let totalExpenses = 0;
  let avgRevenue = 0;
  profits.forEach((profit) => {
    totalRevenue += profit.revenue;
    totalProfits += profit.profit;
    totalExpenses += profit.expense;
  });
  avgRevenue = totalRevenue / profits.length;

  return (
    <>
      <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6 py-2'>
        <OverviewCard
          amount={+totalRevenue.toFixed(2)}
          title='Total Revenue'
          Icon={BadgeDollarSign}
        />
        <OverviewCard
          amount={+totalProfits.toFixed(2)}
          title='Total Profits'
          Icon={BadgePlus}
        />
        <OverviewCard
          amount={+totalExpenses.toFixed(2)}
          title='Total Expenses'
          Icon={BadgeMinus}
        />
        <OverviewCard
          amount={+avgRevenue.toFixed(2)}
          title='Avg. Revenue'
          Icon={AlignCenterHorizontal}
        />
      </div>
    </>
  );
};

export default Overview;
