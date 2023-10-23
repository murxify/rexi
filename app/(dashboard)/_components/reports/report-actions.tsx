'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { Database } from '@/lib/database.types';

import { toast } from '@/components/ui/use-toast';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import EditRevenue from './edit-revenue';

type DataType = Database['public']['Tables']['profits']['Row'];

const ReportActions = ({ data }: { data: DataType }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState<DataType | null>(null);

  const queryClient = useQueryClient();
  const supabase = createClientComponentClient<Database>();

  const { mutate: deleteById } = useMutation({
    mutationFn: async (id: number) => {
      const { data, error } = await supabase
        .from('profits')
        .delete()
        .eq('id', id)
        .select();

      // data.length === 0 when trying to delete other users revenue
      if (error || data.length === 0) throw error;
      return data;
    },
    onError: () =>
      toast({
        title: 'Something went wrong.',
        description: 'There was a problem deleting your revenue.',
        variant: 'destructive',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profits'] });
      toast({
        description: 'Revenue deleted successfully!',
        variant: 'success',
      });
    },
  });

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
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onClick={() => handleEditDialog(data)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDeleteDialog(data)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Dialog */}
      <AlertDialog
        open={openDelete}
        onOpenChange={(isOpen) => {
          if (isOpen === true) return;
          setSelected(null);
          setOpenDelete(false);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              revenue from <span>{selected?.date}</span> and remove your data
              from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteById(selected?.id!)}
              className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Dialog */}
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
