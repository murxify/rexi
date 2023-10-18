import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DashboardHeader = () => {
  return (
    <div className='flex justify-between items-center mb-5'>
      <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl'>
        Dashboard
      </h1>
      <Button>
        <Plus className='w-4 h-4 mr-2' /> Add revenue
      </Button>
    </div>
  );
};

export default DashboardHeader;
