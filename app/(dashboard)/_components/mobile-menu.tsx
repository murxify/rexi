import { useState } from 'react';
import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LucideIcon, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

import Logo from '@/components/logo';

interface MobileMenuProps {
  navigations: {
    name: string;
    href: string;
    Icon: LucideIcon;
  }[];
}

const MobileMenu = ({ navigations }: MobileMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <DropdownMenu onOpenChange={() => setMenuOpen((open) => !open)}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='sm:hidden focus-visible:ring-1 focus-visible:ring-offset-1'
        >
          {!menuOpen ? <Menu /> : <X />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' className='w-52'>
        <div className='flex justify-center'>
          <Logo />
        </div>
        <DropdownMenuSeparator />
        <nav>
          {navigations.map((nav) => (
            <DropdownMenuItem key={nav.name} asChild>
              <Link href={nav.href} className='flex items-center'>
                <nav.Icon className='w-5 h-5 mr-2' />
                {nav.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </nav>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileMenu;
