import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface OverviewCardProps {
  title: string;
  amount: number;
  Icon: LucideIcon;
}

const OverviewCard = ({ title, amount, Icon }: OverviewCardProps) => {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        <Icon className='w-5 h-5 text-muted-foreground' />
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{amount} kr</div>
        {/* <p className='text-xs text-muted-foreground'>
      +20.1% from last month
    </p> */}
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
