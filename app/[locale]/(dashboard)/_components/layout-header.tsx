'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useQueryClient } from '@tanstack/react-query';
import { cn } from '@/lib/utils';

import { Github, Home, Loader, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';

import Logo from '@/components/logo';
import MobileMenu from './mobile-menu';

const navigations = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    Icon: Home,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    Icon: Settings,
  },
];

const Header = () => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    setLoading(true);
    queryClient.clear();
    await supabase.auth.signOut();
    router.refresh();
    router.push('/');
  };

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
            {loading && <Loader className='mr-2 w-4 h-4 animate-spin' />}Sign
            out
          </Button>
        </div>
        <span className='w-[1px] h-8 bg-muted-foreground/20 dark:bg-muted mr-2 sm:mx-2' />
        <Button variant='ghost' size='icon' asChild>
          <a href='https://github.com/murxify/rexi' target='_blank'>
            <span className='sr-only'>github</span>
            <Github className='h-[1.2rem] w-[1.2rem]' />
          </a>
        </Button>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
