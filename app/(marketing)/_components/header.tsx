'use client';

import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import Logo from '@/components/logo';

const Header = () => {
  return (
    <header className='z-50 p-5'>
      <div className='flex items-center justify-between max-w-7xl mx-auto'>
        <Logo />
        <div className='flex items-center'>
          <Button variant='ghost' className='sm:mr-2' onClick={() => {}}>
            Log in <span className='ml-2'>&rarr;</span>
          </Button>
          <Button
            size='sm'
            className='hidden sm:inline-block'
            onClick={() => {}}
          >
            Get started
          </Button>
          <span className='w-[1px] h-8 bg-muted-foreground/20 dark:bg-muted mr-2 sm:mx-2' />
          <Button variant='ghost' size='icon' asChild>
            <a href='https://github.com/murxify/rexi' target='_blank'>
              <Github className='h-[1.2rem] w-[1.2rem]' />
            </a>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;