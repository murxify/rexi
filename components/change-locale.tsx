'use client';

import { Globe } from 'lucide-react';

import { useChangeLocale, useI18n } from '@/locales/client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ChangeLocale = () => {
  const changeLocale = useChangeLocale();
  const t = useI18n();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='focus-visible:ring-1 focus-visible:ring-offset-1'
        >
          <Globe className='h-[1.2rem] w-[1.2rem]' />
          <span className='sr-only'>{t('locale.change')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='center' className='min-w-full'>
        <DropdownMenuItem onClick={() => changeLocale('en')}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLocale('sv')}>
          Svenska
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChangeLocale;
