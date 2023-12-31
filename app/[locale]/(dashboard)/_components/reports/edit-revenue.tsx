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
import { useScopedI18n } from '@/locales/client';

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

  newShiftStart: z.string(),
  newShiftEnd: z.string(),
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
  const t = useScopedI18n('dashboard.addEditModal');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: useMemo(() => {
      return {
        newRevenue: selected?.revenue,
        newTips: selected?.tips!,
        newDate: new Date(selected?.date!),
        newShiftStart: selected?.shift_start,
        newShiftEnd: selected?.shift_end,
      };
    }, [selected]),
  });

  //   Update default form values
  useEffect(() => {
    form.reset({
      newRevenue: selected?.revenue || 0,
      newTips: selected?.tips || 0,
      newDate: new Date(selected?.date! || new Date()),
      newShiftStart: selected?.shift_start || '09:00',
      newShiftEnd: selected?.shift_end || '17:00',
    });
  }, [selected]);

  // Get contract
  const { data: contract } = useQuery({
    queryKey: ['contract'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contracts')
        .select()
        .single();

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
        title: t('wentWrong'),
        description: t('editProblem'),
        variant: 'destructive',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profits'] });
      toast({
        description: t('editSuccess'),
        variant: 'success',
      });
      setSelected(null);
      setOpenEdit(false);
    },
  });

  const onEditRevenue = (userInput: z.infer<typeof formSchema>) => {
    const { newRevenue, newDate, newTips, newShiftStart, newShiftEnd } =
      userInput;
    const { share_rate, vacation_pay_rate, vat_rate } = contract!;

    // Calculate total shift hours
    const startParts = newShiftStart.split(':').map((num) => +num);
    const endParts = newShiftEnd.split(':').map((num) => +num);

    const startDate = new Date(0, 0, 0, startParts[0], startParts[1]).getTime();
    const endDate = new Date(
      0,
      0,
      // if end hour is less than start hour, it means the shift ended the next day
      endParts[0] < startParts[0] ? 1 : 0,
      endParts[0],
      endParts[1]
    ).getTime();

    // Calculate shift duration in milliseconds
    const shift_duration = endDate - startDate;

    // Nothing has changed
    if (
      newRevenue === selected?.revenue &&
      newTips === selected.tips &&
      newDate.toDateString() === new Date(selected?.date!).toDateString() &&
      newShiftStart === selected.shift_start &&
      newShiftEnd === selected.shift_end
    ) {
      return toast({
        title: t('editQuestion'),
        variant: 'destructive',
      });
    }

    // Revenue has not changed
    if (newRevenue === selected?.revenue) {
      return editById({
        date: newDate.toDateString(),
        tips: newTips,
        profit: selected.profit - selected.tips! + newTips,
        shift_duration,
        shift_start: newShiftStart,
        shift_end: newShiftEnd,
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
      shift_duration,
      shift_start: newShiftStart,
      shift_end: newShiftEnd,
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
          <DialogTitle>{t('edit')}</DialogTitle>
          <DialogDescription>
            {t('editDescription', {
              date: <span>{selected?.date}</span>,
            })}
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
                  <FormLabel className='text-right mr-4'>
                    {t('revenue')}
                  </FormLabel>
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
                  <FormLabel className='text-right mr-4'>{t('tips')}</FormLabel>
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
            {/* Shift hours */}
            <div className='grid grid-cols-4 items-center mt-1'>
              <p className='text-sm font-medium leading-none text-right mr-4 cursor-default'>
                {t('shift')}
              </p>
              <div className='col-span-3 grid grid-cols-2 gap-2'>
                <FormField
                  control={form.control}
                  name='newShiftStart'
                  render={({ field }) => (
                    <FormItem className='relative'>
                      <FormLabel className='absolute text-xs bg-background left-2 top-[-2px] px-1 text-muted-foreground'>
                        {t('start')}
                      </FormLabel>
                      <FormControl>
                        <Input type='time' required {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='newShiftEnd'
                  render={({ field }) => (
                    <FormItem className='relative'>
                      <FormLabel className='absolute text-xs bg-background left-2 top-[-2px] px-1 text-muted-foreground'>
                        {t('end')}
                      </FormLabel>
                      <FormControl>
                        <Input type='time' required {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* Date component from shadcn-ui */}
            <FormField
              control={form.control}
              name='newDate'
              render={({ field }) => (
                <FormItem className='grid grid-cols-4 items-center'>
                  <FormLabel className='text-right mr-4'>{t('date')}</FormLabel>
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
                            <span>{t('pickDate')}</span>
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
              {!isPending && t('edit')}
              {isPending && (
                <>
                  <LoaderIcon className='w-4 h-4 animate-spin mr-2' />
                  {t('editing')}
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
