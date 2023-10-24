'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Database } from '@/lib/database.types';

import { formatCurrency } from '@/utils/currency';
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
    accessorKey: 'revenue',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Revenue' />
    ),
    cell: ({ row }) => <div>{formatCurrency(row.getValue('revenue'))}</div>,
    enableHiding: false,
  },
  {
    accessorKey: 'revenue_ex_vat',
    header: () => <div>Rev. Ex VAT</div>,
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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tips' />
    ),
    cell: ({ row }) => <div>{formatCurrency(row.getValue('tips'))}</div>,
  },
  {
    accessorKey: 'profit',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Profit' />
    ),
    cell: ({ row }) => <div>{formatCurrency(row.getValue('profit'))}</div>,
    enableHiding: false,
  },
  {
    accessorKey: 'expense',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Expense' />
    ),
    cell: ({ row }) => <div>{formatCurrency(row.getValue('expense'))}</div>,
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
