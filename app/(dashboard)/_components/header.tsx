'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton, useUser } from '@clerk/nextjs';
import { cn } from '@/lib/utils';

import { Github, Home, Settings } from 'lucide-react';
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
    href: '/settings',
    Icon: Settings,
  },
];

const Header = () => {
  const { isLoaded } = useUser();
  const pathname = usePathname();

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
        {isLoaded && (
          <div className='mx-2 sm:mr-0'>
            <UserButton afterSignOutUrl='/' />
          </div>
        )}
        <span className='w-[1px] h-8 bg-muted-foreground/20 dark:bg-muted mr-2 sm:mx-2' />
        <Button variant='ghost' size='icon' asChild>
          <a href='https://github.com/murxify/rexi' target='_blank'>
            <Github className='h-[1.2rem] w-[1.2rem]' />
          </a>
        </Button>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;