import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

import AddRevenue from './add-revenue';

const DashboardHeader = () => {
  return (
    <div className='flex justify-between items-center mb-5'>
      <h1 className='text-3xl font-extrabold tracking-tight lg:text-4xl'>
        Dashboard
      </h1>
      <AddRevenue>
        <Button>
          <Plus className='w-4 h-4 mr-2' /> Add revenue
        </Button>
      </AddRevenue>
    </div>
  );
};

export default DashboardHeader;
