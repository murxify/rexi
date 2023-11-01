import { formatCurrency } from '@/lib/utils';

import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface AvgCardProps {
  data: {
    title: string;
    value: number | string;
    Icon: LucideIcon;
  }[];
}

const AvgCard = ({ data }: AvgCardProps) => {
  return (
    <Card className='p-6 col-span-1 flex flex-col gap-4 justify-between'>
      {data.map((item) => (
        <div key={item.title}>
          <div className='flex items-center justify-between pb-2'>
            <p className='text-sm font-medium leading-none tracking-tight'>
              {item.title}
            </p>
            <item.Icon className='w-5 h-5 text-muted-foreground' />
          </div>
          <p className='text-2xl font-bold'>
            {typeof item.value === 'number'
              ? formatCurrency(item.value)
              : item.value}
          </p>
        </div>
      ))}
    </Card>
  );
};

export default AvgCard;
