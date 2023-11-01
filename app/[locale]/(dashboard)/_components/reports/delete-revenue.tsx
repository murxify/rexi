'use client';

import { SetStateAction } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { Database } from '@/lib/database.types';
import { useScopedI18n } from '@/locales/client';

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
  const t = useScopedI18n('dashboard.reports.delete');

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
        title: t('wentWrong'),
        description: t('problem'),
        variant: 'destructive',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profits'] });
      toast({
        description: t('success'),
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
          <AlertDialogTitle>{t('title')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('description', {
              date: <span>{selected?.date}</span>,
            })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
          <Button
            onClick={() => deleteById(selected?.id!)}
            variant={'destructive'}
            disabled={isPending}
          >
            {!isPending && t('delete')}
            {isPending && (
              <>
                <LoaderIcon className='w-4 h-4 animate-spin mr-2' />
                {t('deleting')}
              </>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteRevenue;
