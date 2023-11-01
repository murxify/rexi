'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Database } from '@/lib/database.types';

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
import { useI18n, useScopedI18n } from '@/locales/client';

interface AuthFormProps {
  login?: boolean;
}

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters',
  }),
});

const AuthForm = ({ login = false }: AuthFormProps) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const t = useScopedI18n('auth');

  const supabase = createClientComponentClient<Database>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError('');
    setLoading(true);

    const { email, password } = values;

    // login
    if (login) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) setError(error.message);
      if (data.session) {
        router.push('/dashboard');
        router.refresh();
      }
    }

    // Sign up
    if (!login) {
      const { data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (data.user?.identities) {
        //   Already signed up
        if (data.user?.identities.length === 0) setError(t('wentWrong'));
        //   Sign up success
        if (data.user?.identities?.length > 0) router.push('/thank-you');
      }
    }

    setLoading(false);
  }

  return (
    <div className='h-full flex flex-col justify-center px-5 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='border-b pb-2 text-center text-3xl font-semibold tracking-tight'>
          {login ? t('loginAccount') : t('createAccount')}
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('email')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('emailPlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('password')}</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <p className='text-red-600 text-sm'>{error}</p>}
            <Button className='w-full' type='submit' disabled={loading}>
              {login && !loading && t('login')}
              {!login && !loading && t('signup')}
              {loading && (
                <>
                  <LoaderIcon className='w-4 h-4 animate-spin mr-2' />
                  {login ? t('loggingIn') : t('creatingAccount')}
                </>
              )}
            </Button>
          </form>
        </Form>
        <p className='mt-4 text-center text-sm text-muted-foreground'>
          {login ? t('notAMember') : t('alreadyHaveAccount')}
          <Button
            variant='link'
            size='sm'
            asChild
            className='-ml-2 text-muted-foreground hover:text-foreground'
          >
            <Link href={`/${login ? 'signup' : 'login'}`}>
              {login ? t('createAccount') : t('login')}
            </Link>
          </Button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
