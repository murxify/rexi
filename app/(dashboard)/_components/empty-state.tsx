import { Button } from '@/components/ui/button';
import { CarTaxiFront, Plus } from 'lucide-react';

import AddRevenue from './add-revenue';

const EmptyState = () => {
  return (
    <AddRevenue>
      <Button
        variant={'outline'}
        className='flex flex-col justify-center items-center h-80 gap-2 border-dashed border-2 dark:text-muted-foreground mx-auto px-4 sm:px-16  sm:text-base'
      >
        <CarTaxiFront className='w-12 h-12' />
        <p className='text-2xl font-semibold tracking-tight mt-4'>
          Start building your dashboard!
        </p>
        <p>
          Before we can create any reports, We&apos;ll first need to get som
          revenue in here!
        </p>
        <div className='flex items-center mt-4'>
          <Plus className='h-4 w-4 mr-2' />
          <p>Add revenue</p>
        </div>
      </Button>
    </AddRevenue>
  );
};

export default EmptyState;
