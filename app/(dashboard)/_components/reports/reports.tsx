'use client';

import { useQuery } from '@tanstack/react-query';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';

import { columns } from './columns';
import DataTable from './data-table';

import EmptyState from '../empty-state';

const Reports = () => {
  const supabase = createClientComponentClient<Database>();

  const {
    isPending,
    isError,
    data: profits,
    error,
  } = useQuery({
    queryKey: ['profits'],
    queryFn: async () => {
      const { data, error } = await supabase.from('profits').select();

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
    return <EmptyState />;
  }

  return <DataTable columns={columns} data={profits} />;
};

export default Reports;
