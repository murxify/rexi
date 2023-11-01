import { Github } from 'lucide-react';
import { Button } from './ui/button';
import ChangeLocale from './change-locale';
import { ModeToggle } from './mode-toggle';
import { cn } from '@/lib/utils';

const HeaderButtons = ({
  marketing,
  dashboard,
}: {
  marketing?: boolean;
  dashboard?: boolean;
}) => {
  return (
    <>
      <span
        className={cn(
          'w-[1px] h-8 bg-muted-foreground/20 dark:bg-muted',
          marketing && 'sm:ml-2 hidden sm:block',
          dashboard && 'mr-2 sm:mx-2'
        )}
      />
      <Button variant='ghost' size='icon' asChild>
        <a href='https://github.com/murxify/rexi' target='_blank'>
          <span className='sr-only'>github</span>
          <Github className='h-[1.2rem] w-[1.2rem]' />
        </a>
      </Button>
      <ChangeLocale />
      <ModeToggle />
    </>
  );
};

export default HeaderButtons;
