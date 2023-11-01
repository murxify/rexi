import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { getScopedI18n } from '@/locales/server';

import AddRevenue from './add-revenue';

const DashboardHeader = async () => {
  const t = await getScopedI18n('dashboard');

  return (
    <div className='flex justify-between items-center mb-5'>
      <h1 className='text-3xl font-extrabold tracking-tight lg:text-4xl'>
        {t('dashboard')}
      </h1>
      <AddRevenue>
        <Button>
          <Plus className='w-4 h-4 mr-2' /> {t('addRevenue')}
        </Button>
      </AddRevenue>
    </div>
  );
};

export default DashboardHeader;
