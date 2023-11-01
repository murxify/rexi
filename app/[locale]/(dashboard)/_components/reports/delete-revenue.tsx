'use client';

import { SetStateAction } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { Database } from '@/lib/database.types';

import { LoaderIcon } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

type DataType = Database['public']['Tables']['profits']['Row'];

interface DeleteRevenueProps {
  selected: DataType | null;
  setSelected: (value: SetStateAction<DataType | null>) => void;
  setOpenDelete: (value: SetStateAction<boolean>) => void;
  openDelete: boolean;
}

const DeleteRevenue = ({
  openDelete,
  selected,
  setOpenDelete,
  setSelected,
}: DeleteRevenueProps) => {
  const queryClient = useQueryClient();
  const supabase = createClientComponentClient<Database>();

  const { mutate: deleteById, isPending } = useMutation({
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
      setSelected(null);
      setOpenDelete(false);
    },
  });

  return (
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
            revenue from <span>{selected?.date}</span> and remove your data from
            our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            onClick={() => deleteById(selected?.id!)}
            variant={'destructive'}
            disabled={isPending}
          >
            {!isPending && 'Delete revenue'}
            {isPending && (
              <>
                <LoaderIcon className='w-4 h-4 animate-spin mr-2' />
                Deleting...
              </>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteRevenue;
