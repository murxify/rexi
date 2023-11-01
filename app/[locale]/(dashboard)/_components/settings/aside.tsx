'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useScopedI18n } from '@/locales/client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Aside = () => {
  const pathname = usePathname();
  const t = useScopedI18n('dashboard.settingsPage');

  const nav = [
    { name: t('profile.title'), href: '/dashboard/settings' },
    { name: t('contract.title'), href: '/dashboard/settings/contract' },
  ];

  return (
    <aside>
      <nav className='space-y-2'>
        {nav.map((item) => (
          <Button
            key={item.name}
            variant={'link'}
            size={'sm'}
            asChild
            className={cn(
              'px-10 sm:pl-2 sm:pr-16 sm:flex sm:justify-start hover:underline-offset-2',
              pathname === item.href &&
                'bg-accent text-accent-foreground hover:no-underline'
            )}
          >
            <Link href={item.href}>{item.name}</Link>
          </Button>
        ))}
      </nav>
    </aside>
  );
};

export default Aside;
