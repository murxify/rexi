'use client';

import { SetStateAction, useEffect, useMemo } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

import { Coins, LoaderIcon, PiggyBank } from 'lucide-react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  newRevenue: z.coerce
    .number({
      required_error: 'Revenue is required.',
      invalid_type_error: 'Revenue must be a number.',
    })
    .positive({
      message: 'Revenue must be greater than 0.',
    }),

  newTips: z.coerce
    .number({
      required_error: 'Tips is required.',
      invalid_type_error: 'Tips must be a number.',
    })
    .nonnegative({
      message: "Tips can't be negative.",
    }),

  newDate: z.date({
    required_error: 'Date is required.',
  }),
});

type DataType = Database['public']['Tables']['profits']['Row'];

interface EditRevenueProps {
  selected: DataType | null;
  setOpenEdit: (value: SetStateAction<boolean>) => void;
  setSelected: (value: SetStateAction<DataType | null>) => void;
  openEdit: boolean;
}

const EditRevenue = ({
  selected,
  openEdit,
  setOpenEdit,
  setSelected,
}: EditRevenueProps) => {
  const supabase = createClientComponentClient<Database>();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: useMemo(() => {
      return {
        newRevenue: selected?.revenue,
        newTips: selected?.tips!,
        newDate: new Date(selected?.date!),
      };
    }, [selected]),
  });

  //   Update default form values
  useEffect(() => {
    form.reset({
      newRevenue: selected?.revenue || 0,
      newTips: selected?.tips || 0,
      newDate: new Date(selected?.date! || new Date()),
    });
  }, [selected]);

  // Get settings
  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const { data, error } = await supabase.from('settings').select().single();

      if (error) throw error;
      return data;
    },
  });

  const { mutate: editById, isPending } = useMutation({
    mutationFn: async (
      newProfit: Partial<Database['public']['Tables']['profits']['Insert']>
    ) => {
      const { data, error } = await supabase
        .from('profits')
        .update(newProfit)
        .eq('id', selected?.id!)
        .select();

      if (error || data.length === 0) throw error;
      return data;
    },
    onError: () =>
      toast({
        title: 'Something went wrong.',
        description: 'There was a problem editing your revenue.',
        variant: 'destructive',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profits'] });
      toast({
        description: 'Revenue edited successfully!',
        variant: 'success',
      });
      setSelected(null);
      setOpenEdit(false);
    },
  });

  const onEditRevenue = (userInput: z.infer<typeof formSchema>) => {
    const { newRevenue, newDate, newTips } = userInput;
    const { share_rate, vacation_pay_rate, vat_rate } = settings!;

    // Nothing has changed
    if (
      newRevenue === selected?.revenue &&
      newTips === selected.tips &&
      newDate.toDateString() === new Date(selected?.date!).toDateString()
    ) {
      return toast({
        title: 'What would you like to edit?',
        variant: 'destructive',
      });
    }

    // Revenue has not changed
    if (newRevenue === selected?.revenue) {
      return editById({
        date: newDate.toDateString(),
        tips: newTips,
        profit: selected.profit - selected.tips! + newTips,
      });
    }

    // Revenue has changed
    const vat_amount = newRevenue * (vat_rate / 100);
    const revenue_ex_vat = newRevenue - vat_amount;
    const my_share_amount = revenue_ex_vat * (share_rate / 100);
    const vacation_pay_amount = my_share_amount * (vacation_pay_rate / 100);
    const employers_share_amount =
      revenue_ex_vat - my_share_amount - vacation_pay_amount;
    const expense = vat_amount + employers_share_amount;
    const profit = newRevenue - expense + newTips;

    const newProfit = {
      vat_amount,
      revenue_ex_vat,
      my_share_amount,
      employers_share_amount,
      vacation_pay_amount,
      expense,
      profit,
      revenue: newRevenue,
      date: newDate.toDateString(),
      tips: newTips,
    };

    editById(newProfit);
  };

  return (
    <Dialog
      open={openEdit}
      onOpenChange={(isOpen) => {
        if (isOpen === true) return;
        setSelected(null);
        setOpenEdit(false);
      }}
    >
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit revenue</DialogTitle>
          <DialogDescription>
            Add new revenue details for {selected?.date}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onEditRevenue)}
            className='grid gap-4 py-4'
          >
            <FormField
              control={form.control}
              name='newRevenue'
              render={({ field }) => (
                <FormItem className='grid grid-cols-4 items-center'>
                  <FormLabel className='text-right mr-4'>Revenue</FormLabel>
                  <FormControl className='col-span-3'>
                    <div className='inline-flex items-center justify-end'>
                      <Input placeholder='3456' {...field} />
                      <Coins className='absolute h-4 w-4 opacity-50 mr-4' />
                    </div>
                  </FormControl>
                  <FormMessage className='col-start-2 col-end-5' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='newTips'
              render={({ field }) => (
                <FormItem className='grid grid-cols-4 items-center'>
                  <FormLabel className='text-right mr-4'>Tips</FormLabel>
                  <FormControl className='col-span-3'>
                    <div className='inline-flex items-center justify-end'>
                      <Input placeholder='0' {...field} />
                      <PiggyBank className='absolute h-4 w-4 opacity-50 mr-4' />
                    </div>
                  </FormControl>
                  <FormMessage className='col-start-2 col-end-5' />
                </FormItem>
              )}
            />
            {/* Date component from shadcn-ui */}
            <FormField
              control={form.control}
              name='newDate'
              render={({ field }) => (
                <FormItem className='grid grid-cols-4 items-center'>
                  <FormLabel className='text-right mr-4'>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'col-span-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className='col-start-2 col-end-5' />
                </FormItem>
              )}
            />
            <Button type='submit' className='ml-auto' disabled={isPending}>
              {!isPending && 'Edit revenue'}
              {isPending && (
                <>
                  <LoaderIcon className='w-4 h-4 animate-spin mr-2' />
                  Editing...
                </>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditRevenue;
