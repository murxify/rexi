'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Database } from '@/lib/database.types';

import { formatCurrency } from '@/utils/currency';
import ReportActions from './report-actions';

export const columns: ColumnDef<
  Database['public']['Tables']['profits']['Row']
>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
  },
  {
    accessorKey: 'revenue',
    header: () => <div>Revenue</div>,
    cell: ({ row }) => <div>{formatCurrency(row.getValue('revenue'))}</div>,
  },
  {
    accessorKey: 'revenue_ex_vat',
    header: () => <div>Revenue Ex VAT</div>,
    cell: ({ row }) => (
      <div>{formatCurrency(row.getValue('revenue_ex_vat'))}</div>
    ),
  },
  {
    accessorKey: 'vat_amount',
    header: () => <div>VAT</div>,
    cell: ({ row }) => <div>{formatCurrency(row.getValue('vat_amount'))}</div>,
  },
  {
    accessorKey: 'my_share_amount',
    header: () => <div>My Share</div>,
    cell: ({ row }) => (
      <div>{formatCurrency(row.getValue('my_share_amount'))}</div>
    ),
  },
  {
    accessorKey: 'employers_share_amount',
    header: () => <div>Employers Share</div>,
    cell: ({ row }) => (
      <div>{formatCurrency(row.getValue('employers_share_amount'))}</div>
    ),
  },
  {
    accessorKey: 'vacation_pay_amount',
    header: () => <div>Vacation Pay</div>,
    cell: ({ row }) => (
      <div>{formatCurrency(row.getValue('vacation_pay_amount'))}</div>
    ),
  },
  {
    accessorKey: 'tips',
    header: () => <div>Tips</div>,
    cell: ({ row }) => <div>{formatCurrency(row.getValue('tips'))}</div>,
  },
  {
    accessorKey: 'profit',
    header: () => <div>Profit</div>,
    cell: ({ row }) => <div>{formatCurrency(row.getValue('profit'))}</div>,
  },
  {
    accessorKey: 'expense',
    header: () => <div>Expense</div>,
    cell: ({ row }) => <div>{formatCurrency(row.getValue('expense'))}</div>,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const data = row.original;

      return <ReportActions data={data} />;
    },
  },
];
