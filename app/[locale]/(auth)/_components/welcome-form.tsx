'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Database } from '@/lib/database.types';
import { useScopedI18n } from '@/locales/client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoaderIcon } from 'lucide-react';

const formSchema = z.object({
  vat_rate: z.coerce
    .number({
      required_error: 'VAT rate is required.',
      invalid_type_error: 'VAT rate must be a number.',
    })
    .positive({
      message: 'VAT rate must be greater than 0.',
    })
    .lte(100, {
      message: 'VAT rate must be less than or equal to 100.',
    }),

  share_rate: z.coerce
    .number({
      required_error: 'Share rate is required.',
      invalid_type_error: 'Share rate must be a number.',
    })
    .positive({
      message: 'Share rate must be greater than 0.',
    })
    .lte(100, {
      message: 'Share rate must be less than or equal to 100.',
    }),

  vacation_pay_rate: z.coerce
    .number({
      required_error: 'Vacation pay is required.',
      invalid_type_error: 'Vacation pay must be a number.',
    })
    .positive({
      message: 'Vacation pay must be greater than 0.',
    })
    .lte(100, {
      message: 'Vacation pay must be less than or equal to 100.',
    }),
});

const WelcomeForm = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const t = useScopedI18n('welcome');

  const supabase = createClientComponentClient<Database>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(userInput: z.infer<typeof formSchema>) {
    setError('');
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from('contracts')
      .insert({ ...userInput, user_id: user?.id as string })
      .select();

    if (error) setError(t('wentWrong'));
    if (!error) router.push('/dashboard');

    setLoading(false);
  }

  return (
    <div className='h-full flex flex-col justify-center px-5 py-12 lg:px-8'>
      <div className='text-center mx-auto max-w-md border-b pb-2'>
        <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl'>
          {t('title')}
        </h1>
        <p className='mt-2 font-semibold text-muted-foreground'>
          {t('description')}
        </p>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='vat_rate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('vat')}</FormLabel>
                  <FormControl>
                    <Input placeholder='5.66' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='share_rate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('share')}</FormLabel>
                  <FormControl>
                    <Input placeholder='39' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='vacation_pay_rate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('vacation')}</FormLabel>
                  <FormControl>
                    <Input placeholder='13' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <p className='text-red-600 text-sm'>{error}</p>}
            <Button className='w-full' type='submit' disabled={loading}>
              {!loading && t('submit')}
              {loading && (
                <>
                  <LoaderIcon className='w-4 h-4 animate-spin mr-2' />
                  {t('submitting')}
                </>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default WelcomeForm;
