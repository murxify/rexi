import Link from 'next/link';

import { LucideIcon, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

interface MobileMenuProps {
  navigations: {
    name: string;
    href: string;
    Icon: LucideIcon;
  }[];
}

const MobileMenu = ({ navigations }: MobileMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='sm:hidden focus-visible:ring-1 focus-visible:ring-offset-1'
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'} className='p-2'>
        <nav className='flex flex-col gap-3 justify-center h-full items-center relative'>
          <SheetClose asChild>
            <Button
              variant='ghost'
              size='icon'
              className='absolute left-0 top-0'
            >
              <span className='sr-only'>Close</span>
              <X />
            </Button>
          </SheetClose>
          {navigations.map((nav) => (
            <SheetClose key={nav.name} asChild>
              <Link
                href={nav.href}
                className='text-3xl tracking-tight flex items-center'
              >
                {nav.name}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
