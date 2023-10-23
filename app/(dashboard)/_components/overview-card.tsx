import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { Database } from '@/lib/database.types';

import { formatCurrency } from '@/utils/currency';

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
            {/* This line should show the average */}
            {/* <Line  stroke='#82ca9d' /> */}

            <Line type='monotone' dataKey={dataKey} stroke='#8884d8' />
            <Tooltip content={<CustomToolTip />} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default OverviewCard;

const CustomToolTip = ({ payload, label, active }: any) => {
  if (active) {
    // console.log(payload);
    // console.log(label);
    return (
      <Card>
        <CardHeader className='p-2 px-4 space-y-0'>
          <CardTitle className='text-sm'>{payload[0].payload.date}</CardTitle>
          <CardDescription>{payload[0].name}:</CardDescription>
        </CardHeader>
        <CardContent className='p-2 px-4 pt-0'>
          <p className='text-base font-semibold'>
            {formatCurrency(payload[0].value)}
          </p>
        </CardContent>
      </Card>
    );
  }
};
