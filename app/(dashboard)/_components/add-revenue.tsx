'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

import { Coins, LoaderIcon } from 'lucide-react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  revenue: z.coerce
    .number({
      required_error: 'Revenue is required.',
      invalid_type_error: 'Revenue must be a number.',
    })
    .positive({
      message: 'Revenue must be greater than 0.',
    }),

  date: z.date({
    required_error: 'Date is required.',
  }),
});

const AddRevenue = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const supabase = createClientComponentClient<Database>();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      revenue: 3456,
    },
  });

  // Get settings
  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const { data, error } = await supabase.from('settings').select().single();

      if (error) throw error;
      return data;
    },
  });

  const { mutate: addRevenue, isPending } = useMutation({
    mutationFn: async (
      newProfit: Database['public']['Tables']['profits']['Insert']
    ) => {
      const { data, error } = await supabase
        .from('profits')
        .insert(newProfit)
        .select();

      if (error) throw error;
      return data;
    },
    onError: () =>
      toast({
        title: 'Something went wrong.',
        description: 'There was a problem with your request.',
        variant: 'destructive',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profits'] });
      toast({
        description: 'Revenue added successfully!',
        variant: 'success',
      });
      setIsOpen(false);
      form.reset();
    },
  });

  const onAddRevenue = (userInput: z.infer<typeof formSchema>) => {
    const { revenue, date } = userInput;
    const { share_rate, vacation_pay_rate, vat_rate, user_id } = settings!;

    const vat_amount = revenue * (vat_rate / 100);
    const revenue_ex_vat = revenue - vat_amount;
    const my_share_amount = revenue_ex_vat * (share_rate / 100);
    const vacation_pay_amount = my_share_amount * (vacation_pay_rate / 100);
    const employers_share_amount =
      revenue_ex_vat - my_share_amount - vacation_pay_amount;
    const expense = vat_amount + employers_share_amount;
    const profit = revenue - expense;

    const newProfit = {
      user_id,
      vat_amount,
      revenue_ex_vat,
      my_share_amount,
      employers_share_amount,
      vacation_pay_amount,
      expense,
      profit,
      revenue,
      date: date.toDateString(),
    };

    addRevenue(newProfit);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        if (isOpen === true) return;
        setIsOpen(false);
      }}
    >
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add revenue</DialogTitle>
          <DialogDescription>
            What&apos;s your total revenue for the day?
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onAddRevenue)}
            className='grid gap-4 py-4'
          >
            <FormField
              control={form.control}
              name='revenue'
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
            {/* Date component from shadcn-ui */}
            <FormField
              control={form.control}
              name='date'
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
              {!isPending && 'Add revenue'}
              {isPending && (
                <>
                  <LoaderIcon className='w-4 h-4 animate-spin mr-2' />
                  Adding...
                </>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRevenue;
