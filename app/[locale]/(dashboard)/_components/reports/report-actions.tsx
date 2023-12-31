'use client';

import { useState } from 'react';

import { Database } from '@/lib/database.types';
import { useScopedI18n } from '@/locales/client';

import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import EditRevenue from './edit-revenue';
import DeleteRevenue from './delete-revenue';

type DataType = Database['public']['Tables']['profits']['Row'];

const ReportActions = ({ data }: { data: DataType }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState<DataType | null>(null);
  const t = useScopedI18n('dashboard.reports.actions');

  const handleDeleteDialog = (data: DataType) => {
    setSelected(data);
    setOpenDelete(true);
  };

  const handleEditDialog = (data: DataType) => {
    setSelected(data);
    setOpenEdit(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>{t('open')}</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onClick={() => handleEditDialog(data)}>
            {t('edit')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDeleteDialog(data)}>
            {t('delete')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteRevenue
        openDelete={openDelete}
        selected={selected}
        setOpenDelete={setOpenDelete}
        setSelected={setSelected}
      />

      <EditRevenue
        openEdit={openEdit}
        selected={selected}
        setOpenEdit={setOpenEdit}
        setSelected={setSelected}
      />
    </>
  );
};

export default ReportActions;
