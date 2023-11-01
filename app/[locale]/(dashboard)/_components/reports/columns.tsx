'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Database } from '@/lib/database.types';

import { formatCurrency, getHourlyRate, getShiftDuration } from '@/lib/utils';

import ReportActions from './report-actions';
import DataTableColumnHeader from './data-table-column-header';

export const columns: ColumnDef<
  Database['public']['Tables']['profits']['Row']
>[] = [
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Date' />
    ),
    enableHiding: false,
  },
  {
    accessorKey: 'shift_duration',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Duration' />
    ),
    cell: ({ row }) => <>{getShiftDuration(row.getValue('shift_duration'))}</>,
    enableHiding: false,
  },
  {
    accessorKey: 'shift_start',
    header: () => <>Start</>,
  },
  {
    accessorKey: 'shift_end',
    header: () => <>End</>,
  },
  {
    accessorKey: 'hourly_rate',
    accessorFn: (row) => getHourlyRate(row.shift_duration, row.profit),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Hourly Rate' />
    ),
    enableHiding: false,
  },
  {
    accessorKey: 'revenue',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Revenue' />
    ),
    cell: ({ row }) => <>{formatCurrency(row.getValue('revenue'))}</>,
    enableHiding: false,
  },
  {
    accessorKey: 'revenue_ex_vat',
    header: () => <>Ex VAT</>,
    cell: ({ row }) => <>{formatCurrency(row.getValue('revenue_ex_vat'))}</>,
  },
  {
    accessorKey: 'vat_amount',
    header: () => <>VAT</>,
    cell: ({ row }) => <>{formatCurrency(row.getValue('vat_amount'))}</>,
  },
  {
    accessorKey: 'my_share_amount',
    header: () => <>My Share</>,
    cell: ({ row }) => <>{formatCurrency(row.getValue('my_share_amount'))}</>,
  },
  {
    accessorKey: 'employers_share_amount',
    header: () => <>Employers Share</>,
    cell: ({ row }) => (
      <>{formatCurrency(row.getValue('employers_share_amount'))}</>
    ),
  },
  {
    accessorKey: 'vacation_pay_amount',
    header: () => <>Vacation Pay</>,
    cell: ({ row }) => (
      <>{formatCurrency(row.getValue('vacation_pay_amount'))}</>
    ),
  },
  {
    accessorKey: 'tips',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tips' />
    ),
    cell: ({ row }) => <>{formatCurrency(row.getValue('tips'))}</>,
  },
  {
    accessorKey: 'profit',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Profit' />
    ),
    cell: ({ row }) => <>{formatCurrency(row.getValue('profit'))}</>,
    enableHiding: false,
  },
  {
    accessorKey: 'expense',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Expense' />
    ),
    cell: ({ row }) => <>{formatCurrency(row.getValue('expense'))}</>,
    enableHiding: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const data = row.original;

      return <ReportActions data={data} />;
    },
    enableHiding: false,
  },
];
