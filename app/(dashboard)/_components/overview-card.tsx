import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { Database } from '@/lib/database.types';

import { formatCurrency } from '@/utils/currency';
import CustomToolTip from './custom-tooltip';

interface OverviewCardProps {
  title: string;
  amount: number;
  Icon: LucideIcon;
  data: Database['public']['Tables']['profits']['Row'][];
  dataKey: 'revenue' | 'profit' | 'expense';
}

const OverviewCard = ({
  title,
  amount,
  Icon,
  data,
  dataKey,
}: OverviewCardProps) => {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        <Icon className='w-5 h-5 text-muted-foreground' />
      </CardHeader>
      <CardContent className='pb-0'>
        <p className='text-2xl font-bold'>{formatCurrency(amount)}</p>
        <ResponsiveContainer height={100}>
          <LineChart data={data}>
            <Line
              type='monotone'
              dataKey={dataKey}
              stroke='var(--chart-primary)'
            />
            <Tooltip content={<CustomToolTip />} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
