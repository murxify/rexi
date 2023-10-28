'use client';

import { Table, VisibilityState } from '@tanstack/react-table';

import { Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  columnVisibility: VisibilityState;
}

export function DataTableViewOptions<TData>({
  table,
  columnVisibility,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='ml-auto hidden h-8 lg:flex mb-2 text-muted-foreground'
        >
          <Settings2 className='mr-2 h-4 w-4' />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='p-2'>
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== 'undefined' && column.getCanHide()
          )
          .map((column) => {
            return (
              <div
                key={column.id}
                className='flex items-center gap-2 mb-2 last:mb-0 capitalize text-muted-foreground'
              >
                <Checkbox
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => {
                    column.toggleVisibility(!!value);
                    localStorage.setItem(
                      'visibleColumns',
                      JSON.stringify({
                        ...columnVisibility,
                        [column.id]: !!value,
                      })
                    );
                  }}
                  id={column.id}
                />
                <Label htmlFor={column.id} className='w-full'>
                  {column.id
                    .split('_')
                    .filter((word) => word !== 'amount')
                    .join(' ')}
                </Label>
              </div>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
