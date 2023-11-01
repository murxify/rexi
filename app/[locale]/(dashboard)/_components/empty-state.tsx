import { useScopedI18n } from '@/locales/client';

import { CarTaxiFront, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

import AddRevenue from './add-revenue';

const EmptyState = () => {
  const t = useScopedI18n('dashboard.emptyState');

  return (
    <AddRevenue>
      <Button
        variant={'outline'}
        className='flex flex-col justify-center items-center h-80 gap-2 border-dashed border-2 dark:text-muted-foreground mx-auto px-4 sm:px-16  sm:text-base'
      >
        <CarTaxiFront className='w-12 h-12' />
        <p className='text-2xl font-semibold tracking-tight mt-4'>
          {t('title')}
        </p>
        <p>{t('description')}</p>
        <div className='flex items-center mt-4'>
          <Plus className='h-4 w-4 mr-2' />
          <p>{t('add')}</p>
        </div>
      </Button>
    </AddRevenue>
  );
};

export default EmptyState;
