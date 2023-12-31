'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useQueryClient } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { useScopedI18n } from '@/locales/client';

import { Home, Loader, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

import Logo from '@/components/logo';
import MobileMenu from './mobile-menu';
import HeaderButtons from '@/components/header-buttons';

const Header = () => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClientComponentClient();
  const t = useScopedI18n('dashboard');

  const handleSignOut = async () => {
    setLoading(true);
    queryClient.clear();
    await supabase.auth.signOut();
    router.refresh();
    router.push('/');
  };

  const navigations = [
    {
      name: t('dashboard'),
      href: '/dashboard',
      Icon: Home,
    },
    {
      name: t('settings'),
      href: '/dashboard/settings',
      Icon: Settings,
    },
  ];

  return (
    <header className='relative z-50 px-2 sm:px-5 py-2 flex items-center justify-between border-b shadow-sm'>
      <MobileMenu navigations={navigations} />
      <div className='hidden sm:flex items-center'>
        <Logo />
        <nav className='ml-10 space-x-8'>
          {navigations.map((nav) => (
            <Button
              key={nav.name}
              variant='link'
              size='lg'
              asChild
              className={cn(
                'text-muted-foreground hover:text-primary p-0',
                pathname === nav.href && 'text-primary'
              )}
            >
              <Link href={nav.href}>{nav.name}</Link>
            </Button>
          ))}
        </nav>
      </div>
      <div className='flex items-center'>
        <div className='mx-2 sm:mr-0'>
          <Button variant='ghost' size='sm' onClick={handleSignOut}>
            {loading && <Loader className='mr-2 w-4 h-4 animate-spin' />}
            {t('signOut')}
          </Button>
        </div>
        <HeaderButtons dashboard />
      </div>
    </header>
  );
};

export default Header;
